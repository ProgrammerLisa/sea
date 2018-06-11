<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
          我的好友
          <router-link to="/addfriends" tag="span" class="addTo"> <img src="../assets/images/award.png"/></router-link>
        </div>
      </div>
      <div class="media friends" v-for="f in friends">
        <div class="media-left">
            <img class="media-object" :src="f.headPortrait"  alt="...">
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{f.friendName}}<span class="sex" v-bind:style="f.bcColor">{{f.sex}}</span></h4>
          ID：{{f.friendId}}
        </div>
      </div>
    </div>
</template>

<script>
    import headImg from '@/assets/images/friend.png'
    export default {
        name: "friend",
        data(){
          return{
            friends:[
              {headPortrait:headImg,friendName:'小红花',friendId:'123456789',sex:'♀',bcColor:'background: #FC8484;'},
              {headPortrait:headImg,friendName:'小红花',friendId:'123456789',sex:'♂',bcColor:'background: #5CB3FC;'}
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
  .addTo{
    float: right;
  }
  .addTo img{
    height: 2.5rem;
  }
  .friends{
    background: #fff;
    margin-top: 0;
    border-bottom: 0.1rem solid #f5f5f5 ;
    padding: 1rem;
  }
  .media-heading {
    margin-top: 0.3rem;
    margin-bottom: 5px;
    font-size: 1.6rem;
  }
  .media-left img{
    border: 0.1rem solid #09a2d6;
    border-radius: 50%;
    width: 4rem;
    margin-right: 0.5rem;
  }
  .sex{
    color: #fff;
    border-radius: 50%;
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    font-size: xx-small;
    text-align: center;
    margin: 0 1rem ;
    vertical-align: top;
  }
</style>
