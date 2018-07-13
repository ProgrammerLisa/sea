<template>
  <div class="content">
    <div class="personal">
      <div class="news">
        <router-link to="/news" v-if="newsCount" tag="div" class="badgePositionRed"></router-link>
        <router-link to="/news" v-else tag="div" class="badgePosition"></router-link>
      </div>
      <div class="container personalMessage">
        <router-link tag="div" to="/compile" v-if="headDefault">
          <div class="HeadPortrait">
            <img  :src="`${headPortrait+'?'+now}`" v-if="haveHeadImg"/>
            <img :src="headPortrait" v-else/>
          </div>
          <p class="nickName">{{nickName}}</p>
          <!--<p class="userId">ID：{{phone}}</p>-->
        </router-link>
        <router-link  v-else tag="div" to="/login">
          <div class="HeadPortrait">
            <img :src="headPortrait"/>
          </div>
          <p class="nickName">点击登录</p>
        </router-link>

				<div class="row msgBox">
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
				<div class="media">
					<router-link :to="m.PersonalHref" tag="div">
						<div class="media-left">
							<img class="media-object" :src="m.imfLeft">
						</div>
						<div class="media-body" style="vertical-align: middle">
							{{m.title}}
						</div>
						<div class="media-right">
							<img class="media-object" src="../assets/images/more.png" v-if="!m.noRouter" />
              <span class="inviteCode" v-else>{{m.myInvite}}</span>
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
	import headImg from '@/assets/images/chushi.png'
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
              {title:'邀请码',PersonalHref:'ask',imfLeft:invite},
              {title:'商城订单',PersonalHref:'commodityorder',imfLeft:indent},
              {title:'收货地址',PersonalHref:'address',imfLeft:address},
              {title:'客服中心',PersonalHref:'wechatservice',imfLeft:service},
              {title:'账户设置',PersonalHref:'setting',imfLeft:setting}
            ],
            headPortrait:headImg,
            headDefault:true,
            isLogin:true,
            newsCount:false,
            haveHeadImg:false
          }
      },
      mounted(){
          //个人信息
        this.$http({
          method: "get",
          url: "/users/profile",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0){
            var nikename = res.data.data.nickname;
            var headimg = res.data.data.avatar;
            if(nikename==""){
              this.nickName = localStorage.getItem("uid");
            }else {
              this.nickName =nikename;
            }
            if(headimg==""){
              this.headPortrait = headImg;
              this.haveHeadImg=false;
            }else {
              this.headPortrait = res.data.data.avatar;
              this.haveHeadImg=true;
            }

          }else {
            this.headPortrait = headImg;
            this.headDefault=false;
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg(err)
          }.bind(this));

        //消息
        this.$http({
          method: "post",
          url: "/messages/box",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0) {
            if(res.data.count>0){
              this.newsCount = true
            }else {
              this.newsCount = false
            }
          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg(err)
          }.bind(this));

        //邀请人id
        this.$http({
          method: "post",
          url: "/users/my-invite-code",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
        	if(res.data.code === 401){
//      		this.$layer.alert('登录操作  请登录');
        		this.$router.replace('/Login');
        	}
          if(res.data.code==0) {
            this.Personal[1].myInvite = res.data.my_invite_code
          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg(err)
          }.bind(this));

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
  .badgePositionRed{
    width: 5rem;
    height: 3rem;
    background:url("../assets/images/new.png") no-repeat;
    background-size: 60% 100%;
  }
  .badgePosition{
    width: 5rem;
    height: 3rem;
    background:url("../assets/images/news.png") no-repeat;
    background-size: 60% 100%;
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
  .msgBox{
    margin-top: 1rem;
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
  .media-left{
    padding-bottom: 0;
    padding-right: 0;
  }
  .mediaDad:nth-child(3), .mediaDad:nth-child(6){
    margin-bottom: 1rem;
  }

  .media-object{
    padding: 0.8rem;
  }
  @media screen and (min-height: 560px) and (max-height: 700px) {
    .media-object {
      width:8vh
    }
    .media-right{
      line-height: 8vh;
    }
  }
  @media screen and (min-height: 700px) and (max-height: 850px) {
    .media-object {
      width:7vh
    }
    .media-right{
      line-height: 7vh;
    }
  }
  @media screen and (min-height: 850px) and (max-height: 1024px) {
    .media-object {
      width:6vh
    }
    .media-right{
      line-height: 6vh;
    }
  }
  @media screen and (min-height:1025px) and (max-height: 2000px) {
    .media-object {
      width:5vh
    }
    .media-right{
      line-height: 5vh;
    }
  }
  .msg{
    color: #ff2424;
    background: transparent;
    font-size: xx-large;
    padding: 0.5rem ;
    line-height: 0;
  }
  .inviteCode{
    padding-right: 2rem;
  }
</style>