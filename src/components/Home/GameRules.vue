<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">规则说明</span>
    </mu-appbar>
    <div class="contentMarginTop" >
      <mu-list toggle-nested class="myContainer">
        <mu-list-item v-for="(i,index) in list" :key="index" class="ListItem" button :ripple="false" nested :open="open === index" @toggle-nested="open = arguments[0] ? index : ''">
          <mu-list-item-title class="title">{{i.title}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon class="toggle-icon" size="24" value="navigate_next" color="#999"></mu-icon>
          </mu-list-item-action>
          <mu-list-item button :ripple="false" slot="nested" v-for="(c,item) in i.content" :key="item">
              <p class="whatContent">{{c}}</p>
          </mu-list-item>
        </mu-list-item>
      </mu-list>

    </div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "gamerules",
		data() {
			return {
				masrc: back,
        open: '',
        list:[
          {title:'1 什么是夺宝行动？',content:['夺宝行动APP是由铂森科技推出的区块链以及社交平台，用户获得邀请码注册之后即可免费领取数字资产“珍珠”，平台还支持信息安全存储、去中心化价值交换等功能。','平台通过区块链加密存储技术帮助用户管理数字资产，让用户数据真正为自己所有，后期平台也可以让需求者进行直接交易，并利用珍珠进行结算。']},
          {title:'2 什么是珍珠？',content:['珍珠是依托于区块链技术，基于个人夺宝活动中产生的奖励，可以用于平台上的消费与兑换等，珍珠总量有限，且每2年产出量减少一半，随着时间的推移获取难度越来越大，前期参与更有优势。']},
          {title:'3 普通珍珠与海洋之心有什么区别？',content:['一颗海洋之心几乎等价于十颗普通珍珠，1到4级用户只能获得普通珍珠，偶尔会中奖得到海洋之心。升到5级用户每天会额外赠送一颗海洋之心。']},
          {title:'4 如何获得能量值以及普升更高级别？',content:['用户通过邀请码或者二维码，邀请一定数量的好友下载并注册夺宝行动APP，就可以直接获取能量，并可以获赠珍珠，能量值越高级别越高。']},
          {title:'5 如何理解偷珍珠与被偷？',content:['一般用户每24小时会产生3批左右珍珠，平均每8小时左右产生一批，每一批珍珠产生会有30分钟的保护时间，30分钟之后好友就可以过来偷取，被偷取后大概8小时左右继续产生下一批珍珠。如果珍珠产生之后没有收取或者被偷，不会继续产生下一批。']},
          {title:'6 如何理解平台里面的好友？',content:['邀请人与被邀请人会直接成为好友，会出现在好友列表里，可以互相偷取珍珠，并可以相互留言互动。所以好友越多，被偷取的目标群体越大，所以大家尽快邀请你的小伙伴加入吧，组织自己的好友圈子，一起夺宝。']},
          {title:'7 如何用珍珠换取商品？',content:['平台为所有用户挑选了各种精美商品，每种产品价值都不一样，只要达到相对应的珍珠标价，即可兑换，无需竞拍，通过兑换商品窗口直接进去兑换。']},
          {title:'8 如何用珍珠参与公益慈善？',content:['平台与社会慈善机购直接合作，用户可以通过公益慈善入口直接参与帮助有需要的人，直接捐赠出若干珍珠即可，平台会在每个月初汇总上一个月所有用户捐赠珍珠总额，并以大概估值兑换成人民币捐赠给慈善机购，并落实到位被捐赠者。']}
        ]
			}
		},
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };

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
			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #323232;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    font-size: 1.6rem;
    background-image: url("../../assets/images/guizezshuomingbg.png");
    background-repeat: no-repeat;
    background-size: 100% 60%;
    background-color: #f5f5f5;
	}
  .content::-webkit-scrollbar{
    display: none;
  }
  .contentMarginTop{
    padding: 1rem 1rem 2rem;
  }
  .myContainer{
    background: white;
    border-radius: 8px;
    position: relative;
  }
  .ListItem{
    border-bottom: 1px solid #f5f5f5;
    padding-right: 1rem;
    width: 100%;
  }
  .ListItem:last-child{
    border: none;
  }
  .whatContent{
    padding-right: 1rem;
  }
  .title{
    margin: 1rem 0;
    color: #09A2D6;
  }
</style>
