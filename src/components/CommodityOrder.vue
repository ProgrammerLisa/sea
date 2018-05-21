<template>
 <div class="content">
   <div class="panel panel-default BlackTitle">
     <div class="panel-body">
       <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
       商城订单
     </div>
   </div>
 </div>
</template>

<script>
    export default {
        name: "CommodityOrder",
        data(){
          return{

          }
        },
        methods:{
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
    background: #f5f5f5;
    padding-bottom: 6rem;
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
    margin-bottom: 1rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
</style>
