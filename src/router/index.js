import Vue from 'vue'
import Router from 'vue-router'
import layer from 'vue-layer'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import nav from '@/components/Nav'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Find from '@/components/Find'
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
import CommodityDetails from '@/components/CommodityDetails'
import CommodityOrder from '@/components/CommodityOrder'
import InviteCode from '@/components/InviteCode'


import ModificationAddress from '@/components/ModificationAddress'
import Statement from '@/components/Statement'
import MyPearl from '@/components/MyPearl'
import ChangePassword from '@/components/ChangePassword'
import UserFeedback from '@/components/UserFeedback'
import AboutUs from '@/components/AboutUs'

import PreOrder from '@/components/PreOrder'

import AddFriends from '@/components/AddFriends'
import NewAddress from '@/components/NewAddress'
import Compile from '@/components/Compile'
import UploadHeadImg from '@/components/UploadHeadImg'



Vue.use(Router)

Vue.prototype.$layer = layer(Vue);

let defaultRouter;
if(readCookie('uid')!=null&&readCookie('uid')!=undefined&&readCookie('uid')!=''){
  console.log(readCookie('uid'));
  Vue.prototype.uid = readCookie('uid');
  defaultRouter = {
    path: '/nav',
    meta:{index:0},
    component: nav
  }
}else {
  defaultRouter = {
    path: '/',
    meta:{index:0},
    component: Login
  }
}
function readCookie(name) {
  let cookieValue = "";
  let search = name + "=";
  if(document.cookie.length > 0) {
    let offset = document.cookie.indexOf(search);
    if(offset != -1) {
      offset += search.length;
      let end = document.cookie.indexOf(";", offset);
      if(end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

export default new Router({
  routes: [
    defaultRouter,
    {
      path: '/nav',
      meta:{index:0},
      component: nav,
      children:[
        {
          path:'/',
          meta:{index:1},
          component:Home
        },
        {
          path:'/home',
          meta:{index:1},
          component:Home
        },
        {
          path:'/find',
          meta:{index:1},
          component:Find
        },
        {
          path:'/shopping',
          meta:{index:1},
          component:Shopping
        },
        {
          path:'/personal',
          meta:{index:1},
          component:Personal
        }
      ]
    },
    {
      path:'/find',
      meta:{index:1},
      component:Find
    },
    {
			path: '/register',
      name:'Register',
      meta:{index:2},
			component: Register
		},
		{
			path:'/login',
      name:'Login',
      meta:{index:1},
			component: Login
		},
		{
			path:'/retrieve',
      name:'Retrieve',
			component: Retrieve
		},
		{
			path:'/ask',
      meta:{index:2},
			component: Ask
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
      path:'/service',
      name:'Service',
      meta:{index:2},
      component: Service
    },
    {
      path:'/setting',
      name:'Setting',
      meta:{index:2},
      component: Setting
    },
    {
      path:'/realname',
      name:'RealName',
      meta:{index:2},
      component: RealName
    },
    {
      path:'/wallet',
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
      path:'/reward',
      name:'Reward',
      meta:{index:2},
      component: Reward
    },
    {
      path:'/addfriends',
      name:'AddFriends',
      meta:{index:3},
      component: AddFriends
    },
    {
      path:'/commoditydetails',
      name:'CommodityDetails',
      meta:{index:2},
      component: CommodityDetails
    },
    {
      path:'/commodityorder',
      name:'CommodityOrder',
      meta:{index:2},
      component: CommodityOrder
    },
    {
      path:'/modificationaddress',
      name:'ModificationAddress',
      meta:{index:3},
      component: ModificationAddress
    },
    {
      path:'/newaddress',
      name:'NewAddress',
      meta:{index:3},
      component: NewAddress
    },
    {
      path:'/statement',
      name:'Statement',
      meta:{index:3},
      component: Statement
    },
    {
      path:'/changepassword',
      name:'ChangePassword',
      meta:{index:3},
      component: ChangePassword
    },
    {
      path:'/userfeedback',
      name:'UserFeedback',
      meta:{index:3},
      component: UserFeedback
    },
    {
      path:'/aboutus',
      name:'AboutUs',
      meta:{index:3},
      component: AboutUs
    },
    {
      path:'/compile',
      name:'Compile',
      meta:{index:2},
      component: Compile
    },
    {
      path:'/invitecode',
      name:'InviteCode',
      meta:{index:2},
      component: InviteCode
    },
    {
      path:'/uploadheadImg',
      name:'UploadHeadImg',
      meta:{index:3},
      component: UploadHeadImg
    },
    {
      path:'/mypearl',
      name:'MyPearl',
      meta:{index:3},
      component: MyPearl
    },
    {
      path:'/preorder',
      name:'PreOrder',
      meta:{index:3},
      component: PreOrder
    }

  ]
})
