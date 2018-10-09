<template>
	<div class="content">
		<div class="test">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="back">
				<img :src="masrc" />
			</mu-button>
		</div>

		<mu-carousel transition="fade" class="picContainer" interval="5000" :cycle="false" hide-controls hide-indicators :active="active">
			<mu-carousel-item v-for="(p,index) in pic" :key="index">
				<img :src="p.src"  />
			</mu-carousel-item>
			<template slot="indicator" slot-scope="{ index, active }">
				<mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
					<span class="rect-indicator"></span>
				</mu-button>
			</template>
		</mu-carousel>
		<div class="text-center">
			<img :src="avatar" style="width: 8rem;border-radius: 50%;border: 0.5rem solid #fff;position: relative;margin-top: -4rem" />
		</div>
		<div class="dataContainer text-center">
			<div class="title">{{nickname}} <span class="sex" v-bind:style="bcColor">{{gender}}</span></div>
			<div>
				<span class="level">Lv.{{level}}</span><span class="friendId">ID:{{friend_uid}}</span>
			</div>
			<div class="autograph">{{resume}}</div>

		</div>
    <div v-if="hasPic">
      <div class="title" style="padding: 1rem 1.5rem 0">相册</div>
      <div class="controlContainer">
        <div class="controlScroll">
          <div class="controlContent" v-for="(p,index) in pic">
            <img :src="p.src" @click="changeActive(index)" />
          </div>
        </div>
      </div>
      <div class="more"><span @click="photowall">查看更多图片<img src="../../assets/images/more.png"/></span></div>
    </div>
    <div v-else class="more" style="margin-top: 1rem">
      暂无相册
    </div>
    <div class="buttonContainer">
      <mu-button @click="goFriendFarm" flat large class="publicButton">进入好友养殖场</mu-button>
    </div>
	</div>
</template>

<script>
	import pic1 from "@/assets/images/chushi.png"
	import back from '@/assets/images/return.png'
	import backs from '@/assets/images/backs.png'
  import tupian from '@/assets/images/tupian.png'
	export default {
		name: "FriendData",
		data() {
			return {
				masrc: back,
				avatar: pic1,
				pic:[],
				active: 0,
				gender: '♀',
				bcColor: 'background:#5CB3FC',
				level: 0,
				nickname: '好友昵称',
				friend_uid: "",
				resume: '这个人很懒，还没有签名。',
        hasPic:false
			}
		},
		mounted() {
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
			this.$nextTick(function() {
				this.FriendData();
			})
		},
		methods: {
			FriendData() {
				this.$http({
						method: "post",
						url: "/users/profile",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							friend_uid: localStorage.getItem("friend_uid")
						}
					}).then(function(res) {

						if(res.data.code === 0) {
              this.level = res.data.data.level;
              this.friend_uid = res.data.data.uid;
              if(res.data.data.avatar===""){
                this.avatar = pic1
              }else {
                this.avatar = res.data.data.avatar;
						  }
						  if(res.data.data.nickname===""){
						    this.nickname=res.data.data.uid;
              }else {
                this.nickname = res.data.data.nickname;
              }
              if(res.data.data.resume===""){
                this.resume="这个人很懒，还没有签名。"
              }else {

                this.resume = res.data.data.resume;
              }
              if(res.data.data.gender === "MALE") {
                this.gender = '♂'
                this.bcColor='background: #5CB3FC;';
              } else if(res.data.data.gender==="UNKNOWN"){
                this.gender = '?'
                this.bcColor='background: #ddd;';
              }else{
                this.gender = '♀'
                this.bcColor='background: #FC8484;';
              }
              if(res.data.data.picture.length > 0) {
                this.hasPic = true;
                for(let i = 0; i < res.data.data.picture.length; i++) {
                  this.pic.push({"src":res.data.data.picture[i]})
                }
              }else {
                this.pic.push({"src":tupian})
                this.hasPic=false;
              }

            } else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
			changeActive(index) {
				this.active = index;
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			},
			goBack() {
				this.$router.go(-1);
			},
			photowall() {
				console.log(this.pic)
				this.$router.push({
					path: '/photowall',
					name: 'photowall',
					params: {
						name: 'name',
						dataObj: this.pic
					}
				})
			},
      goFriendFarm(){
        this.$http({
          method: "post",
          url: "/users/plant",
          headers: {
            "device": "android",
            "uid": localStorage.getItem("uid"),
            "Access-Control-Allow-Origin": "*"
          },
          data: {
            friend_uid:this.friend_uid,
            nickname:this.nickname
          }
        }).then(function(res) {

          if(res.data.code === 0) {
            this.$router.push({
              path:'/friendfarm',
              name:'friendfarm',
              params: {
                name: 'name',
                dataObj: this.friend_uid
              }
            })
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
</script>

<style scoped>
	.content {
		width: 100vw;
		position: fixed;
		top: 0;
		overflow: hidden;
		background: #fff;
		height: 100%;
		overflow-y: scroll;
		padding-bottom: 5rem;
	}

	.content::-webkit-scrollbar {
		display: none
	}

	.back {
		position: absolute;
		left: 0.5rem;
		z-index: 9999;
	}

	.test {
		background: linear-gradient(rgba(66, 66, 66, 0.2), rgba(97, 97, 97, 0.2), rgba(158, 158, 158, 0.1), transparent);
		border-radius: 0;
		width: 100%;
		height: 80px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9999;
	}

	.back img {
		height: 2.5rem;
	}

	.picContainer {
		width: 100.5vw;
		max-height: 100vw;
		overflow: hidden;
		margin-top: -3px;
		margin-left: -2px;
	}

	.picContainer img {
		width: 100vw;
		height: 100vw;
	}

	.controlContainer {
		overflow-x: scroll;
		padding: 1rem 1rem;
	}

	.controlContainer::-webkit-scrollbar {
		display: none
	}

	.controlScroll {
		width: 135vw;
	}

	.controlContent {
		display: inline-block;
		white-space: nowrap;
	}

	.controlContent img {
		width: 20vw;
		height: 20vw;
		margin: 1vw;
	}

	.mu-carousel-indicator-button {
		width: 0.6rem;
		height: 0.6rem;
	}

	.mu-carousel-indicator-button .rect-indicator {
		background: #BEBEBE;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
	}

	.mu-carousel-indicator-button__active .rect-indicator {
		background: rgba(255, 255, 255, 1);
	}

	.dataContainer {
		padding: 1rem auto;
		border-bottom: 0.6rem solid #f5f5f5;
		display: flex;
		flex-direction: column;
	}

	.title {
		margin-bottom: 0.3rem;
		font-size: 16px;
		color: #444;
	}

	.sex {
		background: #FC7D7D;
		color: #fff;
		font-size: smaller;
		display: inline-block;
		width: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		border-radius: 50%;
	}

	.level {
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
		color: #fff;
		font-size: 1rem;
		border-radius: 0.8rem;
		padding: 0 0.5rem;
		margin-right: 1rem;
		margin-bottom: 0.5rem;
	}

	.friendId {
		font-size: small;
		color: #666;
	}

	.msg {
		margin-bottom: 0.3rem;
	}

	.autograph {
		font-size: 1.3rem;
		color: #555;
		padding-bottom: 1rem;
	}

	.more {
		text-align: center;
		font-size: 1.5rem;
		color: #646464;
    margin-bottom: 1rem;
	}

	.more img {
		width: 2.5rem;
	}
  .buttonContainer{
    position: fixed;bottom: 0;
    background: #f5f5f5;
    width: 100%;
  }
  .publicButton{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    color: #fff;
    width: 100%;
    border-radius: 0;
  }
</style>
