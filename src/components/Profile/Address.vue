<template>
	<div class="content">
		<div class="myAddress">
			<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
				<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
					<img :src="masrc" />
				</mu-button>
				<span class="navTitleText">收货地址</span>
			</mu-appbar>
			<div class="contentMarginTop">
				<div v-if="noAddress" class="addressNone">
					<img :src="addressNone" />
					<p>一个地址都没有哦</p>
				</div>
        <div style="margin-bottom: 6rem" v-else >
          <table class="table address" v-for="(a,index) in myAddress">
            <tr>
              <td class="text-left">收货人</td>
              <td class="text-right">{{a.msg.consignee}}</td>
            </tr>
            <tr>
              <td class="text-left">联系电话</td>
              <td class="text-right">{{a.msg.phone}}</td>
            </tr>
            <tr>
              <td class="text-left">收货地址</td>
              <td class="text-right">{{a.msg.address}}</td>
            </tr>
            <tr>

              <td class="col-xs-5" style="padding-right: 0;padding-top: 1rem">
                <mu-radio @click="choose(index)" v-model="form.radio" textColor="#555" :value="a.id" :label="a.label"></mu-radio>
              </td>
              <td class="col-xs-7 text-right">
                <div class="del" @click="editor(index)">
                  <img src="../../assets/images/editor.png" /> 编辑
                </div>
                <div class="del" @click="openAlertDialog(index)">
                  <img src="../../assets/images/del.png" /> 删除
                </div>

              </td>
            </tr>
          </table>
          <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert" style="text-align: center">
            <div class="publicDialogTitle">确认要删除吗，删除后不能恢复</div>
            <mu-button slot="actions" flat color="primary" @click="del" class="loginOutBtn">确定</mu-button>
            <mu-button slot="actions" flat color="primary" @click="closeAlertDialog" class="loginOutBtn">取消</mu-button>
          </mu-dialog>
        </div>


			</div>
		</div>

		<div class="newAddress">
			<router-link to="/newaddress" tag="div">
				<mu-flex justify-content="center" align-items="center">
					<mu-button flat class="publicButton">
						<mu-icon value="add"></mu-icon>新建地址</mu-button>
				</mu-flex>
			</router-link>
		</div>
	</div>
</template>

<script>
	import addressNone from '@/assets/images/addressNone.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "address",
		inject: ['reload'],
		data() {
			return {
				masrc: back,
				noAddress: '',
				addressNone: addressNone,
				myAddress: [],
				openAlert: false,
				item: '',
				form: {
					radio: ''
				},
				mobile: {
					id: '',
					msg: '',
					label: ''
				}
			}
		},

		mounted() {
			this.$nextTick(function() {
				this.getList();
			})
		},
		methods: {
			getList() {
				this.$http({
						method: "get",
						url: "/users/delivery_address",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {}
					}).then(function(res) {
						if(res.data.code == 0) {
							if(JSON.stringify(res.data.data) == "{}") {
								this.noAddress = true
							} else {
								this.noAddress = false;

								let myJson = res.data.data;
								for(let p in myJson) { //遍历json对象的每个key/value对,p为key

									this.mobile.id = p;
									this.mobile.msg = myJson[p];
									if(myJson[p].is_default) {
										this.form.radio = p;
										this.mobile.label = '已设为默认地址';
									} else {
										this.mobile.label = '默认地址';
									}
									this.myAddress.push(this.mobile);
									this.mobile = {
										id: '',
										msg: {
											name: '',
											phoneNumber: '',
											address: '',
											is_default: ''
										},
										label: ''
									};
								}
							}
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			openAlertDialog(index) {
				this.openAlert = true;
				this.item = index;
				$(".mu-flat-button").css({
					height: "48px"
				})
			},
			closeAlertDialog() {
				this.openAlert = false;
			},
			choose(index) {
				this.$http({
						method: "post",
						url: "/users/delivery_address/set-default",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							id: this.myAddress[index].id
						}
					}).then(function(res) {

						if(res.data.code === 0) {
							for(let i in this.myAddress) {
								this.myAddress[i].label = '默认地址'
							}
							this.myAddress[index].label = '已设为默认地址';
							this.$layer.msg(res.data.msg);
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))

			},
			editor(index) {
				let addressId = this.myAddress[index].id;
				this.$router.push({
					path: '/modificationaddress',
					name: 'modificationaddress',
					params: {
						name: 'name',
						dataObj: {
							id: addressId,
							username: this.myAddress[index].msg.consignee,
							phone: this.myAddress[index].msg.phone,
							address: this.myAddress[index].msg.address
						}

					}

				})
			},
			del() {
				let that = this;

				that.$http({
						method: "post",
						url: "/users/delivery_address/delete",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							id: that.myAddress[that.item].id
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							that.$layer.msg(res.data.msg);
							that.closeAlertDialog();
							that.reload();
						} else {
							that.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))

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

		font-size: 1.6rem;
	}

	.myAddress {
		height: 100vh;
		overflow-y: scroll;
	}

	.myAddress::-webkit-scrollbar {
		display: none
	}

	.table {
		margin-bottom: 0.6rem;
	}

	.copyreader {
		float: right;
	}

	.copyreader img {
		height: 2.5rem;
	}

	.address {
		background: #fff;
	}

	.address tr {
		line-height: 40px;
		border-bottom: 1px solid #f5f5f5;
	}

	.address td {
		padding: 0 16px;
	}

	.text-left {
		color: #555;
		font-size: 1.6rem;
	}

	.del {
		display: inline-block;
	}

	.del:last-child {
		margin-left: 1rem;
	}

	.del img {
		width: 2rem;
	}

	.addressNone {
		text-align: center;
		padding-top: 18vh;
		color: #999;
	}

	.addressNone img {
		width: 40%;
		margin-bottom: 1rem;
	}

	.newAddress {
		position: fixed;
		bottom: 0;
		background: #f5f5f5;
		width: 100%;
		padding: 0.8rem 0;
		text-align: center;
	}

	.large {
		font-size: larger;
	}

	.loginOutBtn {
		border-top: 1px solid #ddd;
		width: 50%;
	}

	.loginOutBtn:first-child {
		border-right: 1px solid #ddd;
	}

	.loginOutBtn:last-child {
		color: #555;
	}
  .publicButton{
    width: 90%;
    height: 3.5rem;
  }
</style>
