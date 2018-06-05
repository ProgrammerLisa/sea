<template>
	<div>
		<div id="retrieve">
			<div class="panel panel-default BlackTitle">
				<div class="panel-body">
					<span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span> 找回密码
				</div>
			</div>
			<div style="margin-top: 90px;padding: 20px;margin-left: -7px;">
				<input style="font-size: 1.5rem;" id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></input>
			</div>

			<div style="margin-top: -30px;padding: 20px;margin-left: -14px;">
				<input style="font-size: 1.5rem;" id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxte}}</x-button>
				</input>
			</div>

			<div style="margin-top:-50px;padding: 25px;margin-left: -14px;">
				<input id="passwordModel_image" :type="types" style="font-size: 1.5rem;" v-model="passwordModel" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></input>
				<img id="group_input_img" @click="Alt()" :src="imgs" />
				<!--<span>@{{passwordValidate.errorText}}</span>-->
			</div>

			<div style="padding:15px;">
				<x-button id="pwsbtn" @click.native="submitData" type="primary">完 成</x-button>
			</div>

		</div>
	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

	//	sessionStorage.setItem("key", "获取验证码");
	//	localStorage.setItem("site", "js8.in");

	export default {
		name: "login",
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
				btntxte: "获取验证码",
				verification: "654321",
				//				pwd: '123456',
				passwordModel: "",
				verif: "",
				check: "",
				demo1: false,
				demo2: true,
				types: "password",
				imgs: eye,
				//Stime:null,
				time: ''
			}
		},
		mounted: function() {
			const that = this;
			this.$nextTick(() => {

			})
			var Verificationtimen = Verificationtimen;
			that.time = that.readCookie(Verificationtimen);
			if(that.time != "") {
				var TimeReduction2 = setInterval(function() {
					if(that.time > 0) {
						that.writeCookie(Verificationtimen, that.time);
						that.time--;
						that.btntxte = that.time + "s";
						that.disabled = true;
					} else {
						that.time = 0;
						that.btntxte = "获取验证码";
						that.disabled = false;
						that.delCookie(Verificationtimen);
						clearInterval(TimeReduction2);
					}
				}, 1000)
			} else {
				that.btntxte = "获取验证码";
			}
		},
		//		created:function(){
		//			if(sessionStorage.index2){
		//				this.time=sessionStorage.index2;
		//				this.setTime();
		//			}
		//		},
		Trim(str) {
			return str.replace(/(^\s+)|(s+$)/g, "");
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			Alt() {
				if(this.types == "password") {
					this.types = "text"
					this.imgs = eyeclick
				} else {
					this.types = "password"
					this.imgs = eye
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxte = this.time + "s";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxte = "获取验证码";
					this.disabled = false;
				}
			},
			submitData() {
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						this.$layer.msg("验证码不能为空");
						return;
					}
					if(this.verif != this.verification) {
						this.$layer.msg("验证码错误");
						return;
					}
					//					if(this.passwordModel != this.pwd) {
					//						alert("密码错误");
					//						return;
					//					}
					if(this.passwordModel == ''){
						this.$layer.msg("密码不能为空");
						return;
					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
						this.$layer.msg('密码少于6位');
						return;
					} else {
						this.$layer.msg("登录成功");
						this.$router.push('/Main');
					}
				}else if(this.mobile == ''){
					this.$layer.msg("手机号码不能为空");
					return;
				} else {
					this.$layer.msg("手机号码格式错误");
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxte = this.time + "s";
					//setTimeout(this.timer, 1000);
					sessionStorage.index2 = this.time;
				} else {
					this.time = 0;
					this.btntxte = "获取验证码";
					this.disabled = false;
				}
			},
			setTime() {
				this.Stime = setInterval(this.timer, 1000);
			},
			//验证手机号码部分
			sendcode() {
				
				const that = this;
				var Verificationtimen = Verificationtimen;
				that.time = that.readCookie(Verificationtimen);
				if(that.time == "") {

					that.$layer.msg('短信已发送,本次验证码为：' + that.verification);
					that.time = 60;

					var TimeReduction1 = setInterval(function() {
						if(that.time > 0) {
							that.writeCookie(Verificationtimen, that.time);
							that.time--;
							that.btntxte = that.time + "s";
							that.disabled = true;
						} else {
							that.time = 0;
							that.btntxte = "获取验证码";
							that.disabled = false;
							that.delCookie(Verificationtimen);
							clearInterval(TimeReduction1);
						}
					}, 1000)
				}
			},
			writeCookie(name, value, hours) {
				var expire = "";
				hours = hours || 100;
				if(hours != null) {
					expire = new Date((new Date()).getTime() + hours * 1000);
					expire = "; expires=" + expire.toGMTString();
				}
				document.cookie = name + "=" + escape(value) + expire;
			},
			readCookie(name) {
				var cookieValue = "";
				var search = name + "=";
				if(document.cookie.length > 0) {
					var offset = document.cookie.indexOf(search);
					if(offset != -1) {
						offset += search.length;
						var end = document.cookie.indexOf(";", offset);
						if(end == -1) end = document.cookie.length;
						cookieValue = unescape(document.cookie.substring(offset, end))
					}
				}
				return cookieValue;
			},
			delCookie(name) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = this.readCookie(name);
				if(cval != null)
					document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			}
		}
	}
</script>

<style scoped>
	#retrieve {
		width: 100vw;
		background: white;
		height: 100vh;
	}
	
	span {
		font-size: 10px;
	}
	
	.BlackTitle {
		text-align: center;
		letter-spacing: 0.05rem;
		color: #555;
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
		border: 0;
	}
	
	.panel-body {
		padding: 0 10px;
	}
	
	.back {
		float: left;
	}
	
	.back img {
		height: 2.5rem;
	}
	i.weui-icon.weui_icon_clear.weui-icon-clear {
		display: none;
	}
	
	#group_input_img {
		position: absolute;
		margin-top: -55px;
		margin-left: 75%;
	}
	
	a {
		color: #09a2d6;
	}
	
	body {
		background-color: white;
	}
	
	#phone {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		padding-left: 1rem;
		font-size: 1.3rem;
		border-bottom: 1px solid #F5F5F5;
		width: 100%;
		outline: none;
		letter-spacing: 0.1rem;
		padding-bottom: 0.5rem;
	}
	
	#phone,
	#verification {
		font-size: 1rem;
	}
	
	#verification {
		margin: 10px;
		border-bottom: 1px solid #F5F5F5;
		border-top: none;
		border-left: none;
		border-right: none;
		outline: none;
		line-height: 3;
		text-indent: 1rem;
		width: 98%;
		margin-left: 4px;
		padding-left: 0.3rem;
		padding-top: 0;
		letter-spacing: 0.1rem;
	}
	
	#passwordModel_image {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		padding-left: 1.2rem;
		font-size: 1.3rem;
		border-bottom: 1px solid #F5F5F5;
		width: 100%;
		outline: none;
		letter-spacing: 0.1rem;
		padding-bottom: 0.5rem;
		padding-top: 2rem;
	}
	
	#pwsbtn {
		width: 80%;
		margin-top: -10px;
		background-color: #09A2D6;
	}
	
	#pwsbtn:active {
		background-color: #2894FF;
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
		margin-top: -20px;
		width: 100px;
		height: 40px;
		margin-left: 69%;
		border: none;
		background-color: #F5F5F5;
		color: #646464;
		color: 646464;
		margin-top: -53px;
		font-size: 1.2rem;
		border-radius: none;
	}
	
	.weui-btn {
		border-radius: 0;
	}
	
	.weui-btn:after {
		border: none
	}
	
	button#pwsbtn.weui-btn.weui-btn_primary {
		width: 99%;
		margin-left: -5px;
	}
</style>