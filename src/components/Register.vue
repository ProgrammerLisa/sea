<template>
	<div id="register">
		<div id="reg">  
    		注册  
   		 </div>  
		<group style="margin-top: 90px;padding: 30px;margin-left: -14px;" label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="手机号码" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group style="margin-top: -60px;padding: 30px;margin-left: -14px;">
			<x-input id="verification" v-model="verif" placeholder="验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</x-input>
		</group>

		<group style="margin-top:-60px;padding: 30px;margin-left: -14px;">
			<x-input  v-model="inppwd" type="password" placeholder="密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
		</group>
		
		<group style="margin-top:-60px;padding: 30px;margin-left: -14px;">
			<x-input  v-model="inppwd" type="password" placeholder="请再次输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
		</group>

		<div style="padding:15px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">立即注册</x-button>
		</div>
		<center>
			<check-icon :value.sync="demo1"><span>我同意</span></check-icon>
			<a href="#"><span>《星海行动使用协议》</span></a>
		</center>
	</div>

</template>

<script>
	import { XInput, Group, XButton,CheckIcon } from 'vux'

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
				pwd: '123456',
				inppwd: "",
				verif:"",
				check:"",
				demo1:false,
				demo2:true
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
					if(this.inppwd != this.pwd) {
						alert("密码错误");
						return;
					}if(this.check == this.demo1){
						alert("请同意");
						return;
					} else {
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
					this.btntxt = this.time + "s后重新获取";
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
	span{
		font-size: 10px;
	}
	
	.weui-cell__ft{
		display: none;
	}
	
	a{
		color:#09a2d6 ;
	}
	
	body{
		background-color: white;
	}
	
	#reg{  
	    position:fixed;   
	    top:0;   
	    width:100%;   
	    height: 50px;   
	    background-color: white;
	    text-align: center;
	    line-height: 50px;
	    border-bottom: 1px solid #C8C8CD;
	}  
	
	#pwsbtn{
		border-radius: 20px;
		margin-top: -10px;
		background-color: #09a2d6;
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
	
	#verbtn{
		position: absolute;
		margin:-50px;
		margin-top: -21px;
		margin-left: -135px;
		width: 150px;
		border-radius: 20px;
		background-color: #09a2d6;
		color: white;
	}
	

</style>