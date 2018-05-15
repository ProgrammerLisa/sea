<template>
	
	<div id="register">
		<div id="nav">
    		登录  
   		 </div>  
		<div id="log">
			<h3 style="text-align: center; margin: 120px; line-height: 100%;">星海行动log</h3>
		</div>
		
		<group class="group_input" label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group class="group_input" style="padding: 40px;margin-left: -14px;">
			<x-input id="ipwd" v-model="inppwd" type="password" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode"></x-input>
		</group>

		<div style="padding:30px;">
			<x-button @click.native="submitData" type="primary" style="border-radius: 20px; background-color:#f5f5f5;color: black;">登录</x-button>
		</div>

		<p id="hyperlink">
			<center>
				<router-link tag='a' :to="'/Retrieve'" >找回密码</router-link> &nbsp;&nbsp;|&nbsp;&nbsp; <router-link tag='a' :to="'/Login'">注册账号</router-link>
			</center>
		</p>
		
		<div style="padding:30px;">
			<x-button v-model="short_message" @click.native="SMS" type="primary" style="border-radius: 20px; background-color:#09a2d6;color: white;">短信登录</x-button>
		</div>

	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'

	export default {
		name: "register",
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
			    sho_mess:'888888',
				short_message:''
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
						this.$router.push('/Main');
					}
				} else {
					alert("手机号码不能为空 或 输入有误哦~");
				}
			},
			//短信信息
			SMS(){
				alert("短信已发送,本次验证码为：" + this.sho_mess);
//				if(this.short_message != this.sho_mess){
//					return;
//				}
			}
		}
	}
</script>

<style>
	
	
	body{
		background-color: white;
	}
	
	
	#phone_img{
		/*background-image: url(../../static/images/account.png.png);	
		background-position:left ;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
		/*padding-left: 60px;*/
		font-size: 10px;
	}
	
	#ipwd{
		/*background-image:url(../../static/images/lock.png.png);	
		background-position:left ;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
		/*padding-left: 60px;*/
		font-size: 10px;
		
	}
	
	
	.group_input {
		margin: -40px;
		width: 90%;
		margin-left: 25px;
	}

	div.weui-cells.vux-no-group-title::before{
		border-top: 0px !important;
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
	
	/*清除输入框感叹号提示*/
	i.vux-input-icon.weui-icon.weui_icon_warn.weui-icon-warn::before{
		display: none;
	}
	/*清除输入款X提示*/
	i.weui-icon.weui_icon_clear.weui-icon-clear::before{
		display: none;
		list-style: none;
	}
	
</style>