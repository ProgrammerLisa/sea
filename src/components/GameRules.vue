<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"><span>ㄑ</span></span> 游戏规则
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GameRules",
        methods:{
          goBack() {
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  .content {
    overflow-x: hidden;
    color: #666;
    background-color: #f5f5f5;
    width: 100vw;
  }

  .panel {
    border: none;
    border-radius: 0;
  }

  .panel-body {
    padding: 0 1rem;
  }

  .BlackTitle {
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }

  .back {
    float: left;
  }

  .back span {
    height: 2.5rem;
    font-size: 2.5rem;
    color: #DBDBDB;
  }
  .back span:active{
    color: black;
  }
</style>
