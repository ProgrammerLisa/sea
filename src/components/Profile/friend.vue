<template>
	<div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的好友</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <div v-if="!noFriend" class="addressNone">
        <img :src="noFriendImg" />
        <p>您还没有好友，去邀请好友吧</p>
        <mu-button color="#09a2d6" @click="goAsk">去邀请</mu-button>
      </div>
      <div class="media friends" v-for="f in friends" v-else @click="friendData">
        <div class="media-left">
          <img class="media-object" :src="f.headPortrait" alt="...">
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            {{f.friendName}}

            <span class="sex" v-bind:style="f.bcColor">{{f.sex}}</span>
          </h4>
          ID：{{f.friendId}}
        </div>
      </div>
    </div>

	</div>
</template>

<script>
	import headImg from '@/assets/images/friend.png'
	import noFriendImg from '@/assets/images/myfriend.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "friend",
		data() {
			return {
				masrc: back,
				noFriend: true,
				noFriendImg: noFriendImg,
				friends: [{
						headPortrait: headImg,
						friendName: '小红花',
						friendId: '123456789',
						sex: '♀',
            color:'#FC8484',
						bcColor: 'background: #FC8484;'
					},
					{
						headPortrait: headImg,
						friendName: '小红花',
						friendId: '123456789',
						sex: '♂',
            color:'#5CB3FC',
						bcColor: 'background: #5CB3FC;'
					}
				]
			}
		},
		mounted() {
			this.$http({
					method: "post",
					url: "/users/followers",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					}
				}).then(function(res) {
					if(res.data.code != 0) {
						this.$layer.msg(res.data.msg);
					}else {
					  if(res.data.data.length==0){
					    this.noFriend=true;
            }else {
					    //拥有好友时
              this.noFriend=false;
            }
          }
				}.bind(this))
				.catch(function(err) {
          this.$layer.msg("系统异常，请稍后再试");
				}.bind(this))
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
      friendData(){
        this.$router.push({
          path: '/frienddata',
          name: 'FriendData',
          params: {
            name: 'name'
          }
        })
      },
      goAsk() {
        this.$router.push({
          path: '/ask'
        })
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

  .panel {
    border: none;
    border-radius: 0;
  }

  .panel-body {
    padding: 0 1rem;
  }

  .BlackTitle {
    text-align: center;
    letter-spacing: 0.05rem;
    background: #09a2d6;
    color: #fff;
    font-size: 1.5rem;
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


	.addTo {
		float: right;
	}

	.addTo img {
		height: 2.5rem;
	}

	.friends {
		background: #fff;
		margin-top: 0;
		border-bottom: 0.1rem solid #f5f5f5;
		padding: 1rem;
	}
  .friends:active{
    background: #f5f5f5;
  }

	.media-heading {
		margin-top: 0.3rem;
		margin-bottom: 5px;
		font-size: 1.5rem;
	}

	.media-left img {
		border: 0.1rem solid #09a2d6;
		border-radius: 50%;
		width: 4rem;
		margin-right: 0.5rem;
	}

	.sex {
		color: #fff;
		border-radius: 50%;
		display: inline-block;
		width: 1.3rem;
		height: 1.3rem;
    line-height: 1.3rem;
		font-size: xx-small;
		text-align: center;
		margin: 0 1rem;
		vertical-align: top;
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
  .goInvite {
    text-align: center;
    background: #09a2d6;
    color: #fff;
    padding: 0.5rem 3rem;
    display: inline-block;
    margin-top: 1.5rem;
  }

  .goInvite:active {
    background: #009ACD;
  }
</style>
