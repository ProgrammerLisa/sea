<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">客服中心</span>
    </mu-appbar>
		<div v-if="netNone" class="netNone">
			<img :src="netNoneImg" />
			<p>暂时还没有消息哦</p>
		</div>
		<div v-else class="service">
			<h4 class="serviceTitle">客服时间</h4>
			<p class="serviceTime">{{customer_service_online}}</p>
			<p class="servicePrompt">如有问题请加微信联系客服</p>
			<!--<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=375812877&site=qq&menu=yes"><img style="width: 90px;" border="0" src="http://wpa.qq.com/pa?p=2:1028253651:51" alt="点击这里给我发消息哦" title="点击这里给我发消息哦"/></a>-->
			<img :src="wechatservice" />
		</div>
		<div class="tile">
			<span>商务合作:  kim_im_k@pasontech.com</span>
		</div>
		
	</div>
</template>

<script>
	import netNoneImg from '@/assets/images/network.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "WechatService",
		data() {
			return {
				masrc: back,
				netNone: false,
				netNoneImg: netNoneImg,
				wechatservice: ''
			}
		},
		mounted() {
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
      this.$nextTick(function () {
        this.service()
      })
		},
		methods: {
      service(){
        this.$http({
          method: "get",
          url: "/customer-service",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          }
        }).then(function(res) {
          if(res.data.code===0){
            this.wechatservice=res.data.data.customer_service_qrcode;
            this.customer_service_online = res.data.data.customer_service_online;
          }

        }.bind(this))
          .catch(function(err) {
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			}
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
    background: #09a2d6;
    color: #fff;
		font-size: 1.5rem;
    margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
    position: absolute;
		left: 1rem;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.netNone {
		top: 7rem;
		padding-bottom: 6vh;
		text-align: center;
		padding-top: 6vh;
		position: relative;
		width: 60%;
		height: 50%;
		background-color: #f5f5f5;
		left: 20%;
	}

	.netNone img {
		width: 50%;
		margin-bottom: 1rem;
	}

	.service {
		background: #f5f5f5;
		width: 70%;
		padding: 2rem;
		text-align: center;
		margin: auto;
		margin-top: 15vh;
	}

	.service img {
		width: 70%;
    max-width: 20rem;
	}

	.serviceTitle {
		color: #333;
	}

	.serviceTime {
		color: #09a2d6;
		font-size: larger;
	}
	.tile{
		width: 100%;
		text-align: center;
		color: red;
		font-size: 1.6rem;
	}
</style>
