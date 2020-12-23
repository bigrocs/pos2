
import { Ipc } from '@/ipc/ipcRenderer'

//  结账
export function healthy(config) {
    return new Promise((resolve, reject) => {
        const method = 'sql2000.healthy'
        Ipc.on('renderer', (event, arg) => {
            if (arg.method === method) {
                if (arg.state === 'success') {
                    resolve(arg.data)
                } else {
                    reject(arg)
                }
            }
        })
        Ipc.send('work', method, config)
    })
}
