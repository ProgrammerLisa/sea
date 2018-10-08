<template>
	<div class="content">
		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
			<span class="navTitleText">{{datas.label}}</span>
		</mu-appbar>
		<div class="contentMarginTop"></div>
		<mu-carousel hide-controls>
			<mu-carousel-item v-for="(i,index) in datas.image" :key="index">
				<img :src="i">
			</mu-carousel-item>
		</mu-carousel>
		<mu-card-title :title="datas.name" :sub-title="datas.label"></mu-card-title>
		<mu-flex class="demo-linear-progress" style="line-height: 1.6rem">
			<mu-linear-progress mode="determinate" :value="completed_percent" :size="10" color="#17B7E0" class="myProgress"></mu-linear-progress><span style="margin:-0.5rem 0 0 1rem;color: #09a2d6">{{datas.completed_percent}}</span>
		</mu-flex>
		<div style="display: flex">
			<div class="contentTitle text-center">
				<div class="grid-cell">
					<div style="color:#09a2d6">{{datas.target}}</div>
					<div style="font-size: 1.5rem">目标爱心/颗</div>
				</div>
			</div>
			<div class="contentTitle text-center">
				<div class="grid-cell">
					<div style="color:#09a2d6">{{completed}}</div>
					<div>已筹/颗</div>
				</div>
			</div>
		</div>
		<mu-card-text style="border-bottom: 0.6rem solid #f5f5f5">
			<h4>项目详情 </h4>
			<div style="text-indent:2.5rem;color: #444">
				{{datas.desc}}
			</div>

		</mu-card-text>
		<mu-container style="color: #555;font-size: 1.5rem">
			<div style="width: 95%;border: 1px solid #ddd;padding: 1rem;margin: 1rem auto">
				<div>发起机构：{{datas.sponsor}}</div>
				<div>接受机构：{{datas.accepter}}</div>
				<div>备案号：{{datas.record_no}}</div>
			</div>

		</mu-container>
		<div class="newAddress">
			<mu-flex justify-content="center" align-items="center">
				<mu-button flat class="publicButton" textColor="#fff" to="/donationcount"> 捐珍珠</mu-button>
			</mu-flex>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	import carouselImg1 from '@/assets/images/test/u=780515113,540275411&fm=27&gp=0.jpg'
	import carouselImg2 from '@/assets/images/test/u=4176789213,1736947849&fm=27&gp=0.jpg'
	import carouselImg3 from '@/assets/images/test/u=1498947469,1572939960&fm=27&gp=0.jpg'
	import carouselImg4 from '@/assets/images/test/u=1333292247,557777395&fm=27&gp=0.jpg'
	export default {
		name: "donation",
		data() {
			return {
				masrc: back,
				carouselImg1,
				carouselImg2,
				carouselImg3,
				carouselImg4,
				datas: '',
				completed: '',
				completed_percent: 0
			}
		},
		mounted() {
			let that = this;
			mui.back = function() {
				that.$router.go(-1);
			};
			this.$nextTick(function() {
				this.getData();
			})
		},
		methods: {
			getData() {
				this.$http({
						method: "post",
						url: "/tasks/charity-detail",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							"charity_id": localStorage.getItem("charity_id")
						}
					}).then(function(res) {
						if(res.data.code === 0) {
							this.datas = res.data.data;
							this.completed_percent = parseFloat(this.datas.completed_percent.split("%")[0]);
							//              this.completed=this.completed_percent*this.datas.target;
							//								this.completed=this.completed_percent;
							if(this.datas.completed == '') {
								this.completed = 0;
							} else {
								this.completed = this.datas.completed;
							}
						} else {
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
	.content {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
		position: fixed;
		top: 0;
		background: #fff;
	}
	
	.content::-webkit-scrollbar {
		display: none;
	}
	
	.mu-carousel-item img {
		width: 100%;
		height: 18rem;
	}
	
	.contentTitle {
		width: 50%;
		padding: 1.5rem 0;
		border-bottom: 0.6rem solid #f5f5f5;
		font-size: 1.6rem;
	}
	
	.mu-carousel {
		height: 18rem;
	}
	
	.mu-card-title-container {
		padding: 0.8rem 1.3rem;
	}
	
	.demo-container {
		text-align: center;
		padding: 0.8rem 0;
		color: #555;
		border-bottom: 0.6rem solid #f5f5f5;
	}
	
	.newAddress {
		background: #f5f5f5;
		width: 100%;
		padding: 1rem;
		text-align: center;
		z-index: 999;
	}
	
	.contentMarginTop {
		margin-top: 56px;
	}
	
	.myProgress {
		width: 80%;
		border-radius: 2rem;
		margin-left: 1.3rem;
	}
	
	.publicButton {
		background: linear-gradient(to right, #38E7F8, #0BA5D7);
		color: #fff;
		border-radius: 3px;
		width: 100%;
		font-size: 1.6rem;
		letter-spacing: 1px;
	}
	
	.ciname {
		font-size: 1.5rem;
		margin: 10px auto;
		margin-left: 12px;
	}
</style>