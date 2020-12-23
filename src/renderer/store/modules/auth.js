import Store from '@/renderer/utils/electron-store'
const state = {
    token:''
}
const mutations = {
    SET_TOKEN: (state, token) => {
        Store.set('auth.token', token)
        state.token = token
    },
    REMOVE_TOKEN: (state) => {
        Store.delete('auth.token')
    }
}

const actions = {
    setToken({ commit },token) {
        commit('SET_TOKEN', token)
    },
    removeToken({ commit }) {
        commit('REMOVE_TOKEN')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
