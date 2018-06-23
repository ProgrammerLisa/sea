<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span> 编辑资料
			</div>
		</div>
		<div class="media noTop">
			<div class="media-body">
				头像
			</div>
			<div class="media-right" data-toggle="modal" data-target="#ImgModal">
				<img class="media-object headImg" :src="headImg" />

			</div>
		</div>
		<div class="media" data-toggle="modal" data-target="#NickModal">
			<div class="media-body">
				昵称
			</div>
			<div class="media-right">
				<span>{{nickname}}</span><span class="glyphicon glyphicon-menu-right more"></span>
			</div>
		</div>
		<div class="media noTop">
			<div class="media-body">
				ID号
			</div>
			<div class="media-right">
				{{IDcode}}
			</div>
		</div>
		<div class="btn btn-default loginOut">退出登录</div>
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

    import headImg from '@/assets/images/bg.png'
    export default {
        name: "Compile",
        data(){
            return{
              headImg:headImg,
              nickName:'duobao9591',
              IDcode:'5678966',
              chooseFile:'',
              houzhuiming:''
          }
        },
        mounted(){
          this.headImg=this.$route.params.imgUrl;
        },
        methods:{
          goBack(){
            this.$router.go(-1);
          },
          chooseImg(c) {
            let that = this;
            let $c = document.querySelector(c);
            let file = $c.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            that.houzhuiming = file.name.split(".")[1];
            reader.onload = function (e) {
              that.chooseFile = e.target.result;
              $(".modal-backdrop").hide();
              that.$router.push({
                path: '/uploadheadImg',
                name: 'UploadHeadImg',
                params: {
                  name: 'name',
                  dataObj: that.chooseFile,
                  houzhuiming: that.houzhuiming
                }
              })
            }
          }
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			chooseImg(c) {
				let that = this;
				let $c = document.querySelector(c);
				that.chooseFile = $c.files[0];
				$(".modal-backdrop").hide();
				that.$router.push({
					path: '/uploadheadImg',
					name: 'UploadHeadImg',
					params: {
						name: 'name',
						dataObj: that.chooseFile
					}
				})
			},
			submit() {
				if($("#form_control").val() == '' || $("#form_control").val() == null || $("#form_control").val() == undefined) {
					this.$layer.msg('请确认你的昵称');
				} else {
					this.$http({
							method: "post",
							url: "/api/users/profile/edit",
							headers: {
								"device": "android",
								"uid":this.readCookie('uid'),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								nickname: $("#form_control").val()
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
							console.log(err)
						}.bind(this))
				}
			},
			readCookie(name) {
            let cookieValue = "";
            let search = name + "=";
            if(document.cookie.length > 0) {
              let offset = document.cookie.indexOf(search);
              if(offset != -1) {
                offset += search.length;
                let end = document.cookie.indexOf(";", offset);
                if(end == -1) end = document.cookie.length;
                cookieValue = unescape(document.cookie.substring(offset, end))
              }
            }
            return cookieValue;
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

	.back img {
		height: 2.5rem;
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

	.loginOut {
		width: 100%;
		border: 0;
		border-radius: 0;
		border-top: 0.1rem solid #e1e1e1;
		position: fixed;
		bottom: 0;
		line-height: 3rem;
		color: #FF2424;
		letter-spacing: 0.1rem;
		font-size: large;
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
		padding: 0.5rem 0 0 1rem;
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
</style>
