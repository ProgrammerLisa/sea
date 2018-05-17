<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html{
  font-size:62.5%;
}

.weui-cells{
		border: 0;
	}
</style>
