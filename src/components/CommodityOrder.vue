<template>
 <div class="content">
   <div class="panel panel-default BlackTitle">
     <div class="panel-body">
       <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
       我的订单
     </div>
   </div>
   <div class="media" v-for="(goods,index) in commodity">
     <div>
       <div class="media-left">
         <img class="media-object" :src="goods.commodityImg" alt="...">
       </div>
       <div class="media-body">
         <p class="media-heading">{{goods.commodityTitle}}</p>
         <div class="commodityPrice">{{goods.commodityPrice}}</div>
         <div class="goodsMessage">成交价 ( 钻石量 )</div>
         <div>
           <span class="goodsMessage">兑换次数：{{goods.commodityNumber}} </span>
           <button class="btn enchangeBtnEnd" v-if="goods.isEnd">
             已收货
           </button>
           <button class="btn enchangeBtn" v-else>
             确认收货
           </button>
         </div>
       </div>
     </div>

   </div>
 </div>
</template>

<script>
    import commodityImg from '@/assets/images/bg.png'
    export default {
        name: "CommodityOrder",
        data(){
          return{
            commodity:[
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机1',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:true
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机2',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:false
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机3',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:false
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机4',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:true
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机5',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:false
              },
            ]
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #777;
    background: #f5f5f5;
    padding-bottom: 6rem;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 1rem;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .media{
    padding: 1.5rem 1rem;
    margin: 0;
    border-bottom: 0.1rem solid #f5f5f5;
    background: #fff;
  }
  .media-left img{
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
  }
  .media-heading{
    color: #555;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  .commodityPrice{
    font-size: 1.6rem;
    color: #09a2d6;
  }
  .goodsMessage{
    font-size: smaller;
  }
  .enchangeBtn{
    float: right;
    border-radius: 0;
    background: #fff;
    border: 0.1rem solid #09a2d6;
    color: #09a2d6;
    padding: 0.5rem;
  }
  .enchangeBtnEnd{
    float: right;
    border-radius: 0;
    background: #09a2d6;
    color: #fff;
  }
</style>
