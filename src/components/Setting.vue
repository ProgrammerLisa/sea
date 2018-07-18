<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -20px; position: absolute; left: 50%; font-size: 1.8rem;">设 置</span>
			</div>
		</div>
		<table class="table">
			<tr>
				<td class="text-left"><span class="high">账户</span></td>
				<td class="text-right">136****</td>
			</tr>
			<router-link to="ChangePassword" tag="tr" class="arrow">
				<td class="text-left">修改密码</td>
				<td class="text-right"><img :src="more" class="more" /></td>
			</router-link>
			<tr class="spacing">
				<td></td>
				<td></td>
			</tr>
			<!--<tr class="settingBtn">-->
				<!--<td class="text-left"><span class="high">消息提醒</span></td>-->
				<!--<td class="text-right">-->
					<!--<div class="blueBtn" @click="switchBtn">-->
						<!--<div class="cap">-->
							<!--<div class="whiteBtn">-->

							<!--</div>-->
						<!--</div>-->

					<!--</div>-->
				<!--</td>-->
			<!--</tr>-->
			<!--<tr class="arrow">-->
				<!--<td class="text-left">空间清理</td>-->
				<!--<td class="text-right" @click="CleanUpCaching">35M <img :src="more" class="more" /></td>-->
			<!--</tr>-->
			<!--<tr class="spacing">-->
				<!--<td></td>-->
				<!--<td></td>-->
			<!--</tr>-->
			<router-link to="AboutUs" tag="tr" class="arrow">
				<td class="text-left">关于我们</td>
				<td class="text-right"><img :src="more" class="more" /></td>
			</router-link>
			<router-link to="UserFeedback" tag="tr" class="arrow">
				<td class="text-left">用户反馈</td>
				<td class="text-right"><img :src="more" class="more" /></td>
			</router-link>
			<tr class="arrow">
				<td class="text-left">版本更新</td>
				<td class="text-right">已是最新版本 <img :src="more" class="more" /></td>
			</tr>
		</table>
		<div class="btn btn-default loginOut" @click="loginOut">
			退出登录
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
				isOn: true
			}
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

	.panel {
		border: none;
		border-radius: 0;
	}

	.panel-body {
		padding: 0 10px;
	}

	.BlackTitle {
		text-align: center;
		letter-spacing: 0.05rem;
		color: #555;
		font-size: 1.6rem;
		margin-bottom: 1rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		position: absolute;
		left: 1rem;
	}

	.back img {
		height: 2.5rem;
	}

	.table {
		background: #fff;
	}

	.table tr {
		border-bottom: 0.1rem solid #f5f5f5;
		height: 8vh;
	}

	.table td {
		padding: 0.5rem 1.5rem;
	}

	.table .spacing {
		height: 1rem;
	}

	.spacing td {
		padding: 0;
		height: 1rem;
		background: #f5f5f5;
	}

	.more {
		height: 3rem;
	}

	.arrow:active {
		background: #f1f1f1;
	}

	.arrow td {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.arrow td:nth-child(2) {
		padding-right: 0;
	}

	.high {
		height: 3rem;
		line-height: 3rem;
	}

	.loginOut {
		background: #fff;
		text-align: center;
		line-height: 3rem;
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

	.blueBtn {
		background: #09a2d6;
		border-radius: 2rem;
		width: 3.5rem;
		height: 2rem;
		margin-bottom: -0.3rem;
		display: inline-block;
		overflow: hidden;
	}

	.cap {
		border-radius: 2rem;
		background: #ccc;
		width: 100%;
		height: 100%;
		position: relative;
		left: 1.5rem;
	}

</style>
