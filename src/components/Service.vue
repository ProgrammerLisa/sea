<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <router-link to="/Personal" tag="span" class="back"> <img src="../assets/images/back.png"/></router-link>
        客服中心
       </div>
    </div>

    <!--对话框-->
    <div class="media" v-for="s in Service">
      <div class="media-left" v-if="s.isOfficial">
          <img class="media-object" :src="s.img"  alt="...">
      </div>
      <div class="media-body">
        <span class="serviceContent" v-bind:style="s.DialogStyle">
           {{s.Dialog}}
        </span>
      </div>
      <div class="media-right" v-if="s.isMyself">
        <img class="media-object" :src="s.img"  alt="...">
      </div>
    </div>
  </div>
</template>

<script>
    import ServiceHeadImg from '@/assets/images/friend.png'
    export default {
        name: "Service",
        data(){
          return{
            Service:[
              {img:ServiceHeadImg,DialogStyle:'',Dialog:'Hi~ 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊有什么问题都可以问我哟~',isOfficial:true,isMyself:false},
              {img:ServiceHeadImg,DialogStyle:'',Dialog:'好的好的 ',isOfficial:false,isMyself:true},
              {img:ServiceHeadImg,DialogStyle:'',Dialog:'一定要哦',isOfficial:true,isMyself:false},
              {img:ServiceHeadImg,DialogStyle:'',Dialog:'。。。 ',isOfficial:false,isMyself:true},
              {img:ServiceHeadImg,DialogStyle:'',Dialog:'emmm....嗯 ',isOfficial:false,isMyself:true}

            ]
          }
        },
        mounted(){
          const that = this;
          for (var i=0;i<that.Service.length;i++){
            if( that.Service[i].isMyself){
              that.Service[i].DialogStyle = 'border-bottom-right-radius:1rem;float:right'
            }else {
              that.Service[i].DialogStyle = 'border-bottom-left-radius:1rem;'
            }

          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #777;
    padding-bottom: 6rem;
    background-color: #f5f5f5;
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
    font-size: 1.8rem;
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
    padding: 1rem 1rem 0 1rem;
    margin: 0;
  }
  .media-object{
    background: #fff;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  .media-body{
    vertical-align: middle;
  }
  .serviceContent{
    background: #fff;
    padding: 0.8rem 1.5rem;
    border-radius: 0.4rem ;
    border-top-left-radius:0;
    display: inline-block;
    max-width: 70%;
  }
</style>
