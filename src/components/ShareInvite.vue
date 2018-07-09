<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"><span>ㄑ</span></span>
        <div class="contentTitle">邀请码</div>
      </div>
    </div>
    <div class="code">
      <h4 class="title">我的专属邀请码</h4>
      <div id="ask_invite" v-model="ask_invite">{{ask_invite}}</div>
      <div style="padding-top:40px;">
        <p class="msg">每邀请一位好友下载并注册，你和好友都将获得同等奖励</p>
        <x-button id="finish"  type="primary">分享给好友</x-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { XInput, Group, XButton, CheckIcon } from 'vux'

  export default {
    name: 'ShareInvite',
    components: {
      XInput,
      Group,
      XButton,
      CheckIcon
    },
    data() {
      return {
        ask_invite: '',
        check: '',
        demo1: false,
        demo2: true
      }
    },
    mounted(){
      this.$http({
        method: "post",
        url: "/users/my-invite-code",
        headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
        data: {}
      }).then(function(res){
        if(res.data.code==0){
          this.ask_invite = res.data.my_invite_code
        }else {
          this.$layer.msg(res.data.msg);
        }
      }.bind(this))
        .catch(function(err){
          console.log(err)
        }.bind(this))
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }

    }
  }
</script>

<style scoped>
  .content{
    overflow: hidden;
    color: #666;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    position: absolute;
    left: 1rem;
  }
  .back img {
    height: 2.5rem;
  }
  .code{
    padding: 2rem;
    text-align: center;
  }
  .title{
    color: #444;
    margin-bottom: 2rem;
  }
  #ask_invite {
    text-align: center;
    color: #09A2D6;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    /*padding-left: 1.2rem;*/
    font-size: 5rem;
    border-bottom: 1px solid #eee;
    width: 100%;
    outline: none;
    letter-spacing: 0.05rem;
    padding-bottom: 0.5rem;
  }
  .msg{
    color: #777;
    font-size: smaller;
    text-align: center;
  }
  #finish{
    background-color:#09A2D6;
    color: white;
    border-radius: 0;
    width: 100%;
  }

</style>
