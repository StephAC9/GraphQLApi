const graphql = require('graphql')
const _ = require('lodash')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = graphql;


// dummy data
var houses = [
    { address: '', id: '1', ownerId: '3' },
    { address: '', id: '2', ownerId: '2' },
    { address: '', id: '3', ownerId: '4' },
    { address: '', id: '4', ownerId: '1' },
    { address: '', id: '5', ownerId: '7' },
    { address: '', id: '6', ownerId: '3' },
    { address: '', id: '7', ownerId: '6' },
    { address: '', id: '8', ownerId: '5' },
    { address: '', id: '9', ownerId: '2' },
    { address: '', id: '10', ownerId: '7' },
    { address: '', id: '11', ownerId: '6' },
]


var rooms = [
    { descriptor: 'Kitchen', id: '1', houseId: '1' },
    { descriptor: 'BedRoom', id: '2', houseId: '1' },
    { descriptor: 'TV Room', id: '3', houseId: '1' },
    { descriptor: 'BathRoom', id: '4', houseId: '2' },
    { descriptor: 'Kitchen', id: '5', houseId: '2' },
    { descriptor: 'BedRoom', id: '6', houseId: '3' },
    { descriptor: 'TV Room', id: '7', houseId: '3' },
    { descriptor: 'BathRoom', id: '8', houseId: '3' },
    { descriptor: 'Kitchen', id: '9', houseId: '4' },
    { descriptor: 'BedRoom', id: '10', houseId: '5' },
    { descriptor: 'TV Room', id: '11', houseId: '5' },
    { descriptor: 'BathRoom', id: '12', houseId: '6' },
    { descriptor: 'Kitchen', id: '13', houseId: '6' },
    { descriptor: 'BedRoom', id: '14', houseId: '6' },
    { descriptor: 'TV Room', id: '15', houseId: '7' },
    { descriptor: 'BathRoom', id: '16', houseId: '8' },
    { descriptor: 'Kitchen', id: '17', houseId: '8' },
    { descriptor: 'BedRoom', id: '18', houseId: '8' },
    { descriptor: 'TV Room', id: '19', houseId: '8' },
    { descriptor: 'BathRoom', id: '20', houseId: '9' },
    { descriptor: 'Kitchen', id: '21', houseId: '9' },
    { descriptor: 'BedRoom', id: '22', houseId: '10' },
    { descriptor: 'TV Room', id: '23', houseId: '10' },
    { descriptor: 'BathRoom', id: '24', houseId: '10' },
    { descriptor: 'Kitchen', id: '25', houseId: '11' },
    { descriptor: 'BedRoom', id: '26', houseId: '11' },
    { descriptor: 'TV Room', id: '27', houseId: '11' },
    { descriptor: 'BathRoom', id: '28', houseId: '11' },

];


var devices = [
    { descriptor: 'Lamp', id: '1', status: 'ON', roomId: '11' },
    { descriptor: 'SmartTV', id: '2', status: 'ON', roomId: '11' },
    { descriptor: 'Microwaves', id: '3', status: 'ON', roomId: '10' },
    { descriptor: 'Electric windows', id: '4', status: 'ON', roomId: '10' },
    { descriptor: 'heater', id: '1', status: 'ON', roomId: '10' },
    { descriptor: 'Air conditioner', id: '5', status: 'ON', roomId: '3' },
    { descriptor: 'Coffe machine', id: '6', status: 'ON', roomId: '3' },
    { descriptor: 'Freezer', id: '7', roomId: '3' },
    { descriptor: 'Mind reader', id: '8', status: 'ON', roomId: '9' },

    { descriptor: 'Lamp', id: '9', status: 'ON', roomId: '5' },
    { descriptor: 'SmartTV', id: '10', status: 'ON', roomId: '5' },
    { descriptor: 'Microwaves', id: '11', status: 'ON', roomId: '5' },
    { descriptor: 'Electric windows', id: '12', status: 'ON', roomId: '6' },
    { descriptor: 'heater', id: '13', status: 'ON', roomId: '7' },
    { descriptor: 'Air conditioner', id: '14', status: 'ON', roomId: '7' },
    { descriptor: 'Coffe machine', id: '15', status: 'ON', roomId: '7' },
    { descriptor: 'Freezer', id: '16', status: 'ON', roomId: '8' },
    { descriptor: 'Mind reader', id: '17', status: 'ON', roomId: '8' },

    { descriptor: 'Lamp', id: '18', status: 'ON', roomId: '2' },
    { descriptor: 'SmartTV', id: '19', status: 'ON', roomId: '2' },
    { descriptor: 'Microwaves', id: '20', status: 'ON', roomId: '1' },
    { descriptor: 'Electric windows', id: '21', status: 'ON', roomId: '11' },
    { descriptor: 'heater', id: '1', status: 'ON', roomId: '22' },
    { descriptor: 'Air conditioner', id: '23', status: 'ON', roomId: '4' },
    { descriptor: 'Coffe machine', id: '24', status: 'ON', roomId: '4' },
    { descriptor: 'Freezer', id: '25', status: 'ON', roomId: '5' },
    { descriptor: 'Mind reader', id: '26', status: 'ON', roomId: '10' },

    { descriptor: 'Lamp', id: '27', status: 'ON', roomId: '11' },
    { descriptor: 'SmartTV', id: '28', status: 'ON', roomId: '1' },
    { descriptor: 'Microwaves', id: '29', status: 'ON', roomId: '1' },
    { descriptor: 'Electric windows', id: '30', status: 'ON', roomId: '9' },
    { descriptor: 'heater', id: '31', status: 'ON', roomId: '9' },
    { descriptor: 'Air conditioner', id: '32', status: 'ON', roomId: '9' },
    { descriptor: 'Coffe machine', id: '33', status: 'ON', roomId: '7' },
    { descriptor: 'Freezer', id: '34', status: 'ON', roomId: '6' },
    { descriptor: 'Mind reader', id: '35', status: 'ON', roomId: '6' },

];

var owners = [
    { name: 'Johns Adam', age: '45', id: '1' },
    { name: 'Levi Lory', age: '32', id: '2' },
    { name: 'Alan Mikes', age: '75', id: '3' },
    { name: 'Steeve Sanders', age: '56', id: '4' },
    { name: 'Brenda Brown', age: '27', id: '5' },
    { name: 'Mikaela Anny', age: '33', id: '6' },
    { name: 'Pierre Grand ', age: '80', id: '7' },
];

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        houses: {
            type: new GraphQLList(HouseType),
            resolve(parent, args) {
                //return _.filter(houses, { ownerId: parent.id });
                return houses.filter(house => house.ownerId === parent.id)
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
                return owners.find(owner => owner.id === parent.ownerId)
                    //return _.find(owners, { id: parent.ownerId });
            }
        },
        rooms: {
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                //return _.filter(houses, { ownerId: parent.id });
                return rooms.filter(room => room.houseId === parent.id)
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
                return houses.find(house => house.id === parent.houseId)
            }
        },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {
                return devices.filter(device => device.roomId === parent.id)
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
                //return _.filter(houses, { ownerId: parent.id }); // Synthacs for lodash
                return rooms.find(room => room.id === parent.roomId)
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
                return owners.find(owner => owner.id === args.id)
            }
        },
        house: {
            type: HouseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return houses.find(house => house.id === args.id)
                    //return _.find(h, { id: args.id });
            }
        },
        room: {
            type: RoomType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return rooms.find(room => room.id === args.id)
                    //return _.find(h, { id: args.id });
            }
        },
        device: {
            type: DeviceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return devices.find(device => device.id === args.id)
                    //return _.find(h, { id: args.id });
            }
        },


        houses: {
            type: new GraphQLList(HouseType),
            resolve(parent, args) {
                return houses;
            }
        },
        owners: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args) {
                return owners;
            }
        }
    }
});