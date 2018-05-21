<template>
	<div id="invite">
		<div id="ask">
			<div id="ask_reg">
				<img id="ask_img" src="../assets/images/back.png" onclick="window.history.go(-1)" />邀请码
			</div>		
		</div>
		<group id="group_ask">
			<x-input id="ask_invite" v-model="verif"  placeholder="请填写邀请码" :max="6" keyboard="number" is-type="china-mobile" required></x-input>
		</group>
		
		<div style="padding:40px;margin-top: 10px;">
				<x-button @click.native="accomplish" type="primary" style=" background-color:#09A2D6;color: white;border-radius: 0;">完 成</x-button>
		</div>
		
		<center>
			<div id="agree">
				<check-icon :value.sync="demo1"><span>我同意</span></check-icon>
				<a id="agree_a" href="#"><span>《星海行动使用协议》</span></a>
			</div>
		</center>
		
	</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon  } from 'vux'
	
	export default {
		name:'ask',
		components:{
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data(){
			return {
				ask_invite : '888888',
				verif : '',
				check : '',
				demo1 : false,
				demo2 : true
			}
		},
		methods:{
			accomplish(){
					if(this.verif == ''){
						alert('邀请码不能为空哦');
						return;
					}
					if(this.verif != this.ask_invite){
						alert('密码错误');
						return;
					}
					else if(this.check == this.demo1){
						alert('请同意');
						return;
					}
					else{
						alert('通过了');
						this.$router.push('/Home');
					}
				}
			}
		}
		

</script>

<style>
	html{
		background-color: white;	
	}
	
	
	
	#ask_reg{
		position: fixed;
		top: 0;
		width: 100%;
		height:50px;
		background-color: white;
		text-align: center;
		line-height: 4.525rem;
		border-bottom: 0.0625rem solid #C8C8CD;
		z-index: 99;
	}
	
	#ask_img{
		width:20px;
		position: absolute;
		margin-left: -40% ;
		margin-top: 17px;
		text-align: right;
	}
	
	#group_ask{
		margin-top: 10rem;
		width: 100%;
	}
	
	#ask_invite{
		padding-left: 50px;
		font-size: 1.5rem;
	}
	
	#agree{
		margin-top: 80%;
		font-size: 1rem;
	}
	
	#agree_a{
		color: #09A4D7;
	}
	
</style>