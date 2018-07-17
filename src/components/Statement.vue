<template>
  <div class="content">
    <div style="height:600px;">
      <v-scroll :on-infinite="infinite" ref="myscroller">
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
    <canvas id="myCanvas"></canvas>
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
						title: '初始奖励',
						date: '2018-05-18 10:59:16',
						isIncome: true,
						count: 25,
						symbol: ''
					}
				],
        Ox:0,
        Oy:0
			}
		},
		mounted() {
      this.loading()
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
      infinite(done) {

        done()
      },
      loading(){
        var c = document.getElementById('myCanvas');
        var ctx = c.getContext('2d');
        var mW = c.width = $(window).innerWidth();
        var mH = c.height = $(window).innerHeight();
        var lineWidth = 5;
        var r = mW / 2; //中间位置
        var cR = r/3 - 4 * lineWidth; //圆半径
        var startAngle = -(1 / 2 * Math.PI); //开始角度
        var endAngle = startAngle + 2 * Math.PI; //结束角度
        var xAngle = 10 * (Math.PI / 180); //偏移角度量
        var cArr = []; //圆坐标数组

        //初始化圆坐标数组
        for(var i = startAngle; i <= endAngle; i += xAngle){
          //通过sin()和cos()获取每个角度对应的坐标
          var x = r + cR * Math.cos(i);
          var y = mH/2 + cR * Math.sin(i);

          cArr.push([x, y]);
        }
        var flag={
          t:false,
          color:"#ddd"
        };
        if(flag.t){
          flag.color="red"
        }else {
          flag.color="#ddd"
        }
        //移动到开始点
        var startPoint = cArr.shift();
        // setInterval(function () {
        //   ctx.beginPath();
        //   ctx.moveTo(startPoint[0], startPoint[1]);
        //   ctx.closePath();
        //   flag.t=!flag.t;
        // },1000)

        //渲染函数
        var rander = function(){
          //画圈
          if(cArr.length){
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = flag.color;

            var tmpPoint = cArr.shift();
            ctx.lineTo(tmpPoint[0], tmpPoint[1]);

            ctx.stroke();
          }else{
            cArr = null;
            return;
          }

          requestAnimationFrame(rander);
        };

        rander();
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
  #myCanvas{
    margin: 0 auto;
    display: block;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
  }
</style>