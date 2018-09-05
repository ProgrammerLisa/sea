<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">爱心捐助</span>
    </mu-appbar>
    <div class="contentMarginTop"></div>
    <mu-carousel hide-controls>
      <mu-carousel-item>
        <img :src="carouselImg1">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg2">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg3">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg4">
      </mu-carousel-item>
    </mu-carousel>
    <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
    <mu-flex class="demo-linear-progress" style="line-height: 1.6rem">
      <mu-linear-progress mode="determinate" :value="75" :size="10" color="#17B7E0" class="myProgress"></mu-linear-progress><span style="margin:-0.5rem 0 0 1rem;color: #09a2d6">75%</span>
    </mu-flex>
    <div style="display: flex">
        <div class="contentTitle text-center">
          <div class="grid-cell">
            <div style="color:#09a2d6">200,000.00</div>
            <div style="font-size: 1.5rem">目标爱心/颗</div>
          </div>
        </div>
        <div class="contentTitle text-center">
          <div class="grid-cell">
            <div style="color:#09a2d6">140,000.65</div>
            <div>已筹/颗</div>
          </div>
        </div>
    </div>
    <mu-card-text style="border-bottom: 0.6rem solid #f5f5f5">
      <h4>项目详情 </h4>
      <div style="text-indent:2.5rem;color: #444">
         散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
      调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
      似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
      找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </div>

    </mu-card-text>
    <mu-container style="color: #555;font-size: 1.5rem">
      <div style="width: 95%;border: 1px solid #ddd;padding: 1rem;margin: 1rem auto">
        <div>发起机构：momomo</div>
        <div>接受机构：momomo</div>
        <div>备案号：momomomomo</div>
      </div>

    </mu-container>
    <div class="newAddress">
      <mu-flex justify-content="center" align-items="center">
        <mu-button flat class="publicButton" textColor="#fff" to="/donationcount"> 捐珍珠</mu-button>
      </mu-flex>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import carouselImg1 from '@/assets/images/test/u=780515113,540275411&fm=27&gp=0.jpg'
  import carouselImg2 from '@/assets/images/test/u=4176789213,1736947849&fm=27&gp=0.jpg'
  import carouselImg3 from '@/assets/images/test/u=1498947469,1572939960&fm=27&gp=0.jpg'
  import carouselImg4 from '@/assets/images/test/u=1333292247,557777395&fm=27&gp=0.jpg'
    export default {
        name: "donation",
        data(){
          return{
            masrc: back,
            carouselImg1,carouselImg2,carouselImg3,carouselImg4,
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
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    background: #fff;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
  .mu-carousel-item img{
    width: 100%;
    height: 18rem;
  }
  .contentTitle{
    width: 50%;
    padding: 1.5rem 0;
    border-bottom: 0.6rem solid #f5f5f5;
    font-size: 1.6rem;
  }
  .mu-carousel{
    height: 18rem;
  }
 .mu-card-title-container{
   padding: 0.8rem 1.3rem ;
 }
  .demo-container{
    text-align: center;
    padding: 0.8rem 0;
    color: #555;
    border-bottom: 0.6rem solid #f5f5f5;
  }
  .newAddress {
    background: #f5f5f5;
    width: 100%;
    padding: 1rem;
    text-align: center;
    z-index: 999;
  }
  .contentMarginTop{
    margin-top: 56px;
  }
  .myProgress{
    width: 80%;border-radius: 2rem;margin-left: 1.3rem;
  }
  .publicButton{
    width: 100%;
    height: 3.5rem;
    font-size: 1.6rem;
    letter-spacing: 1px;
  }
</style>
