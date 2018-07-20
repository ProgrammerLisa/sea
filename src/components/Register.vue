<template>
	<div id="register">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"> <img :src="masrc"/></span>
				<span style="margin-left: -20px; position: absolute; left: 50%; font-size: 1.8rem;">注 册</span>
			</div>
		</div>
		<form id="form_register">
			<div style="padding: 45px 30px">
				<div style="padding-top: 3.5rem;">
					<input id="phone" v-on:input="show()" ref="phone" name="phone" v-model="phone" placeholder="请输入11位有效手机号" maxlength="11" keyboard="number" is-type="china-mobile" required></input>
					<button v-if="btnShow" @click="bnns" type="button" class="close" data-dismiss="modal" style="margin-top: -30px;margin-right: 8%;">
            				<img src="../assets/images/x.png" style="position: absolute;" />
         			</button>
				</div>

				<div style="padding-top: 30px; display: inline-table; width: 100%;">
					<input id="verification" v-on:input="verifshow()" name="verification" maxlength="4" v-model="verify_code" placeholder="请输入短信验证码" />
					<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxts}}</x-button>
					<button v-if="btnVer" @click="ver" type="button" class="close" data-dismiss="modal" style="margin-top: -30px;margin-right:45%;">
            			<img src="../assets/images/x.png" style="position: absolute;" />
         			</button>
				</div>

				<div style="padding-top: 30px;">
					<input :type="types" v-on:input="pwdshow()" style="font-size: 1.5rem;border-bottom: 0.1rem solid #F5F5F5;" v-model="password" placeholder="请输入密码" maxlength="16" is-type="sendcode" id="btns"></input>
					<!--<span>@{{passwordValidate.errorText}}</span>-->
					<img id="group_input_img" @click="Alt()" :src="imgs" />
					<button v-if="pwdeShow" @click="pwde" type="button" class="close" data-dismiss="modal" style="margin-top: -30px;margin-right: 8%;">
            				<img src="../assets/images/x.png" style="position: absolute;" />
         			</button>
				</div>
				<div style="padding-top: 30px;">
					<input :type="typeis" v-on:input="pwdeshow()" style="font-size: 1.5rem;border-bottom: 0.1rem solid #F5F5F5;" v-model="passwordcheckModel" placeholder="请再次输入密码" maxlength="16" is-type="sendcode" id="btn"></input>
					<!--<span>@{{passwordCheckValidate.errorText}}</span>-->
					<img id="group_input_imgs" @click="Alte()" :src="imges" />
					<button v-if="pwdebtn" @click="pwdes" type="button" class="close" data-dismiss="modal" style="margin-top: -30px;margin-right: 8%;">
            				<img src="../assets/images/x.png" style="position: absolute;" />
         			</button>
				</div>

				<div style="padding-top:30px;">
					<x-button :disabled="!phone || !verify_code || !password || !passwordcheckModel" id="pwsbtn" @click.native="submitData" type="primary">下一步</x-button>
				</div>
			</div>

		</form>

	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	//	sessionStorage.setItem("key","获取验证码");
	//	localStorage.setItem("site","js8.in");

	sessionStorage.setItem("phone", this.phone);
	sessionStorage.setItem("password", this.password);
	sessionStorage.setItem("verify_code", this.verify_code);

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
				masrc: back,
				disabled: false,
				time: 0,
				phone: "",
				password: "",
				repeat_password: "",
				invite_code: "",
				verify_code: "",
				btntxts: "获取验证码",
				//				pwd: '123456',
				passwordcheckModel: "",
				check: "",
				//				demo1: false,
				//				demo2: true,
				types: "password",
				imgs: eye,
				typeis: "password",
				imges: eye,
				//Stime:null,
				btnShow: false,
				btnVer: false,
				pwdeShow: false,
				pwdebtn: false,
				time: '',
				form: {
					phone: "",
					invite_code: "",
					passwordcheckModel: ""
				}
			}
		},
		mounted: function() {
			const that = this;
			this.$nextTick(() => {

			})
			var Verificationtimen = Verificationtimen;
			that.time = localStorage.getItem(Verificationtimen);
			if(that.time != "") {
				var TimeReduction2 = setInterval(function() {
					if(that.time > 0) {
						localStorage.setItem(Verificationtimen, that.time);
						that.time--;
						that.btntxts = that.time + "s";
						that.disabled = true;
					} else {
						that.time = 0;
						that.btntxts = "获取验证码";
						that.disabled = false;
						localStorage.removeItem(Verificationtimen);
						clearInterval(TimeReduction2);
					}
				}, 1000)
			} else {
				that.btntxts = "获取验证码";
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
			show() {
				if(this.phone == '') {} else {
					this.btnShow = true;
				}
			},
			bnns() {
				if(this.phone == '') {

				} else {
					this.phone = ''
					this.btnShow = false;
				}
			},
			verifshow() {
				if(this.verify_code == '') {} else {
					this.btnVer = true;
				}
			},
			ver() {
				if(this.verify_code == '') {} else {
					this.verify_code = ''
					this.btnVer = false;
				}
			},
			pwdshow() {
				if(this.password == '') {

				} else {
					this.pwdeShow = true;
				}
			},
			pwde() {
				if(this.password == '') {} else {
					this.password = ''
					this.pwdeShow = false;
				}
			},
			pwdeshow() {
				if(this.passwordcheckModel == '') {

				} else {
					this.pwdebtn = true;
				}
			},
			pwdes() {
				if(this.passwordcheckModel == '') {} else {
					this.passwordcheckModel = ''
					this.pwdebtn = false;
				}
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
			Alt() {
				if(this.types == "password") {
					this.types = "text"
					this.imgs = eyeclick
				} else {
					this.types = "password"
					this.imgs = eye
				}
			},
			Alte() {
				if(this.typeis == "password") {
					this.typeis = "text"
					this.imges = eyeclick
				} else {
					this.typeis = "password"
					this.imges = eye
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxts = this.time + "s";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxts = "获取验证码";
					this.disabled = false;
				}
			},
			userTrue() {
				//注册
				this.$http({
						method: "post",
						url: "/users/register/verify-sms-code",
						headers: {
							"device": "android",
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							phone: this.phone,
							password: this.password,
							verify_code: this.verify_code

						}
					}).then(function(res) {
						if(res.data.code == 0) {
							this.$http({
									method: "post",
									url: "/users/register",
									headers: {
										"device": "android",
										"Access-Control-Allow-Origin": "*"
									},
									data: {
										phone: this.phone,
										password: this.password,
										invite_code: "10000", //邀请人ID 测试阶段 暂时不传
										verify_code: this.verify_code
									}
								}).then(function(res) {
									if(res.data.code == 0) {
										this.$layer.msg('注册成功，正在登录...');
										this.$http({
												method: 'post',
												url: '/auth/login',
												headers: {
													"device": "android"
												},
												data: {

													phone: this.phone,
													password: this.password
												}
											}).then(function(res) {
												console.log(res.data)
												if(res.data.code == 0) {
													this.$layer.msg('登录成功');
													localStorage.setItem('uid', res.data.data.uid);
													this.$router.replace('/home');
												} else {
													this.$layer.msg(res.data.msg);
												}
											}.bind(this))
											.catch(function(err) {
												console.log(err)
											}.bind(this))
									} else {
										this.$layer.msg(res.data.msg);
									}
								}.bind(this))
								.catch(function(err) {
									console.log(err)
								}.bind(this))
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						console.log(err);
						this.$layer.msg('验证码错误');
					}.bind(this))
			},

			submitData() {
				event.preventDefault();
				sessionStorage.index2 = false;
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				msg("result:" + this.$refs.mobile.valid);
				if(reg.test(this.phone)) {
					if(this.verify_code == "") {
						this.$layer.msg("验证码不能为空");
						return;
					}
					if(this.password == '') {
						this.$layer.msg("密码不能为空");
						return;
					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
						this.$layer.msg('密码少于6位');
						return;
					} else if(this.passwordcheckModel !== this.password) {
						this.$layer.msg('两次密码不匹配');
						return;
					} else {
						this.userTrue();
					}
				} else if(this.phone == '') {
					this.$layer.msg("手机号码不能为空");
					return;
				} else {
					this.$layer.msg("手机号码格式错误");
				}
				return false;
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxts = this.time + "s";
					//setTimeout(this.timer, 1000);
					sessionStorage.index2 = this.time;
				} else {
					this.time = 0;
					this.btntxts = "获取验证码";
					this.disabled = false;
				}
			},
			setTime() {
				this.Stime = setInterval(this.timer, 1000);
			},
			//验证手机号码部分
			sendcode() {
					event.preventDefault();
				const that = this;
				var Verificationtimen = Verificationtimen;
				that.time = that.readCookie(Verificationtimen);
				if(that.time == "") {
					this.$http({
							method: 'post',
							url: '/users/register/send-sms-code',
							headers: {
								"device": "android",
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								phone: this.phone
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);


								var TimeReduction1 = setInterval(function() {
									if(that.time > 0) {
										localStorage.setItem(Verificationtimen, that.time);
										that.time--;
										that.btntxts = that.time + "s";
										that.disabled = true;
									} else {
										that.time = 0;
										that.btntxts = "获取验证码";
										that.disabled = false;
										localStorage.removeItem(Verificationtimen);
										clearInterval(TimeReduction1);
									}
								}, 1000)
							} else {
								this.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
							console.log(err)
						}.bind(this))
					that.time = 60

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

	$("#form_register").submit(function() {
		return false;
	});
</script>

<style scoped>
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	}
	/*焦点时也加上，不加会出现黄色背景闪动一下*/
	
	input[type=text]:focus,
	input[type=password]:focus,
	textarea:focus {
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}
	
	#register {
		height: 100vh;
		width: 100vw;
		background-color: white;
	}
	
	span {
		font-size: 10px;
	}
	
	#group_input_imgs {
		position: relative;
		width: 54px;
		float: right;
		margin-top: -50px;
		/*margin-left: 75%;*/
	}
	
	#group_input_img {
		position: relative;
		margin-top: -50px;
		width: 54px;
		float: right;
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
		border: 0;
	}
	
	.back {
		float: left;
	}
	
	.back img {
		height: 2.5rem;
	}
	/*#agree{
		margin-top: 65%;
		font-size: 1rem;
	}*/
	
	i.weui-icon.weui_icon_clear.weui-icon-clear {
		display: none;
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
	
	#verification {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*margin-top: 6rem;*/
		border-bottom: 1px solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.5rem;
		outline: none;
		letter-spacing: 0.05rem;
		/*margin-left: 4.5px;
		padding-left: 1.175rem;*/
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
	
	#passwordcheckModel_image {
		background-image: url(../assets/images/eyeclick.png);
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		border-bottom: 1px solid #F5F5F5;
		margin-top: 1.25rem;
	}
	
	#pwsbtn {
		margin-top: -11px;
		width: 100%;
		background-color: #09A2D6;
		border-radius: 0;
	}
	
	#pwsbtn:active {
		background-color: #09A2D6;
	}
	
	#pwsbtn:disabled {
		background: #C0C0C0;
	}
	
	#btns {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.2rem;
		border-bottom: 1px solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.2rem;
		outline: none;
		letter-spacing: 0.05rem;
		/*padding-left: 1.2rem;*/
	}
	
	#btn {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.2rem;
		border-bottom: 1px solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.2rem;
		outline: none;
		letter-spacing: 0.05rem;
		/*padding-left: 1.2rem;*/
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.weui-cells {
		border: 0px;
	}
	
	.weui-btn:after {
		border-radius: 0px;
		border: none;
	}
	
	button#pwsbtn.weui-btn.weui-btn_primary {
		width: 100%;
		margin-top: 20px;
		/*margin-left: -1rem;*/
	}
</style>