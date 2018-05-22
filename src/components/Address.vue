<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        收货地址
        <router-link to="ModificationAddress" tag="span" class="copyreader"> <img src="../assets/images/copyreader.png"/></router-link>
      </div>
    </div>

    <table class="table address" v-for="(a,index) in myAddress">
      <tr><td class="text-left">收货人</td><td class="text-right">{{a.name}}</td></tr>
      <tr><td class="text-left">联系电话</td><td class="text-right">{{a.phoneNumber}}</td></tr>
      <tr><td class="text-left">收货地址</td><td class="text-right">{{a.address}}</td></tr>
      <tr>
        <td class="text-left"></td>
        <td class="text-right">
          <div @click="choose(index)">
            <div class="round">
              <span class="defaultRound" v-if="a.isdefault"></span>
            </div>
            默认地址
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
      name: "Address",
      data(){
        return{
          myAddress:[
            {name:'莫雨',phoneNumber:'13566666666',address:'广东省广州市天河区XXX街道555号',isdefault:true},
            {name:'莫雨',phoneNumber:'13566666666',address:'广东省广州市天河区XXX街道555号',isdefault:false},
            {name:'莫雨',phoneNumber:'13566666666',address:'广东省广州市天河区XXX街道555号',isdefault:false}
          ]
        }
      },
      methods:{
        choose(index){
          const that = this;
          for (var i=0;i<that.myAddress.length;i++){
            that.myAddress[i].isdefault = false;
          }
          that.myAddress[index].isdefault = true;
        },
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
    padding-bottom: 6rem;
    background-color: #f5f5f5;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
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
  .copyreader{
    float: right;
  }
  .copyreader img{
    height: 2.5rem;
   }
  .address{
    background: #fff;
  }
  .address tr{
    line-height: 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .address td{
    padding: 0 1.5rem;
  }
  .text-left{
    color: #555;
    font-size: 1.6rem;
  }
  .round{
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.1rem solid #aaa;
    margin-right: 0.5rem;
    vertical-align: middle;
    text-align: center;
    line-height: 0.8rem;
  }
  .defaultRound{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: #4cae4c;
  }
</style>
