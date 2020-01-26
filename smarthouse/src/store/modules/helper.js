import createPersistedState from 'vuex-persistedstate'

const state = {
    inWlcPage: false
}

const getters = {
    inWlcPage: state => state.inWlcPage

}

const actions = {
    isInWelcomePage({ commit }, payload) {
        commit('SET_IN_WELCOMEPAGE', payload.inWlc)
    }
}

const mutations = {
    SET_IN_WELCOMEPAGE: (state, payload) => state.inWlcPage = payload
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