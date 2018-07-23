<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" @touchstart="evers"  @touchend="lat" class="back">  <img :src="masrc"/></span> 排行榜
      </div>
    </div>
    <div id="listTitle" @click="rankings" >
      <div class="col-xs-6 text-left" style="font-weight: bold;font-size: 1.7rem">{{RankingTitle}}</div>
      <div class="col-xs-6 text-right" style="color: #888">{{RankingSwitch}} <span class="glyphicon glyphicon-menu-right" style="font-size: xx-small"></span></div>
    </div>
    <table v-if="isBlack" class="table">
      <tr><td><h4 class="decorate-title"><div class="decorate"></div>得宝数据</h4></td></tr>
      <tr class="bcfff" v-for="list in RankingListBlack">
        <td class="text-left">{{list.title}}</td>
        <td class="text-right">{{list.count}}</td>
      </tr>
    </table>
    <table v-else class="table">
      <tr><td id="ranking"><h4 class="decorate-title"><div class="decorate"></div>综合排名</h4></td></tr>
      <tr class="bcfff"><td>排行榜</td><td>账户</td><td>珍珠值数</td></tr>
      <tr class="bcfff" v-for="list in RankingListForce">
        <td>{{list.level}}</td>
        <td>{{list.name}}</td>
        <td class="pearl-count">{{list.count}}</td>
      </tr>
    </table>


  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "MyRankings",
        data(){
          return{
            masrc: back,
            isBlack:true,
            RankingTitle:'得宝数据',
            RankingSwitch:'综合排名',
            RankingListBlack:[
              {title:'我的排名',count:66},
              {title:'今日得宝数',count:75},
              {title:'全民累计得宝数',count:75}
            ],
            RankingListForce:[
              {level:1,name:'yizhisheng',count:1000},
              {level:2,name:'yizhisheng',count:100},
              {level:3,name:'yizhisheng',count:10}
            ]
          }
        },
      methods: {
        evers() {
          this.masrc = backs;
        },
        lat() {
          this.masrc = back;
        },
        goBack() {
          this.$router.go(-1);
        },
        rankings(){
          if(this.isBlack){
            this.isBlack=false;
            this.RankingTitle='综合排名';
            this.RankingSwitch='得宝数据';
          }else {
            this.isBlack=true;
            this.RankingTitle='得宝数据';
            this.RankingSwitch='综合排名';
          }
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
    background: #09a2d6;
    color: #fff;
    font-size: 1.6rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }

  .back{
    position: absolute;
    left: 1rem;
  }
  .back img {
    height: 2.5rem;
  }
  .table{
    text-align: center;
  }
  .table tr{
    line-height: 4rem;
    border-bottom: 0.1rem solid #efefef;
  }
  .bcfff{
    background: #fff;
  }

  .text-left{
    padding-left: 1rem;
  }
  .text-right{
    padding-right: 1rem;
    color: #09A2D6;
  }
  .pearl-count{
    color: #09A2D6;
  }
  .decorate{
    display: inline-block;
    background: #09A2D6 ;
    width: 0.3rem;
    height: 1.6rem;
    margin: 0 1rem;
    vertical-align: middle;
  }
  .decorate-title{
    font-size: 1.6rem;
    text-align: left;
    color: #444;
  }
  #ranking{
    width:30%;
  }
  #listTitle{
    padding: 1rem 0;
    height:4rem;
    display: block;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  #listTitle:active{
    background: #ddd;
  }
</style>
