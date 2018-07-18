<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers"  @touchend="lat" class="back"><img :src="masrc"/></span>
				<span style="margin-left: -30px; position: absolute; left: 50%; font-size: 1.8rem;">提意见</span>
			</div>
		</div>
		<div class="text">
			<textarea class="form-control" rows="12" placeholder="请将您的意见或建议留言发给我们，收到后我们会立即处理并给予回复哦~" v-model="text"></textarea>
			<button class="btn submitBtn" @click="submitBtn">提交</button>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "UserFeedback",
		data(){
			return {
				masrc: back,
        text:''
			}
		},
		methods: {
      submitBtn(){
        this.$http({
          method: "post",
          url: "/users/feedback",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {
            content:this.text
          }
        }).then(function(res){
            this.$layer.msg(res.data.msg)
            if(res.data.code==0){
              this.$router.go(-1);
            }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this));
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

	.text {
		padding: 1rem;
	}

	.form-control {
		outline: none;
		border: none;
		box-shadow: none;
		border-radius: 0;
	}

	.submitBtn {
		background: #09a2d6;
		color: #fff;
		width: 100%;
		border-radius: 0;
		font-size: large;
		margin-top: 4rem;
	}
</style>
