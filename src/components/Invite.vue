<template>
<div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        <span style="margin-left: -30px; position: absolute; left: 50%; font-size: 1.8rem;">邀请码</span>
      </div>
    </div>
    <div class="code">
        <input id="ask_invite" v-model="verif" placeholder="请填写邀请码" maxlength="20" keyboard="number" is-type="china-mobile" required></input>
      <div style="padding-top:40px;">
        <x-button :disabled="!verif" id="finish" @click.native="accomplish" type="primary">完 成</x-button>
      </div>

      <center>
        <div id="agree">
          <check-icon :value.sync="demo1"></check-icon><span>我同意</span>
          <a id="agree_a" href="#"><span>《星海行动使用协议》</span></a>
        </div>
      </center>

    </div>

</div>
</template>

<script>
	import { XInput, Group, XButton, CheckIcon } from 'vux'

	export default {
		name: 'ask',
		components: {
			XInput,
			Group,
			XButton,
			CheckIcon
		},
		data() {
			return {
				ask_invite: '888888',
				verif: '',
				check: '',
				demo1: false,
				demo2: true
			}
		},
		methods: {
			goBack(){
            this.$router.go(-1);
         },
			accomplish() {
				if(this.verif == '') {
					this.$layer.msg('邀请码不能为空哦');
					return;
				}
				if(this.verif != this.ask_invite) {
					this.$layer.msg('邀请码错误');
					return;
				} else if(this.check == this.demo1) {
					this.$layer.msg('请同意');
					return;
				} else {
					this.$layer.msg('通过了');
					this.$router.push('/Personal');
				}
			}
		}
	}
</script>

<style scoped>
  .content{
    overflow: hidden;
    color: #666;
    width: 100vw;
    height: 100vh;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .code{
  	padding: 80px 30px;
    background: #fff;
  }
	#ask_invite {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		/*padding-left: 1.2rem;*/
		font-size: 1.5rem;
		border-bottom: 1px solid #F5F5F5;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem; 
	}

	#agree {
		margin-top: 80%;
		font-size: 1rem;
	}

	#agree_a {
		color: #09A4D7;
	}

	#finish{
		 background-color:#09A2D6;
		 color: white;
		 border-radius: 0;
		 width: 100%;
	}
	#finish:active{
		background-color: #09A2D6ss;
	}
	#finish:disabled{
		background:	#C0C0C0 ;
	}

	button#finish.weui-btn.weui-btn_primary{
		width: 100%;
	}

</style>
