<template>
	<div id="login">
		<h2>登录星球</h2>
		<group label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号码" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</group>

		<group>
			<x-input v-model="inppwd" type="password" placeholder="密码" :min="6" :max="6" is-type="sendcode"></x-input>
		</group>

		<div style="padding:15px;">
			<x-button @click.native="submitData" type="primary">登录</x-button>
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
				inppwd:""
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
				if(reg.test(this.mobile)){
					if(this.inppwd != this.pwd) {
						alert("密码错误");
						return;
					} else {
						alert("登录成功");
						this.$router.push('/Register');
					}
				}else{
					alert("手机号码不能为空 或 输入有误哦~");
				}
			}
		}
	}
</script>

<style scoped>
	
</style>