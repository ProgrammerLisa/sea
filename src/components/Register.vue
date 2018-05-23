<template>
	<div id="register">
		<div id="reg">
			<img id="ret_img" src="../assets/images/back.png" onclick="window.history.go(-1)" /> 注 册
		</div>
		<div style="margin-top: 50px;padding: 10px;margin-left: 6px;" label-width="5.5em" label-margin-right="2em" label-align="left">
			<x-input id="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入11位有效手机号" :max="11" keyboard="number" is-type="china-mobile" required></x-input>
		</div>

		<div style="margin-top: -80px;padding: 30px;margin-left: -19px;">
			<x-input id="verification" v-model="verif" placeholder="请输入短信验证码">
				<x-button id="verbtn" slot="right" :disabled="disabled" @click.native="sendcode">{{btntxt}}</x-button>
			</x-input>
		</div>

		<div style="margin-top:-40px;padding: 30px;margin-left: -14px;">
			<x-input :type="types" style="font-size: 1.2rem;border-bottom: 0.1rem solid #F5F5F5;"v-model="passwordModel" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode" calss="btns"></x-input>
			<!--<span>@{{passwordValidate.errorText}}</span>-->
			<img id="group_input_img" @click="Alt()" :src="imgs"  />
		</div>

		<div style="margin-top:-40px;padding: 30px;margin-left: -14px;">
			<x-input :type="typeis" style="font-size: 1.2rem;border-bottom: 0.1rem solid #F5F5F5;" v-model="passwordcheckModel"  placeholder="请再次输入密码" :min="6" :max="6" is-type="sendcode"calss="btns"></x-input>
			<!--<span>@{{passwordCheckValidate.errorText}}</span>-->
			<img id="group_input_imgs" @click="Alte()" :src="imges"  />
		</div>

		<div style="padding:30px;">
			<x-button id="pwsbtn" @click.native="submitData" type="primary">下一步</x-button>
		</div>
		<!--<center>
			<div id="agree">
				<check-icon :value.sync="demo1"><span>我同意</span></check-icon>
				<a href="#"><span>《星海行动使用协议》</span></a>
			</div>
		</center>-->
	</div>

</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'

	export default {
		name: "register",
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
				passwordcheckModel: "",
				verif: "",
				check: "",
//				demo1: false,
//				demo2: true,
				types:"password",
				imgs:eye,
				typeis:"password",
				imges:eye
			}
		},
		mounted: function() {
			this.$nextTick(() => {

			})
		},
		methods: {
      goBack(){
        this.$router.go(-1);
      },
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
			Alte(){
				if(this.typeis=="password"){
					this.typeis="text"
					this.imges=eyeclick
				}else{
					this.typeis="password"
					this.imges=eye
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
					if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
						this.$layer.alert('密码少于6位',{title:'提示'});
						return;
					} else if(this.passwordcheckModel !== this.passwordModel) {
						this.$layer.alert('两次密码不匹配',{title:'提示'});
						return;
					}
//					if(this.check == this.demo1) {
//						alert("请同意");
//						return;
//					}
					else {
						this.$layer.alert("登录成功",{title:'提示'});
						this.$router.push('/Ask');
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

	#group_input_imgs{
    	position: absolute;
    	width: 54px;
    	margin-top: -55px;
    	margin-left: 75%;
    }

    #group_input_img{
    	position: absolute;
    	margin-top: -50px;
    	margin-left: 75%;
    	width: 54px;
    }

	/*#agree{
		margin-top: 65%;
		font-size: 1rem;
	}*/

	i.weui-icon.weui_icon_clear.weui-icon-clear {
		display: none;
	}

	a {
		color: #09a2d6;
	}

	body {
		background-color: white;
	}

	#phone{
		width: 97.5%;
		border-bottom: 0.1rem solid #F5F5F5;
		margin-top: 40px;
		font-size: 1.2rem;
	}
	
	#verification{
		margin-top: 4.3125rem;
		border-bottom:  0.1rem solid #F5F5F5;
		line-height: 1;
		width: 98%;
		font-size: 1.2rem;
		margin-left: 4.5px;
		padding-left: 1.175rem;
	}

	#passwordcheckModel_image {
		background-image: url(../assets/images/eyeclick.png);
		background-position: right;
		/*设置图标位置*/
		background-repeat: no-repeat;
		/*不会重复多个图标*/
		border-bottom: 0.1rem solid #F5F5F5;
		margin-top: 1.25rem;
	}

	#reg {
		position: fixed;
		top: 0;
		width: 100%;
		height:4.2rem;
		background-color: white;
		text-align: center;
		font-size: 1.8rem;
		line-height:  4.525rem;
		border-bottom: 0.1rem solid #C8C8CD;
		z-index: 99;
		-webkit-box-shadow: 0.01rem 0.01rem 0.01rem #646464;
	}

	#pwsbtn {
		margin-top: -11px;
		width: 90%;
		background-color: #09A2D6;
		border-radius: 0;
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
		width: 8rem;
		height: 3.2rem;
		background-color: #F5F5F5;
		color: #646464;
		margin-top: -1.9rem;
		font-size: 1.3rem;
		border-radius: 0;
		margin-left: -5rem;
	}
	.weui-btn:after{
		border-radius: 0px;
	}
</style>
