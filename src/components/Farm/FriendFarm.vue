<template>
	<div class="content">
		<audio style="display: none;" id="pearlAudio" src="../../assets/audio/zhenzhu.mp3"></audio>
		<mu-appbar class="myNavTitle" textColor="#fff" z-depth="0" id="farmNav">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
			<span class="navTitleText">
          		{{nickname}}的养殖场
        	</span>
		</mu-appbar>
		<div class="icon"><img :src="friend_avatar" /> <span style="vertical-align: middle">珍珠 {{friend_pearl}}</span></div>
		<div class="options" @click="LeavingMessage">
			<img src="../../assets/images/liuyanban.png" class="invitation-friends" />
			<p>留言板</p>
		</div>

		<div class="farmBack">
			<div id="pearlContainer" v-if="hasPearl">
				<button :class="t.divClass" v-for="(t,index) in imgDiv" @click="getPearl(index,t.id) " :disabled="t.isDisabled">
        <div><img :src="t.href" class="divImg"/></div>
        <div class="text-center divCount" v-if="hasPearl1">{{t.imgCount}}</div>
        <div class="text-center divtime" v-else><div class="txt">还剩</div>{{t.remain}}分</div>
        
      </button>
			</div>
			<div class="waitingContainer" v-else>
				<div class="waiting">
					<img :src="bh" />
				</div>
				<div class="text-center">正在生长中...</div>
			</div>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/return.png'
	import backs from '@/assets/images/backs.png'
	import bh from '@/assets/images/bihe.png'
	import pic1 from "@/assets/images/chushi.png"
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
		name: "friendfarm",
		data() {
			return {
				masrc: back,
				nickname: '',
				bh: defaultPearl,
				p: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11],
				o: [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11],
				friend_pearl: 0,
				friend_avatar: pic1,
				hasPearl: false,
				hasPearl1: false,
				imgDiv: [],
				PearlLevel1: {
					remain: '',
					imgCount: '',
					href: defaultPearl,
					divClass: '',
					animation: '',
					level: 1,
					id: '',
					isDisabled: false,
					hasStolen: true
				},
				PearlLevel2: {
					remain: '',
					imgCount: '',
					href: defaultOcean,
					divClass: '',
					animation: '',
					level: 2,
					id: '',
					isDisabled: false,
					hasStolen: true
				}
			}
		},
		mounted() {
			let that = this;
			mui.back = function() {
				that.$router.go(-1);
			};
			this.$nextTick(function() {
				this.friendfarm();
			})
			if(localStorage.getItem('nickname') == '') {
				this.nickname = localStorage.getItem('friend_uid')
			} else {
				this.nickname = localStorage.getItem('nickname')
			}
			
		},
		methods: {
			friendfarm() {
				this.imgDiv = [];
				this.$http({
						method: "post",
						url: "/users/plant",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							friend_uid: localStorage.getItem("friend_uid")
						}
					}).then(function(res) {
						if(res.data.code === 0) {
							this.friend_pearl = res.data.friend_pearl;
							this.nickname = localStorage.getItem('thief_name');
							this.nickname = localStorage.getItem('nickname')
							if(res.data.friend_avatar === null || res.data.friend_avatar === undefined || res.data.friend_avatar === "") {
								this.friend_avatar = pic1
							} else {
								this.friend_avatar = res.data.friend_avatar
							}
							if(res.data.pearls.length > 0) {
								this.hasPearl = true;
								this.imgDiv = [];

								for(let i = 0; i < res.data.pearls.length; i++) {
									//是否可偷
									if(res.data.pearls[i].is_locked === 0) {
										this.hasPearl1 = true;
										if(res.data.pearls[i].pearl_type === "NORMAL") {
											//普通珍珠
											this.PearlLevel1.id = res.data.pearls[i].id;
											this.PearlLevel1.divClass = 'pearlBox pearlBox' + res.data.pearls[i].today_num % 10;

											//											this.PearlLevel1.remain = res.data.pearls[i].is_locked;
											this.PearlLevel1.imgCount = res.data.pearls[i].reward;

											this.imgDiv.push(this.PearlLevel1)
											this.PearlLevel1 = {
												remain: '',
												imgCount: '',
												divClass: '',
												href: defaultPearl,
												animation: '',
												level: 1,
												id: '',
												isDisabled: false
											}

										} else if(res.data.pearls[i].pearl_type === "LUCK") {
											//海洋之心
											this.PearlLevel2.id = res.data.pearls[i].id;
											this.PearlLevel2.imgCount = res.data.pearls[i].reward;
											this.PearlLevel2.divClass = 'pearlBox pearlBox' + res.data.pearls[i].today_num % 10;
											this.imgDiv.push(this.PearlLevel2)
											this.PearlLevel2 = {
												remain: '',
												imgCount: '',
												divClass: '',
												href: defaultOcean,
												animation: '',
												level: 2,
												id: '',
												isDisabled: false
											}
										}
									} else {
										this.PearlLevel1.remain = res.data.pearls[i].is_locked;
										if(res.data.pearls[i].pearl_type === "NORMAL") {
											//普通珍珠
											this.PearlLevel1.id = res.data.pearls[i].id;
											this.PearlLevel1.divClass = 'pearlBox pearlBox' + res.data.pearls[i].today_num % 10;

											this.imgDiv.push(this.PearlLevel1)
											this.PearlLevel1 = {
												remain: '',
												imgCount: '',
												divClass: '',
												href: defaultPearl,
												animation: '',
												level: 1,
												id: '',
												isDisabled: false
											}
										} else if(res.data.pearls[i].pearl_type === "LUCK") {
											//海洋之心
											this.PearlLevel2.id = res.data.pearls[i].id;
											this.PearlLevel2.imgCount = res.data.pearls[i].reward;
											this.PearlLevel2.divClass = 'pearlBox pearlBox' + res.data.pearls[i].today_num % 10;
											this.imgDiv.push(this.PearlLevel2)
											this.PearlLevel2 = {
												remain: '',
												imgCount: '',
												divClass: '',
												href: defaultOcean,
												animation: '',
												level: 2,
												id: '',
												isDisabled: false
											}
										}
									}
								}
							} else {
								this.hasPearl = false;
								this.hasPearl1 = false;
							}
						} else {
							this.$layer.msg(res.data.msg);
							//							this.PearlLevel1.imgCount = res.data.pearls[i].reward;
							//							this.PearlLevel1.remain = res.data.remain_time;
							//							console.log(this.PearlLevel1.remain)

						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			getPearl(index, id) {
				this.$http({
						method: "post",
						url: "/steal",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							pearl_id: id,
							friend_uid: localStorage.getItem("friend_uid")
						}
					}).then(function(res) {
						if(res.data.code === 0) {

							let pearlAudio = document.getElementById('pearlAudio');
							pearlAudio.play();
							this.imgDiv[index].isDisabled = true;
							this.pearlCount = res.data.user_pearl;
							this.energyCount = res.data.user_energy;
							let that = this;
							let i = 0;
							if(that.imgDiv[index].href === defaultPearl) {
								let timer = setInterval(() => {

									//									let pearlAudio = document.getElementById('pearlAudio');
									//									pearlAudio.play();remain

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
							}

							$(".animateCount").eq(index).text('+' + res.data.stolen_reward).animate({
								color: "#12dd99",
								opacity: 0,
								marginTop: '-100%'
							}, 1000);
							setTimeout(() => {
								$(".animateCount").eq(index).text(this.imgDiv[index].imgCount).animate({
									color: "#fff",
									opacity: 1,
									marginTop: '4rem'
								}, 100)
							}, 1000)
						} else {
							this.$layer.msg(res.data.msg);
							//							this.PearlLevel1.remain = res.data.pearls[i].remain_time;
							this.imgDiv[index].remain = res.data.remain_time;
							//							this.imgDiv[index].imgCount = '';
							console.log(res.data.remain_time)
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			LeavingMessage() {
				this.$router.push({
					path: '/leavingmessage',
					name: 'leavingmessage',
					params: {
						name: 'name'
					}
				})
			},
			goBack() {
				this.$router.go(-1);
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			}
		}
	}
</script>

<style scoped>
	.content {
		color: #fff;
		font-size: 1.6rem;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: #1A3B57;
	}
	
	#farmNav {
		background: transparent;
		border: none;
		color: #fff;
	}
	
	.farmBack {
		width: 100%;
		height: 110vh;
		max-height: 730px;
		overflow: hidden;
		margin-top: -48px;
		background-image: url("../../assets/images/bg.png");
		background-size: 100% 100%;
		background-repeat: repeat-x;
		background-position: center top;
	}
	
	.icon {
		position: absolute;
		left: 1rem;
		top: 6.5rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 2rem;
		padding: 0.3rem 1.5rem 0.3rem 0.5rem;
		font-size: 1.5rem;
	}
	
	.icon img {
		width: 2.5rem;
		border-radius: 50%;
	}
	
	.options {
		width: 6rem;
		text-align: center;
		position: absolute;
		top: 72vh;
		right: 0;
		color: #fff;
	}
	
	.options img {
		width: 80%;
	}
	
	.options img:active {
		transform: scale3d(0.8, 0.8, 0.8);
		transition: 0.1s;
	}
	
	#pearlContainer {
		position: relative;
		width: 100vw;
		height: 50vh;
		margin-top: 10vh;
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
		top: 50vh;
		left: 40vw;
	}
	
	.pearlBox2 {
		top: 35vh;
		left: 41vw;
	}
	
	.pearlBox3 {
		top: 40vh;
		left: 5vw;
	}
	
	.pearlBox4 {
		top: 30vh;
		left: 20vw;
	}
	
	.pearlBox5 {
		top: 30vh;
		left: 70vw;
	}
	
	.pearlBox6 {
		top: 45vh;
		left: 70vw;
	}
	
	.pearlBox7 {
		top: 55vh;
		left: 8vw;
	}
	
	.pearlBox8 {
		top: 65vh;
		left: 28vw;
	}
	
	.pearlBox9 {
		top: 60vh;
		left: 58vw;
	}
	
	.pearlBox0 {
		top: 20vh;
		left: 55vw;
	}
	
	.waitingContainer {
		margin-top: 40vh;
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
	
	.divImg {
		width: 100%;
	}
	
	.divtime {
		position: absolute;
		/*margin-top: -45px;*/
		margin-left: 8px;
		font-size: smaller;
		/*color:#DCDCDC;*/
	}
	
	.txt {
		font-size: inherit;
	}
</style>