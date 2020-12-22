
import { Ipc } from '@/ipc/ipcRenderer'
Ipc.on('renderer', (event, arg) => {
    if (arg.method === 'test') {
        console.log('来自work线程测试消息:', arg, new Date())
    }
})
Ipc.send('work', 'test', {
    'title': 'hello work',
    'name': 'renderer'
})