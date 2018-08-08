<template>
	<div class="content">
		<div id="navBox">
			<mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
				<mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
					<img :src="masrc" />
				</mu-button>
				<span class="navTitleText">我的等级</span>
			</mu-appbar>
			<div class="income" id="nav2">
				<div class="today">
					<img style="width: 72px;height: 72px;margin-top: 20px;margin-bottom: -20px;" src="../../assets/images/chushi.png" />
					<div class="le">
						<span class="level">Lv.{{level}}</span>
					</div>
				</div>

				<div>
					<span style="font-size: 1.2rem;">能力值:&#160&#160 45 &#160&#160距离下一级还需:&#160&#160 15</span>
				</div>
				<mu-container>
					<mu-flex class="demo-linear-progress">
						<mu-linear-progress style="width: 90%;margin:0 auto;" mode="determinate" color="#FFFFFF" size="7" :max="100" :value="35"></mu-linear-progress>
						<div style="position: absolute; float: left;padding-top: 3%;width: 90%;">
							<span style="float: left;margin-left: 5%;">Lv.0</span>
							<span>Lv.3</span>
							<span style="float: right;">Lv.5</span>
						</div>
					</mu-flex>
				</mu-container>
			</div>

			<mu-paper id="nav3" :z-depth="0">
				<mu-list style="padding: 0">
					<mu-list-item>
						<mu-list-item-content>
							<mu-list-item-title><span style="color: #09a2d6;margin-right: 0.6rem;font-weight: 700">|</span>等级权益</mu-list-item-title>
						</mu-list-item-content>
					</mu-list-item>
				</mu-list>
				<mu-list style="padding: 0">
					<mu-list-item>
						<mu-list-item-content>
							<mu-list-item-title>
								<mu-avatar color="#09A2D6" size="18">1</mu-avatar> 达到3级 可解锁 “海洋之心”</mu-list-item-title>
						</mu-list-item-content>
					</mu-list-item>
				</mu-list>
				<mu-list style="padding: 0">
					<mu-list-item>
						<mu-list-item-content>
							<mu-list-item-title>
								<mu-avatar color="#09A2D6" size="18">2</mu-avatar> 等级越高获得的珍珠价值越高</mu-list-item-title>
						</mu-list-item-content>
					</mu-list-item>
				</mu-list>
			</mu-paper>
		</div>
		<div style="background-color: #F5F5F5;height: 2%;">

		</div>
		<mu-paper id="dataBox" :z-depth="0">
			<mu-list class="mu-list">
				<div class="dataContainer">
					<div class="dataList">
						<mu-list-item>
							<mu-list-item-content>
								<mu-list-item-title><span style="color: #09a2d6;margin-right: 0.6rem;font-weight: 700">|</span>如何升级</mu-list-item-title>
							</mu-list-item-content>
							<mu-list-item-action>
								<mu-list-item-title class="count">做任务快速升级<span class="text-right"><img :src="more" class="moreImg"/></span></mu-list-item-title>
							</mu-list-item-action>
						</mu-list-item>
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
					</div>
				</div>

			</mu-list>
		</mu-paper>

	</div>
</template>

<script>
	import back from '@/assets/images/back.png'
	import backs from '@/assets/images/backs.png'
	import more from '@/assets/images/more.png'
	export default {
		name: "Grade",
		data() {
			return {
				masrc: back,
				more: more,
				level: 3

			}
		},
		mounted() {
			let height = $("#nav1").height() + $("#nav2").height() + $("#nav3").height();
			$("#navBox").css({
				height: height + 'px'
			});
			$("#dataBox").css({
				marginTop: height + 'px'
			})
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
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 9999;
		background: #fff;
	}
	
	.content::-webkit-scrollbar {
		display: none
	}
	
	#dataBox {
		margin-top: 50vh;
	}
	
	.dataContainer {
		margin-top: 1vh;
	}
	
	.income {
		background: #09a2d6;
		text-align: center;
		width: 100%;
		color: #fff;
	}
	
	.incomeTitle {
		font-size: 1.5rem;
	}
	
	.today {
		width: 90%;
		margin: auto;
		padding: 1rem 0;
	}
	
	.grid-cell {
		margin: 1rem 0;
	}
	
	.grid-cell:first-child {
		border-right: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.mu-list {
		border-bottom: 1px solid #eee;
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
	}
	
	.table {
		text-align: center;
	}
	
	.table tr {
		line-height: 4rem;
		border-bottom: 0.1rem solid #efefef;
	}
	
	.bcfff {
		background: #fff;
	}
	
	.text-left {
		padding-left: 1rem;
	}
	
	.text-right {
		padding-right: 1rem;
		color: #09A2D6;
	}
	
	.pearl-count {
		color: #09A2D6;
	}
	
	.decorate {
		display: inline-block;
		background: #09A2D6;
		width: 0.3rem;
		height: 1.6rem;
		margin: 0 1rem;
		vertical-align: middle;
	}
	
	.decorate-title {
		font-size: 1.5rem;
		text-align: left;
		color: #444;
		padding: 0.5rem 0;
	}
	
	#ranking {
		width: 30%;
	}
	
	#listTitle {
		padding: 1rem;
		height: 4rem;
		display: block;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	
	#listTitle:active {
		background: #ddd;
	}
	
	.myData td {
		padding: 0 2rem;
	}
	
	.demo-linear-progress {
		margin-top: 1rem;
		margin-bottom: 4rem;
	}
	
	.level {
		background: #09A2D6;
		color: #fff;
		font-size: 1rem;
		margin-left: 3rem;
		background: #09A2D6;
		display: inline-block;
		border-radius: 0.8rem;
		margin-bottom: 1rem;
		padding: 0 0.5rem;
	}
</style>