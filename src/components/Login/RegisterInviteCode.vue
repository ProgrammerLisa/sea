<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" >
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText" style="font-size: 1.6rem">邀请码</span>
    </mu-appbar>
		<form>
		<div class="code">
			<center>
				<input id="ask_invite" v-model="verif" placeholder="请填写邀请码" maxlength="20" keyboard="number" is-type="china-mobile" required></input>
			</center>
			<div style="padding:40px;margin-top: 10px;">
				<x-button :disabled="!verif" id="finish" @click.native="accomplish" type="primary">完 成</x-button>
			</div>

			<center>
				<div id="agree">
					<span>注册则表示您已同意</span>
					<a id="agree_a" href="#"><span>《夺宝行动使用协议》</span></a>
				</div>
			</center>

		</div>
		</form>
	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: 'registerinvitecode',
		components: {
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data() {
			return {
				masrc: back,
				verif: '',
				nickname:'',
				check: '',
        phone:'',
        password:'',
      }
		},
    mounted(){
      this.phone = this.$route.params.phone;
      this.password = this.$route.params.password;
      this.verify_code = this.$route.params.verify_code;
      this.nickname = this.$route.params.nickname;
    },
		methods: {
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			accomplish() {
            	document.getElementById('finish').disabled = true;
				event.preventDefault();
				if(this.verif == '') {
					this.$layer.msg('邀请码不能为空');
					return;
				}else {
          this.$http({
            method: "post",
            url: "/users/register",
            headers: {
              "device": "android",
              "Access-Control-Allow-Origin": "*"
            },
            data: {
              phone: this.phone,
              password: this.password,
              verify_code: this.verify_code,
              invite_code: this.verif,
              nickname: this.nickname
            }
          }).then(function(res) {
			
            if(res.data.code == 0) {
              this.$layer.msg('注册成功，正在登录...');
              this.$http({
                method: 'post',
                url: '/auth/login',
                headers: {
                  "device": "android"
                },
                data: {

                  phone: this.phone,
                  password: this.password
                }
              }).then(function(res) {
                if(res.data.code == 0) {
                  this.$layer.msg('登录成功');
                  localStorage.setItem('uid', res.data.data.uid);
                  this.$router.replace('/home');
                } else {
                  this.$layer.msg(res.data.msg);
                }
              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this))
            } else {
              this.$layer.msg(res.data.msg);
              document.getElementById('finish').disabled = false;
            }
          }.bind(this))
            .catch(function(err) {
              console.log(err)
            }.bind(this))

				}
			}
		}
	}


</script>

<style scoped>
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	}
	/*焦点时也加上，不加会出现黄色背景闪动一下*/

	input[type=text]:focus,
	input[type=password]:focus,
	textarea:focus {
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}

	.content {
		overflow: hidden;
		color: #666;
		width: 100vw;
    height: 100vh;
    background: #fff;
	}

	.panel {
		border: none;
		border-radius: 0;
	}

	.panel-body {
		padding: 0 10px;
	}

	.BlackTitle {
		text-align: center;
		letter-spacing: 0.05rem;
    background: #09a2d6;
    color: #fff;
		font-size: 1.8rem;
    margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.code {
		background: #fff;
	}

	#ask_invite {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-top: 25%;
		padding-left: 1rem;
		font-size: 1.5rem;
		border-bottom: 0.1rem solid #F5F5F5;
		width: 70%;
		outline: none;
	}

	#agree {
		position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2rem 0;
		font-size: 1rem;
	}

	#agree_a {
		color: #09A4D7;
	}

	#finish {
		background-color: #09A2D6;
		color: white;
		border-radius: 0;
		width: 80%;
	}

	#finish:active {
		background-color: #2894FF;
	}
	
	#finish {
		background-color: #38E7F8;
	}

	#finish:disabled {
		background: #D9D9D9;
	}

	#finish:active {
		background-color: #38E7F8;
	}

	button#finish.weui-btn.weui-btn_primary {
		width: 90%;
		margin-left: 1.3rem;
	}
</style>
