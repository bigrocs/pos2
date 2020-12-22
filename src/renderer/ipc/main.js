
import { Ipc } from '@/ipc/ipcRenderer'
import router from '@/renderer//router'

Ipc.on('renderer', (event, arg) => {
    if (arg.method === 'test') {
        console.log('来自work线程测试消息:', arg, new Date())
    }
})
Ipc.send('work', 'test', {
    'title': 'hello work',
    'name': 'renderer'
})

Ipc.on('main-home', (event, arg) => { // 主进程快捷键主页
    // if (this.$store.state.terminal.isPay) { // 支付中禁止操作
    //     this.$message({
    //         type: 'warning',
    //         message: '支付锁定中,请勿进行其他操作!'
    //     })
    // } else {
        router.push({ path: '/' })
    // }
})