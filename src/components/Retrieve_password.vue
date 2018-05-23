<template>
	<div id="retrieve">
		<div id="ret">
			<img id="ret_img" src="../assets/images/back.png" onclick="window.history.go(-1)" />
		找回密码
		</div>
		<group style="margin-top: 90px;padding: 20px;margin-left: -7px;" >
			<x-input  style="font-size: 1.2rem;" id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<div style="margin-top: -30px;padding: 20px;margin-left: -14px;">
			<input style="font-size: 1.2rem;"  id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</input>
		</div>

		<group style="margin-top:-50px;padding: 25px;margin-left: -14px;">
			<x-input id="passwordModel_image" :type="types" style="font-size: 1.2rem;" v-model="passwordModel" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
			<img id="group_input_img" @click="Alt()" :src="imgs"  />			
			<!--<span>@{{passwordValidate.errorText}}</span>-->
		</group>

		<div style="padding:15px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">完 成</x-button>
		</div>
		
	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

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
				imgs:eye
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
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.verif == "") {
						this.$layer.alert("验证码不能为空",{title:'提示'});
						return;
					}
					if(this.verif != this.verification) {
						this.$layer.alert("验证码错误",{title:'提示'});
						return;
					}
					//					if(this.passwordModel != this.pwd) {
					//						alert("密码错误");
					//						return;
					//					}
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
						this.$layer.alert('密码少于6位',{title:'提示'});
						return;
					}else {
						this.$layer.alert("登录成功",{title:'提示'});
						this.$router.push('/Main');
					}
				} else {
					this.$layer.alert("手机号码不能为空 或 输入有误哦~",{title:'提示'});
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
				this.$layer.confirm("验证码是：" + this.verification,{title:'提示'});
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(this.phone == '') {
					this.$layer.alert("请输入手机号码",{title:'提示'});
				} else if(reg.test(this.phone)) {
					this.$layer.alert("手机格式不正确",{title:'提示'});
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
	
	html{
		background-color: white;
	}
	
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
	
	i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none;
	}
	
	#group_input_img{
    	position: fixed;
    	margin-top: -55px;
    	margin-left: 75%;
    }
	
	a {
		color: #09a2d6;
	}
	
	body {
		background-color: white;
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
	}
	
	/*#passwordModel_image{
		background-image: url(../../static/images/eye.png);
		background-position:right;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
	/*}*/
	
	div#phone.vux-x-input.weui-cell{
		border-top: 1px solid white;
	}
	
	div#passwordModel_image.vux-x-input.weui-cell{
		border-top: 1px solid white;
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
		-webkit-box-shadow: 0.01rem 0.01rem 0.01rem #646464;
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
		margin-left: 68%;
		border: none;
		background-color: #F5F5F5;
		color: 646464;
		margin-top: -53px;
		font-size: 1.3rem;
	}
	i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none !important;
	}
	/*清除输入款X提示*/
	i.weui-icon.weui_icon_clear.weui-icon-clear::before{
		display: none;
		list-style: none;
	}
</style>