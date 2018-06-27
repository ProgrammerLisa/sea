<template>
  <div class="contentMain">
    <div id="main-top">

     <div id="notice" style="height: 2rem;">
    		<marquee style="vertical-align: middle; line-height: 2rem;" scrollamount="5" scrolldelay="1"><span>公告:亲爱的用户，平台momomo即将上线，敬请期待。</span></marquee>
     </div>
     <div class="topOption option1">
        <span >珍珠量 {{imgSum}}</span>
      </div>

      <div class="topOption option3">
        <!-- Single button -->
        <div class="btn-group">
          <div class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img class="dropdownImg" src="../assets/images/caidan.png"/>
          </div>
          <ul class="dropdown-menu">
            <li><a href="#"><img src="../assets/images/youxiguize.png" class="dropdown-menu-img"/>游戏规则</a></li>
            <li role="separator" class="divider"></li>
            <li><router-link to="/addfriends" tag="a"><img src="../assets/images/tianjiahaoyou.png" class="dropdown-menu-img"/>添加好友</router-link></li>
            <li role="separator" class="divider"></li>
            <li><a href="#"><img src="../assets/images/zhanji.png" class="dropdown-menu-img"/>战绩</a></li>
          </ul>
        </div>
      </div>

      <div id="imgDiv"></div>
    </div>
    <router-link class="option4" to="/ask" tag="div">
      <img src="../assets/images/yaoqinghaoyou.png"  class="invitation-friends"/>
      <p>邀请好友</p>
    </router-link>
    <div v-for="(m,index) in imgDiv" :class="m.divClass" :data-level="m.level" @click.once="flag && accumulative($event,index)">
      <img v-bind:style="m.style" :src="m.href" />
    </div>


    <group  @click.native="rankings">
      <cell v-bind:title="RankingTitle" v-bind:value="RankingSwitch" is-link ></cell>
    </group>
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
import { Group, Cell } from 'vux'
import backGround from '@/assets/images/bg.png'
import shell from '@/assets/images/bihe.png'
import henghesha1 from '@/assets/images/henghesha/1.png'
import henghesha2 from '@/assets/images/henghesha/2.png'
import henghesha3 from '@/assets/images/henghesha/3.png'
import henghesha4 from '@/assets/images/henghesha/4.png'
import henghesha5 from '@/assets/images/henghesha/5.png'
import henghesha6 from '@/assets/images/henghesha/6.png'
import henghesha7 from '@/assets/images/henghesha/7.png'
import henghesha8 from '@/assets/images/henghesha/8.png'
import henghesha9 from '@/assets/images/henghesha/9.png'
export default {
  components: {
    Group,
    Cell
  },
  data(){
    return{
      imgSum:0,
      imgSrc:backGround,
      flag:true,
      hengshesha:[henghesha1,henghesha2,henghesha3,henghesha4,henghesha5,henghesha6,henghesha7,henghesha8,henghesha9],
      imgDiv:[
        {imgCount:1,href:shell,divClass:'',animation:'',level:1},
        {imgCount:1,href:shell,divClass:'',animation:'',level:2},
        {imgCount:1,href:shell,divClass:'',animation:'',level:3}
      ],
      PearlLevel1:{
        imgCount:1,
        href:shell,
        divClass:'',
        animation:'',
        level:1
      },
      PearlLevel2:{
        imgCount:2,
        href:shell,
        divClass:'',
        animation:'',
        level:2
      },
      PearlLevel3:{
        imgCount:3,
        href:shell,
        divClass:'',
        animation:'',
        level:3
      },
      PearlLevel4:{
        imgCount:4,
        href:shell,
        divClass:'',
        animation:'',
        level:4
      },
      PearlLevel5:{
        imgCount:5,
        href:shell,
        divClass:'',
        animation:'',
        level:5
      },
      isBlack:true,
      RankingListBlack:[
        {title:'我的排名',count:66},
        {title:'今日得宝数',count:75},
        {title:'全民累计得宝数',count:75}
      ],
      RankingListForce:[
        {level:1,name:'yizhisheng',count:1000},
        {level:2,name:'yizhisheng',count:100},
        {level:3,name:'yizhisheng',count:10}
      ],
      RankingTitle:'得宝数据',
      RankingSwitch:'综合排名'
    }
  },
  mounted:function () {
    const that = this;
    this.$nextTick(() => {
      that.imgDiv.push(that.PearlLevel5);

      for(var i=0;i<that.imgDiv.length;i++){
        that.imgDiv[i].divClass='float-container float-container'+i;
      }

      that.cookies();

    })


  },
  methods:{
    cookies(){
      const that = this;
      $(function () {
        for (var index = 0; index < that.imgDiv.length; index++) {
          var ck = "float-container-top-" + index;
          var cl = "float-container-left-" + index;
          var cookievalTop = localStorage.getItem(ck);
          var cookievalLeft = localStorage.getItem(cl);
          if (cookievalTop == "" || cookievalLeft == "" || cookievalTop == null || cookievalLeft == null || cookievalTop == undefined || cookievalLeft == undefined) {
            cookievalTop = parseInt((($('#main-top').outerHeight() - 100) * 0.7 * Math.random() + $('#main-top').outerHeight() * 0.3) / 12);
            cookievalLeft = parseInt(($('#main-top').outerWidth() - 100) * 0.8 * Math.random() / 12);
            $(".float-container" + index).css({top: cookievalTop + 'rem', left: cookievalLeft + 'rem'});
            localStorage.setItem(ck, cookievalTop);
            localStorage.setItem(cl, cookievalLeft);
          } else {
            $(".float-container" + index).css({top: cookievalTop + 'rem', left: cookievalLeft + 'rem'});
          }
        }
      })

       // this.imgDiv.foreach(function (index, obj) {
       //
       //    var ck = "float-container-top-" + index;
       //    var cl = "float-container-left-" + index;
       //    var cookievalTop =  localStorage.getItem(ck);
       //    var cookievalLeft =localStorage.getItem(cl);
       //    if (cookievalTop == ""||cookievalLeft == "") {
       //      cookievalTop = parseInt((($('#main-top').outerHeight()-100)*0.7*Math.random()+$('#main-top').outerHeight()*0.3)/12);
       //      cookievalLeft = parseInt(($('#main-top').outerWidth()-100)*0.8*Math.random()/12);
       //      $(this).css({top:cookievalTop+'rem',left:cookievalLeft+'rem'});
       //      localStorage.setItem(ck, cookievalTop);
       //      localStorage.setItem(cl, cookievalLeft);
       //    } else {
       //      $(this).css({top:cookievalTop+'rem',left:cookievalLeft+'rem'});
       //    }
       //  });
    },
    animation(e,arr){
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.padding = "0";
      for(let i in arr){
        (function(i){
          setTimeout(function(){
            e.target.src = arr[i];
          },i*200);
        })(i);
      }
    },
    accumulative(e,index){
      let that = this;
      let imgArr=[];
      switch (parseInt(e.currentTarget.dataset.level))
      {
        case 1:
          imgArr=this.hengshesha;
          this.animation(e,imgArr);

          break;
        case 2:
          imgArr=this.hengshesha;
          this.animation(e,imgArr)
          break;
        case 3:
          imgArr=this.hengshesha;
          this.animation(e,imgArr)
          break;
        case 4:
          imgArr=this.hengshesha;
          this.animation(e,imgArr)
          break;
        case 5:
          imgArr=this.hengshesha;
          this.animation(e,imgArr)
          break;
      }

      this.imgSum+=this.imgDiv[index].imgCount;
      let divSelf = e.currentTarget;
      setTimeout(function(){
        divSelf.remove();
        localStorage.removeItem("float-container-left-" + index);
        localStorage.removeItem("float-container-top-" + index);
      },2500);
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
	#notice{
    margin-top: 2rem;
		width: 100%;
		font-family: "微软雅黑";
		font-size: 1.01rem;
    background: rgba(255,255,255,0.1);
	}
  .contentMain{
    width: 100vw;
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #666;
  }
  #main-top{
    width:100%;
    background: url("../assets/images/bg.png") 100% 100% no-repeat;
    background-size: 100% 100%;
    color: white;
    height: 65vh;
    border-top: 1px solid transparent;
  }
  .topOption{
    position: absolute;
  }
  .option1{
    left: 1.5rem;
    top: 7rem;
  }
  .option2{
    left: 1.5rem;
    top: 10rem;
  }
  .option3{
    right: 0;
    top: 8rem;
  }
  .invitation-friends{
    background: #F0BD00;
    border-radius: 50%;
    padding: 0.4rem;
  }
  .option4{
    width: 6rem;
    float: right;
    text-align: center;
    position: relative;
    margin-top: -8rem;
    margin-right: 1rem;
    color: #fff;
  }
  .option4 img{
    width: 70%;
  }
  .option4-Icon span{
    font-size: 2.5rem;
  }
  .float-container {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
    position: absolute;
    padding:0.1rem 0.3rem 0.5rem;
    /*box-shadow: 0.1rem 0.1rem 0.1rem #112941;*/
    animation: myfirst 2s infinite;
    background: -webkit-radial-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.7)); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.7)); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.7)); /* Firefox 3.6 - 15 */
    background: radial-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.7)); /* 标准的语法（必须放在最后） */
  }
  @keyframes myfirst {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, -1rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  .float-container img{
    width: 100%;
  }
  .bcImg{
    width: 100%;
    height: 100%;
    box-shadow: 0.5rem 0.5rem 0.5rem #ddd;
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
  .dropdown-toggle{
    width:4.5rem;
    border-radius: 0.5rem;
    padding:0 0.5rem;
  }
  .dropdownImg{
    width: 100%;
  }
  .dropdown-menu-img{
    width: 1rem;
    margin-right: 1rem;
    vertical-align: middle;
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
    text-align: left;
  }
  #ranking{
    width:30%;
  }
</style>
