<template>


<div class="content">
  <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
    <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
      <img :src="masrc"/>
    </mu-button>
    <span class="navTitleText">编辑资料</span>
  </mu-appbar>
  <div class="contentMarginTop">
    <div class="media noTop">
      <div class="media-body">
        头像
      </div>
      <div class="media-right" data-toggle="modal" data-target="#ImgModal">
        <img class="media-object headImg" :src="`${headImg+'?'+now}`" v-if="haveHeadImg" />
        <img class="media-object headImg" :src="headImg" v-else/>
      </div>
    </div>

    <div class="media Pictures">
      <div class="media-body">
        上传头像
        <span id="hint">长按拖拽可更改图片顺序,最多10张</span>
      </div>
      <div class="chart">
        <img class="media-object graph"  src="../../assets/images/chushi.png"/>
        <!--<img class="media-object sheet" src="../../assets/images/tianjia.png" />-->
      </div>
      <div class="chart-to">
        <img class="media-object sheet" src="../../assets/images/tianjia.png" />
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

    <div class="media noTop" @click="openScrollDialog" style="padding-right: 1rem">
      <div class="media-body">
        性别
      </div>
      <div class="media-right">
        <span id="sex" data-target="#sexModal">{{ringtone}}</span><span class="text-right"><img :src="more" class="moreImg"/></span>
      </div>
    </div>


    <div class="media noTop ID" style="padding-right: 1rem">
      <div class="media-body">
        ID号
      </div>
      <div class="media-right" style="padding-right: 15px;">
        <span>{{pmid}}</span>
      </div>
    </div>
    <router-link to="/Grade" tag="div" class="media" style="padding-right: 1rem;margin-top:0px ;">
      <div class="media-body ">
        等级
      </div>
      <div class="media-right ">
        <span id="grade">{{rank}}</span><span class="text-right"><img :src="more" class="moreImg"/></span>
      </div>
    </router-link>

    <router-link to="/Sdfs" tag="div" class="media" style="padding-right: 1rem">
      <div class="media-body ">
        个性签名
      </div>
      <div class="media-right ">
        <span id="signature">{{signature}}</span><span class="text-right"><img :src="more" class="moreImg"/></span>
      </div>
    </router-link>
    <div class="media noTop phone">
      <div class="media-body">
        手机号码
      </div>
      <div class="media-right">
        <span>{{IDcode}}</span>
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

    <mu-dialog width="360" scrollable :open.sync="openScroll" >
      <mu-list>
        <mu-list-item :key="option" v-for="option in options">
          <mu-list-item-content>
            <mu-radio  :label="option" :value="option" v-model="ringtone" @click="sexChoose"></mu-radio>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
      <mu-button style="margin: auto;width: 95%" slot="actions" color="#455a64" @click="closeScrollDialog">取消</mu-button>
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
				signature: 'hahaha',
				IDcode: '',
				chooseFile: '',
				houzhuiming: '',
				haveHeadImg: '',
				pmid:'141428',
				rank: 'LV3',
        openScroll: false,
        ringtone: '男',
        options: [
          '男',
          '女'
        ]
			}
		},
		inject: ['reload'],
		mounted: function() {
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
      openScrollDialog () {
        this.openScroll = true;
      },
      closeScrollDialog () {
        this.openScroll = false;
      },
      sexChoose(){
        this.openScroll = false;
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
			man(a) {
				this.sexe=a;
				$("#SexModal").hide();
				$(".modal-backdrop").hide();
				console.log(1)
			}
		}
	}
</script>

<style scoped>
	.chart{
		width: 10%;
	}
	.chart-to{
		position: relative;
		background-color: #F5F5F5;
		float: left;
		left: 5rem;
		bottom: 4rem;
		width: 48px;
		height: 48px;
	}
	.content {
		overflow-x: hidden;
		background-color: #f5f5f5;
		width: 100vw;
    margin-bottom: 2rem;
	}

	.media {
		background: #fff;
		padding: 1rem 1.7rem;
		border-bottom: 0.1rem solid #f5f5f5;
    margin-top: 0.6rem;
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

	.graph{
		width: 4rem;
		height: 4rem;
		margin-top: 10px;
	}

	.sheet{
		float: right;
		width: 48px;
		height: 48px;
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
		width:80%;
		text-align: right;
	}
	.nickNameLeft{
		text-align: left;
	}
  .moreImg{
    height: 3rem;
  }
  #hint{
  	float: right;
  	color: #888;
  	font-size: 0.05rem;
  	padding-right: 0px;
  }
  div.media-right{
  	padding-right: 0;
  }
  .phone{
  	margin-top: 0.6rem;
  }
  .ID{
  	margin-top: 0.6rem;
  }

</style>
