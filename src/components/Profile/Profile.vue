<template>
	<div class="content">
		<div v-if="hasSignal" class="scroll">
			<div class="personal">
				<div class="news">
					<router-link to="/news" v-if="newsCount" tag="div" class="badgePositionRed"></router-link>
					<router-link to="/news" v-else tag="div" class="badgePosition"></router-link>
				</div>
				<div class="personalMessage">
					<div @click="goCompile" v-if="headDefault" class="flex">
						<div class="HeadPortrait">
							<img :src="`${headPortrait+'?'+now}`" v-if="haveHeadImg" />
							<img :src="headPortrait" v-else/>
						</div>
            <div>

              <p class=""><span class="marginRight nickName">{{nickName}}</span> <span class="sex marginRight" v-bind:style="bcColor">{{gender}}</span> <span class="level marginRight">Lv.{{level}}</span></p>
              <p >
                <mu-icon value="phone_iphone" left size="18" style="vertical-align: middle"></mu-icon>{{phone}}
              </p>
              <p class="autograph">{{autograph}}</p>
            </div>

						<!--<p class="userId">ID：{{phone}}</p>-->
					</div>
					<router-link v-else tag="div" to="/login" class="text-center">
						<div class="HeadPortrait">
							<img :src="headPortrait" />
						</div>
						<p class="nickName" >点击登录</p>
					</router-link>

					<div class="msgBox">
						<router-link to="wallet" tag="div" class="personalMessageLeft">
              <img :src="wallet" class="personalIcon"><div flat class="personalText"> 我的钱包</div>
						</router-link>
						<div class="wallet"></div>
						<router-link to="realname" tag="div" class="personalMessageLeft">
              <img :src="autonym" class="personalIcon"><div flat class="personalText">实名信息</div>
						</router-link>
					</div>
				</div>

			</div>

			<div class="list">
        <mu-paper :z-depth="1" class="demo-list-wrap ">
          <mu-list>
            <mu-list-item button v-for="(m,index) in Personal" class="mylist" :to="m.PersonalHref" :key="index">
              <mu-list-item-action>
                <img class="images" :src="m.imfLeft">
              </mu-list-item-action>
              <mu-list-item-title style="margin-left: 1.2rem">{{m.title}}</mu-list-item-title>
              <mu-list-item-action>
                <div class="images">
                  <img src="../../assets/images/more.png" />
                </div>
              </mu-list-item-action>
            </mu-list-item>

          </mu-list>
        </mu-paper>
      </div>
		</div>
    <div v-else>
      <nothing @again="again"></nothing>
    </div>
	</div>
</template>

<script>
  import Nothing from '@/components/Nothing'
	import friend from '@/assets/images/friend.png'
	import inviter from '@/assets/images/inviter.png'
	import gift from '@/assets/images/gift.png'
	import indent from '@/assets/images/indent.png'
	import address from '@/assets/images/address.png'
	import service from '@/assets/images/service.png'
	import setting from '@/assets/images/setting.png'
	import headImg from '@/assets/images/chushi.png'
	import autonym from '@/assets/images/autonym.png'
	import wallet from '@/assets/images/wallet.png'
	import invite from '@/assets/images/invite.png'

	export default {
		name: "personal",
		computed: {
			now() {
				return Date.now();
			}
		},
    components:{
      'nothing':Nothing
    },
		data() {
			return {
        hasSignal:true,
				data: '',
				autonym: autonym,
				wallet: wallet,
				nickName: '',
				phone: '',
        autograph:'',
				Personal: [{
						title: '我的好友',
						PersonalHref: 'friend',
						PersonalName: 'friend',
						imfLeft: friend
					},
					{
						title: '邀请奖励',
						PersonalHref: 'ask',
						PersonalName: 'ask',
						imfLeft: gift
					},
					{
						title: '夺宝记录',
						PersonalHref: 'myrankings',
						PersonalName: 'MyRankings',
						imfLeft: invite
					},
					{
						title: '商城订单',
						PersonalHref: 'commodityorder',
						PersonalName: 'CommodityOrder',
						imfLeft: indent
					},
					{
						title: '收货地址',
						PersonalHref: 'address',
						PersonalName: 'address',
						imfLeft: address
					},
					{
						title: '客服中心',
						PersonalHref: 'wechatservice',
						PersonalName: 'WechatService',
						imfLeft: service
					},
					{
						title: '账户设置',
						PersonalHref: 'setting',
						PersonalName: 'Setting',
						imfLeft: setting
					}
				],
				headPortrait: headImg,
				headDefault: true,
				isLogin: true,
				newsCount: false,
				haveHeadImg: false,
        gender:'',
        bcColor:'',
				level: ''
			}
		},
		mounted() {
      let clickNum = 0;
      mui.back = function(){
        clickNum++;
        if(clickNum > 1) {
          plus.runtime.quit();
        } else {
          mui.toast("再按一次退出应用");
        }
        setTimeout(function() {
          clickNum = 0
        }, 2000);
        return false;

      };
			this.$nextTick(function() {
				this.info();
			})
		},
		methods: {
      again(){
        this.info();
      },
			info() {
				//个人信息
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
          if(res.data.code === 401) {
            this.$layer.msg('请登录后再试！');
            this.$router.replace('/login');
            this.headPortrait = headImg;
            this.headDefault = false;
          }
						if(res.data.code == 0) {
              this.hasSignal=true;
							this.data = res.data.data;
							var nikename = res.data.data.nickname;
							var headimg = res.data.data.avatar;
							this.level = res.data.data.level;
							this.phone = res.data.data.phone;
              if (res.data.data.resume=="") {
                this.autograph="这个人很懒，还没有签名~"
              }else {
                this.autograph = res.data.data.resume;
              }
              if(res.data.data.gender === "MALE") {
                this.gender = '♂'
                this.bcColor='background: #5CB3FC;';
              } else if(res.data.data.gender==="UNKNOWN"){
                this.gender = '?'
                this.bcColor='background: #ddd;';
              }else{
                this.gender = '♀'
                this.bcColor='background: #FC8484;';
              }
							if(nikename == "") {
								this.nickName = localStorage.getItem("uid");
							} else {
								this.nickName = nikename;
							}
							if(headimg == "") {
								this.headPortrait = headImg;
								this.haveHeadImg = false;
							} else {
								this.headPortrait = res.data.data.avatar;
								this.haveHeadImg = true;
							}
							//存操作
							var srcu = localStorage.getItem("src2") || [];

							if(typeof srcu == "string") {
								srcu = srcu.split(",")
								var i;
								for(i = 0; i < srcu.length; i++) {
									if(srcu[i] == this.headPortrait) {
										break;
									}
								}
								if(i == srcu.length) {
									srcu.push(this.headPortrait)
									localStorage.setItem("src2", srcu);
								}
							} else {
								srcu.push(this.headPortrait)
								localStorage.setItem("src2", srcu);
								console.log(localStorage.getItem("src2"));
							}

						} else {
              this.hasSignal=false;
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
            this.hasSignal=false;
					}.bind(this));
				//消息
				this.$http({
						method: "post",
						url: "/messages/box",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							"page": 1
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							if(res.data.count > 0) {
								this.newsCount = true
							} else {
								this.newsCount = false
							}
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));

				//邀请人id
				// this.$http({
				// 		method: "post",
				// 		url: "/users/following",
				// 		headers: {
				// 			"device": "android",
				// 			"uid": localStorage.getItem("uid"),
				// 			"Access-Control-Allow-Origin": "*"
				// 		},
				// 		data: {}
				// 	}).then(function(res) {
				// 		if(res.data.code === 401) {
				// 			//      		this.$layer.alert('登录操作  请登录');
				// 			this.$router.replace('/login');
				// 		}
				// 		if(res.data.code == 0) {
				// 			this.Personal[1].myInvite = res.data.data.inviter_code
				// 		} else {
				// 			this.Personal[1].myInvite = "无";
				// 		}
				// 	}.bind(this))
				// 	.catch(function(err) {
				// 		this.$layer.msg("系统异常，请稍后再试");
				// 	}.bind(this));
			},
			goCompile() {
				this.$router.push({
					path: '/compile',
					name: 'compile',
					params: {
						name: 'name',
						data: this.data
					}
				})
			},
			profileAll(c, n) {
				this.$router.push({
					path: c,
					name: n,
					params: {
						name: 'name'
					}
				})
			}

		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		background-color: #f5f5f5;
		color: #666;
		padding-bottom: 8rem;
		height: 100vh;
		overflow-y: scroll;
	}

	.content::-webkit-scrollbar {
		display: none
	}

	.personal {
		background: url("../../assets/images/wodebg.png") no-repeat #f5f5f5;
		background-size: 100% 75%;
		text-align: right;
		padding-bottom: 1rem;
	}

	.news {
		display: flex;
		flex-direction: row-reverse;
		padding: 0.4rem 0;
	}

	.badgePositionRed {
		width: 5rem;
		height: 3rem;
		background: url("../../assets/images/new.png") no-repeat;
		background-size: 60% 100%;
	}

	.badgePosition {
		width: 5rem;
		height: 3rem;
		background: url("../../assets/images/news.png") no-repeat;
		background-size: 60% 100%;
	}
  .flex{
    display: flex;
    text-align: left;
    margin: 0 0 2rem;
    color: #fff;
  }

	.personalMessage {
		width:100%;
		background: transparent;
		border-radius: 0.5rem;
    padding: 0 1rem;
	}

	.personalMessageLeft {
		text-align: center;
		width: 50%;
    color: #323232;
    padding: 1rem 0;
	}
  .personalMessageLeft:active{
    background: #E5E5E5;
  }
	.wallet {
		width: 0.1rem;
		height: 3rem;
		background: #ddd;
		margin-top: 2rem;
	}

	.msgBox {
		display: flex;
    box-shadow: 0 0 0.5rem #EAF6FB;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #EAF6FB;
	}

	.HeadPortrait img {
		width: 7rem;
		height: 7rem;
		border-radius: 50%;
    margin-right: 1rem;
	}

	.HeadPortrait {
		margin: auto 1rem;
		position: relative;
	}

	.nickName {
    font-size: 1.7rem;
	}

	.personalIcon {
		width: 2.8rem;
	}

	.personalText {
		padding-left: 0;
	}
  .autograph{
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
    margin-bottom: 0
  }
	.mu-paper-round {
		border-radius: 0;
	}

	.mu-elevation-1 {
		box-shadow: none;
	}

	.images {
		padding: 0.8rem;
    width: 4rem;
    position: relative;right: 6px
	}
  .images img{
    width: 100%;
  }
	@media screen and (min-height: 500px) and (max-height: 600px) {
		.images {
			width: 4rem
		}
	}

	@media screen and (min-height: 600px) and (max-height: 700px) {
		.images {
			width: 4.2rem
		}
	}

	@media screen and (min-height: 700px) and (max-height: 750px) {
		.images {
			width: 4rem
		}
	}

	@media screen and (min-height:750px) and (max-height: 850px) {
		.images {
			width: 4rem
		}
	}

	.msg {
		color: #ff2424;
		background: transparent;
		font-size: xx-large;
		padding: 0.5rem;
		line-height: 0;
	}

	.inviteCode {
		font-size: 1.5rem;
		position: relative;
		right: 6px
	}

	.mu-list {
		background: #f5f5f5;
		padding-top: 0;
	}
  .marginRight{
    margin-right: 0.5rem;
  }
  .sex {
    background: #FC7D7D;
    color: #fff;
    font-size: smaller;
    display: inline-block;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border-radius: 50%;
  }
	.level {
    /*background: linear-gradient(to right, #38E7F8 , #0BA5D7);*/
		color: #09a2d6;
    background: #fff;
		font-size: 1rem;
		border-radius: 10px;
		padding: 0 0.5rem;
		border: 1px solid #fff;
	}

	a:hover,
	a:focus {
		color: #23527c;
		text-decoration: none;
	}

	.mu-divider {
		background-color: #f5f5f5;
	}
  .list{
    margin:0 1rem;
    box-shadow: 0 0 0.5rem #EAF6FB;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #EAF6FB;
  }
	.mylist {
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
	}

	/*.mylist:nth-child(2) {*/
		/*padding-right: 2rem;*/
	/*}*/

	.mylist:nth-child(3),
	.mylist:nth-child(5) {
		margin-bottom: 0.7rem;
	}
</style>
