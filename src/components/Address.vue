<template>
	<div class="content">
    <div id="navTopMargin"></div>
		<div class="panel panel-default BlackTitle">
			<div class="panel-body">
				<span @click="goBack" @touchstart="evers"  @touchend="lat"  class="back"><img :src="masrc"/></span>
				收货地址
			</div>
		</div>
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

        <td class="col-xs-6">
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
        <td class="col-xs-6 text-right">
          <span class="del" @click="editor(index)" >
            <img src="../assets/images/editor.png"/> 编辑
          </span>
					<span class="del" @click="del(index)">
            <img src="../assets/images/del.png"/> 删除
          </span>
				</td>
			</tr>
		</table>
		<div class="newAddress">
			<router-link to="/newaddress" tag="div" class="newAddressBtn"><span class="glyphicon glyphicon-plus"></span> <span class="large">新建地址</span></router-link>
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
    background: #09a2d6;
    color: #fff;
		font-size: 1.6rem;
		margin-bottom: 0;
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


	.table {
		margin-bottom: 1rem;
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
		font-size: 1.6rem;
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

	.newAddressBtn {
		width: 90%;
		background: #09a2d6;
		color: #f5f5f5;
		padding: 0.5rem;
		border: none;
		margin: auto;
		margin-bottom: 5%;
	}

	.large {
		font-size: larger;
	}

	.newAddressBtn:active {
		background: #009ACD;
	}
</style>

