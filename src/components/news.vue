<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers"  @touchend="lat" class="back"> <img :src="masrc"/></span> 消息
			</div>
		</div>
		<div v-if="newsNone" class="newsNone">
			<img :src="newsNoneImg" />
			<p>暂时还没有消息哦</p>
		</div>

		<div class="media" v-for="n in news" v-else>
			<div class="media-left">
				<span class="badge msg" v-show="!n.msg.is_read">·</span><img class="media-object" :src="n.msg.img">
			</div>
			<div class="media-body">
				<h4 class="media-heading">{{n.msg.title}} <span class="time">{{n.msg.created_at}}</span></h4> {{n.msg.content}}

			</div>
		</div>
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
				newsId: '',
				news: [],
				mobile: {
					id: '',
					msg: {
						img: '',
						title: '',
						content: '',
						create_at: '',
						is_read: ''
					}
				}
			}
		},
		mounted() {
			this.$http({
					method: "post",
					url: "/messages/box",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {
					if(res.data.code == 0) {
						if(res.data.count == 0) {
							this.newsNone = true;
						} else {
							this.newsNone = false;
							for(let n in res.data.data) {
								this.newsId = n;
								console.log(res.data.data[n])
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
									}
								};
							}
							console.log(res.data)
						}

					} else {
						this.newsNone = true;
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					this.newsNone = true;
					this.$layer.msg(err)
				}.bind(this));
		},
		methods: {
			evers() {
				console.log(1)
				this.masrc = backs;
			},
			lat() {
				console.log(2)
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

</style>
    <div class="media" v-for="(n,index) in news" v-else @click="delShow(index)"  @touchstart='touchStart' @touchmove='touchMove($event,index)' @touchend='touchEnd'>
      <div class="media-left">
        <span class="badge msg" v-show="!n.msg.is_read">·</span><img class="media-object" :src="n.msg.img">
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{n.msg.title}} <span class="time">{{n.msg.created_at}}</span></h4>
       {{n.msg.content}}

      </div>
      <transition name="slide-fade">
        <p v-if="n.show" class="del" :id="n.id" @click="del($event,index)">删除</p>
      </transition>
    </div>
  </div>
</template>

<script>
    import friend from '@/assets/images/friend.png'
    import newsNoneImg from '@/assets/images/nomessage.png'
    export default {
        name: "news",
        data(){
          return{
            newsNone:true,
            newsNoneImg:newsNoneImg,
            news:[],
            mobile :{
              show:false,
              mobileId:'',
              id:'',
              msg:{
                img:'',
                title:'',
                content:'',
                create_at:'',
                is_read:''
              }
            },
            isShow:false,
            startX:0,//开始触摸的位置
            moveX:0,//滑动时的位置
            disX:0//移动距离
          }
        },
        mounted(){
          this.$http({
            method: "post",
            url: "/messages/box",
            headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            data: {}
          }).then(function(res){
            if(res.data.code==0){
                console.log(res.data)
                this.newsNone = false;
                let i = 1;
                for(let n in res.data.data){

                  this.mobile.mobileId = n;
                  this.mobile.id = 'myId'+i;
                  this.mobile.msg = res.data.data[n];
                  this.mobile.msg.img=friend;
                  this.news.push(this.mobile);
                  this.mobile = {
                    show:false,
                    id:'',
                    msg:{
                      img:'',
                      title:'',
                      content:'',
                      create_at:'',
                      is_read:''
                    }
                  };
                  i++
                }


            }else {
              this.newsNone = true;
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              this.newsNone = true;
              this.$layer.msg(err)
            }.bind(this));

        },
        methods: {
          goBack() {
            this.$router.go(-1);
          },
          delShow(i){
            this.$router.push({
              path: '/newsdetails',
              name: 'NewsDetails',
              params: {
                name: 'name',
                dataObj: this.news[i].mobileId

              }
            })
          },
          touchStart:function(ev) {
            ev = ev || event;
            ev.preventDefault();
//                      console.log(ev.targetTouches);
//                      console.log(ev.changedTouches);
            if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
              this.startX = ev.touches[0].clientX; // 记录开始位置
            }
          },
          touchMove:function(ev,i) {
            ev = ev || event;
            ev.preventDefault();
            const that = this;
            if(ev.touches.length == 1) {
              //滑动时距离浏览器左侧的距离
              that.moveX = ev.touches[0].clientX;

              //实时的滑动的距离-起始位置=实时移动的位置
              that.disX = that.moveX-that.startX;
              if(that.disX<0){
                that.news[i].show = true
              }else {
                that.news[i].show = false
              }
            }
          },
          touchEnd:function(ev){
            ev = ev || event;
            ev.preventDefault();
          },
          del(e,index){
            e.stopPropagation();
            this.news.splice(index,1)
          }

        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #666;
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    width: 100vw;
    overflow: hidden;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .media{
    background: #fff;
    margin-top: 0;
    padding: 1rem;
    border-bottom: 0.1rem solid #f5f5f5;
  }

  .media-left img{
    border: 0.1rem solid #09a2d6;
    border-radius: 50%;
    width: 4rem;
    margin-right: 0.5rem;
  }
  .media-body{
    vertical-align: middle;
  }
  .media-heading{
    color: #555;
  }
  .time{
    float: right;
    font-size: xx-small;
    margin-right: 1rem;
    color: #777;
  }
  .newsNone{
    text-align: center;
    padding-top: 18vh;
    color: #999;
  }
  .newsNone img{
    width: 40%;
    margin-bottom: 1rem;
  }
  .msg{
    position: absolute;
    left: 0;
    color: #ff2424;
    background: transparent;
    font-size: xx-large;
    padding: 0;
    line-height: 0;
  }
  .del{
    background: #ff2424;
    color: #fcf8e3;
    width: 6rem;
    height: 6rem;
    line-height: 6rem;
    text-align: center;
    position: absolute;
    right: 0rem;
    margin-top: -5rem;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
