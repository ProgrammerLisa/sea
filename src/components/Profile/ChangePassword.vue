<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers"  @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -30px; position: absolute; left: 50%; font-size: 1.5rem;">重置密码</span>
			</div>
		</div>
		<form class="form-horizontal">
			<div class="form-group">
				<div class="col-xs-9">
					<input type="number" class="form-control" id="phone" placeholder="请输入手机号">
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-9">
					<input type="password" class="form-control" id="oldPsw" placeholder="请填写原密码">
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-9">
					<input type="password" class="form-control" id="newPsw" placeholder="请填写新密码">
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-9">
					<input type="password" class="form-control" id="newPsw2" placeholder="请再次填写确认密码">
				</div>
			</div>
			<div class="prompt">
				<span>密码必须是6-16位的数字、字母或下划线_组成</span>
			</div>

		</form>
		<div class="changePsw">
			<button class="btn submitBtn" @click="changePsw">确 定</button>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "ChangePassword",
		data(){
			return {
				masrc: back
			}
		},
		methods: {
			evers() {
				console.log(1)
				this.masrc = backs;
			},
			lat() {
				console.log(2)
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			changePsw() {
				if(!(/^1[3|4|5|8][0-9]\d{8}$/.test($('#phone').val()))) {
					this.$layer.msg("请输入正确的手机号");
					$('#phone').focus();
				} else if($('#oldPsw').val() == "" || $('#oldPsw').val() == undefined || $('#oldPsw').val() == null) {
					this.$layer.msg("请输入原密码");
					$('#oldPsw').focus();
				} else if($('#newPsw').val() == "" || $('#newPsw').val() == undefined || $('#newPsw').val() == null) {
					this.$layer.msg("请输入新密码");
					$('#newPsw').focus();
				} else if(!(/^[0-9a-zA-Z_]\d{5,16}$/.test($('#newPsw').val()))){
          this.$layer.msg("密码格式不正确");
          $('#newPsw').focus();
        } else if($('#oldPsw').val() == $('#newPsw2').val()) {
					this.$layer.msg("密码不能重复");
					$('#newPsw2').focus();
				} else if($('#newPsw2').val() == "" || $('#newPsw2').val() == undefined || $('#newPsw2').val() == null) {
					this.$layer.msg("请输入新密码");
					$('#newPsw2').focus();
				} else if($('#newPsw').val() != $('#newPsw2').val()) {
					this.$layer.msg("两次密码不一致，请重新输入");
					$(" #newPsw").val("");
					$('#newPsw2').val("");
					$('#newPsw').focus();
				} else {
					this.$http({
							method: 'post',
							url: '/users/reset-password',
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid")
							},
							data: {
								phone: $('#phone').val(),
								old_password: $('#oldPsw').val(),
								new_password: $('#newPsw').val()
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);
								this.$router.go(-1);
							} else {
								this.$layer.msg(res.data.msg);
							}

						}.bind(this))
						.catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))
				}
			},

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
		overflow-x: hidden;
		color: #666;
		padding-bottom: 6rem;
		background-color: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
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
		font-size: 1.5rem;
    margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.form-group {
		padding: 0.8rem 1rem;
		border-bottom: 0.1rem solid #eee;
		background: #fff;
		margin-bottom: 0;
	}

	.form-control {
		outline: none;
		border: none;
		box-shadow: none;
	}

	input {
		background: #fff;
	}

	.control-label {
		font-size: 1.5rem;
		top: 5.5px;
		color: #555;
	}

	.prompt {
		font-size: smaller;
		color: #09a2d6;
		padding: 1rem;
		background: #fff;
	}

	.changePsw {
		background: #f5f5f5;
		border: none;
		text-align: center;
	}

	.submitBtn {
		background: #09a2d6;
		color: #fff;
		width: 92%;
		font-size: large;
		margin-top: 2.5rem;
		border-radius: 0;
	}

	.submitBtn:active{
		background: #009ACD;
	}

	.submitBtn:focus{
		outline: 0;
	}
</style>
