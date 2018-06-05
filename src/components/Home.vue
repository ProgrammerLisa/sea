<template>
  <div class="contentMain">
    <div id="main-top">

     <div id="notice">
    		<marquee height="30rem" bgcolor="#3d85c6" scrollamount="5" scrolldelay="1"><span style="line-height: 2.5rem;">公告:亲爱的用户，平台momomo即将上线，敬请期待。</span></marquee>
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
            <li><router-link to="/AddFriends" tag="a"><img src="../assets/images/tianjiahaoyou.png" class="dropdown-menu-img"/>添加好友</router-link></li>
            <li role="separator" class="divider"></li>
            <li><a href="#"><img src="../assets/images/zhanji.png" class="dropdown-menu-img"/>战绩</a></li>
          </ul>
        </div>
      </div>

      <div id="imgDiv"></div>
    </div>
    <router-link class="option4" to="AddFriends" tag="div">
      <img src="../assets/images/yaoqinghaoyou.png"  class="invitation-friends"/>
      <p>邀请好友</p>
    </router-link>
    <div v-for="(m,index) in imgDiv" :class="m.divClass" @click="accumulative(index)" >
      <img v-bind:style="m.style" :src="m.href"/>
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
import animation1 from '@/assets/images/Pearl.gif'
import animation2 from '@/assets/images/Shadow-opper.gif'
import animation3 from '@/assets/images/Ganganadi-valuka.gif'
import animation4 from '@/assets/images/Cat-eye.gif'
import animation5 from '@/assets/images/ocean.gif'
export default {
  components: {
    Group,
    Cell
  },
  data(){
    return{
      imgSum:0,
      imgSrc:backGround,
      imgDiv:[
        {imgCount:1,href:shell,divClass:'',animation:animation1},
        {imgCount:1,href:shell,divClass:'',animation:animation2},
        {imgCount:1,href:shell,divClass:'',animation:animation3}
      ],
      PearlLevel1:{
        imgCount:1,
        href:shell,
        divClass:'',
        animation:animation1
      },
      PearlLevel2:{
        imgCount:2,
        href:shell,
        divClass:'',
        animation:animation2
      },
      PearlLevel3:{
        imgCount:3,
        href:shell,
        divClass:'',
        animation:animation3
      },
      PearlLevel4:{
        imgCount:4,
        href:shell,
        divClass:'',
        animation:animation4
      },
      PearlLevel5:{
        imgCount:5,
        href:shell,
        divClass:'',
        animation:animation5
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
      that.cookies();
      for(var i=0;i<that.imgDiv.length;i++){
        that.imgDiv[i].divClass='float-container float-container'+i
      }
    })


  },
  methods:{
    cookies(){
      const that = this;
      $(function () {
        $(".float-container").each(function (index, obj) {
          var ck = "float-container-top-" + index;
          var cl = "float-container-left-" + index;
          var cookievalTop =  that.readCookie(ck);
          var cookievalLeft =  that.readCookie(cl);
          if (cookievalTop == ""||cookievalLeft == "") {
            cookievalTop = parseInt((($('#main-top').outerHeight()-100)*0.7*Math.random()+$('#main-top').outerHeight()*0.3)/12);
            cookievalLeft = parseInt(($('#main-top').outerWidth()-100)*0.8*Math.random()/12);
            $(this).css({top:cookievalTop+'rem',left:cookievalLeft+'rem'});
            that.writeCookie(ck, cookievalTop);
            that.writeCookie(cl, cookievalLeft);
          } else {
            $(this).css({top:cookievalTop+'rem',left:cookievalLeft+'rem'});
          }
        });
      });
    },
    accumulative(index){
      const that = this;
      that.imgDiv[index].href = that.imgDiv[index].animation;
      that.imgSum+=that.imgDiv[index].imgCount;
      $(".float-container"+index+">img").animate({width:'190%',marginLeft:'-4vw',marginTop:'-6vw'});
      setTimeout(function(){
        $(".float-container"+index).remove();
        that.delCookie('float-container-left-' + index);
        that.delCookie('float-container-top-' + index);
      },2000);

    },
    writeCookie(name, value, hours) {
      var expire = "";
      hours = hours || 100;
      if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
      }
      document.cookie = name + "=" + escape(value) + expire;
    },
    readCookie(name) {
      var cookieValue = "";
      var search = name + "=";
      if (document.cookie.length > 0) {
        var offset = document.cookie.indexOf(search);
        if (offset != -1) {
          offset += search.length;
          var end = document.cookie.indexOf(";", offset);
          if (end == -1) end = document.cookie.length;
          cookieValue = unescape(document.cookie.substring(offset, end))
        }
      }
      return cookieValue;
    },
    delCookie(name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval= this.readCookie(name);
      if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
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
    background: rgba(255,255,255,0.1);
    padding-top: 0.4rem;
	}
  .contentMain{
    width: 100vw;
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #666;
  }
  #main-top{
    background: url("../assets/images/bg.png") 100% 100%;
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
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: absolute;
    /*box-shadow: 0.1rem 0.1rem 0.1rem #112941;*/
    animation: myfirst 2s infinite;
    /*background: -webkit-radial-gradient(rgba(255,255,255,0.2),rgba(8,50,144,1)); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-radial-gradient(rgba(255,255,255,0.2),rgba(8,50,144,1)); !* Opera 11.6 - 12.0 *!*/
    /*background: -moz-radial-gradient(rgba(255,255,255,0.2),rgba(8,50,144,1)); !* Firefox 3.6 - 15 *!*/
    /*background: radial-gradient(rgba(255,255,255,0.3),rgba(8,50,144,1)); !* 标准的语法（必须放在最后） *!*/
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
