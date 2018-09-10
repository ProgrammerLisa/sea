<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的钱包</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <div class="titleTab">
        <div class="tabHalf" style="margin-top: 0.5rem">
          <span>珍珠余额</span>
          <h1 class="fontColor h1Style">2.6122</h1>
        </div>
        <div class="tabHalf">
          <div class="tabHeightHalf">今日消费 <span class="fontColor">100.2222</span></div>
          <div class="tabHeightHalf">累计消费 <span class="fontColor">200.3666</span></div>
        </div>
      </div>
    </div>
    <div class="walletUL">
      <div class="walletTitle"><span class="leftIcon"></span>支出记录</div>
      <div class="walletList">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div class="walletListItem" v-for="i in list">
            <div class="itemLeft text-left">
              <div class="itemLeftTitle">兑换订单</div>
              <div class="itemLeftData">2018-05-18  10:56:16</div>
            </div>
            <h4 class="fontColor itemRight text-right">-5</h4>
          </div>
        </mu-load-more>
        <div class="noMore" v-show="noMoreMessage">没有更多信息了</div>
      </div>
    </div>

	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	export default {
		name: "wallet",
		data() {
			return {
				masrc: back,
        refreshing: false,
        loading: false,
        noMoreMessage:false,
        list:[1,2,3,1,1,1,1,1,1,1]
			}
		},
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
       $(".walletList").css({height:$(window).innerHeight()-($(".myNavTitle").innerHeight()+$(".contentMarginTop").innerHeight()+$(".walletTitle").innerHeight()+33)+'px',overflow:"scroll"})

    },
		methods: {
      refresh () {
        this.refreshing = true;
        setTimeout(() => {
          this.refreshing = false;
          this.noMoreMessage=false;
        }, 1000)
      },
      load () {
        if(!this.noMoreMessage){
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.noMoreMessage=true;
          }, 1000)
        }

      },
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>

	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #fff;
    width: 100vw;
    position: fixed;
    top: 0;
    font-size: 1.6rem;
	}
  .contentMarginTop{
    margin-top: 56px;
    background-image: url("../../assets/images/qianbaobg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding:1.5rem 1rem;
  }
  .titleTab{
    background: #fff;
    padding:2rem 1rem;
    border-radius: 8px;
    display: flex;
  }
  .fontColor{
    color: #09a2d6;
  }
  .tabHalf{
    width: 50%;
  }
  .tabHeightHalf{
    height: 50%;
  }
  .tabHeightHalf:first-child{
    padding-bottom: 1rem;border-bottom: 1px solid #f5f5f5
  }
  .tabHeightHalf:last-child{
    padding-top: 1rem
  }
  .h1Style{
    margin: 1rem 0;
  }
  .walletUL{
    margin: 1rem;
    box-shadow: 2px 2px 10px #E3EFF3;
    border: solid 1px #E3EFF3;
    border-radius: 8px;
  }
  .walletTitle{
    padding: 1rem;
    border-bottom: 2px solid #f5f5f5;
    color: #333;
    font-size: 1.7rem;
  }
  .leftIcon{
    display: inline-block;width: 4px; background: linear-gradient(to right, #38E7F8 , #0BA5D7);height: 1.3rem;vertical-align: middle;margin-right: 0.5rem
  }
  .walletListItem{
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
  }
  .itemLeft{
    width: 70%;
  }
  .itemRight{
    width: 30%;
  }
  .itemLeftTitle{
    color: #333;
    margin-bottom: 0.5rem;
  }
  .itemLeftData{
    font-size: small;
  }
  .itemRight{
    line-height: 2.5rem;
  }
  .noMore{
    width: 100%;
    line-height: 4rem;
    color: #666;
    text-align: center;
    background: #fff;
    margin-top: -4rem;
  }
</style>
