<template>
    <div class="content">
      <div class="TitleNav text-center">支付</div>
      <div class="text-center payContainer">
        <mu-icon value="check_circle" color="#04C208" size="64"></mu-icon>
        <p class="paySuccess">支付成功</p>
        <mu-button flat class="goShopping" to="/shopping">回到商城</mu-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "paysuccess",
        data(){
          return{

          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.push('/shopping');
          };
        }
    }
</script>

<style scoped>
  .content{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f5f5f5;
    color: #333;
    font-size: 1.6rem;
  }
  .TitleNav{
    width: 100%;
    height: 56px;
    line-height: 56px;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-size: 1.8rem;
  }
  .payContainer{
    margin-top: 5vh;
  }
  .paySuccess{
    font-weight: bold;
  }
  .goShopping{
    background: #04C208;
    color: #fff;
    margin-top: 1rem;
  }
</style>
