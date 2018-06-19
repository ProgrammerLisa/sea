<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        新建地址

      </div>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="name" class="col-xs-3 control-label">收货人</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" id="name" placeholder="请填写收货人姓名">
        </div>
      </div>
      <div class="form-group">
        <label for="phone" class="col-xs-3 control-label">联系电话</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" id="phone" placeholder="请填写收货手机号码">
        </div>
      </div>
      <div class="form-group">
        <label for="address" class="col-xs-3 control-label">收货地址</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" id="address" placeholder="请选择地区">
        </div>
      </div>
      <div class="form-group">
        <label for="home" class="col-xs-3 control-label">补充说明</label>
        <div class="col-xs-9">
          <input type="text" class="form-control" id="home" placeholder="详细地址(如门牌号等)">
        </div>
      </div>
      <div class="keep">
        <div class="keepSubmit" @click="submit">保 存</div>
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
      },
      submit(){
        if($("#name").val()==''||$("#name").val()==null||$("#name").val()==undefined){
          this.$layer.msg('请填写收货人');
        }else if($("#phone").val()==''||$("#phone").val()==null||$("#phone").val()==undefined){
          this.$layer.msg('请填写联系电话');
        }else if($("#address").val()==''||$("#address").val()==null||$("#address").val()==undefined){
          this.$layer.msg('请填写收货地址');
        }else if($("#home").val()==''||$("#home").val()==null||$("#home").val()==undefined){
          this.$layer.msg('请填写具体地址');
        }else {
          this.$http({
            method: "post",
            url: "/api/users/delivery_address/add",
            headers:{"device":"android","uid":this.uid,"Access-Control-Allow-Origin":"*"},
            data: {
              consignee:$("#name").val(),
              phone:$("#phone").val(),
              address:$("#address").val()+$("#home").val()
            }
          }).then(function(res){
            if(res.data.code==0){
              this.$layer.msg(res.data.msg);
              this.$router.go(-1);
            }else {
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              console.log(err)
            }.bind(this))
        }
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
    font-size: 1.6rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .form-horizontal{
    border-top: 0.5rem solid #f5f5f5;
  }
  .form-group{
    padding:1rem 3rem;
    border-bottom: 0.1rem solid #eee;
    margin-bottom: 0;
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
    margin-bottom: 0;
    padding: 0.4rem 0;
  }
  .keep{
    background: #f5f5f5;
    padding: 2rem 0;
  }
  .keepSubmit{
    width: 90%;
    margin: auto;
    background: #09a2d6;
    color: #fff;
    text-align: center;
    font-size: larger;
    padding: 0.5rem;
  }
</style>
