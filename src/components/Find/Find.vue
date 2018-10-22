<template>
	<div class="content">

		<div class="BlackTitle">
				发现
		</div>
    <div v-if="hasSignal">
      <mu-tabs :value.sync="active1" class="cc" inverse full-width indicator-color="#fff" color="#09A2D6" text-color="rgba(0, 0, 0, .54)"  center style="background: #fff">
        <mu-tab class="tabTitle">基础任务</mu-tab>
        <mu-tab class="tabTitle">独家任务</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active1 === 0">
        <div class="sanjiao1" :style="left">
          <div class="sanjiao"></div>
        </div>
          <h4 class="text-center tipTitle">任务越多能量值越高</h4>
          <div class="text-center loginBox">
            <!--<p><img src="../../assets/images/indent.png" style="width: 3rem"/></p>-->
            <div style="color: #333">每日登陆</div>
            <p style="font-size: small;margin-top: 5px">可获得能量值 <span style="color: #09a2d6">+1</span></p>
            <mu-button flat class="publicButton" v-if="signIn">已签到</mu-button>
            <mu-button flat class="loginBtn"  v-else @click="signInFc"><div class="hongdian">●</div>签到</mu-button>
          </div>
        <div class="thoseBox">
          <div class="thoseBoxContainer">
            <!--<div class="thoseBoxLeft"><img src="../../assets/images/indent.png"/></div>-->
            <div class="thoseBoxCenter">
              <div style="color: #333">邀请10名好友</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+20</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="loginBtn goThose" @click="signInHy">去邀请</mu-button>
            </div>
          </div>
          
          <div class="thoseBoxContainer">
            <!--<div class="thoseBoxLeft"><img src="../../assets/images/indent.png"/></div>-->
            <div class="thoseBoxCenter">
              <div style="color: #333">公益慈善</div>
              <div style="font-size: small;margin-top: 5px">可获得相应捐赠数 <span  style="color: #09a2d6"></span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/publicgood" v-if="signto">已完成</mu-button>
              <mu-button flat class="loginBtn goThose" to="/publicgood" v-else><div class="hongdian">●</div>去完成</mu-button>
            </div>
          </div>
          
          <div class="thoseBoxContainer">
            <div class="thoseBoxCenter">
              <div style="color: #333">新闻资讯</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+2</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/journalism" v-if="signthree">已完成</mu-button>
              <mu-button flat class="loginBtn goThose" to="/journalism" v-else><div class="hongdian">●</div>去完成</mu-button>
            </div>
          </div>
           <div class="thoseBoxContainer">
            <div class="thoseBoxCenter">
              <div style="color: #333">偷取好友珍珠</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+1</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/friend" v-if="steal">已完成</mu-button>
              <mu-button flat class="loginBtn goThose" to="/friend" v-else><div class="hongdian">●</div>去完成</mu-button>
            </div>
          </div>
          
          <div class="thoseBoxContainer">
            <div class="thoseBoxCenter">
              <div style="color: #333">实名认证</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+10</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/realname" v-if="relname">已完成</mu-button>
              <mu-button flat class="loginBtn goThose" to="/realname" v-else><div class="hongdian">●</div>去完成</mu-button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <div class="sanjiao2" :style="right">
          <div class="sanjiao"></div>
        </div>
        <div class="kebi">
          <p class="text-center" style="background: white;margin: 35vh auto;padding: 1rem;border-radius: 8px;width: 50%">即将上线 敬请期待</p>

        </div>

      </div>
    </div>
    <div v-else>
      <nothing @again="again"></nothing>
    </div>


	</div>
</template>

<script>
	import { formatDate } from "../../assets/js/date";
	import Nothing from '@/components/Nothing'

	export default {
		name: "GetForce",
		filters: {
			formatDate(time) {
				let data = new Date(time);
				return formatDate(data, 'yyyy-MM-dd hh:mm:ss')
			}
		},
    components:{
      'nothing':Nothing
    },
		data() {
			return {
				time: Date.now(),
        hasSignal:true,
				signIn: '',
				signIns:'',
				signto:'',
				signthree:'',
        active1:0,
        left:'',
        right:''
			}
		},
		mounted() {
      let clickNum = 0;
      mui.back = function(){
        clickNum++;
        if(clickNum > 1) {
          plus.runtime.quit();
        } else {
          mui.toast("再按一次退出应用");
        }
        setTimeout(function() {
          clickNum = 0
        }, 2000);
        return false;

      };

      this.$nextTick(function() {
        let that = this;
				this.isSignIn();
				var left=$(window).width()/4-8;
        var right=$(window).width()/4-8;
				this.left='left:'+left+'px';
        this.right='right:'+right+'px';
			})
		},
		methods: {
			isSignIn() {
				this.$http({
						method: "post",
						url: "/tasks/explore",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
					}).then(function(res) {
						if(res.data.code === 401) {
							this.$layer.msg('请登录后再试！');
							this.$router.replace('/login');
						}
						if(res.data.code == 0) {
						  this.hasSignal=true;
							if(res.data.has_signed) {
								this.signIn = true
							} else {
								this.signIn = false
							}
							if(res.data.has_donated) {
								this.signto = true
							} else {
								this.signto = false;
							}
							if(res.data.has_read) {
								this.signthree = true
							} else {
								this.signthree = false
							}
							if(res.data.has_stolen) {
								this.steal = true
							} else {
								this.steal = false
							}
							if(res.data.has_finish_realname) {
								this.relname = true
							} else {
								this.relname = false
							}
						}else {
              this.hasSignal=false;
            }
					}.bind(this))
					.catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
            this.hasSignal=false;
					}.bind(this));
			},
			signInFc() {
				this.$http({
						method: "post",
						url: "/tasks/sign-in",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
					}).then(function(res) {
						this.$layer.msg(res.data.msg);
						if(res.data.code == 0) {
							if(res.data.has_signed) {
								this.signIn = false
							} else {
								this.signIn = true
							}
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));
			},
			signInHy() {
				this.$http({
						method: "post",
						url: "/tasks/invite-friends",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
					}).then(function(res) {
//						this.$layer.msg(res.data.msg);
						this.$router.push('/ask');
						if(res.data.code == 0) {
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this));
			},
      again(){
        this.isSignIn();
      }
		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 6rem;
		color: #555;
		width: 100vw;
		height: 115vh;
		overflow-x: hidden;
		overflow-y: hidden;
    background-image: url("../../assets/images/faxianbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 1.6rem;
	}
	.content::-webkit-scrollbar {
		display: none;
	}
	.BlackTitle {
		text-align: center;
		letter-spacing: 2px;
		font-size: 1.7rem;
    font-weight: bold;
		line-height: 50px;
    background: #fff;
    color: #323232;
    border-bottom: 1px solid #f5f5f5;
	}
  .tabTitle{
    font-size: 1.6rem;
    padding:0.8rem 2.5rem;
    color: #323232;
  }
  .sanjiao{
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 8px;
    border-color: transparent transparent #22C5E8 transparent;
    border-style:  dashed dashed solid dashed;
    z-index: 999;
  }
  .sanjiao1,.sanjiao2{
    position: absolute;
    top: 88px;
  }
  .tipTitle{
    color: #fff;margin: 1.5rem 0
  }
  .loginBox{
    border:1px solid #eee;padding-top:1rem;width: 17.5rem;height: 12rem;background: #fff;border-radius: 8px;margin: auto
  }
  .loginBtn{
    border: #20C2E6 1px solid;color: #20C2E6;width: 6rem;height: 3rem;border-radius: 3px;
  }
  .hongdian{
  	position: absolute;
  	color: red;
  	margin-top: -13px;
  	margin-left: 40px;
  	font-size: 1.5rem;
  }
  .goThose{
    margin-top: 5px;
  }
  .thoseBox{
    width: 90%;height: 100vh;background: #fff;margin:-6rem 5% 0;border-radius: 8px;padding: 4rem 1rem 12rem
  }
  .publicButton{
    width: 6rem;height:3rem;background: linear-gradient(to right, #38E7F8 , #0BA5D7);color: white;
  }
 
  .thoseBoxContainer{
    display: flex;border-bottom: 1px solid #f5f5f5;padding: 1rem 0
  }
  .thoseBoxLeft{
    height: 100%;padding: 1rem 0
  }
  .thoseBoxLeft img{
    width: 3rem;height:100%;display: block;margin: auto
  }
  .thoseBoxCenter{
    margin-left: 1rem
  }
  .thoseBoxRight{
    padding: 0.5rem 0;position: absolute;right: 2.5rem
  }
  .kebi{
    background: url("../../assets/images/faxiannone.png");width: 100%;height: 100%;border-top: 1px solid transparent;background-size: 100% 100%;
  }
</style>
