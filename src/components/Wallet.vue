<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <router-link to="/Personal" tag="span" class="back"> <img src="../assets/images/back.png"/></router-link>
        我的钱包
      </div>
    </div>
    <table class="table" v-for="m in myWallet">
      <router-link :to="m.url" tag="tr">
        <td class="text-left">{{m.title}}</td>
        <td class="text-right"><img :src="more"/></td>
      </router-link>
    </table>
  </div>
</template>

<script>
    import more from '@/assets/images/more.png'
    export default {
        name: "Wallet",
        data(){
          return{
            more:more,
            myWallet:[
              {url:'/',title:'我的账单'},
              {url:'/',title:'我的账单'},
              {url:'/',title:'我的账单'},
              {url:'/',title:'我的账单'}
            ]
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
  .table{
    background: #fff;
    border-bottom: 0.1rem solid #f5f5f5;
    margin: 0;
  }
  .table:nth-child(3){
    margin-bottom: 1rem;
  }
  .table td{
    padding:0.5rem 1rem;
  }
  .text-left{
    color: #555;
  }
  .text-right img{
    height: 3rem;
  }
</style>
