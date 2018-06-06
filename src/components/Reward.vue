<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
          邀请奖励
        </div>
      </div>
      <div>
        <img src="../assets/images/invitebg.png" class="invitebg"/>
      </div>
      <div class="invitePlay">
        <div class="btn btn-default">面对面邀请</div>
        <div class="btn btn-info">立即邀请</div>
      </div>
      <p class="inviteTitle">我的邀请</p>
      <div class="inviteList">
        <div class="media myInvite" v-for="i in myInvite">
          <div class="media-left">
              <img class="media-object inviteImg" :src="i.inviteImg" >
          </div>
          <div class="media-body">
            <div class="media-heading invitePhone">{{i.invitePhone}}</div>
            <span class="inviteDate">{{i.inviteDate}}</span>
          </div>
        </div>
      </div>
      <p class="inviteTitle">邀请规则</p>
      <div class="inviteRow">
        <div>*邀请好友成为夺宝行动新用户，皆双方都可获得相应的奖励红包 </div>
        <div> *邀请的用户必须是新用户，奖励红包会在邀请成功后24小时内发放至您的账户，可在我的钱包中查看 </div>
        <div> *如有疑问请联系客服</div>
      </div>
    </div>
</template>

<script>
    import inviteImg from '@/assets/images/bg.png'
    export default {
        name: "Reward",
        data(){
          return{
            myInvite:[
              {inviteImg:inviteImg,invitePhone:'138***9591',inviteDate:'2018-3-6 10:38:36'},
              {inviteImg:inviteImg,invitePhone:'138***9591',inviteDate:'2018-3-6 10:38:36'},
              {inviteImg:inviteImg,invitePhone:'138***9591',inviteDate:'2018-3-6 10:38:36'},
              {inviteImg:inviteImg,invitePhone:'138***9591',inviteDate:'2018-3-6 10:38:36'}
            ]
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
    color: #666;
    background-color: #fff;
    width: 100vw;
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
    font-size: 1.6rem;
    margin-bottom: 0;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .invitebg{
    width: 100%;
  }
  .invitePlay{
    padding: 1rem 2rem;
  }
  .btn{
    width: 100%;
    border-radius: 0;
    border-color: #93D6ED;
    padding: 0.8rem;
    font-size: large;
  }
  .btn-default{
    color: #09a2d6;
    margin-bottom: 1rem;
  }
  .btn-info{
    background: #09a2d6;
  }
  .inviteTitle{
    border-bottom: 0.1rem solid #f1f1f1;
    padding:0.5rem 1rem;
    color: #444;
    font-size: 1.6rem;
    margin-bottom: 0;
  }
  .inviteList{
    padding: 0 1rem;
    border-bottom: 0.8rem solid #f1f1f1;
  }
  .myInvite{
    padding: 1rem 0;
    border-bottom: 0.1rem solid #f1f1f1;
    margin-top: 0;
  }
  .inviteImg{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .invitePhone{
    font-size: 1.6rem;
  }
  .inviteDate{
    font-size: small;
    color: #888;
  }
  .inviteRow{
    padding: 1rem 1rem 4rem;
  }
</style>
