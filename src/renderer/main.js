import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/renderer/assets/styles/index.scss' // global css
import * as filters from '@/renderer/filters' // global filters
import './icons' // icon
import './permission' // permission control
import './ipc/main' // 加载线程通信

// set ElementUI lang to EN
Vue.use(ElementUI)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

store.dispatch('initStore') // 初始化全部配置

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
