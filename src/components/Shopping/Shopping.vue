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
        <div @click="sendParams(index)">
          <div class="media-left">
            <img class="media-object" :src="goods.commodityImg" alt="...">
          </div>
          <div class="media-body">
            <p class="media-heading">{{goods.commodityTitle}}</p>
            <div class="commodityPrice">{{goods.commodityPrice}} <span class="goodsMessage" style="color: #555"> ( 珍珠 ) </span> </div>
            <div ></div>
            <div>
              <span class="goodsMessage">库存：{{goods.commodityNumber}} 件</span>
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
            openSimple: false,
            model:{
              commodityImg:'',
              commodityTitle:'',
              commodityPropaganda:'',
              commodityPrice:'',
              commodityCount:'',
              commodityNumber:'',
              isEnd:'',
              id:''
            }
          }
        },
      mounted(){
        this.$nextTick(function() {
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
            console.log(res.data)
            if(res.data.code === 0) {
              if(res.data.data.data.items.length>0){
                for (let i in res.data.data.data.items) {
                  this.model.commodityImg = res.data.data.data.items[i].image;
                  this.model.commodityTitle =  res.data.data.data.items[i].name;
                  this.model.commodityPropaganda = res.data.data.data.items[i].desc;
                  this.model.isEnd = !res.data.data.data.items[i].enable;
                  this.model.id = res.data.data.data.items[i].id;
                  this.model.commodityPrice = res.data.data.data.items[i].price;
                  this.model.commodityNumber = res.data.data.data.items[i].stock;

                  this.commodity.push(this.model)
                  this.model={
                    commodityImg:'',
                    commodityTitle:'',
                    commodityPropaganda:'',
                    commodityPrice:'',
                    commodityCount:'',
                    commodityNumber:'',
                    isEnd:'',
                    id:''
                  }
                }
              }
            }
          }.bind(this))
            .catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this));
        },
        sendParams (index) {
          const that = this;
          if(that.commodity[index].isEnd){
            this.openSimple=true
          }else {
            that.$router.push({
              path: '/commoditydetails',
              name: 'commoditydetails',
              params: {
                name:'name',
                dataObj:that.commodity[index]

              }

            })
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
    color: #666;
    padding-bottom: 6rem;
    background: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
    font-size: 1.6rem;
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
    color: #555;
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
    color: #09a2d6;
  }
  .goodsMessage{
    font-size: small;
  }
  .enchangeBtn{
    float: right;
    border-radius: 0;
    background: #fff;
    border: 0.1rem solid #09a2d6;
    color: #09a2d6;
    padding: 0.5rem;
    margin-top: -1.5rem;
  }
  .enchangeBtnEnd{
    float: right;
    border-radius: 0;
    background: #f5f5f5;
  }
  .overAlert{
    padding: 1rem 0;
    color: #333
  }
  .overBtn{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: white;
    height: 3rem;
    margin: 1rem 0 1.5rem;
    padding: 0 1rem;
  }
</style>
