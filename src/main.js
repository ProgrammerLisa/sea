import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import layer from 'vue-layer'
import VueClipboard from 'vue-clipboard2'
import VueScroller from 'vue-scroller'
// import  VueResource  from 'vue-resource'
import axios from 'axios'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import router from './router'

Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.use(Croppa);
// Vue.use(VueResource)

FastClick.attach(document.body);

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);

const host = process.env.NODE_ENV === 'development' ? 'http://47.104.161.100' : 'http://47.104.161.100' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host
})
Vue.prototype.$http = instance
//Vue.prototype.$http= axios;
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
