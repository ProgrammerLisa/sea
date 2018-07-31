<template>

	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back">  <img :src="masrc"/></span> 编辑资料
			</div>
		</div>
		<div class="media noTop">
			<div class="media-body">
				头像
			</div>
			<div class="media-right" data-toggle="modal" data-target="#ImgModal">
				<img class="media-object headImg" :src="`${headImg+'?'+now}`" v-if="haveHeadImg" />
				<img class="media-object headImg" :src="headImg" v-else/>
			</div>
		</div>
		<router-link to="/nickname" tag="div" class="media" style="padding-right: 1rem">
			<div class="media-body nickNameLeft">
				昵称
			</div>
			<div class="media-right nickNameRight">
				<span id="nickname">{{nickname}}</span><span class="text-right"><img :src="more" class="moreImg"/></span>
			</div>
		</router-link>
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
						<!--<span class="headImgChoose fileinput-button">-->
                <!--<span>拍照上传</span>-->
						<!--<input type="file" accept="image/*" capture="camera">-->
						<!--</span>-->
            <span class="headImgChoose closeBtn fileinput-button" data-dismiss="modal">
              <span>取消</span>
            </span>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>

	</div>
</template>

<script>
	import headImg from '@/assets/images/chushi.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
  import more from '@/assets/images/more.png'

	export default {
		name: "Compile",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
        more:more,
				masrc: back,
				headImg: headImg,
				nickname: '',
				IDcode: '',
				chooseFile: '',
				houzhuiming: '',
				haveHeadImg: ''
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
						if(res.data.data.nickname == "") {
							this.nickname = localStorage.getItem("uid");
						} else {
							this.nickname = res.data.data.nickname;
						}
						if(res.data.data.avatar == "") {
							this.headImg = headImg;
							this.haveHeadImg = false
						} else {
							this.headImg = res.data.data.avatar;
							this.haveHeadImg = true
						}
					} else {
						this.haveHeadImg = false
						this.$layer.msg(res.data.msg);
					}
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

		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #f5f5f5;
		width: 100vw;
    height: 100vh;
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
    background: #09a2d6;
		color: #fff;
    font-size: 1.5rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		position: absolute;
		left: 1rem;
	}

	.back img {
		height: 2.5rem;
	}

	.media {
		background: #fff;
		padding: 1rem 1.7rem;
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
		height: 14vh;
	}

	.headImgChoose {
		position: relative;
		display: inline-block;
		overflow: hidden;
		width: 100%;
		height: 7.5vh;
		border: none;
		border-bottom: 0.1rem solid #e1e1e1;
		padding: 0;
		margin: 0;
		line-height: 7.5vh;
    font-size: 1.5rem;
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
    line-height: 4.5vh;
	}

	.nickNameRight {
		width: 80%;
		text-align: right;
	}
  .moreImg{
    height: 3rem;
  }
</style>
