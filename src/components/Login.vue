<template>

	<div>

		<div>
			<h3>登录星球</h3>
		</div>

		<ul id="ip1">
			<li class="fl">
				<!--<group>
				<p>
					<x-input id="Phone" name="phone" type="test" placeholder="手机号" v-model="phone" style="width: 300px;" />
				</p>
				</group>-->
				<group>
					<x-input id="Phone" placeholder="手机号" v-model="phone" :max="13" is-type="china-mobile"></x-input>
				</group>
			</li>
			<li class="f2">
				<!--<p>
					<el-input id="pwd" type="password" placeholder="密码" />
				</p>-->
				<group>
					<x-input id="pwd" type="password" placeholder="密码" :min="6" :max="6" is-type="sendcode"></x-input>
				</group>
			</li>

			<p id="f4">
				<center>
					<x-button type="primary"style="width: 240px;margin-top: 30px; " @click.native="goFirst">登录</x-button>
				</center>
			</p>
			<div id="a_hover">
				<center>
					<a href="/HelloFromVux">没有账号去注册</a>
				</center>
			</div>

		</ul>
	</div>

</template>
<script>
	import { XInput, Group, XButton, Cell } from 'vux'
	export default {
		components: {
			XInput,
			XButton,
			Group,
			Cell
		},
		data:function() {
			return {
				pwd: "123456",
				
			}
		},
		mounted: function() {
	
		},
		methods: {
			back: function() {
				this.$router.back()
			},
			//验证手机号码部分
			sendcode(){
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(this.phone == '') {
					this.$alert("请输入手机号码");
				} else if(reg.test(this.phone)) {
					this.$alert("手机格式不正确");
				} else {
					this.time = 60;
					this.disabled = true;
					this.timer();
//					this.verification = this.randoms();
					//alert("验证码是："+this.verification);
				}
			},
			Trim(str) {
				return str.replace(/(^\s+)|(s+$)/g, "");
			},
			goFirst:function() {
				var pwdif = document.getElementById("pwd");
				var iphone = document.getElementById("Phone");
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(reg.test(iphone.value)) {
					if(pwdif.value != this.pwd) {
						alert("密码错误！");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/Home');
					}
				} else {
					alert("请检查手机号码是否为空 或 填写错误哦!");
				}

			}
		}
	}

	//	export default {
	//		data: function() {
	//			return {
	//				disabled: false,
	//				time: 0,
	//				//				btntxt: "获取验证码",
	//				pwd: "123456",
	//				formMess: {
	//					phone: this.phone
	//				}
	//			}
	//		},
	//		mounted: function() {
	//
	//		},
	//		methods: {
	//			back: function() {
	//				this.$router.back()
	//			},
	//			Trim(str) {
	//				return str.replace(/(^\s+)|(s+$)/g, "");
	//			},
	//			goFirst() {
	//				var pwdif = document.getElementById("pwd");
	//				var iphone = document.getElementById("Phone");
	//				var reg = /^1[3|4|5|7|8]\d{9}$/;
	//				if(reg.test(iphone.value)) {
	//					if(pwdif.value != this.pwd) {
	//						this.$alert("密码错误！");
	//						return;
	//					} else {
	//						this.$alert("登录成功");
	//						this.$router.push('/Login');
	//					}
	//				} else {
	//					this.$alert("请检查手机号码是否为空 或 填写错误哦!");
	//				}
	//
	//			}
	////		}
	////	}
</script>

<style>
	a {
		text-decoration: none;
		color: #7CCD7C;
	}
	
	#a_hover {
		margin-top: 20px;
	}
	
	li {
		list-style-type: none;
	}
	
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 300px;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	#ip1 {
		margin-top: 50px;
	}
	
	.el-input__inner {
		border: 0px;
		border-radius: 0px;
		border-bottom: 1px solid #dcdfe6;
	}
</style>