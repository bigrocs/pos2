
import { Ipc } from '@/ipc/ipcRenderer'
Ipc.on('work', (event, arg) => {
    console.log('这是work线程测试消息:', arg, event, new Date())
})
Ipc.send('renderer', 'test', {
    'title': 'hello renderer',
    'name': 'work'
})