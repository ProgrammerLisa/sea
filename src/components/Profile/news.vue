<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">消息</span>
    </mu-appbar>
		<div v-if="newsNone" class="newsNone">
			<img :src="newsNoneImg" />
			<p>暂时还没有消息哦</p>
		</div>



    <mu-paper :z-depth="0" class="demo-list-wrap"  v-else>
      <mu-list textline="two-line">
        <div v-for="(n,index) in news" :key="index" @touchstart="touchStart($event,index)" @touchmove="touchMove($event,index)" @touchend="touchEnd($event,index)" :data-curid="n.id">
          <mu-list-item avatar button >
             <mu-list-item-content>
                  <mu-list-item-title>{{n.msg.title}}</mu-list-item-title>
                  <mu-list-item-sub-title>
                    {{n.msg.content}}
                  </mu-list-item-sub-title>
                </mu-list-item-content>
                <mu-list-item-action >
                  <mu-list-item-after-text>{{n.msg.created_at}}</mu-list-item-after-text>
                </mu-list-item-action>
            </mu-list-item>
            <div class="media-right" >
              <span class="badge msg" v-show="!n.msg.is_read">·</span>
            </div>
            <transition name="slide-fade">
              <div class="del"　v-if="n.show" @click="del(index)">
                删除
              </div>
            </transition>
          </div>
        <mu-divider></mu-divider>
      </mu-list>
    </mu-paper>
	</div>
</template>

<script>
	import friend from '@/assets/images/friend.png'
	import newsNoneImg from '@/assets/images/nomessage.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "news",
		data() {
			return {
				masrc: back,
				newsNone: true,
				newsNoneImg: newsNoneImg,
				news: [],
				mobile: {
					id: '',
					msg: {
						img: '',
						title: '',
						content: '',
						create_at: '',
						is_read: ''
					},
					show: false,
				},

				startX: 0, //开始触摸的位置
				moveX: 0, //滑动时的位置
				endX: 0, //结束触摸的位置
				disX: 0, //移动距离
			}
		},
		mounted() {
      this.newsList();
		},
		methods: {
		  newsList(){
        this.$http({
          method: "post",
          url: "/messages/box",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            "page":1
          }
        }).then(function(res) {
          if(res.data.code == 0) {
            if(JSON.stringify(res.data.data) == "{}") {
              this.newsNone = true;
            } else {
              this.newsNone = false;
              for(let n in res.data.data) {
                this.mobile.id = n;
                this.mobile.msg = res.data.data[n];
                this.mobile.msg.img = friend;
                this.news.push(this.mobile);
                this.mobile = {
                  id: '',
                  msg: {
                    img: '',
                    title: '',
                    content: '',
                    create_at: '',
                    is_read: ''
                  },
                  show: false,
                };

              }
            }

          } else {
            this.newsNone = true;
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err) {
            this.newsNone = true;
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
			newsDetails(index) {
				this.$router.push({
					path: '/newsdetails',
					name: 'NewsDetails',
					params: {
						name: 'name',
						dataObj: this.news[index].id

					}
				})
			},
			touchStart(ev,index) {
				ev = ev || event;
				ev.preventDefault();
				//                      console.log(ev.targetTouches);
				//                      console.log(ev.changedTouches);
				if(ev.touches.length == 1) { //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
					this.startX = ev.touches[0].clientX; // 记录开始位置
          this.disX=0;
				}
				console.log(1)
			},
			touchMove(ev, index) {
				ev = ev || event;
				ev.preventDefault();
				if(ev.touches.length == 1) {
					//滑动时距离浏览器左侧的距离
					this.moveX = ev.touches[0].clientX;

					//实时的滑动的距离-起始位置=实时移动的位置
					this.disX = this.moveX - this.startX;
					if(this.disX < -50) {
						for(var i in this.news) {
							if(ev.currentTarget.dataset.curid == this.news[i].id) {
								this.news[i].show = true
							} else {
								this.news[i].show = false
							}
						}
					} else if(this.disX > 0) {
						for(var i in this.news) {
							if(ev.currentTarget.dataset.curid == this.news[i].id) {
								this.news[i].show = false
							}
						}
					}
				}
			},
			del(index) {
				this.$http({
						method: "post",
						url: "/messages/delete",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							mid: this.news[index].id
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							this.$layer.msg(res.data.msg);
              this.news.splice(index,1);
              if(this.news.length===0){
                this.newsNone=true
              }
						}
					}.bind(this))
					.catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));

			},
			touchEnd(ev,index) {
		    if(this.news[index].show){
          if($(window).innerWidth()-$(".del").width()>this.startX&&this.disX==0){
            this.newsDetails(index)
          }
        }else {
          if(this.disX==0){
            this.newsDetails(index)
          }
        }

        ev = ev || event;
        ev.preventDefault();


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
	.content {
		overflow-x: hidden;
		color: #666;
		padding-bottom: 6rem;
		background-color: #f5f5f5;
		width: 100vw;
		position: fixed;
		top: 0;
		overflow: hidden;
	}

	.back img {
		height: 2.5rem;
	}

	.media-left img {
		border: 0.1rem solid #09a2d6;
		border-radius: 50%;
		width: 4rem;
		margin-right: 0.5rem;
	}

	.newsNone {
		text-align: center;
		padding-top: 18vh;
		color: #999;
	}

	.newsNone img {
		width: 40%;
		margin-bottom: 1rem;
	}
  .demo-list-wrap{
    margin-top: 0.6rem;
    border-bottom: 1px #eee solid;
  }
  .mu-list{
    padding: 0;
  }
	.msg {
    position: absolute;
    right:0.5rem;
    margin-top: 1rem;
		color: #ff2424;
		background: transparent;
		font-size: xx-large;
		padding: 0;
		line-height: 0;
	}

	.del {
		background: #ff2424;
		color: #fcf8e3;
		width: 6rem;
		line-height: 6rem;
		text-align: center;
		position: absolute;
		right: 0;
		margin-top: -6rem;
    z-index: 999;
	}
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateX(10px);
		opacity: 0;
	}

	.msgContent {}

	.msgContent {
		position: relative;
		line-height: 1.4em;
		/* 3 times the line-height to show 3 lines */
		height: 1.4em;
		overflow: hidden;
	}

	.msgContent::after {
		content: "...";
		font-weight: bold;
	}
</style>
