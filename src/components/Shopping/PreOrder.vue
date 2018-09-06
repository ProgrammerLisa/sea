<template>
    <div class="content">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
        <span class="navTitleText">确认订单</span>
      </mu-appbar>
      <router-link class="contentMarginTop chooseAdd" v-if="hasAddress" tag="div" to="/chooseaddress">
          <div class="AddressUser">
            <div class="text-left AddressName">收货人：{{address.consignee}}</div><div class="text-right AddressPhone">{{address.phone}}</div>
          </div>
          <div class="Address"><span class="defaultAddress" v-show="address.is_default">[ 默认地址 ]</span> <mu-icon v-show="!address.is_default" size="20" value="room" color="grey800" style="vertical-align:bottom"></mu-icon> 收货地址：{{address.address}}</div>
      </router-link>
      <router-link tag="div" to="/newaddress" class="chooseAdd text-center contentMarginTop" v-else><span class="glyphicon glyphicon-plus chooseIcon"></span> 选择收货地址</router-link>

      <div class="media">
          <div class="media-left">
            <img class="media-object" :src="commodityImg" alt="...">
          </div>
          <div class="media-body">
            <p class="media-heading">{{commodityTitle}}</p>
            <div class="commodityPrice">所需珍珠：<span class="commodityPrice commodityPriceNum">{{commodityPrice}}</span></div>
            <div class="myCount">您的： <span class=" commodityPriceNum">{{myCount}}</span></div>
            <div>
              <mu-button flat class="enchangeBtn" @click="goFind">
                做任务
              </mu-button>
            </div>
          </div>

      </div>
      <div class="exchange">
        <mu-button flat class=" exchangeBtn" disabled="disabled" v-if="!isDisabled">余额不足</mu-button>
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
            hasAddress:false,
            address:'',
            commodityImg:'',
            commodityTitle:'',
            commodityPrice:'',
            myCount:110,
            isDisabled:''
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          if(parseInt(this.myCount)<parseInt(this.commodityPrice)){
            this.isDisabled=true
          }else {
            this.isDisabled=false
          }
          this.$nextTick(function() {
            this.getGoods()
            this.getAddress()
          })
        },
        methods:{
          getGoods(){
            this.$http({
              method: "post",
              url: "/goods/detail",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                goods_id:localStorage.getItem("goods_id")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                this.commodityImg = res.data.data.image;
                this.commodityTitle = res.data.data.name;
                this.commodityPrice = res.data.data.price;
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          getAddress(){
            this.$http({
              method: "post",
              url: "/display-address",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                addr_id:localStorage.getItem("addressId")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                this.hasAddress=true;
                this.address = res.data.data
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          goFind(){
            this.$router.replace('/find')
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
    overflow-x: hidden;
    color: #555;
    width: 100vw;
    position: fixed;
    top: 0;
    font-size: 1.6rem;
    background: #f5f5f5;
  }

  .chooseAdd{
    background: #fff;
    margin-bottom: 1rem;
    padding:1rem 3rem;
    color: #333;
  }
  .chooseAdd:active{
    background: #f1f1f1;
  }
  .AddressUser{
    display: flex;
  }
  .AddressName,.AddressPhone{
    width: 50%;
    font-size: 1.7rem;
  }
  .Address{
    font-size:1.5rem;
    margin-top: 0.5rem;
  }
  .defaultAddress{
    color: #e57373;
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
  }
  .commodityPrice{

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
    vertical-align: middle;
    margin-top: -3rem;
    border: none;
    height: 3rem;
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
    font-size: 1.6rem;
  }

</style>
