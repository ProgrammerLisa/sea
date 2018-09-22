import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import layer from 'vue-layer'
import VueClipboard from 'vue-clipboard2'
import VueDND from 'awe-dnd'
import axios from 'axios'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import router from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/assets/iconfont/material-icons.css'
import theme from 'muse-ui/lib/theme'

import Mui from 'vue-awesome-mui'



Vue.use(VueDND);
Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.use(Croppa);
Vue.use(MuseUI);
Vue.use(Mui);
theme.use('light');

FastClick.attach(document.body);

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);



const host = process.env.NODE_ENV === 'development' ? 'http://xsea.pasontech.com' : 'http://xsea.pasontech.com' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
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
