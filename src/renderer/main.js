import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/styles/index.scss' // global css
import './permission' // permission control
import './ipc/main' // 加载线程通信
// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
