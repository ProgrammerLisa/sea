<template>
  <div class="content" id="navVue">
    <audio id="snd"src="../assets/audio/ajy.mp3" style="display: none;"></audio>

    <div class="myNav">
        <mu-bottom-nav :value="bottomNav" @change="handleChange">
          <!--<mu-bottom-nav-item :title="item.title" v-for="(item,index) in navItem" :key="index" :icon="item.icon" @click="nav(index)"></mu-bottom-nav-item>-->
          <mu-bottom-nav-item title="首页" to="/home" value="首页" icon=" " v-bind:iconClass="{selected:bottomNav=='首页'}"  ></mu-bottom-nav-item>
          <mu-bottom-nav-item title="发现" to="/find" value="发现" icon=" " v-bind:iconClass="{selected:bottomNav=='发现'}"  ></mu-bottom-nav-item>
          <mu-bottom-nav-item class='redian' to="/journalism"  icon=" " v-bind:iconClass="{selected:bottomNav=='热点'}"  ></mu-bottom-nav-item>
          <mu-bottom-nav-item title="商城" to="/shopping" value="商城" icon=" " v-bind:iconClass="{selected:bottomNav=='商城'}"  ></mu-bottom-nav-item>
          <mu-bottom-nav-item title="我的" to="/personal" value="我的" icon=" " v-bind:iconClass="{selected:bottomNav=='我的'}"  ></mu-bottom-nav-item>
        </mu-bottom-nav>

    </div>
    <mu-dialog  width="360" :open.sync="openSimple" style="text-align: center;border-radius: 3px">
      <div class="publicDialogTitle">商场即将上线</div>
      <mu-button slot="actions" style="width: 100%;border-top: 1px solid #eee" flat color="primary" @click="closeSimpleDialog">知道了</mu-button>
    </mu-dialog>
    <router-view></router-view>
  </div>

</template>
<script>


  export default {
    name: "HelloWorld",
    props:['bottomIndex'],
    data(){
      return{
        bottomNav:'',
        uid:'',
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

        if(this.$route.path==='/'||this.$route.path==='/home'){
          this.bottomNav='首页'
        }else if(this.$route.path==='/find'){
          this.bottomNav='发现'
        }else if(this.$route.path==='/shopping'){
          this.bottomNav='商城'
        }else if(this.$route.path==='/personal'){
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

      },
      handleChange(val,src){
        this.bottomNav = val;
        let a = document.getElementById('snd');
        a.volume = 0.2;
        a.play();
        // if(this.bottomNav==='商城'){
        //   this.config()
        // }
      },
      config() {
        this.openSimple = true;
      },
      closeSimpleDialog () {
        this.openSimple = false;
        if(this.$route.path==='/'||this.$route.path==='/home'){
          this.bottomNav='首页'
        }else if(this.$route.path==='/find'){
          this.bottomNav='发现'
        }else if(this.$route.path==='/shopping'){
          this.bottomNav='商城'
        }else if(this.$route.path==='/personal'){
          this.bottomNav='我的'
        }
      }
    }
  }

</script>

<style lang="less">
  #navVue{
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
      color: #999;
    }
    a:nth-child(2){
      color: #999;
    }
    a:nth-child(3){
      color: #999;
      height: 7rem;
    }
    a:nth-child(4){
      color: #999;
    }
    a:nth-child(5){
      color: #999;
    }
    .mu-bottom-item-active:nth-child(1){
      color: #333333;
    }
    .mu-bottom-item-active:nth-child(1) .mu-bottom-item-icon{
      background-image: url(../assets/images/home_pressed.png) ;
    }
    .mu-bottom-item-active:nth-child(2){
      color: #333333;
    }
    .mu-bottom-item-active:nth-child(2) .mu-bottom-item-icon{
      background-image: url(../assets/images/discovery_pressed.png) ;
    }
    .mu-bottom-item-active:nth-child(3){
      color: #333333;
    }
    .mu-bottom-item-active:nth-child(3) .mu-bottom-item-icon{
      background-image: url(../assets/images/redianxinwen.png) ;
    }
    .mu-bottom-item-active:nth-child(4){
      color: #333333;
    }
    .mu-bottom-item-active:nth-child(4) .mu-bottom-item-icon{
      background-image: url(../assets/images/store_pressed.png) ;
    }
    .mu-bottom-item-active:nth-child(5){
      color: #333333;
    }
    .mu-bottom-item-active:nth-child(5) .mu-bottom-item-icon{
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
      padding-top: 3px;
      border-top: 1px solid #f5f5f5;
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
    a:nth-child(1) .mu-bottom-item-icon,a:nth-child(2) .mu-bottom-item-icon,a:nth-child(4) .mu-bottom-item-icon,a:nth-child(5) .mu-bottom-item-icon{
      background-repeat:no-repeat;
      width:2.5rem;
      height:2.5rem;
      background-size:auto 2.5rem;
      padding-top: 0;
      padding-bottom:0;
    }
    .mu-bottom-item-active:nth-child(3) .mu-bottom-item-icon{
      width:5.5rem;
      height:5.5rem;
      background-size:auto 5.5rem;
      background-repeat:no-repeat;
    }
    /*.redian{
        width: 3.5rem;
    }*/
    a:nth-child(1) .mu-bottom-item-icon{
      background-image: url(../assets/images/home.png) ;
    }
    a:nth-child(2) .mu-bottom-item-icon {
      background-image: url(../assets/images/discovery.png) ;
    }
    a:nth-child(3) .mu-bottom-item-icon{
      background-image: url(../assets/images/redianxinwen.png) ;
      width:5.5rem;
      height:5.5rem;
      background-size:auto 5.5rem;
      background-repeat:no-repeat;
    }

    a:nth-child(4) .mu-bottom-item-icon {
      background-image: url(../assets/images/store.png) ;
    }
    a:nth-child(5) .mu-bottom-item-icon {
      background-image: url(../assets/images/profile_pressed.png) ;
    }
  }

</style>

