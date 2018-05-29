<template>
	<div id="register">
		<div id="reg">
			<img id="ret_img" src="../assets/images/back.png" onclick="window.history.go(-1)" /> 注 册
		</div>
		<div style="margin-top: 50px;padding: 10px;margin-left: 6px;" label-width="5.5em" label-margin-right="2em" label-align="left">
			<input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></input>
		</div>

		<div style="margin-top: -80px;padding: 30px;margin-left: -19px;">
			<input id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</input>
		</div>

		<div style="margin-top:-40px;padding: 30px;margin-left: -14px;">
			<input :type="types" style="font-size: 1.2rem;border-bottom: 0.1rem solid #F5F5F5;"v-model="passwordModel" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" id="btns"></input>
			<!--<span>@{{passwordValidate.errorText}}</span>-->
			<img id="group_input_img" @click="Alt()" :src="imgs"  />
		</div>

		<div style="margin-top:-40px;padding: 30px;margin-left: -14px;">
			<input :type="typeis" style="font-size: 1.2rem;border-bottom: 0.1rem solid #F5F5F5;" v-model="passwordcheckModel"  placeholder="请再次输入密码" :min="6" :max="6" is-type="sendcode"id="btn"></input>
			<!--<span>@{{passwordCheckValidate.errorText}}</span>-->
			<img id="group_input_imgs" @click="Alte()" :src="imges"  />
		</div>

		<div style="padding:30px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">下一步</x-button>
		</div>
		<!--<center>
			<div id="agree">
				<check-icon :value.sync="demo1"><span>我同意</span></check-icon>
				<a href="#"><span>《星海行动使用协议》</span></a>
			</div>
		</center>-->
	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

	sessionStorage.setItem("key","获取验证码");
	localStorage.setItem("site","js8.in");

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
//				demo1: false,
//				demo2: true,
				types:"password",
				imgs:eye,
				typeis:"password",
				imges:eye,
				//Stime:null,
				time:''
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
						that.btntxt = "获取验证码";
						that.disabled = false;
						that.delCookie(Verificationtimen);
						clearInterval(TimeReduction2);
					}
				}, 1000)
			} else {
				that.btntxt = "获取验证码";
			}
		},
		created:function(){
			if(sessionStorage.index2){
				this.time=sessionStorage.index2;
				this.setTime();
			}
		},
		Trim(str) {
				return str.replace(/(^\s+)|(s+$)/g, "");
			},
		methods: {
		    goBack(){
		        this.$router.go(-1);
		    },
			Alt(){
				if(this.types=="password"){
					this.types="text"
					this.imgs=eyeclick
				}else{
					this.types="password"
					this.imgs=eye
				}
			},
			Alte(){
				if(this.typeis=="password"){
					this.typeis="text"
					this.imges=eyeclick
				}else{
					this.typeis="password"
					this.imges=eye
				}
			},
			
			submitData() {
				sessionStorage.index2=false;
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				msg("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						this.$layer.msg("验证码不能为空",{title:'提示'});
						return;
					}
					if(this.verif != this.verification) {
						this.$layer.msg("验证码错误",{title:'提示'});
						return;
					}
					//					if(this.passwordModel != this.pwd) {
					//						msg("密码错误");
					//						return;
					//					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
						this.$layer.msg('密码少于6位',{title:'提示'});
						return;
					} else if(this.passwordcheckModel !== this.passwordModel) {
						this.$layer.msg('两次密码不匹配',{title:'提示'});
						return;
					}
//					if(this.check == this.demo1) {
//						msg("请同意");
//						return;
//					}
					else {
						this.$layer.msg("登录成功",{title:'提示'});
						this.$router.push('/Ask');
					}
				} else {
					this.$layer.msg("手机号码不能为空 或 输入有误哦~",{title:'提示'});
				}
			},
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s";
					//setTimeout(this.timer, 1000);
					sessionStorage.index2 = this.time;
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},
			setTime(){
				this.Stime = setInterval(this.timer, 1000);
			},
			//验证手机号码部分
			sendcode() {
				const that = this;
				//				if(this.short_message != this.sho_mess){
				//					return;
				//				}
				var Verificationtimen = Verificationtimen;
				that.time =  that.readCookie(Verificationtimen);
				if (that.time == "") {

					that.$layer.msg('短信已发送,本次验证码为：'+ that.verification);
					that.time = 60;

					var TimeReduction1 = setInterval(function () {
						if(that.time>0){
							that.writeCookie(Verificationtimen,that.time);
							that.time--;
							that.btntxt = that.time + "s";
							that.disabled = true;
						}else{
							that.time = 0;
							that.btntxt = "获取验证码";
							that.disabled = false;
							that.delCookie(Verificationtimen);
							clearInterval(TimeReduction1);
						}
					},1000)
				}
			},
			writeCookie(name, value, hours) {
				var expire = "";
				hours = hours || 100;
				if (hours != null) {
					expire = new Date((new Date()).getTime() + hours * 1000);
					expire = "; expires=" + expire.toGMTString();
				}
				document.cookie = name + "=" + escape(value) + expire;
			},
			readCookie(name) {
				var cookieValue = "";
				var search = name + "=";
				if (document.cookie.length > 0) {
					var offset = document.cookie.indexOf(search);
					if (offset != -1) {
						offset += search.length;
						var end = document.cookie.indexOf(";", offset);
						if (end == -1) end = document.cookie.length;
						cookieValue = unescape(document.cookie.substring(offset, end))
					}
				}
				return cookieValue;
			},
			delCookie(name){
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval= this.readCookie(name);
				if(cval!=null)
					document.cookie= name + "="+cval+";expires="+exp.toGMTString();
			}
		}
	}
</script>

<style scoped>
	
	#register{
		height: 100vh;
		background-color: white;
	}
	
	
	div#register{
		padding-top: 1rem;
	}

	span {
		font-size: 10px;
	}

	#ret_img{
		width:33px;
		position: absolute;
		margin-left: -40% ;
		margin-top: 8px;
		text-align: right;
	}

	#group_input_imgs{
    	position: absolute;
    	width: 54px;
    	margin-top: -50px;
    	margin-left: 75%;
    }

    #group_input_img{
    	position: absolute;
    	margin-top: -50px;
    	margin-left: 75%;
    	width: 54px;
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

	#phone{
		border-top: 0;
		border-left: 0;
		border-right: 0;
		padding-left: 1.2rem;
		font-size: 1.2rem;
		border-bottom: 1px solid #F5F5F5;
		width: 97%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
		padding-top: 3.5rem;
	}
	
	#verification{
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-top: 6rem;
		border-bottom:  0.1rem solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.2rem;
		outline: none;
		letter-spacing: 0.05rem;
		margin-left: 4.5px;
		padding-left: 1.175rem;
	}
	
	#verbtn {
		position: absolute;
		margin-top: -45px;
		width: 90px;
		height: 40px;
		margin-left: 69%;
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
		border-bottom: 0.1rem solid #F5F5F5;
		margin-top: 1.25rem;
	}

	#reg {
		position: fixed;
		top: 0;
		width: 100%;
		height:4.2rem;
		background-color: white;
		text-align: center;
		font-size: 1.8rem;
		line-height:  4.525rem;
		border-bottom: 0.1rem solid #C8C8CD;
		z-index: 99;
		-webkit-box-shadow: 0.01px 0.01px 0.01px #F5F5F5;
	}

	#pwsbtn {
		margin-top: -11px;
		width: 90%;
		background-color: #09A2D6;
		border-radius: 0;
	} 
	#pwsbtn:active{
		background-color: #2894FF;
	}

	#btns {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.2rem;
		border-bottom:  0.1rem solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.2rem;
		outline: none;
		letter-spacing: 0.05rem;
		padding-left: 1.2rem;
	}
	
	#btn{
		border-top: 0;
		border-left: 0;
		border-right: 0;
		font-size: 1.2rem;
		border-bottom:  0.1rem solid #F5F5F5;
		line-height: 2.5;
		width: 100%;
		font-size: 1.2rem;
		outline: none;
		letter-spacing: 0.05rem;
		padding-left: 1.2rem;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.weui-cells {
		border: 0px;
	}

	.weui-btn:after{
		border-radius: 0px;
		border: none;
	}
	
	button#pwsbtn.weui-btn.weui-btn_primary{
		width: 104%;
		margin-left: -1rem;
	}
	
</style>
