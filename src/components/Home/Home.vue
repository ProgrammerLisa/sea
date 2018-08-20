<template>
  <div id="content">
    <div class="landscape" ></div>
    <div class="filter"></div>
    <canvas id="canvas"></canvas>

     <div id="notice">
        <marquee style="height: 2.5rem;" scrollamount="5" scrolldelay="1"><span style="font-size: 1.5rem;color: #fff;vertical-align:middle;">公告:亲爱的用户，平台momomo即将上线，敬请期待.</span></marquee>
     </div>
     <div class="topOption option1">
        <div class="icon"><img :src="zhenzhuIcon"/> 珍珠 {{imgSum}}</div>
        <div class="icon"><img :src="nengliangIcon"/> 能量 {{imgSum}}</div>
      </div>
      <div id="imgDiv"></div>
    <router-link class="option2" to="/gamerules" tag="div">
      <img src="../../assets/images/youxiguize.png" class="invitation-friends"/>
      <p>游戏规则</p>
    </router-link>
    <router-link class="option3" to="/record" tag="div">
      <img src="../../assets/images/zhanji.png" class="invitation-friends"/><span class="tips"></span>
      <p>战绩</p>
    </router-link>
    <router-link class="option4" to="/ask" tag="div">
      <img src="../../assets/images/yaoqinghaoyou.png" class="invitation-friends"/>
      <p>邀请好友</p>
    </router-link>
    <div id="pearlContainer">
      <div v-for="(m,index) in imgDiv" :class="m.divClass" :data-level="m.level" @click.once="flag && accumulative($event,index)">
        <img v-bind:style="m.style" :src="m.href" />
      </div>
    </div>


  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import backGround from '@/assets/images/bg.png'
import zhenzhuIcon from '@/assets/images/zhenzhuHome.png'
import nengliang from '@/assets/images/nengliang.png'
import shell from '@/assets/images/bihe.png'

import ocean1 from '@/assets/images/haiyangzhixin3x/hailanzhixin1@3x.png'
import ocean2 from '@/assets/images/haiyangzhixin3x/hailanzhixin2@3x.png'
import ocean3 from '@/assets/images/haiyangzhixin3x/hailanzhixin3@3x.png'
import ocean4 from '@/assets/images/haiyangzhixin3x/hailanzhixin4@3x.png'
import ocean5 from '@/assets/images/haiyangzhixin3x/hailanzhixin5@3x.png'
import ocean6 from '@/assets/images/haiyangzhixin3x/hailanzhixin6@3x.png'
import ocean7 from '@/assets/images/haiyangzhixin3x/hailanzhixin7@3x.png'
import ocean8 from '@/assets/images/haiyangzhixin3x/hailanzhixin8@3x.png'
import ocean9 from '@/assets/images/haiyangzhixin3x/hailanzhixin9@3x.png'

import pearl1 from '@/assets/images/zhenzhu3x/zhenzhu1@3x.png'
import pearl2 from '@/assets/images/zhenzhu3x/zhenzhu2@3x.png'
import pearl3 from '@/assets/images/zhenzhu3x/zhenzhu3@3x.png'
import pearl4 from '@/assets/images/zhenzhu3x/zhenzhu4@3x.png'
import pearl5 from '@/assets/images/zhenzhu3x/zhenzhu5@3x.png'
import pearl6 from '@/assets/images/zhenzhu3x/zhenzhu6@3x.png'
import pearl7 from '@/assets/images/zhenzhu3x/zhenzhu7@3x.png'
import pearl8 from '@/assets/images/zhenzhu3x/zhenzhu8@3x.png'
import pearl9 from '@/assets/images/zhenzhu3x/zhenzhu9@3x.png'

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
      zhenzhuIcon:zhenzhuIcon,
      nengliangIcon:nengliang,
      pearl:[pearl1,pearl2,pearl3,pearl4,pearl5,pearl6,pearl7,pearl8,pearl9],
      ocean:[ocean1,ocean2,ocean3,ocean4,ocean5,ocean6,ocean7,ocean8,ocean9],
      imgDiv:[
        {imgCount:1,href:pearl1,divClass:'',animation:'',level:1},
        {imgCount:1,href:ocean1,divClass:'',animation:'',level:2},
        {imgCount:1,href:pearl1,divClass:'',animation:'',level:1}
      ],
      PearlLevel1:{
        imgCount:1,
        href:pearl1,
        divClass:'',
        animation:'',
        level:1
      },
      PearlLevel2:{
        imgCount:2,
        href:ocean1,
        divClass:'',
        animation:'',
        level:2
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
      RankingSwitch:'综合排名',
      bgHeight:'',
      SEPARATION:100,AMOUNTX :50,AMOUNTY :50,container:'',camera:'', scene:'', renderer:'',particles:0, particle:0,count:0,mouseX:200,mouseY:-200,windowHalfX:window.innerWidth / 2,windowHalfY: window.innerHeight / 2
    }
  },
  mounted:function () {
    this.startStyle();
  },
  methods:{
    startStyle(){

      const that = this;
      that.imgDiv.push(that.PearlLevel2);

      for(var i=0;i<that.imgDiv.length;i++){
        that.imgDiv[i].divClass='float-container float-container'+i;
      }

      that.cookies();
      $("#pearlContainer").show()
    },
    cookies(){
      const that = this;
      $(function () {
        for (var index = 0; index < that.imgDiv.length; index++) {
          var ck = "float-container-top-" + index;
          var cl = "float-container-left-" + index;
          var cookievalTop = localStorage.getItem(ck);
          var cookievalLeft = localStorage.getItem(cl);
          if (cookievalTop == "" || cookievalLeft == "" || cookievalTop == null || cookievalLeft == null || cookievalTop == undefined || cookievalLeft == undefined||cookievalTop == null||cookievalLeft == null) {
            cookievalTop = parseInt((($(window).height() - 200) * 0.7 * Math.random() + $(window).height() * 0.3) / 12);
            cookievalLeft = parseInt(($(window).width() - 100) * 0.8 * Math.random() / 12);
            $(".float-container" + index).css({top: cookievalTop + 'rem', left: cookievalLeft + 'rem'});
            localStorage.setItem(ck, cookievalTop);
            localStorage.setItem(cl, cookievalLeft);
          } else {
            $(".float-container" + index).css({top: cookievalTop + 'rem', left: cookievalLeft + 'rem'});
          }
        }
      })
    },
    animation(e,index,arr){
      for(let i in arr){
        (function(i){
          setTimeout(function(){
            e.target.src = arr[i];
            if(i==arr.length-1){
              console.log(true)
              $(".float-container").eq(index).animate({marginTop:'-150%'},500)
            }
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
          imgArr=that.pearl;
          that.animation(e,index,imgArr);
          that.$layer.msg("普通珍珠");
          break;
        case 2:
          imgArr=that.ocean;
          that.animation(e,index,imgArr);
          that.$layer.msg("恭喜获得 海洋之心");
          break;
      }

      this.imgSum+=this.imgDiv[index].imgCount;
      let divSelf = e.currentTarget;
      // setTimeout(function(){
      //   $(".float-container").eq(index).animate({marginTop:'-150%'},500)
      // },2000);
      setTimeout(function(){
        divSelf.remove();
        localStorage.removeItem("float-container-left-" + index);
        localStorage.removeItem("float-container-top-" + index);
      },3000);
    }

  }

}
</script>
<style scoped>
  #content{
    width: 100vw;
    margin:0;
    height:100vh;
    overflow:hidden;
    cursor:none;
    color: #fff;
    /*background:linear-gradient(to bottom,#3198D3 0%,#2E6EA1 100%);*/
    background: #1A3B57;
  }

  .landscape {
     position:absolute;
     left:0;bottom:45px;
     width:100%;
     height:100%;
     background-image:url('../../assets/images/bg.png');
     background-size:100% 100%;
     background-repeat:repeat-x;
     background-position:center bottom;
   }
	#notice{
    position: absolute;
    top: 2rem;
    height: 2.5rem;
		width: 100%;
		font-size: 1.01rem;
    background: rgba(255,255,255,0.1);
	}
  .icon{
    background: rgba(0,0,0,0.2);
    border-radius: 2rem;
    padding: 0.1rem 1.5rem 0.1rem 0.5rem;
    margin-bottom: 1rem;
  }
  .icon img{
    width: 2rem;
  }
  .topOption{
    position: absolute;
  }
  .option1{
    left: 1rem;
    top: 6.5rem;
  }

  .invitation-friends{
    border-radius: 50%;
    padding: 0.4rem;
  }
  .option2,.option3,.option4{
    width: 7rem;
    float: right;
    text-align: center;
    position: absolute;
    top: 72vh;
    color: #fff;
  }
  .option2{
    right: 1rem;
  }
  .option3{
    top: 55vh;
    right: 1rem;
  }
  .option2 img, .option3 img,.option4 img{
    width: 70%;
  }
  .option2:active img,.option3:active img,.option4:active img{
    transform: scale3d(0.8,0.8,0.8);
    transition: 0.1s;
  }
  .option4{
    left: 1rem;
  }
  .option4-Icon span{
    font-size: 2.5rem;
  }
  #pearlContainer{
    display: none;
  }
  .float-container {
    width: 4.2rem;
    height: 4.2rem;
    position: absolute;
    /*box-shadow: 0.1rem 0.1rem 0.1rem #112941;*/
    animation: myfirst 2s infinite;

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
    width: 200%;
  }

  p{
    margin-bottom: 0;
  }
  .tips{
    width: 0.6rem;height: 0.6rem;display: inline-block;background: #FC0506;position: absolute;right: 1.2rem;margin-top:0.2rem;border-radius: 50%
  }
</style>
