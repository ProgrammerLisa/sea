<template>
	<div id="content">
		<audio style="display: none;" id="pearlAudio" src="../../assets/audio/zhenzhu.mp3"></audio>
		<div class="landscape"></div>
		<div class="filter"></div>
		<canvas id="canvas"></canvas>

		<div id="notice">
			<marquee style="line-height: 2rem; height: 30px; position: relative;" scrollamount="5" scrolldelay="1"><span style=" font-size: 1.5rem;color: #fff;vertical-align:middle;padding-top: 3px;display: inline-block">{{marquee}}</span></marquee>
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
			<button :class="t.divClass" v-for="(t,index) in imgDiv" @click="getPearl(index,t.id) " :disabled="t.isDisabled">
        <div><img :src="t.href" class="divImg"/></div>
        <div class="text-center divCount">{{t.imgCount}}</div>
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

	import p1 from '@/assets/images/zhenzhu3x/zhenzhu1@3x.png'
	import p2 from '@/assets/images/zhenzhu3x/zhenzhu2@3x.png'
	import p3 from '@/assets/images/zhenzhu3x/zhenzhu3@3x.png'
	import p4 from '@/assets/images/zhenzhu3x/zhenzhu4@3x.png'
	import p5 from '@/assets/images/zhenzhu3x/zhenzhu5@3x.png'
	import p6 from '@/assets/images/zhenzhu3x/zhenzhu6@3x.png'
	import p7 from '@/assets/images/zhenzhu3x/zhenzhu7@3x.png'
	import p8 from '@/assets/images/zhenzhu3x/zhenzhu8@3x.png'
	import p9 from '@/assets/images/zhenzhu3x/zhenzhu9@3x.png'
	import p10 from '@/assets/images/zhenzhu3x/zhenzhu10@3x.png'
	import p11 from '@/assets/images/zhenzhu3x/zhenzhu11@3x.png'

	import o1 from '@/assets/images/haiyangzhixin3x/hailanzhixin1@3x.png'
	import o2 from '@/assets/images/haiyangzhixin3x/hailanzhixin2@3x.png'
	import o3 from '@/assets/images/haiyangzhixin3x/hailanzhixin3@3x.png'
	import o4 from '@/assets/images/haiyangzhixin3x/hailanzhixin4@3x.png'
	import o5 from '@/assets/images/haiyangzhixin3x/hailanzhixin5@3x.png'
	import o6 from '@/assets/images/haiyangzhixin3x/hailanzhixin6@3x.png'
	import o7 from '@/assets/images/haiyangzhixin3x/hailanzhixin7@3x.png'
	import o8 from '@/assets/images/haiyangzhixin3x/hailanzhixin8@3x.png'
	import o9 from '@/assets/images/haiyangzhixin3x/hailanzhixin9@3x.png'
	import o10 from '@/assets/images/haiyangzhixin3x/hailanzhixin10@3x.png'
	import o11 from '@/assets/images/haiyangzhixin3x/hailanzhixin11@3x.png'

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
				p: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11],
				o: [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11],
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
						if(res.data.code === 0) {
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
										this.PearlLevel2.divClass = 'pearlBox pearlBox' + res.data.data.pearls[i].today_num % 10;
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
						if(res.data.code === 0) {
							//            let pearlAudio = document.getElementById('pearlAudio');
							//            pearlAudio.play();

							//			  pearlAudio.playbackRate = 2;
							//			  pearlAudio.play();
							//			  alert(pearlAudio.playbackRate);

							this.imgDiv[index].isDisabled = true;
							this.pearlCount = res.data.user_pearl;
							this.energyCount = res.data.user_energy;
							let that = this;
							let i = 0;
							if(that.imgDiv[index].href === defaultPearl) {
								let timer = setInterval(() => {

									let pearlAudio = document.getElementById('pearlAudio');
									pearlAudio.play();

									if(i < that.p.length) {
										that.imgDiv[index].href = that.p[i];
										$(".divImg").eq(index).css({
											width: "150%",
											marginLeft: "-25%",
											marginTop: '-1rem'
										});
										$(".divCount").eq(index).css({
											marginTop: "-0.6rem"
										});

										i++
									} else {
										clearInterval(timer);
										$(".pearlBox").eq(index).animate({
											top: "-200%"
										}, 1000);

									}

								}, 200)
							} else if(that.imgDiv[index].href === defaultOcean) {
								let timer = setInterval(() => {
									if(i < that.o.length) {
										that.imgDiv[index].href = that.o[i];
										$(".divImg").eq(index).css({
											width: "150%",
											marginLeft: "-25%"
										});
										$(".divCount").eq(index).css({
											marginTop: "-0.5rem"
										});

										i++
									} else {
										clearInterval(timer);
										$(".pearlBox").eq(index).animate({
											top: "-200%"
										}, 1000);

									}

								}, 200)
							}
							if(res.data.pearls.length === 0) {
								setTimeout(() => {
									that.hasPearl = false;
								}, 3500)
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
		width: 6.5rem;
		float: right;
		text-align: center;
		position: absolute;
		bottom: 66px;
		color: #fff;
		z-index: 999;
	}
	
	.option2 {
		right: 1rem;
	}
	
	.option3 {
		left: 7rem;
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
		width: 4rem;
		height: 8rem;
		position: absolute;
		outline: none;
		animation: myfirst 2s infinite;
		background: none;
	}
	
	.pearlBox1 {
		top: 12vh;
		left: 44vw;
	}
	
	.pearlBox2 {
		top: 29vh;
		left: 42vw;
	}
	
	.pearlBox3 {
		top: 23vh;
		left: 70vw;
	}
	
	.pearlBox4 {
		top: 10vh;
		left: 14vw;
	}
	
	.pearlBox5 {
		top: 29vh;
		left: 3rem;
	}
	
	.pearlBox6 {
		top: 45vh;
		left: 46vw;
	}
	
	.pearlBox7 {
		top: 37vh;
		left: 80vw;
	}
	
	.pearlBox8 {
		top: 8vh;
		left: 80vw;
	}
	
	.pearlBox9 {
		top: -3vh;
		left: 32vw;
	}
	
	.pearlBox0 {
		top: -8vh;
		left: 62vw;
	}
	
	.divImg {
		width: 100%;
	}
	
	.divCount {
		margin-top: 0.5rem;
		font-size: smaller
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