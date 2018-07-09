<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span> 添加好友
			</div>
		</div>
		<div class="search">
			<form class="form-inline">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-addon searchInput"><span class="glyphicon glyphicon-search"></span></div>
						<input type="text" class="form-control searchInput" id="exampleInputAmount" placeholder="搜索手机号、星号ID">
					</div>
				</div>
			</form>
			<div class="myID">我的星号ID：56789666</div>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "AddFriends",
		data() {
			return {
				masrc: back
			}
		},
		methods: {
			evers() {
				console.log(1)
				this.masrc = backs;
			},
			lat() {
				console.log(2)
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
		background-color: #fff;
		height: 100vh;
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
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
		font-size: 2.5rem;
	}

	.search {
		background: #f5f5f5;
		padding: 1rem;
	}

	.searchInput {
		outline: none;
		border: none;
		box-shadow: none;
		height: 3.5rem;
		background: #fff;
	}

	.glyphicon-search {
		color: #999;
	}

	.myID {
		text-align: center;
	}
</style>
