<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack"  @touchstart="evers"  @touchend="lat" class="back"><img :src="masrc"/></span>
				我的好友
				<router-link to="/addfriends" tag="span" class="addTo"> <img src="../assets/images/award.png" /></router-link>
			</div>
		</div>
		<div v-if="noFriend" class="addressNone">
			<img :src="noFriendImg" />
			<p>您还没有好友，去添加好友吧</p>
		</div>
		<div class="media friends" v-for="f in friends" v-else>
			<div class="media-left">
				<img class="media-object" :src="f.headPortrait" alt="...">
			</div>
			<div class="media-body">
				<h4 class="media-heading">{{f.friendName}}<span class="sex" v-bind:style="f.bcColor">{{f.sex}}</span></h4> ID：{{f.friendId}}
			</div>
		</div>
	</div>
</template>

<script>
	import headImg from '@/assets/images/friend.png'
	import noFriendImg from '@/assets/images/myfriend.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "friend",
		data() {
			return {
				masrc: back,
				noFriend: true,
				noFriendImg: noFriendImg,
				friends: [{
						headPortrait: headImg,
						friendName: '小红花',
						friendId: '123456789',
						sex: '♀',
						bcColor: 'background: #FC8484;'
					},
					{
						headPortrait: headImg,
						friendName: '小红花',
						friendId: '123456789',
						sex: '♂',
						bcColor: 'background: #5CB3FC;'
					}
				]
			}
		},
		mounted() {
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
					if(res.data.code != 0) {
						this.$layer.msg(res.data.msg);
					}else {
					  console.log(res.data.data)
          }
				}.bind(this))
				.catch(function(err) {
          this.$layer.msg("系统异常，请稍后再试");
				}.bind(this))
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
			},

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
		color: #555;
		font-size: 1.6rem;
		margin-bottom: 1rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
		font-size: 1.8rem;
		color: #C7C7C7;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.addTo {
		float: right;
	}

	.addTo img {
		height: 2.5rem;
	}

	.friends {
		background: #fff;
		margin-top: 0;
		border-bottom: 0.1rem solid #f5f5f5;
		padding: 1rem;
	}

	.media-heading {
		margin-top: 0.3rem;
		margin-bottom: 5px;
		font-size: 1.6rem;
	}

	.media-left img {
		border: 0.1rem solid #09a2d6;
		border-radius: 50%;
		width: 4rem;
		margin-right: 0.5rem;
	}

	.sex {
		color: #fff;
		border-radius: 50%;
		display: inline-block;
		width: 1.3rem;
		height: 1.3rem;
		font-size: xx-small;
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
</style>
