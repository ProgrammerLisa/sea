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
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html{
  font-size:62.5%;
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
  left:0;
}
.slide-right-enter {
  transform: scale3d(0,0,0);
  transform-origin: 50% 50% 0
}
.slide-right-leave-active {
  transform: scale3d(0,0,0);
  transform-origin: 50% 50% 0;
  -webkit-transform-origin:50% 50% 0;
}
.slide-left-enter {
  transform: scale3d(0,0,0);
  transform-origin: 50% 50% 0;
  -webkit-transform-origin:50% 50% 0;
}
.slide-left-leave-active {
  transform: scale3d(0,0,0);
  transform-origin: 50% 50% 0;
  -webkit-transform-origin:50% 50% 0;
}

</style>
