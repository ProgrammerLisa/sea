<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc" />
      </mu-button>
      <span class="navTitleText">回复</span>
    </mu-appbar>

  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "comment",
      data(){
          return{
            masrc: back,
          }
      },
      mounted(){
        let that = this;
        mui.back = function(){
          that.$router.go(-1);
        };

        this.$nextTick(function() {
          this.getList();
        })
      },
      methods:{
        getList(){

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

</style>
