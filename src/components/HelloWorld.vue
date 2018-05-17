<template>
  <div class="content">
    <div class="myNav">
      <div class="container">
        <div class="row">
          <div class="col-xs-3 parents" v-for="(item,index) in navItem">
            <router-link :to="item.navSrc" tag="div" class="nav-item" @click.native="nav(index)">
              <img :src="item.imgSrc1">
              <span class="navTitle">{{item.title}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
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
        navItem:[
          {navSrc:'Home',title:'首页',imgSrc1:home,imgSrc2:home1},
          {navSrc:'GetForce',title:'发现',imgSrc1:discovery,imgSrc2:discovery1},
          {navSrc:'Shopping',title:'商城',imgSrc1:store,imgSrc2:store1},
          {navSrc:'',title:'我的',imgSrc1:mine,imgSrc2:mine1}
        ],
        imgSrcArr:[
          home,discovery,store,mine
        ],
        isLogin:true
      }
    },
    mounted:function(){
        const that = this;
        if(that.isLogin){
          that.navItem[3].navSrc='Personal'
        }else {
          that.navItem[3].navSrc='Login'
        }
    },
    methods:{
      nav(index){
        const that = this;
        $('.nav-item').eq(index).css({color:'#09a2d6'}).parents(".parents").siblings().find('.nav-item').css({color:'#555'});
        for(var i=0;i<that.navItem.length;i++){
          that.navItem[i].imgSrc1 = that.imgSrcArr[i];
        }
        that.navItem[index].imgSrc1 = that.navItem[index].imgSrc2;


      }
    }
  }

</script>

<style scoped>
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
  }
  .navTitle{
    padding-top: 0;
  }
  .nav-item img{
    display: block;
    margin: auto;
    width: 3rem;
  }

</style>

