<template>
	<div class="content">
    <div id="navTopMargin"></div>
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" @touchstart="evers" @touchend="lat" class="back">  <img :src="masrc"/></span> 客服中心
      </div>
    </div>

		<div v-if="netNone" class="netNone">
			<img :src="netNoneImg" />
			<p>暂时还没有消息哦</p>
		</div>
		<div v-else class="service">
			<h4 class="serviceTitle">客服时间</h4>
			<p class="serviceTime">工作日 9:00-21:00</p>
			<p class="servicePrompt">如有问题请长按识别联系客服</p>
			<img :src="wechatservice" />
		</div>
	</div>
</template>

<script>
	import netNoneImg from '@/assets/images/network.png'
	import wechatservice from '@/assets/images/wechatservice.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "WechatService",
		data() {
			return {
				masrc: back,
				netNone: false,
				netNoneImg: netNoneImg,
				wechatservice: wechatservice
			}
		},
		mounted() {

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
		padding-bottom: 6rem;
		background-color: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
	}

	.panel {
		border: none;
		border-radius: 0;
	}

	.panel-body {
		padding: 0 10px;
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
    position: absolute;
		left: 1rem;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.netNone {
		top: 7rem;
		padding-bottom: 6vh;
		text-align: center;
		padding-top: 6vh;
		position: relative;
		width: 60%;
		height: 50%;
		background-color: #f5f5f5;
		left: 20%;
	}

	.netNone img {
		width: 50%;
		margin-bottom: 1rem;
	}

	.service {
		background: #f5f5f5;
		width: 70%;
		padding: 2rem;
		text-align: center;
		margin: auto;
		margin-top: 15vh;
	}

	.service img {
		width: 70%;
    max-width: 20rem;
	}

	.serviceTitle {
		color: #333;
	}

	.serviceTime {
		color: #09a2d6;
		font-size: larger;
	}
</style>
