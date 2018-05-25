<template>
  <div class="contentMain">
    <div id="main-top">
      <img src="../assets/images/bg.png" class="bcImg" id="seaBack"  ref="seaBack" />
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
            <li><router-link to="/AddFriends" tag="a"><img src="../assets/images/tianjiahaoyou.png" class="dropdown-menu-img"/>添加好友</router-link></li>
            <li><a href="#"><img src="../assets/images/zhanji.png" class="dropdown-menu-img"/>战绩</a></li>
          </ul>
        </div>
      </div>
      <router-link class="topOption option4" to="AddFriends" tag="div">
        <img src="../assets/images/yaoqinghaoyou.png"/>
        <p>邀请好友</p>
      </router-link>
      <div id="imgDiv"></div>
    </div>
    <div v-for="(m,index) in imgDiv" :class="m.divClass" @click="accumulative(index)" >
      <img v-bind:style="m.style" :src="m.href"/>
    </div>


    <group title="cell demo" @click.native="rankings">
      <cell v-bind:title="RankingTitle" v-bind:value="RankingSwitch" is-link ></cell>
    </group>
    <table v-if="isBlack" class="table">
      <tr><td class="text-left">得宝数据</td></tr>
      <tr class="bcfff" v-for="list in RankingListBlack">
        <td class="text-left">{{list.title}}</td>
        <td class="text-right">{{list.count}}</td>
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
import Pearl from '@/assets/images/bihe.png'
import animation from '@/assets/images/animation.gif'
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
        {imgCount:1,href:Pearl,divClass:'',animation:animation},
        {imgCount:1,href:Pearl,divClass:'',animation:animation},
        {imgCount:1,href:Pearl,divClass:'',animation:animation}
      ],
      PearlLevel1:{
        imgCount:1,
        href:Pearl,
        divClass:'',
        animation:animation
      },
      PearlLevel2:{
        imgCount:2,
        href:Pearl,
        divClass:'',
        animation:animation
      },
      PearlLevel3:{
        imgCount:3,
        href:Pearl,
        divClass:'',
        animation:animation
      },
      PearlLevel4:{
        imgCount:4,
        href:Pearl,
        divClass:'',
        animation:animation
      },
      PearlLevel5:{
        imgCount:5,
        href:Pearl,
        divClass:'',
        animation:animation
      },
      isBlack:true,
      RankingListBlack:[
        {title:'我的排名',count:66},
        {title:'今日得宝数',count:75},
        {title:'全民累计得宝数',count:75}
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
            cookievalTop = parseInt(($('#main-top').outerHeight()-100)*Math.random()/12);
            cookievalLeft = parseInt(($('#main-top').outerWidth()-100)*Math.random()/12);
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
      $(".float-container"+index+">img").animate({width:'190%',marginLeft:'-3.5vw',marginTop:'-5vw'});
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

<style scoped>
  .contentMain{
    width: 100vw;
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #555;
  }
  #main-top{
    background: #122b40;
    color: white;
    height: 65vh;
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
  .option4{
    top: 25rem;
    right: 1rem;
    color: #fff;
    text-align: center;
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
    margin-left: 4rem;
    margin-top: 4rem;
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
</style>
