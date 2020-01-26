import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

const state = {
    rooms: [],
}

const getters = {
    rooms: state => state.rooms,
}

const actions = {
    async setRooms({ commit }, payload) {
        try {
            const rooms = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    query: `query rooms($houseId: ID!){
                        rooms(houseId: $houseId){
                                id
                                descriptor
                                image{
                                    imageUrl
                                }
                        }             
                    }`,
                    variables: {
                        houseId: payload.houseId,
                    }
                },

            })
            const roomList = rooms.data.data.rooms
            console.log(roomList)
            commit('SET_ROOMS', roomList)
        } catch (err) {
            console.log(err)
        }
    },
    async addNewRoom({ commit }, payload) {
        console.log(payload.houseId)
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
                            house{
                                id
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
}

const mutations = {
    SET_ROOMS: (state, payload) => state.rooms = payload,
    ADD_ROOM: (state, payload) => state.rooms.push(payload),
    REMOVE_ROOM: (state, payload) => {
        const roomList = state.rooms.filter(room => room.id != payload)
        state.rooms = roomList
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