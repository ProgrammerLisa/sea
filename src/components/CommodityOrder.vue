<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers"  @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -32px; position: absolute; left: 50%; font-size: 1.6rem;">我的订单</span>
			</div>
		</div>
		<div v-if="OrderNone" class="OrderNone">
			<img :src="OrderNoneImg" />
			<p>还没有订单哦</p>
			<router-link to="/shopping" tag="span" class="goShopping">去逛逛</router-link>
		</div>

		<div v-else class="media" v-for="(goods,index) in commodity">
			<div>
				<div class="media-left">
					<img class="media-object" :src="goods.commodityImg" alt="...">
				</div>
				<div class="media-body">
					<p class="media-heading">{{goods.commodityTitle}}</p>
					<div class="commodityPrice">{{goods.commodityPrice}}</div>
					<div class="goodsMessage">成交价 ( 钻石量 )</div>
					<div>
						<span class="goodsMessage">兑换次数：{{goods.commodityNumber}} </span>
						<button class="btn enchangeBtnEnd" v-if="goods.isEnd">
             已收货
           </button>
						<button class="btn enchangeBtn" v-else>
             确认收货
           </button>
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
		name: "CommodityOrder",
		data() {
			return {
				masrc: back,
				OrderNone: true,
				OrderNoneImg: OrderNoneImg,
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
		methods: {
			evers() {
				console.log(1)
				this.masrc = backs;
			},
			lat() {
				console.log(2)
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
		color: #666;
		background: #f5f5f5;
		padding-bottom: 6rem;
    width: 100vw;
    position: fixed;
    top: 0;
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
		font-size: 1.6rem;
    margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.media {
		padding: 1.5rem 1rem;
		margin: 0;
		border-bottom: 0.1rem solid #f5f5f5;
		background: #fff;
	}

	.media-left img {
		width: 8rem;
		height: 8rem;
		margin-right: 1rem;
	}

	.media-heading {
		color: #555;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.commodityPrice {
		font-size: 1.6rem;
		color: #09a2d6;
	}

	.goodsMessage {
		font-size: smaller;
	}

	.enchangeBtn {
		float: right;
		border-radius: 0;
		background: #fff;
		border: 0.1rem solid #09a2d6;
		color: #09a2d6;
		padding: 0.5rem;
	}

	.enchangeBtnEnd {
		float: right;
		border-radius: 0;
		background: #09a2d6;
		color: #fff;
	}

	.OrderNone {
		text-align: center;
		padding-top: 18vh;
		color: #999;
	}

	.OrderNone img {
		width: 40%;
		margin-bottom: 1rem;
	}

	.goShopping {
		text-align: center;
		background: #09a2d6;
		color: #fff;
		padding: 0.5rem 3rem;
		display: inline-block;
		margin-top: 1.5rem;
	}

	.goShopping:active {
		background: #009ACD;
	}
</style>
