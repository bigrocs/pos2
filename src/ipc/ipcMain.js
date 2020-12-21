import {  ipcMain } from 'electron'
// 主线程分发子线程
class Ipc {
    constructor() {
        this._index = null
        this._work = null
    }
    onIndex() {
        ipcMain.on('index-process',  (event, arg) =>{
            this._index = event
            try {
                arg.state = 'success'
                this._work.sender.send('process-index', arg)
            } catch (e) {
                arg.state = 'error'
                arg.error = e
                this._index.sender.send('process-work', arg)
            }
        });
    }
    onWork(){
        ipcMain.on('work-process',  (event, arg) =>{
            this._work = event
            try {
                arg.state = 'success'
                this._index.sender.send('process-work', arg)
            } catch (e) {
                arg.state = 'error'
                arg.error = e
                this._work.sender.send('process-index', arg)
            }
        });
    }
    run() {
        this.onIndex()
        this.onWork()
        console.log(456);
    }
}
let ipc = new Ipc()
ipc.run()