<template>
	<div class="content">
		<div class="scroll">
			<div class="personal">
				<div class="news">
					<router-link to="/news" v-if="newsCount" tag="div" class="badgePositionRed"></router-link>
					<router-link to="/news" v-else tag="div" class="badgePosition"></router-link>
				</div>
				<div class="container personalMessage">
					<router-link tag="div" to="/compile" v-if="headDefault">
						<div class="HeadPortrait">
							<img :src="`${headPortrait+'?'+now}`" v-if="haveHeadImg" />
							<img :src="headPortrait" v-else/>
							<div class="le">
								<span class="level">Lv.{{level}}</span>
							</div>
						</div>
						<p class="nickName">{{nickName}}</p>
						<p style="margin: 0">
							<mu-button flat style="height: 32px;line-height: 32px">
								<mu-icon value="phone_iphone" left style="font-size: 1.6rem;margin: 0"></mu-icon>{{phone}}
							</mu-button>
						</p>
						<!--<p class="userId">ID：{{phone}}</p>-->
					</router-link>
					<router-link v-else tag="div" to="/login">
						<div class="HeadPortrait">
							<img :src="headPortrait" />
						</div>
						<p class="nickName">点击登录</p>
					</router-link>

					<div class="msgBox">
						<router-link to="wallet" tag="div" class="personalMessageLeft">
							<mu-button flat class="personalText"><img :src="wallet" class="personalIcon">我的钱包</mu-button>
						</router-link>
						<div class="wallet"></div>
						<router-link to="realname" tag="div" class="personalMessageLeft">
							<mu-button flat class="personalText"> <img :src="autonym" class="personalIcon">实名信息</mu-button>
						</router-link>
					</div>
				</div>

			</div>

			<mu-paper :z-depth="1" class="demo-list-wrap">
				<mu-list>
					<mu-list-item button v-for="(m,index) in Personal" class="mylist" :to="m.PersonalHref" :key="index">
						<mu-list-item-action>
							<img class="images" :src="m.imfLeft">
						</mu-list-item-action>
						<mu-list-item-title>{{m.title}}</mu-list-item-title>
						<mu-list-item-action>
							<img v-if="!m.noRouter" class="images" src="../../assets/images/more.png" style="position: relative;left: 1rem" />
							<span v-else class="inviteCode">{{m.myInvite}}</span>
						</mu-list-item-action>
					</mu-list-item>

				</mu-list>
			</mu-paper>
		</div>
	</div>
</template>

<script>
	import friend from '@/assets/images/friend.png'
	import inviter from '@/assets/images/inviter.png'
	import gift from '@/assets/images/gift.png'
	import indent from '@/assets/images/indent.png'
	import address from '@/assets/images/address.png'
	import service from '@/assets/images/service.png'
	import setting from '@/assets/images/setting.png'
	import headImg from '@/assets/images/chushi.png'
	import autonym from '@/assets/images/autonym.png'
	import wallet from '@/assets/images/wallet.png'
	import invite from '@/assets/images/invite.png'

	export default {
		name: "personal",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				autonym: autonym,
				wallet: wallet,
				nickName: '',
				phone: '',
				Personal: [{
						title: '我的好友',
						PersonalHref: 'friend',
						PersonalName: 'friend',
						imfLeft: friend
					},
					{
						title: '我的邀请者',
						PersonalHref: '',
						PersonalName: '',
						imfLeft: inviter,
						noRouter: true,
						myInvite: ''
					},
					{
						title: '邀请奖励',
						PersonalHref: 'ask',
						PersonalName: 'ask',
						imfLeft: invite
					},
					{
						title: '夺宝记录',
						PersonalHref: 'myrankings',
						PersonalName: 'MyRankings',
						imfLeft: invite
					},
					{
						title: '商城订单',
						PersonalHref: 'commodityorder',
						PersonalName: 'CommodityOrder',
						imfLeft: indent
					},
					{
						title: '收货地址',
						PersonalHref: 'address',
						PersonalName: 'address',
						imfLeft: address
					},
					{
						title: '客服中心',
						PersonalHref: 'wechatservice',
						PersonalName: 'WechatService',
						imfLeft: service
					},
					{
						title: '账户设置',
						PersonalHref: 'setting',
						PersonalName: 'Setting',
						imfLeft: setting
					}
				],
				headPortrait: headImg,
				headDefault: true,
				isLogin: true,
				newsCount: false,
				haveHeadImg: false
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.info();
			})
		},
		methods: {
			info() {
				//个人信息
				this.$http({
						method: "get",
						url: "/users/info",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {}
					}).then(function(res) {
						if(res.data.code == 0) {
							var nikename = res.data.data.nickname;
							var headimg = res.data.data.avatar;
							this.phone = res.data.data.phone;
							this.level = res.data.data.level;
							if(nikename == "") {
								this.nickName = localStorage.getItem("uid");
							} else {
								this.nickName = nikename;
							}
							if(headimg == "") {
								this.headPortrait = headImg;
								this.haveHeadImg = false;
							} else {
								this.headPortrait = res.data.data.avatar;
								this.haveHeadImg = true;
							}
						} else {
							this.headPortrait = headImg;
							this.headDefault = false;
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));

				//消息
				this.$http({
						method: "post",
						url: "/messages/box",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							"page": 1
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							if(res.data.count > 0) {
								this.newsCount = true
							} else {
								this.newsCount = false
							}
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));

				//邀请人id
				this.$http({
						method: "post",
						url: "/users/following",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {}
					}).then(function(res) {
						if(res.data.code === 401) {
							//      		this.$layer.alert('登录操作  请登录');
							this.$router.replace('/login');
						}
						if(res.data.code == 0) {
							this.Personal[1].myInvite = res.data.data.inviter_code
						} else {
							this.Personal[1].myInvite = "无";
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));
			},
			changeBack(index) {
				// $(".media").css({background:'#fff'});

			},
			profileAll(c, n) {
				this.$router.push({
					path: c,
					name: n,
					params: {
						name: 'name'
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		background-color: #f5f5f5;
		color: #666;
		padding-bottom: 8rem;
		height: 100vh;
		overflow-y: scroll;
	}

	.content::-webkit-scrollbar {
		display: none
	}

	.personal {
		background: url("../../assets/images/blue.png") no-repeat #fff;
		background-size: 100% 75%;
		text-align: right;
		padding-bottom: 0.5rem;
	}

	.news {
		display: flex;
		flex-direction: row-reverse;
		padding: 0.4rem 0;
	}

	.badgePositionRed {
		width: 5rem;
		height: 3rem;
		background: url("../../assets/images/new.png") no-repeat;
		background-size: 60% 100%;
	}

	.badgePosition {
		width: 5rem;
		height: 3rem;
		background: url("../../assets/images/news.png") no-repeat;
		background-size: 60% 100%;
	}

	.personalMessage {
		width: 90vw;
		background: #fff;
		margin: 0 5vw;
		padding: 1rem;
		padding-bottom: 0.5rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		box-shadow: 0 0.3rem 0.3rem #ddd;
	}

	.personalMessageLeft {
		padding: 0;
		text-align: center;
		width: 50%;
	}

	.wallet {
		width: 0.1rem;
		height: 1.6rem;
		background: #ddd;
		margin-top: 1.2rem;
	}

	.msgBox {
		display: flex;
	}

	.HeadPortrait img {
		width: 6rem;
		height: 6rem;
		border: 0.1rem solid #ddd;
		border-radius: 50%;
	}

	.HeadPortrait{
		width: 90%;
		margin: auto;
		position: relative;
	}

	.nickName {
		padding-top: 1rem;
		margin: 0;
	}

	.material-icons {
		font-size: 1.8rem;
	}

	.personalIcon {
		width: 3.2rem;
	}

	.personalText {
		padding-left: 0;
	}

	.mu-paper-round {
		border-radius: 0;
	}

	.mu-elevation-1 {
		box-shadow: none;
	}

	.images {
		padding: 0.8rem;
	}

	@media screen and (min-height: 560px) and (max-height: 700px) {
		.images {
			width: 8vh
		}
	}

	@media screen and (min-height: 700px) and (max-height: 850px) {
		.images {
			width: 7vh
		}
	}

	@media screen and (min-height: 850px) and (max-height: 1024px) {
		.images {
			width: 7vh
		}
	}

	@media screen and (min-height:1025px) and (max-height: 2000px) {
		.images {
			width: 5vh
		}
	}

	.msg {
		color: #ff2424;
		background: transparent;
		font-size: xx-large;
		padding: 0.5rem;
		line-height: 0;
	}

	.inviteCode {
		font-size: 1.5rem;
	}

	.mu-list {
		background: #f5f5f5;
		padding-top: 0;
	}

	.listTitle {
		text-decoration: none;
		color: #333;
	}

	.level {
		background: #09A2D6;
		color: #fff;
		font-size: 1rem;
		background: #09A2D6;
		border-radius: 1rem;
		padding: 0 0.5rem;
		margin-top: -20px;
		position: absolute;
	}

	a:hover,
	a:focus {
		color: #23527c;
		text-decoration: none;
	}

	.mu-divider {
		background-color: #f5f5f5;
	}

	.mylist {
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		padding-right: 1.2rem;
	}

	.mylist:nth-child(2) {
		padding-right: 2rem;
	}

	.mylist:nth-child(4),
	.mylist:nth-child(6) {
		margin-bottom: 0.7rem;
	}
</style>
