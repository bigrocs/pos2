'use strict'

import { app, protocol, BrowserWindow, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'


app.allowRendererProcessReuse = false // 这将允许在渲染器进程中加载​​非上下文感知的本机模块
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let renchererWindow
let workWindow
async function createWindow(path) {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600, 
    useContentSize: true,
    fullscreen: true,
    backgroundColor: '#303133', //
    webPreferences: {
      enableRemoteModule: true,
      webSecurity: false, // 允许 electron 跨域
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    },
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + path)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await win.loadURL(`app://./${path}.html`)
  }
  if (path !== 'rencherer') { // 隐藏非渲染进程
    // await win.hide()
    workWindow = win
  }else{
    renchererWindow = win
  }
}
async function createWindows() {
  await createWindow('work')
  createWindow('rencherer')
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindows()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


// 开机启动
app.setLoginItemSettings({
  openAtLogin: true, // Boolean 在登录时启动应用
  openAsHidden: true // Boolean (可选) mac 表示以隐藏的方式启动应用。~~~~
  // path: '', String (可选) Windows - 在登录时启动的可执行文件。默认为 process.execPath.
  // args: [] String Windows - 要传递给可执行文件的命令行参数。默认为空数组。注意用引号将路径换行。
})

app.on('ready', () => {
  // const devTools = false
  // globalShortcut.register('tab', () => {
  //   if (devTools) {
  //     mainWindow.webContents.openDevTools()
  //     devTools = false
  //   } else {
  //     mainWindow.webContents.closeDevTools()
  //     devTools = true
  //   }
  // })
  globalShortcut.register('home', () => {
    renchererWindow.webContents.send('process-main-home', 'home')
    renchererWindow.show()
  })
})