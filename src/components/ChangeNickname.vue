<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back">  <img :src="masrc"/></span>
				<span style="margin-left: -36px; position: absolute; left: 50%; font-size: 1.8rem;">修改昵称</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="nickYes" @click="submit">确 定</button>
			</div>
		</div>

		<div class="modal-body nickChange">
			<input class="form-control nickInput" id="form_control" type="text" :placeholder="nickname" maxlength="11" />
			<p class="nickText">4-10个字符、仅支持中文、数字、英文</p>
		</div>
		<!-- 修改昵称模态框（Modal） -->
		<!--<div class="modal fade" id="NickModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="myModalLabel">修改昵称</h4>
					</div>
					<div class="modal-body nickChange">
						<input class="form-control nickInput" id="form_control" type="text" :placeholder="nickname" />
						<p class="nickText">4-10个字符、仅支持中文、数字、英文</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default nickNo" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary nickYes" @click="submit">确定</button>
					</div>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "Compile",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				masrc: back,
				nickname: '',
			}
		},
		inject: ['reload'],
		mounted: function() {
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
//					if(res.data.code == 0) {
						this.IDcode = res.data.data.phone;
						if(res.data.data.nickname == "") {
							this.nickname = localStorage.getItem("uid");
						} else {
							this.nickname = res.data.data.nickname;
						}
//						if(res.data.data.avatar == "") {
//							this.headImg = headImg;
//							this.haveHeadImg = false
//						} else {
//							this.headImg = res.data.data.avatar;
//							this.haveHeadImg = true
//						}
//					} else {
//						this.haveHeadImg = false
//						this.$layer.msg(res.data.msg);
//					}
				}.bind(this))
				.catch(function(err) {
					this.haveHeadImg = false
					console.log(err)
				}.bind(this))

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
			submit() {
//				$("#NickModal").show();
				if($("#form_control").val() == '' || $("#form_control").val() == null || $("#form_control").val() == undefined) {
					$(".modal-backdrop").hide();
//					$("#NickModal").hide();
					this.$layer.msg('请确认你的昵称');
				} else if($("#form_control").val().length < 4) {
					$(".modal-backdrop").hide();
//					$("#NickModal").hide();
					this.$layer.msg('昵称不符合要求');
				} else if($("#form_control").val().length > 10) {
					$(".modal-backdrop").hide();
//					$("#NickModal").hide();
					this.$layer.msg('昵称不符合要求');
				} else {
					this.isDisabled = true;
					this.$http({
							method: "post",
							url: "/users/profile/edit",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								nickname: $("#form_control").val()
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								$(".modal-backdrop").hide();
//								$("#NickModal").hide();
								this.$layer.msg(res.data.msg);
								this.nickname = res.data.data.nickname;
								$("#form_control").val("")
								this.$router.replace('/Compile');
							} else {
								this.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
							this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))
				}

			}

		}
	}
</script>

<style scoped>
	.modal-body {
		padding: 0px;
	}
	
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #f5f5f5;
		width: 100vw;
	}
	
	.panel {
		border: none;
		border-radius: 0;
	}
	
	.panel-body {
		padding: 0 1rem;
	}
	
	.BlackTitle {
		text-align: center;
		letter-spacing: 0.05rem;
		color: #555;
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}
	
	.back {
		float: left;
	}
	
	.back img {
		height: 2.5rem;
	}
	
	.nickInput {
		border: none;
		border-radius: 0;
		outline: 0;
		border-bottom: 0.1rem solid #f1f1f1;
		padding: 1.5rem 1rem;
	}
	
	.nickText {
		margin-bottom: 0;
		text-align: left;
		padding: 0.5rem 0 0 10%;
		color: #FF2424;
		font-size: smaller;
	}
	
	.nickYes {
		border-radius: 0;
		font-size: 1.6rem;
		font-family:"Microsoft YaHei" ;
		border: 0;
		outline: 0;
		color: #09A2D6;
		background: none;
		display: block;
		vertical-align: middle;
		position: absolute; 
		text-align: right;
		right: 10%;
		margin-top:-5.5rem;
	}
	
	.nickYes:active{
		color:#00B2EE ;
	}
	
	.modal-footer{
		position: relative;
	}
	
</style>