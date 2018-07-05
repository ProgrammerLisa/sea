<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" class="back"><span>ㄑ</span></span>
				<span style="margin-left: -32px; position: absolute; left: 50%; font-size: 1.6rem;">实名信息</span>
			</div>
		</div>
		<div v-if="succeed " class="addressNone">
			<img :src="succeedImg" />
			<p>已认证成功</p>
		</div>
		<div v-if="inputbox">
			<form class="form-horizontal">
				<div class="form-group">
					<label for="number" class="col-xs-3 control-label">身份证号</label>
					<div class="col-xs-9">
						<input type="number" class="form-control" id="number" placeholder="请输入本人身份证号">
					</div>
				</div>
				<div class="form-group">
					<label for="name" class="col-xs-3 control-label">真实姓名</label>
					<div class="col-xs-9">
						<input type="text" class="form-control" id="name" placeholder="请输入真实姓名">
					</div>
				</div>

				<div class="prompt">
					<span>请填写正确信息以确保交易无误</span>
				</div>

			</form>
			<div class="changePsw">
				<button class="btn submitBtn" @click="submit">确 定</button>
			</div>
		</div>
		<table v-else class="table">
			<tr v-for="r in realName">
				<td class="text-left">{{r.title}}</td>
				<td class="text-right">{{r.content}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import succeedImg from '@/assets/images/renzheng.png'
	export default {
		name: "RealName",
		data() {
			return {
				inputbox: false,
				succeed: true,
				succeedImg: succeedImg,
				realName: [{
						title: '姓名',
						content: '**默'
					},
					{
						title: '身份证号',
						content: '3413*************5676'
					},
					{
						title: '手机号',
						content: ''
					}
				]
			}
		},
		mounted() {
			this.$http({
					method: "get",
					url: "/users/profile",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {
					if(res.data.code == 0) {
						console.log(res.data.data);
						if(!res.data.data.is_idverification) {
							this.inputbox = true,
								this.succeed = false
						} else {
							this.realName[0].content = res.data.data.real_name
							this.realName[1].content = res.data.data.card_num
							this.realName[2].content = res.data.data.phone
						}
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					console.log(err)
				}.bind(this));

		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			submit() {
				let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				let regName = /^[\u4e00-\u9fa5]{2,4}$/;
				if(!regIdNo.test($("#number").val())) {
					this.$layer.msg("身份证号填写有误");
					return false;
				} else if(!regName.test($("#name").val())) {
					this.$layer.msg("真实姓名填写有误");
					return false;
				} else {
					this.$http({
							method: "post",
							url: "/users/identity-verification",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								card_num: $("#number").val(),
								real_name: $("#name").val()
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);
								this.inputbox = false;
								this.$router.go(-1);
							} else {
								this.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
							console.log(err)
						}.bind(this));

				}
			},

		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		padding-bottom: 6rem;
		background-color: #f5f5f5;
		width: 100vw;
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
		color: #555;
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
		border-bottom: 1px solid #f5f5f5;
	}

	.back {
		float: left;
	}

	.back span {
		height: 2.5rem;
		font-size: 2.5rem;
		color: #DBDBDB;
	}

	.back span:active {
		color: black;
	}

	.table {
		background: #fff;
	}

	.table tr {
		border-bottom: 0.1rem solid #f5f5f5;
	}

	.table td {
		padding: 1.5rem 1rem;
	}

	.text-left {
		color: #555;
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
		font-size: 1.6rem;
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

	.submitBtn:active {
		background: #009ACD;
	}

	.addressNone {
		text-align: center;
		padding: 5vh;
		color: #999;
		background-color: #FFFFFF;
	}

	.addressNone img {
		width: 40%;
		margin-bottom: 1rem;
	}
</style>
