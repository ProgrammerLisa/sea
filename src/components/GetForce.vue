<template>
    <div class="content">

      <div class="TitleImg">
        <p class="TitleImg-Title">平台 mo0 即将上线</p>
        <p class="TitleImg-Title">任务越多，能量越多</p>
      </div>
      <div class="panel panel-default task">
        <div class="panel-body">
          <span class="glyphicon glyphicon-minus decorate"></span>基础任务
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
          <span class="glyphicon glyphicon-minus decorate"></span>独家任务
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

      </div>

      <div class="panel panel-default task">
        <div class="panel-body">
          <span class="glyphicon glyphicon-minus decorate"></span>独家任务
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
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    color: #555;
  }
  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding: 1rem;
  }
  .TitleImg{
    text-align: center;
    background-image:url("../assets/images/banner.png");
    background-size: 100% 100%;
    border-top: 0.1rem solid transparent;
    color: #fff;
    padding: 4rem 0;
  }
  .TitleImg-Title{
    font-size: 1.8rem;
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
  }
  .taskList{
    border-right: 0.1rem solid #eee;
    padding: 0.5rem 0;
  }
  .taskListLast{
    padding: 0.5rem 0;
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
