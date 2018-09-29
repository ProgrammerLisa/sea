<template>
    <div class="content">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc" />
        </mu-button>
        <span class="navTitleText">订单详情</span>
      </mu-appbar>
      <div class="contentMarginTop">
        <div class="top">
          <div class="topTitle">您的订单还在配货中，请稍后...</div>
          <div class="topUser"><span class="topName">{{datas.name}}</span><span>{{datas.phone}}</span></div>
        </div>
        <div class="address">地址：{{datas.address}}</div>
        <div class="orderCenter">
          <div class="orderContent">
            <div class="orderLeft">
              <img :src="datas.image"/>
            </div>
            <div class="orderRight">
              <div class="orderTitle">{{datas.title}}</div>
              <div class="orderDesc">{{datas.desc}}</div>
              <div class="text-right orderNum">× {{datas.num}}</div>
            </div>
          </div>

        </div>
        <div class="orderDetails">
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">商品金额:</div>
            <div class="orderDetailsText">￥ {{datas.price}} （珍珠）</div>
          </div>
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">运费:</div>
            <div class="orderDetailsText">包邮</div>
          </div>
        </div>
        <div class="orderDetails marginBottom">
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">订单号:</div>
            <div class="orderDetailsText">{{datas.orderNumber}}</div>
          </div>
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">物流单号:</div>
            <div class="orderDetailsText">{{datas.logistics}}</div>
          </div>
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">下单时间:</div>
            <div class="orderDetailsText">{{datas.date}}</div>
          </div>
          <div class="orderDetailsList">
            <div class="orderDetailsTitle">配送方式:</div>
            <div class="orderDetailsText">{{datas.mode}}</div>
          </div>
        </div>
        <div class="footer text-right">
          <div class="footerText">
            <div>总计: <span style="color: #09a2d6">￥ {{datas.priceAll}}</span></div>
            <div style="font-size: small">成交价（珍珠）</div>
          </div>
          <div>
            <mu-button class="publicButton" flat @click="goLogistics" v-if="datas.status">查看物流</mu-button>
            <mu-button class="disabledBtn" flat v-else>暂无物流信息</mu-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "orderdetails",
        data(){
          return{
            masrc: back,
            id:'',
            datas:{
              name:'',
              phone:'',
              address:'',
              image:'',
              title:'',
              desc:'',
              price:'',
              priceAll:'',
              num:'',
              freight:'',
              orderNumber:'',
              date:'',
              mode:'',
              logistics:'',
              status:''
            }
          }
        },
        mounted(){
          this.id = this.$route.params.dataObj;
          this.$nextTick(function () {
            this.getOrder();
          })
        },
        methods:{
          getOrder(){
            this.$http({
              method: "post",
              url: "/order-detail",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                order_id:localStorage.getItem("order_id")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                this.datas.name=res.data.delivery_address.consignee;
                this.datas.phone=res.data.delivery_address.phone;
                this.datas.address=res.data.delivery_address.address;
                this.datas.image=res.data.data.goods.image;
                this.datas.title=res.data.data.goods.name;
                this.datas.desc=res.data.data.goods.desc;
                this.datas.price=res.data.data.goods.price;
                this.datas.priceAll=res.data.data.cost;
                this.datas.num=res.data.data.num;
                // this.datas.freight=res.data.data.goods.image;
                this.datas.orderNumber=res.data.data.id;
                this.datas.date=res.data.data.created_at;
                this.datas.status=res.data.data.status;
                if (res.data.data.status==="WAITING_RECIEVE"){
                  this.datas.status=true;
                }else{
                  this.datas.status=false;
                }
                if(res.data.data.express===""){
                  this.datas.mode="暂无物流信息"
                }else {
                  this.datas.mode=res.data.data.express;
                }
                if(res.data.data.express_id===""){
                  this.datas.logistics="暂无"
                }else {
                  this.datas.logistics=res.data.data.express_id;
                }
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));

          },
          goLogistics(){
            this.$router.push({
              path: '/logistics',
              name: 'logistics',
              params: {
                name: 'name',
                dataObj: {
                  image: this.datas.image,
                  orderNumber: this.datas.orderNumber,
                  date: this.datas.date
                }

              }
            })
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
    background: #f5f5f5;
    color: #323232;
    font-size: 1.6rem;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .contentMarginTop{
    margin-top: 56px;
  }
  .top{
    width: 100%;
    background-image: url("../../assets/images/dingdanxiangqingbg.png") ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1rem 1rem 0;
  }
  .topTitle{
    color: #fff;
    font-size: 1.8rem;
    padding: 1rem 0 2rem;
    text-align: center;
  }
  .topUser{
    background: white;
    border-radius:8px 8px 0 0 ;
    padding: 1rem;
  }
  .topName{
    margin-right: 1.5rem;
  }
  .address{
    background: white;
    padding: 1rem 2rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderCenter{
    background: white;
    margin-bottom: 0.6rem;
    padding-bottom: 1rem;
  }
  .orderContent{
    display: flex;
    padding: 1.5rem 1rem 0;
  }
  .orderLeft{
    width: 40%;
    margin-right: 2rem;
  }
  .orderLeft img{
    width: 100%;
    border-radius: 3px;
  }
  .orderRight{
    vertical-align: middle;
  }
  .orderDesc{
    font-size: 1.4rem;
    margin-top: 1rem;
  }
  .orderNum{
    margin-right: 1rem;
    color: #09a2d6;
  }
  .orderPrice{
    padding:1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderDetails{
    background: #fff;
    margin-bottom: 0.6rem;
    padding: 0 1rem;
  }
  .orderDetails .orderDetailsList{
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    padding: 1rem 0;
    font-size: 1.5rem;
  }
  .orderDetails .orderDetailsList:last-child{
    border-bottom: none;
  }
  .orderDetailsTitle{
    width: 7rem;
  }
  .marginBottom{
    margin-bottom: 6rem;
  }
  .footer{
    display: flex;
    background: white;
    width: 100%;
    position: fixed;
    bottom: 0;
    justify-content: flex-end;
    border-top: 1px solid #f5f5f5;
  }
  .footerText{
    padding: 0.5rem 1rem;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius:0;
    height: 100%;
    font-size: 1.6rem;
  }
  .disabledBtn{
    background:linear-gradient(to right, #ddd , #999);
    color: #f7f7f7;
    border-radius:0;
    height: 100%;
    font-size: 1.6rem;
  }
</style>
