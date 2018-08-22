<template>
    <div class="content">

      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" style="padding: 0;margin-left: 0">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" >
          <img :src="masrc" style="width: 2.5rem"/>
        </mu-button>
        <span class="navTitleText">个性签名</span>
        <mu-menu slot="right">
          <mu-button flat @click="submit" style="color: #09a2d6">确定</mu-button>
        </mu-menu>
      </mu-appbar>

      <div class="contentMarginTop">
        <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
          <mu-form-item prop="input" >
            <mu-text-field @focus="inputFocus" @blur="inputFocus" :action-icon="haveData?'highlight_off':''" :action-click="clearInput" style="background: #fff;border-top: 1px solid #eee;" color="#09a2d6" v-model="form.input" placeholder="编辑个性签名"  ></mu-text-field>
          </mu-form-item>
        </mu-form>
      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'

    export default {
        name: "sdfs",
        data(){
            return{
              masrc: back,
              labelPosition: 'top',
              form: {
                input: '',
                switch: false,
                slider: 30
              },
              visibility: false,
              haveData:false
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
          clearInput(){
            this.form.input='';
            this.haveData=false;
          },
          inputFocus(){
            if(this.form.input==''||this.form.input==undefined||this.form.input==null){
              this.haveData=false
            }else {
              this.haveData=true
            }

          },
          submit() {
            if(this.form.input== '') {
              this.$layer.msg('请输入你的签名');
            } else if(this.form.input.length < 4) {
              this.$layer.msg('签名不符合要求');
            } else if(this.form.input.length > 10) {
              this.$layer.msg('签名不符合要求');
            } else {
              this.isDisabled = true;
              this.$http({
                method: "post",
                url: "/users/edit-resume",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data: {
                  resume: this.form.input
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
    height: 100vh;
    position: fixed;
    top: 0;
  }

  .nickInput{
    border-radius: 0;
    border: none;
    height: 4rem;
  }
</style>
