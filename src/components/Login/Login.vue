<template>

	<div id="login1" >
		<div id="login">
			<!--<div id="nav">
			<div id="LoginTitle">登 录</div>
		</div>-->
			<!--<div id="loginModeTitle">-->
			<div class="loginMode" @click="sort(1)">
				<a id="a_common">账号登录</a>
				<!--<div id="a_common_animation"></div>-->
			</div>

			<div class="loginMode" @click="sort(0)">
				<a id="a_sms">短信登录</a>
				<!--<div id="a_sms_animation"></div>-->
			</div>
			<!--</div>-->

			<div @click="goCompile" v-if="headDefault">
				<div class="HeadPortrait">
					<img :src="`${headPortrait+'?'+now}`" v-if="haveHeadImg" />
					<img :src="headPortrait" v-else/>
				</div>
				<!--<p class="userId">ID：{{phone}}</p>-->
			</div>
			<router-link v-else tag="div" to="/login">
				<div class="HeadPortrait">
					<img :src="headPortrait" />
				</div>
			</router-link>

			<!--这是我要隐藏的  -->
			<!--<div class="container personalMessage">-->
			<form v-if="isShow">
				<div class="bjt">
					<div style="padding:0 30px;">
						<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
							<!--<button v-if="btnShow" @click="bnn" type="button" class="close" data-dismiss="modal" style="position: relative;top: 25px;right: 7%;">
           			  <img src="../../assets/images/x.png" style="position:absolute;top: -20px;"/>
          			</button>-->

							<mu-text-field @input="tou" required="required" class="phone" ref="mobile" v-on:input="show()" name="mobile" v-model="mobile" placeholder="请输入手机号" :max-length="11" keyboard="number" is-type="china-mobile" />
							<button v-if="btnShow" @click="bnn" type="button" class="close" data-dismiss="modal" style="position: relative;margin-top:-52px;right: 7%;">
          			  			<img src="../../assets/images/x.png" style="position: absolute;" />
          					</button>
						</div>

						<div class="group_input" style="width: 100%;">
							<mu-text-field id="ipwd" v-on:input="ipwdshow()" v-model="inppwd" :type="types" placeholder="请输入密码" :max-length="16" :full-width="100" is-type="sendcode" />
							<img id="group_input_img" @click="Alt" :src="imgs" />
							<button v-if="btnShow1" @click="bnn1" type="button" class="close" data-dismiss="modal" style="position: relative;margin-top:-65px;right: 14%;">
          			  <img src="../../assets/images/x.png" />
          			</button>
						</div>

						<!--<div class="hyperlink" style="right: 9%; position: absolute;">
					<router-link class="a_hyperlink" tag='a' :to="'/retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;

					<router-link class="a_hyperlink" tag='a' :to="'/register'">注册账号</router-link>
				</div>-->
						<div class="hyperlink">
							<div align="center" style="padding-top:0px;">
								<x-button :disabled="!mobile || !inppwd" id="btn_login_normal" @click.native="submitData" type="primary">登 录</x-button>
							</div>
							<div align="center" class="hyperlink">
								<router-link class="a_hyperlink" tag='a' :to="'/retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;

								<router-link class="a_hyperlink" tag='a' :to="'/register'">注册账号</router-link>
							</div>
						</div>
					</div>
				</div>
			</form>

			<!--这是我要隐藏的  -->
			<form v-else>
				<div class="bjt">
					<div style="padding: 0 30px;">
						<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
							<mu-text-field required="required" class="phone" ref="mobile" v-on:input="show()" name="mobile" v-model="mobile" placeholder="请输入手机号" :max-length="11" keyboard="number" is-type="china-mobile" />
							<button v-if="btnShow" @click="bnn" type="button" class="close" data-dismiss="modal" style="position: relative;margin-top:-52px;right: 7%;">
          			  <img src="../../assets/images/x.png" style="position: absolute;" />
          			</button>
						</div>

						<div id="div_ipwd">
							<mu-text-field id="verifica" :full-width="100" v-on:input="verifshow()" v-model="verif" maxlength="4" placeholder="请输入验证码" />
							<mu-button flat color="primary" id="verbtn" slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</mu-button>
							<button v-if="btnverShow" @click="ver" type="button" class="close" data-dismiss="modal" style="position: relative;margin-top: -65px;right: 120px;">
            			<img src="../../assets/images/x.png" style="position: relative;"/>
          			</button>
						</div>

						<div align="center" style="padding-top:0px;">
							<x-button :disabled="!mobile || !verif" id="btn_login_sms" @click.native="btnveif" type="primary">登 录</x-button>
						</div>

						<!--<div class='hyperlink_da'>-->
						<!--<div class="hyperlink">
							<router-link class="a_hyperlink" tag='a' :to="'/retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;

							<router-link class="a_hyperlink" tag='a' :to="'/register'">注册账号</router-link>
						</div>-->
						<!--</div>-->
					</div>
				</div>
			</form>

		</div>
	</div>
</template>

<script>
	import { XInput, Group, XButton } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'
	import headImg from '@/assets/images/chushi.png'

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
				btnverShow: false,
				headPortrait: headImg
			}
		},

		mounted: function() {
			const that = this;
      let clickNum = 0;
      mui.back = function(){
        clickNum++;
        if(clickNum > 1) {
          plus.runtime.quit();
        } else {
          mui.toast("再按一次退出应用");
        }
        setTimeout(function() {
          clickNum = 0
        }, 2000);
        return false;

      };
			this.$nextTick(() => {

			})
			$('.weui-cells').attr('id', 'm-weui-cells');
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
					$("#a_common").css(
						'display', 'none'
					);
					$("#a_sms").css(
						'display', 'block'
					);
					$("#a_sms_animation").animate({
						opacity: 0
					}, 500);
					$("#a_common_animation").animate({
						opacity: 1
					}, 500);
				}
				if(index == 0) {
					that.isShow = false;
					$("#a_common").css(
						'display', 'block'
					);
					$("#a_sms").css(
						'display', 'none'
					);
					$("#a_sms_animation").animate({
						opacity: 1
					}, 500);
					$("#a_common_animation").animate({
						opacity: 0
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
								if(res.data.code == 0) {
									var pho = localStorage.getItem("phone2") || [];
									if(typeof pho == "string") {
										pho = pho.split(",")
										var i;
										for(i = 0; i < pho.length; i++) {
											if(pho[i] == this.mobile) {
												break;
											}
										}
										if(i == pho.length) {
											pho.push(this.mobile)
											localStorage.setItem("phone2", pho);
										}
									} else {
										pho.push(this.mobile)
										localStorage.setItem("phone2", pho);
									}
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
			},
			tou() {
				var pho = localStorage.getItem("phone2");
				var srcu = localStorage.getItem("src2");
				pho = pho.split(",")
				srcu = srcu.split(",")
				//				console.log(pho)
				var i;
				for(i = 0; i < pho.length; i++) {
					//					console.log(pho[i]+"=="+this.mobile)
					if(pho[i] == this.mobile) {
						this.headPortrait = srcu[i];
						this.haveHeadImg = false;
						break;
					}
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
	input.mu-text-field-input,
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
	#login1{
		background:rgba(255,255,255,1);
	}

	#login {
		width: 100vw;
		height: 100vh;
		background: #fff;
		overflow: hidden;
	}

	#LoginTitle {
		padding: 1rem;
	}

	#verifica {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		margin-top: 30%;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}
	div#div_ipwd {
		padding-top: 10px;
	}

	#ipwd .vux-x-input .weui-cell {
		width: 100%;
	}

	.weui-btn::after {
		border-radius: 0;
	}

	#verbtn {
		position: relative;
		margin-top: -68px;
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
		/*border-bottom: 1px solid #F5F5F5;*/
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
		/*border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		margin-top: 2rem;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;*/
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*padding-left: 1.2rem;*/
		font-size: 1.5rem;
		/*border-bottom: 1px solid #F5F5F5;*/
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}

	.group_inputs {
		width: 100%;
		padding-top: 2rem;
	}

	#group_input_img {
		position: relative;
		margin-top: -68px;
		float: right;
		font-size: 1.2rem;
		height: 30px;
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
		width: 100%;
		font-size: 1.8rem;
		background-color: #fff;
		text-align: center;
		color: #333;
		border-bottom: 1px solid #f6f6f6;
	}

	#loginModeTitle {
		width: 100%;
		height: 4.3rem;
		padding: 0;
		margin: 0;
		border-bottom: 1px solid #f6f6f6;
	}

	.loginMode {
		width: 100%;
		text-align: right;
		line-height: 4rem;
		padding-right: 1rem;
		overflow: hidden;
		float: left;
	}

	#a_common {
		text-decoration: none;
		/*border-bottom:3px solid #09A2D6;  #ccc换成链接的颜色*/
		display: inline-block;
		/*color: #09a2d6;*/
		display: none;
		font-size: 1.5rem;
		color: white;
		/*margin-bottom:-3px;  这里设置你要空的距离*/
	}

	#a_sms {
		text-decoration: none;
		display: inline-block;
		font-size: 1.5rem;
		color: white;
	}

	#a_common_animation {
		width: 50%;
		background: #09A2D6;
		height: 0.3rem;
		margin-left: 25%;
	}

	#a_sms_animation {
		width: 50%;
		background: #09A2D6;
		height: 0.3rem;
		margin-left: 25%;
		/*opacity: 0;*/
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
		background: #D9D9D9;
	}

	#btn_login_sms:disabled {
		background: #D9D9D9;
	}

	button#btn_login_normal.weui-btn.weui-btn_primary {
		width: 100%;
	}

	button#btn_login_sms.weui-btn.weui-btn_primary {
		width: 100%;
	}
	/*div.router-link-exact-active.router-link-exact-active{
		background: url(../../assets/images/bglu.png);
		background-repeat: no-repeat;
		background-attachment: fixed;
		height: 310px;
	}*/

	#login {
		background: url(../../assets/images/bglu.png);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: 100% 40%;
		/*height: 310px;*/
	}
	input#ipwd.mu-text-field-input {
		width: 100px;
	}

	.bjt {
		/*background: #fff;*/
		width: 81%;
		margin-top: 16%;
		margin: 0 9vw;
		/*border-radius: 1rem;*/
		background: url(../../assets/images/bai.png);

		background-repeat: no-repeat ;
		background-size: 100%;
		/*margin: top right bottom left;*/

	}

	.hyperlink {
		margin-top: 1rem;
		text-align: center;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.HeadPortrait img {
		width: 7rem;
		height: 7rem;
		border-radius: 50%;
		margin-top: 10%;
		margin-bottom: 30%;
	}

	.HeadPortrait {
		width: 50%;
		margin: auto;
		text-align: center;
	}

</style>
