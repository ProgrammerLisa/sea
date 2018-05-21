import Vue from 'vue'
import Router from 'vue-router'
import layer from 'vue-layer'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/HelloFromVux'
import Login from '@/components/Login'
import BlackDrill from '@/components/BlackDrill'
import Force from '@/components/Force'
import Introduce from '@/components/IntroduceCode'
import GetForce from '@/components/GetForce'
import GetBlackDrill from '@/components/GetBlackDrill'
import Shopping from '@/components/Shopping'
import Personal from '@/components/Personal'

import Register from '@/components/Register'
import Retrieve from '@/components/Retrieve_password'

import friend from '@/components/friend'
import address from '@/components/Address'
import Service from '@/components/Service'
import Setting from '@/components/Setting'
import RealName from '@/components/RealName'
import Wallet from '@/components/Wallet'
import news from '@/components/news'
import Reward from '@/components/Reward'
import AddFriends from '@/components/AddFriends'
import CommodityDetails from '@/components/CommodityDetails'
import CommodityOrder from '@/components/CommodityOrder'
import ModificationAddress from '@/components/ModificationAddress'
import Statement from '@/components/Statement'

Vue.use(Router);
Vue.prototype.$layer = layer(Vue);

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
          meta:{index:0},
          component:Shopping
        },
        {
          path:'Personal',
          meta:{index:0},
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
      name:'IntroduceCode',
      meta:{index:1},
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
      name:'Register',
			component: Register
		},
		{
			path:'/Login',
      name:'Login',
			component: Login
		},
		{
			path:'/Retrieve',
      name:'Retrieve',
			component: Retrieve
		},
		{
			path:'/HelloWorld',
			component: HelloWorld
		},
    {
      path:'/friend',
      name:'friend',
      meta:{index:1},
      component: friend
    },
    {
      path:'/address',
      name:'address',
      meta:{index:1},
      component: address
    },
    {
      path:'/Service',
      name:'Service',
      meta:{index:1},
      component: Service
    },
    {
      path:'/Setting',
      name:'Setting',
      meta:{index:1},
      component: Setting
    },
    {
      path:'/RealName',
      name:'RealName',
      meta:{index:1},
      component: RealName
    },
    {
      path:'/Wallet',
      name:'Wallet',
      meta:{index:1},
      component: Wallet
    },
    {
      path:'/news',
      name:'news',
      meta:{index:1},
      component: news
    },
    {
      path:'/Reward',
      name:'Reward',
      meta:{index:1},
      component: Reward
    },
    {
      path:'/AddFriends',
      name:'AddFriends',
      meta:{index:2},
      component: AddFriends
    },
    {
      path:'/CommodityDetails',
      name:'CommodityDetails',
      meta:{index:1},
      component: CommodityDetails
    },
    {
      path:'/CommodityOrder',
      name:'CommodityOrder',
      meta:{index:1},
      component: CommodityOrder
    },
    {
      path:'/ModificationAddress',
      name:'ModificationAddress',
      meta:{index:2},
      component: ModificationAddress
    },
    {
      path:'/Statement',
      name:'Statement',
      meta:{index:2},
      component: Statement
    }
  ]
})
