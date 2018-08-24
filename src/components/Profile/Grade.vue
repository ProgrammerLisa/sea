<template>
	<div class="content">
		<div id="navBox">
			<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
				<mu-button icon slot="left" @click="goBack" class="getBack">
					<img :src="masrc" />
				</mu-button>
				<span class="navTitleText">我的等级</span>
			</mu-appbar>
			<div class="income" id="nav2">
				<div class="today">
				 <div class="headImgBg">
            <img class=" headImg" :src="`${headImg+'?'+now}`" v-if="haveHeadImg" />
            <img class=" headImg" :src="headImg" v-else/>
            <div class="le">
              <span class="level">Lv.{{level}}</span>
            </div>
          </div>


				</div>

				<div>
					<span style="font-size: 1.2rem;">能量值:&#160&#160 {{energ}} &#160&#160距离下一级还需:&#160&#160 {{need}}</span>
				</div>
				<mu-container>
					<mu-flex class="demo-linear-progress">

						<mu-linear-progress style="width: 90%;margin:0 auto;border-radius: 8rem" mode="determinate" color="#FFFFFF" size="7" :max="1000"></mu-linear-progress>


					</mu-flex>
				</mu-container>
        <div style="padding:1rem 2rem;width: 100%;display: flex;">
          <div class="text-left" style="width: 33%">Lv.0</div>
          <div class="text-center" style="width: 33%">Lv.1</div>
          <div class="text-right" style="width: 34%;color: #fff;padding-right: 0">Lv.2</div>
        </div>
			</div>
      <div id="#nav3">
        <div class="GradeMsg"><span style="color: #09a2d6;margin-right: 0.6rem;font-weight: 700">|</span>等级权益</div>
        <div class="GradeMsg"><mu-avatar color="#09A2D6" size="18">1</mu-avatar> 达到3级 可解锁 “海洋之心”</div>
        <div class="GradeMsg"><mu-avatar color="#09A2D6" size="18">2</mu-avatar> 等级越高获得的珍珠价值越高</div>
        <div class="GradeMsg" style="border-top: 0.6rem solid #f5f5f5">
          <div style="display: flex">
            <div style="width: 40%">
              <span style="color: #09a2d6;margin-right: 0.6rem;font-weight: 700">|</span>如何升级
            </div>
            <div style="width: 60%;font-size: 1.4rem;padding-right: 2px" class="text-right">
              做任务快速升级<img :src="more" class="moreImg"/>
            </div>
          </div>
        </div>
      </div>


		</div>
    <div id="dataBox">
      <mu-paper :z-depth="0">
        <mu-list class="mu-list">
          <mu-list-item class="mu-list-item">
            <mu-list-item-content>
              <mu-list-item-title>每日签到</mu-list-item-title>
              <mu-list-item-sub-title class="dateText">日常任务</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-title class="count"><span class="count-text">5 能量</span> / 无上限 / 日均</mu-list-item-title>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item class="mu-list-item">
            <mu-list-item-content>
              <mu-list-item-title>邀请好友</mu-list-item-title>
              <mu-list-item-sub-title class="dateText">额外任务</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-title class="count"><span class="count-text">5 能量</span> / 10 次上限 / 天</mu-list-item-title>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item class="mu-list-item">
            <mu-list-item-content>
              <mu-list-item-title>公益慈善</mu-list-item-title>
              <mu-list-item-sub-title class="dateText">额外任务</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-title class="count"><span class="count-text">5 能量</span> / 1 次上限 / 天</mu-list-item-title>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item class="mu-list-item">
            <mu-list-item-content>
              <mu-list-item-title>阅读资讯</mu-list-item-title>
              <mu-list-item-sub-title class="dateText">日常任务</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-title class="count"><span class="count-text">5 能量</span> / 5 次上限 / 天</mu-list-item-title>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider class="mu-divider" shallow-inset></mu-divider>


        </mu-list>
      </mu-paper>
    </div>

  </div>
</template>

<script>
	import headImg from '@/assets/images/chushi.png'
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	import more from '@/assets/images/more.png'
	export default {
		name: "grade",
		computed: {
			now() {
				return Date.now();
			}
		},
		data() {
			return {
				headImg: headImg,
				haveHeadImg: '',
				masrc: back,
				more: more,
				level: '',
				need:'',
				energ:''

			}
		},

		mounted() {
			this.getdatelist();
		},
		methods: {
			getdatelist(){
				this.$http({
					method: "post",
					url: "/users/level",
					headers: {
						"device": "android",
						"uid": localStorage.getItem("uid"),
						"Access-Control-Allow-Origin": "*"
					},
					data: {}
				}).then(function(res) {

					if(res.data.code == 0) {
//						this.rank = res.data.data.level;
//						this.signature = res.data.data.resume;
						this.energ = res.data.data.energy;
						let rank = res.data.data.level;
						this.level = res.data.data.level;
						this.need = res.data.data.up_level_needed;

						if(res.data.data.avatar == "") {
							this.headImg = headImg;
							this.haveHeadImg = false
						} else {
							this.headImg = res.data.data.avatar;
							this.haveHeadImg = true
						}
					} else {
						this.$layer.msg(res.data.msg);
					}
				}.bind(this))
				.catch(function(err) {
					this.haveHeadImg = false
					this.phtoImg = false
					console.log(err)
				}.bind(this))
			},
			lat() {
				this.masrc = back;
			},
      evers() {
        this.masrc = backs;
      },
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	span.text-right {
		padding-right: 0;
	}

	.moreImg {
		height: 3rem;
	}

	.count-text {
		color: #323232;
	}

	.content {
		overflow-x: hidden;
		overflow-y: scroll;
		background-color: #f5f5f5;
		width: 100vw;
		height: 100vh;
	}

	#navBox {

		width: 100vw;
		z-index: 9999;
		background: #fff;
	}

	.content::-webkit-scrollbar {
		display: none
	}

	.income {
		background: #09a2d6;
		text-align: center;
		width: 100%;
		color: #fff;
	}
  .GradeMsg{
    border-bottom: 1px solid #eee;
    line-height: 5rem;
    font-size: 1.6rem;
    padding: 0 16px;
  }
  .GradeMsg:last-child{
    padding-right: 0;
  }

	.today {
		width: 100%;
		margin: auto;
	}

	.mu-list {
    padding: 0;
	}

	.mu-list-item {
		padding: 0.5rem 0;
		border-top: 1px solid #F5F5F5;
	}

	.dateText {
		font-size: 1rem;
	}

	.mu-divider {
		background: #eee;
	}

	.dataList:last-child>.mu-divider {
		display: none;
	}

	.count {
		font-size: 1.3rem;
    margin-right: 16px;
	}

	.text-right {
		padding-right: 1rem;
		color: #09A2D6;
	}

	.myData td {
		padding: 0 2rem;
	}

	.demo-linear-progress {
		margin-top: 1rem;
	}

	.level {
		color: #fff;
		font-size: 1rem;
		margin-left: 3rem;
		background: #09A2D6;
		display: inline-block;
		border-radius: 0.8rem;
		padding: 0 0.5rem;
	}

	.headImg{
		width: 72px;
		height: 72px;
		margin-top: 40px;
		margin-bottom: -20px;
		border-radius: 50%;
    /*display: none;*/
	}
  .headImgBg{
    margin: auto;
    width:150px;
    height: 150px;
    background: url("../../assets/images/bliing.png") no-repeat;
    background-size: 100% 100% ;
  }
</style>
