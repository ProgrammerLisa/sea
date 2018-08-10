<template>

	<div class="content">
		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
			<span class="navTitleText">编辑资料</span>
		</mu-appbar>
		<div class="contentMarginTop">
			<mu-paper :z-depth="0" class="demo-list-wrap">
				<mu-list>
					<div class="mylist" data-toggle="modal" data-target="#ImgModal">
						<mu-list-item avatar button>
							<mu-list-item-title>头像</mu-list-item-title>
							<mu-list-item-action>
								<mu-avatar>
									<img class="media-object headImg" :src="`${headImg+'?'+now}`" v-if="haveHeadImg" />
									<img class="media-object headImg" :src="headImg" v-else/>
								</mu-avatar>
							</mu-list-item-action>
						</mu-list-item>
						<mu-divider class="mu-divider"></mu-divider>

					</div>
				</mu-list>
			</mu-paper>

			<div class="media Pictures" >
				<div class="media-body">
					上传相册
					<span class="hint" @click="editImage" v-if="editimages">编辑</span>
          <span class="hint" @click="doNotEdit" v-else>取消</span>
				</div>
				<div class="controlContainer" >
					<div class="controlScroll" :style="aaaaaa">
						<div class="controlContent"   v-for="(p,index) in timg" :key="index" >
                <img alt="有" class="media-object graph" :src="p.img" @touchstart="showDeleteButton(index)" @touchend="clearLoop(index)"/>
                <span class="clearIcon" v-show="p.show">   <mu-icon value="remove_circle" color="#333" @click="clearImage(index)"></mu-icon></span>
						</div>
						<div class="chart-to" data-toggle="modal" data-target="#PhModal">
							<!--<img class="media-object sheet" src="../../assets/images/tianjia.png" />-->
							<span class="sheet">+</span>
						</div>
					</div>
				</div>
			</div>
			<mu-paper :z-depth="0" class="demo-list-wrap marginTop">
				<mu-list>
					<mu-list-item to="/nickname" avatar button class="mu-list-item">
						<mu-list-item-title>昵称</mu-list-item-title>
						<mu-list-item-action class="listRight">
							<div>{{nickname}}<img :src="more" class="moreImg" /></div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider"></mu-divider>
					<mu-list-item @click="openScrollDialog" avatar button class="mu-list-item">
						<mu-list-item-title>性别</mu-list-item-title>
						<mu-list-item-action class="listRight">
							<div>{{ringtone}}<img :src="more" class="moreImg" /></div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider"></mu-divider>
					<mu-list-item avatar button style="margin-top: 0.6rem" class="mu-list-item">
						<mu-list-item-title>ID号</mu-list-item-title>
						<mu-list-item-action style="padding-right: 16px">
							<div>{{pmid}}</div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider"></mu-divider>
					<mu-list-item to="/Grade" avatar button class="mu-list-item">
						<mu-list-item-title>等级</mu-list-item-title>
						<mu-list-item-action class="listRight">
							<div>{{rank}}<img :src="more" class="moreImg" /></div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider" style="margin-top: 0.6rem"></mu-divider>
					<mu-list-item to="/Sdfs" avatar button class="mu-list-item">
						<mu-list-item-title>个性签名</mu-list-item-title>
						<mu-list-item-action class="listRight">
							<div>{{signature}}<img :src="more" class="moreImg" /></div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider" style="margin-top: 0.6rem"></mu-divider>
					<mu-list-item avatar button class="mu-list-item">
						<mu-list-item-title>手机号码</mu-list-item-title>
						<mu-list-item-action style="padding-right: 16px">
							<div>{{IDcode}}</div>
						</mu-list-item-action>
					</mu-list-item>
				</mu-list>
			</mu-paper>

			<!-- 头像选择模态框（Modal） -->
			<div class="modal fade" id="ImgModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<span class="headImgChoose fileinput-button">
                <span>从相册选择</span>
							<input type="file" accept="image/*" id="fileBtn" @change="chooseImg('#fileBtn')">
							</span>

							<span class="headImgChoose closeBtn fileinput-button" data-dismiss="modal">
              <span>取消</span>
							</span>

						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			</div>

			<!-- 照片选择模态框（Modal） -->
			<div class="modal fade" id="PhModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<span class="headImgChoose fileinput-button">
                <span>从相册选择图片</span>
							<input type="file" accept="image/*" id="phBtn" @change="photoImg('#phBtn')">
							</span>

							<span class="headImgChoose closeBtn fileinput-button" data-dismiss="modal">
              <span>取消</span>
							</span>

						</div>
					</div>
				</div>
			</div>

			<mu-dialog width="360" scrollable :open.sync="openScroll">
				<mu-list style="border-bottom: 1px solid #eee">
					<mu-list-item :key="option" v-for="option in options">
						<mu-list-item-content>
							<mu-radio :label="option" :value="option" v-model="ringtone" @click="sexChoose(option)"></mu-radio>
						</mu-list-item-content>
					</mu-list-item>
				</mu-list>
				<mu-button style="margin: auto;width: 100%;" flat slot="actions" @click="closeScrollDialog">取消</mu-button>
			</mu-dialog>

		</div>
	</div>
</template>

<script>
	import headImg from '@/assets/images/chushi.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	import more from '@/assets/images/more.png'
	import timg from "@/assets/images/test/timg.jpg"
	import pic2 from "@/assets/images/test/1f05664d192e4d8987bdef2562775e4f_th.png"
	import pic3 from "@/assets/images/test/86c9f191d93d4b208002970e8635cbef.jpg"
	import pic4 from "@/assets/images/test/0824ab18972bd40719d54bb773899e510fb3096d.jpg"
	import pic5 from "@/assets/images/test/201711613356.jpg"

	export default {
		name: "Compile",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				active: 0,
				more: more,
				masrc: back,
				headImg: headImg,
				timg: [{img:timg,show:false},{img:more,show:false},{img:timg,show:false},{img:timg,show:false},{img:timg,show:false},{img:headImg,show:false}],
        editimages:true,
        loop:'',
				nickname: '',
				signature: 'hahaha',
        aaaaaa:'width:900px',
				IDcode: '',
				chooseFile: '',
				houzhuiming: '',
				extensions: '',
				haveHeadImg: '',
				phtoImg: '',
				pmid: '',
				rank: 'LV3',
				openScroll: false,
				ringtone: '',
				options: [
					'男',
					'女'
				]
			}
		},
		inject: ['reload'],
    created(){
    },
    mounted() {
      this.aaaaaa='width:'+(this.timg.length+2)*96+'px';
			this.$http({
					method: "get",
					url: "/users/info",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {
					if(res.data.code == 0) {
						this.signature = res.data.data.resume;
						this.IDcode = res.data.data.phone;
						this.pmid = localStorage.getItem("uid");
						if(res.data.data.gender == "UNKNOWN") {
							this.ringtone = "保密"
						} else if(res.data.data.gender == "MALE") {
							this.ringtone = "男"
						} else if(res.data.data.gender == "FEMALE") {
							this.ringtone = "女"
						}
						if(res.data.data.nickname == "") {
							this.nickname = localStorage.getItem("uid");
						} else {
							this.nickname = res.data.data.nickname;
						}
						if(res.data.data.signature == "") {
							this.signature = signature;
						} else {
							this.signature = res.data.data.resume;
						}
						if(res.data.data.ringtone == "") {
							this.ringtone = ringtone;
						} else {
							this.ringtone = res.data.data.gender;
							if(res.data.data.gender == "UNKNOWN") {
								this.ringtone = "保密"
							} else if(this.ringtone == 'MALE') {
								this.ringtone = '男'
							} else if(this.ringtone == 'FEMALE') {
								this.ringtone = '女'
							}
							//							console.log(this.ringtone+'值');
						}

						if(res.data.data.pictures == "") {

						} else {
							this.timg = res.data.data.pictures;
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
						this.phtoImg = false
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					this.haveHeadImg = false
					this.phtoImg = false
					console.log(err)
				}.bind(this))

		},
		methods: {
			changeActive(index) {
				this.active = index;
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			openScrollDialog() {
				this.openScroll = true;
			},
			closeScrollDialog() {
				this.openScroll = false;
			},
			sexChoose() {
				// this.openScroll = false;
				let gender;
				console.log(this.ringtone)
				if(this.ringtone === "男") {
					gender = 'MALE'
				} else if(this.ringtone === "女") {
					gender = 'FEMALE'
				} else {
					gender = 'UNKNOWN'
				}
				this.$http({
						method: "post",
						url: "/users/edit-gender",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							gender: gender
						}
					}).then(function(res) {
						if(res.data.code === 0) {
							this.openScroll = false;
						}
						this.$layer.msg(res.data.msg)
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))

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
			photoImg(c) {
				alert(1);
				let that = this;
				let $c = document.querySelector(c);
				that.chooseFile = $c.files[0];
				let reader = new FileReader();
				reader.readAsDataURL(that.chooseFile);
				reader.onload = function(e) {
					$(".modal-backdrop").hide();
					that.$router.push({
						path: '/UploadPhotoImg',
						name: 'UploadPhotoImg',
						params: {
							name: 'name',
							dataObj: e.target.result,
							extensions: that.chooseFile.name.split('.')[1]
						}
					})
				};
			},
			sexChoose(a) {
				//				this.sexe=a;
				console.log(a)
				if(a == "男") {
					this.gender = "MALE"
				} else if(a == "女") {
					this.gender = "FEMALE"
				} else {
					this.gender = "UNKNOWN"
				}

				this.$http({
						method: "post",
						url: "/users/edit-gender",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid")
						},
						data: {
							"gender": this.gender
						}
					}).then(function(res) {

						if(res.data.code == 0) {
							this.$layer.msg(res.data.msg);
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
      editImage(){
        this.editimages=false;
        for (let i in this.timg) {
          this.timg[i].show=true;
        }
      },
      doNotEdit(){
        this.editimages=true;
        for (let i in this.timg) {
          this.timg[i].show=false;
        }
      },
      showDeleteButton(index){
			  this.loop='';
			  let that = this;
        that.loop=setTimeout(function () {
          that.timg[index].show=!that.timg[index].show;
        },1000)
      },
      clearLoop() {
        clearInterval(this.loop);
      },
      clearImage(index){
			  this.timg.splice(index,1)
      }
		}
	}


</script>

<style scoped>
	.chart-to {
		position: relative;
		background-color: #F5F5F5;
		float: right;
		width: 20vw;
		height: 20vw;
		margin-left: 75%;
		margin-top: -22.5%;
		display: table-cell;
   	 	vertical-align: middle;
    	text-align: center;
	}

	.content {
		overflow-x: hidden;
		background-color: #f5f5f5;
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		padding-bottom: 2rem;
	}

	.content::-webkit-scrollbar {
		display: none
	}

	.Pictures {
		background: #fff;
		padding: 1rem 1.1rem;
		border-bottom: 0.1rem solid #f5f5f5;
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

	.graph {
		width:100%;
		height: 100%;
	}

	.sheet {
		/*width: 10vw;
		height: 10vw;*/
		font-size: 4rem;
		color: #888;
	}

	.mu-list {
		padding: 0;
	}

	.listRight {
		width: 50%
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

	.moreImg {
		height: 3rem;
	}

	.hint {
		float: right;
		color: #888;
		font-size: 0.05rem;
		padding-right: 0px;
	}

	.mu-divider {
		background: #f5f5f5;
	}

	.mu-item {
		padding-right: 0;
	}

	.marginTop {
		margin-top: 0.6rem;
		background: #f5f5f5;
	}

	.mu-list-item {
		background: #fff;
	}

	.controlContainer {
		overflow-x: scroll;

	}

	.controlContainer::-webkit-scrollbar {
		display: none
	}

	.controlContent {
		display: inline-block;
		white-space: nowrap;
    padding: 1rem 0.8rem 0 0;
    width:8rem;
    height: 8rem;
    overflow: hidden;
    margin-right: 1rem;
	}


	.controlScroll {
		margin-bottom: 0.5rem;
	}
  .clearIcon{
    display: inline-block;
    position: relative;
    left:6rem;
    top:-8rem;
    width:  2rem;
    height: 2rem;
    background: #fff;
    border-radius: 50%;
  }
</style>
