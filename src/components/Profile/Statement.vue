<template>
    <div class="content" id="myList">

          <mu-appbar class="myNavTitle myNav" color="#fff" textColor="#333" z-depth="0">
            <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack ">
              <img :src="masrc"/>
            </mu-button>
            <span class="navTitleText">收支记录</span>
          </mu-appbar>
          <div class="contentMarginTop">
            <mu-container ref="container" class="demo-loadmore-content">
              <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="media" v-for="s in Statement">
                  <div class="media-body">
                    <div class="media-heading">{{s.title}}</div>
                    <span class="data">{{s.date}}</span>
                  </div>
                  <div class="media-right">
                    {{s.symbol}}{{s.count}}
                  </div>
                </div>
              </mu-load-more>
            </mu-container>
          </div>

    </div>

</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'

	export default {
		name: "Statement",

    data() {
			return {
				masrc: back,
        refreshing: false,
        loading: false,
        noData: '',
        count:1,
				Statement: [{
						title: '阅读资讯',
						date: '2018-05-18 10:59:16',
						isIncome: true,
						count: 5,
						symbol: ''
					},
					{
						title: '每日登录',
						date: '2018-05-18 10:59:16',
						isIncome: true,
						count: 5,
						symbol: ''
					},
					{
						title: '兑换订单',
						date: '2018-05-18 10:59:16',
						isIncome: false,
						count: 100.26,
						symbol: ''
					},
					{
						title: '邀请好友',
						date: '2018-05-18 10:59:16',
						isIncome: true,
						count: 10,
						symbol: ''
					},

          {
            title: '邀请好友',
            date: '2018-05-18 10:59:16',
            isIncome: true,
            count: 10,
            symbol: ''
          },
          {
            title: '邀请好友',
            date: '2018-05-18 10:59:16',
            isIncome: true,
            count: 10,
            symbol: ''
          },
          {
            title: '邀请好友',
            date: '2018-05-18 10:59:16',
            isIncome: true,
            count: 10,
            symbol: ''
          },
          {
            title: '邀请好友',
            date: '2018-05-18 10:59:16',
            isIncome: true,
            count: 10,
            symbol: ''
          },
          {
            title: '邀请好友',
            date: '2018-05-18 10:59:16',
            isIncome: true,
            count: 10,
            symbol: ''
          },
					{
						title: '初始奖励',
						date: '2018-05-18 10:59:16',
						isIncome: true,
						count: 25,
						symbol: ''
					}
				]

			}
		},
		mounted() {
      $(".myNav").css({width:$(window).width()+48+'px'})
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
      refresh () {
        this.refreshing = true;
        this.$refs.container.scrollTop = 0;
        setTimeout(() => {
          this.refreshing = false;
        }, 2000)
      },
      load () {
        this.loading = true;
			  let model = {
          title: this.count,
          date: '2018-05-18 10:59:16',
          isIncome: true,
          count: 5,
          symbol: ''
        };
        setTimeout(() => {
          this.Statement.push(model)
          this.count++;
          this.loading = false;
        }, 2000)

      }

		}
	}
</script>

<style scoped>
	.content {
		overflow-x: hidden;
		color: #666;
		background-color: #fff;
		width: 100vw;
    padding-bottom: 0;
    margin-bottom: 0;
    height: 100vh;
    overflow-y: scroll;
	}
  .content::-webkit-scrollbar {
    display: none
  }
  .myNavTitle{
  }
  .myNav{
    position: fixed;
    top: 0;
  }
  .getBack img{
    position: absolute;
    left: 0;
  }
	.media {
		background: #fff;
		margin-top: 0;
		padding: 1rem 1.6rem;
		border-bottom: 0.1rem #F5F5F5 solid;
	}

	.media-heading {
		color: #444;
		font-size: 1.6rem;
	}

	.data {
		font-size: small;
	}

	.media-right {
		color: #09a2d6;
		vertical-align: middle;
		font-size: large;
	}
  .contentMarginTop{
    margin-top: 4.4rem;
  }
</style>
