<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">意见反馈</span>
    </mu-appbar>
		<div class="text contentMarginTop">
			<textarea class="form-control" rows="12" placeholder="请将您的意见或建议留言发给我们，收到后我们会立即处理并给予回复哦~" v-model="text"></textarea>
      <mu-button flat @click="submitBtn" class="submitBtn publicButton">提交</mu-button>
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
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
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
		width: 100%;
		border-radius: 0;
		font-size: large;
		margin-top: 4rem;
    height: 3.5rem;
	}
	.submitBtn:active{
		background: #009ACD;
	}
	.submitBtn:focus{
		outline: 0;
	}
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    border-radius: 3px;
  }
</style>
