import Vue from 'vue'
import Router from 'vue-router'
import layer from 'vue-layer'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import GetForce from '@/components/GetForce'
import Shopping from '@/components/Shopping'
import Personal from '@/components/Profile'

import Register from '@/components/Register'
import Retrieve from '@/components/Retrieve_password'
import Ask from '@/components/Invite'

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
import Compile from '@/components/Compile'
import InviteCode from '@/components/InviteCode'

import ModificationAddress from '@/components/ModificationAddress'
import Statement from '@/components/Statement'
import ChangePassword from '@/components/ChangePassword'
import UserFeedback from '@/components/UserFeedback'
import AboutUs from '@/components/AboutUs'


Vue.use(Router)

Vue.prototype.$layer = layer(Vue);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'HelloWorld',
      meta:{index:0},
      component: HelloWorld,
      children:[
        {
          path:'/',
          meta:{index:1},
          component:Home
        },
        {
          path:'/Home',
          meta:{index:1},
          component:Home
        },
        {
          path:'/GetForce',
          meta:{index:1},
          component:GetForce
        },
        {
          path:'/Shopping',
          meta:{index:1},
          component:Shopping
        },
        {
          path:'/Personal',
          meta:{index:1},
          component:Personal
        }
      ]
    },
    {
      path:'/GetForce',
      name:'GetForce',
      component:GetForce
    },
    {
			path: '/Register',
      name:'Register',
      meta:{index:2},
			component: Register
		},
		{
			path:'/Login',
      name:'Login',
      meta:{index:2},
			component: Login
		},
		{
			path:'/Retrieve',
      name:'Retrieve',
			component: Retrieve
		},
		{
			path:'/Ask',
      meta:{index:2},
			component: Ask
		},
		{
			path:'/HelloWorld',
			component: HelloWorld
		},
    {
      path:'/friend',
      name:'friend',
      meta:{index:2},
      component: friend
    },
    {
      path:'/address',
      name:'address',
      meta:{index:2},
      component: address
    },
    {
      path:'/Service',
      name:'Service',
      meta:{index:2},
      component: Service
    },
    {
      path:'/Setting',
      name:'Setting',
      meta:{index:2},
      component: Setting
    },
    {
      path:'/RealName',
      name:'RealName',
      meta:{index:2},
      component: RealName
    },
    {
      path:'/Wallet',
      name:'Wallet',
      meta:{index:2},
      component: Wallet
    },
    {
      path:'/news',
      name:'news',
      meta:{index:2},
      component: news
    },
    {
      path:'/Reward',
      name:'Reward',
      meta:{index:2},
      component: Reward
    },
    {
      path:'/AddFriends',
      name:'AddFriends',
      meta:{index:3},
      component: AddFriends
    },
    {
      path:'/CommodityDetails',
      name:'CommodityDetails',
      meta:{index:2},
      component: CommodityDetails
    },
    {
      path:'/CommodityOrder',
      name:'CommodityOrder',
      meta:{index:2},
      component: CommodityOrder
    },
    {
      path:'/ModificationAddress',
      name:'ModificationAddress',
      meta:{index:3},
      component: ModificationAddress
    },
    {
      path:'/Statement',
      name:'Statement',
      meta:{index:3},
      component: Statement
    },
    {
      path:'/ChangePassword',
      name:'ChangePassword',
      meta:{index:3},
      component: ChangePassword
    },
    {
      path:'/UserFeedback',
      name:'UserFeedback',
      meta:{index:3},
      component: UserFeedback
    },
    {
      path:'/AboutUs',
      name:'AboutUs',
      meta:{index:3},
      component: AboutUs
    },
    {
      path:'/Compile',
      name:'Compile',
      meta:{index:2},
      component: Compile
    },
    {
      path:'/InviteCode',
      name:'InviteCode',
      meta:{index:2},
      component: InviteCode
    }

  ]
})
