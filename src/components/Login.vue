<template>

	<div id="login">
		<div id="nav">
			登 录
		</div>
		<div id="nav_login">
			<div id="nav_common" @click="sort(1)">
				<a :style="{color:color1}">普通登录</a>
			</div>

			<div id="nav_sms" @click="sort(0)">
				<a :style="{color:color2}">短信登录</a>
			</div>
		</div>

		<!--这是我要隐藏的  -->
		<div class="tow_show" v-if="isShow">
			<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<input class="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></input>
			</div>

			<div class="group_input" >
				<input id="ipwd" v-model="inppwd" :type="types" placeholder="请输入密码" :min="6" :max="6" is-type="sendcode"></input>
				<img id="group_input_img" @click="Alt" :src="imgs"  />
			</div>

			<div class="hyperlink">
				<router-link class="a_hyperlink" tag='a' :to="'/Retrieve'">找回密码</router-link> &nbsp;&nbsp;<span style="color: #8C8C8C;">|</span>&nbsp;&nbsp;
				<router-link class="a_hyperlink" tag='a' :to="'/Register'">注册账号</router-link>
			</div>

			<div style="padding:30px;">
				<x-button id="btn_login_normal" @click.native="submitData" type="primary">登 录</x-button>
			</div>

		</div>

		<!--这是我要隐藏的  -->
		<div class="tow_show" v-if="isShows">
			<div class="group_inputs" label-width="5.5em" label-margin-right="2em" label-align="left">
				<input class="phone" ref="mobile" name="mobile" v-model="mobile" placeholder="请输入手机号" :max="11" keyboard="number" is-type="china-mobile" required></input>
			</div>

			<div id="div_ipwd" >
				<input id="verifica" v-model="verif" placeholder="请输入短信验证码"/>
				<x-button id="verbtn"  slot="right" :disabled="disabled" @click.native="SMS">{{btntxt}}</x-button>

			</div>

			<div class="hyperlink">
				<router-link class="a_hyperlink" tag='a' :to="'/Retrieve'">找回密码</router-link> &nbsp;&nbsp;|&nbsp;&nbsp;
				<router-link class="a_hyperlink" tag='a' :to="'/Register'">注册账号</router-link>
			</div>

			<div style="padding:30px;">
				<x-button id="btn_login_sms" @click.native="btnveif" type="primary" >登 录</x-button>
			</div>

		</div>

	</div>

</template>

<script>
	import { XInput, Group, XButton } from 'vux'
	import eye from '@/assets/images/eye.png'
	import eyeclick from '@/assets/images/eyeclick.png'
	
//	sessionStorage.setItem("key","654321");
//	localStorage.setItem("site","js8.in");

	export default {
		name: "login",
		components: {
			XInput,
			Group,
			XButton
		},
		data() {
			return {
				mobile: '',
				pwd: '123456',
				inppwd: "",
				btntxt: "",
				verification: "654321",
				verif:"",
				short_message: '',
				isShow: true,
				isShows: false,
				types:"password",
				imgs:eye,
<<<<<<< HEAD
        disabled:false,
				color1:"#09A2D6",
				color2:"#666666",
        time:''
=======
        		disabled:true,
				color1:"#09A2D6",
				color2:"#666666",
				Stime:null,
				time:60
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
			}
		},
		mounted: function() {
		  const that = this;
			this.$nextTick(() => {

			})
<<<<<<< HEAD
			$('.weui-cells').attr('id', 'm-weui-cells');
//			$("#weui-cells").before("border-top","none");
			$('#weui-cells').css({borderTop:"none"});

      var Verificationtime = Verificationtime;
      that.time =  that.readCookie(Verificationtime);
      if (that.time != "") {
        var TimeReduction2 = setInterval(function () {
          if (that.time > 0) {
            that.writeCookie(Verificationtime, that.time);
            that.time--;
            that.btntxt = that.time + "s";
            that.disabled = true;
          } else {
            that.time = 0;
            that.btntxt = "获取验证码";
            that.disabled = false;
            that.delCookie(Verificationtime);
            clearInterval(TimeReduction2);
          }
        }, 1000)
      }else {
        that.btntxt = "获取验证码";
      }
=======
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
		}
		,
		Trim(str) {
			return str.replace(/(^\s+)|(s+$)/g, "");
		},
		created:function(){
			if(sessionStorage.index){
				this.time=sessionStorage.index;
				this.setTime();
			}
		},
		methods: {
			sort(index) {
				if (index == 1) {
					this.isShow = true;
					this.isShows = false;
					this.color1="#09A2D6";
					this.color2="#666666";
				} else if (index == 0) {
					this.isShows = true;
					this.isShow = false;
					this.color1="#666666";
					this.color2="#09A2D6";
				}
			},
			Alt(){
				if (this.types == "password") {
					this.types = "text"
					this.imgs = eyeclick
				} else {
					this.types = "password"
					this.imgs = eye
				}
			},
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s";
					sessionStorage.index=this.time;
				} else {
					this.time = 60;
					this.btntxt = "获取验证码";
					this.disabled = false;
					sessionStorage.index=0;
					clearInterval(this.Stime)
				}
			},
			setTime(){
				this.Stime=setInterval(this.timer, 1000);
			},
			submitData() {
				//去获取验证手机号

				var reg = /^1[3|4|5|7|8]\d{9}$/;
				//				alert("result:" + this.$refs.mobile.valid);
				if (reg.test(this.mobile)) {
					if (this.inppwd != this.pwd) {
<<<<<<< HEAD
            this.$layer.msg('密码错误');
						return;
					} else {
            this.$layer.msg('登录成功');
						this.$router.replace('/Home');
					}
				} else {
          this.$layer.msg('手机号码不能为空 或 输入有误哦~');
=======
            	this.$layer.msg('密码错误');
						return;
					} else {
            	this.$layer.msg('登录成功');
						this.$router.replace('/Home');
					}
				} else {
          			this.$layer.msg('手机号码不能为空 或 输入有误哦~');
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
				}
			},
			btnveif(){
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if (reg.test(this.mobile)) {
					if (this.verif == "") {
<<<<<<< HEAD
            this.$layer.msg('验证码不能为空');
						return;
					}
					if (this.verif != this.verification) {
            this.$layer.msg('验证码错误');
						return;
					} else {
            this.$layer.msg('登录成功');
						this.$router.replace('/Home');
					}
				} else {
          this.$layer.msg('手机号码不能为空 或 输入有误哦~');

=======
            			this.$layer.msg('验证码不能为空');
						return;
					}
					if (this.verif != this.verification) {
            			this.$layer.msg('验证码错误');
						return;
					} else {
            			this.$layer.msg('登录成功');
						this.$router.replace('/Home');
					}
				} else {
          			this.$layer.msg('手机号码不能为空 或 输入有误哦~');
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
				}
			},
			//短信信息
			SMS() {
<<<<<<< HEAD
			  const that = this;
				//				if(this.short_message != this.sho_mess){
				//					return;
				//				}
				var Verificationtime = Verificationtime;
        that.time =  that.readCookie(Verificationtime);
        if (that.time == "") {

          that.$layer.msg('短信已发送,本次验证码为：'+ that.verification);
          that.time = 60;

          var TimeReduction1 = setInterval(function () {
            if(that.time>0){
              that.writeCookie(Verificationtime,that.time);
              that.time--;
              that.btntxt = that.time + "s";
              that.disabled = true;
            }else{
              that.time = 0;
              that.btntxt = "获取验证码";
              that.disabled = false;
              that.delCookie(Verificationtime);
              clearInterval(TimeReduction1);
            }
          },1000)
        }
			},
      writeCookie(name, value, hours) {
        var expire = "";
        hours = hours || 100;
        if (hours != null) {
          expire = new Date((new Date()).getTime() + hours * 1000);
          expire = "; expires=" + expire.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expire;
      },
      readCookie(name) {
        var cookieValue = "";
        var search = name + "=";
        if (document.cookie.length > 0) {
          var offset = document.cookie.indexOf(search);
          if (offset != -1) {
            offset += search.length;
            var end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
          }
        }
        return cookieValue;
      },
      delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval= this.readCookie(name);
        if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
=======
       			this.$layer.msg('短信已发送,本次验证码为：'+ this.verification);
				this.disabled = true;
				this.setTime();
			}
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
		}
	}
</script>

<style scoped>



	button.weui-btn.weui-btn_primary{
		background-color:#09A2D6;
		border-radius: 0;
	}

	button.weui-btn.weui-btn_primary:active{
		background-color:#2894FF;
	}
	#login{
	  height: 100vh;
	  background: #fff;
	  overflow: hidden;
	}

	.tow_show{
		margin: 20px;
	}

	#verifica{
		padding-top: 20px;
		margin: 10px;
		width: 100%;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: 0px solid #F5F5F5;
		outline:none;
		text-indent: 4px;
		vertical-align: middle;
		line-height: 1;
		font-size: 1.3rem;
	}

	div#ipwd.vux-x-input.weui-cell{
		width: 80%;
	}


	.weui-btn::after{
		border-radius: 0;
	}
	#verbtn {
		position: absolute;
		margin-top: -45px;
		width: 90px;
		height: 40px;
		margin-left: 69%;
		background-color: #F8F8F8;
		color: #646464;
		font-size: 1.2rem;
		border-radius: 0;
	}

	.phone {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		padding-left: 1rem;
		font-size: 1.3rem;
		border-bottom: 0.01px solid #F5F5F5;
		width: 70%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}

	#ipwd {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		padding-left: 1rem;
		font-size: 1.3rem;
		border-bottom: 0.01px solid #F5F5F5;
		margin-top: 2rem;
		width: 100%;
		outline: none;
		letter-spacing: 0.05rem;
		padding-bottom: 0.5rem;
	}

	#div_ipwd{
		border-bottom: 0.1rem solid #F5F5F5;
		margin-left: -0.3rem;
	}

	.group_inputs {
		border-bottom: 1px solid #F5F5F5;
		width: 100%;
		margin-top: 15rem;
		/*border-bottom: 1px solid #F5F5F5;*/
	}
	#group_input_img{
		position: absolute;
		width: 54px;
		margin-top: -4.2rem;
		margin-left: 75%;
	}
	.group_input {
		/*margin: -40px;*/
		/*margin: 10px;*/
		border-bottom: 1px solid #F5F5F5;
		padding-top: 10px;
		width: 100%;
		/*padding: 40px;*/
		/*margin-left: -14px;*/
	}


	.weui-cells:before {
		border-top: 0px!important;
	}

	.hyperlink {
		margin-top: 10px;
		margin-left: 55%;
	}
	.a_hyperlink{
		color: #8C8C8C;
	}

	a {
		color: #353535;
	}

	a:hover{
		text-decoration: none;
	}

	#nav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		font-size: 1.8rem;
		background-color: white;
		text-align: center;
		line-height: 50px;
	}

	#nav_login {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: white;
		text-align: center;
		line-height: 50px;
		border-bottom: 1px solid #C8C8CD;
		margin-top: 50px;
	}

	#nav_common {
		position: fixed;
		width: 50%;
    background: #f5f5f5;
    box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
	}


	#nav_common a{
		color:#09A2D6 ;
	}



	/*a:hover{
		color: #09A2D6;
	}

	a:active{
		color: #000000;
	}*/

	#nav_sms {
		position: fixed;
		width: 50%;
		margin-left: 50%;
    	background: #f5f5f5;
    	border-left: none;

    box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
	}


	.weui-btn:after, #btn_login_normal:after, #btn_login_sms:after, #verbtn:after {
		border: none;
	}
<<<<<<< HEAD

=======
	
	button#btn_login_normal.weui-btn.weui-btn_primary{
		width: 120%;
		margin-left: -2.5rem;
	}
	
	button#btn_login_sms.weui-btn.weui-btn_primary{
		width: 120%;
		margin-left: -2.5rem;
	}
	
>>>>>>> b40cd0e88a5f2792499c01a156818946512f0036
</style>
