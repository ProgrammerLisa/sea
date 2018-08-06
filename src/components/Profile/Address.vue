<template>
	<div class="content">

    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">收货地址</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <div v-if="noAddress" class="addressNone">
        <img :src="addressNone" />
        <p>一个地址都没有哦</p>
      </div>
      <table v-else class="table address" v-for="(a,index) in myAddress">
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

          <td class="col-xs-5">
            <div v-if="a.msg.is_default">
              <div class="round">
                <span class="defaultRound" ></span>
              </div>
              <span class="defaultChoose">已设为默认地址</span>
            </div>

            <div @click="choose(index)"  v-else>
              <div class="round"></div>
              <span class="default" v-if="">默认地址</span>
            </div>

          </td>
          <td class="col-xs-7 text-right">
          <span class="del" @click="editor(index)" >
            <img src="../../assets/images/editor.png"/> 编辑
          </span>
            <span class="del" @click="openAlertDialog">
            <img src="../../assets/images/del.png"/> 删除
          </span>
            <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert" style="text-align: center">
              确认要退出登录吗
              <mu-button slot="actions" flat color="primary" @click="del(index)" class="loginOutBtn">确定</mu-button>
              <mu-button slot="actions" flat color="primary" @click="closeAlertDialog" class="loginOutBtn">取消</mu-button>
            </mu-dialog>
          </td>
        </tr>
      </table>
      <div class="newAddress">
        <router-link to="/newaddress" tag="div">
          <mu-flex justify-content="center" align-items="center">
            <mu-button full-width color="#09a2d6"> <mu-icon value="add"></mu-icon>新建地址</mu-button>
          </mu-flex>
        </router-link>
      </div>

    </div>

	</div>
</template>

<script>
	import addressNone from '@/assets/images/addressNone.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "Address",
		inject: ['reload'],
		data() {
			return {
				masrc: back,
        openAlert: false,
				noAddress: '',
				addressNone: addressNone,
				myAddress: [],
				mobile: {
					id: '',
					msg: {
						name: '',
						phoneNumber: '',
						address: '',
						is_default: ''
					}

          }
        }
      },

      mounted(){
        this.$http({
          method: "get",
          url: "/users/delivery_address",
          headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0){

            if(JSON.stringify(res.data.data) == "{}"){
              this.noAddress = true
            }else {
              this.noAddress =  false;

							let myJson = res.data.data;
							for(let p in myJson) { //遍历json对象的每个key/value对,p为key

								this.mobile.id = p;
								this.mobile.msg = myJson[p];
								this.myAddress.push(this.mobile);
								this.mobile = {
									id: '',
									msg: {
										name: '',
										phoneNumber: '',
										address: '',
										is_default: ''
									}

								};
              }
            }
          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            this.$layer.msg("系统异常，请稍后再试");
          }.bind(this))
      },
      methods:{
        openAlertDialog () {
          this.openAlert = true;
          $(".mu-flat-button").css({height:"48px"})
        },
        closeAlertDialog () {
          this.openAlert = false;
        },
        choose(index){
          this.$http({
            method: "post",
            url: "/users/delivery_address/set-default",
            headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            data: {
              id:this.myAddress[index].id
            }
          }).then(function(res){
            if(res.data.code==0){
              this.$layer.msg(res.data.msg);
              this.reload();
            }else {
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this))

        },
        editor(index){
          let addressId = this.myAddress[index].id;
          this.$router.push({
            path: '/modificationaddress',
            name: 'ModificationAddress',
            params: {
              name:'name',
              dataObj:addressId

					}

				})
			},
			del(index) {
				let that = this;
				this.$layer.confirm("确认要删除吗，删除后不能恢复", {
					title: "删除确认"
				}, function(c) {
					$(".vl-notify").remove();
					that.$http({
							method: "post",
							url: "/users/delivery_address/delete",
							headers: {
								"device": "android",
								"uid": localStorage.getItem("uid"),
								"Access-Control-Allow-Origin": "*"
							},
							data: {
								id: that.myAddress[index].id
							}
						}).then(function(res) {
							if(res.data.code == 0) {
								that.$layer.msg(res.data.msg);
								that.reload();
							} else {
								that.$layer.msg(res.data.msg);
							}
						}.bind(this))
						.catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
						}.bind(this))

				});

			},
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
		background-color: #f5f5f5;
		width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
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
		padding: 0 1.5rem;
	}

	.text-left {
		color: #555;
    font-size: 1.5rem;
	}

	.round {
		display: inline-block;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		border: 0.1rem solid #aaa;
		margin-right: 0.5rem;
		vertical-align: middle;
		text-align: center;
		line-height: 0.8rem;
	}

	.defaultRound {
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: #09A2D6;
	}

	.del:first-child {
		margin-right: 1rem;
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
		padding: 1rem;
		text-align: center;
	}

	.large {
		font-size: larger;
	}

</style>

