<template>

	<div id="login">
		<div id="nav">
			登录
		</div>
		<div id="nav_login">
			<div id="nav_common" @click="sort(1)">
				<a>普通登录</a>
			</div>

			<div id="nav_sms" @click="sort(0)">
				<a>短信登录</a>
			</div>
		</div>
		<div id="log">
			<h3>深海行动log</h3>
		</div>

		<!--这是我要隐藏的  -->
		<div class="tow_show" v-if="isShow">
			<group class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
			</group>

			<group class="group_input" >
				<x-input id="ipwd" v-model="inppwd" :type="types" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode"></x-input>
				<img id="group_input_img" @click="Alt()" :src="imgs"  />
			</group>

			<div id="hyperlink">
				<router-link tag='a' :to="'/Retrieve'">找回密码</router-link> &nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link tag='a' :to="'/Register'">注册账号</router-link>
			</div>

			<div style="padding:30px;">
				<x-button @click.native="submitData" type="primary" style=" background-color:#09A2D6;color: white;border-radius: 0;">登 录</x-button>
			</div>

		</div>

		<!--这是我要隐藏的  -->
		<div class="tow_show" v-if="isShows">
			<group class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
			</group>

			<div id="ipwd" >
				<input id="verification" v-model="verif" placeholder="请输入短信验证码">
					<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</x-button>
				</input>
			</div>

			<div style="padding:30px;">
				<x-button @click.native="btnveif" type="primary" style=" background-color:#09A2D6;color: white;border-radius: 0;">登 录</x-button>
			</div>

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
				inppwd: "",
				btntxt: "获取验证码",
				verification: "654321",
				verif:"",
				short_message: '',
				isShow: true,
				isShows: false,
				types:"password",
				imgs:"../src/assets/images/eyeclick.png"
			}
		},
		mounted: function() {
			this.$nextTick(() => {

			})
		}
		,
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
			Alt(){
				if(this.types=="password"){
					this.types="text"
					this.imgs="../src/assets/images/eye.png"
				}else{
					this.types="password"
					this.imgs="../src/assets/images/eyeclick.png"
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
						this.$router.push('/GetForce');
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
						this.$router.push('/GetForce');
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
	
	html{
		background-color: white;
	}
	
	body {
		background-color: white;
		width: auto;
	}

	h3{
		text-align: center; 
		margin: 120px;
		margin-top: 155px; 
		line-height: 100%;
	}
	.tow_show{
		margin: 20px;
	}

	#verification {
		padding-top: 40px;
		margin: 10px;
		width: 100%;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 0px solid #F5F5F5;
		outline:none;
		text-indent: 4px;
		vertical-align: middle;
		line-height: 1;
	}

i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none;
	}
	#verbtn {
		position: absolute;
		margin-top: -45px;
		width: 90px;
		height: 40px;
		margin-left: 65%;
		background-color: #F5F5F5;
		color: 646464;
		font-size: 1rem;
		border-radius: 0;
	}

	#phone_img {
		/*background-image: url(../../static/images/account.png);
		background-position:left ;/*设置图标位置*/
		/*background-repeat:no-repeat ;/*不会重复多个图标*/
		/*padding-left: 60px;*/
		font-size: 1.5rem;
	}

	#ipwd {
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		font-size: 1.5rem;
		border-bottom: 0.1rem solid #F5F5F5;
	}

	.group_inputs {
		/*margin: 20px 10px;*/
		/*margin-left: 25px;*/
		width: 100%;
		/*border-bottom: 1px solid #F5F5F5;*/
	}
    #group_input_img{
    	position: fixed;
    	margin-top: -55px;
    	margin-left: 70%;
    }
	.group_input {
		/*margin: -40px;*/
		/*margin: 10px;*/
		width: 100%;
		/*padding: 40px;*/
		/*margin-left: -14px;*/
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
	
	a:hover{
		text-decoration: none;
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

	#nav_login {
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
