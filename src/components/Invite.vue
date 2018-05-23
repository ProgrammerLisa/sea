<template>
	<div id="invite">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span> 邀请码
			</div>
		</div>
		<center>
			<input id="ask_invite" v-model="verif" placeholder="请填写邀请码" :max="6" keyboard="number" is-type="china-mobile" required></input>
		</center>
		<div style="padding:40px;margin-top: 10px;">
			<x-button @click.native="accomplish" type="primary" style=" background-color:#09A2D6;color: white;border-radius: 0;width: 80%;">完 成</x-button>
		</div>

		<center>
			<div id="agree">
				<check-icon :value.sync="demo1"></check-icon><span>我同意</span>
				<a id="agree_a" href="#"><span>《星海行动使用协议》</span></a>
			</div>
		</center>

	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'

	export default {
		name: 'ask',
		components: {
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data() {
			return {
				ask_invite: '888888',
				verif: '',
				check: '',
				demo1: false,
				demo2: true
			}
		},
		methods: {
			goBack(){
            this.$router.go(-1);
         },
			accomplish() {
				if(this.verif == '') {
					alert('邀请码不能为空哦');
					return;
				}
				if(this.verif != this.ask_invite) {
					alert('邀请码错误');
					return;
				} else if(this.check == this.demo1) {
					alert('请同意');
					return;
				} else {
					alert('通过了');
					this.$router.push('/Personal');
				}
			}
		}
	}
</script>

<style scoped>
	html {
		background-color: white;
	}

	div.weui-cells.vux-no-group-title::before {
		border-top: 0px !important;
	}

	.panel-body {
		padding: 0 1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}
	.BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }

	#group_ask {
		margin-top: 10rem;
		width: 100%;
	}

	#ask_invite {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		margin-top: 30%;
		padding-left: 1rem;
		font-size: 1.3rem;
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
</style>
