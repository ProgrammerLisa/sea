<template>
	<div id="register">
		<div id="reg">
			<img id="ret_img" src="../assets/images/back.png" onclick="window.history.go(-1)" /> 注册
		</div>
		<div style="margin-top: 80px;padding: 10px;margin-left: 6px;" label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</div>

		<div style="margin-top: -100px;padding: 30px;margin-left: -14px;">
			<input id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</input>
		</div>

		<div style="margin-top:-60px;padding: 30px;margin-left: -14px;">
			<x-input id="passwordModel_image" style="font-size: 1.3rem;border-bottom: 0.1rem solid #F5F5F5;"v-model="passwordModel" type="password" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
			<!--<span>@{{passwordValidate.errorText}}</span>-->
		</div>

		<div style="margin-top:-60px;padding: 30px;margin-left: -14px;">
			<x-input id="passwordcheckModel_image" style="font-size: 1.3rem;border-bottom: 0.1rem solid #F5F5F5;" @on-change="password" v-model="passwordcheckModel" type="password" placeholder="请再次输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
			<!--<span>@{{passwordCheckValidate.errorText}}</span>-->
		</div>

		<div style="padding:15px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">立即注册</x-button>
		</div>
		<center>
			<div id="agree">
				<check-icon :value.sync="demo1"><span>我同意</span></check-icon>
				<a href="#"><span>《星海行动使用协议》</span></a>
			</div>
		</center>
	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	export default {
		name: "register",
		components: {
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data() {
			return {
				disabled: false,
				time: 0,
				mobile: '',
				btntxt: "获取验证码",
				verification: "654321",
				//				pwd: '123456',
				passwordModel: "",
				passwordcheckModel: "",
				verif: "",
				check: "",
				demo1: false,
				demo2: true
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
					//					if(this.passwordModel != this.pwd) {
					//						alert("密码错误");
					//						return;
					//					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
						alert('密码少于6位');
						return;
					} else if(this.passwordcheckModel !== this.passwordModel) {
						alert('两次密码不匹配');
						return;
					}
					if(this.check == this.demo1) {
						alert("请同意");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/#');
					}
				} else {
					alert("手机号码不能为空 或 输入有误哦~");
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s";
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
	span {
		font-size: 10px;
	}

	#ret_img{
		width:20px;
		position: absolute;
		margin-left: -40% ;
		margin-top: 17px;
		text-align: right;
	}

	#agree{
		margin-top: 65%;
		font-size: 1rem;
	}
	
	i.weui-icon.weui_icon_clear.weui-icon-clear {
		display: none;
	}

	a {
		color: #09a2d6;
	}

	body {
		background-color: white;
	}

	#phone,
	#verification {
		font-size: 1.3rem;
	}
	#phone{
		width: 100%;
		border-bottom: 0.1rem solid #F5F5F5;
		margin-top: 40px;
	}
	input#verification{
		border-top: none;
		border-left: none;
		border-right: none;
		outline:none;
		text-indent: 15px;
		vertical-align: middle;
		line-height: 3;
		margin-top: 40px;
		width: 100%;
		border-bottom: 0.1rem solid #F5F5F5;
	}
	#verification{
		margin-top: -5px;
	}

	#passwordModel_image {
		background-image: url(../assets/images/eyeclick.png);
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		margin-top: 20px;
	}

	#passwordcheckModel_image {
		background-image: url(../assets/images/eyeclick.png);
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		border-bottom: 0.1rem solid #F5F5F5;
		margin-top: 20px;
	}

	#reg {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
		z-index: 99;
	}

	#pwsbtn {
		margin-top: -10px;
		background-color: #09A2D6;
	}

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

	#verbtn {
		position: absolute;
		width: 100px;
		height: 40px;
		margin-left: 65%;
		background-color: #F5F5F5;
		color: 646464;
		margin-top: -43px;
		font-size: 1.3rem;
	}
	.weui-btn:after{
		border-radius: 0px;
	}
</style>
