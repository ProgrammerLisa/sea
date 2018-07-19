<template>

	<div id="login">
		<div id="nav">
			<span @click="goBack" class="back"></span>登 录
		</div>
		<div id="nav_login">
			<div id="nav_common" @click="sort(1)">
				<a id="a_common">普通登录</a>
				<div id="a_common_animation"></div>
			</div>

			<div id="nav_sms" @click="sort(0)">
				<a id="a_sms">短信登录</a>
				<div id="a_sms_animation"></div>
			</div>
		</div>
		<!--这是我要隐藏的  -->
		<form v-if="isShow">
			<div style="padding: 45px 30px;">
				<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
					<button v-if="btnShow" @click="bnn" type="button" class="close" data-dismiss="modal" style="position: relative;top: -5px;right: 7%;">
           			  <img src="../assets/images/x.png" style="position:absolute;"/>
          			</button>
					<input required="required" class="phone" ref="mobile" v-on:input="show()" name="mobile" v-model="mobile" placeholder="请输入手机号" maxlength="11" keyboard="number" is-type="china-mobile" />

				</div>

				<div class="group_input">
					<input id="ipwd" v-model="inppwd" v-on:input="ipwdshow()" :type="types" placeholder="请输入密码" maxlength="16" is-type="sendcode" />
					<img id="group_input_img" @click="Alt" :src="imgs" />
					<button v-if="btnShow1" @click="bnn1" type="button" class="close" data-dismiss="modal" style="position: relative;top: -35px;right: 55px;">
          			  <img src="../assets/images/x.png" />
          			</button>
				</div>

				<div class="hyperlink" style="right: 9%; position: absolute;">
					<router-link class="a_hyperlink" tag='a' :to="'/retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;

					<router-link class="a_hyperlink" tag='a' :to="'/register'">注册账号</router-link>
				</div>

				<div align="center" style="padding-top:30px;">
					<x-button :disabled="!mobile || !inppwd" id="btn_login_normal" @click.native="submitData" type="primary">登 录</x-button>
				</div>
			</div>
		</form>

		<!--这是我要隐藏的  -->
		<form v-else>
			<div style="padding: 45px 30px;">
				<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
					<input class="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" maxlength="11" keyboard="number" is-type="china-mobile" required></input>
					<button v-if="btnShow" @click="bnn" type="button" class="close" data-dismiss="modal" style="position: relative;top: -35px;right: 7%;">
            			<img src="../assets/images/x.png" style="position: absolute;"/>
         			 </button>
				</div>

				<div id="div_ipwd">
					<input id="verifica" v-on:input="verifshow()" v-model="verif" maxlength="4" placeholder="请输入短信验证码" />
					<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</x-button>
					<button v-if="btnverShow" @click="ver" type="button" class="close" data-dismiss="modal" style="position: relative;top: -35px;right: 120px;">
            			<img src="../assets/images/x.png" style="position: relative;"/>
          			</button>
				</div>

				<div class="hyperlink">
					<router-link class="a_hyperlink" tag='a' :to="'/retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;

					<router-link class="a_hyperlink" tag='a' :to="'/register'">注册账号</router-link>
				</div>

				<div align="center" style="padding-top:30px;">
					<x-button :disabled="!mobile || !verif" id="btn_login_sms" @click.native="btnveif" type="primary">登 录</x-button>
				</div>
			</div>
		</form>

	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

	export default {
		name: "login",
		components: {
			XInput,
			Group,
			XButton
		},
		data() {
			return {
				mobile: '',
				pwd: '123456',
				inppwd: "",
				btntxt: "",
				verif: "",
				short_message: '',
				isShow: true,
				types: "password",
				imgs: eye,
				disabled: false,
				color1: "#09A2D6",
				color2: "#666666",
				border1: '3px solid #09A2D6',
				border2: '3px solid white',
				time: '',
				btnShow: false,
				btnShow1: false,
				btnverShow: false
			}
		},
		mounted: function() {
			const that = this;
			this.$nextTick(() => {

			})
			$('.weui-cells').attr('id', 'm-weui-cells');
			//			$("#weui-cells").before("border-top","none");
			$('#weui-cells').css({
				borderTop: "none"
			});

			var Verificationtime = Verificationtime;
			that.time = localStorage.getItem(Verificationtime);
			if(that.time != "") {
				var TimeReduction2 = setInterval(function() {
					if(that.time > 0) {
						localStorage.setItem(Verificationtime, that.time);
						that.time--;
						that.btntxt = that.time + "s";
						that.disabled = true;
					} else {
						that.time = 0;
						that.btntxt = "获取验证码";
						that.disabled = false;
						localStorage.removeItem(Verificationtime);
						clearInterval(TimeReduction2);
					}
				}, 1000)
			} else {
				that.btntxt = "获取验证码";
			}
		},
		Trim(str) {
			return str.replace(/(^\s+)|(s+$)/g, "");
		},
		methods: {
			show() {
				if(this.mobile === '') {} else {
					this.btnShow = true;
				}
			},
			ipwdshow() {
				if(this.inppwd === '') {} else {
					this.btnShow1 = true;
				}
			},
			verifshow() {
				if(this.verif == '') {} else {
					this.btnverShow = true;
				}
			},
			goBack() {
				this.$router.replace('/home');
			},
			sort(index) {
				let that = this;
				if(index == 1) {
					that.isShow = true;
					$("#a_common").css({
						color: '#09A2D6'
					});
					$("#a_sms").css({
						color: '#666'
					});
					$("#a_common_animation").animate({
						marginLeft: 0
					}, 500);
					$("#a_sms_animation").animate({
						marginLeft: '-100%'
					}, 500);
				}
				if(index == 0) {
					that.isShow = false;
					$("#a_common").css({
						color: '#666'
					});
					$("#a_sms").css({
						color: '#09A2D6'
					});
					$("#a_common_animation").animate({
						marginLeft: '100%'
					}, 500);
					$("#a_sms_animation").animate({
						marginLeft: 0
					}, 500);
				}
			},
			bnn() {
				if(this.mobile == '') {

				} else {
					this.mobile = ''
					this.btnShow = false;
				}
			},
			bnn1() {
				if(this.inppwd == '') {

				} else {
					this.inppwd = ''
					this.btnShow1 = false;
				}
			},
			ver() {
				if(this.verif == '') {

				} else {
					this.verif = ''
					this.btnverShow = false;
				}
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
					this.btntxt = this.time + "s";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},
			submitData() {
				//去获取验证手机号
				event.preventDefault();
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);

				if(reg.test(this.mobile)) {
					if(this.inppwd == '') {
						this.$layer.msg('密码不能为空');
						return;
					} else {

						//axios post 请求
						this.$http({
								method: 'post',
								url: '/auth/login',
								headers: {
									"device": "android"
								},
								data: {

									phone: this.mobile,
									password: this.inppwd
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

					}
				} else if(this.mobile == '') {
					this.$layer.msg('手机号码不能为空');
					return;
				} else {
					this.$layer.msg('手机号码格式错误');
				}
			},
			//短信信息
			SMS() {
				event.preventDefault();
				const that = this;
				var Verificationtimen = Verificationtimen;
				that.time = localStorage.getItem(Verificationtimen);
				if(that.time == "" || that.time == null || that.time == undefined) {
					this.$http({
							method: 'post',
							url: '/auth/login/send-sms-code',
							headers: {
								"device": "android",
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								by: "sms",
								phone: this.mobile
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);
								var TimeReduction1 = setInterval(function() {
									if(that.time > 0) {
										localStorage.setItem(Verificationtimen, that.time);
										that.time--;
										that.btntxt = that.time + "s";
										that.disabled = true;
									} else {
										that.time = 0;
										that.btntxt = "获取验证码";
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
					that.time = 60;
				}
			},
			btnveif() {
				event.preventDefault();
				var reg = /^1[3|4|5|7|8]\d{9}$/;

				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						this.$layer.msg('验证码不能为空');
						return;
					} else {
						this.$http({
								method: 'post',
								url: '/auth/login',
								headers: {
									"device": "android",
									"Access-Control-Allow-Origin": "*"
								},
								data: {
									by: "sms",
									phone: this.mobile,
									verify_code: this.verif
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
					}
				} else if(this.mobile == '') {
					this.$layer.msg('手机号码不能为空');
					return;
				} else {
					this.$layer.msg('手机号码格式错误');
				}
			}
		}
	}
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
	
	button.weui-btn.weui-btn_primary {
		background-color: #09A2D6;
		border-radius: 0;
	}
	
	button.weui-btn.weui-btn_primary:active {
		background-color: #09A2D6;
	}
	
	.back img {
		height: 2.5rem;
	}
	
	.back {
		float: left;
	}
	
	#login {
		width: 100vw;
		height: 100vh;
		background: #fff;
		overflow: hidden;
	}
	
	#verifica {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		margin-top: 3rem;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}
	
	#ipwd .vux-x-input .weui-cell {
		width: 80%;
	}
	
	.weui-btn::after {
		border-radius: 0;
	}
	
	#verbtn {
		position: relative;
		margin-top: -44px;
		margin-bottom: 1px;
		width: 25%;
		min-width: 100px;
		height: 40px;
		float: right;
		background-color: #F8F8F8;
		color: #646464;
		font-size: 1.2rem;
		border-radius: 0;
		border: none;
	}
	
	.phone {
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
	
	input::-ms-clear {
		display: none;
	}
	
	.phone:valid+.close {
		display: inline;
	}
	
	#ipwd {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		margin-top: 2rem;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}
	
	.group_inputs {
		width: 100%;
		padding-top: 14rem;
	}
	
	#group_input_img {
		position: relative;
		margin-top: -55px;
		float: right;
		font-size: 1.2rem;
		height: 55px;
	}
	
	.group_input {
		/*margin: -40px;*/
		/*margin: 10px;*/
		padding-top: 10px;
		width: 100%;
		/*padding: 40px;*/
		/*margin-left: -14px;*/
	}
	
	.weui-cells:before {
		border-top: 0px!important;
	}
	
	.hyperlink {
		right: 9%;
		margin-top: 2rem;
		position: absolute;
	}
	
	.a_hyperlink {
		color: #8C8C8C;
	}
	
	a {
		color: #353535;
	}
	
	a:hover {
		text-decoration: none;
	}
	
	#nav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		font-size: 1.8rem;
		background-color: white;
		text-align: center;
		color: #555;
		line-height: 50px;
		border-bottom: 1px solid #F5F5F5;
	}
	
	#nav_login {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
		margin-top: 50px;
	}
	
	#nav_common {
		position: fixed;
		width: 50%;
		background: white;
		color: #09A2D6;
		box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
		overflow: hidden;
	}
	
	#nav_common a {
		width: 100%;
		background: white;
	}
	
	#a_common {
		/*text-decoration:none;*/
		/*border-bottom:3px solid #09A2D6;  #ccc换成链接的颜色*/
		display: inline-block;
		/*margin-bottom:-3px;  这里设置你要空的距离*/
	}
	
	#a_sms {
		width: 100%;
		text-decoration: none;
		display: inline-block;
	}
	
	#nav_sms {
		position: fixed;
		width: 50%;
		margin-left: 50%;
		background: white;
		border-left: none;
		overflow: hidden;
		box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
	}
	
	#a_common_animation {
		width: 100%;
		background: #09A2D6;
		height: 0.3rem;
		margin-left: 0
	}
	
	#a_sms_animation {
		width: 100%;
		background: #09A2D6;
		height: 0.3rem;
		margin-left: -100%;
	}
	
	.weui-btn:after,
	#btn_login_normal:after,
	#btn_login_sms:after,
	#verbtn:after {
		border: none;
	}
	
	#btn_login_normal,
	#btn_login_sms {
		width: 100%;
		margin-top: 30px;
	}
	
	#btn_login_normal:disabled {
		background: #C0C0C0;
	}
	
	#btn_login_sms:disabled {
		background: #C0C0C0;
	}
	
	button#btn_login_normal.weui-btn.weui-btn_primary {
		width: 100%;
	}
	
	button#btn_login_sms.weui-btn.weui-btn_primary {
		width: 100%;
	}
</style>