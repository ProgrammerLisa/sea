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

import router from './router'

Vue.use(VueRouter)
Vue.use(VueClipboard)
// Vue.use(VueResource)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$http= axios

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')
