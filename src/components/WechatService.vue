<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        <span style="margin-left: -37px; position: absolute; left: 50%; font-size: 1.8rem;">客服中心</span>
      </div>
    </div>
	    <div v-if="netNone" class="netNone">
	    	<p class="back2">客服时间</p>
	    	<p class="back3">工作日 9:00-21:00</p>
	    	<p class="back4">如有问题请长按识别联系客服</p>
	      <img :src="netNoneImg"/>
	    </div>
  </div>
</template>

<script>
    import netNoneImg from '@/assets/images/erweima.png'
    export default {
        name: "WechatService",
        data(){
          return{
            netNone:true,
            netNoneImg:netNoneImg
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
  	top: 7rem;
  	padding-bottom: 6vh;
    text-align: center;
    padding-top: 6vh;
    position: relative;
    width: 60%;
    height: 50%;
    background-color: #FFFFFF;
    left: 20%;
  }
  .netNone img{
    width: 50%;
    margin-bottom: 1rem;
  }
  .back2{
  	color: #323232;
  	font-size: 1.5rem;
  }
  .back3{
  	color: #09A2D6;
  	font-size: 1.5rem;
  }
  .back4{
  	color: #323232;
  }
</style>
