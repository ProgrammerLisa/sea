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
            <p class="media-heading">{{goods.commodityTitle}}</p>
            <div class="commodityPrice">{{goods.commodityPrice}}</div>
            <div class="goodsMessage">成交价 ( 钻石量 )</div>
            <div>
              <span class="goodsMessage">兑换次数：{{goods.commodityNumber}} </span>
              <button class="btn enchangeBtnEnd" v-if="goods.isEnd">
                已结束
              </button>
              <button class="btn enchangeBtn" v-else>
                立即兑换
              </button>
            </div>
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
                commodityNumber:28,
                isEnd:false
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机2',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:true
              },
              {
                commodityImg:commodityImg,
                commodityTitle:'品质生活 博朗榨汁机果汁机3',
                commodityPropaganda:'博朗家用电动大功率榨汁机。 快速榨汁系统。 使维他命不流失，口感俱佳。',
                commodityPrice:106.2266,
                commodityCount:50,
                commodityNumber:28,
                isEnd:true
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
                isEnd:true
              },
            ]
          }
        },
      methods:{
        sendParams (index) {
          const that = this;
          if(that.commodity[index].isEnd){
            this.$layer.alert('活动已结束', {
              type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
              title: '温馨提示',
              content: '',
              area: 'auto',
              offset: 'auto',
              icon: -1,
              btn: '确定',
              time: 0,
              shade: true,
              yes: '',
              cancel: '',
              tips: [3,'#c00'],//支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
              tipsMore: false,//是否允许多个tips
              shadeClose: false,
            });
            $(".vl-notice-title").css({display:'none'});
            $(".vl-notify-btns").css({textAlign:'center',paddingBottom:'1rem'});
            $(".vl-notify-content").css({textAlign:'center'});
            $(".notify-btn-primary").css({background:'#09a2d6',borderRadius:0,padding:'0.2rem 1.5rem',margin:'0 1rem'});
          }else {
            that.$router.push({
              path: '/commoditydetails',
              name: 'CommodityDetails',
              params: {
                name:'name',
                dataObj:that.commodity[index]

              }

            })
          }

        }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #666;
    padding-bottom: 6rem;
    background: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
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
    font-size: 1.6rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .carousel img{
    width: 100%;
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
  .enchangeBtn:focus{
  	outline: 0;
  }
  .enchangeBtnEnd{
    float: right;
    border-radius: 0;
    background: #f5f5f5;
  }
  .enchangeBtnEnd:focus{
  	outline: 0;
  }
</style>
