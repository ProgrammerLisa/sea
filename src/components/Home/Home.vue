<template>
	<div id="content">
		<div class="landscape"></div>
		<div class="filter"></div>
		<canvas id="canvas"></canvas>

		<div id="notice">
			<marquee style="line-height: 2rem; height: 30px; position: relative;" scrollamount="5" scrolldelay="1"><span style=" font-size: 1.5rem;color: #fff;vertical-align:middle;">{{marquee}}</span></marquee>
		</div>
		<div class="topOption option1">
			<div class="icon">
				<img :src="zhenzhuIcon" /> 珍珠
				<span style="margin-left: 0.5rem">{{pearlCount}}</span>

			</div>
			<div class="icon">
				<img :src="nengliangIcon" /> 能量
				<span style="margin-left: 0.5rem">{{energyCount}}</span>
			</div>
		</div>
		<div id="imgDiv"></div>
		<router-link class="option2" to="/gamerules" tag="div">
			<img src="../../assets/images/youxiguize.png" class="invitation-friends" />
			<p>游戏规则</p>
		</router-link>
		<router-link class="option3" to="/record" tag="div">
			<img src="../../assets/images/zhanji.png" class="invitation-friends" /><span class="tips"></span>
			<p>战绩</p>
		</router-link>
		<router-link class="option4" to="/ask" tag="div">
			<img src="../../assets/images/yaoqinghaoyou.png" class="invitation-friends" />
			<p>邀请好友</p>
		</router-link>
		<div id="pearlContainer" v-if="hasPearl">
			<button :class="t.divClass" v-for="(t,index) in imgDiv" @click="getPearl(index,t.id) " :disabled="t.isDisabled" :style="'background: url('+t.href+');background-repeat: no-repeat;background-size: 4.5rem 4.5rem ;'">
        <div class="text-center" style="margin-top: 5rem;font-size: smaller" >{{t.imgCount}}</div>
      </button>
		</div>
		<div class="waitingContainer" v-else>
			<div class="waiting">
				<img :src="bh" />
			</div>
			<div class="text-center" style="color: #fff">正在生长中...</div>
		</div>

	</div>
</template>

<script>
	import { Group, Cell } from 'vux'
	import zhenzhuIcon from '@/assets/images/zhenzhuHome.png'
	import nengliang from '@/assets/images/nengliang.png'

	import defaultPearl from '@/assets/images/zhenzhu.png'
	import defaultOcean from '@/assets/images/haiyangzhixin.png'

	import ocean1 from '@/assets/images/haiyangzhixin3x/hailanzhixin1@3x.png'
	import ocean2 from '@/assets/images/haiyangzhixin3x/hailanzhixin2@3x.png'
	import ocean3 from '@/assets/images/haiyangzhixin3x/hailanzhixin3@3x.png'
	import ocean4 from '@/assets/images/haiyangzhixin3x/hailanzhixin4@3x.png'
	import ocean5 from '@/assets/images/haiyangzhixin3x/hailanzhixin5@3x.png'
	import ocean6 from '@/assets/images/haiyangzhixin3x/hailanzhixin6@3x.png'
	import ocean7 from '@/assets/images/haiyangzhixin3x/hailanzhixin7@3x.png'
	import ocean8 from '@/assets/images/haiyangzhixin3x/hailanzhixin8@3x.png'
	import ocean9 from '@/assets/images/haiyangzhixin3x/hailanzhixin9@3x.png'

	import pearl1 from '@/assets/images/zhenzhu3x/zhenzhu1@3x.png'
	import pearl2 from '@/assets/images/zhenzhu3x/zhenzhu2@3x.png'
	import pearl3 from '@/assets/images/zhenzhu3x/zhenzhu3@3x.png'
	import pearl4 from '@/assets/images/zhenzhu3x/zhenzhu4@3x.png'
	import pearl5 from '@/assets/images/zhenzhu3x/zhenzhu5@3x.png'
	import pearl6 from '@/assets/images/zhenzhu3x/zhenzhu6@3x.png'
	import pearl7 from '@/assets/images/zhenzhu3x/zhenzhu7@3x.png'
	import pearl8 from '@/assets/images/zhenzhu3x/zhenzhu8@3x.png'
	import pearl9 from '@/assets/images/zhenzhu3x/zhenzhu9@3x.png'

	export default {
		components: {
			Group,
			Cell
		},
		filters: {

		},
		data() {
			return {
				pearlCount: 0,
				energyCount: 0,
				marquee: '',
				hasPearl: false,
				bh: defaultPearl,
				zhenzhuIcon: zhenzhuIcon,
				nengliangIcon: nengliang,
				pearl: [pearl1, pearl2, pearl3, pearl4, pearl5, pearl6, pearl7, pearl8, pearl9],
				ocean: [ocean1, ocean2, ocean3, ocean4, ocean5, ocean6, ocean7, ocean8, ocean9],
				imgDiv: [],
				PearlLevel1: {
					imgCount: '',
					href: defaultPearl,
					divClass: '',
					animation: '',
					level: 1,
					id: '',
					isDisabled: false,
				},
				PearlLevel2: {
					imgCount: '',
					href: defaultOcean,
					divClass: '',
					animation: '',
					level: 2,
					id: '',
					isDisabled: false,
				}
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.startStyle();
			})
		},
		methods: {
			startStyle() {
				this.$http({
						method: "post",
						url: "/",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {}
					}).then(function(res) {
						if(res.data.code === 401) {
							this.$layer.msg('请登录后再试！');
							this.$router.replace('/login');
						}
						if(res.data.code == 0) {
							this.pearlCount = res.data.data.user.pearl;
							this.energyCount = res.data.data.user.energy;
							let that = this;
							this.marquee = res.data.data.configs.marquee;
							if(res.data.data.pearls.length !== 0) {
								that.hasPearl = true;

								this.imgDiv = [];

								for(let i = 0; i < res.data.data.pearls.length; i++) {
									if(res.data.data.pearls[i].pearl_type === "NORMAL") {

										//普通珍珠
										this.PearlLevel1.id = res.data.data.pearls[i].id;
										this.PearlLevel1.imgCount = res.data.data.pearls[i].reward;
										this.PearlLevel1.divClass = 'pearlBox pearlBox' + res.data.data.pearls[i].today_num % 10;
										this.imgDiv.push(this.PearlLevel1)
										this.PearlLevel1 = {
											imgCount: '',
											divClass: '',
											href: defaultPearl,
											animation: '',
											isDisabled: false,
											level: 1,
											id: ''
										}

									} else if(res.data.data.pearls[i].pearl_type === "LUCK") {
										//海洋之心
										this.PearlLevel2.id = res.data.data.pearls[i].id;
										this.PearlLevel2.imgCount = res.data.data.pearls[i].reward;
										this.PearlLevel1.divClass = 'pearlBox pearlBox' + res.data.data.pearls[i].today_num % 10;
										this.imgDiv.push(this.PearlLevel2)
										this.PearlLevel2 = {
											imgCount: '',
											divClass: '',
											href: defaultOcean,
											animation: '',
											isDisabled: false,
											level: 2,
											id: ''
										}
									}

								}

							} else {
								that.hasPearl = false;
							}
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));

			},
			getPearl(index, id) {
				this.imgDiv[index].isDisabled = true;
				this.$http({
						method: "post",
						url: "/play",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							pearl_id: id
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							this.pearlCount = res.data.user_pearl;
							this.energyCount = res.data.user_energy;
							$(".pearlBox").eq(index).animate({
								top: "-200%"
							}, 1000);

							if(res.data.is_new_round === true) {
								this.startStyle();
							}
						} else {
							this.$layer.msg(res.data.msg);
							this.imgDiv[index].isDisabled = false;
						}
					}.bind(this))
					.catch(function(err) {
						this.imgDiv[index].isDisabled = false;
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},

			animation(e, index, arr) {
				for(let i in arr) {
					(function(i) {
						setTimeout(function() {
							e.target.src = arr[i];
							if(i == arr.length - 1) {
								console.log(true)
								$(".float-container").eq(index).animate({
									marginTop: '-150%'
								}, 500)
							}
						}, i * 200);

					})(i);

				}
			},
			accumulative(e, index) {
				let that = this;
				let imgArr = [];
				switch(parseInt(e.currentTarget.dataset.level)) {
					case 1:
						imgArr = that.pearl;
						that.animation(e, index, imgArr);
						that.$layer.msg("普通珍珠");
						break;
					case 2:
						imgArr = that.ocean;
						that.animation(e, index, imgArr);
						that.$layer.msg("恭喜获得 海洋之心");
						break;
				}

				this.imgSum += this.imgDiv[index].imgCount;
				let divSelf = e.currentTarget;

				setTimeout(function() {
					divSelf.remove();
					localStorage.removeItem("float-container-left-" + index);
					localStorage.removeItem("float-container-top-" + index);
				}, 3000);
			}

		}

	}
</script>
<style scoped>
	#content {
		width: 100vw;
		margin: 0;
		height: 100vh;
		overflow: hidden;
		cursor: none;
		color: #fff;
		/*background:linear-gradient(to bottom,#3198D3 0%,#2E6EA1 100%);*/
		background: #1A3B57;
	}
	
	.landscape {
		position: absolute;
		left: 0;
		bottom: 45px;
		width: 100%;
		height: 100%;
		background-image: url('../../assets/images/bg.png');
		background-size: 100% 100%;
		background-repeat: repeat-x;
		background-position: center bottom;
	}
	
	#notice {
		position: absolute;
		top: 2rem;
		height: 2.5rem;
		width: 100%;
		font-size: 1.01rem;
		background: rgba(255, 255, 255, 0.1);
	}
	
	.icon {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 2rem;
		padding: 0.1rem 1.5rem 0.1rem 0.5rem;
		margin-bottom: 1rem;
	}
	
	.icon img {
		width: 2rem;
	}
	
	.topOption {
		position: absolute;
	}
	
	.option1 {
		left: 1rem;
		top: 6.5rem;
	}
	
	.invitation-friends {
		border-radius: 50%;
		padding: 0.4rem;
	}
	
	.option2,
	.option3,
	.option4 {
		width: 7rem;
		float: right;
		text-align: center;
		position: absolute;
		top: 72vh;
		color: #fff;
		z-index: 999;
	}
	
	.option2 {
		right: 1rem;
	}
	
	.option3 {
		top: 55vh;
		right: 1rem;
	}
	
	.option2 img,
	.option3 img,
	.option4 img {
		width: 70%;
	}
	
	.option2:active img,
	.option3:active img,
	.option4:active img {
		transform: scale3d(0.8, 0.8, 0.8);
		transition: 0.1s;
	}
	
	.option4 {
		left: 1rem;
	}
	
	.option4-Icon span {
		font-size: 2.5rem;
	}
	
	#pearlContainer {
		position: relative;
		width: 100vw;
		height: 50vh;
	}
	
	.float-container {
		width: 8rem;
		height: 8rem;
		position: absolute;
		/*box-shadow: 0.1rem 0.1rem 0.1rem #112941;*/
		animation: myfirst 2s infinite;
		text-align: center;
	}
	
	.float-container img {
		width: 100%;
	}
	
	p {
		margin-bottom: 0;
	}
	
	.tips {
		width: 0.6rem;
		height: 0.6rem;
		display: inline-block;
		background: #FC0506;
		position: absolute;
		right: 1.2rem;
		margin-top: 0.2rem;
		border-radius: 50%;
		display: none;
	}
	
	.pearlBox {
		border: none;
		width: 4.5rem;
		height: 8rem;
		position: absolute;
		outline: none;
		animation: myfirst 2s infinite;
	}
	
	.pearlBox1 {
		top: 20vh;
		left: 40vw;
	}
	
	.pearlBox2 {
		top: 5vh;
		left: 41vw;
	}
	
	.pearlBox3 {
		top: 10vh;
		left: 5vw;
	}
	
	.pearlBox4 {
		top: 0;
		left: 20vw;
	}
	
	.pearlBox5 {
		top: 0;
		left: 70vw;
	}
	
	.pearlBox6 {
		top: 15vh;
		left: 70vw;
	}
	
	.pearlBox7 {
		top: 25vh;
		left: 8vw;
	}
	
	.pearlBox8 {
		top: 35vh;
		left: 28vw;
	}
	
	.pearlBox9 {
		top: 30vh;
		left: 58vw;
	}
	
	.pearlBox0 {
		top: -10vh;
		left: 55vw;
	}
	
	.waitingContainer {
		position: relative;
		margin-top: 13vh;
		font-size: 1.5rem;
	}
	
	.waiting {
		width: 6rem;
		height: 6rem;
		animation: myfirst 2s infinite;
		margin: 1rem auto;
	}
	
	.waiting img {
		width: 100%;
	}
	
	@keyframes myfirst {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(0, -1rem);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>