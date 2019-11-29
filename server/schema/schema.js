require('dotenv').config()
const graphql = require('graphql')
const Owner = require('../models/owner');
const House = require('../models/house');
const Room = require('../models/room');
const Device = require('../models/device');
const AuthData = require('../models/authData')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = graphql;


const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        houses: {
            type: new GraphQLList(HouseType),
            resolve: async(parent, args) => await House.find({ ownerId: parent.id })
        }
    })
});
const AuthType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        ownerId: { type: GraphQLID },
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLInt }
    })
});
const HouseType = new GraphQLObjectType({
    name: 'House',
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        owner: {
            type: OwnerType,
            resolve: async(parent, args) => {
                let owner = await Owner.findById(parent.ownerId)
                owner.password = null //Return password = null to frontend if requested.
                return owner
            }
        },
        rooms: {
            type: new GraphQLList(RoomType),
            resolve: async(parent, args) => await Room.find({ houseId: parent.id })
        }
    })
});


const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: () => ({
        id: { type: GraphQLID },
        descriptor: { type: GraphQLString },
        house: {
            type: HouseType, // List because an owner can own multiple houses
            resolve: async(parent, args) => await House.findById(parent.houseId)
        },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve: async(parent, args) => await Device.find({ roomId: parent.id })
        }
    })
});

const DeviceType = new GraphQLObjectType({
    name: 'Device',
    fields: () => ({
        id: { type: GraphQLID },
        descriptor: { type: GraphQLString },
        status: { type: GraphQLString },
        room: {
            type: RoomType,
            resolve: async(parent, args) => await Room.findById(parent.roomId)
        }
    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        login: {
            type: AuthType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async(parent, args) => {
                const user = await Owner.findOne({ email: args.email });
                if (!user) {
                    throw new Error('User does not exist!');
                }
                const isEqual = await bcrypt.compare(args.password, user.password);
                if (!isEqual) {
                    throw new Error('Password is incorrect!');
                }
                const token = jwt.sign({ id: user.id, email: user.email },
                    process.env.ACCESS_TOKEN_SECRETKEY, {
                        expiresIn: '2h'
                    }
                );
                return {
                    ownerId: user.id,
                    token: token,
                    tokenExpiration: 2
                };
            }
        },
        owner: {
            type: OwnerType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => {
                let owner = await Owner.findById(args.id)
                if (!owner) {
                    throw new Error('No found!')
                }
                owner.password = null

                return owner
            }
        },
        house: {
            type: HouseType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => await House.findById(args.id)
        },
        room: {
            type: RoomType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => await Room.findById(args.id)
        },
        device: {
            type: DeviceType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => await Device.findById(args.id)
        },
        houses: {
            type: new GraphQLList(HouseType),
            resolve: async(parent, args) => await House.find({})
        },
        owners: {
            type: new GraphQLList(OwnerType),
            resolve: async(parent, args) => {
                let owners = await Owner.find({})
                owners.forEach(owner => owner.password = null) //Return password = null to frontend if requested.
                return owners
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAccount: {
            type: OwnerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                phoneNumber: { type: GraphQLString },
            },
            resolve: async(parent, args) => {
                const existingUser = await Owner.findOne({ email: args.email });
                if (existingUser) {
                    throw new Error('User exists already.');
                }
                const hashedPassword = await bcrypt.hash(args.password, 12);

                const user = new Owner({
                    name: args.name,
                    age: args.age,
                    email: args.email,
                    password: hashedPassword,
                    phoneNumber: args.phoneNumber
                });

                const result = await user.save();

                return {
                    id: result.id,
                    name: result.name,
                    age: result.age,
                    email: result.email,
                    password: null,
                    phoneNumber: result.phoneNumber
                };
            }
        },
        addHouse: {
            type: HouseType,
            args: {
                address: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async(parent, args, req) => {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated!');
                }
                const houseExist = await House.findOne({ address: args.address })
                if (houseExist) {
                    throw new Error('This house have already been registered!')
                }
                let house = new House({
                    address: args.address,
                    ownerId: req.ownerId
                });
                return house.save();
            }
        },
        addRoom: {
            type: RoomType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                houseId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args, req) => {
                if (!req.isAuth) {
                    throw new Error('Unauthenticated!');
                }
                let room = new Room({
                    descriptor: args.descriptor,
                    houseId: args.houseId,
                });
                return room.save();
            }
        },
        addDevice: {
            type: DeviceType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                roomId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let device = new Device({
                    descriptor: args.descriptor,
                    status: args.status,
                    roomId: args.roomId
                });
                return device.save();
            }
        },
        removeHouse: {
            type: HouseType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args) => {
                let house = await House.findById(args.id)
                return House.remove(house)
            },
            removeRooms: {
                type: new GraphQLList(RoomType),
                resolve: async(parent, args) => {
                    let rooms = await Room.find({ houseId: parent.id })
                    return Room.re
                },

                removeDevices: {
                    type: new GraphQLList(DeviceType),
                    resolve: async(parent, args) => {
                        let devices = await Room.find({ roomId: parent.id })
                        return Device.remove(device)
                    },
                }
            }
        },


    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});