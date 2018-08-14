<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" >
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">
          好友养殖场
        </span>
    </mu-appbar>
    <div class="landscape" ></div>
    <div class="filter"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "FriendFarm",
        data() {
          return {
            masrc: back
          }
        },
        methods:{
          goBack() {
            this.$router.go(-1);
          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          }
        }
    }
</script>

<style scoped>

</style>
