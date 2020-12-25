import Store from '@/utils/electron-store'
const state = {
    api: '', // baseURL集合每行一个回车分割
    baseURL: '', // 主API地址
    install: false, // 程序是否安装
    // 终端设置
    isTerminal: false, // 是否使用终端模式
    macAddress: '', // mac 地址
    terminal: '0001',
    
    depRange: '', // 设置部门范围后 pos只能经营指定部门范围内的商品

    // sql2000
    sql2000_host: '',
    sql2000_port: '1433',
    sql2000_username: '',
    sql2000_password: '',
    sql2000_database: ''
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            state[key] = value
            Store.set('pos.' + key, value)
        }
    },
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
