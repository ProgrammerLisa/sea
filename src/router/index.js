import Vue from 'vue'
import Router from 'vue-router'
import layer from 'vue-layer'
import $ from 'jquery'
import '@/assets/css/bootstrap.css'
import '@/assets/js/bootstrap.js'
import '@/assets/js/jq.js'
import '@/assets/js/jquery-ui.js'

Vue.use(Router)

Vue.prototype.$layer = layer(Vue);

let defaultRouter;
let uid = localStorage.getItem('uid');
if(uid!=null&&uid!=undefined&&uid!=''){
  defaultRouter = {
    path: '/',
    meta:{index:0},
    component: resolve => require(['@/components/Nav'], resolve),
    children: [
      {
        path: '/',
        meta:{index:0},
        component: resolve => require(['@/components/Home/Home'], resolve)
      }
    ]
  }
}else {
  defaultRouter = {
    path: '/',
    meta:{index:1},
    component: resolve => require(['@/components/Login/Login'], resolve)
  }
}

export default new Router({
  routes: [
    defaultRouter,

    {
      path: '/nav',
      meta:{index:0},
      component: resolve => require(['@/components/Nav'], resolve),
      children:[
        {
          path:'/',
          meta:{index:1},
          component:  resolve => require(['@/components/Home/Home'], resolve)
        },
        {
          path:'/home',
          meta:{index:1},
          component:resolve => require(['@/components/Home/Home'], resolve)
        },
        {
          path:'/find',
          meta:{index:1},
          component:resolve => require(['@/components/Find/Find'], resolve)
        },
        {
          path:'/shopping',
          meta:{index:1},
          component:resolve => require(['@/components/Shopping/Shopping'], resolve)
        },
        {
          path:'/personal',
          meta:{ index: 1},
          component: resolve => require(['@/components/Profile/Profile'], resolve)
        }
      ]
    },
    {
      path:'/find',
      meta:{index:1},
      component: resolve => require(['@/components/Find/Find'], resolve)
    },
    {
      path: '/register',
      name:'register',
      meta:{index:2},
      component:  resolve => require(['@/components/Login/Register'], resolve)
    },
    {
      path:'/login',
      name:'login',
      meta:{index:1},
      component:  resolve => require(['@/components/Login/Login'], resolve)
    },
    {
      path:'/retrieve',
      name:'retrieve',
      component: resolve => require(['@/components/Login/RetrievePassword'], resolve)
    },
    {
      path:'/ask',
      name:'ask',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/Invite'], resolve)
    },
    {
      path:'/friend',
      name:'friend',
      meta:{index:2},
      component: resolve => require(['@/components/Profile/friend'], resolve)
    },
    {
      path:'/address',
      name:'address',
      meta:{index:2},
      component: resolve => require(['@/components/Profile/Address'], resolve)
    },
    {
      path:'/service',
      name:'service',
      meta:{index:2},
      component:  resolve => require(['@/components/Profile/Service'], resolve)
    },
    {
      path:'/wechatservice',
      name:'wechatservice',
      meta:{index:2},
      component:  resolve => require(['@/components/Profile/WechatService'], resolve)
    },

    {
      path:'/setting',
      name:'setting',
      meta:{index:2},
      component: resolve => require(['@/components/Profile/setting'], resolve)
    },
    {
      path:'/realname',
      name:'realname',
      meta:{index:2},
      component: resolve => require(['@/components/Profile/RealName'], resolve)
    },
    {
      path:'/wallet',
      name:'wallet',
      meta:{index:2},
      component:  resolve => require(['@/components/Profile/Wallet'], resolve)
    },
    {
      path:'/news',
      name:'news',
      meta:{index:2},
      component:  resolve => require(['@/components/Profile/news'], resolve)
    },
    {
      path:'/addfriends',
      name:'addfriends',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/AddFriends'], resolve)
    },
    {
      path:'/commoditydetails',
      name:'commoditydetails',
      meta:{index:2},
      component:  resolve => require(['@/components/Shopping/CommodityDetails'], resolve)
    },
    {
      path:'/commodityorder',
      name:'commodityorder',
      meta:{index:2},
      component:  resolve => require(['@/components/Shopping/CommodityOrder'], resolve)
    },
    {
      path:'/modificationaddress',
      name:'modificationaddress',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/ModificationAddress'], resolve)
    },
    {
      path:'/newaddress',
      name:'newaddress',
      meta:{index:5},
      component:  resolve => require(['@/components/Profile/NewAddress'], resolve)
    },
    {
      path:'/statement',
      name:'statement',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/Statement'], resolve)
    },
    {
      path:'/changepassword',
      name:'changepassword',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/ChangePassword'], resolve)
    },
    {
      path:'/userfeedback',
      name:'userfeedback',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/UserFeedback'], resolve)
    },
    {
      path:'/aboutus',
      name:'aboutus',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/AboutUs'], resolve)
    },
    {
      path:'/compile',
      name:'compile',
      meta:{index:2},
      component: resolve => require(['@/components/Profile/Compile'], resolve)
    },
    {
      path:'/uploadheadImg',
      name:'uploadheadimg',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/UploadHeadImg'], resolve)
    },
    {
      path:'/uploadPhotoImg',
      name:'uploadphotoimg',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/UploadPhotoImg'], resolve)
    },
    {
      path:'/mypearl',
      name:'mypearl',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/MyPearl'], resolve)
    },
    {
      path:'/preorder',
      name:'preorder',
      meta:{index:3},
      component:  resolve => require(['@/components/Shopping/PreOrder'], resolve)
    },{
    	path:'/registerinvitecode',
    	name:'registerinvitecode',
    	meta:{index:3},
    	component:  resolve => require(['@/components/Login/RegisterInviteCode'], resolve)
    },{
      path:'/newsdetails',
      name:'newsdetails',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/NewsDetails'], resolve)
    },{
      path:'/gamerules',
      name:'gamerules',
      meta:{index:2},
      component:  resolve => require(['@/components/Home/GameRules'], resolve)
    },{
      path:'/nickname',
      name:'nickname',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/Nickname'], resolve)
    },{
      path:'/grade',
      name:'grade',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/Grade'], resolve)
    },{
      path:'/sdfs',
      name:'sdfs',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/Sdfs'], resolve)
    },{
      path:'/myrankings',
      name:'myrankings',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/MyRankings'], resolve)
    },{
      path:'/frienddata',
      name:'frienddata',
      meta:{index:3},
      component:  resolve => require(['@/components/Profile/FriendData'], resolve)
    },{
      path:'/photowall',
      name:'photowall',
      meta:{index:4},
      component:  resolve => require(['@/components/Profile/PhotoWall'], resolve)
    },{
      path:'/publicgood',
      name:'publicgood',
      meta:{index:2},
      component:  resolve => require(['@/components/Find/PublicGood'], resolve)
    },{
      path:'/donation',
      name:'donation',
      meta:{index:3},
      component:  resolve => require(['@/components/Find/Donation'], resolve)
    },{
      path:'/donationcount',
      name:'donationcount',
      meta:{index:4},
      component:  resolve => require(['@/components/Find/DonationCount'], resolve)
    },{
      path:'/record',
      name:'record',
      meta:{index:2},
      component:  resolve => require(['@/components/Home/Record'], resolve)
    },{
      path:'/friendfarm',
      name:'friendfarm',
      meta:{index:4},
      component:  resolve => require(['@/components/Farm/FriendFarm'], resolve)
    },{
      path:'/leavingmessage',
      name:'leavingmessage',
      meta:{index:5},
      component:  resolve => require(['@/components/Farm/LeavingMessage'], resolve)
    },{
      path:'/chooseaddress',
      name:'chooseaddress',
      meta:{index:4},
      component:  resolve => require(['@/components/Shopping/ChooseAddress'], resolve)
    }


  ]
})



