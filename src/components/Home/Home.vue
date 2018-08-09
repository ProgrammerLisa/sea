<template>
  <div id="content">
    <div class="landscape" ></div>
    <div class="filter"></div>
    <canvas id="canvas"></canvas>

     <div id="notice">
        <marquee style="height: 2.5rem;" scrollamount="5" scrolldelay="1"><span style="font-size: 1.5rem;color: #fff">公告:亲爱的用户，平台momomo即将上线，敬请期待。</span></marquee>
     </div>
     <div class="topOption option1">
        <span >珍珠量 {{imgSum}}</span>
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

import ocean1 from '@/assets/images/ocean/1.png'
import ocean2 from '@/assets/images/ocean/2.png'
import ocean3 from '@/assets/images/ocean/3.png'
import ocean4 from '@/assets/images/ocean/4.png'
import ocean5 from '@/assets/images/ocean/5.png'
import ocean6 from '@/assets/images/ocean/6.png'
import ocean7 from '@/assets/images/ocean/7.png'
import ocean8 from '@/assets/images/ocean/8.png'
import ocean9 from '@/assets/images/ocean/9.png'

import opal1 from '@/assets/images/opal/1.png'
import opal2 from '@/assets/images/opal/2.png'
import opal3 from '@/assets/images/opal/3.png'
import opal4 from '@/assets/images/opal/4.png'
import opal5 from '@/assets/images/opal/5.png'
import opal6 from '@/assets/images/opal/6.png'
import opal7 from '@/assets/images/opal/7.png'
import opal8 from '@/assets/images/opal/8.png'
import opal9 from '@/assets/images/opal/9.png'

import opper1 from '@/assets/images/opper/1.png'
import opper2 from '@/assets/images/opper/2.png'
import opper3 from '@/assets/images/opper/3.png'
import opper4 from '@/assets/images/opper/4.png'
import opper5 from '@/assets/images/opper/5.png'
import opper6 from '@/assets/images/opper/6.png'
import opper7 from '@/assets/images/opper/7.png'
import opper8 from '@/assets/images/opper/8.png'
import opper9 from '@/assets/images/opper/9.png'

import pearl1 from '@/assets/images/pearl/1.png'
import pearl2 from '@/assets/images/pearl/2.png'
import pearl3 from '@/assets/images/pearl/3.png'
import pearl4 from '@/assets/images/pearl/4.png'
import pearl5 from '@/assets/images/pearl/5.png'
import pearl6 from '@/assets/images/pearl/6.png'
import pearl7 from '@/assets/images/pearl/7.png'
import pearl8 from '@/assets/images/pearl/8.png'
import pearl9 from '@/assets/images/pearl/9.png'

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
      pearl:[pearl1,pearl2,pearl3,pearl4,pearl5,pearl6,pearl7,pearl8,pearl9],
      opal:[opal1,opal2,opal3,opal4,opal5,opal6,opal7,opal8,opal9],
      opper:[opper1,opper2,opper3,opper4,opper5,opper6,opper7,opper8,opper9],
      hengshesha:[henghesha1,henghesha2,henghesha3,henghesha4,henghesha5,henghesha6,henghesha7,henghesha8,henghesha9],
      ocean:[ocean1,ocean2,ocean3,ocean4,ocean5,ocean6,ocean7,ocean8,ocean9],
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
      RankingSwitch:'综合排名',
      bgHeight:'',
      SEPARATION:100,AMOUNTX :50,AMOUNTY :50,container:'',camera:'', scene:'', renderer:'',particles:0, particle:0,count:0,mouseX:200,mouseY:-200,windowHalfX:window.innerWidth / 2,windowHalfY: window.innerHeight / 2
    }
  },
  mounted:function () {
    this.startStyle();
    this.bubble();
  },
  methods:{
    startStyle(){
      $(".landscape").css({bottom:$(".myNav").height()+'px'})

      const that = this;
      that.imgDiv.push(that.PearlLevel5);

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
    },
    animation(e,arr){
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.padding = "0";
      e.target.style.width = '200%';
      e.target.style.height = '200%';
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
          imgArr=this.pearl;
          this.animation(e,imgArr);
          this.$layer.msg("普通珍珠");
          break;
        case 2:
          imgArr=this.opal;
          this.animation(e,imgArr);
          this.$layer.msg("稀有物品 猫眼");
          break;
        case 3:
          imgArr=this.opper;
          this.animation(e,imgArr);
          this.$layer.msg("珍宝 - 影欧珀");
          break;
        case 4:
          imgArr=this.hengshesha;
          this.animation(e,imgArr);
          this.$layer.msg("极品 --- 恒河沙");
          break;
        case 5:
          imgArr=this.ocean;
          this.animation(e,imgArr);
          this.$layer.msg("恭喜获得 海洋之心");
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
    },
    bubble(){
      function Star(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random()*2)+1;
        var alpha = (Math.floor(Math.random()*10)+1)/10/2;
        this.color = "rgba(255,255,255,"+alpha+")";
      }

      Star.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      }

      Star.prototype.move = function() {
        this.y -= .15;
        if (this.y <= -10) this.y = HEIGHT + 10;
        this.draw();
      }

      Star.prototype.die = function() {
        stars[this.id] = null;
        delete stars[this.id];
      }


      function Dot(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random()*5)+1;
        this.maxLinks = 2;
        this.speed = .5;
        this.a = .5;
        this.aReduction = .005;
        this.color = "rgba(255,255,255,"+this.a+")";
        this.linkColor = "rgba(255,255,255,"+this.a/4+")";

        this.dir = Math.floor(Math.random()*140)+200;
      }

      Dot.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      }

      Dot.prototype.link = function() {
        if (this.id == 0) return;
        var previousDot1 = getPreviousDot(this.id, 1);
        var previousDot2 = getPreviousDot(this.id, 2);
        var previousDot3 = getPreviousDot(this.id, 3);
        if (!previousDot1) return;
        ctx.strokeStyle = this.linkColor;
        ctx.moveTo(previousDot1.x, previousDot1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
        if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
        ctx.stroke();
        ctx.closePath();
      }

      function getPreviousDot(id, stepback) {
        if (id == 0 || id - stepback < 0) return false;
        if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
        else return false;//getPreviousDot(id - stepback);
      }

      Dot.prototype.move = function() {
        this.a -= this.aReduction;
        if (this.a <= 0) {
          this.die();
          return
        }
        this.color = "rgba(255,255,255,"+this.a+")";
        this.linkColor = "rgba(255,255,255,"+this.a/4+")";
        this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
          this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

        this.draw();
        this.link();
      }

      Dot.prototype.die = function() {
        dots[this.id] = null;
        delete dots[this.id];
      }


      var canvas  = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY,
        stars = [],
        initStarsPopulation = 80,
        dots = [],
        dotsMinDist = 2,
        maxDistFromCursor = 50;

      setCanvasSize();
      init();

      function setCanvasSize() {
        WIDTH = document.documentElement.clientWidth,
          HEIGHT = document.documentElement.clientHeight;

        canvas.setAttribute("width", WIDTH);
        canvas.setAttribute("height", HEIGHT);
      }

      function init() {
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < initStarsPopulation; i++) {
          stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
          //stars[i].draw();
        }
        ctx.shadowBlur = 0;
        animate();
      }

      function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in stars) {
          stars[i].move();
        }
        for (var i in dots) {
          dots[i].move();
        }
        drawIfMouseMoving();
        requestAnimationFrame(animate);
      }
      var can = document.getElementById("canvas")
      window.onmousemove = function(e){
        mouseMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        clearInterval(mouseMoveChecker);
        mouseMoveChecker = setTimeout(function() {
          mouseMoving = false;
        }, 100);
      }


      function drawIfMouseMoving(){
        if (!mouseMoving) return;

        if (dots.length == 0) {
          dots[0] = new Dot(0, mouseX, mouseY);
          dots[0].draw();
          return;
        }

        var previousDot = getPreviousDot(dots.length, 1);
        var prevX = previousDot.x;
        var prevY = previousDot.y;

        var diffX = Math.abs(prevX - mouseX);
        var diffY = Math.abs(prevY - mouseY);

        if (diffX < dotsMinDist || diffY < dotsMinDist) return;

        var xVariation = Math.random() > .5 ? -1 : 1;
        xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
        var yVariation = Math.random() > .5 ? -1 : 1;
        yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
        dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
        dots[dots.length-1].draw();
        dots[dots.length-1].link();
      }
//setInterval(drawIfMouseMoving, 17);

      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
    }


  }

}
</script>
<style scoped>
  #content{
    width: 100vw;
    margin:0;
    overflow:hidden;
    height:100vh;
    cursor:none;
    background:black;
    color: #fff;
    background:linear-gradient(to bottom,#0B0B15 0%,#5788fe 100%);
  }
  .filter {
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:#58DEFF;
    animation:colorChange 30s ease-in-out infinite;
    animation-fill-mode:both;
    mix-blend-mode:overlay;
  }
  @keyframes colorChange {
    0%,100% {
      opacity:0;
    }
    50% {
      opacity:.9;
    }
  }.landscape {
     position:absolute;
     left:0;
     width:100%;
     height:100%;
     /*background-image:url(https://openclipart.org/image/2400px/svg_to_png/250847/Trees-Landscape-Silhouette.png);
       */
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
		font-family: "微软雅黑";
		font-size: 1.01rem;
    background: rgba(255,255,255,0.1);
	}
  .topOption{
    position: absolute;
  }
  .option1{
    left: 1.5rem;
    top: 9rem;
  }

  .invitation-friends{
    border-radius: 50%;
    padding: 0.4rem;
  }
  .option2,.option3,.option4{
    width: 6rem;
    float: right;
    text-align: center;
    position: absolute;
    top: 72vh;
    color: #fff;
  }
  .option2{
    right: 0.6rem;
  }
  .option3{
    top: 55vh;
    right: 0.6rem;
  }
  .option2 img, .option3 img,.option4 img{
    width: 70%;
  }
  .option4{
    left: 0.6rem;
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

  p{
    margin-bottom: 0;
  }
  .tips{
    width: 0.6rem;height: 0.6rem;display: inline-block;background: #FC0506;position: absolute;right: 1.2rem;margin-top:0.2rem;border-radius: 50%
  }
</style>
