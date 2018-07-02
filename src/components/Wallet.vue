<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" class="back"> <span>ㄑ</span></span>
				我的钱包
			</div>
		</div>
		<table class="table" v-for="m in myWallet">
			<router-link :to="m.url" tag="tr">
				<td class="text-left">{{m.title}}</td>
				<td class="text-right"><img :src="more" /></td>
			</router-link>
		</table>
	</div>
</template>

<script>
	import more from '@/assets/images/more.png'
	export default {
		name: "Wallet",
		data() {
			return {
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
		methods: {
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
		float: left;
	}
	
	.back span {
		height: 2.5rem;
		font-size: 2.5rem;
		color: #DBDBDB;
	}
	
	.back span:active {
		color: black;
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
		padding: 0.5rem 1rem;
	}
	
	.text-left {
		color: #555;
	}
	
	.text-right img {
		height: 3rem;
	}
</style>