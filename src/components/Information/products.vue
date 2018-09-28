<template>
	<div class="products">

		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
		</mu-appbar>

		<div class="contentMarginTop">
			<div>
				<div class="media-body">
					<p class="media-heading">{{title}}</p>
					<p class="commodityPropaganda">{{source}}<span class="commodityPropaganda-span">{{published_at}}</span></p>
				</div>
				<div>
					<dl v-html="content">
					  {{content}}
					 </dl>
        </div>
				<div>
					<div class="author">原作者:&nbsp;&nbsp;{{author}}</div>
					<div class="author">来源地址:&nbsp;&nbsp;{{url}}</div>
				</div>
			</div>
		</div>
		<div class="protext">
			<span><span class="spancolor">一</span> 最新评论区 <span class="spancolor">一</span> </span>
		</div>

		<div class="demo-text" v-if="active1 === 0">
			<div v-if="hasMessage" style="margin-top:1rem;padding:1rem 1rem 0;background: #fff">
				<mu-container ref="container" class="demo-loadmore-content" style="padding: 0">
					<mu-load-more :refreshing="refreshingMessage" :loading="loadingMessage" @load="loadMessage">
						<div class="media" v-for="(m,index) in message">
							<div class="media-left">
								<img class="media-object" :src="m.from_user_avatar" />
							</div>
							<div class="media-body">
								<h4 class="media-heading">{{m.from_user}}</h4>
								<div style="color: #666;font-size: small;width: 100%" class="stealerTitle">{{m.created_at}}</div>

							</div>
							<div class="panel-group" id="accordion">
								<div class="panel panel-default">
									<div class="panel-heading" style="background: #fff">
										<a data-toggle="collapse" data-parent="#accordion" :href="m.href">
											<h4 class="panel-title" @click="openLeaveMessage(index)"> {{m.content}} </h4><span class="glyphicon glyphicon-chevron-down" style="color: #999" v-show="m.hasMsg"></span>  </a>
									</div>
									<div :id="m.item" v-show="m.hasMsg" class="panel-collapse collapse in" style="background: #f5f5f5;min-width:100%">
										<!--<div class="panel-body" v-for="(r,item) in m.reply" style="border: none; padding:0.5rem 1rem;font-size: 1.5rem"><span style="color: #09a2d6">{{r.from_user}}</span>：{{r.content}}</div>-->
										<div class="panel-body" v-for="(r,item) in m.reply" style="border: none; padding:0.5rem 1rem;font-size: 1.5rem"><span style="color: #09a2d6">{{r.from_user}}</span><span style="color: black"> 回复 </span><span style="color: #09a2d6">{{m.from_user}}</span>: {{r.content}}</div>
									</div>
								</div>
							</div>

							<div class="media-right leaveMessage">
								<mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="m.openMessage">
									<div class="publicDialogTitle" style="height: 110px;padding-top: 1rem">
										<mu-text-field type="text" label="回复评论" v-model="reverts" placeholder="请输入回复内容" full-width style="margin-bottom: 0;"></mu-text-field>
										<mu-slide-top-transition v-show="messageMsgShow">
											<div class="mu-transition-box mu-inverse" style="color: #EF5350;font-size: small" v-show="messageMsgShow">{{messageMsg}}</div>
										</mu-slide-top-transition>
									</div>

									<mu-button slot="actions" flat color="primary" @click="revert(index,m.id)">发送 </mu-button>
									<mu-button slot="actions" flat color="#555" @click="closeLeaveMessage(index)">取消</mu-button>

								</mu-dialog>
							</div>

						</div>

					</mu-load-more>
				</mu-container>
				<div class="noMore" v-show="noMoreMessage">没有更多评论了</div>
			</div>

			<div v-else class="text-center" style="padding: 3rem 0;font-size: 1.6rem;color:#777">暂无评论</div>

			<mu-appbar class="reply" color="#fff" textColor="#333" z-depth="0" id="nav1">
				<mu-text-field v-model='critic' class="reply-input" underline-color="none" placeholder="说出你的想法" />
				<mu-button color="#fff" textColor="#09a2d6" @click="leaveMessage" flat class="callBack">评论</mu-button>
			</mu-appbar>

		</div>
		<!--<mu-appbar class="reply" color="#fff" textColor="#333" z-depth="0" id="nav1" >
			<mu-text-field v-model='critic' class="reply-input" underline-color="none" placeholder="说出你的想法" />
			<mu-button color="#fff" textColor="#09a2d6" @click="leaveMessage(index,m.post_id)" flat class="callBack">评论</mu-button>
		</mu-appbar>-->
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
				open: '',
				visitor: [],
				stolens: [],
				steals: [],
				message: [],
				refreshingSteal: false,
				loadingSteal: false,
				refreshingStolen: false,
				loadingStolen: false,
				refreshingMessage: false,
				loadingMessage: false,
				noMoreSteal: false,
				noMoreStolen: false,
				noMoreMessage: false,
				messageMsg: '',
				critic: '',

				reverts: '',
				messageMsgShow: false,
			}
		},
		mounted() {
			localStorage.removeItem("friend_uid");
			let that = this;
			mui.back = function() {
				that.$router.go(-1);
			};
			this.$nextTick(function() {
				this.gain();
			})
		},
		methods: {

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
              var content=res.data.data.content;
							this.title = res.data.data.title;
							this.source = res.data.data.source;
							this.published_at = res.data.data.published_at;
							this.url = res.data.data.url;
							this.author = res.data.data.author;
              this.content = content+'<style type="text/css">' +
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

			leaveMessage() {
				let res = new RegExp("^[ ]+$");
				if(this.critic === '' || res.test(this.critic) === true) {
					this.$layer.msg("评论内容不能为空");
				} else {
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
			revert(index, id) {
				let res = new RegExp("^[ ]+$");
				if(this.reverts === '' || res.test(this.reverts) === true) {
					this.$layer.msg("回复内容不能为空");
				} else {
					this.$http({
							method: "post",
							url: "/tasks//news/reply",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								message_id: id,
								content: this.reverts
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
			openLeaveMessage(index) {
				this.message[index].openMessage = true;
			},
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
	.contentMarginTop {
		margin-top: 56px;
	}
	#accordion {
		margin-left: 4rem;
	}

	.media {
		border-bottom: 1px solid #eee;
	}

	.media-heading {
		font-size: 1.6rem;
		color: #3c3c3c;
	}

	.media-left {
		border-radius: 50%;
		width: 6rem;
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

	.panel-body {
		padding: 0 10px;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.contentMarginTop {
		padding: 1rem 1rem 2rem;
	}

	.media-heading {
		font-weight: bold;
		font-size: 2rem;
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

	.Topstarnews-img {
		width: 100%;
		padding: 1rem 0rem 1rem;
	}

	.author {
		color: #646464;
		font-size: 1.5rem;
		width: 100%;
		word-wrap: break-word;
		display:block;
		word-break: break-all;
	}

	.glyphicon{
		float: right;
		margin-top: -1.1rem;
	}

	.contentBody {
		margin: 1rem 1rem;
		box-shadow: 2px 2px 10px #E3EFF3;
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
		border-top: 1rem solid #F5F5F5;
	}

	.spancolor {
		color: #646464;
	}

	.reply {
		border-top: 1px solid #F5F5F5;
		width: 100%;
		/*padding: 4px;*/
		position: fixed;
		bottom: 0;
	}

	.reply-input {
		/*padding-bottom: 0px;
	    padding-top: 0px;
	    margin-bottom: 3px;*/
		/*border: 1px solid black;*/
		margin: 5px;
		background: #F5F5F5;
		padding: 0px;
	}

	.mu-input {
		height: 3rem;
	}

	.mu-text-field-input {
		margin: 0;
	}
	div.mu-input-line {
		background-color: none;
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
</style>
