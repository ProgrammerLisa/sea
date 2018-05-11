<template>
	<div id="register">
		<h2>注册星球</h2>
		<group label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号码" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group>
			<x-input id="verification" v-model="verif" placeholder="验证码">
				<x-button slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</x-input>
		</group>

		<group>
			<x-input v-model="inppwd" type="password" placeholder="密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
		</group>

		<div style="padding:15px;">
			<x-button @click.native="submitData" type="primary">登录</x-button>
		</div>
	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'

	export default {
		name: "login",
		components: {
			XInput,
			Group,
			XButton
		},
		data() {
			return {
				disabled: false,
				time: 0,
				mobile: '',
				btntxt: "获取验证码",
				verification: "654321",
				pwd: '123456',
				inppwd: "",
				verif:""
			}
		},
		mounted: function() {
			this.$nextTick(() => {

			})
		},
		methods: {
			
		Trim(str) {
			return str.replace(/(^\s+)|(s+$)/g, "");
		},
			submitData() {
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						alert("验证码不能为空");
						return;
					}
					if(this.verif != this.verification) {
						alert("验证码错误");
						return;
					}
					if(this.inppwd != this.pwd) {
						alert("密码错误");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/Home');
					}
				} else {
					alert("手机号码不能为空 或 输入有误哦~");
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},
			//验证手机号码部分
			sendcode() {
				alert("验证码是：" + this.verification);
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(this.phone == '') {
					alert("请输入手机号码");
				} else if(reg.test(this.phone)) {
					alert("手机格式不正确");
				} else {
					this.time = 60;
					this.disabled = true;
					this.timer();
					this.verification = this.randoms();
					//alert("验证码是："+this.verification);
				}
			}
		}
	}
</script>

<style scoped>
	.btns {
		color: #7CCD7C;
		border: 0px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.weui-cells {
		border: 0px;
	}
</style>