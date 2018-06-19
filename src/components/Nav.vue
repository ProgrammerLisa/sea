<template>
  <div class="content">
    <div class="myNav">
      <div class="container">
        <div class="row">
          <div class="col-xs-3 parents" v-for="(item,index) in navItem">
            <div class="nav-item" @click="nav(index)">
              <img :src="item.imgSrc1">
              <span class="navTitle" :style="item.titleStyle">{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    data(){
      return{
        uid:'',
        navItem:[
          {navSrc:'/home',title:'首页',imgSrc1:home,imgSrc2:home1,titleStyle:''},
          {navSrc:'/find',title:'发现',imgSrc1:discovery,imgSrc2:discovery1,titleStyle:''},
          {navSrc:'/shopping',title:'商城',imgSrc1:store,imgSrc2:store1,titleStyle:''},
          {navSrc:'/personal',title:'我的',imgSrc1:mine,imgSrc2:mine1,titleStyle:''}
        ],
        imgSrcArr:[
          home,discovery,store,mine
        ],
        isLogin:true,
        phoneType:''
      }
    },
    mounted:function(){
        const that = this;

        that.navItem.forEach(function (c) {
          if(c.navSrc==that.$route.path){
            c.imgSrc1 = c.imgSrc2;
            c.titleStyle='color:#09a2d6'
          }else if(that.$route.path=='/'){
            that.navItem[0].imgSrc1=that.navItem[0].imgSrc2;
            that.navItem[0].titleStyle='color:#09a2d6';
          }
        })

        that.uid = that.readCookie('uid');
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
        url: '/api/users/profile',
        headers:{"device":"android","uid":that.uid,"Access-Control-Allow-Origin":"*"},
        data: {}
      }).then(function(res){
        console.log(res.data)
        if(res.data.code==0){
         console.log(res.data.data)

        }else {
          this.$layer.msg(res.data.msg);
        }
      }.bind(this))
        .catch(function(err){
          console.log(err)
        }.bind(this))

    },
    methods:{
      nav(index){
        const that = this;
        for(var i=0;i<that.navItem.length;i++){
          that.navItem[i].imgSrc1 = that.imgSrcArr[i];
          that.navItem[i].titleStyle='';
          that.$router.replace(that.navItem[index].navSrc);
        }
        that.navItem[index].imgSrc1 = that.navItem[index].imgSrc2;
        that.navItem[index].titleStyle='color:#09a2d6'
      },
      readCookie(name) {
        var cookieValue = "";
        var search = name + "=";
        if(document.cookie.length > 0) {
          var offset = document.cookie.indexOf(search);
          if(offset != -1) {
            offset += search.length;
            var end = document.cookie.indexOf(";", offset);
            if(end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
          }
        }
        return cookieValue;
      },
    }
  }

</script>

<style scoped>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ·······················································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································
  body {
    background-color: #f5f5f5;
  }
  html{
    font-size:62.5%;
  }
  .content{
    margin-bottom: 60px;
    color: #555;
  }
  .myNav{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 0.1rem;
    background: #fff;
    z-index: 99;
    border-top: 0.1rem solid #eee;
  }
  .nav-item{
    display: flex;
    flex-direction:column;
    text-align: center;
    font-size: smaller;
    color: #777;
  }
  .navTitle{
    padding-top: 0;
  }
  .nav-item img{
    display: block;
    margin: auto;
    width: 2.5rem;
  }

</style>

