<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <router-link to="/" tag="span" class="glyphicon glyphicon-menu-left"></router-link>
          黑钻活动
        </div>
      </div>
      <div class="activity">
        <div>1</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GetBlackDrill"
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
  .activity{
    background: #5A13B9;
    color: #fff;
  }
</style>
