// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import layer from 'vue-layer'
import VueClipboard from 'vue-clipboard2'
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
// Vue.prototype.$http= axios;
const host = process.env.NODE_ENV === 'development' ? 'dev api host' : 'prod api host' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host
})

Vue.prototype.$http = instance


/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')
