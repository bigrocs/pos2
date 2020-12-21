<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { Ipc } from '@/ipc/ipcRenderer'
  let data={
      'a':'index',
      'b':2
  }
Ipc.on('index',(event, arg)=>{
  console.log(456,event, arg)
})
setInterval(() => {
  Ipc.send('work','orderPay',data)
}, 5 * 1000)// 等待 5 秒后第一次同步数据

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
