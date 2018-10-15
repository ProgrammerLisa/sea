<template>
    <div class="content">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc" />
        </mu-button>
        <span class="navTitleText">物流详情</span>
      </mu-appbar>
      <div class="contentMarginTop logistics">
        <div class="logisticsHead">
          <div class="logisticsHeadLeft"><img :src="image"/></div>
          <div class="logisticsHeadRight">
            <div>订单号码：{{orderNumber}}</div>
            <div>物流号码：{{logisticsCode}}</div>
            <div>发货时间：<span style="font-size: small">{{date}}</span></div>
          </div>
        </div>
        <div class="logisticsBody" v-if="hasData">
          <mu-stepper :active-step="vactiveStep" orientation="vertical">
            <mu-step v-for="(i,index) in logistics" :key="index">
              <mu-step-label>
               <div class="logisticsText">
                 <div style="font-size: 1.5rem">{{i.AcceptStation}}</div>
                 <span style="font-size: small">{{i.AcceptTime}}</span>
               </div>

              </mu-step-label>
            </mu-step>
          </mu-stepper>
        </div>
        <div class="logisticsBody text-center" v-else>
          无物流信息
        </div>
      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "logistics",
        data(){
          return{
            masrc: back,
            image:'',
            orderNumber:'',
            logisticsCode:'',
            date:'',
            vactiveStep:0,
            list:[],
            hasData:false,
          }
        },
        computed: {
          logistics() {
            return this.list.reverse();
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function() {
            this.getData()
          })
        },
        methods:{
          getData(){
            this.image = this.$route.params.dataObj.image;
            this.orderNumber=this.$route.params.dataObj.orderNumber;
            this.$http({
              method: "post",
              url: "/trace",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                order_id:localStorage.getItem("order_id")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                this.date=res.data.sended_at;
                this.logisticsCode=res.data.data.LogisticCode;
                if(res.data.data.Traces.length>0){
                  this.hasData = true;
                  this.list = res.data.data.Traces;
                  this.vactiveStep = res.data.data.Traces.length;
                }
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
    font-size: 1.6rem;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .contentMarginTop{
    margin-top: 56px;
    padding:1rem;
    background: #f5f5f5;
  }
  .logistics{

  }
  .logisticsHead{
    box-shadow: 2px 2px 10px #E3EFF3;
    border-radius: 8px;
    border: solid 1px #E3EFF3;
    background: #fff;
    padding: 1rem;
    display: flex;
  }
  .logisticsHeadLeft{
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
  }
  .logisticsHeadLeft img{
    width: 100%;
    height: 100%;
  }
  .logisticsHeadRight{
    line-height: 3rem;
    font-size: 1.5rem;
    vertical-align: middle;
  }
  .logisticsBody{
    margin-top: 1rem;
    background: #fff;
    padding:2rem 1rem;
    box-shadow: 2px 2px 10px #E3EFF3;
    border-radius: 8px;
    border: solid 1px #E3EFF3;
  }
  .logisticsText{
    color: #444;
  }
  .mu-step-label.completed .mu-step-label-icon{
    color: #9e9e9e;
  }
</style>
