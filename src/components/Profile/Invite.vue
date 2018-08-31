<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">邀请码</span>
    </mu-appbar>
		<div class="code contentMarginTop">
			<div class="title">我的专属邀请码</div>
			<div id="ask_invite" v-model="ask_invite">{{ask_invite}}</div>
      <div class="msgText">每邀请一位好友下载并注册，你和好友都将获得同等奖励</div>
      <div>
        <mu-button full-width large color="#09a2d6" v-clipboard:copy="ask_invite" v-clipboard:success="onCopy" v-clipboard:error="onError">复制邀请码</mu-button>
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
						this.ask_invite = res.data.data.my_invite_code
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
	.code {
		padding: 2rem;
		text-align: center;
    display: flex;
    flex-direction:column
  }

	.title {
		color: #444;
    font-size: 1.6rem;
    margin-bottom: 1rem;
	}

	#ask_invite {
    text-align: center;
    color: #09A2D6;
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 4.5rem;
		border-bottom: 1px solid #eee;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
	}
  .msgText{
    color: #777;
    font-size: smaller;
    text-align: center;
    padding: 2rem 0 1rem;
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
