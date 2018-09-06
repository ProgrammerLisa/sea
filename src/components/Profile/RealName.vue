<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">实名信息</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <div v-if="succeed " class="addressNone">
        <img :src="succeedImg" />
        <p>已认证成功</p>
      </div>
      <div v-if="inputbox">
        <form class="form-horizontal">
          <div class="form-group">
              <input type="text" class="form-control" id="number" placeholder="请输入本人身份证号">
          </div>
          <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="请输入真实姓名">
          </div>

          <div class="prompt">
            <span>请填写正确信息以确保交易无误</span>
          </div>

        </form>
        <div class="changePsw">
          <mu-flex justify-content="center" class="submitBtn" align-items="center">
            <mu-button flat large class="publicButton" @click="submit">发消息</mu-button>
          </mu-flex>
        </div>
      </div>
      <table v-else class="table">
        <tr v-for="r in realName">
          <td class="text-left">{{r.title}}</td>
          <td class="text-right">{{r.content}}</td>
        </tr>
      </table>
    </div>
	</div>
</template>

<script>
	import succeedImg from '@/assets/images/renzheng.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "RealName",
		data() {
			return {
				masrc: back,
				inputbox: false,
				succeed: false,
				succeedImg: succeedImg,
				realName: [{
						title: '姓名',
						content: '**默'
					},
					{
						title: '身份证号',
						content: '3413*************5676'
					},
					{
						title: '手机号',
						content: ''
					}
				]
			}
		},
		mounted() {
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
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
						if(!res.data.data.is_realname) {
							  this.inputbox = true;
								this.succeed = false
						} else {
              this.succeed = true;
							this.realName[0].content = res.data.data.real_name;
							this.realName[1].content = res.data.data.card_num;
							this.realName[2].content = res.data.data.phone
						}
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
          this.$layer.msg("系统异常，请稍后再试");
				}.bind(this));

		},
		methods: {
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			submit() {
				let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				let regName = /^[\u4e00-\u9fa5]{2,4}$/;
				if(!regIdNo.test($("#number").val())) {
					this.$layer.msg("身份证号填写有误");
					return false;
				} else if(!regName.test($("#name").val())) {
					this.$layer.msg("真实姓名填写有误");
					return false;
				} else {
					this.$http({
							method: "post",
							url: "/users/real-name-authentication",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								card_num: $("#number").val(),
								real_name: $("#name").val()
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								this.$layer.msg(res.data.msg);
								this.inputbox = false;
								this.$router.go(-1);
							} else {
								this.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
						}.bind(this));

				}
			},

		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		padding-bottom: 6rem;
		background-color: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
    font-size: 1.6rem;
	}

	.table {
		background: #fff;
	}

	.table tr {
		border-bottom: 0.1rem solid #f5f5f5;
	}

	.table td {
		padding: 1.5rem 1.7rem;
	}

	.text-left {
		color: #555;
	}

	.form-group {
		padding: 0.8rem 1rem;
		border-bottom: 0.1rem solid #eee;
		background: #fff;
		margin-bottom: 0;
	}

	.form-control {
		outline: none;
		border: none;
		box-shadow: none;
    padding: 0 2rem;
	}

	input {
		background: #fff;
	}

	.prompt {
		font-size: smaller;
		color: #09a2d6;
		padding: 1rem 2rem;
		background: #fff;
	}
  .prompt span{
    background: linear-gradient(to right,#0BA5D7, #38E7F8 , #0BA5D7);
    -webkit-background-clip: text;
    color: transparent;
  }

	.changePsw {
		background: #f5f5f5;
		border: none;
		text-align: center;
	}

	.submitBtn {
		width: 92%;
		font-size: large;
		border-radius: 0;
    margin:  2.5rem auto;
	}

	.addressNone {
		text-align: center;
		padding: 5vh;
		color: #999;
		background-color: #FFFFFF;
	}

	.addressNone img {
		width: 40%;
		margin-bottom: 1rem;
	}
  .publicButton{
    width: 95%;
  }
</style>
