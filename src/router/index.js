import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/HelloFromVux'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'/',
          component:Home
        },
        {
          path:'Login',
          component:Login
        },
        {
          path:'Home',
          component:Home
        }
      ]
    },
    {
    	path:'/Home',
    	name:'Home',
    	component:Home
    }
  ]
})
