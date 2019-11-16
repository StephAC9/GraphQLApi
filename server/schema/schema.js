const graphql = require('graphql')
const Owner = require('../models/owner');
const House = require('../models/house');
const Room = require('../models/room');
const Device = require('../models/device');

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
        houses: {
            type: new GraphQLList(HouseType),
            resolve(parent, args) {
                return House.find({ ownerId: parent.id })
            }
        }
    })
});
const HouseType = new GraphQLObjectType({
    name: 'House',
    fields: () => ({
        id: { type: GraphQLID },
        address: { type: GraphQLString },
        owner: {
            type: OwnerType,
            resolve(parent, args) {
                return Owner.findById(parent.ownerId)
            }
        },
        rooms: {
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                return Room.find({ houseId: parent.id })
            }
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
            resolve(parent, args) {
                return House.findById(parent.houseId)
            }
        },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {
                return Device.find({ roomId: parent.id })
            }
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
            resolve(parent, args) {
                return Room.findById(parent.roomId)
            }
        }
    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        owner: {
            type: OwnerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Owner.findById(args.id)
            }
        },
        house: {
            type: HouseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return House.findById(args.id)
            }
        },
        room: {
            type: RoomType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Room.findById(args.id)
            }
        },
        device: {
            type: DeviceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Device.findById(args.id)
            }
        },


        houses: {
            type: new GraphQLList(HouseType),
            resolve(parent, args) {
                return House.find({})
            }
        },
        owners: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args) {
                return Owner.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOwner: {
            type: OwnerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let owner = new Owner({
                    name: args.name,
                    age: args.age
                });
                return owner.save();
            }
        },
        addHouse: {
            type: HouseType,
            args: {
                address: { type: new GraphQLNonNull(GraphQLString) },
                ownerId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let house = new House({
                    address: args.address,
                    ownerId: args.ownerId
                });
                return house.save();
            }
        },
        addRoom: {
            type: RoomType,
            args: {
                descriptor: { type: new GraphQLNonNull(GraphQLString) },
                houseId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let room = new Room({
                    descriptor: args.descriptor,
                    houseId: args.houseId
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});