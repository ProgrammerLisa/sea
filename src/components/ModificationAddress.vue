<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        修改地址
        <div class="keepSubmit">保存</div>
      </div>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-xs-3 control-label">收货人</label>
        <div class="col-xs-9">
          <input type="email" class="form-control" id="inputEmail3" placeholder="请填写收货人姓名">
        </div>
      </div>
      <div class="form-group">
        <label for="inputNumber3" class="col-xs-3 control-label">联系电话</label>
        <div class="col-xs-9">
          <input type="number" class="form-control" id="inputNumber3" placeholder="请填写收货手机号码">
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress3" class="col-xs-3 control-label">收货地址</label>
        <div class="col-xs-9">
          <input type="number" class="form-control" id="inputAddress3" placeholder="请选择地区">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPhone3" class="col-xs-3 control-label">补充说明</label>
        <div class="col-xs-9">
          <input type="number" class="form-control" id="inputPhone3" placeholder="详细地址(如门牌号等)">
        </div>
      </div>
    </form>
  </div>

</template>

<script>
    export default {
        name: "ModificationAddress",
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
    background-color: #fff;
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
  }
  .form-group:last-child{
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
  .keepSubmit{
    float: right;
    font-size: 1.5rem;
    padding: 0 1rem;
  }
</style>
