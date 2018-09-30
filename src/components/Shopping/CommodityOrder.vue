<template>
	<div class="content">
		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
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
         <div v-if="AllOrderNone" class="OrderNone">
            <img :src="OrderNoneImg" />
            <p>还没有订单哦</p>
            <mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
            <mu-dialog  width="360" :open.sync="openSimple" style="text-align: center">
              <div class="publicDialogTitle">商场即将上线</div>
              <mu-button slot="actions" style="width: 100%;border-top: 1px solid #eee" flat @click="closeSimpleDialog">知道了</mu-button>
            </mu-dialog>
          </div>
          <div v-else class="orderContainer" :style="height">
            <mu-load-more @refresh="refreshAll" :refreshing="refreshingAll" :loading="loadingAll" @load="loadAll">
              <div class="orderList" v-for="i in AllOrderList">
                <div class="orderTop">
                  <div class="orderNumber">订单号: {{i.id}} <span class="orderNumberCopy" v-clipboard:copy="i.id" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></div>
                  <!--<div class="orderTips text-right">待付款</div>-->
                </div>
                <div class="orderCenter">
                  <div class="orderContent" @click="goDetail(i.id)">
                    <div class="orderLeft">
                      <img :src="i.goods_img"/>
                    </div>
                    <div class="orderRight">
                      <div class="orderTitle">{{i.goods_name}}</div>
                      <div class="orderDesc">{{i.goods_desc}}</div>
                    </div>
                  </div>
                  <div class="orderPrice text-right">
                    <div class="created_at">{{i.created_at}}</div><span>总计:</span><span style="color: #09a2d6">￥{{i.cost}}</span><span style="font-size: small">（珍珠）</span>
                  </div>
                </div>
                <div class="orderBottom text-right" v-show="i.status=='WAITING_PAY'">
                  <div class="status">等待兑换</div>
                  <mu-button class="cancellationOrder" flat @click="openNoPayAlert(i.id)"> 取消订单 </mu-button>
                  <mu-button class="payBtn" flat  @click="submitAllOrder(i.id)"> 兑换 </mu-button>
                </div>
                <div class="orderBottom text-right" v-show="i.status=='WAITING_DELIVER'">
                  <div class="status">等待发货</div>
                  <mu-button class="cancellationOrder" flat @click="goDetail(i.id)"> 查看详情 </mu-button>
                </div>
                <div class="orderBottom text-right" v-show="i.status=='WAITING_RECIEVE'">
                  <div class="status">等待收货</div>
                  <mu-button class="cancellationOrder" flat @click="goDetail(i.id)"> 查看详情 </mu-button>
                  <mu-button class="payBtn" flat @click="recieve(i.id)"> 确认收货 </mu-button>
                </div>
                <div class="orderBottom text-right" v-show="i.status=='FINISHED'">
                  <div class="status">完成兑换</div>
                  <mu-button class="cancellationOrder" flat @click="removeOrder(i.id)"> 删除 </mu-button>
                  <!--<mu-button class="payBtn" flat @click="goDetail(i.id)"> 查看详情 </mu-button>-->
                </div>
                <div class="orderBottom text-right" v-show="i.status=='EXPIRED'">
                  <div class="status">已过期</div>
                  <mu-button class="cancellationOrder" flat @click="removeOrder(i.id)"> 删除 </mu-button>
                </div>
              </div>
            </mu-load-more>
            <div class="noMore" v-show="noMoreAll">没有更多信息了</div>
            <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAll" class="text-center">
              <div class="publicDialogTitle">确认支付</div>
              <mu-button slot="actions" flat color="primary" @click="pay" class="loginOutBtn">确定</mu-button>
              <mu-button slot="actions" flat color="#555" @click="closeAll" class="loginOutBtn">取消</mu-button>
            </mu-dialog>
            <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openNoPay" class="text-center">
              <div class="publicDialogTitle">取消订单</div>
              <mu-button slot="actions" flat color="primary" @click="noPay" class="loginOutBtn">确定</mu-button>
              <mu-button slot="actions" flat color="#555" @click="closeNoPay" class="loginOutBtn">取消</mu-button>
            </mu-dialog>
            <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openRemove" class="text-center">
              <div class="publicDialogTitle">删除订单</div>
              <mu-button slot="actions" flat color="primary" @click="yesRemove" class="loginOutBtn">确定</mu-button>
              <mu-button slot="actions" flat color="#555" @click="noRemove" class="loginOutBtn">取消</mu-button>
            </mu-dialog>
            <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openRecieve" class="text-center">
              <div class="publicDialogTitle">确认收货</div>
              <mu-button slot="actions" flat color="primary" @click="yesRecieve" class="loginOutBtn">确定</mu-button>
              <mu-button slot="actions" flat color="#555" @click="noRecieve" class="loginOutBtn">取消</mu-button>
            </mu-dialog>
          </div>
			</div>

			<div class="demo-text" v-if="active === 1">
				<div v-if="WaitingPayNone" class="OrderNone">
					<img :src="OrderNoneImg" />
					<p>还没有订单哦</p>
					<mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
				</div>

        <div v-else class="orderContainer" :style="height">
          <mu-load-more @refresh="refreshWaitingPay" :refreshing="refreshingWaitingPay" :loading="loadingWaitingPay" @load="loadWaitingPay">
            <div class="orderList" v-for="i in WaitingPayList">
            <div class="orderTop">
              <div class="orderNumber">订单号: {{i.id}} <span class="orderNumberCopy" v-clipboard:copy="i.id" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></div>
            </div>
            <div class="orderCenter">
              <div class="orderContent" @click="goDetail(i.id)">
                <div class="orderLeft">
                  <img :src="i.goods_img"/>
                </div>
                <div class="orderRight">
                  <div class="orderTitle">{{i.goods_name}}</div>
                  <div class="orderDesc">{{i.goods_desc}}</div>
                </div>
              </div>
              <div class="orderPrice text-right">
                <div class="created_at">{{i.created_at}}</div><span>总计:</span><span style="color: #09a2d6">￥{{i.cost}}</span><span style="font-size: small">（珍珠）</span>
              </div>
            </div>
            <div class="orderBottom text-right">
              <div class="status">等待付款</div>
              <mu-button class="cancellationOrder" flat @click="openNoPayAlert(i.id)"> 取消订单 </mu-button>
              <mu-button class="payBtn" flat  @click="submitPayOrder(i.id)"> 兑换 </mu-button>
            </div>
          </div>
          </mu-load-more>
          <div class="noMore" v-show="noMoreWaitingPay">没有更多信息了</div>
          <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openPay" class="text-center">
            <div class="publicDialogTitle">确认支付</div>
            <mu-button slot="actions" flat color="primary" @click="pay" class="loginOutBtn">确定</mu-button>
            <mu-button slot="actions" flat color="#555" @click="closePay" class="loginOutBtn">取消</mu-button>
          </mu-dialog>
          <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openNoPay" class="text-center">
            <div class="publicDialogTitle">取消订单</div>
            <mu-button slot="actions" flat color="primary" @click="noPay" class="loginOutBtn">确定</mu-button>
            <mu-button slot="actions" flat color="#555" @click="closeNoPay" class="loginOutBtn">取消</mu-button>
          </mu-dialog>
        </div>
      </div>

			<div class="demo-text" v-if="active === 2">
				<div v-if="WaitingDeliverNone" class="OrderNone">
					<img :src="OrderNoneImg" />
					<p>还没有订单哦</p>
					<mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
				</div>

				<div v-else class="orderContainer" :style="height">
          <mu-load-more @refresh="refreshWaitingDeliver" :refreshing="refreshingWaitingDeliver" :loading="loadingWaitingDeliver" @load="loadWaitingDeliver">
            <div class="orderList" v-for="i in WaitingDeliverList">
						<div class="orderTop">
							<div class="orderNumber">订单号: {{i.id}} <span class="orderNumberCopy" v-clipboard:copy="i.id" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></div>
						</div>
						<div class="orderCenter">
							<div class="orderContent" @click="goDetail(i.id)">
								<div class="orderLeft">
                  <img :src="i.goods_img"/>
								</div>
								<div class="orderRight">
									<div class="orderTitle">{{i.goods_name}}</div>
									<div class="orderDesc">{{i.goods_desc}}</div>
								</div>
							</div>
							<div class="orderPrice text-right">
                <div class="created_at">{{i.created_at}}</div><span>总计:</span><span style="color: #09a2d6">￥{{i.cost}}</span><span style="font-size: small">（珍珠）</span>
							</div>
						</div>
						<div class="orderBottom text-right">
              <mu-button class="cancellationOrder" flat @click="goDetail(i.id)"> 查看详情 </mu-button>
						</div>
					</div>
          </mu-load-more>
          <div class="noMore" v-show="noMoreWaitingDeliver">没有更多信息了</div>
				</div>
			</div>

			<div class="demo-text" v-if="active === 3">
				<div v-if="WaitingRecieveNone" class="OrderNone">
					<img :src="OrderNoneImg" />
					<p>还没有订单哦</p>
					<mu-button flat class="publicButton" @click="openSimpleDialog">去逛逛</mu-button>
				</div>

				<div v-else class="orderContainer" :style="height">
          <mu-load-more @refresh="refreshWaitingRecieve" :refreshing="refreshingWaitingRecieve" :loading="loadingWaitingRecieve" @load="loadWaitingRecieve">
					  <div class="orderList" v-for="i in WaitingRecieveList">
						<div class="orderTop">
							<div class="orderNumber">订单号: {{i.id}} <span class="orderNumberCopy" v-clipboard:copy="i.id" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></div>
						</div>
						<div class="orderCenter">
							<div class="orderContent" @click="goDetail(i.id)">
								<div class="orderLeft">
                  <img :src="i.goods_img"/>
								</div>
								<div class="orderRight">
                  <div class="orderTitle">{{i.goods_name}}</div>
                  <div class="orderDesc">{{i.goods_desc}}</div>
								</div>
							</div>
							<div class="orderPrice text-right">
                <div class="created_at">{{i.created_at}}</div><span>总计:</span><span style="color: #09a2d6">￥{{i.cost}}</span><span style="font-size: small">（珍珠）</span>
							</div>
						</div>
						<div class="orderBottom text-right">
              <mu-button class="cancellationOrder" flat @click="goDetail(i.id)"> 查看详情 </mu-button>
							<mu-button class="payBtn" flat @click="recieve(i.id)"> 确认收货 </mu-button>
						</div>
					</div>
          </mu-load-more>
          <div class="noMore" v-show="noMoreWaitingRecieve">没有更多信息了</div>
          <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openRecieve" class="text-center">
            <div class="publicDialogTitle">删除订单</div>
            <mu-button slot="actions" flat color="primary" @click="yesRecieve" class="loginOutBtn">确定</mu-button>
            <mu-button slot="actions" flat color="#555" @click="noRecieve" class="loginOutBtn">取消</mu-button>
          </mu-dialog>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import OrderNoneImg from '@/assets/images/noorder.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "commodityorder",
		data() {
			return {
				masrc: back,
        AllOrderID:'',
        AllOrderNone: true,
        WaitingPayNone:true,
        WaitingDeliverNone:true,
        WaitingRecieveNone:true,
        AllOrderUrl:"/order",
        WaitingPayUrl: "/order/waiting-pay",
        WaitingDeliverUrl:"/order/waiting-deliver",
        WaitingRecieveUrl: "/order/waiting-recieve",
        AllOrderList:[],
        WaitingPayList:[],
        WaitingDeliverList:[],
        WaitingRecieveList:[],
        noMoreAll:false,
        noMoreWaitingPay:false,
        noMoreWaitingDeliver:false,
        noMoreWaitingRecieve:false,
        refreshingAll:false,
        loadingAll:false,
        refreshingWaitingPay:false,
        loadingWaitingPay:false,
        refreshingWaitingDeliver:false,
        loadingWaitingDeliver:false,
        refreshingWaitingRecieve:false,
        loadingWaitingRecieve:false,
        openAll:false,
        openPay:false,
        openNoPay:false,
        openRemove:false,
        openRecieve:false,
				OrderNoneImg: OrderNoneImg,
				openSimple: false,
				active: 0,
				height: ''
			}
		},
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.push('/personal');
      };
      localStorage.removeItem("order_id");
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
		    localStorage.removeItem("order_id");
		    let height = $(window).innerHeight()-($(".myNavTitle").innerHeight()+$(".orderTab").innerHeight());
		    this.height='height:'+height+'px';
      },
		  //全部订单
      AllOrder(){
        this.$http({
          method: "post",
          url: this.AllOrderUrl,
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          setTimeout(()=>{
            this.refreshingAll=false;
            this.loadingAll = false;
          },500);
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.AllOrderNone = true;
            } else {
              this.AllOrderNone=false;
              for (let i in res.data.data.items){
                this.AllOrderList.push(res.data.data.items[i])
              }
              this.AllOrderUrl = res.data.data.next;
            }

          }else {
            this.$layer.msg(res.data.msg);
          }

        }.bind(this))
          .catch(function(err) {
            this.refreshingAll=false;
            this.loadingAll = false;
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //重新加载全部订单
      refreshAll(){
		    this.refreshingAll=true;
        this.AllOrderUrl="/order";
        this.AllOrderList=[];
        this.AllOrder();
      },
      //加载订单分页
      loadAll(){
        this.loadingAll = true;
        if (this.AllOrderUrl===""){
          this.loadingAll = false;
          this.noMoreAll=true;
        }else {
          this.AllOrder();
        }
      },
      //待付款订单
      WaitingPay(){
        this.$http({
          method: "post",
          url: this.WaitingPayUrl,
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          setTimeout(()=>{
            this.refreshingWaitingPay=false;
          },500)
          this.loadingWaitingPay=false;
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingPayNone = true;
            } else {
              this.WaitingPayNone=false;
              for (let i in res.data.data.items){
                this.WaitingPayList.push(res.data.data.items[i])
              }
              this.WaitingPayUrl = res.data.data.next;
            }
          }else {
            this.$layer.msg(res.data.msg);
          }

        }.bind(this))
          .catch(function(err) {
            this.refreshingWaitingPay=false;
            this.loadingWaitingPay = false;
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //重新加载支付订单
      refreshWaitingPay(){
		    this.refreshingWaitingPay=true;
        this.WaitingPayUrl= "/order/waiting-pay";
        this.WaitingPayList = [];
        this.WaitingPay();
      },
      //加载订单分页
      loadWaitingPay(){
        this.loadingWaitingPay = true;
        if (this.WaitingPayUrl===""){
          this.loadingWaitingPay = false;
          this.noMoreWaitingPay=true;
        }else {
          this.WaitingPay();
        }
      },
      //待发货订单
      WaitingDeliver(){
        this.$http({
          method: "post",
          url: this.WaitingDeliverUrl,
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          setTimeout(()=>{
            this.refreshingWaitingDeliver=false;
          },500)
          this.loadingWaitingDeliver=false;
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingDeliverNone = true;
            } else {
              this.WaitingDeliverNone=false;
              for (let i in res.data.data.items){
                this.WaitingDeliverList.push(res.data.data.items[i])
              }
              this.WaitingDeliverUrl = res.data.data.next;
            }
          }else {
            this.$layer.msg(res.data.msg);
          }

        }.bind(this))
          .catch(function(err) {
            this.refreshingWaitingDeliver=false;
            this.loadingWaitingDeliver = false;
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //重新加载发货订单
      refreshWaitingDeliver(){
        this.refreshingWaitingDeliver=true;
        this.WaitingDeliverUrl= "/order/waiting-deliver";
        this.WaitingDeliverList = [];
        this.WaitingDeliver();
      },
      //加载订单分页
      loadWaitingDeliver(){
        this.loadingWaitingDeliver = true;
        if (this.WaitingDeliverUrl===""){
          this.loadingWaitingDeliver = false;
          this.noMoreWaitingDeliver=true;
        }else {
          this.WaitingDeliver();
        }
      },
      //待收货订单
      WaitingRecieve(){
        this.$http({
          method: "post",
          url: this.WaitingRecieveUrl,
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          setTimeout(()=>{
            this.refreshingWaitingRecieve=false;
          },500)
          this.loadingWaitingRecieve=false;
          if(res.data.code===0){
            if (res.data.data===undefined){
              this.WaitingRecieveNone = true;
            } else {
              this.WaitingRecieveNone=false;
              this.WaitingRecieveUrl = res.data.data.next;
              for (let i in res.data.data.items){
                this.WaitingRecieveList.push(res.data.data.items[i])
              }
            }
          }else {
            this.$layer.msg(res.data.msg);
          }

        }.bind(this))
          .catch(function(err) {
            this.refreshingWaitingRecieve=false;
            this.loadingWaitingRecieve = false;
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      //重新加载收货订单
      refreshWaitingRecieve(){
        this.refreshingWaitingRecieve=true;
        this.WaitingRecieveUrl= "/order/waiting-recieve";
        this.WaitingRecieveList = [];
        this.WaitingRecieve();
      },
      //加载订单分页
      loadWaitingRecieve(){
        this.loadingWaitingRecieve = true;
        if (this.WaitingRecieveUrl===""){
          this.loadingWaitingRecieve = false;
          this.noMoreWaitingRecieve=true;
        }else {
          this.WaitingRecieve();
        }
      },
      openSimpleDialog () {
        this.$router.push('/shopping');
      },
      //确认兑换
      submitAllOrder(id){
		    this.AllOrderID = id;
		    this.openAll = true;
      },
      submitPayOrder(id){
        this.AllOrderID = id;
        this.openPay = true;
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
            order_id:this.AllOrderID
          }
        }).then(function(res) {
          this.openPay=false;
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
      closeAll(){
		    this.openAll=false;
      },
      closePay(){
        this.openPay=false;
      },
      openNoPayAlert(id){
        this.AllOrderID = id;
		    this.openNoPay=true;
      },
      noPay(){
        this.$http({
          method: "post",
          url: "/cancel-order",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            order_id:this.AllOrderID
          }
        }).then(function(res) {
          this.openNoPay=false;
          this.$layer.msg(res.data.msg);
          if(res.data.code === 0) {
              this.AllOrderUrl="/order";
              this.WaitingPayUrl= "/order/waiting-pay";
              this.WaitingDeliverUrl="/order/waiting-deliver";
              this.WaitingRecieveUrl= "/order/waiting-recieve";
              this.AllOrderList=[];
              this.WaitingPayList=[];
              this.WaitingDeliverList=[];
              this.WaitingRecieveList=[];
              this.AllOrder();
              this.WaitingPay();
              this.WaitingDeliver();
              this.WaitingRecieve();

          }
        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
      closeNoPay(){
        this.openNoPay=false;
      },
      closeSimpleDialog () {
        this.openSimple = false;
      },
      goDetail(id){
		    localStorage.setItem("order_id",id);
		    this.$router.push("/orderdetails");
      },
      removeOrder(id){
        this.AllOrderID = id;
        this.openRemove=true;
      },
      yesRemove(){
        this.$http({
          method: "post",
          url: "/delete-order",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            order_id:this.AllOrderID
          }
        }).then(function(res) {
          this.openRemove=false;
          this.$layer.msg(res.data.msg);
          if(res.data.code === 0) {
            this.AllOrderUrl="/order";
            this.WaitingPayUrl= "/order/waiting-pay";
            this.WaitingDeliverUrl="/order/waiting-deliver";
            this.WaitingRecieveUrl= "/order/waiting-recieve";
            this.AllOrderList=[];
            this.WaitingPayList=[];
            this.WaitingDeliverList=[];
            this.WaitingRecieveList=[];
            this.AllOrder();
            this.WaitingPay();
            this.WaitingDeliver();
            this.WaitingRecieve();

          }
        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
      noRemove(){
        this.openRemove=false;
      },
      recieve(id){
        this.AllOrderID = id;
		    this.openRecieve=true;
      },
      yesRecieve(){
        this.$http({
          method: "post",
          url: "/finish-order",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            order_id:this.AllOrderID
          }
        }).then(function(res) {
          this.openRemove=false;
          this.$layer.msg(res.data.msg);
          if(res.data.code === 0) {
            this.AllOrderUrl="/order";
            this.WaitingPayUrl= "/order/waiting-pay";
            this.WaitingDeliverUrl="/order/waiting-deliver";
            this.WaitingRecieveUrl= "/order/waiting-recieve";
            this.AllOrderList=[];
            this.WaitingPayList=[];
            this.WaitingDeliverList=[];
            this.WaitingRecieveList=[];
            this.AllOrder();
            this.WaitingPay();
            this.WaitingDeliver();
            this.WaitingRecieve();

          }
        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
      noRecieve(){
        this.openRecieve=false;
      },
      onCopy() {
        this.$layer.msg('复制成功');
      },
      onError() {
        this.$layer.msg('复制失败');
      },
      evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.push('/personal');
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
  }
  .orderContent{
    display: flex;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderLeft{
    width: 100%;
    margin-right: 1.5rem;
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
  .orderPrice{
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .orderBottom{
    padding:1rem;
  }
  .status{
    float: left;
    line-height: 3rem;
    color: #09a2d6;
  }
  .created_at{
    color: #555;
    font-size: small;
    float: left;
    line-height: 2rem;
  }
  .cancellationOrder{
    border: 1px solid #999999;
    height: 3rem;
    border-radius: 3px;
  }
  .payBtn{
    border: 1px solid #28CFEC;
    color: #09a2d6;
    height: 3rem;
    border-radius: 3px;
    margin-left: 1rem;
  }

  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    padding:0 2rem;
    margin-top: 1rem;
  }
  .noMore{
    width: 100%;
    line-height: 4rem;
    color: #666;
    text-align: center;
    background: #fff;
    margin-top: -4rem;
  }
  .loginOutBtn {
    border-top: 1px solid #ddd;
    width: 50%;
  }

  .loginOutBtn:first-child {
    border-right: 1px solid #ddd;
  }
</style>
