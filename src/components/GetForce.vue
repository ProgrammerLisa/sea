<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <router-link to="/" tag="span" class="glyphicon glyphicon-menu-left"></router-link>
          原力任务
        </div>
      </div>
      <div class="TitleImg">
        <p class="TitleImg-Title">赶紧收取原力，加速获取黑钻</p>
        <p class="TitleImg-body">原力越多，获取的黑钻会越多</p>
      </div>
      <div class="panel panel-default task">
        <div class="panel-body">
          基础任务
        </div>
      </div>
      <div class="container">
        <div class="row task1">
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-link taskIcon"></span>
            <div class="taskTitle">邀请10名好友</div>
            <div class="taskBody">邀请好友+10原力</div>
            <div class="taskBtn">+100原力</div>
          </div>
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-map-marker taskIcon"></span>
            <div class="taskTitle">关注微信公众号</div>
            <div class="taskBody">关注获取原力</div>
            <div class="taskBtn">+2原力</div>
          </div>
          <div class="col-xs-4 taskListLast">
            <span class="glyphicon glyphicon-calendar taskIcon"></span>
            <div class="taskTitle">每日登录</div>
            <div class="taskBody">登录获取原力值</div>
            <div class="taskSuccess"><span class="glyphicon glyphicon-ok"></span> 已完成</div>
          </div>
        </div>
      </div>

      <div class="panel panel-default task">
        <div class="panel-body">
          独家任务
        </div>
      </div>
      <div class="container">
        <div class="row task1">
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-globe taskIcon"></span>
            <div class="taskTitle">资讯</div>
            <div class="taskBody">邀请好友+10原力</div>
            <div class="taskBtn">+100原力</div>
          </div>
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-music taskIcon"></span>
            <div class="taskTitle">网易云音乐</div>
            <div class="taskBody">关注获取原力</div>
            <div class="taskBtn">+2原力</div>
          </div>
          <div class="col-xs-4 taskListLast">
            <span class="glyphicon glyphicon-book taskIcon"></span>
            <div class="taskTitle">网易云课堂</div>
            <div class="taskBody">登录获取原力值</div>
            <div class="taskSuccess"><span class="glyphicon glyphicon-ok"></span> 已完成</div>
          </div>
        </div>
        <div class="row task1">
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-globe taskIcon"></span>
            <div class="taskTitle">资讯</div>
            <div class="taskBody">邀请好友+10原力</div>
            <div class="taskBtn">+100原力</div>
          </div>
          <div class="col-xs-4 taskList">
            <span class="glyphicon glyphicon-music taskIcon"></span>
            <div class="taskTitle">网易云音乐</div>
            <div class="taskBody">关注获取原力</div>
            <div class="taskBtn">+2原力</div>
          </div>
          <div class="col-xs-4 taskListLast">
            <span class="glyphicon glyphicon-book taskIcon"></span>
            <div class="taskTitle">网易云课堂</div>
            <div class="taskBody">登录获取原力值</div>
            <div class="taskSuccess"><span class="glyphicon glyphicon-ok"></span> 已完成</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GetForce"
    }
</script>

<style scoped>
  .content{
    padding-bottom: 100px;
  }
  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding: 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.5rem;
    margin: 0;
  }
  .glyphicon-menu-left{
    float: left;
  }
  .TitleImg{
    text-align: center;
    background: -webkit-linear-gradient(90deg,#933CDC,#6F5EFE);
    border-top: 1px solid transparent;
    color: #fff;
    padding: 20px 0;
  }
  .TitleImg-Title{
    font-size: 2rem;
  }
  .TitleImg-body{
    background: rgba(255,255,255,0.2);
    width: 60%;
    margin: auto;
    border-radius: 20px;
  }
  .task{
    margin-bottom: 0;
    margin-top: 10px;
  }
  .task1{
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
    text-align: center;
  }
  .taskList{
    border-right: 1px solid #eee;
    padding: 5px 0;
  }
  .taskListLast{
    padding: 5px 0;
  }
  .taskIcon{
    color: #933CDC;
    font-size: 25px;
    margin: 10px 0;
  }
  .taskBody{
    font-size: 0.5rem;
    color: #666;
  }
  .taskBtn{
    background:-webkit-linear-gradient(0deg,#6F5EFE,#933CDC);
    color: #fff;
    width: 80%;
    margin: 10px auto;
    border-radius: 2px;
  }
  .taskSuccess{
    margin: 10px 0;
  }
  .glyphicon-ok{
    background: #20C779;
    color: #fff;
    padding: 4px;
    border-radius: 50%;
  }
</style>
