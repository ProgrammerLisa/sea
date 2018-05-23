<template>
  <div class="content">
    <div class="personal">
      <div class="news">
        <router-link to="/news" tag="div" class="badgePosition">
          <span class="badge">1</span>
        </router-link>
      </div>
      <div class="container personalMessage">
        <div class="HeadPortrait">
          <img :src="headPortrait"/>
        </div>
        <p class="nickName">ZZZ</p>
        <p class="userId">ID：56789668</p>
        <div class="row ">
          <router-link to="Wallet" tag="div" class="col-xs-5 col-xs-offset-1 personalMessageLeft">
            <img :src="wallet" class="personalIcon">
            <span class="personalText" id="walletText">我的钱包</span>
            <span class="wallet"></span>
          </router-link>
          <router-link to="RealName" tag="div" class="col-xs-5">
            <img :src="autonym" class="personalIcon">
            <span class="personalText">实名信息</span>
          </router-link>
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
    import autonym from '@/assets/images/autonym.png'
    import wallet from '@/assets/images/wallet.png'

    export default {
        name: "Personal",
      data(){
          return{
            autonym:autonym,
            wallet:wallet,
            Personal:[
              {title:'我的好友',PersonalHref:'friend',imfLeft:friend},
              {title:'我的邀请者',PersonalHref:'Ask',imfLeft:inviter},
              {title:'邀请奖励',PersonalHref:'Reward',imfLeft:award},
              {title:'商城订单',PersonalHref:'CommodityOrder',imfLeft:indent},
              {title:'收货地址',PersonalHref:'address',imfLeft:address},
              {title:'客服中心',PersonalHref:'Service',imfLeft:service},
              {title:'账户设置',PersonalHref:'Setting',imfLeft:setting}
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
    background: url("../assets/images/blue.png") no-repeat #fff;
    background-size: 100% 75%;
    text-align: right;
    padding-bottom: 0.5rem;
  }
  .news{
    display: flex;
    flex-direction: row-reverse;
    padding: 0.4rem 0;
  }
  .badgePosition{
    width: 5rem;
    height: 3rem;
    background:url("../assets/images/news.png") no-repeat;
    background-size: 60% 100%;
  }
  .badge{
    background: #FF0404;
    font-weight: normal;
    padding: 0.1rem 0.3rem;
    vertical-align: text-top;
    margin-right: 1.7rem;
    float: right;
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
  .personalMessageLeft{
    padding-right: 0;
  }
  .wallet{
    display: inline-block;
    float: right;
    width: 0.1rem;
    height: 1.8rem;
    margin-top: 0.6rem;
    background: #ddd;
  }
  #walletText{
    margin-right: 1rem;
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

  .personalIcon{
    width: 3.2rem;
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
