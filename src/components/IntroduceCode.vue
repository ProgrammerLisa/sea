<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
          邀请码
        </div>
      </div>
      <div class="code">
        <input class="form-control codeInput" placeholder="请填写邀请码"/>
        <button class="btn codeBtn">完成</button>
      </div>
      <div class="agreement">
        <div class="round" @click="agree">
          <span class="defaultRound " v-if="isAgree">✔</span>
        </div>
       我同意 <span>《深海夺宝使用协议》</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "IntroduceCode",
        data(){
          return{
            isAgree:false
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);
          },
          agree(){
            const that = this;
            if(that.isAgree){
              that.isAgree = false;
            }else {
              that.isAgree = true;
            }
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #777;
    padding-bottom: 6rem;
    background-color: #fff;
    height: 100vh;
    width: 100vw;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 1rem;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.8rem;
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
  .code{
    padding: 5rem;
  }
  .codeInput{
    outline: none;
    border: none;
    box-shadow: none;
    border-bottom: solid 0.1rem #ddd;
    margin-bottom: 3.5rem;
    border-radius: 0;
  }
  .codeBtn{
    background: #09A2D6;
    width: 100%;
    color: #fff;
    border-radius: 0;
  }
  .agreement{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
  .round{
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.1rem solid #09A2D6;
    margin-right: 0.3rem;
    vertical-align: middle;
    text-align: center;
    line-height: 0.9rem;
  }
  .defaultRound{
    font-size: xx-small;
    color: #09A2D6;
    font-weight: normal;

  }
</style>
