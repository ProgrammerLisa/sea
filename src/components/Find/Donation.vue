<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">爱心慈善</span>
    </mu-appbar>
    <div class="absolute">
      <div class="contentMarginTop"></div>
      <mu-carousel hide-controls class="myCarousel">
        <mu-carousel-item v-for="(i,index) in datas.image" :key="index">
          <img :src="i">
        </mu-carousel-item>
      </mu-carousel>
      <mu-card-title :title="datas.name" :sub-title="datas.label"></mu-card-title>
      <mu-flex class="demo-linear-progress" style="line-height: 1.6rem">
        <mu-linear-progress mode="determinate" :value="completed_percent" :size="10" color="#17B7E0" class="myProgress"></mu-linear-progress><span style="margin:-0.5rem 0 0 1rem;color: #09a2d6">{{datas.completed_percent}}</span>
      </mu-flex>
      <div style="display: flex">
        <div class="contentTitle text-center">
          <div class="grid-cell">
            <div style="color:#09a2d6">{{datas.target}}</div>
            <div style="font-size: 1.5rem">目标爱心/颗</div>
          </div>
        </div>
        <div class="contentTitle text-center">
          <div class="grid-cell">
            <div style="color:#09a2d6">{{datas.completed}}</div>
            <div>已筹/颗</div>
          </div>
        </div>
      </div>
      <mu-card-text style="border-bottom: 0.6rem solid #f5f5f5">
        <h4>项目详情 </h4>
        <dl v-html="content">
          {{content}}
        </dl>

      </mu-card-text>
      <mu-container style="color: #646464;font-size: 1.5rem">
        <div style="width: 95%;border: 1px solid #ddd;padding: 1rem;margin: 1rem auto">
          <div>发起机构：{{datas.sponsor}}</div>
          <div>接受机构：{{datas.accepter}}</div>
          <div>备案号：{{datas.id}}</div>
        </div>

      </mu-container>
      <div class="mu-card-text">
        <h4>温馨提示</h4>
        <div style="color: #646464">夺宝公益在此只提供平台服务，用户的捐赠将直接进入具
          有公开募捐的慈善组织账户中。</div>
      </div>
    </div>

    <div class="newAddress">
      <mu-flex justify-content="center" align-items="center">
          <router-link tag="div" to="/ask" class="invitation">
            <div><img src="../../assets/images/yaohaoyou.png"> </div>
            邀好友一起捐
          </router-link>
        <mu-button flat class="publicButton" textColor="#fff" to="/donationcount"> 捐珍珠</mu-button>
      </mu-flex>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import carouselImg1 from '@/assets/images/test/u=780515113,540275411&fm=27&gp=0.jpg'
  import carouselImg2 from '@/assets/images/test/u=4176789213,1736947849&fm=27&gp=0.jpg'
  import carouselImg3 from '@/assets/images/test/u=1498947469,1572939960&fm=27&gp=0.jpg'
  import carouselImg4 from '@/assets/images/test/u=1333292247,557777395&fm=27&gp=0.jpg'
    export default {
        name: "donation",
        data(){
          return{
            masrc: back,
            carouselImg1,carouselImg2,carouselImg3,carouselImg4,
            datas:'',
            content:'',
            completed:'',
            completed_percent:0,
            content:''
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function() {
            this.getData();
          })
        },
        methods:{
          getData(){
            this.$http({
              method: "post",
              url: "/tasks/charity-detail",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                "charity_id": localStorage.getItem("charity_id")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                this.datas=res.data.data;
                this.content=res.data.data.desc+'<style type="text/css">' +
								'img {max-width: 100%; }' +
								'<\/style>';
                this.completed_percent=parseFloat(this.datas.completed_percent.split("%")[0]);
//              this.completed=this.completed_percent*this.datas.target;
								this.completed=this.completed_percent;
                this.content = res.data.data.desc + '<style type="text/css">' +
                  'img {max-width: 100%; } p{color: #444}' +
                  '<\/style>';
              }else {
                this.$layer.msg(res.data.msg);
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
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>

  .content{
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fff;
  }
  .content::-webkit-scrollbar {
    display: none;
  }

  .mu-carousel-item img{
    width: 100%;
    height: 18rem;
  }
  .contentTitle{
    width: 50%;
    padding: 1.5rem 0;
    border-bottom: 0.6rem solid #f5f5f5;
    font-size: 1.6rem;
  }
  .mu-carousel{
    height: 18rem;
  }
 .mu-card-title-container{
   padding: 0.8rem 1.3rem ;
 }
  .demo-container{
    text-align: center;
    padding: 0.8rem 0;
    color: #555;
    border-bottom: 0.6rem solid #f5f5f5;
  }
  .newAddress {
    background: #f5f5f5;
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    z-index: 999;
    border-top: 1px solid #f5f5f5;
  }
  .contentMarginTop{
    margin-top: 56px;
  }
  .myProgress{
    width: 80%;border-radius: 2rem;margin-left: 1.3rem;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 0;
    width: 65%;
    font-size: 1.6rem;
    letter-spacing: 1px;
    height: 55px;
  }
  .invitation{
    width: 35%;
    font-size: small;
    height: 55px;
    padding-top: 3px;
    background: #fff;
  }
  .invitation img{
    height: 30px;
  }
  .Topstarnews-img {
		width: 100%;
		padding: 1rem 0rem 1rem;
	}
</style>
