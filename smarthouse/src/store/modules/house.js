import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

const state = {
    houses: [],
    house: {},
    rooms: [],
    devices: [],
    houseId: null,
}

const getters = {
    ownerListOfHouses: state => state.houses,
    currentHouse: state => state.house,
    rooms: state => state.rooms,
    devices: state => state.devices,
    currentHouseId: state => state.houseId
}

const actions = {
    async setHouses({ commit }) {
        console.log('setHouse')
        try {
            const houses = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `query houses{
                            houses{
                                id
                                address
                                descriptor
                                image{
                                    imageUrl
                                }
                            }
                    }`
                },
            })
            const ownerHouses = houses.data.data.houses
            console.log(ownerHouses)
            commit('SET_HOUSES', ownerHouses)

        } catch (err) {
            console.log(err)
        }
    },

    async addHouse({ commit }, payload) {
        try {
            const house = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation addHouse($address: String!){
                        addHouse(address: $address){
                            id
                            address
                            image{
                                imageUrl
                            }
                        }             
                    }`,
                    variables: {
                        address: payload.address,
                    }
                },
            })
            console.log(house.data.data.addHouse)
            const newHouse = house.data.data.addHouse
            commit('ADD_HOUSE', newHouse)
        } catch (err) {
            console.log(err)
        }
    },


    async fetchHouse({ commit }, payload) {
        try {
            const house = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `query house($id: ID!){
                        house(id: $id){
                            id
                            rooms{
                                id
                                descriptor
                                image{
                                    imageUrl
                                }
                            }
                        }             
                    }`,
                    variables: {
                        id: payload.id,
                    }
                },
            })
            const currentHouse = house.data.data.house
            console.log(currentHouse)
            commit('SET_SELECTED_HOUSE', currentHouse)
            commit('SET_ROOMS', currentHouse.rooms)
        } catch (err) {
            console.log(err)
        }
    },
    async removeHouse({ commit }, payload) {
        commit('REMOVE_HOUSE', payload.houseId)
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation removeHouse($id: ID!){
                        removeHouse(id: $id){
                            id
                        }             
                    }`,
                    variables: {
                        id: payload.houseId,
                    }
                },
            })
        } catch (err) {
            console.log(err)
        }
    },

    async setHouseID({ commit }, payload) {
        console.log('currentHouseID: ' + payload.houseId)
        commit('SET_HOUSE_ID', payload.houseId)
    },
    async addNewRoom({ commit }, payload) {
        try {
            const addedRoom = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation addRoom($descriptor: String!, $houseId: ID!){
                        addRoom(descriptor: $descriptor, houseId: $houseId){
                            id
                            descriptor
                            image{
                                imageUrl
                            }
                        }             
                    }`,
                    variables: {
                        descriptor: payload.descriptor,
                        houseId: payload.houseId
                    }
                },
            })
            commit('ADD_ROOM', addedRoom.data.data.addRoom)
            console.log(addedRoom.data.data.addRoom)
        } catch (err) {
            console.log(err)
        }
    },
    async removeRoom({ commit }, payload) {
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation deleteRoom($id: ID!){
                        removeRoom(id: $id){
                            id
                            descriptor
                        }             
                    }`,
                    variables: { id: payload.roomId }
                },
            })
            commit('REMOVE_ROOM', payload.roomId)
        } catch (err) {
            console.log(err)
        }
    },
    async setDevices({ commit }, payload) {
        try {
            const devices = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `query room($id: ID!){
                        room(id: $id){
                            devices{
                                id
                                descriptor
                                status
                                inFavoriteList
                                image{
                                    imageUrl
                                }
                                room{
                                    id
                                    descriptor
                                }
                            }
                        }             
                    }`,
                    variables: { id: payload.id }
                },

            })
            const deviceList = devices.data.data.room.devices
            console.log(deviceList)
            commit('SET_DEVICES', deviceList)
        } catch (err) {
            console.log(err)
        }
    },
    async addDevice({ commit }, payload) {
        try {
            const addedDevice = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation addDevice($descriptor: String!,$roomId: ID!){
                        addDevice(descriptor: $descriptor,roomId: $roomId){
                            id
                            descriptor
                            status
                            room{
                                id
                            }
                            image{
                                imageUrl
                            }
                        }             
                    }`,
                    variables: {
                        descriptor: payload.deviceName,
                        roomId: payload.roomId,
                    }
                },
            })
            console.log(addedDevice.data.data.addDevice)
            commit('ADD_DEVICE', addedDevice.data.data.addDevice)
        } catch (err) {
            console.log(err)
        }
    },

    async removeDevice({ commit }, payload) {
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation removeDevice($id: ID!){
                        removeDevice(id: $id){
                            id
                        }             
                    }`,
                    variables: { id: payload.id }
                },

            })
            commit('REMOVE_DEVICE', payload.id)
        } catch (err) {
            console.log(err)
        }
    },

    logout({ commit }) {
        localStorage.clear()
        commit('SET_HOUSES', null)
        commit('SET_SELECTED_HOUSE', null)
        commit('SET_ROOMS', null)
        commit('SET_DEVICES', null)
    },

}

const mutations = {
    SET_HOUSES: (state, payload) => state.houses = payload,
    SET_SELECTED_HOUSE: (state, payload) => state.house = payload,
    ADD_HOUSE: (state, payload) => state.houses.push(payload),
    REMOVE_HOUSE: (state, payload) => {
        const houseList = state.houses.filter(house => house.id != payload)
        state.houses = houseList
    },
    SET_ROOMS: (state, payload) => state.rooms = payload,
    ADD_ROOM: (state, payload) => state.rooms.push(payload),
    REMOVE_ROOM: (state, payload) => {
        const roomList = state.rooms.filter(room => room.id != payload)
        state.rooms = roomList
    },
    SET_DEVICES: (state, payload) => state.devices = payload,
    ADD_DEVICE: (state, payload) => state.devices.push(payload),
    REMOVE_DEVICE: (state, payload) => {
        const deviceList = state.devices.filter(device => device.id != payload)
        state.devices = deviceList
    },
    SET_HOUSE_ID: (state, payload) => state.houseId = payload,



}


export default {
    namespaced: true,
    plugins: [
        createPersistedState()
    ],
    state,
    getters,
    actions,
    mutations
}