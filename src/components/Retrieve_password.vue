<template>
	<div id="retrieve">
		<div id="ret">
			<img id="ret_img" src="../assets/images/return.png.png" onclick="window.history.go(-1)" />
		找回密码
		</div>
		<group style="margin-top: 90px;padding: 30px;margin-left: -14px;" >
			<x-input  id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group style="margin-top: -70px;padding: 30px;margin-left: -14px;">
			<x-input   id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</x-input>
		</group>

		<group style="margin-top:-60px;padding: 30px;margin-left: -14px;">
			<x-input   id="passwordModel_image" style="font-size: 10px;" v-model="passwordModel" type="password" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
			<!--<span>@{{passwordValidate.errorText}}</span>-->
		</group>

		<div style="padding:15px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">完成</x-button>
		</div>
		
	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'

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
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
						alert('密码少于6位');
						return;
					}else {
						alert("登录成功");
						this.$router.push('/Main');
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
	
	i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none;
	}
	
	
	a {
		color: #09a2d6;
	}
	
	body {
		background-color: white;
	}
	
	#phone,#verification{
		font-size: 0.8rem;
	}
	
	
	
	/*#passwordModel_image{
		background-image: url(../../static/images/eye.png.png);
		background-position:right;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
	/*}*/
	
	
	#ret {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
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
		margin-top: -20px;
		width: 100px;
		height: 40px;
		margin-left: -85px;
		background-color: #F5F5F5;
		color: 646464;
		margin-top: -24px;
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