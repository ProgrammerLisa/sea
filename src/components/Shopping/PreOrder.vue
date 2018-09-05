<template>
    <div class="content">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
        <span class="navTitleText">商城</span>
      </mu-appbar>
      <div class="chooseAdd text-center"><span class="glyphicon glyphicon-plus chooseIcon"></span> 选择收货地址</div>

      <div class="media">
          <div class="media-left">
            <img class="media-object" :src="commodityImg" alt="...">
          </div>
          <div class="media-body">
            <p class="media-heading">{{commodityTitle}}</p>
            <div class="commodityPrice">所需：<span class="commodityPrice commodityPriceNum">{{commodityPrice}}</span></div>
            <div class="myCount">您的： <span class=" commodityPriceNum">{{myCount}}</span></div>
            <div>
              <button class="btn enchangeBtn">
                做任务
              </button>
            </div>
          </div>

      </div>
      <div class="exchange">
        <mu-button flat class=" exchangeBtn" disabled="disabled" v-if="isDisabled">确认兑换</mu-button>
        <mu-button flat class=" exchangeBtn publicButton" v-else>确认兑换</mu-button>

      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "preorder",
        data(){
          return{
            masrc: back,
            commodityImg:'',
            commodityTitle:'',
            commodityPrice:'',
            myCount:110,
            isDisabled:''
          }
        },
        mounted(){
          let routerParams=this.$route.params.dataObj;
          this.commodityImg = routerParams.commodityImg;
          this.commodityTitle = routerParams.commodityTitle;
          this.commodityPrice = routerParams.commodityPrice;

          if(parseInt(this.myCount)<parseInt(this.commodityPrice)){
            this.isDisabled=true
          }else {
            this.isDisabled=false
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
    overflow-x: hidden;
    color: #666;
    width: 100vw;
    position: fixed;
    top: 0;
    background: #f5f5f5;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 1rem;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    background: #09a2d6;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
  .chooseAdd{
    line-height: 4rem;
    background: #fff;
    margin-bottom: 1rem;
  }
  .chooseAdd:active{
    background: #f1f1f1;
  }
  .chooseIcon{
    color: #09a2d6;
  }
  .media{
    padding: 1.5rem 1rem;
    margin: 0;
    border-bottom: 0.1rem solid #f5f5f5;
    background: #fff;
  }
  .media-left img{
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
  }
  .media-heading{
    color: #555;
    margin-bottom: 1.2rem;
    font-size: 1.5rem;
  }
  .commodityPrice{
    font-size: 1.5rem;
  }
  .commodityPriceNum{
    color: #09a2d6;
  }
  .myCount{
    margin-top: 0.3rem;
    vertical-align: middle;
  }
  .enchangeBtn{
    float: right;
    border-radius: 3px;
    color: #fff;
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    padding: 0.5rem 1rem;
    vertical-align: middle;
    margin-top: -1.5rem;
    border: none;
  }

  .enchangeBtn:focus{
  	outline: 0;
  }
  .exchange{
    width: 100vw;
    height: 5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
  }
  .exchangeBtn{
    border: none;
    width: 80%;
    height: 3rem;
    margin:1rem 10%;

  }
  .noDisabled{
    background: #09a2d6;
    color: #fff;
    display: inline-block;
  }
  .noDisabled:active{
  	background: #009ACD;
  }
  .noDisabled:focus{
  	outline: 0;
  }
</style>
