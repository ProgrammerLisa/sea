<template>
  <div class="content">
    <div class="personal">
      <div class="envelope">
        <img src="../assets/images/news.png" />
        <div class="badgePosition">
          <span class="badge">123</span>
        </div>
      </div>
      <div class="container personalMessage">
        <div class="HeadPortrait">
          <img :src="headPortrait"/>
        </div>
        <p class="nickName">ZZZ</p>
        <p class="userId">ID：56789668</p>
        <div class="row ">
          <div class="col-xs-5 col-xs-offset-1 wallet">
            <span class="glyphicon glyphicon-credit-card personalIcon"></span>
            <span class="personalText">我的钱包</span>
          </div>
          <div class="col-xs-5">
            <span class="glyphicon glyphicon-user personalIcon"></span>
            <span class="personalText">实名信息</span>
          </div>
        </div>
    </div>

    </div>
    <div class="personalItem">

      <div class="media" v-for="m in Personal">
        <router-link :to="m.PersonalHref" tag="div">
          <div class="media-left">
              <img class="media-object" :src="m.imfLeft" alt="...">
          </div>
          <div class="media-body" style="vertical-align: middle">
            {{m.title}}
          </div>
          <div class="media-right">
            <img class="media-object" src="../assets/images/more.png"/>
          </div>
        </router-link>

      </div>

    </div>


  </div>
</template>

<script>
    import friend from '@/assets/images/friend.png'
    import inviter from '@/assets/images/inviter.png'
    import award from '@/assets/images/award.png'
    import indent from '@/assets/images/indent.png'
    import address from '@/assets/images/address.png'
    import service from '@/assets/images/service.png'
    import setting from '@/assets/images/setting.png'
    import headImg from '@/assets/images/profile.png'

    export default {
        name: "Personal",
      data(){
          return{
            Personal:[
              {title:'我的好友',PersonalHref:'Login',imfLeft:friend},
              {title:'我的邀请者',PersonalHref:'Login',imfLeft:inviter},
              {title:'邀请奖励',PersonalHref:'Login',imfLeft:award},
              {title:'商城订单',PersonalHref:'Login',imfLeft:indent},
              {title:'收货地址',PersonalHref:'Login',imfLeft:address},
              {title:'客服中心',PersonalHref:'Login',imfLeft:service},
              {title:'账户设置',PersonalHref:'Login',imfLeft:setting}
            ],
            headPortrait:headImg
          }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #777;
    padding-bottom: 6rem;
  }
  .personal{
    background: url("../assets/images/banner.png") no-repeat #fff;
    background-size: 100% 75%;
    text-align: right;
    padding-bottom: 0.5rem;
  }
  .envelope img{
    width: 3.5rem;
  }
  .badgePosition{
    float: right;
  }
  .badge{
    background: #FF0404;
    font-weight: normal;
    padding: 0.1rem 0.3rem;
    vertical-align: text-top;
    margin-right: 1.5rem;
  }
  .personalMessage{
    background: #fff;
    margin:0  1rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction:column;
    text-align: center;
    box-shadow: 0 0.3rem 0.3rem #ddd;
  }

  .HeadPortrait img{
    width: 5rem;
    height: 5rem;
    border: 0.1rem solid #09a2d6;
    border-radius: 50%;
  }
  .nickName{
    padding-top: 1rem;
    margin: 0;
  }
  .wallet{
    border-right: 1px solid #ccc;
  }
  .personalIcon{
    margin-right:  0.5rem;
  }
  .personalText{
    letter-spacing: 0.1rem;
  }
  .media{
    background: #fff;
    border-bottom: 0.1rem solid #f5f5f5;
    margin-top: 0;
  }
  .media:nth-child(3), .media:nth-child(5){
    margin-bottom: 1rem;
  }
  .media-object{
    width: 3.5rem;
    padding: 0.5rem;
  }
</style>
