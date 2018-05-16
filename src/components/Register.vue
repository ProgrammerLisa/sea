<template>

	<div id="register">
		<div id="nav">
			登录
		</div>
		<div id="nav_register">
			<div id="nav_common" @click="sort(1)">
				<a>普通登录</a>
			</div>

			<div id="nav_sms" @click="sort(0)">
				<a>短信登录</a>
			</div>
		</div>
		<div id="log">
			<h3 style="text-align: center; margin: 120px;margin-top: 155px; line-height: 100%;">深海行动log</h3>
		</div>

		<!--这是我要隐藏的  -->
		<div v-if="isShow">
			<group class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
			</group>

			<group class="group_input" style="padding: 40px;margin-left: -14px; ">
				<x-input id="ipwd" v-model="inppwd" type="password" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode"></x-input>
			</group>

			<div id="hyperlink">
				<router-link tag='a' :to="'/Retrieve'">找回密码</router-link> &nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link tag='a' :to="'/Login'">注册账号</router-link>
			</div>

			<div style="padding:30px;">
				<x-button @click.native="submitData" type="primary" style=" background-color:#09A2D6;color: white;">登 录</x-button>
			</div>

		</div>

		<!--这是我要隐藏的  -->
		<div v-if="isShows">
			<group class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
			</group>

			<group style="margin-top: -50px;padding: 30px;margin-left: -10px;">
				<x-input id="verification" v-model="verif" placeholder="请输入短信验证码">
					<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</x-button>
				</x-input>
			</group>

			<div style="padding:30px;">
				<x-button @click.native="btnveif" type="primary" style=" background-color:#09A2D6;color: white;">登 录</x-button>
			</div>

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
				btntxt: "获取验证码",
				verification: "654321",
				verif:"",
				short_message: '',
				isShow: true,
				isShows: false
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
			sort(index) {
				if (index == 1) {
					this.isShow = true;
					this.isShows = false;
				} else if(index == 0){
					this.isShows = true;
					this.isShow = false;
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

				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if(reg.test(this.mobile)) {
					if(this.inppwd != this.pwd) {
						alert("密码错误");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/HelloFromVux');
					}
				} else {
					alert("手机号码不能为空 或 输入有误哦~");
				}
			},
			btnveif(){
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(reg.test(this.mobile)){
					if(this.verif == ""){
						alert("验证码不能为空");
						return;
					}
					if(this.verif != this.verification) {
						alert("验证码错误");
						return;
					}else{
						alert("登录成功");
						this.$router.push('/Home');
					}
				}else{
					alert("手机号码不能为空 或 输入有误哦~");
				}
			},
			//短信信息
			SMS() {
				alert("短信已发送,本次验证码为：" + this.verification);
				//				if(this.short_message != this.sho_mess){
				//					return;
				//				}
				this.time = 60;
				this.disabled = true;
				this.timer();
				this.verification = this.randoms();
			}
		}
	}
</script>

<style>
	body {
		background-color: white;
	}
	
	#verification {
		font-size: 1rem;
		padding-top: 40px;
		width: 100%;
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
	
	#phone_img {
		/*background-image: url(../../static/images/account.png.png);	
		background-position:left ;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
		/*padding-left: 60px;*/
		font-size: 10px;
	}
	
	#ipwd {
		background-image: url(../assets/images/eye.png.png);
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		font-size: 10px;
	}
	
	.group_inputs {
		margin: -40px;
		margin-left: 25px;
		width: 79%;
		border-bottom: 1px solid #F5F5F5;
	}
	
	.group_input {
		margin: -40px;
		width: 100%;
		margin-left: 25px;
	}
	
	div.weui-cells.vux-no-group-title::before {
		border-top: 0px !important;
	}
	
	#hyperlink {
		margin-top: 10px;
		margin-left: 55%;
	}
	
	a {
		color: #353535;
	}
	
	#nav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
	}
	
	#nav_register {
		position: fixed;
		top: 0;
		width: 100%;
		height: 20px;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
		margin-top: 70px;
	}
	
	#nav_common {
		position: fixed;
		width: 100%;
		margin-top: -25px;
		margin-left: -30%;
	}
	
	#nav_sms {
		position: fixed;
		width: 100%;
		margin-left: 30%;
		margin-top: -25px;
	}
	/*清除输入框感叹号提示*/
	
	i.vux-input-icon.weui-icon.weui_icon_warn.weui-icon-warn::before {
		display: none;
	}
	/*清除输入款X提示*/
	
	i.weui-icon.weui_icon_clear.weui-icon-clear::before {
		display: none;
		list-style: none;
	}
</style>