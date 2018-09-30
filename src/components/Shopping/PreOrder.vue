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
            <p style="font-size: small"><span>颜色分类:{{color}}</span> &nbsp;<span>尺码:{{size}}</span></p>
            <div class="commodityPrice">所需珍珠：<span class="commodityPrice commodityPriceNum">{{commodityPrice}}</span> <span style="float: right">×{{count}}</span></div>
            <div>
              <!--<mu-button flat class="enchangeBtn" @click="goFind">-->
                <!--做任务-->
              <!--</mu-button>-->
            </div>
          </div>

      </div>
      <div class="countChoose">
        <div class="countBtn text-left">购买数量</div>
        <div class="countBtn countRight">
          <span class="myIcons-add">
            <mu-button fab small class="rightCount" @click="countAdd(maxNum)">
              <mu-icon value="add" style="margin: auto"></mu-icon>
            </mu-button>
          </span>
          <div class="countStyle">{{count}}</div>
          <span class="myIcons-reduce">
             <mu-button fab small class="leftCount" @click="countRemove">
            <mu-icon value="remove"></mu-icon>
          </mu-button>
          </span>

        </div>
      </div>
      <div class="countChoose">
        <div>买家留言： </div><div><input type="text" class="commodityMessage " v-model="commodityMessage" placeholder="选填：填写内容已与卖家协商确认"/></div>
      </div>
      <div class="countChoose countRight" style="margin-bottom: 7rem">
        <div class="sum">小计：<span class="commodityPriceNum">{{commodityPrice*count}}</span></div> <div class="sum">共{{count}}件商品</div>
      </div>
      <div class="exchange">
        <mu-button flat class=" exchangeBtn publicButton" @click="submitOrder">确认兑换</mu-button>
      </div>
      <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert" class="text-center">
        <div class="publicDialogTitle">确认支付</div>
        <mu-button slot="actions" flat color="primary" @click="pay" class="loginOutBtn">确定</mu-button>
        <mu-button slot="actions" flat color="#555" @click="nopay" class="loginOutBtn">取消</mu-button>
      </mu-dialog>
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
            openAlert:false,
            hasAddress:false,
            address:'',
            commodityImg:'',
            commodityTitle:'',
            color:localStorage.getItem("goodsColor"),
            size:localStorage.getItem("goodsSize"),
            commodityPrice:'',
            count:localStorage.getItem("goodsNum"),
            maxNum:localStorage.getItem("maxNum"),
            commodityMessage:'',
            isDisabled:'',
            orderID:''
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
          countRemove(){
            if(this.count>1){
              this.count--
            }
          },
          countAdd(max){
            if(this.count<parseInt(max))
              this.count++;
          },
          submitOrder(){

            if(this.address.addr_id===undefined){
              this.$layer.msg("请选择收货地址");
            }else {
              this.$http({
                method: "post",
                url: "/submit-order",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data: {
                  goods_id:localStorage.getItem("goods_id"),
                  address_id:this.address.addr_id,
                  message:this.commodityMessage,
                  color:this.color,
                  size:this.size,
                  num:this.count
                }
              }).then(function(res) {
                if(res.data.code === 0) {
                  this.orderID = res.data.data.id;
                  this.openAlert=true;
                }else {
                  this.$layer.msg(res.data.msg);
                }
              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this));
            }

          },
          pay(){
            this.$http({
              method: "post",
              url: "/exchange",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                order_id:this.orderID
              }
            }).then(function(res) {
              this.openAlert=false;
              if(res.data.code === 0) {
                  this.$router.push('/paysuccess')
              }else {
                this.$layer.msg(res.data.msg);
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          nopay(){
            this.openAlert=false
            this.$router.replace('/commodityorder')
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
    padding:1rem 1.5rem;
    color: #333;
  }
  .chooseAdd:active{
    background: #f1f1f1;
  }
  .AddressUser{
    display: flex;
  }
  .AddressName{
    width: 100%;
  }
  .AddressPhone{
    width: 40%;
    font-size: 1.7rem;
  }
  .Address{
    font-size:1.5rem;
    margin-top: 0.5rem;
  }
  .defaultAddress{
    color: #09a2d6;
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
    color: #222;

    margin-bottom: 1.2rem;
  }
  .commodityPriceNum{
    color: #09a2d6;
  }
  .countChoose{
    background: #fff;
    padding: 1rem;
    display: flex;
    color: #333;
    border-bottom: 1px solid #f5f5f5;
  }
  .countBtn{
    width: 50%;
    line-height: 40px;
  }
  .countRight{
    display: flex;
    flex-direction:row-reverse
  }
  .leftCount{
    border-radius: 50%;
    color: #666;
    text-align: center;
    margin-right: 1rem;
    /*background: linear-gradient(to right, #0BA5D7 , #38E7F8);*/
    background: #fff;
    border: 1px solid #999;
  }
  .rightCount{
    margin-left: 1rem;
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
  }
  .commodityMessage{
    border: none;
    box-shadow: none;
    cursor: none;
    outline: none;
    width: 65vw;
  }
  .commodityMessage::-webkit-input-placeholder {
    color: #999;
    font-size:small;
  }
  .exchange{
    width: 100vw;
    background: #fff;
    position: fixed;
    bottom: 0;
  }
  .exchangeBtn{
    border: none;
    width: 90%;
    margin:1rem 5%;
    font-size: 1.6rem;
  }
  .sum{
    margin-left: 1.5rem;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);color: white;
  }
  .loginOutBtn {
    border-top: 1px solid #ddd;
    width: 50%;
  }

  .loginOutBtn:first-child {
    border-right: 1px solid #ddd;
  }
</style>

