<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的订单</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <mu-tabs :value.sync="active" color="#fff" indicator-color="#28CFEC" full-width class="orderTab">
        <mu-tab class="tabitem">全部</mu-tab>
        <mu-tab class="tabitem">待付款</mu-tab>
        <mu-tab class="tabitem">待发货</mu-tab>
        <mu-tab class="tabitem">待收货</mu-tab>
      </mu-tabs>

      <div class="demo-text" v-if="active === 0">
         <div v-if="!AllOrderNone" class="OrderNone">
            <img :src="OrderNoneImg" />
            <p>还没有订单哦</p>
            <mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
            <mu-dialog  width="360" :open.sync="openSimple" style="text-align: center">
              <div class="publicDialogTitle">商场即将上线</div>
              <mu-button slot="actions" style="width: 100%;border-top: 1px solid #eee" flat @click="closeSimpleDialog">知道了</mu-button>
            </mu-dialog>
          </div>
          <div v-else class="orderContainer">
            <div class="orderList" v-for="i in AllOrderList">
              <div class="orderTop">
                <div class="orderNumber">订单号: 34111111111 <span class="orderNumberCopy">复制</span></div>
                <div class="orderTips text-right">待付款</div>
              </div>
              <div class="orderCenter">
                <div class="orderContent">
                  <div class="orderLeft">
                    <img src="../../assets/images/noorder.png"/>
                  </div>
                  <div class="orderRight">
                    <div class="orderTitle">品质生活 博朗榨汁机果汁机</div>
                    <div class="orderDesc">品质生活 博朗榨汁机果汁机品质生活 博朗榨汁机果汁机</div>
                  </div>
                </div>
                <div class="orderPrice text-right">
                  <span>总计:</span><span style="color: #09a2d6">￥106.2266</span><span style="font-size: small">（珍珠）</span>
                </div>
              </div>
              <div class="orderBottom text-right">
                <mu-button class="cancellationOrder" flat> 取消订单 </mu-button>
                <mu-button class="payBtn" flat> 去支付 </mu-button>
              </div>
            </div>
          </div>

      </div>

      <div class="demo-text" v-if="active === 1">
        <div v-if="WaitingPayNone" class="OrderNone">
          <img :src="OrderNoneImg" />
          <p>还没有订单哦</p>
          <mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
        </div>

        <div v-else class="orderContainer">
          <div class="orderList" v-for="i in WaitingPayList">
            <div class="orderTop">
              <div class="orderNumber">订单号: 34111111111 <span class="orderNumberCopy">复制</span></div>
              <div class="orderTips text-right">待付款</div>
            </div>
            <div class="orderCenter">
              <div class="orderContent">
                <div class="orderLeft">
                  <img src="../../assets/images/noorder.png"/>
                </div>
                <div class="orderRight">
                  <div class="orderTitle">品质生活 博朗榨汁机果汁机</div>
                  <div class="orderDesc">品质生活 博朗榨汁机果汁机品质生活 博朗榨汁机果汁机</div>
                </div>
              </div>
              <div class="orderPrice text-right">
                <span>总计:</span><span style="color: #09a2d6">￥106.2266</span><span style="font-size: small">（珍珠）</span>
              </div>
            </div>
            <div class="orderBottom text-right">
              <mu-button class="cancellationOrder" flat> 取消订单 </mu-button>
              <mu-button class="payBtn" flat> 去支付 </mu-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-text" v-if="active === 2">
        <div v-if="WaitingDeliverNone" class="OrderNone">
          <img :src="OrderNoneImg" />
          <p>还没有订单哦</p>
          <mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
        </div>

        <div v-else class="orderContainer">
          <div class="orderList" v-for="i in WaitingDeliverList">
            <div class="orderTop">
              <div class="orderNumber">订单号: 34111111111 <span class="orderNumberCopy">复制</span></div>
              <div class="orderTips text-right">待付款</div>
            </div>
            <div class="orderCenter">
              <div class="orderContent">
                <div class="orderLeft">
                  <img src="../../assets/images/noorder.png"/>
                </div>
                <div class="orderRight">
                  <div class="orderTitle">品质生活 博朗榨汁机果汁机</div>
                  <div class="orderDesc">品质生活 博朗榨汁机果汁机品质生活 博朗榨汁机果汁机</div>
                </div>
              </div>
              <div class="orderPrice text-right">
                <span>总计:</span><span style="color: #09a2d6">￥106.2266</span><span style="font-size: small">（珍珠）</span>
              </div>
            </div>
            <div class="orderBottom text-right">
              <mu-button class="cancellationOrder" flat> 取消订单 </mu-button>
              <mu-button class="payBtn" flat> 去支付 </mu-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-text" v-if="active === 3">
        <div v-if="WaitingRecieveNone" class="OrderNone">
          <img :src="OrderNoneImg" />
          <p>还没有订单哦</p>
          <mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
        </div>

        <div v-else class="orderContainer">
          <div class="orderList" v-for="i in WaitingRecieveList">
            <div class="orderTop">
              <div class="orderNumber">订单号: 34111111111 <span class="orderNumberCopy">复制</span></div>
              <div class="orderTips text-right">待付款</div>
            </div>
            <div class="orderCenter">
              <div class="orderContent">
                <div class="orderLeft">
                  <img src="../../assets/images/noorder.png"/>
                </div>
                <div class="orderRight">
                  <div class="orderTitle">品质生活 博朗榨汁机果汁机</div>
                  <div class="orderDesc">品质生活 博朗榨汁机果汁机品质生活 博朗榨汁机果汁机</div>
                </div>
              </div>
              <div class="orderPrice text-right">
                <span>总计:</span><span style="color: #09a2d6">￥106.2266</span><span style="font-size: small">（珍珠）</span>
              </div>
            </div>
            <div class="orderBottom text-right">
              <mu-button class="cancellationOrder" flat> 取消订单 </mu-button>
              <mu-button class="payBtn" flat> 去支付 </mu-button>
            </div>
          </div>
        </div>
      </div>


    </div>
	</div>
</template>

<script>
	import commodityImg from '@/assets/images/bg.png'
	import OrderNoneImg from '@/assets/images/noorder.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "commodityorder",
		data() {
			return {
				masrc: back,
        AllOrderNone: true,
        WaitingPayNone:true,
        WaitingDeliverNone:true,
        WaitingRecieveNone:true,
        AllOrderList:[1,2,3,4,5,6,7,8,9],
        WaitingPayList:[1,2,3,4,],
        WaitingDeliverList:[1,2,],
        WaitingRecieveList:[1,2,3,4,5],
				OrderNoneImg: OrderNoneImg,
        openSimple: false,
        active:0,
				commodity: [{
						commodityImg: commodityImg,
						commodityTitle: '品质生活 博朗榨汁机果汁机1',
						commodityPropaganda: '博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
						commodityPrice: 106.2266,
						commodityCount: 50,
						commodityNumber: 28,
						isEnd: true
					},
					{
						commodityImg: commodityImg,
						commodityTitle: '品质生活 博朗榨汁机果汁机2',
						commodityPropaganda: '博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
						commodityPrice: 106.2266,
						commodityCount: 50,
						commodityNumber: 28,
						isEnd: false
					},
					{
						commodityImg: commodityImg,
						commodityTitle: '品质生活 博朗榨汁机果汁机3',
						commodityPropaganda: '博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
						commodityPrice: 106.2266,
						commodityCount: 50,
						commodityNumber: 28,
						isEnd: false
					},
					{
						commodityImg: commodityImg,
						commodityTitle: '品质生活 博朗榨汁机果汁机4',
						commodityPropaganda: '博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
						commodityPrice: 106.2266,
						commodityCount: 50,
						commodityNumber: 28,
						isEnd: true
					},
					{
						commodityImg: commodityImg,
						commodityTitle: '品质生活 博朗榨汁机果汁机5',
						commodityPropaganda: '博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
						commodityPrice: 106.2266,
						commodityCount: 50,
						commodityNumber: 28,
						isEnd: false
					},
				]
			}
		},
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
      this.$nextTick(function () {
        this.orederStyle();
        this.AllOrder();
        this.WaitingPay();
        this.WaitingDeliver();
        this.WaitingRecieve();
      })
    },
		methods: {
		  orederStyle(){
		    $(".orderContainer").css({height:$(window).innerHeight()-($(".myNavTitle").innerHeight()+$(".orderTab").innerHeight())})
      },
		  //全部订单
      AllOrder(){
        this.$http({
          method: "post",
          url: "/order",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.AllOrderNone = true;
            } else {
              this.AllOrderNone=false;
              console.log("全部订单,",res.data.data)
            }
          }

        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //待付款订单
      WaitingPay(){
        this.$http({
          method: "post",
          url: "/order/waiting-pay",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingPayNone = true;
            } else {
              this.WaitingPayNone=false;
              console.log("待付款订单,",res.data)
            }

          }

        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //待发货订单
      WaitingDeliver(){
        this.$http({
          method: "post",
          url: "/order/waiting-deliver",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingDeliverNone = true;
            } else {
              this.WaitingDeliverNone=false;
              console.log("待发货订单,",res.data)
            }
          }

        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //待收货订单
      WaitingRecieve(){
        this.$http({
          method: "post",
          url: "/order/waiting-recieve",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingRecieveNone = true;
            } else {
              this.WaitingRecieveNone=false;
              console.log("待收货订单,",res.data)
            }
          }

        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      openSimpleDialog () {
        this.$router.push('/shopping')
        // this.openSimple = true;
      },
      closeSimpleDialog () {
        this.openSimple = false;
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
	.content {
		overflow-x: hidden;
		color: #333;
    font-size: 1.6rem;
		background: #f5f5f5;
		padding-bottom: 6rem;
    width: 100vw;
    position: fixed;
    top: 0;
	}
  .contentMarginTop{
    margin-top: 56px;
  }

  .OrderNone{
    text-align: center;
    padding-top: 18vh;
    color: #999;
  }
  .OrderNone img {
    width: 40%;
    margin-bottom: 1rem;
  }

  .mu-tab-active{
    color: #09a2d6;
  }
  .orderTab{
    color: #333;
  }
  .tabitem{
    padding: 0.8rem 0;
  }
  .orderContainer{
    padding: 1rem;
    overflow-y: scroll;
  }
  .orderContainer::-webkit-scrollbar{
    display: none;
  }
  .orderList{
    box-shadow: 2px 2px 10px #E3EFF3;
    border-radius: 8px;
    border: solid 1px #E3EFF3;
    background: white;
    margin-bottom: 1rem;
  }
  .orderTop{
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderNumber{
    width: 100%;
    font-size: 1.5rem;
  }
  .orderTips{
    width: 30%;
    color: #09a2d6;
  }
  .orderNumberCopy{
    border: 1px solid #999;
    color: #555;
    padding:1px 10px;
    border-radius: 12px;
    font-size: small;
    margin-left: 1rem;
  }
  .orderContent{
    display: flex;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderLeft{
    width: 40%;
    margin-right: 2rem;
  }
  .orderLeft img{
     width: 100%;
   }
  .orderRight{
    vertical-align: middle;
  }
  .orderDesc{
    font-size: 1.4rem;
    margin-top: 1rem;
  }
  .orderPrice{
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderBottom{
    padding:1rem;
  }
  .cancellationOrder{
    border: 1px solid #999999;
    height: 3rem;
    margin-right: 1rem;
    border-radius: 3px;
  }
  .payBtn{
    border: 1px solid #28CFEC;
    color: #09a2d6;
    height: 3rem;
    border-radius: 3px;
  }

  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    padding:0 2rem;
    margin-top: 1rem;
  }

</style>
