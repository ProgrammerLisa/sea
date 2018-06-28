<template>
  <div class="content">
    <div class="personal">
      <div class="news">
        <router-link to="/news" tag="div" class="badgePosition">
          <span class="badge msg">·</span>
        </router-link>
      </div>
      <div class="container personalMessage">
        <router-link tag="div" to="/compile">
          <div class="HeadPortrait">
            <img :src="`${headPortrait+'?'+now}`"/>
          </div>
          <p class="nickName">{{nickName}}</p>
          <!--<p class="userId">ID：{{phone}}</p>-->
        </router-link>

        <div class="row ">
          <router-link to="wallet" tag="div" class="col-xs-6  personalMessageLeft">
            <img :src="wallet" class="personalIcon">
            <span class="personalText" id="walletText">我的钱包</span>
            <span class="wallet"></span>
          </router-link>
          <router-link to="realname" tag="div" class="col-xs-6">
            <img :src="autonym" class="personalIcon">
            <span class="personalText">实名信息</span>
          </router-link>
        </div>
    </div>

    </div>
    <div class="personalItem">
      <div v-for="(m,index) in Personal" class="mediaDad">
        <div class="media" >
          <router-link :to="m.PersonalHref" tag="div">
            <div class="media-left">
              <img class="media-object" :src="m.imfLeft" >
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
    import invite from '@/assets/images/invite.png'

    export default {
        name: "Personal",
      computed:{
        now(){
          return Date.now();
        }
      },
      data(){
          return{
            autonym:autonym,
            wallet:wallet,
            nickName:'',
            phone:'',
            Personal:[
              {title:'我的好友',PersonalHref:'friend',imfLeft:friend},
              {title:'我的邀请者',PersonalHref:'',imfLeft:inviter,noRouter:true,myInvite:''},
              {title:'邀请奖励',PersonalHref:'reward',imfLeft:award},
              {title:'邀请码',PersonalHref:'ask',imfLeft:invite},
              {title:'商城订单',PersonalHref:'commodityorder',imfLeft:indent},
              {title:'收货地址',PersonalHref:'address',imfLeft:address},
              {title:'客服中心',PersonalHref:'wechatservice',imfLeft:service},
              {title:'账户设置',PersonalHref:'setting',imfLeft:setting}
            ],
            headPortrait:headImg,
            isLogin:true
          }
      },
      mounted(){
          this.$http({
            method: "get",
            url: "/users/profile",
            headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            data: {}
          }).then(function(res){
            if(res.data.code==0){
              this.nickName = res.data.data.nickname;
              this.phone = res.data.data.phone;
              this.headPortrait = res.data.data.avatar

            }else {
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              this.$layer.msg(err)
            }.bind(this));

        this.$http({
          method: "post",
          url: "/users/my-invite-code",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0){
            this.Personal[1].myInvite = res.data.my_invite_code;
            $('.media-right').eq(1).html(this.Personal[1].myInvite).css({'verticalAlign':'middle','paddingRight':'1rem','color':'#999'});

          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            console.log(err)
          }.bind(this))
      },
      methods:{
          changeBack(index){
            // $(".media").css({background:'#fff'});

          }

      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    background-color: #f5f5f5;
    color: #666;
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
    background: #f44336;
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
    border: 0.1rem solid #ddd;
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
    margin-top: 0;
    font-size: 1.6rem;
    border-radius: 0;
    border: none;
    border-bottom: 0.1rem solid #f5f5f5;
    text-align: left;
    padding: 0;
    padding-left:  1rem;
    color: #666;
  }
  .media:active {
    background: #f1f1f1
  }
  .mediaDad:nth-child(4), .mediaDad:nth-child(6){
    margin-bottom: 1rem;
  }
  .media-object{
    width: 3.8rem;
    padding: 0.5rem;
  }
  .msg{
    color: #ff2424;
    background: transparent;
    font-size: xx-large;
    padding: 0.5rem ;
    line-height: 0;
  }
</style>
