<template>
    <div class="content">
      <div id="navTopMargin" style="background: #eee;"></div>
      <div class="panel panel-default BlackTitle" style="background: #eee;">
        <div class="panel-body">
          新闻资讯
        </div>
      </div>
      
      
      <div class="media" v-for="(goods,index) in press">
        <div @click="sendParams(goods.id)" >
          <div class="media-left">
            <img class="media-object" :src="goods.image" alt="...">
          </div>
          <div class="media-body">
            <p class="media-heading">{{goods.title}}</p>
            <p class="commodityPropaganda">{{goods.source}}<span style="margin-left: 20%;">{{goods.published_at}}</span></p>
            <div ></div>
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
//        	doman:doman,
            press:[]
          }
        },
      mounted(){
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
        }
        
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #444;
    padding-bottom: 6rem;
    background: #fff;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    font-size: 1.6rem;
  }
  .content::-webkit-scrollbar{
    display: none;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 1rem;
    background: #fff;
    color: #333;
  }
  .BlackTitle{
    text-align: center;.
    letter-spacing: 0.05rem;
    background: #fff;
    font-size: 1.8rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .media{
    padding: 1rem 1rem 1rem;
    margin: 0;
    border-bottom: 0.1rem solid #f5f5f5;
    background: #fff;
  }

  @media screen and (min-width: 300px) and (max-width: 350px) {
    .media-left img{
      width: 9rem;
      height: 9rem;
      margin-right: 1rem;
    }
  }

  @media screen and (min-width: 350px) and (max-width: 2000px) {
    .media-left img{
      width: 11rem;
      height: 11rem;
      margin-right: 1rem;
    }
  }

  .media-heading{
    /*width: 50vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;word-wrap: break-word;
    color: #222;
    font-weight: 400;*/
    font-size: 16px;
    overflow: hidden;
    color: #323232;
  }
  .media-body{
    position: relative;
  }
  .commodityPropaganda{
    font-size: small;
    height: 3.5rem;
    overflow: hidden;
    color: #555;
    /*width: 50vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;word-wrap: break-word;*/
  }
  .commodityPrice{
    color: #09a2d6;
  }
  .goodsMessage{
    font-size: small;
  }
  .enchangeBtn{
    float: right;
    border-radius: 3px;
    background: #fff;
    border: 1px solid #09a2d6;
    color: #09a2d6;
    padding: 0.5rem;
    margin-top: -1.5rem;
    box-shadow: none;
    outline: none;
  }
  .enchangeBtnEnd{
    float: right;
    border-radius: 3px;
    background: #f5f5f5;
    box-shadow: none;
    outline: none;
  }
</style>
