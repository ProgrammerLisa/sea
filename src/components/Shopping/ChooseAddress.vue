<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">选择收货地址</span>
    </mu-appbar>
    <!--<div class="addressTitle contentMarginTop text-center">请选择收货地址</div>-->
    <div class="contentMarginTop">

    </div>
    <div class="addressList " v-for="a in address" @click="chooseAddress(a.addr_id)">
      <div class="addressUser">
        <div class="addressName text-left">{{a.consignee}}</div>
        <div class="addressPhone text-right">{{a.phone}}</div>
      </div>
      <div class="addressText"><span class="defaultAddress" v-show="a.is_default">[ 默认地址 ]</span><mu-icon v-show="!a.is_default" size="22" value="room" color="grey600" style="vertical-align:bottom"></mu-icon> {{a.address}}</div>
    </div>
    <div class="newAddress">
      <router-link to="/newaddress" tag="div">
        <mu-flex justify-content="center" align-items="center">
          <mu-button flat class="publicButton">
            <mu-icon value="add"></mu-icon>新建地址</mu-button>
        </mu-flex>
      </router-link>
    </div>
  </div>
</template>

<script>
    import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "chooseaddress",
        data(){
          return{
            masrc: back,
            address:[]
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function() {
            this.getAddress()
          })
        },
        methods:{
          getAddress(){
            this.$http({
              method: "get",
              url: "/users/delivery_address",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {

              }
            }).then(function(res) {
              if(res.data.code === 0) {
                  this.address = res.data.data
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          chooseAddress(id){
            this.$http({
              method: "post",
              url: "/display-address",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                addr_id:id
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                localStorage.setItem("addressId",id)
                this.$router.go(-1);
              }else {
                this.$layer.msg(res.data.msg);
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
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
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fff;
    font-size: 1.6rem;
    color: #444;
    padding-bottom: 6rem;
  }
  .contentMarginTop{
    margin-top: 56px;
  }
  .addressTitle{
    border-bottom: 0.6rem solid #f5f5f5;
    padding-bottom: 1rem;
  }
  .addressList{
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
  }
  .addressUser{
    display: flex;
  }
  .addressName,.addressPhone{
    width: 50%;
  }
  .addressText{
    margin-top: 1rem;
  }
  .newAddress {
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    width: 100%;
    padding: 0.8rem 0;
    text-align: center;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    width: 90%;
  }
  .defaultAddress{
    /*background: linear-gradient(to right,#e57373,#e57373,#e57373, #38E7F8);*/
    /*-webkit-background-clip: text;*/
    color: #e57373;
  }
</style>
