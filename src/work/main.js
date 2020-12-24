// import Vue from 'vue'
// import App from './App.vue'
// // require('./ipc/main') // 加载线程通信

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))