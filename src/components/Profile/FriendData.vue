<template>
  <div class="content">
    <mu-carousel transition="fade" class="picContainer" interval="5000"  hide-controls :active="active">
      <mu-carousel-item v-for="(p,index) in pic" :key="index" >
        <img :src="p.src"/>
      </mu-carousel-item>
      <template slot="indicator" slot-scope="{ index, active }">
        <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
          <span class="rect-indicator"></span>
        </mu-button>
      </template>
    </mu-carousel>
    <div class="dataContainer">
      <div class="title">好友昵称 </div>
    </div>
    <div class="controlContainer">
      <div class="controlScroll">
        <div class="controlContent"  v-for="(p,index) in pic">
          <img :src="p.src" @click="changeActive(index)"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import pic1 from "@/assets/images/test/timg.jpg"
    import pic2 from "@/assets/images/test/1f05664d192e4d8987bdef2562775e4f_th.png"
    import pic3 from "@/assets/images/test/86c9f191d93d4b208002970e8635cbef.jpg"
    import pic4 from "@/assets/images/test/0824ab18972bd40719d54bb773899e510fb3096d.jpg"
    import pic5 from "@/assets/images/test/201711613356.jpg"
    import pic6 from "@/assets/images/test/E-XE-fyhskrq1912953.jpg"
    export default {
        name: "FriendData",
        data(){
          return{
            pic:[{src:pic1},{src:pic2},{src:pic3},{src:pic4},{src:pic5},{src:pic6}],
            active: 0
          }
        },
        methods:{
          changeActive (index) {
            this.active = index;
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100vw;
    position: fixed;
    top: 0;
    overflow: hidden;
  }
  .picContainer{
    width: 100vw;
    max-height: 100vw;
    overflow: hidden;
  }
  .picContainer img{
    width: 100vw;
  }
  .controlContainer{
    overflow-x: scroll;
  }
  .controlContainer::-webkit-scrollbar {
    display:none
  }
  .controlScroll{
    width: 132vw;
  }
  .controlContent{
    display: inline-block;
    white-space:nowrap;
  }
  .controlContent img{
    width: 20vw;
    height: 20vw;
    margin: 1vw;
  }
  .mu-carousel-indicator-button{
    width: 0.6rem;
    height: 0.6rem;
  }
  .mu-carousel-indicator-button .rect-indicator{
    background:#BEBEBE;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }
  .mu-carousel-indicator-button__active .rect-indicator{
    background: rgba(255,255,255,1);

  }
  .title{
    font-size: 16px;
    color: #444;
  }
</style>
