import Vuex from 'vuex'
import Vue from 'vue'
import router from '../router'
import owner from './modules/owner'
import helper from './modules/helper'
import house from './modules/house'
import room from './modules/room'
import device from './modules/device'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(router)


export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    modules: {
        owner,
        helper,
        house,
        room,
        device

    },
    router
})