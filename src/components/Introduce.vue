<template>
    <div>
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <router-link to="/" tag="span" class="glyphicon glyphicon-menu-left"></router-link>
          星球秘籍
        </div>
      </div>
      <div class="content">
        <div class="paragraph">
          <h3 class="a">什么是黑钻?</h3>
          <p>黑钻是基于个人在星球活动产生的奖励，可以用于星球的消费与兑换等。</p>
          <p>原力大于35的用户有机会获取额外的黑钻大奖-幸运钻。同时幸运钻也会消耗一定数量的原力；48小时不领取黑钻将暂停生长。</p>
          <p class="blue">黑钻总量有限，且每两年产出量减少一半，随着时间的推移获取难度越来越大，前期参与更有优势。</p>
        </div>
        <div class="paragraph">
          <h3 class="a">原力越高，黑钻生长越快</h3>
          <p>原力是用户获取黑钻的影响因子，同一时间段内，原力越高，获得的黑钻越多。</p>
          <p class="blue">举个例子：每日发放黑钻总数C</p>
          <p>用户每日领取到的黑钻=C×该用户当前原力值/所有用户原力值总和</p>
        </div>
        <div class="paragraph">
          <h3 class="a">如何获取原力，加速黑钻</h3>
          <p>在星球上进行浏览、学习、社交等所有活动，可以增加原力值，由于目前星球基地正在前期搭建中，未来将支持更多获取原力的方式。</p>
        </div>
      </div>
      <router-link to="/GetForce" tag="div" class="panel getRecord">
        <div class="panel-body">
          立即加速黑钻
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "Introduce"
    }
</script>

<style scoped>
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
  .content{
    background: #311454;
    color: #fcf8e3;
    padding-bottom: 100px;
  }
  .paragraph{
    border-top: 1px solid transparent;
    padding: 15px;
  }
  .paragraph p{
    margin: 0;
  }
  .a{
    background: linear-gradient(to bottom, #fff, #D3B3FE);
    -webkit-background-clip: text;
    color: transparent;
    font-family: inherit;
    text-align: center;
  }
  .blue{
    color: #9EC9F0;
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
