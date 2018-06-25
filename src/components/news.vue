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
          <img class="media-object" :src="n.img">
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{n.title}} <span class="time">{{n.time}}</span></h4>
       {{n.content}}

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
            news:[
              {img:friend,title:'星海行动',content:'今天任务还没做完，赶紧去做任务领',time:'6小时前'},
              {img:friend,title:'星海行动',content:'今天任务还没做完，赶紧去做任务领',time:'6小时前'},
              {img:friend,title:'星海行动',content:'今天任务还没做完，赶紧去做任务领',time:'6小时前'}
            ]
          }
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
</style>
