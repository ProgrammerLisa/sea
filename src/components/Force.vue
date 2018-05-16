<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <router-link to="/" tag="span" class="glyphicon glyphicon-menu-left"></router-link>
        原力记录
      </div>
    </div>


    <div class="panel panel-default ">
      <div class="panel-body exchangeBody">
        <p>当前元力值</p>
        <span class="sumCount">100</span>
      </div>
    </div>

    <div class="panel panel-default RecordExchange">
      <div class="panel-body">
        <h4 class="introduceTitle">原力简介</h4>
      </div>
      <div class="panel-footer introduceFooter">
        <p>原力是用户获取黑钻的影响因子，原力越高，获得的黑钻越多。可以通过在星球上进行浏览、学习、社交等活动，获取原力，由于目前星球基地正在前期搭建中，未来将支持更多获取原力的方式。</p>

      </div>
    </div>

    <div class="panel panel-default RecordIntroduce">
      <div class="panel-body">
        <h4 class="introduceTitle">收支记录</h4>
      </div>
      <div class="panel-footer RecordFooter">
        <p class="RecordTitle">新手赠送</p>
        <span class="RecordDate">2018-5-15</span><span class="RecordCount">+100</span>
      </div>
      <div class="panel-footer RecordFooter">
        <p class="RecordTitle">新手赠送</p>
        <span class="RecordDate">2018-5-15</span><span class="RecordCount">+100</span>
      </div>
      <div class="panel-footer RecordFooter">
        <p class="RecordTitle">新手赠送</p>
        <span class="RecordDate">2018-5-15</span><span class="RecordCount">+100</span>
      </div>
    </div>
    <router-link to="/GetForce" tag="div" class="panel getRecord">
      <div class="panel-body">
        获取原力
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Force"
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
  .exchangeBtn span{
    font-size: 0.5rem;
    margin-left: 5px;
  }
  .exchangeBody{
    background: -webkit-linear-gradient(0deg,#6A4EFA,#B83BF7);
    color: #fff;
    text-align: center;
  }
  .sumCount{
    font-size: 3rem;
  }
  .RecordIntroduce,.RecordExchange{
    margin-top: 10px;
  }
  .introduceTitle{
    margin: 0;
  }
  .introduceFooter,.RecordFooter{
    background: #fff;
    border-top: 1px solid #eee;
    color: #555;
  }
  .introduceFooter p{
    margin-bottom: 0;
  }
  .RecordDate{
    color: #666;
  }
  .RecordCount{
    float: right;
    color: #E33616;
  }
  .getRecord{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: -webkit-linear-gradient(0deg,#6A4EFA,#B83BF7);
    color: #fff;
    text-align: center;
    margin: 0;
    letter-spacing: 2px;
  }
</style>
