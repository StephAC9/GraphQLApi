import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '../../router'

const state = {
    token: null,
    isTokenExpired: false,
    isOwnerAuthenticated: false,
    userAlreadyExist: false,
    loginFailed: false,
    signUpSuccess: false,
    isActive: false,
    owner: {},
    houseId: null,
    houses: [],
    rooms: [],
    devices: [],
    favorites: [],
    inWlcPage: false,
    openFavorites: false,



}
const getters = {
    getToken: state => state.token,
    isOwnerAuthenticated: state => state.isOwnerAuthenticated,
    getCurrentOwner: state => state.owner,
    houseId: state => state.houseId,
    favorites: state => state.favorites,
    isActive: state => state.isActive,
    currentUser: state => state.owner,
    allRooms: state => state.rooms,
    roomDevices: state => state.devices,
    inWlcPage: state => state.inWlcPage,
    isTokenExpired: state => state.isTokenExpired,
    openFavorites: state => state.openFavorites,
    userAlreadyExist: state => state.userAlreadyExist,
    signUpSuccess: state => state.signUpSuccess,
    loginFailed: state => state.loginFailed,
    ownerHouses: state => state.houses
}
const actions = {

    isTokenExpired({ commit }) {
        setTimeout(() => {
            localStorage.clear()
            commit('SET_IS_TOKEN_EXPIRED', true)
            commit('SET_TOKEN', null)
            commit('SET_IS_AUTHENTICATED', false)
        }, 30 * 60 * 1000);
    },

    async signUp({ commit }, payload) {
        try {
            const newUser = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                data: {
                    query: `mutation createAccount($name: String!,$email: String!, $password: String!){
                        createAccount(name: $name,email: $email, password: $password){
                            id
                            name
                            email
                        }             
                    }`,
                    variables: {
                        name: payload.name,
                        email: payload.email,
                        password: payload.password
                    },
                },

            })
            console.log('Response from signing up: ', newUser.data.data.createAccount)
            const response = newUser.data.data.createAccount
            response === null ? commit('SET_USER_ALREADY_EXIST', true) : router.push({ name: 'signin' })
        } catch (err) {
            console.log(err)
        }

    },

    async resetUserExist({ commit }) {
        commit('SET_USER_ALREADY_EXIST', false)
    },


    async login({ commit }, payload) {
        try {
            const auth = await axios({
                method: 'POST',
                url: 'http://localhost:4000/graphql',
                data: {
                    query: `mutation login($email: String!, $password: String!){
                        login(email: $email, password: $password){
                            ownerId
                            token
                            tokenExpiration
                        }             
                    }`,
                    variables: {
                        email: payload.email,
                        password: payload.password
                    },
                },

            })
            let token = ''
            const response = auth.data.data.login

            response === null ? commit('SET_LOGIN_FAILED', true) && commit('SET_IS_AUTHENTICATED', false) :


                // if (token !== null || token !== undefined) {
                token = auth.data.data.login.token
            localStorage.setItem('token', token)
            commit('SET_IS_AUTHENTICATED', true)
            commit('SET_TOKEN', localStorage.getItem('token'))

            //Setting owner details for OwnerPage
            try {
                const owner = await axios({
                    method: 'POST',
                    url: 'http://localhost:4000/graphql',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    data: {
                        query: `query owner{
                                owner{
                                    id
                                    name
                                }             
                            }`
                    },

                })
                console.log(owner.data.data.owner)
                const currentOwner = owner.data.data.owner
                commit('SET_OWNER', currentOwner)
                router.push({ name: 'user-profile' })

            } catch (err) {
                console.log(err)
            }

        } catch (err) {
            console.log(err)
        }
    },

    async resetLoginFailed({ commit }) {
        commit('SET_LOGIN_FAILED', false)
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
            const deletedroom = await axios({
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
            const deletedDevice = await axios({
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

    resetDevices({ commit }, payload) {
        commit('RESET_DEVICES', payload)
    },

    logout({ commit }) {
        localStorage.clear()

        const visitor = { name: 'Visitor/ No one logged in', houseAddress: 'No address' }
        commit('SET_DEVICES', null)
        commit('SET_ROOMS', null)
        commit('SET_OWNER', visitor)
        commit('SET_TOKEN', null)
        commit('SET_IS_AUTHENTICATED', false)
        commit('SET_FAVORITES', null)
    },

    isInWelcomePage({ commit }, payload) {
        commit('SET_IN_WELCOMEPAGE', payload.inWlc)
    },

    openFavorites({ commit }) {
        commit('OPEN_FAVORITES', true)
    },


}
const mutations = {
    SET_TOKEN: (state, payload) => state.token = payload,
    SET_IS_AUTHENTICATED: (state, payload) => state.isOwnerAuthenticated = payload,
    SET_OWNER: (state, payload) => state.owner = payload,
    SET_ROOMS: (state, payload) => state.rooms = payload,
    SET_DEVICES: (state, payload) => state.devices = payload,
    SET_IN_WELCOMEPAGE: (state, payload) => state.inWlcPage = payload,
    ADD_DEVICE: (state, payload) => state.devices.push(payload),
    ADD_ROOM: (state, payload) => state.rooms.push(payload),
    SET_HOUSE_ID: (state, payload) => state.houseId = payload,
    SET_FAVORITES: (state, payload) => state.favorites = payload,
    ADD_TO_FAVORITES: (state, payload) => {
        const favoriteList = state.favorites.push(payload)
        state.favorites = favoriteList
    },
    REMOVE_FROM_FAVORITES: (state, payload) => {
        const favoriteList = state.favorites.filter(device => device.id != payload)
        state.favorites = favoriteList
    },
    REMOVE_DEVICE: (state, payload) => {
        const deviceList = state.devices.filter(device => device.id != payload)
        state.devices = deviceList
    },
    REMOVE_ROOM: (state, payload) => {
        const roomList = state.rooms.filter(room => room.id != payload)
        state.rooms = roomList
    },
    SET_IS_TOKEN_EXPIRED: (state, payload) => state.isTokenExpired = payload,
    SET_USER_ALREADY_EXIST: (state, payload) => state.userAlreadyExist = payload,
    SIGNUP_SUCCESSFULL: (state, payload) => state.signUpSuccess = payload,
    SET_LOGIN_FAILED: (state, payload) => state.loginFailed = payload,
    SET_OWNER_HOUSES: (state, payload) => state.houses.push(payload)


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