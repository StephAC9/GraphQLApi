import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

const state = {
    devices: [],
    favoritesDevices: [],
}

const getters = {
    favorites: state => state.favoritesDevices,
    devices: state => state.devices,
}

const actions = {
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

    async addToFavorites({ commit }, payload) {
        try {
            const toFavorite = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation addToFavoriteList($id: ID!){
                        addToFavoriteList(id: $id){
                            id
                            descriptor
                            inFavoriteList
                            status
                            image{
                                imageUrl
                            }
                            room{
                                descriptor
                            }
                        }             
                    }`,
                    variables: {
                        id: payload.id,
                    }
                },
            })
            const device = toFavorite.data.data.addToFavoriteList
            console.log(device)
            commit('ADD_TO_FAVORITES', device)
        } catch (err) {
            console.log(err)
        }
    },
    async removeFromFavorites({ commit }, payload) {
        console.log('DeviceId: ' + payload.id)
        try {
            const ouTfromFavorites = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `mutation removeFromFavoriteList($id: ID!){
                        removeFromFavoriteList(id: $id){
                            id
                            descriptor
                            inFavoriteList
                        }             
                    }`,
                    variables: {
                        id: payload.id,
                    }
                },
            })
            const device = ouTfromFavorites.data.data.removeFromFavoriteList
            console.log(device)
            commit('REMOVE_FROM_FAVORITES', payload.id)
        } catch (err) {
            console.log(err)
        }
    },
    async setFavorites({ commit }, payload) {
        console.log('HouseId: ' + payload.houseId)
        try {
            const favorites = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `query house($id: ID!){
                        house(id: $id){
                                favorites_devices{
                                    id
                                    descriptor
                                    status
                                    image{
                                        imageUrl
                                    }
                                    room{
                                        descriptor
                                    }
                             }
                          }             
                      }`,
                    variables: { id: payload.houseId }
                },

            })
            const favoriteList = favorites.data.data.house.favorites_devices
            console.log('Fav: ', favoriteList)
            commit('SET_FAVORITES', favoriteList)
        } catch (err) {
            console.log(err)
        }
    },
}

const mutations = {
    SET_DEVICES: (state, payload) => state.devices = payload,
    ADD_DEVICE: (state, payload) => state.devices.push(payload),
    REMOVE_DEVICE: (state, payload) => {
        const deviceList = state.devices.filter(device => device.id != payload)
        state.devices = deviceList
    },
    SET_FAVORITES: (state, payload) => state.favoritesDevices = payload,
    ADD_TO_FAVORITES: (state, payload) => {
        const favoriteList = state.favoritesDevices.push(payload)
        state.favoritesDevices = favoriteList
    },
    REMOVE_FROM_FAVORITES: (state, payload) => {
        const favoriteList = state.favoritesDevices.filter(device => device.id != payload)
        state.favoritesDevices = favoriteList
    },
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