
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
        const key = arg.data
        const value = Store.get(key)
        Ipc.send('renderer', 'electron-store.get', { key,value})
    }
    if (arg.method === 'electron-store.delete') {
        const key = arg.data
        const value = Store.delete(key)
        Ipc.send('renderer', 'electron-store.delete', { key, value })
    }
    if (arg.method === 'electron-store.all') {
        Ipc.send('renderer', 'electron-store.all', Store.store)
    }
})
Ipc.send('renderer', 'test', {
    'title': 'hello renderer',
    'name': 'work'
})
