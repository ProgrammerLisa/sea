<template>
    <div class="content" id="myList">
      <div  style="height:600px;">
        <v-scroll :on-infinite="infinite" ref="myscroller">
          <div id="navTopMargin"></div>
          <div class="panel panel-default BlackTitle">
            <div class="panel-body">
              <span @click="goBack" @touchstart="evers" @touchend="lat" class="back"><img :src="masrc"/></span>
              <span style="margin-left: -32px; position: absolute; left: 50%; font-size: 1.6rem;">收支记录</span>
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
				]

			}
		},
		mounted() {
      this.loading();
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
			  $("#myCanvas").css({display:"block"});
        $("#myList").css({marginBottom:"25vw"});
        var c = window.document.body.scrollHeight;
        window.scroll(0,c);
			  setTimeout(function () {
          $("#myCanvas").css({display:"none"});
          $("#myList").css({marginBottom:"0"});
        },3000)
        done()
      },
      loading() {
        var canvas = document.getElementById("myCanvas"),
          ctx = canvas.getContext("2d"),
          w = canvas.width,
          h = canvas.height,
          x = w/2,
          y = h/4,
          radius = 30;
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0,0,w,h);

        var r = [3,4,4.5,5,6,7];//串串球大小排序
        var angle = [10,25,45,65,90,120];//串串球旋转角度
        var alpha = [0.25,0.35,0.45,0.65,0.8,1];//串串球透明度
        var x1=[],y1=[];

        setInterval(function(){
          ctx.fillStyle = "#f5f5f5";
          ctx.fillRect(0,0,w,h);
          x1 = [];
          y1 = [];
          for(var i = 0; i < r.length; i ++){
            if(angle[i] >= 360) angle[i] = 0;
            ctx.beginPath();
            ctx.font = "1rem sans-serif";
            ctx.fillStyle = "rgba(156,236,255,"+alpha[i]+")";
            x1.push( x + radius*Math.cos(angle[i]*Math.PI/180));
            y1.push( y + radius*Math.sin(angle[i]*Math.PI/180));
            ctx.arc(x1[i],y1[i],r[i],0,2*Math.PI, true);
            ctx.closePath();
            ctx.fill();
            angle[i] += 5;
          }
        },25);

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
  #myCanvas{
    margin: 0;
    width: 100vw;
    height: 50vw;
    position: fixed;
    left: 0;
    bottom:-25vw;
    display: none;
  }

</style>
