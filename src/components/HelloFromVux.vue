<template>
  <div class="contentMain">
    <div id="main-top">
      <img :src="imgSrc" class="bcImg"/>
      <div class="topOption option1">
        <router-link to="/BlackDrill" tag="span" replace >黑钻 {{imgSum}}</router-link>
      </div>
      <div class="topOption option2">
        <router-link to="/Force" tag="span">原力值 {{imgSum}}</router-link>
      </div>
      <div class="topOption option3">
        <router-link to="/Introduce" tag="span">星球秘籍 </router-link>
      </div>

      <div id="imgDiv"></div>
    </div>

    <div v-for="(m,index) in imgDiv" class="float-container" @click="accumulative(index)">
      <img v-bind:style="m.style" :src="m.href"/>
    </div>

    <group title="cell demo" @click.native="rankings">
      <cell v-bind:title="RankingTitle" v-bind:value="RankingSwitch" is-link ></cell>
    </group>
    <table v-if="isBlack" class="table">
      <tr><td>名次</td><td>普通黑钻</td><td>幸运钻</td><td>总黑钻</td></tr>
      <tr class="bcfff" v-for="list in RankingListBlack">
        <td><span class="listLevel">{{list.level}}</span><span class="listName">{{list.name}}</span></td>
        <td>{{list.count}}</td>
        <td>{{list.luckCount}}</td>
        <td>{{list.count+list.luckCount}}</td>
      </tr>
    </table>
    <table v-else class="table">
      <tr><td>名次</td><td>用户名</td><td>原力</td></tr>
      <tr class="bcfff" v-for="list in RankingListForce">
        <td>{{list.level}}</td>
        <td>{{list.name}}</td>
        <td>{{list.count}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import backGround from '@/assets/images/bg.png'
import Pearl from '@/assets/vux_logo.png'
export default {
  components: {
    Group,
    Cell
  },
  data(){
    return{
      imgCount:1,
      imgSum:0,
      imgSrc:backGround,
      imgTop:'',
      imgLeft:'',
      imgDiv:[
        {xixi:1,style:'width: 100%; padding: 20%;',href:Pearl},
        {xixi:1,style:'width: 100%; padding: 20%;',href:Pearl},
        {xixi:1,style:'width: 100%; padding: 20%;',href:Pearl}
      ],
      isBlack:true,
      RankingListBlack:[
        {level:1,name:'a',count:1000,luckCount:1},
        {level:2,name:'b',count:100,luckCount:2},
        {level:3,name:'c',count:10,luckCount:3}
      ],
      RankingListForce:[
        {level:1,name:'d',count:1000},
        {level:2,name:'e',count:100},
        {level:3,name:'f',count:10}
      ],
      RankingTitle:'黑钻排行榜',
      RankingSwitch:'按原力排行'
    }
  },
  mounted:function () {
    const that = this;
    that.imgTop=($('#main-top').outerHeight()-50)*Math.random();
    that.imgLeft=($('#main-top').outerWidth()-50)*Math.random();

    this.$nextTick(() => {

      $('.float-container').css({top:that.imgTop,left:that.imgLeft,width: '40px',height: '40px', background: 'rgba(255,255,255,0.2)',borderRadius: '50%', position: 'absolute', boxShadow: '1px 1px 1px #000'});

      const timer = setInterval(function () {
        that.down();
        that.up();
      },100);

    })


  },
  methods:{
    down(){
      $('.float-container').animate({top:parseInt(this.imgTop)+20+'px'},1000);
    },
    up(){
      $('.float-container').animate({top:parseInt(this.imgTop)+'px'},1000);
    },
    accumulative(index){
      console.log(index);
      $(".float-container").eq(index).remove();
      this.imgSum+=this.imgCount
    },
    rankings(){
      if(this.isBlack){
        this.isBlack=false;
        this.RankingTitle='原力排行榜';
        this.RankingSwitch='按黑钻排行';
      }else {
        this.isBlack=true;
        this.RankingTitle='黑钻排行榜';
        this.RankingSwitch='按原力排行';
      }
    }

  }

}
</script>

<style>
  .contentMain{
    width: 100vw;
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #555;
  }
  #main-top{
    background: #122b40;
    color: white;
  }
  .topOption{
    position: absolute;
  }
  .option1{
    left: 15px;
    top: 70px;
  }
  .option2{
    left: 15px;
    top: 100px;
  }
  .option3{
    right: 0;
    top: 80px;
    border-top: #09a2d6 solid 1.5px;
    border-bottom: #09a2d6 solid 1.5px;
    border-left: #09a2d6  solid 1px;
    border-right:none;
    padding: 2px 15px 2px 20px;
    border-radius: 20px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .option4-Icon span{
    font-size: 25px;
  }
  .float-container {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.2);
    borderRadius: 50%;
    position: absolute;
    boxShadow: 1px 1px 1px #000
  }
  .bcImg{
    width: 100%;
    box-shadow: 0.5rem 0.5rem 0.5rem #ddd;
  }
  .table{
    text-align: center;
  }
  .table tr{
    line-height: 40px;
    border-bottom: 1px solid #efefef;
  }
  .bcfff{
    background: #fff;
  }
</style>
