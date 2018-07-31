<template>
	<div id="Grade">
		<div id="navTopMargin"></div>
		<div class="panel panel-default BlackTitle">
			<div class="panel-body" >
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"> <img :src="masrc"/></span>
				<span style="margin-left: -35px; position: absolute; left: 50%; font-size: 1.8rem;">我的等级</span>
			</div>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	
	export default {
		name: "Grade",
		data() {
			return {
				masrc: back
			}
		},
		methods:{
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
	#grade {
		height: 100vh;
		width: 100vw;
		background-color: white;
	}
	
	span {
		font-size: 10px;
	}

	#group_input_imgs {
		position: relative;
		width: 54px;
		float: right;
		margin-top: -50px;
		/*margin-left: 75%;*/
	}

	#group_input_img {
		position: relative;
		margin-top: -50px;
		width: 54px;
		float: right;
	}
	
	.panel {
		border-radius: 0;
	}
	

  .panel{
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
		font-size: 1.8rem;
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
		border: 0;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}
</style>