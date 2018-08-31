<template>

    <div id="app">
      <transition :name='transitionName'>
        <router-view v-if="isRouterAlive"></router-view>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      transitionName:'',
      isRouterAlive:true
    }
  },
  mounted(){

  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  },
  created() {
    $('#Loading').remove()
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html{
  background: #f5f5f5;
}

.weui-cells{
	border: 0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .3s;
  position: absolute;
  width:100%;
  height: 100%;
  left:0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform:translate3d(-100%, 0, 0);
}
a:hover, a:focus ,a:visited,a:active{
  text-decoration: none;
}
  .myNavTitle{
    border-bottom: 1px solid #eee;
    width: 100%;padding: 4px;position:fixed;top: 0
  }

  .getBack{
    vertical-align: middle
  }
  .getBack img {
    height: 2.5rem;
  }
  .navTitleText{
    font-size: 1.8rem;position: absolute;width: 60%;text-align: center;top: 0;left: 20%;line-height: 56px;
    z-index: 999;
  }
  .contentMarginTop{
    margin-top: 65px;
  }
  .publicDialogTitle{
    padding: 2rem;
  }
</style>
