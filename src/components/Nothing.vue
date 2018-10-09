<template>
  <div class="nothing">
    <img src="../assets/images/network.png"/>
    <p>网络出错，请检查设置</p>
    <mu-button flat class="publicButtonNone" @click="again">重新加载</mu-button>
  </div>
</template>

<script>
    export default {
        name: "Nothing",
      created(){
        this.again();//注册
      },
      methods:{
          again(){
            this.$emit("again")//联结

          }
      }
    }
</script>

<style scoped>
  .nothing{
    text-align: center;
    padding-top: 20vh;
    color: #999;
    height: 100vh;
    background: #f5f5f5;
  }
  .nothing img {
    width: 40%;
    margin-bottom: 1rem;
  }
  .publicButtonNone{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
    padding:0 2rem;
    margin-top: 1rem;
  }
</style>
