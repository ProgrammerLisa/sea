<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">新建地址</span>
    </mu-appbar>
    <mu-container style="background: #fff;border-top: 0.6rem solid #f5f5f5">
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username" placeholder="请填写收货人姓名"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="phone" :rules="passwordRules">
          <mu-text-field type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" v-model="validateForm.phone" prop="phone" placeholder="请填写收货手机号码"></mu-text-field>
        </mu-form-item>
          <mu-form-item prop="address" :rules="addressRules" data-toggle="modal" data-target="#addressModal">
            <mu-text-field disabled="disabled" type="text" v-model="validateForm.address"  prop="address" placeholder="请选择地区"></mu-text-field>
          </mu-form-item>
        <mu-form-item prop="addressNumber" :rules="addressNumberRules">
          <mu-text-field type="text" v-model="validateForm.addressNumber" prop="addressNumber" placeholder="详细地址(如门牌号等)"></mu-text-field>
        </mu-form-item>

      </mu-form>

    </mu-container>
    <mu-button color="#09a2d6" @click="submit" class="submitBtn">提交</mu-button>
		<div class="modal fade" style="z-index: 999" id="addressModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">所在地区</h4>
					</div>
					<div class="modal-body addressTitleContainer">
							<div class="addressTitle text-center" id="provinceName">请选择</div>
							<div class="addressTitle text-center" id="cityName">请选择</div>
							<div class="addressTitle text-center" id="districtsName">请选择</div>
					</div>
					<div class="modal-footer addressTitleContainer">
							<div class="text-center auto">
								<ul>
									<li v-for="(p,index) in provinceName" :value="p.code" @click="provinceChoose(index)" class="provinceName">{{p.name}}</li>
								</ul>
							</div>
							<div class="text-center auto">
								<ul>
									<li v-for="(p,index) in cityName" :value="p.code" @click="cityChoose(index)" class="cityName">{{p.name}}</li>
								</ul>
							</div>
							<div class="text-center auto">
								<ul>
									<li v-for="(p,index) in districtsName" :value="p.code" @click="districtsChoose(index)" class="districtsName" data-dismiss="modal">{{p.name}}</li>
								</ul>
							</div>

					</div>
				</div>
				<!-- /.modal-content -->
			</div>
		</div>

	</div>

</template>

<script>
	import code from "@/assets/json/districts.json"
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "modificationaddress",
		data() {
			return {
				masrc: back,
        usernameRules: [
          { validate: (val) => !!val, message: '必须填写用户名'},
          { validate: (val) => new RegExp("^[ ]+$").test(val)===false , message: '用户名不能为空'}
        ],
        passwordRules: [
          { validate: (val) => !!val, message: '必须填写手机号码'},
          { validate: (val) => /^1[3|4|5|7|8]\d{9}$/.test(val) , message: '手机号码不正确'}
        ],
        addressRules:[
          { validate: (val) => !!val, message: '地址不能为空'}
        ],
        addressNumberRules:[
          { validate: (val) => !!val, message: '必须填写详细地址'}
        ],

        validateForm: {
          username: '',
          phone: '',
          address:'',
          addressNumber:''
        },

				code: code,
				codeArr: [],
				province: '',
				provinceName: [],
				city: '',
				cityName: [],
				districts: '',
				districtsName: [],
				address: ''
			}
		},

		mounted() {
			for(var item in this.code) {
				this.codeArr.push(this.code[item]);
			}
			this.province = this.codeArr[0];
			for(var p in this.province) {
				this.provinceName.push({
					name: this.province[p],
					code: p
				});
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
			provinceChoose(index) {
				this.cityName = [];
				let city = this.code[$(".provinceName").eq(index).val()];
				for(var c in city) {
					this.cityName.push({
						name: city[c],
						code: c
					});
				}
				$("#provinceName").text($(".provinceName").eq(index).text()).css({
					color: "#09a2d6"
				});
				$(".provinceName").css({
					color: "#666"
				});
				$(".provinceName").eq(index).css({
					color: "#09a2d6"
				});

				$("#cityName").css({
					color: "#666"
				}).text("请选择");
				$("#districtsName").css({
					color: "#666"
				}).text("请选择");

				$(".cityName").css({
					color: "#666"
				});
				$(".districtsName").css({
					color: "#666"
				});
			},
			cityChoose(index) {
				this.districtsName = [];
				let districts = this.code[$(".cityName").eq(index).val()];
				for(var d in districts) {
					this.districtsName.push({
						name: districts[d],
						code: d
					});
				}
				$("#cityName").text($(".cityName").eq(index).text()).css({
					color: "#09a2d6"
				});
				$(".cityName").css({
					color: "#666"
				});
				$(".cityName").eq(index).css({
					color: "#09a2d6"
				});
			},
			districtsChoose(index) {
				$("#districtsName").text($(".districtsName").eq(index).text()).css({
					color: "#09a2d6"
				});
				$(".districtsName").css({
					color: "#666"
				});
				$(".districtsName").eq(index).css({
					color: "#09a2d6"
				});

				this.validateForm.address = $("#provinceName").text() + " " + $("#cityName").text() + " " + $("#districtsName").text()
			},
			submit() {
        this.$refs.form.validate().then((result) => {
          if(result){
            this.$http({
              method: "post",
              url: "/users/delivery_address/add",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                consignee: this.validateForm.username,
                phone: this.validateForm.phone,
                address: this.validateForm.address + this.validateForm.addressNumber
              }
            }).then(function(res) {
              if(res.data.code == 0) {
                this.$layer.msg(res.data.msg);
                this.$router.go(-1);
              } else {
                this.$layer.msg(res.data.msg);
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          }
        });

			}

		}
	}
</script>

<style scoped>
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	}
	/*焦点时也加上，不加会出现黄色背景闪动一下*/

	input[type=text]:focus,
	input[type=password]:focus,
	textarea:focus {
		-webkit-box-shadow: 0 0 0 1000px white inset;
	}

	.content {
		overflow-x: hidden;
		color: #666;
    width: 100vw;
    background: #fff;
	}

	.mu-form-item{
    margin-bottom: 0;
  }


	.modal-dialog {
		margin: 0;
	}

	.modal-content {
		height: 70vh;
		margin-top: 30vh;
		border: none;
		border-radius: 0;
		overflow: hidden;
	}

	#myModalLabel {
		text-align: center;
	}
  .addressTitleContainer{
    display: flex;
    font-size: 1.6rem;
  }
  .addressTitle,.auto{
    width: 33.3%;
  }
	.auto {
		height: 50vh;
		overflow: auto;

	}

	.auto::-webkit-scrollbar {
		display: none;
	}

	li {
		list-style: none;
		margin-bottom: 1rem;
	}
  .submitBtn{
    width: 90%;
    margin: 2rem 5%;
  }

</style>
