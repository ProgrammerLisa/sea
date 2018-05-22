<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        收支记录
      </div>
    </div>
    <div class="media" v-for="s in Statement">
      <div class="media-body">
        <h4 class="media-heading">{{s.title}}</h4>
        <span>{{s.date}}</span>
      </div>
      <div class="media-right">
        {{s.symbol}}{{s.count}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Statement",
        data(){
          return{
            Statement:[
              {title:'阅读资讯',date:'2018年-05-18 10:59:16',isIncome:true,count:5,symbol:''},
              {title:'每日登录',date:'2018年-05-18 10:59:16',isIncome:true,count:5,symbol:''},
              {title:'兑换订单',date:'2018年-05-18 10:59:16',isIncome:false,count:100.26,symbol:''},
              {title:'邀请好友',date:'2018年-05-18 10:59:16',isIncome:true,count:10,symbol:''},
              {title:'初始奖励',date:'2018年-05-18 10:59:16',isIncome:true,count:25,symbol:''}
            ]
          }
        },
        mounted(){
          this.Statement.forEach(function (c) {
            if(c.isIncome){
              c.symbol='+'
            }else {
              c.symbol='-'
            }
          })
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
    color: #777;
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
    background: #fff;
    margin-top: 0;
    padding: 1rem;
    border-bottom: 0.1rem #F5F5F5 solid;
  }
  .media-heading{
    color: #444;
  }
  .media-right{
    color: #09a2d6;
    vertical-align: middle;
    font-size: large;
  }
</style>
