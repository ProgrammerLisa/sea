<template>
  <div class="content">

    <div class="myNav">
      <mu-container>
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <!--<mu-bottom-nav-item :title="item.title" v-for="(item,index) in navItem" :key="index" :icon="item.icon" @click="nav(index)"></mu-bottom-nav-item>-->
          <mu-bottom-nav-item title="首页" value="首页" icon=" " v-bind:iconClass="{selected:bottomNav=='首页'}"  to="/Home"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="发现" value="发现" icon=" " v-bind:iconClass="{selected:bottomNav=='发现'}" to="/find"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="商城" value="商城" icon=" " v-bind:iconClass="{selected:bottomNav=='商城'}" to="#"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="我的" value="我的" icon=" " v-bind:iconClass="{selected:bottomNav=='我的'}" to="/personal"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-container>
      <!--<div class="container">-->
        <!--<div class="row">-->
          <!--<div class="col-xs-3" v-for="(item,index) in navItem">-->
            <!--<div class="nav-item" @click="nav(index)">-->
              <!--&lt;!&ndash;<span v-show="item.newsCount" class="badge msg">·</span>&ndash;&gt;-->
              <!--<img :src="item.imgSrc1">-->
              <!--<span class="navTitle" :style="item.titleStyle">{{item.title}}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <mu-dialog  width="360" :open.sync="openSimple" style="text-align: center">
      <div class="publicDialogTitle">商场即将上线</div>
      <mu-button slot="actions" style="width: 100%;border-top: 1px solid #eee" flat color="primary" @click="closeSimpleDialog">知道了</mu-button>
    </mu-dialog>
    <!--<audio id="audioPlay" src="@/assets/audio/475.mp3"></audio>-->
    <router-view></router-view>
  </div>

</template>
<script>
  import home from '@/assets/images/home.png'
  import discovery from '@/assets/images/discovery.png'
  import store from '@/assets/images/store.png'
  import mine from '@/assets/images/profile_pressed.png'

  import home1 from '@/assets/images/home_pressed.png'
  import discovery1 from '@/assets/images/discovery_pressed.png'
  import store1 from '@/assets/images/store_pressed.png'
  import mine1 from '@/assets/images/profile.png'

  export default {
    name: "HelloWorld",
    props:['bottomIndex'],
    data(){
      return{
        bottomNav:'',
        uid:'',
        navItem:[
          {navSrc:'/Home',title:'首页',icon:'home',imgSrc1:home,imgSrc2:home1,titleStyle:'',newsCount:false},
          {navSrc:'/find',title:'发现',icon:'explore',imgSrc1:discovery,imgSrc2:discovery1,titleStyle:'',newsCount:false},
          {navSrc:'/shopping',title:'商城',icon:'shopping',imgSrc1:store,imgSrc2:store1,titleStyle:'',newsCount:false},
          {navSrc:'/personal',title:'我的',icon:'home',imgSrc1:mine,imgSrc2:mine1,titleStyle:'',newsCount:false}
        ],
        imgSrcArr:[
          home,discovery,store,mine
        ],
        isLogin:true,
        phoneType:'',
        openSimple: false
      }
    },
    mounted:function(){
      this.$nextTick(function () {
        this.begin();
      })

    },
    methods:{
      begin(){
        if(this.$route.path=='/'||this.$route.path=='/Home'){
          this.bottomNav='首页'
        }else if(this.$route.path=='/find'){
          this.bottomNav='发现'
        }else if(this.$route.path=='/personal'){
          this.bottomNav='我的'
        }
        let that = this;
        //判断手机类型
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          that.phoneType= "ios"
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //android
          that.phoneType= "android"
        }else {
          that.phoneType= "web"
        }

        this.$http({
          method: 'get',
          url: '/users/info',
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0){

          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))

        this.$http({
          method: "post",
          url: "/messages/box",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {
            "page":1
          }
        }).then(function(res){
          if(res.data.code==0) {
            if(res.data.count>0){
              this.navItem[3].newsCount = true
            }else {
              this.navItem[3].newsCount = false
            }
          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
      handleChange(val){
        this.bottomNav = val;
        if(this.bottomNav=='商城'){
          this.config()
        }
      },
      config() {
        this.openSimple = true;
      },
      closeSimpleDialog () {
        this.openSimple = false;
        if(this.$route.path=='/'||this.$route.path=='/Home'){
          this.bottomNav='首页'
        }else if(this.$route.path=='/find'){
          this.bottomNav='发现'
        }else if(this.$route.path=='/personal'){
          this.bottomNav='我的'
        }
      }
    }
  }

</script>

<style>
  .mu-bottom-nav{
    height: 48px;
  }
  .mu-bottom-item{
    padding: 0;
  }
  a:hover, a:focus ,a:visited,a:active{
    text-decoration: none;
    border: none;
    outline: none;
  }
  a:nth-child(1){
    color: #555;
  }
  a:nth-child(2){
    color: #555;
  }
  a:nth-child(3){
    color: #555;
  }
  a:nth-child(4){
    color: #555;
  }
  .mu-bottom-item-active:nth-child(1){
    color: #09a2d6;
  }
  .mu-bottom-item-active:nth-child(1) .mu-bottom-item-icon{
    background-image: url(../assets/images/home_pressed.png) ;
  }
  .mu-bottom-item-active:nth-child(2){
    color: #09a2d6;
  }
  .mu-bottom-item-active:nth-child(2) .mu-bottom-item-icon{
    background-image: url(../assets/images/discovery_pressed.png) ;
  }
  .mu-bottom-item-active:nth-child(3){
    color: #09a2d6;
  }
  .mu-bottom-item-active:nth-child(3) .mu-bottom-item-icon{
    background-image: url(../assets/images/store_pressed.png) ;
  }
  .mu-bottom-item-active:nth-child(4){
    color: #09a2d6;
  }
  .mu-bottom-item-active:nth-child(4) .mu-bottom-item-icon{
    background-image: url(../assets/images/profile.png) ;
  }
  .mu-bottom-item-active:nth-child(1) .mu-bottom-item-icon,.mu-bottom-item-active:nth-child(2) .mu-bottom-item-icon,.mu-bottom-item-active:nth-child(3) .mu-bottom-item-icon,.mu-bottom-item-active:nth-child(4) .mu-bottom-item-icon{
    background-repeat:no-repeat;
    width:2.5rem;
    height:2.5rem;
    background-size:auto 2.5rem;
    padding-top: 0;
    padding-bottom:0;

  }
  .myNav{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
  }
.msg{
  color: #ff2424;
  background: transparent;
  font-size: xx-large;
  padding: 0.5rem ;
  line-height: 0;
  position: absolute;
  right: 1.2rem;
}
  a:nth-child(1) .mu-bottom-item-icon,a:nth-child(2) .mu-bottom-item-icon,a:nth-child(3) .mu-bottom-item-icon,a:nth-child(4) .mu-bottom-item-icon{
    background-repeat:no-repeat;
    width:2.5rem;
    height:2.5rem;
    background-size:auto 2.5rem;
     padding-top: 0;
     padding-bottom:0;
  }
  a:nth-child(1) .mu-bottom-item-icon{
    background-image: url(../assets/images/home.png) ;
  }
  a:nth-child(2) .mu-bottom-item-icon {
    background-image: url(../assets/images/discovery.png) ;
  }
  a:nth-child(3) .mu-bottom-item-icon{
    background-image: url(../assets/images/store.png) ;
  }

  a:nth-child(4) .mu-bottom-item-icon {
    background-image: url(../assets/images/profile_pressed.png) ;
  }
</style>

