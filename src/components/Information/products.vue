<template>
	<div class="products">

		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
		</mu-appbar>

		<div class="contentMarginTop" @touchmove="touchMove()">
			<div>
				<div>
					<p class="media-heading">{{title}}</p>
					<p class="commodityPropaganda">{{source}}<span class="commodityPropaganda-span">{{published_at}}</span></p>
				</div>
				<div>
					<dl v-html="content">
						{{content}}
					</dl>
				</div>
				<!--<div>
					<div class="author">原作者:&nbsp;&nbsp;{{author}}</div>
					<div class="author">来源地址:&nbsp;&nbsp;{{url}}</div>
				</div>-->
			</div>
		</div>
		<div class="protext" @touchmove="touchMove()">
			<span><span class="spancolor">一</span> 最新评论区 <span class="spancolor">一</span> </span>
		</div>

		<div class="demo-text" v-if="active1 === 0">
			<div v-if="hasMessage" style="margin-top:1rem;padding:1rem 1rem 0;background: #fff" @touchmove="touchMove()">
				<mu-container ref="container" class="demo-loadmore-content" style="padding: 0">
					<mu-load-more :refreshing="refreshingMessage" :loading="loadingMessage" @load="loadMessage">
						<div class="media" v-for="(m,index) in message">
							<div class="flex">
								<div>
									<img class="media-object" :src="m.from_user_avatar" />
								</div>
								<div class="middle">
									<div class="media-heading">{{m.from_user}}</div>

									<div @click="getMessageId(index,m.id,m.from_user_uid)">{{m.content}}</div>
									<div class="panel-group" id="accordion">
										<div class="panel panel-default">
											<div class="panel-heading" style="background: #fff">
												<a>
													<h4 style="color: #666;font-size: small;width: 100%" class="panel-title">
                            {{m.created_at}}
                            <div class="interval">·</div>
                            <!--<a class="replyLength" data-toggle="collapse" data-parent="#accordion"  :href="m.href">-->
                            <div class="replyLength" v-if="m.reply.length===0" @click="getMessageId(index,m.id,m.from_user_uid)">
                              回复
                            </div>
                            <div class="replyLength" v-else @click="goComment(m.id)">
                              {{m.reply.length}} 回复
                            </div>
                            <!--</a>-->
                          </h4>
												</a>
											</div>

											<!--<div :id="m.item" v-show="!m.hasMsg" class="panel-collapse collapse in" style="background: #f5f5f5;min-width:100%;margin-bottom: 20px">-->
											<!--<div class="panel-body" v-for="(r,item) in m.reply" v-show="item < m.reply_num " style="border: none; padding:0.5rem 1rem;font-size: 1.5rem">-->
											<!--<span style="color: #09a2d6" @click="getUserId(item,m.id,r.from_user.uid)">{{r.from_user.nickname}}</span>-->
											<!--<span style="color: black"> 回复 </span>-->
											<!--<span style="color: #09a2d6" @click="getUserId(item,m.id,r.to_user.uid)">{{r.to_user.nickname}}</span>: {{r.content}}-->
											<!--</div>-->
											<!--<span v-if="m.reply.length > 3" @click="showMore(m)" class="glyphicon" style="color: #09a2d6" >{{m.reply_num == 3?'查看全部':'收起'}}</span>-->
											<!--</div>-->

										</div>
									</div>
								</div>
							</div>

							<div class="right">
								<img src="../../assets/images/zan.png" />
								<span>36</span>
							</div>

						</div>

					</mu-load-more>
				</mu-container>
				<div class="noMore" v-show="noMoreMessage">没有更多评论了</div>
			</div>

			<div v-else class="text-center" style="padding: 3rem 0;font-size: 1.6rem;color:#777">暂无评论</div>
			<div v-show="critichf" class="tardiv">
				<div class="comment">
					<mu-text-field solo v-model="reverts" placeholder="请输入回复内容" multi-line :rows="6" :max-length="60"></mu-text-field>
				</div>
				<button :disabled="!reverts" class="callBacks" @click="revert()">发送 </button>
			</div>
			<div v-show="criticxf" class="reply" id="nav1">
				<input v-show="criticxf" @click="criticMessage" v-model='critic' class="reply-input" placeholder="说出你的想法" />
				<img src="../../assets/images/pinglun.png" />
			</div>

			<div v-show="criticpl" class="tardiv" style="">
				<div class="comment">
					<mu-text-field v-model='critic' solo placeholder="说出你的想法" multi-line :rows="6" :max-length="60"></mu-text-field>
				</div>
				<button :disabled="!critic" class="callBacks" @click="leaveMessage">评论</button>
			</div>

		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	export default {
		name: "record",
		data() {
			return {
				title: '',
				source: '',
				published_at: '',
				content: '',
				url: '',
				author: '',
				masrc: back,
				hasMessage: false,
				active1: 0,
				message: [],
				refreshingMessage: false,
				loadingMessage: false,
				noMoreMessage: false,
				critic: '',
				id: '',
				uid: '',
				reverts: '',
				messageMsgShow: false,
				criticpl: false,
				criticxf: true,
				critichf: false,

				txt: '查看全部',
				num: 3,
				examine: false,

			}
		},
		mounted() {
			localStorage.removeItem("friend_uid");
      localStorage.removeItem("commentId");
			let that = this;
			mui.back = function() {
				that.$router.go(-1);
			};
			this.$nextTick(function() {
				this.gain();
			})
		},
		methods: {
			touchMove() {
				this.criticpl = false;
				this.criticxf = true;
				this.critichf = false;
			},
			showMore(item) {
				let length = item.reply.length;
				if(item.reply_num == 3) {
					item.reply_num = length;
				} else {
					item.reply_num = 3
				}
			},
			gain() {
				this.$http({
						method: "post",
						url: "/tasks/news-detail",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							"post_id": localStorage.getItem("post_id"),
						}
					}).then(function(res) {
						if(res.data.code === 0) {
							var content = res.data.data.content;
							this.title = res.data.data.title;
							this.source = res.data.data.source;
							this.published_at = res.data.data.published_at;
							this.url = res.data.data.url;
							this.author = res.data.data.author;
							this.content = content + '<style type="text/css">' +
								'img {max-width: 100%; }' +
								'<\/style>';

							if(res.data.data.length !== 0) {
								this.message = [];
								this.hasMessage = true;
								let data = res.data.data.comments;
								for(let i in data) {
									data[i].openMessage = false;
									if(data[i].reply.length !== 0) {
										data[i].hasMsg = true;
										data[i].item = 'item' + i;
										data[i].href = '#item' + i;
										this.message.push(data[i])
									} else {
										data[i].hasMsg = false;
										this.message.push(data[i])
									}
								}
							}
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			criticMessage() {
				this.criticxf = false;
				this.criticpl = true;
			},
			aaa() {
				this.criticxf = true;
				this.criticpl = false;
				this.critichf = !this.critichf;
			},
			leaveMessage() {
				let res = new RegExp("^[ ]+$");
				if(this.critic === '' || res.test(this.critic) === true) {
					this.$layer.msg("评论内容不能为空");
				} else {
					this.criticpl = false;
					this.$http({
							method: "post",
							url: "/tasks/news/comment",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								"post_id": localStorage.getItem("post_id"),
								message: this.critic
							}
						}).then(function(res) {
							this.critic = '';
							this.$layer.msg(res.data.msg);
							this.gain();
							if(res.data.code === 0) {

							}
						}.bind(this))
						.catch(function(err) {
							this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))
				}
			},
			revert() {
				let res = new RegExp("^[ ]+$");
				if(this.reverts === '' || res.test(this.reverts) === true) {
					this.$layer.msg("回复内容不能为空");
				} else {
					this.critichf = false;
					this.criticxf = true;
					this.$http({
							method: "post",
							url: "/tasks/news/reply",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								message_id: this.id,
								content: this.reverts,
								to_user_uid: this.uid,
							}
						}).then(function(res) {
							this.reverts = '';
							this.$layer.msg(res.data.msg);
							this.gain();
							if(res.data.code === 0) {

							}
						}.bind(this))
						.catch(function(err) {
							this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))
				}
			},
			getMessageId(index, id, uid) {
				this.critichf = !this.critichf;
				this.criticxf = !this.criticxf;
				this.criticpl = false;
				if(this.critichf && this.criticxf) {
					this.criticxf = false
				}
				this.id = id;
				this.uid = uid;
				this.message[index].openMessage = true;
			},
			getUserId(index, id, uid) {
				this.critichf = true;
				this.criticxf = false;
				this.id = id;
				this.uid = uid;
			},
			//			openLeaveMessage(index,mid,uid,reply) {
			//				console.log(mid);
			//				this.critichf = true;
			//				this.criticxf = false;
			//				if(reply){
			//					if(reply.length ==0){
			//						this.uid = mid;
			//					}else{
			//						if(uid){
			//							this.uid = uid
			//						}
			//
			//					}
			//				}else{
			//					if(uid){
			//						this.uid = uid
			//					}
			//				}
			//
			//			},
			closeLeaveMessage(index) {
				this.revert = '';
				this.messageMsgShow = false;
				this.message[index].openMessage = false;
			},

			loadMessage() {
				if(this.nextMessage === "") {
					this.loadingMessage = false;
					this.noMoreMessage = true;
				} else {
					//            this.loadingMessage = true;
					this.noMoreMessage = true;
				}
			},
      goComment(id){
        localStorage.setItem("commentId",id);
        this.$router.push('/comment')
      },

			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.tardiv {
		width: 100%;
		background: #F5F5F5;
		position: fixed;
		bottom: 0;
		padding: 1.2rem 1rem 0.8rem;
	}

	.media-body {
		padding-left: 4.5rem;
	}

	.contentMarginTop {
		margin-top: 56px;
	}

	.media {
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
	}

	.middle {
		margin-left: 15px;
	}

	.right img {
		width: 25px;
		vertical-align: top;
	}

	.panel-group {
		margin-bottom: 0;
	}

	.media-heading {
		font-size: 1.6rem;
		color: #09a2d6;
	}

	.media-left {
		position: absolute;
		border-radius: 50%;
	}

	.media-object {
		width: 3.1rem;
		border-radius: 50%;
	}

	a {
		color: #333;
	}

	.panel {
		box-shadow: none;
		border: none;
		background: #FAFAFA;
	}

	.panel-heading {
		padding-left: 0;
	}

	.panel-title {
		font-size: 1.5rem;
	}

	.leaveMessage {
		padding-left: 0;
	}

	.list:last-child .mu-divider {
		display: none;
	}

	.messageMsg {
		color: #ff2424;
		font-size: small;
	}

	.noMore {
		width: 100%;
		line-height: 4rem;
		color: #666;
		text-align: center;
		background: #fff;
		margin-top: -4rem;
	}

	.products {
		overflow-x: hidden;
		color: #444;
		background: #fff;
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		font-size: 1.6rem;
	}

	.products::-webkit-scrollbar {
		display: none;
	}

	.panel {
		border-radius: 0;
	}

	.contentMarginTop {
		padding: 1rem 1rem 2rem;
	}

	.commodityPropaganda {
		font-size: 1rem;
		color: #646464;
		text-align: left;
	}

	.commodityPropaganda-span {
		margin-left: 10%;
		font-size: 1rem;
		color: #646464;
	}

	p {
		color: #323232;
		font-size: 1.5rem;
	}

	.protext {
		text-align: center;
		letter-spacing: 0.05rem;
		background: #FFFFFF;
		color: #323232;
		font-size: 1.8rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
		border-top: 3px solid #F5F5F5;
	}

	.spancolor {
		color: #646464;
	}

	.reply {
		border-top: 1px solid #F5F5F5;
		width: 100%;
		position: fixed;
		bottom: 0;
		text-align: center;
		background: #fff;
	}

	.reply img {
		width: 2.5rem;
		margin-left: 0.5rem;
	}

	.reply-input {
		width: 80%;
		margin: 5px;
		height: 40px;
		background: #F5F5F5;
		padding: 0 10px;
		border: none;
		outline: none;
	}

	.mu-input {
		height: 3rem;
	}

	div.mu-input-line {
		background-color: transparent;
	}

	.demo-text {
		margin-bottom: 5rem;
	}

	.callBack {
		height: 4rem;
		line-height: 4.5rem;
		border: solid 1px #23C8E8;
		width: 5rem;
		position: fixed;
		margin: 0.3rem;
		bottom: 0;
		margin-right: 8px;
	}

	.callBacks {
		float: right;
		width: 50px;
		border: none;
		color: #FFFFFF;
		background: linear-gradient(to right, #38E7F8, #0BA5D7);
	}

	.callBacks:disabled {
		background: #D9D9D9;
	}

	.interval {
		display: inline-block;
		font-weight: bold;
		margin: 0 0.5rem;
		color: #888;
	}

	.replyLength {
		display: inline-block;
		background: #F5F5F5;
		border-radius: 10px;
		padding: 3px 10px;
	}

	.comment {
		background: #fff;
		padding: 0.8rem 1rem;
	}

	.flex {
		display: flex;
	}
</style>
<style lang="less">
	.comment {
		.mu-text-field-input {
			margin: 0;
		}
	}
</style>
