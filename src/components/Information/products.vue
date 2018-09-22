<template>
	<div class="products">

		<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
		</mu-appbar>

		<div class="contentMarginTop" >
			<div >
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
					<span class="author">原作者:&nbsp;&nbsp;&nbsp;&nbsp;{{author}}</span><br />
					<span class="author">来源地址:&nbsp;&nbsp;&nbsp;&nbsp;{{url}}</span>
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
									<img class="media-object" :src="img" />
								</div>
								<div class="media-body">
									<h4 class="media-heading">{{m.from_user}}</h4>
									<div style="color: #666;font-size: small;width: 100%" class="stealerTitle">{{m.created_at}}</div>

								</div>
								<div class="panel-group" id="accordion">
									<div class="panel panel-default">
										<div class="panel-heading" style="background: #fff">
											<a data-toggle="collapse" data-parent="#accordion" :href="m.href">
												<h4 class="panel-title"> {{m.content}} <span class="glyphicon glyphicon-chevron-down" style="color: #999" v-show="m.hasMsg"></span> </h4> </a>
										</div>
										<div :id="m.item" v-show="m.hasMsg" class="panel-collapse collapse in" style="background: #f5f5f5;min-width:100%">
											<div class="panel-body" v-for="(r,item) in m.reply" style="border: none;padding:0.5rem 1rem;font-size: 1.5rem"><span style="color: #09a2d6">我</span>：{{r[1]}}</div>
										</div>
									</div>
								</div>
							</div>
						</mu-load-more>
					</mu-container>
					<div class="noMore" v-show="noMoreMessage">没有更多信息了</div>
				</div>

				<div v-else class="text-center" style="padding: 3rem 0;font-size: 1.6rem;color:#777">暂无评论</div>
			</div>
	</div>

	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	 import img from '@/assets/images/test/timg.jpg'
	export default {
		name: "record",
		data() {
			return {
				title:'',
				source:'',
				published_at:'',
				img:img,
				content:'',
				url:'',
				author:'',
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
				leavemessage: '',
				messageMsg: '',
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
			gain(){
            this.$http({
              method: "post",
              url: "/tasks//news-detail",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                "post_id": localStorage.getItem("post_id"),
              }
            }).then(function(res) {
              //偷取数量
              if(res.data.code===0){
                this.title = res.data.data.title;
                this.source = res.data.data.source;
                this.published_at = res.data.data.published_at;
                this.content = res.data.data.content;
                this.url = res.data.data.url;
                this.author = res.data.data.author;
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
			loadMessage(){
            if(this.nextMessage===""){
              this.loadingMessage = false;
              this.noMoreMessage=true;
            }else {
              this.loadingMessage = true;
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
	.visitor {
		text-align: center;
		padding: 1.2rem 0.5rem;
	}
	
	.visitor img {
		width: 100%;
		border-radius: 50%;
	}
	
	.stealerTitle {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-wrap: break-word;
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
	
	.BlackTitle {
		text-align: left;
		letter-spacing: 0.05rem;
		background: #09a2d6;
		color: #fff;
		font-size: 1.8rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
		border: 0;
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
		font-size: 1rem;
	}
	
	.contentBody {
		margin: 1rem 1rem;
		box-shadow: 2px 2px 10px #E3EFF3;
	}
	.protext{
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
	.spancolor{
		color: #646464;
	}
</style>