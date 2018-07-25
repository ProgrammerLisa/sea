<template>
    <div class="content">
      <div id="navTopMargin"></div>
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" @touchstart="evers"  @touchend="lat" class="back">  <img :src="masrc"/></span> 昵称
          <span class="addTo" @click="submit"> 确定</span>
        </div>
      </div>
      <input class="form-control nickInput" id="form_control" type="text" placeholder="4-10个字符、仅支持中文、数字、英文" />

    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'

    export default {
        name: "Nickname",
        data(){
            return{
              masrc: back,
            }
        },
        methods:{
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          },
          goBack() {
            this.$router.go(-1);
          },
          submit() {
            $("#NickModal").show();
            if($("#form_control").val() == '' || $("#form_control").val() == null || $("#form_control").val() == undefined) {
              this.$layer.msg('请输入你的昵称');
            } else if($("#form_control").val().length < 4) {
              this.$layer.msg('昵称不符合要求');
            } else if($("#form_control").val().length > 10) {
              this.$layer.msg('昵称不符合要求');
            } else {
              this.isDisabled = true;
              this.$http({
                method: "post",
                url: "/users/profile/edit",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data: {
                  nickname: $("#form_control").val()
                }
              }).then(function(res) {
                if(res.data.code == 0) {
                  this.$layer.msg(res.data.msg);
                  this.$router.go(-1);
                } else {
                  this.$layer.msg(res.data.msg);
                }
              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this))
            }

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
  }

  .panel {
    border: none;
    border-radius: 0;
  }

  .panel-body {
    padding: 0 1rem;
  }

  .BlackTitle {
    text-align: center;
    letter-spacing: 0.05rem;
    background: #09a2d6;
    color: #fff;
    font-size: 1.6rem;
    margin-bottom: 0;
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
  .addTo {
    float: right;
  }
  .nickInput{
    border-radius: 0;
    border: none;
    height: 4rem
  }
  .addTo:active{
    color: #C6C4C4;
  }
</style>
