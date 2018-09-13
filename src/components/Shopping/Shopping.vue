<template>
    <div class="content">
      <div id="navTopMargin" style="background: #eee;"></div>
      <div class="panel panel-default BlackTitle" style="background: #eee;">
        <div class="panel-body">
          商城
        </div>
      </div>
      <div class="carousel">
        <img :src="carousel"/>
      </div>
      <div class="media" v-for="(goods,index) in commodity">
        <div @click="sendParams(goods.enable,goods.id)">
          <div class="media-left">
            <img class="media-object" :src="goods.image" alt="...">
          </div>
          <div class="media-body">
            <p class="media-heading">{{goods.name}}</p>
            <p class="commodityPropaganda">{{goods.desc}}</p>
            <div class="commodityPrice">{{goods.price}} <span class="goodsMessage" style="color: #555"> ( 珍珠 ) </span> </div>
            <div ></div>
            <div>
              <span class="goodsMessage">兑换次数：{{goods.sales}} 件</span>
              <button class="btn enchangeBtnEnd" v-if="!goods.enable">
                已结束
              </button>
              <button class="btn enchangeBtn" v-else>
                立即兑换
              </button>
            </div>
          </div>
        </div>

      </div>
      <mu-dialog width="360" :open.sync="openSimple">
        <div class="text-center overAlert" >活动已结束</div>
        <div class="text-center">
          <mu-button flat class="overBtn" @click="closeSimpleDialog">确 定</mu-button>
        </div>

      </mu-dialog>

    </div>
</template>

<script>
    import carousel from '@/assets/images/banner.png'
    import commodityImg from '@/assets/images/bg.png'
    export default {
        name: "shopping",
        data(){
          return{
            carousel:carousel,
            commodity:[],
            openSimple: false
          }
        },
      mounted(){
        let clickNum = 0;
        mui.back = function(){
          clickNum++;
          if(clickNum > 1) {
            plus.runtime.quit();
          } else {
            mui.toast("再按一次退出应用");
          }
          setTimeout(function() {
            clickNum = 0
          }, 2000);
          return false;

        };
        this.$nextTick(function() {
          localStorage.removeItem("goods_id");
          localStorage.removeItem("addressId");
          localStorage.removeItem("goodsSize");
          localStorage.removeItem("goodsColor");
          localStorage.removeItem("goodsNum");
          localStorage.removeItem("maxNum");
          this.getStore();
        })

      },
      methods:{
        getStore(){
          this.$http({
            method: "post",
            url: "/store",
            headers: {
              "device": "android",
              "uid": localStorage.getItem("uid"),
              "Access-Control-Allow-Origin": "*"
            },
            data: {}
          }).then(function(res) {
            if(res.data.code === 0) {
              if(res.data.data.data.items.length>0){
                this.commodity=res.data.data.data.items;
              }
            }
          }.bind(this))
            .catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this));
        },
        sendParams (enable,id) {
          const that = this;
          if(!enable){
            this.openSimple=true
          }else {
            localStorage.setItem("goods_id",id);
            that.$router.push({path: '/commoditydetails'})
          }

        },
        closeSimpleDialog () {
          this.openSimple = false;
        }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #444;
    padding-bottom: 6rem;
    background: #fff;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    font-size: 1.6rem;
  }
  .content::-webkit-scrollbar{
    display: none;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 1rem;
    background: #fff;
    color: #333;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    background: #fff;
    font-size: 1.8rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .carousel img{
    width: 100%;
  }
  .media{
    padding: 1rem 1rem 1rem;
    margin: 0;
    border-bottom: 0.1rem solid #f5f5f5;
    background: #fff;
  }

  @media screen and (min-width: 300px) and (max-width: 350px) {
    .media-left img{
      width: 9rem;
      height: 9rem;
      margin-right: 1rem;
    }
  }

  @media screen and (min-width: 350px) and (max-width: 2000px) {
    .media-left img{
      width: 11rem;
      height: 11rem;
      margin-right: 1rem;
    }
  }

  .media-heading{
    width: 50vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;word-wrap: break-word;
    color: #222;
    font-weight: 400;
  }
  .media-body{
    position: relative;
  }
  .commodityPropaganda{
    font-size: small;
    height: 3.5rem;
    overflow: hidden;
    color: #555;
    /*width: 50vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;word-wrap: break-word;*/
  }
  .commodityPrice{
    color: #09a2d6;
  }
  .goodsMessage{
    font-size: small;
  }
  .enchangeBtn{
    float: right;
    border-radius: 3px;
    background: #fff;
    border: 1px solid #09a2d6;
    color: #09a2d6;
    padding: 0.5rem;
    margin-top: -1.5rem;
    box-shadow: none;
    outline: none;
  }
  .enchangeBtnEnd{
    float: right;
    border-radius: 3px;
    background: #f5f5f5;
    box-shadow: none;
    outline: none;
  }
  .overAlert{
    padding: 1rem 0;
    color: #333
  }
  .overBtn{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: white;
    margin: 1rem 0 1.5rem;
    padding: 0 1rem;
  }
</style>
