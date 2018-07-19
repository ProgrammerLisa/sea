<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -30px; position: absolute; left: 50%; font-size: 1.8rem;">邀请码</span>
			</div>
		</div>
		<div class="code">
			<h4 class="title">我的专属邀请码</h4>
			<div id="ask_invite" v-model="ask_invite">{{ask_invite}}</div>
			<div style="padding-top:2.5rem;">
				<p class="msg">每邀请一位好友下载并注册，你和好友都将获得同等奖励</p>
				<x-button id="finish" v-clipboard:copy="ask_invite" v-clipboard:success="onCopy" v-clipboard:error="onError" type="primary">复制邀请码</x-button>
			</div>
		</div>
    <div class="inviteCodeImg">
      <img :src="erweima"/>
      <p style="margin:1rem 0 0.5rem 0">扫码下载夺宝行动</p>
      <p style="color: #09a2d6">更多惊喜等你来探索</p>
    </div>
	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
  import erweima from '@/assets/images/erweima.png'

	export default {
		name: 'ask',
		components: {
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data() {
			return {
				masrc: back,
				ask_invite: '',
				check: '',
				demo1: false,
				demo2: true,
        erweima:erweima
			}
		},
		mounted() {
			this.$http({
					method: "post",
					url: "/users/my-invite-code",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {
					if(res.data.code == 0) {
						this.ask_invite = res.data.my_invite_code
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
				this.$layer.msg("系统异常，请稍后再试");
				}.bind(this))
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
			},
			onCopy() {

				this.$layer.msg('复制成功');

			},
			onError() {
				this.$layer.msg('复制失败');
			}

		}
	}
</script>

<style scoped>
	.content {
		overflow: hidden;
		color: #666;
    width: 100vw;
    position: fixed;
    top: 0;
		height: 100vh;
		background: #fff;
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
		margin-bottom: 0.8rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
		color: #DBDBDB;
	}

	.code {
		padding: 2rem;
		text-align: center;
	}

	.title {
		color: #444;
		margin-bottom: 2rem;
	}

	#ask_invite {
    text-align: center;
    color: #09A2D6;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*padding-left: 1.2rem;*/
		font-size: 4.5rem;
		border-bottom: 1px solid #eee;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
	}
  .msg{
    color: #777;
    font-size: smaller;
    text-align: center;
  }
	#finish{
		 background-color:#09A2D6;
		 color: white;
		 border-radius: 0;
		 width: 100%;
	}
  .inviteCodeImg{
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1rem;
  }
  .inviteCodeImg img{
    width: 40%;
  }
</style>
