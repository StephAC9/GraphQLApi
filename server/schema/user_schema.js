require('dotenv').config()
const graphql = require('graphql')
const Owner = require('../models/owner');
const House = require('../models/house');
const Room = require('../models/room');
const Device = require('../models/device');
const Image = require('../models/image')
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




//TYPES


const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        /*    house: {
               type: HouseType,
               resolve: async(parent, args) => await House.findOne({ ownerId: parent.id })
           }, */
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
        descriptor: { type: GraphQLString },
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
        },
        image: {
            type: ImageType,
            resolve: async(parent, args) => await Image.findOne({ descriptor: parent.descriptor })
        },
        favorites_devices: {
            type: new GraphQLList(DeviceType),
            resolve: async(parent, args) => await Device.find({ houseId: parent.id, inFavoriteList: 'YES' })
        },

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
        },
        image: {
            type: ImageType,
            resolve: async(parent, args) => await Image.findOne({ descriptor: parent.descriptor })
        }
    })
});

const DeviceType = new GraphQLObjectType({
    name: 'Device',
    fields: () => ({
        id: { type: GraphQLID },
        descriptor: { type: GraphQLString },
        status: { type: GraphQLString },
        inFavoriteList: { type: GraphQLString },
        roomId: { type: GraphQLID },
        room: {
            type: RoomType,
            resolve: async(parent, args) => await Room.findById(parent.roomId)
        },
        image: {
            type: ImageType,
            resolve: async(parent, args) => await Image.findOne({ descriptor: parent.descriptor })
        },
    })
});

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: { type: GraphQLID },
        descriptor: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
    })
});





//QUERIES






const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        owner: {
            type: OwnerType,
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let owner = await Owner.findById(req.ownerId)
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
        houses: {
            type: new GraphQLList(HouseType),
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                return await House.find({ ownerId: req.ownerId })
            }
        },
        owners: {
            type: new GraphQLList(OwnerType),
            resolve: async(parent, args) => {
                let owners = await Owner.find({})
                owners.forEach(owner => owner.password = null) //Return password = null to frontend if requested.
                return owners
            }
        },
        room: {
            type: RoomType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => await Room.findById(args.id)
        },
        rooms: {
            type: new GraphQLList(RoomType),
            args: { houseId: { type: GraphQLID } },
            resolve: async(parent, args, req) => await Room.find({ houseId: args.houseId })
        },
        device: {
            type: DeviceType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => await Device.findById(args.id)
        },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve: async(parent, args) => await Device.find({})
        },
        images: {
            type: new GraphQLList(ImageType),
            resolve: async(parent, args) => await Image.find({})
        },

        favorites: {
            type: new GraphQLList(DeviceType),
            args: { houseId: { type: GraphQLID } },
            resolve: async(parent, args) => Device.find({ houseId: args.houseId, inFavoriteList: 'YES' })
        }
    }
});





//MUTATIONS







const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAccount: {
            type: OwnerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async(parent, args) => {
                const existingUser = await Owner.findOne({ email: args.email });
                if (existingUser) {
                    throw new Error('User exists already.');
                }
                const hashedPassword = await bcrypt.hash(args.password, 12);

                const user = new Owner({
                    name: args.name,
                    email: args.email,
                    password: hashedPassword,
                });

                const result = await user.save();

                return {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: null,
                };
            }
        },

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
                        expiresIn: '24h'
                    }
                );
                return {
                    ownerId: user.id,
                    token: token,
                    tokenExpiration: '24'
                };
            }
        },
        addHouse: {
            type: HouseType,
            args: {
                //ownerId: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                const houseExist = await House.findOne({ address: args.address })
                if (houseExist) {
                    throw new Error('This house have already been registered!')
                }
                let house = new House({
                    address: args.address,
                    ownerId: req.ownerId,
                    //ownerId: args.ownerId,
                    descriptor: 'House'

                });
                return await house.save();
            }
        },
        addRoom: {
            type: RoomType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                houseId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let room = new Room({
                    descriptor: args.descriptor,
                    houseId: args.houseId,
                });
                return await room.save();
            }
        },
        addDevice: {
            type: DeviceType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                roomId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let room = await Room.findById(args.roomId)
                let device = new Device({
                    descriptor: args.descriptor,
                    status: 'OFF',
                    inFavoriteList: 'NO',
                    roomId: args.roomId,
                    houseId: room.houseId
                });
                return await device.save();
            }
        },

        updateDeviceStatus: {
            type: DeviceType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                status: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let device = await Device.findById(args.id)
                device.status = args.status
                return device.save()
            }
        },

        addToFavoriteList: {
            type: DeviceType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args, req) => {
                /*  if (!req.userIsAuth) {
                     throw new Error('Unauthenticated!');
                 } */
                let device = await Device.findById(args.id)
                device.inFavoriteList = 'YES'
                return device.save()
            }
        },
        removeFromFavoriteList: {
            type: DeviceType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let device = await Device.findById(args.id)
                device.inFavoriteList = 'NO'
                return device.save()
            }
        },


        removeHouse: {
            type: HouseType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                await Device.deleteMany({ houseId: args.id }, err => {}) //Remove all corresponding devices
                await Room.deleteMany({ houseId: args.id }, err => {}) // Remove all corresponding rooms
                let house = await House.findById(args.id)
                return await House.remove(house)
            }
        },

        removeRoom: {
            type: RoomType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                await Device.deleteMany({ roomId: args.id }, err => {}) //Remove all corresponding devices
                let room = await Room.findById(args.id)
                return await Room.remove(room)
            }
        },

        removeDevice: {
            type: DeviceType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async(parent, args, req) => {
                if (!req.userIsAuth) {
                    throw new Error('Unauthenticated!');
                }
                let device = await Device.findById(args.id)
                return await Device.remove(device)
            }
        },
        addImage: {
            type: ImageType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                imageUrl: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async(parent, args) => {
                try {
                    const imageExist = await Image.findOne({ descriptor: args.descriptor })
                    if (imageExist) {
                        throw new Error('This image for same purpose have already been registered!')
                    }
                    let image = new Image({
                        descriptor: args.descriptor,
                        imageUrl: args.imageUrl
                    });
                    return await image.save();
                } catch (err) {
                    throw err
                }
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});