<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">重置密码</span>
    </mu-appbar>

    <mu-container class="contentMarginTop" style="background: #fff">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form" >
        <mu-form-item prop="phone" :rules="phoneRules">
          <mu-text-field type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" v-model="validateForm.phone" prop="phone" placeholder="请输入手机号"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="oldPassword" :rules="oldPasswordRules">
          <mu-text-field type="password" v-model="validateForm.oldPassword" prop="oldPassword" placeholder="请填写原密码"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="newPassword" :rules="newPasswordRules">
          <mu-text-field type="password" v-model="validateForm.newPassword" prop="newPassword" placeholder="请填写新密码"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password" placeholder="请再次填写确认密码"></mu-text-field>
        </mu-form-item>
        <div class="prompt">
          <span>密码必须是6-16位的数字、字母或下划线_组成</span>
        </div>
      </mu-form>

    </mu-container>
    <mu-button flat @click="changePsw" class="changePsw publicButton">提交</mu-button>
	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "ChangePassword",
		data(){
			return {
				masrc: back,
        phoneRules: [
          { validate: (val) => !!val, message: '必须填写手机号码'},
          { validate: (val) => /^1[3|4|5|7|8]\d{9}$/.test(val) , message: '手机号码不正确'}
        ],
        oldPasswordRules:[
          { validate: (val) => !!val, message: '原密码不能为空'}
        ],
        newPasswordRules:[
          { validate: (val) => !!val, message: '密码不能为空'},
          { validate: (val) => /^[0-9a-zA-Z_]\d{5,16}$/.test(val), message: '密码格式不正确'},
          { validate: (val) => val!=this.validateForm.oldPassword, message: '密码不能重复'}
        ],
        passwordRules:[
          { validate: (val) => !!val, message: '确认密码不能为空'},
          { validate: (val) => val===this.validateForm.newPassword, message: '两次密码输入不一致'}
        ],

        validateForm: {
          phone: '',
          oldPassword:'',
          newPassword:'',
          password:''
        }
			}
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
			changePsw() {
        this.$refs.form.validate().then((result) => {
          if (result) {
            this.$http({
              method: 'post',
              url: '/users/reset-password',
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid")
              },
              data: {
                phone: this.validateForm.phone,
                old_password: this.validateForm.oldPassword,
                new_password: this.validateForm.password
              }
            }).then(function (res) {
              if (res.data.code == 0) {
                this.$layer.msg(res.data.msg);
                this.$router.go(-1);
              } else {
                this.$layer.msg(res.data.msg);
              }

            }.bind(this))
              .catch(function (err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          } else {

          }
        })
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
	}


	.prompt {
		font-size: smaller;
		color: #09a2d6;
		padding: 1rem;
		background: #fff;
	}
  .prompt span{
    background: linear-gradient(to right,#0BA5D7, #38E7F8 , #0BA5D7);
    -webkit-background-clip: text;
    color: transparent;
  }
  .changePsw{
    width: 90%;
    margin: 2rem 5%;
    text-align: center;
    height: 3.5rem;
  }
  .mu-form-item{
    margin-bottom: 0;
  }
</style>
