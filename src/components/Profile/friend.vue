<template>
	<div class="content">
		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
			<span class="navTitleText">我的好友</span>
		</mu-appbar>

		<div class="contentMarginTop">
			<div v-if="noFriend" class="addressNone">
				<img :src="noFriendImg" />
				<p>您还没有好友，去邀请好友吧</p>
				<mu-button class="publicButton" flat @click="goAsk">去邀请</mu-button>
			</div>
			<div class="media friends" v-for="f in friends" v-else @click="friendData(f.uid,d=f.nickname)">
				<div class="media-left">
					<img class="media-object" :src="f.avatar==''?headImg:`${f.avatar+'?'+now}`">
				</div>
				<div class="media-body">
					<h4 class="media-heading">
            {{f.nickname}}
            <span class="sex" v-bind:style="f.bcColor">{{f.gender}}</span>
          </h4> ID：{{f.uid}}
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import headImg from '@/assets/images/chushi.png'
	import noFriendImg from '@/assets/images/myfriend.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "friend",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				masrc: back,
				noFriend: true,
				noFriendImg: noFriendImg,
				headImg: headImg,
				friends: [],
				model: {
					avatar: headImg,
					nickname: '',
					uid: '',
					gender: '',
					color: '',
					bcColor: ''
				}
			}
		},
		mounted() {
			let that = this;
			mui.back = function() {
				that.$router.go(-1);
			};

			this.$nextTick(function() {
				this.friend()
			})

		},
		methods: {
			friend() {
				this.$http({
						method: "post",
						url: "/users/followers",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
					}).then(function(res) {
						if(res.data.code != 0) {
							this.$layer.msg(res.data.msg);
						} else {
							if(res.data.data.length == 0) {
								this.noFriend = true;
							} else {
								this.noFriend = false;
								for(let i = 0; i < res.data.data.length; i++) {
									if(res.data.data[i].avatar != "") {
										this.model.avatar = res.data.data[i].avatar;
									} else {
										this.model.avatar = ''
									}
									if(res.data.data[i].gender != "FEMALE") {
										this.model.color = '#5CB3FC';
										this.model.bcColor = 'background: #5CB3FC;';
										this.model.gender = '♂';
									} else {
										this.model.color = '#FC8484;';
										this.model.bcColor = 'background: #FC8484;';
										this.model.gender = '♀';
									}
									if(res.data.data[i].nickname == "") {
										this.model.nickname = res.data.data[i].uid
									} else {
										this.model.nickname = res.data.data[i].nickname
									}
									this.model.uid = res.data.data[i].uid;
									this.friends.push(this.model);
									this.model = {
										avatar: headImg,
										nickname: '',
										uid: '',
										gender: '',
										color: '',
										bcColor: ''
									}
								}

							}
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			friendData(f, d) {
				localStorage.setItem("friend_uid", f);
				localStorage.setItem('nickname', d)
				this.$router.push({
					path: '/frienddata',
					name: 'frienddata',
					params: {
						name: 'name'
					}
				})
			},
			goAsk() {
				this.$router.push({
					path: '/ask'
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #f5f5f5;
		width: 100vw;
		height: 100%;
		position: fixed;
		top: 0;
	}
	
	.content::-webkit-scrollbar {
		display: none;
	}
	
	.friends {
		background: #fff;
		margin-top: 0;
		border-bottom: 0.1rem solid #f5f5f5;
		padding: 1rem;
	}
	
	.friends:active {
		background: #f5f5f5;
	}
	
	.media-heading {
		margin-top: 0.3rem;
		margin-bottom: 5px;
		font-size: 1.5rem;
	}
	
	.media-left img {
		border: 0.1rem solid #f5f5f5;
		border-radius: 50%;
		width: 4rem;
		margin-right: 0.5rem;
	}
	
	.sex {
		color: #fff;
		border-radius: 50%;
		display: inline-block;
		width: 1.5rem;
		line-height: 1.5rem;
		font-size: smaller;
		text-align: center;
		margin: 0 1rem;
		vertical-align: top;
	}
	
	.addressNone {
		text-align: center;
		padding-top: 18vh;
		color: #999;
	}
	
	.addressNone img {
		width: 40%;
		margin-bottom: 1rem;
	}
	
	.goInvite {
		text-align: center;
		background: #09a2d6;
		color: #fff;
		padding: 0.5rem 3rem;
		display: inline-block;
		margin-top: 1.5rem;
	}
	
	.goInvite:active {
		background: #009ACD;
	}
</style>