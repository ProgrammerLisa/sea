<template>
    <div class="content">
      <div class="BlackTitle">
        商城
      </div>
      <div v-if="hasSignal">
        <div class="carousel">
          <img :src="carousel" id="nav"/>
        </div>
        <div id="scroll">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <div class="media" v-for="(goods,index) in commodity">
              <div @click="sendParams(goods.enable,goods.id)">
                <div class="media-left">
                  <img class="media-object" :src="goods.image">
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
          </mu-load-more>
          <div class="noMore" v-show="noMore">没有更多信息了</div>
        </div>

      </div>
      <div v-else>
        <nothing @again="again"></nothing>
      </div>

    </div>
</template>

<script>
    import carousel from '@/assets/images/banner.png'
    import Nothing from '@/components/Nothing'
    export default {
        name: "shopping",
        data(){
          return{
            hasSignal:true,
            carousel:carousel,
            refreshing:false,
            loading:false,
            next:'/store',
            noMore:false,
            commodity:[],
            mobile:{
              enable:'',
              id:'',
              image:'',
              name:'',
              desc:'',
              price:'',
              sales:'',

            },
            openSimple: false
          }
        },
      computed: {
        now() {
          return Date.now();
        }
      },
      components:{
        'nothing':Nothing
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
          setTimeout(()=>{
            $("#scroll").css({height:$(window).height()-$(".BlackTitle").height()-$("#nav").height()-50+'px'});
          },1000)
        })

      },
      methods:{
        again(){
          this.getStore();
        },
        getStore(){
          this.$http({
            method: "post",
            url: this.next,
            headers: {
              "device": "android",
              "uid": localStorage.getItem("uid"),
              "Access-Control-Allow-Origin": "*"
            },
            data: {}
          }).then(function(res) {
            this.loading=false;
            if(res.data.code === 401) {
              this.$layer.msg('请登录后再试！');
              this.$router.replace('/login');
            }
            if(res.data.code === 0) {
              this.hasSignal=true;
              this.next=res.data.data.data.next;
              if(res.data.data.data.items.length>0){
                for (var i in res.data.data.data.items){
                  this.mobile.enable=res.data.data.data.items[i].enable;
                  this.mobile.id=res.data.data.data.items[i].id;
                  this.mobile.image=res.data.data.data.items[i].image[0];
                  this.mobile.name=res.data.data.data.items[i].name;
                  this.mobile.desc=res.data.data.data.items[i].desc;
                  this.mobile.price=res.data.data.data.items[i].price;
                  this.mobile.sales=res.data.data.data.items[i].sales;
                  this.commodity.push(this.mobile);
                  this.mobile={
                    enable:'',
                    id:'',
                    image:'',
                    name:'',
                    desc:'',
                    price:'',
                    sales:'',
                  }
                }
              }
            }else {
              this.hasSignal=false;
            }
          }.bind(this))
            .catch(function(err) {
              this.loading=false;
              this.$layer.msg("系统异常，请稍后再试");
              this.hasSignal=false;
            }.bind(this));
        },
        refresh(){
          this.refreshing=true;
          this.commodity=[];
          this.next="/store";
          this.noMore=false;
          this.getStore();
          setTimeout(() => {
            this.refreshing = false;
          }, 1000)
        },
        load(){
          this.loading=true;
          this.noMore=false;
          if (this.next===""){
            setTimeout(()=>{
              this.noMore=true;
              this.loading=false;
            },1500);
          }else {
            this.getStore();

          }
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
    overflow-y: hidden;
    font-size: 1.6rem;
  }
  .content::-webkit-scrollbar{
    display: none;
  }

  .BlackTitle{
    text-align: center;
    letter-spacing: 2px;
    font-size: 1.7rem;
    font-weight: bold;
    line-height: 50px;
    background: #fff;
    color: #323232;
    border-bottom: 1px solid #f5f5f5;
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
    max-height: 100%;
  }
  @media screen and (min-width: 300px) and (max-width: 350px) {
    .media-left img{
      width: 9rem;
      margin-right: 1rem;
    }
  }

  @media screen and (min-width: 350px) and (max-width: 2000px) {
    .media-left img{
      width: 11rem;
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
  #scroll{
    overflow-y: scroll;
    padding-top: 1rem;
  }
  #scroll::-webkit-scrollbar{
    display: none;
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
