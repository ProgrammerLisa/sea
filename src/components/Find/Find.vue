<template>
	<div class="content">
		<div class="BlackTitle">
				发现
		</div>
    <div>
      <mu-tabs :value.sync="active1" inverse indicator-color="#fff" color="#09A2D6" text-color="rgba(0, 0, 0, .54)"  center style="background: #fff">
        <mu-tab class="tabTitle">基础任务</mu-tab>
        <mu-tab class="tabTitle">独家任务</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active1 === 0">
          <h4 class="text-center tipTitle">任务越多能量值越高</h4>
          <div class="text-center loginBox">
            <!--<p><img src="../../assets/images/indent.png" style="width: 3rem"/></p>-->
            <div style="color: #333">每日登陆</div>
            <p style="font-size: small;margin-top: 5px">可获得能量值 <span style="color: #09a2d6">+1</span></p>
            <mu-button flat class="publicButton" v-if="signIn">已签到</mu-button>
            <mu-button flat class="loginBtn"  v-else @click="signInFc">签到</mu-button>
          </div>
        <div class="thoseBox">
          <div class="thoseBoxContainer">
            <!--<div class="thoseBoxLeft"><img src="../../assets/images/indent.png"/></div>-->
            <div class="thoseBoxCenter">
              <div style="color: #333">邀请10名好友</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+1</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="loginBtn goThose" @click="signInHy">去邀请</mu-button>
            </div>
          </div>
          <div class="thoseBoxContainer">
            <!--<div class="thoseBoxLeft"><img src="../../assets/images/indent.png"/></div>-->
            <div class="thoseBoxCenter">
              <div style="color: #333">公益慈善</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+1</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/publicgood" v-if="signto">已完成</mu-button>
              <mu-button flat class="loginBtn" to="/publicgood" v-else>去完成</mu-button>
            </div>
          </div>
          <div class="thoseBoxContainer">
            <!--<div class="thoseBoxLeft"><img src="../../assets/images/indent.png"/></div>-->
            <div class="thoseBoxCenter">
              <div style="color: #333">新闻资讯</div>
              <div style="font-size: small;margin-top: 5px">可获得能量值 <span  style="color: #09a2d6">+1</span></div>
            </div>
            <div class="thoseBoxRight">
              <mu-button flat class="publicButton" to="/journalism" v-if="signthree">已完成</mu-button>
              <mu-button flat class="loginBtn" to="/journalism">去完成</mu-button>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <p class="text-center" style="background: white;margin: 35vh auto;padding: 1rem;border-radius: 8px;width: 50%">即将上线 敬请期待</p>

      </div>
    </div>



	</div>
</template>

<script>
	import { formatDate } from "../../assets/js/date";

	export default {
		name: "GetForce",
		filters: {
			formatDate(time) {
				let data = new Date(time);
				return formatDate(data, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		data() {
			return {
				time: Date.now(),
				signIn: '',
				signIns:'',
				signto:'',
				signthree:'',
        		active1:0
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
				this.isSignIn();
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
							if(res.data.has_signed) {
								this.signIn = true
							} else {
								this.signIn = false
							}
							if(res.data.has_donated) {
								this.signto = true
							} else {
								this.signto = false
							}
							if(res.data.has_read) {
								this.signthree = true
							} else {
								this.signthree = false
							}
						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
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
			}
		}
	}
</script>

<style scoped>
	.content {
		padding-bottom: 6rem;
		color: #555;
		width: 100vw;
		height: 100vh;
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
    padding:0.8rem 1.5rem;
    color: #323232;
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
</style>
