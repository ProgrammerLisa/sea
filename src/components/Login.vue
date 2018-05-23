<template>

	<div id="login">
		<div id="nav">
			登 录
		</div>
		<div id="nav_login">
			<div id="nav_common" @click="sort(1)">
				<a :style="{color:color1}">普通登录</a>
			</div>

			<div id="nav_sms" @click="sort(0)">
				<a :style="{color:color2}">短信登录</a>
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
				<router-link class="a_hyperlink" tag='a' :to="'/Retrieve'">找回密码</router-link> &nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link class="a_hyperlink" tag='a' :to="'/Register'">注册账号</router-link>
			</div>

			<div style="padding:30px;">
				<x-button id="btn_login_normal" @click.native="submitData" type="primary">登 录</x-button>
			</div>

		</div>

		<!--这是我要隐藏的  -->
		<div class="tow_show" v-if="isShows">
			<group class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<x-input id="phone_img" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
			</group>

			<div id="ipwd" >
				<input id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn"  slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</x-button>
				</input>
			</div>

			<div style="padding:30px;">
				<x-button id="btn_login_sms" @click.native="btnveif" type="primary" >登 录</x-button>
			</div>

		</div>

	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

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
				imgs:eye,
				color1:"#09A2D6",
				color2:"#666666"
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
					this.color1="#09A2D6";
					this.color2="#666666";
				} else if (index == 0) {
					this.isShows = true;
					this.isShow = false;
					this.color1="#666666";
					this.color2="#09A2D6";
				}
			},
			Alt(){
				if (this.types == "password") {
					this.types = "text"
					this.imgs = eyeclick
				} else {
					this.types = "password"
					this.imgs = eye
				}
			},
			timer() {
				if (this.time > 0) {
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
				if (reg.test(this.mobile)) {
					if (this.inppwd != this.pwd) {
						this.$layer.alert("密码错误",{title:'提示'});
						return;
					} else {
						this.$layer.alert("登录成功",{title:'提示'});
						this.$router.push('/GetForce');
					}
				} else {
					this.$layer.alert("手机号码不能为空 或 输入有误哦~",{title:'提示'});
				}
			},
			btnveif(){
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if (reg.test(this.mobile)) {
					if (this.verif == "") {
						this.$layer.alert("验证码不能为空",{title:'提示'});
						return;
					}
					if (this.verif != this.verification) {
						this.$layer.alert("验证码错误",{title:'提示'});
						return;
					} else {
						this.$layer.alert("登录成功",{title:'提示'});
						this.$router.push('/Home');
					}
				} else {
				this.$layer.alert("手机号码不能为空 或 输入有误哦~",{title:'提示'});
				}
			},
			//短信信息
			SMS() {
				this.$layer.confirm("短信已发送,本次验证码为：" + this.verification,{title:'提示',icon:1});
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

	

	button.weui-btn.weui-btn_primary{
		background-color:#09A2D6;
		border-radius: 0;
	}

	button.weui-btn.weui-btn_primary:active{
		background-color:#2894FF;
	}

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

	input#vux-x-input-qnmu3.weui-input{
		color: #646464;
	}

	i.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none;
	}

	div#ipwd.vux-x-input.weui-cell{
		width: 80%;
	}

	.weui-btn::after{
		border-radius: 0;
	}
	#verbtn {
		position: absolute;
		margin-top: -45px;
		width: 90px;
		height: 40px;
		margin-left: 65%;
		background-color: #F8F8F8;
		color: #646464;
		font-size: 1rem;
		border-radius: 0;
	}

	#phone_img {
		font-size: 1.2rem;
		color: #646464;
	}

	#ipwd {
		background-position: right;
		background-repeat: no-repeat;
		font-size: 1.2rem;
		color: #646464;
		border-bottom: 0.1rem solid #F5F5F5;
	}

	.group_inputs {
		width: 100%;
		/*border-bottom: 1px solid #F5F5F5;*/
	}
	#group_input_img{
		position: fixed;
		width: 54px;
		margin-top: -55px;
		margin-left: 75%;
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
	.a_hyperlink{
		color: #8C8C8C;
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
		font-size: 1.8rem;
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


	#nav_common_a{
		color:#09A2D6 ;
	}



	/*a:hover{
		color: #09A2D6;
	}

	a:active{
		color: #000000;
	}*/

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
	
	.weui-btn:after, #btn_login_normal:after, #btn_login_sms:after, #verbtn:after {
		border: none;
		border-radius: 0;
	}
</style>
