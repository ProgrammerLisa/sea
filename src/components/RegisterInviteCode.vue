<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack"  @touchstart="evers" @touchend="lat"  class="back"><img :src="masrc"/></span> 邀请码
			</div>
		</div>
		<form>
		<div class="code">
			<center>
				<input id="ask_invite" v-model="verif" placeholder="请填写邀请码" maxlength="20" keyboard="number" is-type="china-mobile" required></input>
			</center>
			<div style="padding:40px;margin-top: 10px;">
				<x-button id="finish" @click.native="accomplish" type="primary">完 成</x-button>
			</div>

			<center>
				<div id="agree">
					<check-icon :value.sync="demo1"></check-icon><span>我同意</span>
					<a id="agree_a" href="#"><span>《夺宝行动使用协议》</span></a>
				</div>
			</center>

		</div>
		</form>
	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

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
				verif: '',
				check: '',
				demo1: false,
				demo2: true
			}
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
			accomplish() {
				event.preventDefault();
				if(this.verif == '') {
					this.$layer.msg('邀请码不能为空哦');
					return;
				} else if(this.check == this.demo1) {
					this.$layer.msg('请同意协议');
					return;
				} else {
					//注册
					this.$http({
							method: "post",
							url: "/users/register",
							headers: {
								"device": "android",
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								phone: sessionStorage['phone'],
								password: sessionStorage['password'],
								verify_code: sessionStorage['verify_code'],
								invite_code: this.verif
							}
						}).then(function(res) {
							if(res.data.code == 0) {

								this.$router.replace('/Login');
							} else {
								this.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
							console.log(err)
						}.bind(this))
				}
			}
		}
	}


</script>

<style scoped>
	.content {
		overflow: hidden;
		color: #666;
		width: 100vw;
		height: 100vh;
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
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.code {
		background: #fff;
	}

	#ask_invite {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-top: 30%;
		padding-left: 1rem;
		font-size: 1.5rem;
		border-bottom: 0.1rem solid #F5F5F5;
		width: 70%;
		outline: none;
	}

	#agree {
		margin-top: 80%;
		font-size: 1rem;
	}

	#agree_a {
		color: #09A4D7;
	}

	#finish {
		background-color: #09A2D6;
		color: white;
		border-radius: 0;
		width: 80%;
	}

	#finish:active {
		background-color: #2894FF;
	}

	button#finish.weui-btn.weui-btn_primary {
		width: 90%;
		margin-left: 1.3rem;
	}
</style>
