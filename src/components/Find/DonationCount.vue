<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">捐赠信息</span>
    </mu-appbar>
    <div class="contentMarginTop"></div>
    <mu-text-field v-model="count" color="#2CD5EF" type="number"  full-width class="countInput" placeholder="请输入捐赠珍珠数量"></mu-text-field>
    <mu-flex justify-content="center" align-items="center">
      <mu-button large flat class="publicButton" @click="donation">立即捐赠</mu-button>
    </mu-flex>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "donationcount",
        data(){
          return{
            masrc: back,
            count:''
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
        },
        methods:{
          donation(){
            if (this.count!==""&&this.count!==null&&this.count!==NaN&&this.count!==undefined){
              this.$http({
                method: "post",
                url: "/tasks/donation",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data: {
                  "charity_id": localStorage.getItem("charity_id"),
                  "donation":this.count
                }
              }).then(function(res) {
                this.$layer.msg(res.data.msg);
                if(res.data.code === 0) {
                  this.$router.go(-1);
                }

              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this));
            } else {
              this.$layer.msg("请输入正确的数量");
            }

          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          },
          goBack() {
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  .content{
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100vw;
    background: #fff;
  }
  .countInput{
    width: 90%;
    margin: 2rem 5%;
    border: 1px solid #E0E0E0;
    border-bottom: none;
    padding: 0;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    width: 90%;
    letter-spacing: 2px;
  }
</style>
