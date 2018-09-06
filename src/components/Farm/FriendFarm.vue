<template>
	<div class="content">
    <audio style="display: none;" id="pearlAudio" src="../../assets/audio/zhenzhu.mp3"></audio>
		<mu-appbar class="myNavTitle" textColor="#fff" z-depth="0" id="farmNav">
			<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
				<img :src="masrc" />
			</mu-button>
			<span class="navTitleText">
          好友养殖场
        </span>
		</mu-appbar>
		<div class="icon"><img :src="friend_avatar" /> <span style="vertical-align: middle">珍珠 {{friend_pearl}}</span></div>
		<div class="options" @click="LeavingMessage">
			<img src="../../assets/images/liuyanban.png" class="invitation-friends" />
			<p>留言板</p>
		</div>

		<div class="farmBack">
      <div id="pearlContainer" v-if="hasPearl">
      <button :class="t.divClass" v-for="(t,index) in imgDiv" @click="getPearl(index,t.id) " :disabled="t.isDisabled" :style="'background: url('+t.href+');background-repeat: no-repeat;background-size: 4.5rem 4.5rem ;'">
        <div class="text-center animateCount" style="margin-top: 4rem;font-size: smaller">{{t.imgCount}}</div>
        </button>
    </div>
			<div class="waitingContainer" v-else>
				<div class="waiting">
					<img :src="bh" />
				</div>
				<div class="text-center">正在生长中...</div>
			</div>
		</div>
	</div>
</template>

<script>
	import back from '@/assets/images/return.png'
	import backs from '@/assets/images/backs.png'
	import bh from '@/assets/images/bihe.png'
  import pic1 from "@/assets/images/chushi.png"
  import defaultPearl from '@/assets/images/zhenzhu.png'
  import defaultOcean from '@/assets/images/haiyangzhixin.png'
	export default {
		name: "friendfarm",
		data() {
			return {
				masrc: back,
				bh: defaultPearl,
        friend_pearl: 0,
        friend_avatar:pic1,
        hasPearl:false,
        imgDiv:[],
        PearlLevel1:{
          imgCount:'',
          href:defaultPearl,
          divClass:'',
          animation:'',
          level:1,
          id:'',
          isDisabled:false,
          hasStolen:true
        },
        PearlLevel2:{
          imgCount:'',
          href:defaultOcean,
          divClass:'',
          animation:'',
          level:2,
          id:'',
          isDisabled:false,
          hasStolen:true
        }
			}
		},
		mounted() {
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
			this.$nextTick(function() {
				this.friendfarm();
			})
		},
		methods: {
			friendfarm() {
			  this.imgDiv=[];
				this.$http({
						method: "post",
						url: "/users/plant",
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
              this.friend_pearl=res.data.friend_pearl;
              if(res.data.friend_avatar===null||res.data.friend_avatar===undefined||res.data.friend_avatar===""){
                this.friend_avatar=pic1
              }else {
                this.friend_avatar=res.data.friend_avatar
              }
              if(res.data.pearls.length>0){
                this.hasPearl=true;
                this.imgDiv=[];

                for(let i=0;i<res.data.pearls.length;i++){
                  if(res.data.pearls[i].pearl_type==="NORMAL"){

                    //普通珍珠
                    this.PearlLevel1.id=res.data.pearls[i].id;
                    this.PearlLevel1.divClass='pearlBox pearlBox'+res.data.pearls[i].today_num%10;
                    if(res.data.pearls[i].has_stolen){
                      this.PearlLevel1.imgCount="已摘取"
                    }else {
                      this.PearlLevel1.imgCount=res.data.pearls[i].reward;
                    }
                    this.imgDiv.push(this.PearlLevel1)
                    this.PearlLevel1={ imgCount:'', divClass:'',href:defaultPearl, animation:'', level:1, id:'',isDisabled:false}

                  }else if(res.data.pearls[i].pearl_type==="LUCK"){
                    //海洋之心
                    this.PearlLevel2.id=res.data.pearls[i].id;
                    this.PearlLevel2.imgCount=res.data.pearls[i].reward;
                    this.PearlLevel2.divClass='pearlBox pearlBox'+res.data.pearls[i].today_num%10;
                    this.imgDiv.push(this.PearlLevel2)
                    this.PearlLevel2={ imgCount:'', divClass:'',href:defaultOcean, animation:'', level:2, id:'',isDisabled:false}
                  }

                }
              }else {
                this.hasPearl=false
              }
						} else {
							this.$layer.msg(res.data.msg);
						}
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
			},
      getPearl(index,id){
				this.$http({
						method: "post",
						url: "/steal",
						headers: {
							"device": "android",
							"uid": localStorage.getItem("uid"),
							"Access-Control-Allow-Origin": "*"
						},
						data: {
							pearl_id: id,
              friend_uid:localStorage.getItem("friend_uid")
            }
					}).then(function(res) {
						if(res.data.code === 0) {
              let pearlAudio = document.getElementById('pearlAudio');
              pearlAudio.play();
              for(let i=0;i<res.data.pearls.length;i++){
                  this.imgDiv[i].id=res.data.pearls[i].id;
                  if(res.data.pearls[i].has_stolen){
                    this.imgDiv[i].imgCount="已摘取"
                  }else {
                    this.imgDiv[i].imgCount=res.data.pearls[i].reward;
                  }

              }

              $(".animateCount").eq(index).text('+'+res.data.stolen_reward).animate({color:"#12dd99",opacity:0,marginTop:'-100%'},1000);
              setTimeout(()=>{
                $(".animateCount").eq(index).text(this.imgDiv[index].imgCount).animate({color:"#fff",opacity:1,marginTop:'4rem'},100)
              },1000)
            }else {
              this.$layer.msg("偷过啦");
            }
					}.bind(this))
					.catch(function(err) {
						this.$layer.msg("系统异常，请稍后再试");
					}.bind(this))
      },
			LeavingMessage() {
				this.$router.push({
					path: '/leavingmessage',
					name: 'leavingmessage',
					params: {
						name: 'name'
					}
				})
			},
			goBack() {
				this.$router.go(-1);
			},
			evers() {
				this.masrc = backs;
			},
			lat() {
				this.masrc = back;
			}
		}
	}
</script>

<style scoped>
	.content {
		color: #fff;
		font-size: 1.6rem;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: #1A3B57;
	}

	#farmNav {
		background: transparent;
    border: none;
		color: #fff;
	}

	.farmBack {
		width: 100%;
		height: 100vh;
		max-height: 730px;
		overflow: hidden;
		margin-top: -48px;
		background-image: url("../../assets/images/bg.png");
		background-size: 100% 100%;
		background-repeat: repeat-x;
		background-position: center top;
	}

	.icon {
		position: absolute;
		left: 1rem;
		top: 6.5rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 2rem;
		padding: 0.3rem 1.5rem 0.3rem 0.5rem;
		font-size: 1.5rem;
	}

	.icon img {
		width: 2.5rem;
		border-radius: 50%;
	}

	.options {
		width: 6rem;
		text-align: center;
		position: absolute;
		top: 72vh;
		right: 0;
		color: #fff;
	}

	.options img {
		width: 80%;
	}

	.options img:active {
		transform: scale3d(0.8, 0.8, 0.8);
		transition: 0.1s;
	}
  #pearlContainer{
    position: relative;
    width: 100vw;
    height: 50vh;
    margin-top: 10vh;
  }
  .pearlBox{
    border: none;
    width: 4.5rem;
    height: 8rem;
    position: absolute;
    animation: myfirst 2s infinite;
    outline: none;
  }
  .pearlBox1{
    top: 50vh;
    left: 40vw;
  }
  .pearlBox2{
    top:35vh;
    left: 41vw;
  }
  .pearlBox3{
    top: 40vh;
    left: 5vw;
  }
  .pearlBox4{
    top: 30vh;
    left: 20vw;
  }
  .pearlBox5{
    top: 30vh;
    left: 70vw;
  }
  .pearlBox6{
    top: 45vh;
    left: 70vw;
  }
  .pearlBox7{
    top: 55vh;
    left: 8vw;
  }
  .pearlBox8{
    top: 65vh;
    left: 28vw;
  }
  .pearlBox9{
    top: 60vh;
    left: 58vw;
  }
  .pearlBox0{
    top: 20vh;
    left: 55vw;
  }

	.waitingContainer {
		margin-top: 40vh;
		font-size: 1.5rem;
	}

	.waiting {
		width: 6rem;
		height: 6rem;
		animation: myfirst 2s infinite;
		margin: 1rem auto;
	}

	.waiting img {
		width: 100%;
	}

	@keyframes myfirst {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(0, -1rem);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
