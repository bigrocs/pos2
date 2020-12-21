<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
  </div>
</template>

<script>
import { Ipc } from '@/ipc/ipcRenderer'
  let data={
      'a':'index',
      'b':2
  }
Ipc.on('work',(event, arg)=>{
  console.log(123,event, arg)
})

setInterval(() => {
  Ipc.send('index','user',data)
}, 5 * 1000)// 等待 5 秒后第一次同步数据
export default {
  name: 'App',
  components: {
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
