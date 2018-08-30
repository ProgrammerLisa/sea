
<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">留言板</span>
    </mu-appbar>
    <div class="text contentMarginTop">
      <textarea class="form-control" rows="5" placeholder="给Ta下个战书吧~" v-model="text"></textarea>
      <mu-button color="#09a2d6" @click="submitBtn" class="submitBtn">提交</mu-button>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'

  export default {
    name: "leavingmessage",
    data(){
      return {
        masrc: back,
        text:''
      }
    },
    mounted(){

    },
    methods: {
      submitBtn(){
        let res = new RegExp("^[ ]+$");
        if(this.text===''||res.test(this.text)===true){
          this.messageMsg="回复内容不能为空";
          this.messageMsgShow=true;
        }else {
          this.$http({
            method: "post",
            url: "/messages/leave-message",
            headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            data: {
              content:this.text,
              to_user:localStorage.getItem("friend_uid")
            }
          }).then(function(res){
            this.$layer.msg(res.data.msg)
            if(res.data.code==0){
              this.$router.go(-1);
            }
          }.bind(this))
            .catch(function(err){
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this));
        }

      },
      evers() {
        this.masrc = backs;
      },
      lat() {
        this.masrc = back;
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .content {
    overflow-x: hidden;
    color: #666;
    background-color: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
  }

  .text {
    padding: 1rem;
  }

  .form-control {
    outline: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }

  .submitBtn {
    background: #09a2d6;
    color: #fff;
    width: 100%;
    border-radius: 0;
    font-size: large;
    margin-top: 4rem;
  }
  .submitBtn:active{
    background: #009ACD;
  }
  .submitBtn:focus{
    outline: 0;
  }
</style>
