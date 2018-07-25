<template>
	<div class="content">
    <div id="navTopMargin"></div>
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack"  @touchstart="evers" @touchend="lat"  class="back"><img :src="masrc"/></span> 邀请码
			</div>
		</div>
		<form>
		<div class="code">
			<center>
				<input id="ask_invite" v-model="verif" placeholder="请填写邀请码" maxlength="20" keyboard="number" is-type="china-mobile" required></input>
			</center>
			<div style="padding:40px;margin-top: 10px;">
				<x-button id="finish" @click.native="accomplish" type="primary">完 成</x-button>
			</div>

			<center>
				<div id="agree">
					<check-icon :value.sync="demo1"></check-icon><span>我同意</span>
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
		name: 'RegisterInviteCode',
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
				check: '',
				demo1: false,
				demo2: true,
        phone:'',
        password:'',
      }
		},
    mounted(){
      this.phone = this.$route.params.phone;
      this.password = this.$route.params.password;
      this.verify_code = this.$route.params.verify_code;
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
				event.preventDefault();
				if(this.verif == '') {
					this.$layer.msg('邀请码不能为空哦');
					return;
				} else if(this.check == this.demo1) {
					this.$layer.msg('请同意协议');
					return;
				} else {
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
              invite_code: this.verif
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
	.content {
		overflow: hidden;
		color: #666;
		width: 100vw;
		height: 100vh;
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
		margin-top: 30%;
		padding-left: 1rem;
		font-size: 1.5rem;
		border-bottom: 0.1rem solid #F5F5F5;
		width: 70%;
		outline: none;
	}

	#agree {
		margin-top: 80%;
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

	button#finish.weui-btn.weui-btn_primary {
		width: 90%;
		margin-left: 1.3rem;
	}
</style>
