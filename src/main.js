// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
<<<<<<< HEAD
import router from './router'

Vue.use(VueRouter)

=======
import Home from './components/HelloFromVux'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'

Vue.use(VueRouter)

const routes = [
		{
			path: '/',
			component: Login
		},
		{
			path:'/Register',
			component: Register
		},
		{
			path:'/Main',
			component: Main
		}
	]
>>>>>>> 2573c7e3fe53587bf5a4d4e02ea8b0f4063cd2b4


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')
