<template>
	<div v-if="hasSignal" id="content">
		<remote-js src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></remote-js>

		<audio style="display: none;" id="pearlAudio" src="../../assets/audio/zz.mp3"></audio>
		<div class="landscape">
			<!--<iframe style="position: absolute;" MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no sandbox="allow-scripts" src="static/texiao/shuimu.html" width=100% height=50%>
  			</iframe>-->
		</div>
		<div class="filter" id="filter">
		</div>
		<canvas id="canvas"></canvas>

		<div id="notice" >
			<marquee style="line-height: 2rem; height: 30px; position: relative;" scrollamount="5" scrolldelay="1" >
				<span v-for="item in marquee">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span v-for="(items,index) in item" v-if="index==0" style=" font-size: 1.5rem;color:#fff;vertical-align:middle;padding-top: 3px;display: inline-block" >
          				{{items}}
        			</span>
        			<span v-for="(items,index) in item" v-if="index==1" style=" font-size: 1.5rem;color: #fff;vertical-align:middle;padding-top: 3px;display: inline-block" >
        				兑换了 {{items}}
        			</span>
				</span>
			</marquee>
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

		<!--<div id="Shuimu-ont" style="width: auto;height: 50%;position: relative;">-->
		<!--<iframe style="position: absolute;" MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no sandbox="allow-scripts" src="../../static/shuimu.html" width=100% height=auto>
  			</iframe>-->
		<!--</div>-->
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
	<div v-else>
		<nothing @again="again"></nothing>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { Group, Cell } from 'vux'
	import Nothing from '@/components/Nothing'
	//	import sm from '@/assets/js/shuimu.js'
	import zhenzhuIcon from '@/assets/images/zhenzhuHome.png'
	import nengliang from '@/assets/images/nengliang.png'

	import defaultPearl from '@/assets/images/zhenzhu.png'
	import defaultOcean from '@/assets/images/haiyangzhixin.png'

	import p1 from '@/assets/images/zhenzhu3x/zhenzhu1.png'
	import p2 from '@/assets/images/zhenzhu3x/zhenzhu2.png'
	import p3 from '@/assets/images/zhenzhu3x/zhenzhu3.png'
	import p4 from '@/assets/images/zhenzhu3x/zhenzhu4.png'
	import p5 from '@/assets/images/zhenzhu3x/zhenzhu5.png'
	import p6 from '@/assets/images/zhenzhu3x/zhenzhu6.png'
	import p7 from '@/assets/images/zhenzhu3x/zhenzhu7.png'
	import p8 from '@/assets/images/zhenzhu3x/zhenzhu8.png'
	import p9 from '@/assets/images/zhenzhu3x/zhenzhu9.png'
	import p10 from '@/assets/images/zhenzhu3x/zhenzhu10.png'
	import p11 from '@/assets/images/zhenzhu3x/zhenzhu11.png'

	import o1 from '@/assets/images/haiyangzhixin3x/haiyangzhixin1.png'
	import o2 from '@/assets/images/haiyangzhixin3x/haiyangzhixin2.png'
	import o3 from '@/assets/images/haiyangzhixin3x/haiyangzhixin3.png'
	import o4 from '@/assets/images/haiyangzhixin3x/haiyangzhixin4.png'
	import o5 from '@/assets/images/haiyangzhixin3x/haiyangzhixin5.png'
	import o6 from '@/assets/images/haiyangzhixin3x/haiyangzhixin6.png'
	import o7 from '@/assets/images/haiyangzhixin3x/haiyangzhixin7.png'
	import o8 from '@/assets/images/haiyangzhixin3x/haiyangzhixin8.png'
	import o9 from '@/assets/images/haiyangzhixin3x/haiyangzhixin9.png'
	import o10 from '@/assets/images/haiyangzhixin3x/haiyangzhixin10.png'
	import o11 from '@/assets/images/haiyangzhixin3x/haiyangzhixin11.png'
	import o12 from '@/assets/images/haiyangzhixin3x/haiyangzhixin12.png'
	import o13 from '@/assets/images/haiyangzhixin3x/haiyangzhixin13.png'
	import o14 from '@/assets/images/haiyangzhixin3x/haiyangzhixin14.png'
	import o15 from '@/assets/images/haiyangzhixin3x/haiyangzhixin15.png'
	import o16 from '@/assets/images/haiyangzhixin3x/haiyangzhixin16.png'
	import o17 from '@/assets/images/haiyangzhixin3x/haiyangzhixin17.png'
	import o18 from '@/assets/images/haiyangzhixin3x/haiyangzhixin18.png'
	import o19 from '@/assets/images/haiyangzhixin3x/haiyangzhixin19.png'
	import o20 from '@/assets/images/haiyangzhixin3x/haiyangzhixin20.png'
	import o21 from '@/assets/images/haiyangzhixin3x/haiyangzhixin21.png'
	import o22 from '@/assets/images/haiyangzhixin3x/haiyangzhixin22.png'
	import o23 from '@/assets/images/haiyangzhixin3x/haiyangzhixin23.png'

	export default {
		components: {
			Group,
			Cell,
			'nothing': Nothing,
			'remote-js': {
				render(createElement) {
					return createElement('script', {
						attrs: {
							type: 'text/javascript',
							src: this.src
						}
					});
				},
				props: {
					src: {
						type: String,
						required: true
					},
				},
			}
		},
		filters: {

		},
		data() {
			return {
				hasSignal: true,
				pearlCount: 0,
				energyCount: 0,
				marquee: '',
				marquee:[],
				hasPearl: false,
				bh: defaultPearl,
				zhenzhuIcon: zhenzhuIcon,
				nengliangIcon: nengliang,
				p: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11],
				o: [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14, o15, o16, o17, o18, o19, o20, o21, o22, o23],
				imgDiv: [],
				PearlLevel1: {
					imgCount: '',
					href: defaultPearl,
					divClass: '',
					pearl_type: '',
					level: 1,
					id: '',
					isDisabled: false,
				},
				PearlLevel2: {
					imgCount: '',
					href: defaultOcean,
					divClass: '',
					pearl_type: '',
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
							this.hasSignal = true;
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
										this.PearlLevel1.pearl_type = "NORMAL";
										this.PearlLevel1.imgCount = res.data.data.pearls[i].reward;
										this.PearlLevel1.divClass = 'pearlBox pearlBox' + res.data.data.pearls[i].today_num % 10;
										this.imgDiv.push(this.PearlLevel1);
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
										this.PearlLevel2.pearl_type = "LUCK";
										this.PearlLevel2.imgCount = res.data.data.pearls[i].reward;
										this.PearlLevel2.divClass = 'pearlBox pearlBox' + res.data.data.pearls[i].today_num % 10;
										this.imgDiv.push(this.PearlLevel2);
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
						} else {
							this.hasSignal = false;
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
						this.hasSignal = false;
					}.bind(this));

			},
			getPearl(index, id) {
				const that = this;
				this.imgDiv[index].isDisabled = true;
				let pearlAudio = document.getElementById('pearlAudio');
				pearlAudio.pause();
				pearlAudio.currentTime = 0;
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
							pearlAudio.play();
							if(res.data.pearls.length === 0 && res.data.is_new_round === false) {
								setTimeout(() => {
									that.hasPearl = false;
								}, 3500)
							} else if(res.data.is_new_round === true) {
								setTimeout(() => {
									that.imgDiv = [];
									that.startStyle()
								}, 3200)

							}
							this.pearlCount = res.data.user_pearl;
							this.energyCount = res.data.user_energy;
							let that = this;
							let i = 0;
							if(that.imgDiv[index].pearl_type === "NORMAL") {
								let timer = setInterval(() => {

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
							} else if(that.imgDiv[index].pearl_type === "LUCK") {
								$(".pearlBox").eq(index).animate({
									width: "10rem"
								}, 500);
								let timer = setInterval(() => {
									if(i < that.o.length) {
										that.imgDiv[index].href = that.o[i];
										$(".divImg").eq(index).css({
											width: "100%"
										});
										$(".divCount").eq(index).css({
											marginTop: "-0.5rem"
										});

										i++
									} else {
										clearInterval(timer);
										$(".pearlBox").eq(index).animate({
											top: "-200%"
										}, 2200);

									}

								}, 200)
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
			again() {
				this.startStyle();
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
		left: 8rem;
	}
	
	.option2 img,
	.option3 img,
	.option4 img {
		width: 80%;
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
		width: 4.8rem;
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
	
	#ourCanvas {
		position: absolute;
	}
</style>