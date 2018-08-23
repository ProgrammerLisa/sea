<template>
  <div class="content">
    <mu-appbar class="myNavTitle" textColor="#fff" z-depth="0" id="farmNav">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">
          好友养殖场
        </span>
    </mu-appbar>
    <div class="icon"><img :src="bh"/> <span style="vertical-align: middle">珍珠 {{imgSum}}</span></div>
    <div class="options" @click="LeavingMessage">
      <img src="../../assets/images/liuyanban.png" class="invitation-friends"/>
      <p>留言板</p>
    </div>
    <div class="farmBack">
      <div class="waitingContainer">
        <div class="waiting">
          <img :src="bh"/>
        </div>
        <div class="text-center">正在生长中...</div>
      </div>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/return.png'
  import backs from '@/assets/images/backs.png'
  import bh from '@/assets/images/bihe.png'
    export default {
        name: "friendfarm",
        data() {
          return {
            masrc: back,
            bh:bh,
            imgSum:0,
            id:''
          }
        },
        mounted(){
          this.id=this.$route.params.dataObj;
        },
        methods:{
          LeavingMessage(){
            this.$router.push({
              path: '/leavingmessage',
              name: 'leavingmessage',
              params: {
                name: 'name',
                dataObj: this.id
              }
            })
          },
          goBack() {
            this.$router.go(-1);
          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          }
        }
    }
</script>

<style scoped>
  .content{
    color: #fff;
    font-size: 1.6rem;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #1A3B57;
  }
  #farmNav{
    background: rgba(255,255,255,0.3);
    color: #fff;
  }
  .farmBack{
    width: 100%;
    height: 100vh;
    max-height: 730px;
    overflow: hidden;
    margin-top: -48px;
    background-image: url("../../assets/images/bg.png");
    background-size:100% 100%;
    background-repeat:repeat-x;
    background-position:center top;
  }
  .icon{
    position: absolute;
    left: 1rem;
    top: 6.5rem;
    background: rgba(0,0,0,0.2);
    border-radius: 2rem;
    padding: 0.1rem 1.5rem 0.1rem 0.5rem;
    font-size: 1.5rem;
  }
  .icon img{
    width: 2.5rem;
    border-radius: 50%;
  }
  .options{
    width: 6rem;
    text-align: center;
    position: absolute;
    top: 72vh;
    right: 0;
    color: #fff;
  }
  .options img{
    width: 80%;
  }
  .options img:active{
    transform: scale3d(0.8,0.8,0.8);
    transition: 0.1s;
  }
  .waitingContainer{
    margin-top: 40vh;
    font-size: 1.5rem;
  }
  .waiting{
    width: 6rem;
    height: 6rem;
    animation: myfirst 2s infinite;
    margin:1rem auto;
  }
  .waiting img{
    width: 100%;
  }
  @keyframes myfirst {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, -1rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }
</style>
