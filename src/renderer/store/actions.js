
import _ from 'lodash'
import getMAC from 'getmac'
import Store from '@/utils/electron-store'
const actions = {
    initStore({ commit, state }) {
        // 读取默认配置合并进vuex状态
        state = _.defaultsDeep(Store.store,state)
        commit('pos/CHANGE_SETTING', { key: 'macAddress', value: getMAC() })
    }
}
export default actions
