<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
          提意见
        </div>
      </div>
      <div class="text">
        <textarea class="form-control" rows="12" placeholder="请将您的意见或建议留言发给我们，收到后我们会立即处理并给予回复哦~"></textarea>
        <button class="btn submitBtn">提交</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UserFeedback",
        methods: {
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
    background-color: #f5f5f5;
    width: 100vw;
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
  .text{
    padding: 1rem;
  }
  .form-control{
    outline: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
  .submitBtn{
    background: #09a2d6;
    color: #fff;
    width: 100%;
    border-radius: 0;
    font-size: large;
    margin-top: 4rem;
  }
</style>
