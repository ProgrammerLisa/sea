<template>
	<div id="retrieve">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" >
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText" style="font-size: 1.6rem">找回密码</span>
    </mu-appbar>

			<form id="form_password">
				<div style="padding: 45px 30px">
					<div style="padding-top: 30px;">
						<mu-text-field style="font-size: 1.5rem;" :full-width="100" v-on:input="show()" id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max-length="11" keyboard="number" is-type="china-mobile" required></mu-text-field>
						<button v-if="mobile!=''" @click="bnns" type="button" class="close" data-dismiss="modal">
            				<img src="../../assets/images/x.png"  />
         			 	</button>
					</div>

					<div style="padding-top: 0px;display: inline-table; width: 100%;">
						<mu-text-field style="font-size: 1.5rem;" :full-width="100" v-on:input="verifshow()" id="verification" :max-length="4" v-model="verif" placeholder="请输入短信验证码"/>
						<mu-button  id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxtes}}</mu-button >

						<button v-if="verif!=''" @click="ver" type="button" class="close" data-dismiss="modal" style="position: absolute;margin-top: 25px;right: 42%;">
            				<img src="../../assets/images/x.png"  />
         			 	</button>
					</div>

					<div style="padding-top: 0px;">
						<mu-text-field :full-width="100" id="passwordModel_image" v-on:input="ipwdshow()" :type="types" style="font-size: 1.5rem;" v-model="passwordModel" placeholder="请输入新密码" :max-length="16" is-type="sendcode" calss="btns"></mu-text-field>
						<img id="group_input_img" @click="Alt()" :src="imgs" />
						<button v-if="passwordModel!=''" @click="bnn1" type="button" class="close" data-dismiss="modal" style="position:absolute;margin-top:-63px;right: 17%;">
          			  		<img src="../../assets/images/x.png" />
          				</button>
						<!--<span>@{{passwordValidate.errorText}}</span>-->
					</div>
					<div align="center" style="margin-top: 50px;">
						<x-button :disabled="!mobile || !verif || !passwordModel" id="pwsbtn" @click.native="submitData" type="primary">完 成</x-button>
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

	//	sessionStorage.setItem("key", "获取验证码");
	//	localStorage.setItem("site", "js8.in");

	export default {
		name: "retrievepassword",
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
				mobile: '',
				btntxtes: "获取验证码",
				//				pwd: '123456',
				passwordModel: "",
				verif: "",
				check: "",
				demo1: false,
				demo2: true,
				types: "password",
				imgs: eye,
				//Stime:null,
				time: '',
			}
		},
		mounted: function() {
			const that = this;
			this.$nextTick(() => {

			})
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
				this.mobile == ''
			},
			bnns() {
				this.mobile = ''
			},
			verifshow() {
				this.verif == ''
			},
			ver() {
				this.verif = ''
			},
			ipwdshow() {
				this.inppwd == ''
			},
			bnn1() {
				this.passwordModel = ''
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
			userTrue() {
				//注册

				this.$http({
						method: "post",
						url: "/users/find-password",
						data: {
							phone: this.mobile,
							verify_code: this.verif,
							new_password: this.passwordModel

						}
					}).then(function(res) {
						if(res.data.code == 0) {
							this.$layer.msg('重设密码成功');
							this.$router.replace('/login');
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))
			},
			submitData() {
				event.preventDefault();
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						this.$layer.msg("验证码不能为空");
						return;
					}
					if(this.passwordModel == '') {
						this.$layer.msg("密码不能为空");
						return;
					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
						this.$layer.msg('密码少于6位');
						return;
					} else {
						this.userTrue();
					}
				} else if(this.mobile == '') {
					this.$layer.msg("手机号码不能为空");
					return;
				} else {
					this.$layer.msg("手机号码格式错误");
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxtes = this.time + "s";
					//setTimeout(this.timer, 1000);
					sessionStorage.index2 = this.time;
				} else {
					this.time = 0;
					this.btntxtes = "获取验证码";
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
							url: '/users/forget-password/send-sms-code',
							data: {
								phone: this.mobile
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);
								var TimeReduction1 = setInterval(function() {
									if(that.time > 0) {
										that.writeCookie(Verificationtimen, that.time);
										that.time--;
										that.btntxtes = that.time + "s";
										that.disabled = true;
									} else {
										that.time = 0;
										that.btntxtes = "获取验证码";
										that.disabled = false;
										that.delCookie(Verificationtimen);
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

	$("#form_password").submit(function() {
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
    background: #09a2d6;
    color: #fff;
		font-size: 1.8rem;
    margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
		border: 0;
	}
  .panel{
    border-radius: 0;
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
		margin-top: -65px;
		height: 30px;
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
		background-color: #38E7F8;
	}

	#pwsbtn:disabled {
		background: #D9D9D9;
	}

	#pwsbtn:active {
		background-color: #38E7F8;
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
		margin-top: -70px;
		margin-bottom: 2px;
		width: 25%;
		min-width: 100px;
		height: 42px;
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
	
	.close{
		opacity:1;
		margin-top: -64px;
		right: 8%;
		position: absolute;
	}
	
	#pwsbtn {
		width: 100%;
	}

	button#pwsbtn.weui-btn.weui-btn_primary {
		width: 100%;
	}

	#retrieve{
		/*background: url(../../assets/images/bglu.png);*/
	}
</style>
