<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">关于我们</span>
    </mu-appbar>
		<div class="about contentMarginTop">
			<img :src="logo" class="logo" />
			<h4>夺宝行动1.11</h4>
			<p class="agreement">《用户使用协议和隐私条款》</p>
		</div>
	</div>
</template>

<script>
	import logo from '@/assets/images/logo_android.png'
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
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
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
	.about {
		text-align: center;
		color: #444;
		margin-top: 35vh;
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
