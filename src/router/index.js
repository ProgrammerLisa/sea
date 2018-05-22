import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import BlackDrill from '@/components/BlackDrill'
import Force from '@/components/Force'
import Introduce from '@/components/IntroduceCode'
import GetForce from '@/components/GetForce'
import GetBlackDrill from '@/components/GetBlackDrill'
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

import ModificationAddress from '@/components/ModificationAddress'
import Statement from '@/components/Statement'
import ChangePassword from '@/components/ChangePassword'
import UserFeedback from '@/components/UserFeedback'
import AboutUs from '@/components/AboutUs'


Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/',
      name:'Login',
			component: Login
		},
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
          path:'/Home',
          meta:{index:0},
          component:Home
        },
        {
          path:'/GetForce',
          component:GetForce
        },
        {
          path:'/Shopping',
          meta:{index:0},
          component:Shopping
        },
        {
          path:'Personal',
          component:Personal
        }
      ]
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
			path:'/Ask',
			component: Ask
		},
		{
			path:'/HelloWorld',
			component: HelloWorld
		},
    {
      path:'/friend',
      name:'friend',
      component: friend
    },
    {
      path:'/address',
      name:'address',
      component: address
    },
    {
      path:'/Service',
      name:'Service',
      component: Service
    },
    {
      path:'/Setting',
      name:'Setting',
      component: Setting
    },
    {
      path:'/RealName',
      name:'RealName',
      component: RealName
    },
    {
      path:'/Wallet',
      name:'Wallet',
      component: Wallet
    },
    {
      path:'/news',
      name:'news',
      component: news
    },
    {
      path:'/Reward',
      name:'Reward',
      component: Reward
    },
    {
      path:'/AddFriends',
      name:'AddFriends',
      component: AddFriends
    },
    {
      path:'/CommodityDetails',
      name:'CommodityDetails',
      component: CommodityDetails
    },
    {
      path:'/CommodityOrder',
      name:'CommodityOrder',
      component: CommodityOrder
<<<<<<< HEAD
=======
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
    },
    {
      path:'/ChangePassword',
      name:'ChangePassword',
      meta:{index:2},
      component: ChangePassword
    },
    {
      path:'/UserFeedback',
      name:'UserFeedback',
      meta:{index:2},
      component: UserFeedback
    },
    {
      path:'/AboutUs',
      name:'AboutUs',
      meta:{index:2},
      component: AboutUs
>>>>>>> 145b02a88591a6e03c5f2822171c4532cadbb4ae
    }

  ]
})
