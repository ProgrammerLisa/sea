import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/HelloFromVux'
import Login from '@/components/Login'
import BlackDrill from '@/components/BlackDrill'
import Force from '@/components/Force'
import Introduce from '@/components/Introduce'
import GetForce from '@/components/GetForce'
import GetBlackDrill from '@/components/GetBlackDrill'
import Shopping from '@/components/Shopping'
import Personal from '@/components/Personal'

import Register from '@/components/Register'
import Retrieve from '@/components/Retrieve_password'



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
          path:'Home',
          component:Home
        },
        {
          path:'GetForce',
          component:GetForce
        },
        {
          path:'Shopping',
          component:Shopping
        },
        {
          path:'Personal',
          component:Personal
        }
      ]
    },
    {
    	path:'/Home',
    	name:'Home',
    	component:Home
    },
    {
      path:'/BlackDrill',
      name:'BlackDrill',
      component:BlackDrill
    },
    {
      path:'/Force',
      name:'Force',
      component:Force
    },
    {
      path:'/Introduce',
      name:'Introduce',
      component:Introduce
    },
    {
      path:'/GetForce',
      name:'GetForce',
      component:GetForce
    }
    ,
    {
      path:'/GetBlackDrill',
      name:'GetBlackDrill',
      component:GetBlackDrill
    },
    {
			path: '/Register',
			component: Register
		},
		{
			path:'/Login',
			component: Login
		},
		{
			path:'/Retrieve',
			component: Retrieve
		},
		{
			path:'/HelloWorld',
			component: HelloWorld
		}
  ]
})
