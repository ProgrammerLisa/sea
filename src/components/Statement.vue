<template>
  <div class="content">
    <div style="height:600px;">
      <v-scroll :on-infinite="infinite" :on-refresh="refresh"ref="myscroller">
        <div class="panel panel-default BlackTitle">
          <div class="panel-body">
            <span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span>
            收支记录
          </div>
        </div>
        <div class="media" v-for="s in Statement">
          <div class="media-body">
            <div class="media-heading">{{s.title}}</div>
            <span class="data">{{s.date}}</span>
          </div>
          <div class="media-right">
            {{s.symbol}}{{s.count}}
          </div>
        </div>
      </v-scroll>
    </div>

      <div class="scrollerLoading">上拉加载更多</div>
  </div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
  import Scroll from '@/components/plug-ins/scroll'

	export default {
		name: "Statement",
    components : {
      'v-scroll': Scroll
    },
    data() {
			return {
				masrc: back,
        moveList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        noData: '',
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
      refresh(done) {
        this.Statement.push({
          title: '阅读资讯',
          date: '2018-05-18 10:59:16',
          isIncome: true,
          count: 5,
          symbol: ''
        });
        done()
      },
      infinite(done) {
       // console.log(done)
        $(".spinner-holder").css({ opacity: 1});

        done()
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
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 0;
    margin-bottom: 0;
	}

  .scroller {
    position: relative;
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
		margin-bottom: 0.5rem;
		height: 4.1rem;
		line-height: 4.1rem;
	}

	.back {
		float: left;
	}

	.back img {
		height: 2.5rem;
	}

	.media {
		background: #fff;
		margin-top: 0;
		padding: 1rem;
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
  .scrollerLoading{
    text-align: center;
    height: 200px;
    line-height: 70px;
  }
</style>
