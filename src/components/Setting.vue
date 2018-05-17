<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <router-link to="/Personal" tag="span" class="back"> <img src="../assets/images/back.png"/></router-link>
        设置
      </div>
    </div>
   <table class="table">
     <tr>
       <td class="text-left">账户</td>
       <td class="text-right">136****</td>
     </tr>
     <tr>
       <td class="text-left">修改密码</td>
       <td class="text-right"></td>
     </tr>
     <tr class="spacing"><td></td><td></td></tr>
     <tr class="settingBtn">
       <td class="text-left">消息提醒</td>
       <td class="text-right">
         <div class="blueBtn" @click="switchBtn">
           <div class="cap">
             <div class="whiteBtn">

             </div>
           </div>

         </div>
       </td>
     </tr>
     <tr class="arrow">
       <td class="text-left">空间清理</td>
       <td class="text-right">35M <img :src="more" class="more"/></td>
     </tr>
     <tr class="spacing"><td></td><td></td></tr>
     <tr class="arrow">
       <td class="text-left">关于我们</td>
       <td class="text-right"><img :src="more" class="more"/></td>
     </tr>
     <tr class="arrow">
       <td class="text-left">用户反馈</td>
       <td class="text-right"><img :src="more" class="more"/></td>
     </tr>
     <tr class="arrow">
       <td class="text-left">版本更新</td>
       <td class="text-right">已是最新版本 <img :src="more" class="more"/></td>
     </tr>
   </table>
    <div class="loginOut">
      退出登录
    </div>
  </div>
</template>

<script>
    import more from '@/assets/images/more.png'
    export default {
        name: "Setting",
        data(){
          return{
            more:more,
            isOn:true
          }
        },
        methods: {
          switchBtn(){
            const that = this;
            if(that.isOn){
              $(".whiteBtn").css({border:'solid 0.1rem #ccc'});
              $(".cap").animate({left:0},300);
              that.isOn = false;
            }else {
              $(".whiteBtn").css({border:'solid 0.1rem #09a2d6'});
              $(".cap").animate({left:'1.5rem'},300);
              that.isOn = true;
            }

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
    padding:0.5rem 1.5rem;
  }
  .spacing td{
    padding: 0;
    height: 1rem;
    background: #f5f5f5;
  }
  .more{
    height: 3rem;
  }
  .arrow td{
    padding-top:0.5rem;
    padding-bottom:0.5rem;
  }
  .arrow td:nth-child(2){
    padding-right: 0;
  }
  .loginOut{
    background: #fff;
    text-align: center;
    height: 4rem;
    line-height: 4rem;
    color: #09a2d6;
    letter-spacing: 0.1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 0.1rem solid #eee;
  }

  .blueBtn{
    background: #09a2d6;
    border-radius: 2rem;
    width: 3rem;
    height: 1.5rem;
    margin-bottom: -0.3rem;
    display: inline-block;
    overflow: hidden;
  }
  .cap{
    border-radius: 2rem;
    background: #ccc;
    width: 100%;
    height: 100%;
    position: relative;
    left: 1.5rem;
  }
  .whiteBtn{
    border-radius:50%;
    background: #fff;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    border:0.1rem solid #09a2d6;
  }
</style>
