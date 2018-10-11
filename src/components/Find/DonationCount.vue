<template>
  <div class="content donationcount">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">捐赠信息</span>
    </mu-appbar>
    <div class="contentMarginTop"></div>
    <div class="flex">
      <div class="flexItem" v-for="(i,index) in list">
        <div class="box" @click="choice(index)">{{i}}</div>
      </div>
    </div>
    <div class="inputContent">
      <mu-text-field v-model="count" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"  full-width class="countInput" placeholder="请输入捐赠个数"></mu-text-field>
    </div>
    <div class="tips">捐赠数只能为整数哦~</div>
    <div class="checked"> <span @click="anonymous"><mu-icon value="check_circle" :color="color"></mu-icon>&nbsp;匿名捐赠</span></div>
    <div class="xieyi"><img src="../../assets/images/gantanhao.png" style="width: 30px"/>捐赠则表示您已同意 <span style="color: #09a2d6">《捐赠人协议须知》</span></div>
    <mu-flex justify-content="center" align-items="center" style="padding: 0 1rem">
      <mu-button large flat class="publicButton" @click="donation">立即捐赠</mu-button>
    </mu-flex>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "donationcount",
        data(){
          return{
            masrc: back,
            list:[1,3,5,10,15,20,50,100],
            color:"#999",
            isAnonymous:false,
            count:''
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
        },
        methods:{
          donation(){
            if (this.count!==""&&this.count!==null&&this.count!==NaN&&this.count!==undefined){
              this.$http({
                method: "post",
                url: "/tasks/donation",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data: {
                  "charity_id": localStorage.getItem("charity_id"),
                  "donation":this.count
                }
              }).then(function(res) {
                this.$layer.msg(res.data.msg);
                if(res.data.code === 0) {
                  this.$router.go(-1);
                }

              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this));
            } else {
              this.$layer.msg("请输入正确的数量");
            }

          },
          getData(){
            this.$http({
              method: "post",
              url: "/tasks/donation",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                "charity_id": localStorage.getItem("charity_id"),
                'donation': Math.ceil(this.count)
//              Math.ceil    parseFloat
              }
            }).then(function(res) {

              if(res.data.code === 0) {
              	this.$layer.msg(res.data.msg);
              	this.$router.go(-1);
                console.log(res.data)
              }else{
              	this.$layer.msg(res.data.msg);
              }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          choice(index){
            $(".box").css({background:'#fff',color:'#323232',transition:'0.5s'})
            $(".box").eq(index).css({background:'#1CBEE3',color:'#fff',transition:'0.5s'})
            this.count=this.list[index]
          },
          anonymous(){
            if (this.isAnonymous){
              this.isAnonymous=false;
              this.color="#999";
            } else {
              this.isAnonymous=true;
              this.color="#1CBEE3";
            }
          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          },
          goBack() {
            this.$router.go(-1);
          },
        }
    }
</script>

<style scoped>
  .content{
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100vw;
  }
  .contentMarginTop{
    margin-top: 57px;
  }
  .flex{
    display: flex;
    flex-wrap: wrap;
    padding: 1rem .5rem 0;
    background: #fff;
  }
  .flexItem{
    flex: 0 0 25%;
    text-align: center;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .box{
    padding: 0.5rem 0;
    border: 1px solid #D9D9D9;
    border-radius: 1px;
  }
  .inputContent{
    background: white;
    text-align: center;
    padding: 0.5rem 1rem 10px;
  }
  .countInput{
    width: 100%;
    border: 1px solid #E0E0E0;
    border-bottom: none;
    padding: 0;
    margin-bottom: 0;
  }
  .tips{
    font-size: smaller;color: #09A2D6;padding:0 1rem 10px;border-bottom: 1px solid #f5f5f5;background: white;
  }
  .checked{
    font-size: 1.6rem;
    line-height: 4rem;
    padding: 0 1rem;
    background: white;
  }
  .xieyi{
    font-size: small;
    color: #646464;
    padding: 2rem 1rem 1rem;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    width: 100%;
    letter-spacing: 2px;
  }
</style>
