<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的钱包</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <table class="table" v-for="m in myWallet">
        <router-link :to="m.url" tag="tr">
          <td class="text-left">{{m.title}}</td>
          <td class="text-right"><img :src="more" /></td>
        </router-link>
      </table>
    </div>
	</div>
</template>

<script>
	import more from '@/assets/images/more.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	export default {
		name: "wallet",
		data() {
			return {
				masrc: back,
				more: more,
				myWallet: [{
						url: '/statement',
						title: '我的账单'
					},
					{
						url: '/mypearl',
						title: '我的珍珠'
					}
				]
			}
		},
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
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

	.table {
		background: #fff;
		border-bottom: 0.1rem solid #f5f5f5;
		margin: 0;
	}

	.table:nth-child(3) {
		margin-bottom: 1rem;
	}

	.table td {
		padding: 1rem 1rem 1rem 1.7rem;
    font-size: 1.6rem;
	}

	.text-left {
		color: #555;
	}

	.text-right img {
		height: 3rem;
	}
</style>
