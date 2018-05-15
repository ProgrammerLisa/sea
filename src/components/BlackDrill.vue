<template>
  <div class="content">

    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <router-link to="/" tag="span" class="glyphicon glyphicon-menu-left"></router-link>
        黑钻记录
      </div>
    </div>


    <div class="panel panel-default">
      <div class="panel-body exchangeBody">
        <p>黑钻总数</p>
        <span class="sumCount">100</span>
        <router-link to="/GetBlackDrill" tag="span" class="exchangeBtn">兑换<span class="glyphicon glyphicon-menu-right"></span></router-link>
      </div>
      <div class="panel-footer exchangeFooter">冻结黑钻数<span class="FrozenCount">0</span></div>
    </div>

    <div class="panel panel-default">
      <div class="panel-body">
        <h4 class="introduceTitle">黑钻简介</h4>
      </div>
      <div class="panel-footer introduceFooter">
        <p>黑钻是依托于区块链技术，基于个人星球活动产生的奖励，可以用于星球上的消费与兑换等。 </p>
        <p>除日常根据原力大小生长黑钻之外，原力大于35的用户有机会获取额外的黑钻大奖，称之为幸运钻。</p>
        <p>同时，获得幸运钻也会消耗一定数量的原力。48小时不领取黑钻将暂停生长。</p>
        <p>黑钻总量有限，且每2年产出量减少一半，随着时间的推移获取难度越来越大，前期参与更有优势。</p>
      </div>
    </div>
    <div class="panel panel-default introduce">
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

  </div>
</template>

<script>

    export default {
        name: "BlackDrill"
    }
</script>

<style scoped>
  .content{
    padding-bottom: 60px;
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
  .exchangeBtn{
    float: right;
  }
  .exchangeBtn span{
    font-size: 0.5rem;
    margin-left: 5px;
  }
  .exchangeBody{
    background: -webkit-linear-gradient(0deg,#6A4EFA,#B83BF7);
    color: #fff;
  }
  .sumCount{
    font-size: 3rem;
  }
  .exchangeFooter{
    background: -webkit-linear-gradient(0deg,#7661FA,#BD4CF6);
    color: #fff;
    border: none;
    border-radius: 0;
  }
  .FrozenCount{
    margin-left: 10px;
  }
  .introduce{
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
</style>
