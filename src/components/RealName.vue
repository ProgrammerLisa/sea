<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <router-link to="/Personal" tag="span" class="back"> <img src="../assets/images/back.png"/></router-link>
          实名信息
          </div>
      </div>
      <table class="table">
        <tr  v-for="r in realName">
          <td class="text-left">{{r.title}}</td>
          <td class="text-right">{{r.content}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "RealName",
        data(){
          return{
            realName:[
              {title:'姓名',content:'**默'},
              {title:'身份证号',content:'3413*************5676'},
              {title:'手机号',content:'1366666666666'}
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
  }
  .table tr{
    border-bottom: 0.1rem solid #f5f5f5;
  }
  .table td{
    padding: 1rem;
  }
  .text-left{
    color: #555;
  }
</style>
