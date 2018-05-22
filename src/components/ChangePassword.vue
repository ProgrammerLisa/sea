<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
          重置密码
        </div>
      </div>
      <form class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-xs-3 control-label">账户</label>
          <div class="col-xs-9">
            <input type="email" class="form-control" id="inputEmail3" placeholder="请输入账号">
          </div>
        </div>
        <div class="form-group">
          <label for="inputNumber3" class="col-xs-3 control-label">原密码</label>
          <div class="col-xs-9">
            <input type="password" class="form-control" id="inputNumber3" placeholder="请填写原密码">
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress3" class="col-xs-3 control-label">新密码</label>
          <div class="col-xs-9">
            <input type="password" class="form-control" id="inputAddress3" placeholder="请填写新密码">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPhone3" class="col-xs-3 control-label">确认密码</label>
          <div class="col-xs-9">
            <input type="password" class="form-control" id="inputPhone3" placeholder="请再次填写确认密码">
          </div>
        </div>
        <div class="prompt">
          <span>密码必须是8-16位，至少含数字、字母、字符2种组合</span>
        </div>
        <div class="form-group submit">
          <button class="btn submitBtn">确 定</button>
        </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
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
    color: #777;
    padding-bottom: 6rem;
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
  .form-group{
    padding:0.8rem 1rem;
    border-bottom: 0.1rem solid #eee;
    background: #fff;
    margin-bottom: 0;
  }
  .form-control{
    outline: none;
    border: none;
    box-shadow: none;
  }
  .control-label{
    font-size: 1.6rem;
    color: #555;
  }
  .prompt{
    font-size: smaller;
    color: #09a2d6;
    padding: 1rem;
    background: #fff;
  }
  .submit{
    background: #f5f5f5;
    border: none;
    text-align: center;
  }
  .submitBtn{
    background: #09a2d6;
    color: #fff;
    width: 92%;
    font-size: large;
    margin-top: 2.5rem;
    border-radius: 0;
  }
</style>
