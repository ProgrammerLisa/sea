<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">捐赠信息</span>
    </mu-appbar>
    <div class="contentMarginTop"></div>
    <mu-text-field v-model="count"  full-width class="countInput"></mu-text-field>
    <mu-flex justify-content="center" align-items="center">
      <mu-button large flat class="publicButton">立即捐赠</mu-button>
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
    width: 90%;
    letter-spacing: 2px;
  }
</style>
