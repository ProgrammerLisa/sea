<template>
<div>
	<div id="retrieve">
		<div id="ret">
			<img id="ret_img" src="../assets/images/back.png" onclick="window.history.go(-1)" />
		找回密码
		</div>
		<div style="margin-top: 90px;padding: 20px;margin-left: -7px;" >
			<input  style="font-size: 1.2rem;" id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></input>
		</div>

		<div style="margin-top: -30px;padding: 20px;margin-left: -14px;">
			<input style="font-size: 1.2rem;"  id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</input>
		</div>

		<div style="margin-top:-50px;padding: 25px;margin-left: -14px;">
			<input id="passwordModel_image" :type="types" style="font-size: 1.2rem;" v-model="passwordModel" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></input>
			<img id="group_input_img" @click="Alt()" :src="imgs"  />			
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

	sessionStorage.setItem("key","获取验证码");
	localStorage.setItem("site","js8.in");

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
				btntxt: "获取验证码",
				verification: "654321",
				//				pwd: '123456',
				passwordModel: "",
				verif: "",
				check: "",
				demo1: false,
				demo2: true,
				types:"password",
				imgs:eye,
				Stime:null,
				time:60
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				
			})
		},
		created:function(){
			if(sessionStorage.index2){
				this.time=sessionStorage.index2;
				this.setTime();
			}
		},
		methods: {
			Trim(str) {
				return str.replace(/(^\s+)|(s+$)/g, "");
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
			submitData() {
				sessionStorage.index2=false;
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
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
					//						alert("密码错误");
					//						return;
					//					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
						this.$layer.msg('密码少于6位',{title:'提示'});
						return;
					}else {
						this.$layer.msg("登录成功",{title:'提示'});
						this.$router.push('/Main');
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
					sessionStorage.index2=this.time;
				} else {
					this.time = 60;
					this.btntxt = "获取验证码";
					this.disabled = false;
					sessionStorage.index2=0;
					clearInterval(this.Stime)
				}
			},
			setTime(){
				this.Stime=setInterval(this.timer, 1000);
			},
			//验证手机号码部分
			sendcode() {
				this.$layer.msg("验证码是：" + this.verification,{title:'提示'});
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(this.phone == '') {
					this.$layer.msg("请输入手机号码",{title:'提示'});
				} else if(reg.test(this.phone)) {
					this.$layer.msg("手机格式不正确",{title:'提示'});
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
	
	#retrieve {
		background: white;
		height: 100vh;	
		padding-top: 1rem;
	}
	
	
	span {
		font-size: 10px;
	}
	
	#ret_img{
		width:33px;
		position: absolute;
		margin-left: -40% ;
		margin-top: 10px;
		text-align: right;
	}
	
	i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none;
	}
	
	#group_input_img{
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
	
	#phone{
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
	
	#phone,#verification{
		font-size: 1rem;
	}
	
	#verification{
		margin: 10px;
		border-bottom: 1px solid #F5F5F5;
		border-top: none;
		border-left: none;
		border-right: none;
		outline:none;
		line-height: 3;
		text-indent: 1rem;
		width: 98%;
		margin-left: 4px;
		padding-left: 0.3rem;
		padding-top: 0;
		letter-spacing: 0.1rem;
	}
	
	#passwordModel_image{
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
		
	#ret {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		font-size: 1.8rem;
		border-bottom: 1px solid #C8C8CD;
		-webkit-box-shadow: 0.01px 0.01px 0.01px #F5F5F5;
	}
	
	#pwsbtn {
		width: 80%;
		margin-top: -10px;
		background-color: #09A2D6;
	}
	#pwsbtn:active{
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
	
	.weui-btn{
		border-radius:0;
	}
	.weui-btn:after{
		border:none
	}
	
	button#pwsbtn.weui-btn.weui-btn_primary{
		width: 99%;
		margin-left:-5px;
		
	}
	
</style>