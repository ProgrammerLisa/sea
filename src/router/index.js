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
    }
  ]
})
