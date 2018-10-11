<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">商城</span>
    </mu-appbar>
		<div class="commodityImg contentMarginTop" id="commodityImgs">
      <!--<img :src="commodityImg" />-->
      <mu-carousel transition="fade">
        <mu-carousel-item v-for="(i,index) in commodityImg" :key="index">
          <img :src="i">
        </mu-carousel-item>
      </mu-carousel>
		</div>
		<div class="commodityTitle">
			<h4>{{commodityTitle}}</h4>
			<p class="commodityPropaganda">{{commodityPropaganda}}</p>
		</div>
		<div class="commodityPrice">
			<span class="nowPrice">当前价：<span class="priceNumber">{{commodityPrice}}</span></span>
      <span class="commodityCount">已兑换：{{commodityNumber}} 件</span>
			<div>( 成交价：珍珠数 )</div>
		</div>
    <div>
      <h4 class="title">详 情</h4>
      <dl v-html="commodityDetail">
        {{commodityDetail}}
      </dl>
    </div>
		<div class="considerations">
			<h4 class="considerationsTitle">须 知</h4>
			<ul class="commodityConsiderations">
				<li>参与须知:</li>
				<li v-for="c in commodityConsiderations">*{{c.considerations}}</li>
			</ul>
		</div>
		<div class="exchange">
			<mu-button flat class="publicButton" @click="preOrder">立即兑换</mu-button>
		</div>
    <mu-bottom-sheet :open.sync="open">
      <div @item-click="closeBottomSheet">
        <div class="sheetContainer">
          <div class="flexContainer sheetHead">
            <div class="sheetGoodsImg">
              <img :src="commodityImg[0]" />
              <!--<mu-carousel transition="fade">-->
                <!--<mu-carousel-item v-for="(i,index) in commodityImg" :key="index">-->
                  <!--<img :src="i">-->
                <!--</mu-carousel-item>-->
              <!--</mu-carousel>-->
            </div>
            <div class="sheetGoodsStyle">
              <div class="marginBottom">珍珠：<span class="priceNumber">{{commodityPrice*count}}</span></div>
              <div class="marginBottom">已兑换：{{commodityNumber}} 件</div>
              <div v-if="size!==''||color!==''">已选：<span style="color: #09a2d6">{{color}} {{size}}</span></div>
              <div v-else>请选择商品属性</div>
            </div>
            <div class="closeBtn">
              <mu-icon value="highlight_off" color="grey600" @click="closeBottomSheet"></mu-icon>
            </div>
          </div>
          <div class="sheetBody">
            <div class="sheetTitle">尺码</div>
            <div class="listBorder">
              <mu-radio v-for="(s,item) in sizeList" :key="item" v-model="size" style="margin-right: 16px;" :value="s" :label="s"></mu-radio>

            </div>
          </div>
          <div class="sheetBody">
            <div class="sheetTitle">颜色</div>
            <div class="listBorder">
              <mu-radio v-for="(c,item) in colorList" :key="item" v-model="color" style="margin-right: 16px;" :value="c" :label="c"></mu-radio>

            </div>
          </div>
          <div class="sheetBody flexContainer countList">
            <div class="countStyle text-left countHalf sheetTitle">购买数量</div>
            <div class="flexContainer text-right countHalf" style="display: flex;flex-direction:row-reverse">
              <span class="myIcons-reduce">
                <mu-button fab small class="rightCount" @click="countAdd(commodityNumber)">
                  <mu-icon value="add" ></mu-icon>
                </mu-button>
              </span>
              <div class="countStyle">{{count}}</div>
              <span class="myIcons-add">
                <mu-button fab small class="leftCount" @click="countRemove">
                  <mu-icon value="remove" ></mu-icon>
                </mu-button>
              </span>
            </div>
          </div>
          <div class="sheetBody text-center">
            <mu-button flat class="publicButton" @click="goPreOrder">确定</mu-button>
          </div>
        </div>
        <mu-dialog width="360" :open.sync="openTips">
          <div class="tips">{{tips}}</div>
        </mu-dialog>
      </div>
    </mu-bottom-sheet>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "commoditydetails",
		data() {
			return {
				masrc: back,
        open: false,
        openTips:false,
        tips:'',
				commodityImg: '',
				commodityTitle: '',
				commodityPropaganda: '',
				commodityPrice: '',
				commodityCount: '',
				commodityNumber: '',
        commodityDetail:'',
        color:'',
        colorList:[],
        size:'',
        sizeList:[],
        count:1,
				commodityConsiderations: [{
						considerations: '请仔细核对你的地址，参加后不可修改；'
					},
					{
						considerations: '兑换成功后，20个工作日内官方包邮发放（港澳台及国外地区除外）；'
					},
					{
						considerations: '请保持手机通畅若快递无法与你取得联系，将视为放弃，钻石量不退还；'
					},
					{
						considerations: '签收后请与3天内检查质量问题，与客服取得联系，逾期不予处理；'
					},
					{
						considerations: '图片仅供参考，以收到实物为准；'
					},
					{
						considerations: '若有疑问，请联系客服；'
					},
				]
			}
		},
		mounted() {
      let that = this;
      mui.back = function(){
        that.$router.push('/shopping');
      };
      this.$nextTick(function() {
        this.getGoods()
      })

		},
		methods: {
		  getGoods(){
        this.$http({
          method: "post",
          url: "/goods/detail",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            goods_id:localStorage.getItem("goods_id")
          }
        }).then(function(res) {
          if(res.data.code === 0) {
            this.commodityImg = res.data.data.image;
            this.commodityTitle = res.data.data.name;
            this.commodityPropaganda = res.data.data.desc;
            this.commodityPrice = res.data.data.price;
            this.commodityNumber = res.data.data.sales;
            this.commodityDetail = res.data.data.detail+'<style type="text/css">' +
              'img {max-width: 100%; }' +
              '<\/style>';;

            this.colorList=res.data.data.color_choices;
            this.sizeList=res.data.data.size_choices;
          }
        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
      },
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
        this.$router.push('/shopping');
			},
			preOrder() {
        this.open = true;
			},
      closeBottomSheet () {
        this.open = false;
      },
      countRemove(){
		    if(this.count>1){
		      this.count--
        }
      },
      countAdd(){
        this.count++;
      },
      goPreOrder(){
		    if(this.size===""||this.size===null||this.size===undefined){
          this.openTipsFuc("请选择尺码")
        }else if(this.color===""||this.color==null||this.color==undefined){
          this.openTipsFuc("请选择颜色")
        }else {
          localStorage.setItem("goodsSize",this.size);
          localStorage.setItem("goodsColor",this.color);
          localStorage.setItem("goodsNum",this.count);
          localStorage.setItem("maxNum",this.commodityNumber);

          this.$router.push({path: '/preorder'})
        }
      },
      openTipsFuc(tips){
        this.openTips=true;
        this.tips=tips
        setTimeout(()=>{
          this.openTips=false;
        },1000)
      }
		}
	}
</script>

<style scoped>
  .title{
    background: white;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    padding: 1.5rem;
    margin-bottom: 0;
    color: #323232;
  }
  .sheetHead{
    background: #fefefe;
  }
  .sheetBody{
    margin-top: 1rem;
    padding:0 1rem ;
  }
  .sheetBody:last-child{
    padding: 0;
  }
  .sheetContainer{
    padding: 1rem 0 0;
    font-size: 1.6rem;
  }
  .flexContainer{
    display: flex;
    padding: 0 1rem;
  }
  .sheetTitle{
    font-size: 1.7rem;
    color: #222;
  }
  .sheetGoodsImg{
    width: 12rem;
    height: 12rem;
    background: #fff;
    margin-top: -3rem;
    padding: 0.5rem;
    border-radius: 3px;
  }
  .sheetGoodsImg img{
    width: 100%;
    height: 100%;
  }
  .sheetGoodsStyle{
    margin-left: 1.5rem;
  }
  .closeBtn{
    position: absolute;
    right: 1rem;
  }
  .listBorder{
    border-bottom: 1px solid #f5f5f5;
    padding: 1rem 0;
  }
  .countList{
    padding-bottom: 1rem;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 4rem;
  }
  .countHalf{
    width: 50%;
  }
  .countStyle{
    line-height: 20px;
  }
  .leftCount{
    margin-right: 1rem;
    /*background: linear-gradient(to right, #0BA5D7 , #38E7F8);*/
    border-radius: 50%;
    color: #666;
    text-align: center;
    background: #fff;
    border: 1px solid #999;
  }
  .rightCount{
    margin-left: 1rem;
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    width: 100%;
    border-radius: 0;
  }
  .tips{
    width: 100%;
    text-align: center;
    padding: 1.5rem 0;
  }


	.content {
		overflow-x: hidden;
		color: #555;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    font-size: 1.6rem;
	}
  .content::-webkit-scrollbar{
    display: none;
  }
	.commodityImg {
		background: #f5f5f5;
		text-align: center;
		height: 300px;
    margin-top: 56px;
	}

	.commodityImg img {
    width: 100%;
    height: 100%;
	}

	.commodityTitle {
		padding: 1rem 1rem 0;
		border-bottom: 0.1rem solid #f5f5f5;
		color: #333;
    background: #fff;
	}

	.commodityPropaganda {
		color: #444;
		font-size: small;
	}

	.commodityPrice {
		padding: 1rem;
    background: #fff;
	}
	.priceNumber {
		font-size: 1.8rem;
    color: #09a2d6;
	}
  .commodityCount{
    float: right;
  }
  .considerations{
    background: #fff;
    padding-bottom: 6rem;
  }
	.considerationsTitle {
		color: #555;
		padding: 1rem;
		margin: 0;
		border-bottom: 0.1rem solid #f5f5f5;
	}

	.commodityConsiderations {
		padding: 1rem;
		font-size: smaller;
	}

	.commodityConsiderations li {
		list-style: none;
		margin-bottom: 0.5rem;
	}

	.exchange {
		border-top: 0.1rem solid #f5f5f5;
		text-align: center;
		padding: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
    background: #fff;
	}
  .marginBottom{
    margin-bottom: 5px;
  }
</style>
<style lang="less">
  #commodityImgs{
    .mu-carousel{
      height: 300px;
    }
  }
</style>
