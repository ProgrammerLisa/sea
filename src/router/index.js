import Vue from 'vue'
import Router from 'vue-router'
import layer from 'vue-layer'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import '@/assets/js/jquery-ui.js'

import AboutUs from '@/components/Profile/AboutUs'
import AddFriends from '@/components/Profile/AddFriends'
import address from '@/components/Profile/Address'
import Ask from '@/components/Profile/Invite'

import ChangePassword from '@/components/Profile/ChangePassword'
import CommodityDetails from '@/components/Shopping/CommodityDetails'
import CommodityOrder from '@/components/Shopping/CommodityOrder'
import Compile from '@/components/Profile/Compile'

import Donation from '@/components/Find/Donation'
import DonationCount from '@/components/Find/DonationCount'

import Find from '@/components/Find/Find'
import friend from '@/components/Profile/friend'
import FriendData from '@/components/Profile/FriendData'
import FriendFarm from '@/components/Farm/FriendFarm'

import GameRules from '@/components/Home/GameRules'

import Home from '@/components/Home/Home'

import Login from '@/components/Login/Login'

import ModificationAddress from '@/components/Profile/ModificationAddress'
import MyPearl from '@/components/Profile/MyPearl'
import MyRankings from '@/components/Profile/MyRankings'

import nav from '@/components/Nav'
import news from '@/components/Profile/news'
import NewAddress from '@/components/Profile/NewAddress'
import NewsDetails from '@/components/Profile/NewsDetails'
import Nickname from '@/components/Profile/Nickname'
import Grade from '@/components/Profile/Grade'
import Sdfs from '@/components/Profile/Sdfs'

import PublicGood from '@/components/Find/PublicGood'
import Personal from '@/components/Profile/Profile'
import PreOrder from '@/components/Shopping/PreOrder'
import PhotoWall from '@/components/Profile/PhotoWall'

import RealName from '@/components/Profile/RealName'
import Record from '@/components/Home/Record'
import Register from '@/components/Login/Register'
import Retrieve from '@/components/Login/RetrievePassword'
import RegisterInviteCode from '@/components/Login/RegisterInviteCode'

import Service from '@/components/Profile/Service'
import Setting from '@/components/Profile/Setting'
import Shopping from '@/components/Shopping/Shopping'
import Statement from '@/components/Profile/Statement'

import UserFeedback from '@/components/Profile/UserFeedback'
import UploadHeadImg from '@/components/Profile/UploadHeadImg'
import UploadPhotoImg from '@/components/Profile/UploadPhotoImg'

import Wallet from '@/components/Profile/Wallet'
import WechatService from '@/components/Profile/WechatService'

Vue.use(Router)

Vue.prototype.$layer = layer(Vue);

let defaultRouter;
let uid = localStorage.getItem('uid');
if(uid!=null&&uid!=undefined&&uid!=''){
  defaultRouter = {
    path: '/',
    meta:{index:0},
    component: nav,
    children: [
      {
        path: '/',
        meta:{index:0},
        component: Home
      }
    ]
  }
}else {
  defaultRouter = {
    path: '/',
    meta:{index:1},
    component: Login
  }
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
          meta:{ index: 1},
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
      name:'ask',
      meta:{index:3},
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
      name:'service',
      meta:{index:2},
      component: Service
    },
    {
      path:'/wechatservice',
      name:'WechatService',
      meta:{index:2},
      component: WechatService
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
      path:'/uploadheadImg',
      name:'UploadHeadImg',
      meta:{index:3},
      component: UploadHeadImg
    },
    {
      path:'/uploadPhotoImg',
      name:'UploadPhotoImg',
      meta:{index:3},
      component: UploadPhotoImg
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
    },{
    	path:'/RegisterInviteCode',
    	name:'RegisterInviteCode',
    	meta:{index:3},
    	component: RegisterInviteCode
    },{
      path:'/newsdetails',
      name:'NewsDetails',
      meta:{index:3},
      component: NewsDetails
    },{
      path:'/gamerules',
      name:'GameRules',
      meta:{index:2},
      component: GameRules
    },{
      path:'/nickname',
      name:'Nickname',
      meta:{index:3},
      component: Nickname
    },{
      path:'/Grade',
      name:'Grade',
      meta:{index:3},
      component: Grade
    },{
      path:'/Sdfs',
      name:'Sdfs',
      meta:{index:3},
      component: Sdfs
    },{
      path:'/myrankings',
      name:'MyRankings',
      meta:{index:3},
      component: MyRankings
    },{
      path:'/frienddata',
      name:'FriendData',
      meta:{index:3},
      component: FriendData
    },{
      path:'/photowall',
      name:'PhotoWall',
      meta:{index:4},
      component: PhotoWall
    },{
      path:'/publicgood',
      name:'PublicGood',
      meta:{index:2},
      component: PublicGood
    },{
      path:'/donation',
      name:'Donation',
      meta:{index:3},
      component: Donation
    },{
      path:'/donationcount',
      name:'DonationCount',
      meta:{index:4},
      component: DonationCount
    },{
      path:'/record',
      name:'Record',
      meta:{index:2},
      component: Record
    },{
      path:'/friendfarm',
      name:'FriendFarm',
      meta:{index:4},
      component: FriendFarm
    },


  ]
})



