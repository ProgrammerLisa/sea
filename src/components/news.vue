<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        消息
      </div>
    </div>
    <div v-if="newsNone" class="newsNone">
      <img :src="newsNoneImg"/>
      <p>暂时还没有消息哦</p>
    </div>

    <div class="media" v-for="n in news" v-else>
      <div class="media-left">
        <span class="badge msg" v-show="!n.msg.is_read">·</span><img class="media-object" :src="n.msg.img">
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{n.msg.title}} <span class="time">{{n.msg.created_at}}</span></h4>
       {{n.msg.content}}

      </div>
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
            newsId:'',
            news:[],
            mobile :{
              id:'',
              msg:{
                img:'',
                title:'',
                content:'',
                create_at:'',
                is_read:''
              }
            }
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
              if(res.data.count==0){
                this.newsNone = true;
              }else {
                this.newsNone = false;
                for(let n in res.data.data){
                  this.newsId = n;
                  console.log(res.data.data[n])
                  this.mobile.msg = res.data.data[n];
                  this.mobile.msg.img=friend;
                  this.news.push(this.mobile);
                  this.mobile = {
                    id:'',
                    msg:{
                      img:'',
                      title:'',
                      content:'',
                      create_at:'',
                      is_read:''
                    }
                  };
                }
                console.log (res.data)
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
        methods:{
          goBack(){
            this.$router.go(-1);
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
</style>
