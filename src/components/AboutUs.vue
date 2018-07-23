<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -20px; position: absolute; left: 50%; font-size: 1.8rem;">关 于</span>
			</div>
		</div>
		<div class="about">
			<img :src="logo" class="logo" />
			<h4>深海夺宝1.11</h4>
			<p class="agreement">《用户使用协议和隐私条款》</p>
		</div>
	</div>
</template>

<script>
	import logo from '@/assets/images/bg.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "AboutUs",
		data() {
			return {
				masrc: back,
				logo: logo
			}
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
			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #fff;
    width: 100vw;
    position: fixed;
    top: 0;
		height: 100vh;
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

	.about {
		text-align: center;
		color: #444;
		margin-top: 12rem;
	}

	.logo {
		width: 8rem;
		height: 8rem;
		border-radius: 0.6rem;
		margin-bottom: 1rem;
	}

	.agreement {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding-bottom: 2rem;
		font-size: smaller;
		color: #09a2d6;
	}
</style>
