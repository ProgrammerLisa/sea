<template lang="html">
  <div class="yo-scroll"
       :class="{'down':(state===0),'up':(state===1),infinite:(state===2),touch:touching}"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)">

    <section class="inner" :style="'paddingBottom:'+top+'px'">
      <slot></slot>
      <footer class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip">下拉更新</span>
          <span class="up-tip">松开更新</span>
          <span class="refresh-tip">更新中</span>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      offset: {
        type: Number,
        default: 40
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        startY: 0,
        touching: false,
        infiniteLoading: false
      }
    },
    methods: {
      touchStart(e) {
        this.startY = e.targetTouches[0].pageY
        this.startScroll = this.$el.scrollTop || 0
        this.touching = true
      },
      touchMove(e) {
        let outerHeight = this.$el.clientHeight
        let innerHeight = this.$el.querySelector('.inner').clientHeight
        let scrollTop = this.$el.scrollTop
        let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
        let infiniteHeight = this.$el.querySelector('.pull-refresh').clientHeight
        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
        if (!this.enableRefresh  || !this.touching|| this.$el.scrollTop === 0) {
          return
        }

          if (bottom <= infiniteHeight){
            let diff=this.startY-e.targetTouches[0].pageY;
            if(diff>0) e.preventDefault()
            $(".pull-refresh").show()
            this.top=Math.pow(diff, 1) + (this.state === 2 ? this.offset : 0)
            if (this.state === 2) { // in refreshing
              return
            }
            if (this.top >= this.offset*2) {
              this.state = 1
            } else {
              this.state = 0
            }
          }

      },
      touchEnd(e) {
        if (!this.enableRefresh) return
        this.touching = false
        $(".pull-refresh").fadeOut(200)
        if (this.state === 2) { // in refreshing
          this.state = 2
          this.top = this.offset*2
          return
        }
        if (this.top >= this.offset*2) { // do refresh
            this.infinite()

        } else { // cancel refresh
          this.state = 0
          this.top = 0



        }
      },

      infinite() {
        this.state = 2
        this.top = this.offset
        this.onInfinite(this.infiniteDone)
      },

      infiniteDone() {
        this.state = 0
        this.top = 0
      }

    }
  }
</script>
<style>
  .yo-scroll {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f5f5f5
  }
  .yo-scroll::-webkit-scrollbar {
    display: none;
  }
   .inner {
    position: absolute;
    top: 0;
    width: 100%;
    transition-duration: 300ms;
  }
  .yo-scroll:after{
    min-height: calc(100% + 1px);
  }
  .yo-scroll .pull-refresh {
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    display: none;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .yo-scroll.up .pull-refresh{
    display: flex;
  }
  .yo-scroll.touch .inner {
    transition-duration: 0ms;
  }
  .yo-scroll.down .down-tip {
    display: block;
  }
  .yo-scroll.up .up-tip {
    display: block;
  }
  .yo-scroll.refresh .refresh-tip {
    display: block;
  }
  .yo-scroll .down-tip,
  .yo-scroll .refresh-tip,
  .yo-scroll .up-tip {
    display: none;
  }


</style>
