import {  ipcMain } from 'electron'
// 主线程分发子线程
class Ipc {
    constructor() {
        this._renderer = null
        this._work = null
    }
    onRenderer() {
        ipcMain.on('renderer-process',  (event, arg) =>{
            this._renderer = event
            try {
                arg.state = 'success'
                this._work.sender.send('process-renderer', arg)
            } catch (e) {
                arg.state = 'error'
                arg.error = e
                this._renderer.sender.send('process-work', arg)
            }
        });
    }
    onWork(){
        ipcMain.on('work-process',  (event, arg) =>{
            this._work = event
            try {
                arg.state = 'success'
                this._renderer.sender.send('process-work', arg)
            } catch (e) {
                arg.state = 'error'
                arg.error = e
                this._work.sender.send('process-renderer', arg)
            }
        });
    }
    run() {
        this.onRenderer()
        this.onWork()
    }
}
let ipc = new Ipc()
ipc.run()