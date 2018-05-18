<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          商城
        </div>
      </div>
      <div class="carousel">
        <img :src="carousel"/>
      </div>
      <div class="media" v-for="(goods,index) in commodity">
        <div @click="sendParams(index)">
          <div class="media-left">
            <img class="media-object" :src="goods.commodityImg" alt="...">
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{goods.commodityTitle}}</h4>
            <div class="commodityPrice">{{goods.commodityPrice}}</div>
            <div>成交价 ( 钻石量 )</div>
            <div>兑换次数：{{goods.commodityNumber}}</div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
    import carousel from '@/assets/images/banner.png'
    import commodityImg from '@/assets/images/bg.png'
    export default {
        name: "Shopping",
        data(){
          return{
            carousel:carousel,
            commodity:[
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机1',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机2',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机3',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机4',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机5',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28
              },
            ]
          }
        },
      methods:{
        sendParams (index) {
          const that = this;
          this.$router.push({
            path: '/CommodityDetails',
            name: 'CommodityDetails',
            params: {
              name:'name',
              dataObj:this.commodity[index]

            }

          })
        }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #777;
    padding-bottom: 6rem;
    background: #f5f5f5;
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
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .carousel img{
    width: 100%;
    height: 20vh;
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
  }
  .commodityPrice{
    font-size: 1.6rem;
    color: #555;
  }
</style>
