import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

const state = {
    houseDevices: [],
    sensor: {},
    alarms: [],
    waterLeakageAlarm: null,
    fireAlarm: null,
    housebreakAlarm: null
}

const getters = {
    houseDevices: state => state.houseDevices,
    sensor: state => state.sensor,
    housebreakAlarm: state => state.housebreakAlarm,
    fireAlarm: state => state.fireAlarm,
    waterLeakageAlarm: state => state.waterLeakageAlarm

}

const actions = {
    fetchDevices({ commit }) {
        const houseDevices = [
            { deviceId: '01', status: 0, deviceName: 'Indoor Lamp', type: 'Lamp' },
            { deviceId: '02', status: 0, deviceName: 'Outdoor Lamp', type: 'Lamp' },
            { deviceId: '03', status: 0, deviceName: 'Stove', type: 'Stove' },
            { deviceId: '04', status: 0, deviceName: 'Window', type: 'Window' },
            { deviceId: '05', status: 0, deviceName: 'Radiator', type: 'Radiator' },
        ]
        const sensor = {
            internalTemp: 24.6,
            externalTemp: -5,
            electricalConsumption: 400
        }
        const fireAlarm = {
            deviceID: 1,
            name: 'Fire alarm',
            type: 'Alarm',
            status: 0
        }
        const housebreakAlarm = {
            deviceID: 2,
            name: 'House alarm',
            type: 'Alarm',
            status: 0
        }
        const waterLeakageAlarm = {
            deviceID: 3,
            name: 'Water Leakage',
            type: 'Alarm',
            status: 0
        }

        commit('SET_HOUSE_DEVICES', houseDevices)
        commit('SET_FIRE_ALARM', fireAlarm)
        commit('SET_WATER_LEAKAGE_ALARM', waterLeakageAlarm)
        commit('SET_HOUSEBREAK_ALARM', housebreakAlarm)
        commit('SET_SENSORS', sensor)
    },


    logout({ commit }) {
        const houseDevices = [
            { deviceId: '0', status: 0, deviceName: '', flag: false },
            { deviceId: '0', status: 0, deviceName: '', flag: false },
            { deviceId: '0', status: 0, deviceName: '', flag: false },
            { deviceId: '0', status: 0, deviceName: '', flag: false },
            { deviceId: '0', status: 0, deviceName: '', flag: false },
        ]
        const sensor = {
            internalTemp: 0,
            externalTemp: 0,
            electricalConsumption: 0
        }
        const fireAlarm = {
            deviceID: 0,
            name: '',
            type: '',
            status: 0
        }
        const housebreakAlarm = {
            deviceID: 0,
            name: '',
            type: '',
            status: 0
        }
        const waterLeakageAlarm = {
            deviceID: 0,
            name: '',
            type: '',
            status: 0
        }
        commit('SET_HOUSE_DEVICES', houseDevices)
        commit('SET_FIRE_ALARM', fireAlarm)
        commit('SET_WATER_LEAKAGE_ALARM', waterLeakageAlarm)
        commit('SET_HOUSEBREAK_ALARM', housebreakAlarm)
        commit('SET_SENSORS', sensor)
    },

}

const mutations = {
    SET_STOVE_STATUS: (state, payload) => state.alertStoveOn = payload,
    SET_HOUSE_DEVICES: (state, payload) => state.houseDevices = payload,
    SET_SENSORS: (state, payload) => state.sensor = payload,
    SET_WATER_LEAKAGE_ALARM: (state, payload) => state.waterLeakageAlarm = payload,
    SET_HOUSEBREAK_ALARM: (state, payload) => state.housebreakAlarm = payload,
    SET_FIRE_ALARM: (state, payload) => state.fireAlarm = payload,

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