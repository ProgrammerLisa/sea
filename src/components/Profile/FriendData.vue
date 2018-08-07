<template>
  <div class="content">
    <div class="test">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="back">
        <img :src="masrc"/>
      </mu-button>
    </div>

    <mu-carousel transition="fade" class="picContainer" interval="5000" :cycle="false"  hide-controls :active="active">
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
      <div class="title">好友昵称 <span class="sex">{{sex}}</span></div>
      <div class="msg"><span class="level">Lv.{{level}}</span><span class="friendId">ID:{{id}}</span></div>
      <div class="autograph">{{autograph}}</div>
    </div>
    <div class="title" style="padding: 1rem 5vw 0">相册</div>
    <div class="controlContainer">
      <div class="controlScroll">
        <div class="controlContent"  v-for="(p,index) in pic">
          <img :src="p.src" @click="changeActive(index)"/>
        </div>
      </div>
    </div>
    <div class="more"><span @click="photowall">查看更多图片<img src="../../assets/images/more.png"/></span></div>

  </div>
</template>

<script>
    import pic1 from "@/assets/images/test/timg.jpg"
    import pic2 from "@/assets/images/test/1f05664d192e4d8987bdef2562775e4f_th.png"
    import pic3 from "@/assets/images/test/86c9f191d93d4b208002970e8635cbef.jpg"
    import pic4 from "@/assets/images/test/0824ab18972bd40719d54bb773899e510fb3096d.jpg"
    import pic5 from "@/assets/images/test/201711613356.jpg"
    import pic6 from "@/assets/images/test/E-XE-fyhskrq1912953.jpg"
    import back from '@/assets/images/whiteback.png'
    import backs from '@/assets/images/backs.png'
    export default {
        name: "FriendData",
        data(){
          return{
            masrc: back,
            pic:[{src:pic1},{src:pic2},{src:pic3},{src:pic4},{src:pic5},{src:pic6}],
            active: 0,
            sex:'♀',
            level:0,
            id:123456789,
            autograph:'这个人很懒，还没有签名。'
          }
        },
        methods:{
          changeActive (index) {
            this.active = index;
          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          },
          goBack() {
            this.$router.go(-1);
          },
          photowall(){
            this.$router.push({
              path: '/photowall',
              name: 'PhotoWall',
              params: {
                name: 'name',
                dataObj: this.pic
              }
            })
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
    background: #fff;
    height: 100%;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar {
    display:none
  }
  .back{
      position: absolute;
      left: 0.5rem;
    z-index: 9999;

    }
  .test{
    background: linear-gradient(rgba(66,66,66,0.2),rgba(97,97,97,0.2),rgba(158,158,158,0.1),transparent);
    border-radius: 0;
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
  }
  .back img {
    height: 2.5rem;
  }
  .picContainer{
    width: 100vw;
    max-height: 100vw;
    overflow: hidden;
  }
  .picContainer img{
    width: 100vw;
    height: 100vw;
  }
  .controlContainer{
    overflow-x: scroll;
    padding: 1vw 5vw;
  }
  .controlContainer::-webkit-scrollbar {
    display:none
  }
  .controlScroll{
    width: 135vw;
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
  .dataContainer{
    padding: 1rem 5vw;
    border-bottom: 0.6rem solid #f5f5f5;
  }
  .title{
    margin-bottom: 0.3rem;
    font-size: 16px;
    color: #444;
  }
  .sex{
    background:#FC7D7D ;
    color: #fff;
    font-size: smaller;
    display: inline-block;
    width: 1.5rem;
    line-height:1.5rem;
    text-align: center;
    border-radius: 50%;
  }
  .level{
    background:#09A2D6 ;
    color: #fff;
    font-size:1rem;
    display: inline-block;
    border-radius:0.8rem;
    padding: 0 0.5rem;
    margin-right: 1rem;
  }
  .friendId{
    font-size: 0.75rem;
    color: #666;
  }
  .msg{
    margin-bottom: 0.3rem;
  }
  .autograph{
    font-size: 1.3rem;
    color: #555;
  }
  .more{
    text-align: center;
    font-size: 1rem;
    color: #646464;
    margin-top: 1rem;
  }
  .more img{
    width: 2.5rem;
  }
  .news{
    background: #f5f5f5;
    padding: 1rem  5vw;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
