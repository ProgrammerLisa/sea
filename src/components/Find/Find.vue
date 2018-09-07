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
            <p><img src="../../assets/images/indent.png" style="width: 3rem"/></p>
            <div style="color: #333">每日登陆</div>
            <p style="font-size: small;margin-top: 5px">可获得能量值 <span style="color: #09a2d6">+1</span></p>
            <mu-button flat class="loginBtn">签到</mu-button>
          </div>
        <div class="thoseBox">
              22
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
        <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
        <p>“那么就去地狱找到你，我绝对不逃！”</p>
        <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      </div>
    </div>

  <div>
      <div class="TitleImg">
        <img src="../../assets/images/banner.png" />
      </div>
      <div class="panel panel-default task">
        <div class="panel-body">
          <span class="glyphicon glyphicon-minus decorate"></span>基础任务
        </div>
      </div>
      <div class="task1">
        <div class="taskList">
          <span class="glyphicon glyphicon-link taskIcon"></span>
          <div class="taskTitle">邀请10名好友</div>
          <div class="taskBody">邀请好友+20能量</div>
          <div class="taskBtn"  @click="signInHy">+20能量</div>
        </div>
        <div class="taskList">
          <span class="glyphicon glyphicon-globe taskIcon"></span>
          <div class="taskTitle">公益慈善</div>
          <div class="taskBody">爱心捐助+10能量</div>
          <router-link to="/publicgood" tag="div" class="taskBtn">+10能量</router-link>
        </div>

        <div class="taskListLast taskList">
          <span class="glyphicon glyphicon-calendar taskIcon"></span>
          <div class="taskTitle">每日登录</div>
          <div class="taskBody">登录获取能量值</div>
          <div class="taskSuccess" v-show="signIn"><span class="glyphicon glyphicon-ok"></span> 已完成</div>
          <div class="taskBtn" v-show="!signIn" @click="signInFc">+1能量</div>
        </div>
      </div>
      <div id="time" style="display: none">{{time | formatDate}}</div>

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
						this.$router.replace('/ask');
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
		letter-spacing: 0.05rem;
		font-size: 1.8rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
    background: #fff;
    color: #333;
    border-bottom: 1px solid #f5f5f5;
	}
  .tabTitle{
    font-size: 1.6rem;
    padding:0.8rem 1.5rem;
  }
  .tipTitle{
    color: #fff;margin: 1.5rem 0
  }
  .loginBox{
    border:1px solid #eee;padding-top:1rem;width: 17.5rem;height: 12rem;background: #fff;border-radius: 8px;margin: auto
  }
  .loginBtn{
    border: #0BA5D7 1px solid;color: #09a2d6;width: 6rem;height: 2.5rem;border-radius: 3px;
  }
  .thoseBox{
    width: 90%;height: 33rem;background: #fff;margin:-6rem 5% 0;border-radius: 8px;padding: 8rem 1rem 1rem
  }
</style>
