<template>
	<div class="content">

    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的珍珠</span>
    </mu-appbar>
		<div class="allPearl contentMarginTop">
			<div class="pearl" v-for="p in pearl">
				<span>
          <img :src="p.img"/>
          <span>{{p.name}}</span>
				</span>
				<span class="text-right">{{p.count}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import zhenzhu from '@/assets/images/zhenzhu2x.png'
	import maoyan from '@/assets/images/maoyan2x.png'
	import yingoupo from '@/assets/images/yingoupo2x.png'
	import hernghesha from '@/assets/images/hernghesha2x.png'
	import haiyangzhixin from '@/assets/images/haiyangzhixin2x.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "MyPearl",
		data() {
			return {
				masrc: back,
				pearl: [{
						img: zhenzhu,
						name: '珍珠',
						count: 26
					},
					{
						img: maoyan,
						name: '猫眼',
						count: 8
					},
					{
						img: yingoupo,
						name: '影欧珀',
						count: 10
					},
					{
						img: hernghesha,
						name: '恒河沙',
						count: 6
					},
					{
						img: haiyangzhixin,
						name: '海洋之心',
						count: 6
					}
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
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.allPearl {
		background: #fff;
	}

	.pearl {
		border-bottom: 0.1rem solid #f5f5f5;
		padding:0 1.6rem;
    height: 8vh;
    line-height: 8vh;
	}

	img {
		height: 2rem;
	}

	.text-right {
		float: right;
	}
</style>
