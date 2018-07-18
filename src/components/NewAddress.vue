<template>
	<div class="content">
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/> </span> 新建地址

			</div>
		</div>
		<form class="form-horizontal">
			<div class="form-group">
				<input type="text" class="form-control" id="name" placeholder="请填写收货人姓名">
			</div>
			<div class="form-group">
				<input type="number" class="form-control" id="phone" placeholder="请填写收货手机号码">
			</div>
			<div class="form-group" data-toggle="modal" data-target="#myModal">
				<input type="text" class="form-control" id="address" :value="address" placeholder="请选择地区">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" id="home" placeholder="详细地址(如门牌号等)">
			</div>
			<div class="keep">
				<div class="keepSubmit" @click="submit">保 存</div>
			</div>
		</form>

		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">所在地区</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-4 text-center" id="provinceName">请选择</div>
							<div class="col-xs-4 text-center" id="cityName">请选择</div>
							<div class="col-xs-4 text-center" id="districtsName">请选择</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="row">
							<div class="col-xs-4 text-center auto">
								<ul>
									<li v-for="(p,index) in provinceName" :value="p.code" @click="provinceChoose(index)" class="provinceName">{{p.name}}</li>
								</ul>
							</div>
							<div class="col-xs-4 text-center auto">
								<ul>
									<li v-for="(p,index) in cityName" :value="p.code" @click="cityChoose(index)" class="cityName">{{p.name}}</li>
								</ul>
							</div>
							<div class="col-xs-4 text-center auto">
								<ul>
									<li v-for="(p,index) in districtsName" :value="p.code" @click="districtsChoose(index)" class="districtsName" data-dismiss="modal">{{p.name}}</li>
								</ul>
							</div>
						</div>

					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
	</div>

</template>

<script>
	import code from "@/assets/json/districts.json"
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	export default {
		name: "ModificationAddress",
		data() {
			return {
				masrc: back,
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

				this.address = $("#provinceName").text() + " " + $("#cityName").text() + " " + $("#districtsName").text()
			},
			submit() {
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if($("#name").val() == '' || $("#name").val() == null || $("#name").val() == undefined) {
					this.$layer.msg('请填写收货人');
				} else if($("#phone").val() == '' || $("#phone").val() == null || $("#phone").val() == undefined) {
					this.$layer.msg('请填写手机号码');
				} else if(!reg.test($("#phone").val())) {
					this.$layer.msg('请填写正确的手机号码');
				} else if($("#address").val() == '' || $("#address").val() == null || $("#address").val() == undefined) {
					this.$layer.msg('请填写收货地址');
				} else if($("#home").val() == '' || $("#home").val() == null || $("#home").val() == undefined) {
					this.$layer.msg('请填写具体地址');
				} else {
					this.$http({
							method: "post",
							url: "/users/delivery_address/add",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								consignee: $("#name").val(),
								phone: $("#phone").val(),
								address: $("#address").val() + $("#home").val()
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
		background-color: #fff;
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
		margin-bottom: 0;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		position: absolute;
		left: 1rem;
	}

	.back img {
		height: 2.5rem;
	}

	.form-horizontal {
		border-top: 0.5rem solid #f5f5f5;
	}

	.form-group {
		padding: 1rem 3rem;
		border-bottom: 0.1rem solid #eee;
		margin-bottom: 0;
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-control {
		outline: none;
		border: none;
		box-shadow: none;
	}

	.control-label {
		font-size: 1.6rem;
		color: #555;
		margin-bottom: 0;
		padding: 0.4rem 0;
		font-weight: normal;
	}

	.keep {
		background: #f5f5f5;
		padding: 2rem 0;
	}

	.keepSubmit {
		width: 90%;
		margin: auto;
		background: #09a2d6;
		color: #fff;
		text-align: center;
		font-size: larger;
		padding: 0.5rem;
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
</style>
