
import { Ipc } from '@/ipc/ipcRenderer'
Ipc.on('renderer', (event, arg) => {
    console.log('这是renderer线程测试消息:', arg, event, new Date())
})
Ipc.send('work', 'test', {
    'title': 'hello work',
    'name': 'renderer'
})