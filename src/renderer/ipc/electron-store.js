
import { Ipc } from '@/ipc/ipcRenderer'
export default {
    set(key, value) {
        return new Promise((resolve, reject) => {
            const method = 'electron-store.set'
            Ipc.on('renderer', (event, arg) => {
                if (arg.method === method) {
                    if (arg.state === 'success') {
                        resolve(arg.data)
                    } else {
                        reject(arg)
                    }
                }
            })
            Ipc.send('work', method, { key, value })
        })
    },
    get(key) {
        return new Promise((resolve, reject) => {
            const method = 'electron-store.get'
            Ipc.on('renderer', (event, arg) => {
                if (arg.method === method) {
                    if (arg.state === 'success') {
                        resolve(arg.data)
                    } else {
                        reject(arg)
                    }
                }
            })
            Ipc.send('work', method, key)
        })
    }
}