
import { Ipc } from '@/ipc/ipcRenderer'
import Store from '@/work/utils/electron-store'
import { healthy as SQL2000healthy} from '@/work/sql2000/healthy'
// 测试
Ipc.on('work', (event, arg) => {
    if (arg.method === 'test') {
        console.log('来自renderer线程测试消息:', arg, new Date())
    }
    /**
     * sql2000 通信
     */
    // isSql2000
    if (arg.method === 'sql2000.healthy') {
        const config = arg.data
        SQL2000healthy(config).then(res=>{
            Ipc.send('renderer', 'sql2000.healthy', res)
        }).catch((error) => {
            Ipc.send('renderer', 'sql2000.healthy', error)
        })
    }
})
Ipc.send('renderer', 'test', {
    'title': 'hello renderer',
    'name': 'work'
})
