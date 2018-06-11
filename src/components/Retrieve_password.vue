<template>
	<div id="retrieve">
		<div>
			<div class="panel panel-default BlackTitle">
				<div class="panel-body">
					<span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span> 
					<span style="margin-left: -37px; position: absolute; left: 50%; font-size: 1.8rem;">找回密码</span>
				</div>
			</div>
			<div style="padding: 45px 30px">
				<div style="padding-top: 30px;">
					<input style="font-size: 1.5rem;" id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" maxlength="11" keyboard="number" is-type="china-mobile" required></input>
				</div>
	
				<div style="padding-top: 30px;display: inline-table; width: 100%;">
					<input style="font-size: 1.5rem;" id="verification" maxlength="4" v-model="verif" placeholder="请输入短信验证码">
					<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxte}}</x-button>
					</input>
				</div>
	
				<div style="padding-top: 30px;">
					<input id="passwordModel_image" :type="types" style="font-size: 1.5rem;" v-model="passwordModel" placeholder="请输入新密码" maxlength="16" is-type="sendcode" calss="btns"></input>
					<img id="group_input_img" @click="Alt()" :src="imgs" />
					<!--<span>@{{passwordValidate.errorText}}</span>-->
				</div>
				<div align="center" style="margin-top: 50px;">
					<x-button :disabled="!mobile || !verif || !passwordModel" id="pwsbtn" @click.native="submitData" type="primary">完 成</x-button>
				</div>
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
				verification: "6543",
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
		position: relative;
		margin-top: -55px;
		float: right;
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
		/*padding-left: 1.2rem;*/
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem; 
	}
	
	#phone,
	#verification {
		font-size: 1rem;
	}
	
	#verification {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*margin-top: 6rem;*/
		border-bottom: 0.1rem solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.5rem;
		outline: none;
		letter-spacing: 0.05rem;
	}
	
	#passwordModel_image {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*margin-top: 6rem;*/
		border-bottom: 0.1rem solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.5rem;
		outline: none;
		letter-spacing: 0.05rem;
	}
	
	#pwsbtn {
		background-color: #09A2D6;
	}
	
	#pwsbtn:disabled{
		background:	#C0C0C0 ;
	}
	
	#pwsbtn:active {
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
		position: relative;
		margin-top: -47px;
		margin-bottom: 2px;
		width: 25%;
		min-width: 90px;
		height: 40px;
		float: right;
		background-color: #F8F8F8;
		color: #646464;
		font-size: 1.2rem;
		border-radius: 0;
		border: none;
	}
	
	.weui-btn {
		border-radius: 0;
	}
	
	.weui-btn:after {
		border: none
	}
	
	#pwsbtn{
		width: 100%;
	}
	
	button#pwsbtn.weui-btn.weui-btn_primary {
		width: 100%;
	}
</style>