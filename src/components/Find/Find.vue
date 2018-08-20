<template>
    <div class="content">
      <div id="navTopMargin" style="background: #eee;"></div>
      <div class="panel panel-default BlackTitle" style="background: #eee;">
        <div class="panel-body shoppingPanel">
          发现
        </div>
      </div>
      <div class="TitleImg">
        <img src="../../assets/images/banner.png"/>
      </div>
      <div class="panel panel-default task">
        <div class="panel-body">
          <span class="glyphicon glyphicon-minus decorate"></span>基础任务
        </div>
      </div>
        <div class="task1">
          <div class="taskList">
            <span class="glyphicon glyphicon-link taskIcon"></span>
            <div class="taskTitle">邀请10名好友</div>
            <div class="taskBody">邀请好友+10能量</div>
            <div class="taskBtn">+5能量</div>
          </div>
          <div class="taskList">
            <span class="glyphicon glyphicon-globe taskIcon"></span>
            <div class="taskTitle">公益慈善</div>
            <div class="taskBody">爱心捐助+10能量</div>
            <router-link to="/publicgood" tag="div" class="taskBtn">+10能量</router-link>
          </div>

          <div class="taskListLast taskList">
            <span class="glyphicon glyphicon-calendar taskIcon"></span>
            <div class="taskTitle">每日登录</div>
            <div class="taskBody">登录获取能量值</div>
            <div class="taskSuccess" v-show="signIn"><span class="glyphicon glyphicon-ok"></span> 已完成</div>
            <div class="taskBtn" v-show="!signIn" @click="signInFc">+1能量</div>
          </div>
        </div>
      <div id="time" style="display: none">{{time | formatDate}}</div>


    </div>
</template>

<script>
  import {formatDate} from "../../assets/js/date";

  export default {
        name: "GetForce",
        filters:{
          formatDate(time){
            let data = new Date(time);
            return formatDate(data,'yyyy-MM-dd hh:mm:ss')
          }
        },
        data(){
            return{
              time:Date.now(),
              signIn:''
            }
        },
        mounted(){
          this.$nextTick(function () {
            this.isSignIn();
          })
        },
        methods:{
          isSignIn(){
            this.$http({
              method: "post",
              url: "/tasks/explore",
              headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},

            }).then(function(res){
              if (res.data.code==0){
                if (res.data.data.has_signed){
                  this.signIn=true
                } else {
                  this.signIn=false
                }
              }
            }.bind(this))
              .catch(function(err){
                console.log(err)
              }.bind(this));
          },
          signInFc(){
            this.$http({
              method: "post",
              url: "/tasks/sign-in",
              headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            }).then(function(res){
                this.$layer.msg(res.data.msg);
                if(res.data.code==0){
                  this.signIn=true
                }
            }.bind(this))
              .catch(function(err){
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          }
        }
    }
</script>

<style scoped>
  .content{
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    color: #666;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding: 1rem;
  }
  .shoppingPanel{
    padding:0 1rem;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.5rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .TitleImg img{
    width: 100%;
  }
  .task{
    margin-bottom: 0;
    margin-top: 1rem;
  }
  .task1{
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
    text-align: center;
    display: flex;
  }
  .taskList{
    width: 33%;
    border-right: 0.1rem solid #eee;
    padding: 0.5rem 0;
  }
  .taskListLast{
    padding: 0.5rem 0;
    border-right: none;
  }
  .taskIcon{
    color: #09a2d6;
    font-size: 2.5rem;
    margin: 1rem 0;
  }
  .taskBody{
    font-size: 0.5rem;
    color: #666;
  }
  .taskBtn{
    background:#09a2d6;
    color: #fff;
    width: 80%;
    margin: 1rem auto;
    border-radius: 2rem;
  }
  .taskSuccess{
    margin: 1rem 0;
  }
  .glyphicon-ok{
    background: #20C779;
    color: #fff;
    padding: 0.4rem;
    border-radius: 50%;
  }

  .decorate{
    color:#09a2d6;
    transform: rotate(90deg);
  }
</style>
