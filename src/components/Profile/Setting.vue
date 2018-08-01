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
          <router-link to="/changepassword">
            <mu-list-item button>
              <mu-list-item-title  class="listTitle"> 修改密码</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider" style="height: 0.6rem"></mu-divider>
          </router-link>
          <router-link to="/aboutus">
            <mu-list-item button>
              <mu-list-item-title  class="listTitle"> 关于我们</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider"></mu-divider>
          </router-link>
          <router-link to="/userfeedback">
            <mu-list-item button>
              <mu-list-item-title  class="listTitle"> 用户反馈</mu-list-item-title>
              <mu-list-item-action>
                <mu-button icon>
                  <img class="more" src="../../assets/images/more.png" />
                </mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider class="mu-divider"></mu-divider>
          </router-link>
          <mu-list-item button>
            <mu-list-item-title  class="listTitle"> 版本更新</mu-list-item-title>
            <mu-list-item-action>
              <span>已是最新版本</span>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider class="mu-divider" style="background: #eee"></mu-divider>
        </mu-list>

      </mu-paper>
      <mu-flex justify-content="center" align-items="center" class= "loginOut"  @click="loginOut">
        <mu-button full-width large color="#fff" style="color: #F5594E;letter-spacing: 2px">退出登录</mu-button>
      </mu-flex>

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
				IDcode: ''
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
			CleanUpCaching() {
				this.$layer.confirm('确定清理缓存数据吗', {
					type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
					title: '温馨提示',
					content: '',
					area: 'auto',
					offset: 'auto',
					icon: -1,
					btn: '确定',
					time: 0,
					shade: true,
					yes: '',
					cancel: '',
					tips: [3, '#000'], //支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
					tipsMore: false, //是否允许多个tips
					shadeClose: false,
				});
				$(".vl-notice-title").css({
					display: 'none'
				});
				$(".vl-notify-btns").css({
					textAlign: 'center',
					paddingBottom: '1rem'
				});
				$(".vl-notify-content").css({
					textAlign: 'center'
				});
				$(".notify-btn-primary").css({
					background: '#09a2d6',
					borderRadius: 0,
					padding: '0.2rem 1.5rem',
					margin: '0 1rem'
				});
				$(".notify-btn-default").css({
					borderRadius: 0,
					padding: '0.2rem 1.5rem'
				});
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

				const that = this;
				this.$layer.confirm("确认要退出登录吗", {
					title: "退出登录"
				}, function(c) {

					$(".vl-notify").remove();
					that.$http({
							method: "post",
							url: "/auth/logout",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {}
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
				})

				$(".vl-notice-title").css({
					display: "none"
				});
				$(".vl-notify-btns").css({
          textAlign: "center",
          borderTop:"1px solid #ddd",
          padding:"0"
				});
				$(".vl-notify-content").css({
					textAlign: "center"
				});
				$(".notify-btn").css({
					borderRadius: "0",
          width:"49%",
          margin:"0",
          border:"none",
          background:"#fff",
          color:"#555"
				});
        $(".notify-btn-default").css({
          borderLeft:"1px solid #ddd"
        });
        $(".vl-notify").css({
          paddingBottom:"0"
        });
        $(".vl-notify-mask").css({
          background:"#111"
        });
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
		background: #f5f5f5;
		color: red;
		border: none;
	}

</style>
