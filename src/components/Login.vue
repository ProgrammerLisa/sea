<template>
	
	<div id="login">
		<div id="nav">  
    		登录  
   		 </div>  
		<div id="log">
			<h3 style="text-align: center; margin: 120px; line-height: 100%;">星海行动log</h3>
		</div>
		<group class="group_input" label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="手机号码" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group class="group_input" style="padding: 40px;margin-left: -14px;">
			<x-input v-model="inppwd" type="password" placeholder="密码" :min="6" :max="6" is-type="sendcode"></x-input>
		</group>

		<div style="padding:30px;">
			<x-button @click.native="submitData" type="primary" style="border-radius: 20px; background-color:#f5f5f5;color: black;">登录</x-button>
		</div>

		<p id="hyperlink">
			<center>
				<a href="/Retrieve_password">找回密码</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="#">注册账号</a>
			</center>
		</p>
		
		<div style="padding:30px;">
			<x-button @click.native="submitData" type="primary" style="border-radius: 20px; background-color:#09a2d6;color: white;">短信登录</x-button>
		</div>

	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'

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
				inppwd: ""
			}
		},
		mounted: function() {
			this.$nextTick(() => {

			})
		},
		Trim(str) {
			return str.replace(/(^\s+)|(s+$)/g, "");
		},
		methods: {
			submitData() {
				//去获取验证手机号
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.inppwd != this.pwd) {
						alert("密码错误");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/Register');
					}
				} else {
					alert("手机号码不能为空 或 输入有误哦~");
				}
			}
		}
	}
</script>

<style>
	body{
		background-color: white;
	}
	.group_input {
		margin: -40px;
		width: 90%;
		margin-left: 25px;
		
	}
	
	#hyperlink{
		margin-top: -15px;
	}
	a{
		color: #353535;
	}
	
	#nav{  
	    position:fixed;   
	    top:0;   
	    width:100%;   
	    height: 50px;   
	    background-color: white;
	    text-align: center;
	    line-height: 50px;
	    border-bottom: 1px solid #C8C8CD;
	}  
	
	
</style>