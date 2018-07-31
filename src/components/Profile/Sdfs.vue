<template>
    <div class="content">
      <div id="navTopMargin"></div>
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" @touchstart="evers"  @touchend="lat" class="back">  <img :src="masrc"/></span>
          <span style="margin-left: -35px; position: absolute; left: 50%; font-size: 1.8rem;">个性签名</span>
          <span class="addTo" @click="submit"> 确定</span>
        </div>
      </div>
      <input class="form-control nickInput" id="form_control" type="text" placeholder="这个人很懒,还没有签名" />

    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'

    export default {
        name: "Sdfs",
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
    font-size: 1.5rem;
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
    height: 4rem;
  }
  .addTo:active{
    color: #C6C4C4;
  }
</style>
