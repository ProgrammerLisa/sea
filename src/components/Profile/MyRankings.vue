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
          <div style="font-size: 34px; font-weight: 300;">{{today_pearl_reward}}</div>
        </div>
        <div style="display: flex">
          <div class="text-center" style="width: 50%;">
            <div class="grid-cell">
              <div class="incomeTitle">昨日收益</div>
              <div>{{yesterday_pearl_reward}}</div>
            </div>
          </div>
          <div class="text-center" style="width: 50%;">
            <div class="grid-cell">
              <div class="incomeTitle">累计收益</div>
              <div>{{total_pearl_reward}}</div>
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
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list class="mu-list">
                <mu-list-item class="mu-list-item" v-for="(i,index) in data" :key="index">
                  <mu-list-item-content>
                    <mu-list-item-title>获取{{i.pearl_type}}</mu-list-item-title>
                    <mu-list-item-sub-title class="dateText">{{i.handled_at}}</mu-list-item-sub-title>
                  </mu-list-item-content>
                  <mu-list-item-action>
                    <mu-list-item-title class="count">+{{i.hand_out_reward}}</mu-list-item-title>
                  </mu-list-item-action>
                </mu-list-item>

          </mu-list>
        </mu-load-more>
      </mu-container>
    </mu-paper>
    <div class="noMore" v-show="noMore">没有更多信息了</div>


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
            refreshing: false,
            loading: false,
            isBlack:true,
            today_pearl_reward:0,
            total_pearl_reward:0,
            yesterday_pearl_reward:0,
            data:[],
            mobile:{id:'',handled_at:'',hand_out_reward:'',pearl_type:''},
            pearl_type:[],
            next:"/play-record",
            noMore:false
          }
        },
      mounted(){
        this.$nextTick(function() {
          this.rankingStyle()
          this.ranking()

        })
      },
      methods: {
        rankingStyle(){
          $("#dataBox").css({marginTop:$("#navBox").height()+'px'})

        },
        ranking(){
          this.$http({
            method: "post",
            url: this.next,
            headers: {
              "device": "android",
              "uid": localStorage.getItem("uid"),
              "Access-Control-Allow-Origin": "*"
            }
          }).then(function(res) {
            this.loading = false;
            console.log(res.data);
            if(res.data.code === 0) {
              this.next=res.data.data.pearls.next;
              this.today_pearl_reward=res.data.data.today_pearl_reward;
              this.total_pearl_reward=res.data.data.total_pearl_reward;
              this.yesterday_pearl_reward=res.data.data.yesterday_pearl_reward;
              if(res.data.data.pearls.items.length>0){
                for (let i in res.data.data.pearls.items) {
                  if(res.data.data.pearls.items[i].pearl_type==="NORMAL"){
                    this.mobile.pearl_type="珍珠";
                  }else{
                    this.mobile.pearl_type="海洋之心";
                  }
                  this.mobile.handled_at=res.data.data.pearls.items[i].handled_at;
                  this.mobile.hand_out_reward=res.data.data.pearls.items[i].hand_out_reward;
                  this.mobile.id=res.data.data.pearls.items[i].id;
                  this.data.push(this.mobile);
                  this.mobile={id:'',handled_at:'',hand_out_reward:'',pearl_type:''}
                }

              }
            }
          }.bind(this))
            .catch(function(err) {
              this.loading = false;
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this))
        },
        evers() {
          this.masrc = backs;
        },
        lat() {
          this.masrc = back;
        },
        goBack() {
          this.$router.go(-1);
        },
        refresh () {
          this.refreshing = true;
          this.$refs.container.scrollTop = 0;
          this.data=[];
          this.next="/play-record";
          $(".mu-infinite-scroll").css({display:"block",textAlign:'center',paddingTop:'12px'});
          $(".mu-circle-wrapper").css({verticalAlign:'middle'});
          this.noMore=false;
          this.ranking();
          setTimeout(() => {
            this.refreshing = false;
          }, 1000)
        },
        load () {
          this.loading = true;
          if(this.next===""){
            setTimeout(() => {
              this.loading = false;
              $(".mu-infinite-scroll").css({display:"none"})
              this.noMore=true;
            },3000)
          }else {
            this.ranking()
          }
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
  .container{
    padding-left: 0;
    padding-right: 0;
  }
  .income{
    background: #09a2d6;
    text-align: center;
    width: 100%;
    color: #fff;
    margin-top: 56px;
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
  .count{
    color: #09a2d6;
    padding-right: 16px;
  }
  .noMore{
    width: 100%;
    line-height: 4rem;
    color: #666;
    text-align: center;
    background: #fff;
  }
</style>
