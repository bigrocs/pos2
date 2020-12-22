
import { Ipc } from '@/ipc/ipcRenderer'
import Store from '@/work/utils/electron-store'
// 测试
Ipc.on('work', (event, arg) => {
    if (arg.method === 'test') {
        console.log('来自renderer线程测试消息:', arg, new Date())
    }
    // electron-store get
    if (arg.method === 'electron-store.set') {
        const data = arg.data
        const res = Store.set(data.key, data.value)
        Ipc.send('renderer', 'electron-store.set', res)
    }
    if (arg.method === 'electron-store.get') {
        Ipc.send('renderer', 'electron-store.get', Store.get(arg.data))
    }
})
Ipc.send('renderer', 'test', {
    'title': 'hello renderer',
    'name': 'work'
})
