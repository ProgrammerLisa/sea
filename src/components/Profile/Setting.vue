<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">设置</span>
    </mu-appbar>
    <div class="contentMarginTop">

      <mu-paper :z-depth="0" class="demo-list-wrap">
        <mu-list>
            <mu-list-item button>
              <mu-list-item-title  class="listTitle"> 账户</mu-list-item-title>
              <mu-list-item-action>
                <span style="font-size: 1.5rem">{{IDcode}}</span>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider"></mu-divider>
            <mu-list-item button to="/changepassword">
              <mu-list-item-title  class="listTitle"> 修改密码</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider" style="height: 0.6rem"></mu-divider>
            <mu-list-item button to="/aboutus">
              <mu-list-item-title  class="listTitle"> 关于我们</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider"></mu-divider>
            <mu-list-item button to="/userfeedback">
              <mu-list-item-title  class="listTitle"> 用户反馈</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider"></mu-divider>
            <mu-list-item button>
              <mu-list-item-title  class="listTitle"> 版本更新</mu-list-item-title>
              <mu-list-item-action>
                <span>已是最新版本</span>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider" style="background: #eee"></mu-divider>
        </mu-list>

      </mu-paper>
      <mu-flex justify-content="center" align-items="center" class= "loginOut"  @click="openAlertDialog">
        <mu-button full-width large color="#fff" style="color: #F5594E;letter-spacing: 2px">退出登录</mu-button>
      </mu-flex>
      <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert" style="text-align: center">
        <div class="publicDialogTitle">确认要退出登录吗</div>
        <mu-button slot="actions" flat color="primary" @click="loginOut" class="loginOutBtn">确定</mu-button>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog" class="loginOutBtn">取消</mu-button>
      </mu-dialog>
    </div>
	</div>

</template>

<script>

	import more from '@/assets/images/more.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "Setting",
		data() {
			return {
				masrc: back,
				more: more,
				isOn: true,
				IDcode: '',
        openAlert: false
			}
		},
		mounted: function() {
			this.$http({
					method: "get",
					url: "/users/info",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {
					if(res.data.code == 0) {
						this.IDcode = res.data.data.phone;
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					console.log(err)
				}.bind(this))

		},
		methods: {
      openAlertDialog () {
        this.openAlert = true;
        $(".mu-flat-button").css({height:"48px"})
      },
      closeAlertDialog () {
        this.openAlert = false;
      },
			switchBtn() {
				const that = this;
				if(that.isOn) {
					$(".whiteBtn").css({
						border: 'solid 0.1rem #ccc'
					});
					$(".cap").animate({
						left: 0
					}, 300);
					that.isOn = false;
				} else {
					$(".whiteBtn").css({
						border: 'solid 0.1rem #09a2d6'
					});
					$(".cap").animate({
						left: '1.5rem'
					}, 300);
					that.isOn = true;
				}
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			loginOut() {
        this.openAlert = false;
				const that = this;

					that.$http({
							method: "post",
							url: "/auth/logout",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								that.$layer.msg(res.data.msg);
								localStorage.removeItem("uid");
								that.$router.replace('/');
								that.$router.go(0);
							} else {
								that.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))

			}
		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #f5f5f5;
		width: 100vw;
		height: 100vh;
    position: fixed;
    top: 0;
	}
  .myList{
    background: #fff;
    display: flex;
    font-size: 1.6rem;
    color: #333;
    padding:1rem 1.8rem;
    border-bottom: 1px solid #f5f5f5;
  }
  .myListTitle{
    width: 40%;
  }
  .myListBody{
    width: 60%;
  }
  .mu-list{
    padding: 0;
  }
  .listTitle{
    color: #555;
    font-size: 1.5rem;
  }
  .mu-divider{
    background: #f5f5f5;
  }
  .mu-item-action{
    min-width: 50%;
  }

	.more {
		height: 3rem;
	}



	.loginOut {
		background: #fff;
		text-align: center;
		line-height: 4rem;
		color: #ff2424;
		letter-spacing: 0.1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		border: none;
		border-top: 0.1rem solid #eee;
		border-radius: 0;
	}

	.loginOut:active {
		color: red;
		border: none;
	}

  .loginOutBtn{
    border-top: 1px solid #ddd;width: 50%;
  }
  .loginOutBtn:first-child{
    border-right: 1px solid #ddd;
    color: #555;
  }
</style>
