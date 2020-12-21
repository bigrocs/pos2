import { ipcRenderer } from 'electron'

export const Ipc = {
    event:{
        method: null,
        state: 'wait',
        data: null
    },
    on(process, fun){
       return ipcRenderer.on('process-' + process, fun)
    },
    send(process, method, data){
        this.event.method = method
        this.event.data = data
        ipcRenderer.send(process + '-process', this.event);
    }
}