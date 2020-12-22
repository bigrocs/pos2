import Store from '@/renderer/ipc/electron-store'
import router from '@/renderer/router'
const actions = {
    initStore({ commit, state }) {
        // 读取默认配置合并进vuex状态
        Store.all().then(value => {
            if (value !== undefined) {
                state = Object.assign(state, value)
            }
        })
        
    }
}
export default actions
