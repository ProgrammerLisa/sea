<template>
  <div class="content">
    <div class="myNav">
      <div class="container">
        <div class="row">
          <div class="col-xs-3 parents" v-for="(item,index) in navItem">
            <div class="nav-item" @click="nav(index)">
              <span v-show="item.newsCount" class="badge msg">·</span>
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
          {navSrc:'/home',title:'首页',imgSrc1:home,imgSrc2:home1,titleStyle:'',newsCount:false},
          {navSrc:'/find',title:'发现',imgSrc1:discovery,imgSrc2:discovery1,titleStyle:'',newsCount:false},
          {navSrc:'/shopping',title:'商城',imgSrc1:store,imgSrc2:store1,titleStyle:'',newsCount:false},
          {navSrc:'/personal',title:'我的',imgSrc1:mine,imgSrc2:mine1,titleStyle:'',newsCount:false}
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
        });

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
        url: '/users/profile',
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
      }
    }
  }

</script>

<style scoped>
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
.msg{
  color: #ff2424;
  background: transparent;
  font-size: xx-large;
  padding: 0.5rem ;
  line-height: 0;
  position: absolute;
  right: 1.2rem;
}
</style>

