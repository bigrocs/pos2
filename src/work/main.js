import Vue from 'vue'
import App from './App.vue'
require('./ipc/main') // 加载线程通信

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
