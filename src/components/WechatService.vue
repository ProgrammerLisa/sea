<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        客服中心
      </div>
    </div>

    <div v-if="netNone" class="netNone">
      <img :src="netNoneImg"/>
      <p>暂时还没有消息哦</p>
    </div>
    <div v-else class="service">
      <h4 class="serviceTitle">客服时间</h4>
      <p class="serviceTime">工作日 9:00-21:00</p>
      <p class="servicePrompt">如有问题请长按识别联系客服</p>
      <img :src="wechatservice"/>
    </div>
  </div>
</template>

<script>
    import netNoneImg from '@/assets/images/network.png'
    import wechatservice from '@/assets/images/wechatservice.png'
    export default {
        name: "WechatService",
        data(){
          return{
            netNone:false,
            netNoneImg:netNoneImg,
            wechatservice:wechatservice
          }
        },
        mounted(){

        },
        methods:{
          goBack(){
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #666;
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    width: 100%;
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
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .netNone{
    text-align: center;
    padding-top: 18vh;
    color: #999;
  }
  .netNone img{
    width: 40%;
    margin-bottom: 1rem;
  }
  .service{
    background: #fff;
    width: 70%;
    padding: 2rem;
    text-align: center;
    margin: auto;
    margin-top:15vh;
  }
  .service img{
    width: 70%;
  }
  .serviceTitle{
    color: #333;
  }
  .serviceTime{
    color: #09a2d6;
    font-size: larger;
  }
</style>
