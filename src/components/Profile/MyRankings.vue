<template>
  <div class="content">
    <div id="navBox">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
        <span class="navTitleText">夺宝记录</span>
      </mu-appbar>
      <div class="income" id="nav2">
        <div class="today">
          <div class="incomeTitle">今日收益</div>
          <div style="font-size: 34px; font-weight: 300;">{{today}}</div>
        </div>
        <div style="display: flex">
          <div class="text-center" style="width: 50%;">
            <div class="grid-cell">
              <div class="incomeTitle">昨日收益</div>
              <div>{{yesterday}}</div>
            </div>
          </div>
          <div class="text-center" style="width: 50%;">
            <div class="grid-cell">
              <div class="incomeTitle">累计收益</div>
              <div>{{total}}</div>
            </div>
          </div>
        </div>
      </div>
      <mu-paper id="nav3" :z-depth="0">
        <mu-list style="padding: 0">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title><span  style="color: #09a2d6;margin-right: 0.6rem;font-weight: 700">|</span>夺宝记录</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>

    <mu-paper id="dataBox" :z-depth="2">
      <mu-list class="mu-list">
            <mu-list-item class="mu-list-item" v-for="(i,index) in data" :key="index">
              <mu-list-item-content>
                <mu-list-item-title>Photos</mu-list-item-title>
                <mu-list-item-sub-title class="dateText">Jan 9, 2014</mu-list-item-sub-title>
              </mu-list-item-content>
              <mu-list-item-action>
                <mu-list-item-title class="count">+300</mu-list-item-title>
              </mu-list-item-action>
            </mu-list-item>

      </mu-list>
    </mu-paper>


  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "myrankings",
        data(){
          return{
            masrc: back,
            isBlack:true,
            today:'',
            yesterday:'',
            total:'',
            data:[1,2,3,4,5,6,7,8]

          }
        },
      mounted(){
        let height=$("#nav1").height()+$("#nav2").height()+$("#nav3").height();
        console.log(height)
        $("#navBox").css({height:height+'px'});
        $("#dataBox").css({marginTop:height+'px'});
        this.$nextTick(function() {
				this.myrankings();
			})
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
          myrankings(){
          	this.$http({
						method: "post",
						url: "/play-record",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {}
					}).then(function(res) {
						
						if(res.data.code == 0) {
							this.today = res.data.data.today_pearl_reward;
							this.total = res.data.data.total_pearl_reward;
							this.yesterday = res.data.data.yesterday_pearl_reward;
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
          }
      }
    }
</script>

<style scoped>
  .content {
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f5f5f5;
    width: 100vw;
    height: 100vh;
  }
  #navBox{
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 9999;
    background: #fff;
  }
  .content::-webkit-scrollbar {
    display:none
  }

  .titleText{
    font-size: 17px;
  }
  .back{
    position: absolute;
    left:0.5rem;
  }
  .back img {
    height: 30px;
  }
  .income{
    background: #09a2d6;
    text-align: center;
    width: 100%;
    color: #fff;
  }
  .incomeTitle{
    font-size: 1.5rem;
  }
  .today{
    width: 90%;
    margin: auto;
    border-bottom: 2px solid rgba(255,255,255,0.1);
    padding: 1rem 0;
  }
  .grid-cell{
    margin: 1rem 0;
  }
  .grid-cell:first-child{
    border-right: 1px solid rgba(255,255,255,0.2);
  }
  .mu-list{
    border-bottom: 1px solid #eee;

  }
  .mu-list-item{
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .mu-list-item:last-child{
    border-bottom: none;
  }
  .dateText{
    font-size: 1rem;
  }
  .mu-divider{
    background: #eee;
  }
  .dataList:last-child>.mu-divider{
    display: none;
  }
  .count{
    color: #09a2d6;
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
    font-size: 1.5rem;
    text-align: left;
    color: #444;
    padding: 0.5rem 0;
  }
  #ranking{
    width:30%;
  }
  #listTitle{
    padding: 1rem;
    height:4rem;
    display: block;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  #listTitle:active{
    background: #ddd;
  }
  .myData td{
    padding:0 2rem ;
  }
</style>
