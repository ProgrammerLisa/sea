<template>


	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" class="back"><span>ㄑ</span></span> 编辑资料
			</div>
		</div>
		<div class="media noTop">
			<div class="media-body">
				头像
			</div>
			<div class="media-right" data-toggle="modal" data-target="#ImgModal">
				<img class="media-object headImg" :src="`${headImg+'?'+now}`" />

			</div>
		</div>
		<div class="media" data-toggle="modal" data-target="#NickModal">
			<div class="media-body nickNameLeft">
				昵称
			</div>
			<div class="media-right nickNameRight">
				<span id="nickname">{{nickname}}</span><span class="glyphicon glyphicon-menu-right more"></span>
			</div>
		</div>
		<div class="media noTop">
			<div class="media-body">
				手机号码
			</div>
			<div class="media-right">
				{{IDcode}}
			</div>
		</div>
		<!-- 头像选择模态框（Modal） -->
		<div class="modal fade" id="ImgModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<span class="headImgChoose fileinput-button">
                <span>从相册选择</span>
						<input type="file" accept="image/*" id="fileBtn" @change="chooseImg('#fileBtn')">
						</span>
						<span class="headImgChoose fileinput-button">
                <span>拍照上传</span>
						<input type="file" accept="image/*" capture="camera">
						</span>
						<div class="headImgChoose closeBtn" data-dismiss="modal">取消</div>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>

		<!-- 修改昵称模态框（Modal） -->
		<div class="modal fade" id="NickModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
	</div>
</template>

<script>
	import headImg from '@/assets/images/profile.png'
	export default {
		name: "Compile",
    computed:{
      now(){
        return Date.now();
      }
    },
		data() {
			return {
				headImg: headImg,
				nickname: '',
				IDcode: '',
				chooseFile: '',
				houzhuiming: ''
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
					if(res.data.code == 0) {
						this.IDcode = res.data.data.phone;
						this.headImg = res.data.data.avatar;
            var nikename = res.data.data.nickname;
            var headimg = res.data.data.avatar;
            if(nikename==""){
              this.nickname = localStorage.getItem("uid");
            }else {
              this.nickname =nikename;
            }
            if(headimg==""){
              this.headPortrait = headImg;
            }else {
              this.headPortrait = res.data.data.avatar;
            }
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					console.log(err)
				}.bind(this))

		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			chooseImg(c) {
				let that = this;
				let $c = document.querySelector(c);
				that.chooseFile = $c.files[0];
				let reader = new FileReader();
				reader.readAsDataURL(that.chooseFile);
				reader.onload = function(e) {
					$(".modal-backdrop").hide();
					that.$router.push({
						path: '/uploadheadImg',
						name: 'UploadHeadImg',
						params: {
							name: 'name',
							dataObj: e.target.result,
							houzhuiming: that.chooseFile.name.split('.')[1]
						}
					})
				};

			},
			submit() {
				$("#NickModal").show();
				if($("#form_control").val() == '' || $("#form_control").val() == null || $("#form_control").val() == undefined) {
					$(".modal-backdrop").hide();
					$("#NickModal").hide();
					this.$layer.msg('请确认你的昵称');
				} else if($("#form_control").val().length < 4) {
					$(".modal-backdrop").hide();
					$("#NickModal").hide();
					this.$layer.msg('昵称不符合要求');
				} else if($("#form_control").val().length > 10) {
					$(".modal-backdrop").hide();
					$("#NickModal").hide();
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
								$("#NickModal").hide();
								this.$layer.msg(res.data.msg);
								this.nickname = res.data.data.nickname;
								$("#form_control").val("")
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

  .back span {
    height: 2.5rem;
    font-size: 2.5rem;
    color: #DBDBDB;
  }
  .back span:active{
    color: black;
  }
	.media {
		background: #fff;
		padding: 1rem;
		border-bottom: 0.1rem solid #f5f5f5;
	}

	.noTop {
		margin-top: 0;
	}

	.media-body {
		vertical-align: middle;
	}

	.headImg {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
	}

	.media-right {
		color: #888;
		font-size: small;
	}

	.more {
		margin-left: 0.5rem;
	}
	.modal-content {
		margin: 0 2rem;
		border-radius: 0;
		border: none;
		text-align: center;
	}

	.modal-dialog {
		margin: 35vh auto;
	}

	.modal-header {
		padding: 1rem;
		border-bottom: none;
		color: #444;
	}

	.modal-body {
		padding: 0;
	}

	#ImgModal .modal-content {
		height: 21vh;
	}

	.headImgChoose {
		position: relative;
		display: inline-block;
		overflow: hidden;
		width: 100%;
		height: 6.5vh;
		border: none;
		border-bottom: 0.1rem solid #e1e1e1;
		padding: 0;
		margin: 0;
		line-height: 6.5vh;
		font-size: 1.6rem;
		text-align: center;
		border-radius: 0;
		outline: none;
	}

	.headImgChoose input {
		position: absolute;
		right: 0;
		top: 0;
		opacity: 0;
		-ms-filter: 'alpha(opacity=0)';
		font-size: 100%;
	}

	#form_control {
		width: 80%;
		margin: 0 10%;
		outline: none;
		box-shadow: none;
	}

	.closeBtn {
		border-bottom: none;
	}

	.nickInput {
		border: none;
		border-radius: 0;
		outline: none;
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

	#NickModal .modal-footer {
		border-top: none;
	}

	.nickNo,
	.nickYes {
		border-radius: 0;
		padding: 0.4rem 1.5rem;
	}

	.nickNo {
		margin-right: 1rem;
		background: #f1f1f1;
	}

	.nickYes {
		background: #09a2d6;
		border-color: #2aabd2;
	}

  .nickNameRight {
    width: 80%;
    text-align: right;
  }
</style>
