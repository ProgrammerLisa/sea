<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">商城</span>
    </mu-appbar>
		<div class="commodityImg">
			<img :src="commodityImg" />
		</div>
		<div class="commodityTitle">
			<h4>{{commodityTitle}}</h4>
			<p class="commodityPropaganda">{{commodityPropaganda}}</p>
		</div>
		<div class="commodityPrice">
			<span class="nowPrice">当前价：<span class="priceNumber">{{commodityPrice}}</span></span>
			<span class="commodityCount">库存：{{commodityCount}}件 <span class="commodityNumber">兑换：{{commodityNumber}}次</span></span>
			<div>( 成交价：钻石量 )</div>
		</div>
		<div class="considerations">
			<h4 class="considerationsTitle">详情</h4>
			<ul class="commodityConsiderations">
				<li>参与须知:</li>
				<li v-for="c in commodityConsiderations">*{{c.considerations}}</li>
			</ul>
		</div>
		<div class="exchange">
			<button class="btn exchangeBtn" @click="preOrder">立即兑换</button>
		</div>
		{{msg}}
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "commoditydetails",
		data() {
			return {
				masrc: back,
				msg: '',
				commodityImg: '',
				commodityTitle: '',
				commodityPropaganda: '',
				commodityPrice: '',
				commodityCount: '',
				commodityNumber: '',
				commodityConsiderations: [{
						considerations: '请仔细核对你的地址，参加后不可修改；'
					},
					{
						considerations: '兑换成功后，20个工作日内官方包邮发放（港澳台及国外地区除外）；'
					},
					{
						considerations: '请保持手机通畅若快递无法与你取得联系，将视为放弃，钻石量不退还；'
					},
					{
						considerations: '签收后请与3天内检查质量问题，与客服取得联系，逾期不予处理；'
					},
					{
						considerations: '图片仅供参考，以收到实物为准；'
					},
					{
						considerations: '若有疑问，请联系客服；'
					},
				]
			}
		},
		mounted() {

			let routerParams = this.$route.params.dataObj;
			this.commodityImg = routerParams.commodityImg;
			this.commodityTitle = routerParams.commodityTitle;
			this.commodityPropaganda = routerParams.commodityPropaganda;
			this.commodityPrice = routerParams.commodityPrice;
			this.commodityCount = routerParams.commodityCount;
			this.commodityNumber = routerParams.commodityNumber;
		},
		methods: {
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			preOrder() {
				this.$router.push({
					path: '/preorder',
					name: 'preorder',
					params: {
						name: 'name',
						dataObj: {
							commodityImg: this.commodityImg,
							commodityTitle: this.commodityTitle,
							commodityPrice: this.commodityPrice
						}

					}

				})
			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
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
		font-size: 1.5rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.commodityImg {
		background: #f5f5f5;
		text-align: center;
		height: 29vh;
	}

	.commodityImg img {
		height: 24vh;
		margin-top: 2.5vh;
	}

	.commodityTitle {
		padding: 0 1rem;
		border-bottom: 0.1rem solid #f5f5f5;
		color: #555;
	}

	.commodityPropaganda {
		color: #777;
		font-size: small;
	}

	.commodityPrice {
		padding: 1rem;
		border-bottom: 0.5rem solid #f5f5f5;
	}

	.nowPrice {
		color: #09a2d6;
	}

	.priceNumber {
		font-size: 1.8rem;
	}

	.commodityCount {
		float: right;
		color: #555;
	}

	.commodityNumber {
		margin-left: 0.5rem;
	}

	.considerationsTitle {
		color: #555;
		padding: 1rem;
		margin: 0;
		border-bottom: 0.1rem solid #f5f5f5;
	}

	.commodityConsiderations {
		padding: 1rem;
		font-size: smaller;
	}

	.commodityConsiderations li {
		list-style: none;
		margin-bottom: 0.5rem;
	}

	.exchange {
		border-top: 0.1rem solid #f5f5f5;
		text-align: center;
		padding: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
	}

	.exchangeBtn {
		background: #09a2d6;
		border-radius: 0;
		color: #fff;
		width: 75%;
	}
	.exchangeBtn:active{
		background: #009ACD;
	}
	.exchangeBtn:focus{
		outline: 0;
	}
</style>
