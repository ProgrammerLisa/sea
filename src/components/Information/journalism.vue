<template>
    <div class="content">
      <div class="text-center navTop">
        <span class="navTitle">新闻资讯</span>
        <mu-icon size="30" value="search" class="navIcon" @click="goSearch"></mu-icon>
      </div>

      <div>
        <div class="list" v-for="(goods,index) in press" @click="sendParams(goods.id)">
          <img :src="goods.image" class="image"/>
          <div class="list-item">
            <div class="title">{{goods.title}}</div>
            <div class="footer">
              <div class="listlabel">{{goods.source}}</div>
              <div class="prominent">推荐</div>
              <div class="time">{{goods.published_at}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import doman from '@/assets/images/test/timg.jpg'
    import commodityImg from '@/assets/images/bg.png'
    export default {
        name: "journalism",
        data(){
          return{
          	doman:doman,
            list:[1,2,3,1,4,4],
            press:[]
          }
        },
      mounted(){
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
			this.message();
        })

      },
      methods:{
      	message(){
            this.$http({
              method: "post",
              url: "/tasks/news",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              if(res.data.code === 0) {
              this.titles = res.data.title;
              if(res.data.data.items.length>0){
                this.press=res.data.data.items;
              }
            }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
        sendParams(id){
        	this.$router.push({path: '/products'})
        	localStorage.setItem("post_id",id);
        },
        goSearch(){
          this.$router.push('/journalismsearch')
        }

      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #444;
    padding-bottom: 6rem;
    background: #f5f5f5;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    font-size: 1.5rem;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .navTop{
    height:50px;line-height: 50px;background: #fff;font-weight: bold;padding: 0 1rem;
  }
  .navTitle{
    font-size: 1.7rem;letter-spacing: 2px;margin-left: 30px;
  }
  .navIcon{
    float: right;margin-top: 10px;
  }
  .list{
    padding: 1rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
  .list .image{
    width: 9rem;
    height: 100%;
    margin-right: 1rem;
  }
  @media screen and (min-width: 300px) and (max-width: 350px) {
    .list .image{
      width: 7rem;
    }
  }
  .list .list-item{
    position: relative;
  }
  .list-item .title{
    color: #323232;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .list-item .footer{
    width: 100%;
    color: #646464;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    font-size: small;
  }
  .list-item .listlabel{

  }
  .list-item .prominent{
    border: 1px solid #25CBEA;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #09a2d6;
  }
  .list-item .time{

  }
</style>
