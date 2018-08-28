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
					<div class="myHeadImg" @click="openHiDialog">
						<mu-list-item avatar button>
							<mu-list-item-title>头像</mu-list-item-title>
							<mu-list-item-action class="album">
								<!--<mu-avatar>-->
								<img class="media-object headImg" :src="`${headImg+'?'+now}`" v-if="haveHeadImg" />
								<img class="media-object headImg" :src="headImg" v-else/>
								<!--</mu-avatar>-->
							</mu-list-item-action>
							<mu-list-item-action class="album-listRight">
								<img :src="more" class="moreImg" />
							</mu-list-item-action>

						</mu-list-item>

					</div>
				</mu-list>
			</mu-paper>

			<mu-divider class="mu-divider" style="margin-top: 0.6rem;"></mu-divider>

			<div class="media Pictures" style="margin-top: 0">
				<div class="media-body">
					上传相册
					<span id="hint">长按图片可删除</span>
				</div>
				<div class="controlContainer">
					<div class="controlScroll">
						<div v-if="show">
							<div class="controlContent" v-for="(p,index) in timg">
								<img @touchstart="rem(p,index)" @touchend="js()" class="media-object graph" :src="p" @click="changeActive(index)" />
							</div>
							<div class="chart-to" @click="openPhDialog">
								<img class="media-object sheet" src="../../assets/images/tianjia.png" />
							</div>
						</div>

						<div class="lds-css ng-scope" v-else>
							<div style="width:100%;height:100%" class="lds-ripple">
								<div></div>
								<div></div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<mu-paper :z-depth="0" class="demo-list-wrap marginTop">
				<mu-list>
					<mu-list-item @click='oname()' avatar button class="mu-list-item">
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
							<div>Lv.{{rank}}<img :src="more" class="moreImg" /></div>
						</mu-list-item-action>
					</mu-list-item>
					<mu-divider class="mu-divider" style="margin-top: 0.6rem"></mu-divider>
					<mu-list-item @click='sign()' avatar button class="mu-list-item">
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
			<mu-dialog width="300" scrollable :open.sync="openHi" class="text-center">
				<div style="border-bottom: 1px solid #eee">
					<mu-button style="width: 100%" flat color="#09A2D6">
						<span class="headImgChoose fileinput-button">
                    <span>从相册选择</span>
						<input type="file" accept="image/*" id="fileBtn" @change="chooseImg('#fileBtn')">
						</span>
					</mu-button>
				</div>

				<mu-button style="width: 100%" flat color="#333" @click="closeHiDialog">取消</mu-button>
			</mu-dialog>

			<!-- 照片选择模态框（Modal） -->
			<mu-dialog width="300" scrollable :open.sync="openPh" class="text-center">
				<div style="border-bottom: 1px solid #eee">
					<mu-button style="width: 100%" flat color="#09A2D6">
						<span class="headImgChoose fileinput-button">
                    <span>从相册选择图片</span>
						<input type="file" accept="image/*" id="phBtn" @change="photoImg('#phBtn')">
						</span>
					</mu-button>
				</div>

				<mu-button style="width: 100%" flat color="#333" @click="closePhDialog">取消</mu-button>
			</mu-dialog>

			<!-- 性别选择模态框（Modal） -->
			<mu-dialog width="360" scrollable :open.sync="openScroll">
				<mu-list style="border-bottom: 1px solid #eee;padding: 1rem 2rem 0">
					<mu-list-item :key="option" v-for="option in options">
						<mu-list-item-content>
							<mu-radio :label="option" :value="option" v-model="ringtone" @click="sexChoose(option)"></mu-radio>
						</mu-list-item-content>
					</mu-list-item>
				</mu-list>
				<mu-button style="margin: auto;width: 100%;" flat slot="actions" @click="closeScrollDialog">取消</mu-button>
			</mu-dialog>

			<!-- 照片删除 -->
			<mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
				<div style="border-bottom: 1px solid #f5f5f5" class="text-center publicDialogTitle">确定要删除吗</div>
				<mu-button slot="actions" flat color="primary" @click="AlertDialog(Iurl,i)" class="delBtn">确认</mu-button>
				<mu-button slot="actions" flat color="primary" @click="closeAlertDialog" class="delBtn">取消</mu-button>
			</mu-dialog>

		</div>
	</div>
</template>

<script>
	import headImg from '@/assets/images/chushi.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	import more from '@/assets/images/more.png'

	export default {
		name: "compile",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				active: 0,
				chooseFile: '',
				count: 0,
				extensions: '',
				haveHeadImg: '',
				headImg: headImg,
				houzhuiming: '',
				i: '',
				IDcode: '',
				Iurl: '',
				loading2: false,
				masrc: back,
				more: more,
				nickname: '',
				openAlert: false,
				openHi: false,
				openPh: false,
				openScroll: false,
				options: [
					'男',
					'女'
				],
				phtoImg: '',
				pmid: '',
				rank: '',
				ringtone: '',
				show: true,
				signature: 'hahaha',
				timg: [],
			}
		},

		mounted: function() {
			this.$nextTick(function() {
				this.compile();

			})
		},

		methods: {
			compile() {
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
							let rank = res.data.data.level;
							if(rank) {
								this.rank = res.data.data.level;
							} else {
								this.rank = 0
							}
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

							}

							if(res.data.data.pictures == "") {
								this.timg = [timg];
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
							this.show = true;
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.haveHeadImg = false
						this.phtoImg = false
						console.log(err)
					}.bind(this))

			},

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
			openHiDialog() {
				this.openHi = true;
			},
			closeHiDialog() {
				this.openHi = false;
			},
			openPhDialog() {
				this.openPh = true;
			},
			closePhDialog() {
				this.openPh = false;
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
						name: 'uploadheadimg',
						params: {
							name: 'name',
							dataObj: e.target.result,
							houzhuiming: that.chooseFile.name.split('.')[1]
						}
					})
				};
			},
			photoImg(c) {
				let that = this;
				let $c = document.querySelector(c);
				that.chooseFile = $c.files[0];
				let reader = new FileReader();
				reader.readAsDataURL(that.chooseFile);
				reader.onload = function(e) {
					$(".modal-backdrop").hide();
					that.$router.push({
						path: '/uploadphotoimg',
						name: 'uploadphotoimg',
						params: {
							name: 'name',
							dataObj: e.target.result,
							extensions: that.chooseFile.name.split('.')[1],

						}
					})
				};
			},
			sexChoose(a) {
				//				this.sexe=a;
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

						if(res.data.code === 0) {
							this.openScroll = false;
							this.$layer.msg(res.data.msg);
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			rem(Iurl, i) {
				let that = this;
				//				 that.openAlert = true;
				that.time = setTimeout(function() {

					that.openAlert = true;
					that.Iurl = Iurl;
					that.i = i;
				}, 1000)
			},
			js() {
				clearTimeout(this.time);
			},

			closeAlertDialog() {
				this.openAlert = false;
			},
			AlertDialog(Iurl, i) {
				this.$http({
						method: "post",
						url: "/users/delete-picture",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							"url": Iurl
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							this.openAlert = false;
							this.$layer.msg(res.data.msg);
						} else {
							this.$layer.msg(res.data.msg);
							this.openAlert = false;
						}
						this.timg.splice(i, 1)
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试" + err);
					}.bind(this))
			},
			oname() {
				this.$router.push({
						path: '/nickname',
						name:'nickname',
						params: {
							name: 'name',
							dataObj: {
								nickname:this.nickname
							}
						}
					})
			},
			sign() {
				this.$router.push({
					path:'/sdfs',
					name:'sdfs',
					params: {
						name: 'name',
						dataObj:{
							signature: this.signature
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	@keyframes lds-ripple {
		0% {
			top: 96px;
			left: 96px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 18px;
			left: 18px;
			width: 156px;
			height: 156px;
			opacity: 0;
		}
	}
	
	@-webkit-keyframes lds-ripple {
		0% {
			top: 96px;
			left: 96px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 18px;
			left: 18px;
			width: 156px;
			height: 156px;
			opacity: 0;
		}
	}
	
	.lds-ripple {
		position: relative;
		margin: auto;
	}
	
	.lds-ripple div {
		box-sizing: content-box;
		position: absolute;
		border-width: 4px;
		border-style: solid;
		opacity: 1;
		border-radius: 50%;
		-webkit-animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	
	.lds-ripple div:nth-child(1) {
		border-color: #09a2d6;
	}
	
	.lds-ripple div:nth-child(2) {
		border-color: #32a0da;
		-webkit-animation-delay: -0.5s;
		animation-delay: -0.5s;
	}
	
	.lds-ripple {
		width: 200px !important;
		height: 200px !important;
		-webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
		transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
	}
	
	.mu-item-action {
		min-width: 3.0rem;
	}
	
	.chart-to {
		width: 20vw;
		height: 20vw;
		background-color: #F5F5F5;
		margin: 1vw;
		display: inline-block;
		white-space: nowrap;
	}
	
	.sheet {
		vertical-align: middle;
		text-align: center;
		width: 10vw;
		height: 10vw;
		margin: 25%;
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
	
	.media {
		background: #fff;
		padding: 1rem 1.1rem;
		border-bottom: 0.1rem solid #f5f5f5;
		margin-top: 0.6rem;
	}
	
	.media-body {
		vertical-align: middle;
	}
	
	.headImg {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: 1px solid #f5f5f5;
	}
	
	.myHeadImg {
		padding: 1rem 0;
	}
	
	.graph {
		width: 4rem;
		height: 4rem;
		margin-top: 10px;
	}
	
	.listRight {
		width: 50%
	}
	
	.mu-list {
		padding: 0;
	}
	
	.mu-list {
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
	
	.moreImg {
		height: 3rem;
	}
	
	#hint {
		float: right;
		color: #888;
		font-size: 0.05rem;
		padding-right: 1.5rem;
	}
	
	.mu-divider {
		background: #f5f5f5;
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
	}
	
	.controlContent img {
		width: 20vw;
		height: 20vw;
		margin: 1vw;
	}
	
	.controlScroll {
		width: auto;
	}
	
	.delBtn {
		border-top: 1px solid #ddd;
		width: 50%;
		color: #555;
	}
	
	.delBtn:first-child {
		border-right: 1px solid #ddd;
		color: #09a2d6;
	}
	
	div.mu-item-title {
		width: 50px;
	}
</style>