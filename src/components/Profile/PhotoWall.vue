<template>
  <div class="content">
    <mu-appbar class="mu-appbar" color="#fff" textColor="#555" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="back">
        <img :src="masrc"/>
      </mu-button>
      照片墙
    </mu-appbar>
    <div class="photoContainer">
        <div class="d-flex flex-row justify-content-start align-items-center flex-wrapper"  >
          <div class="d-flex flex-row justify-content-center align-items-end flex-demo" v-for="(p,index) in photo" > <img :src="p"  @click="openSimpleDialog(p)"></div>
        </div>
        <!--<div v-for="item in photo">
        		<img :src="item">
        </div>-->
    </div>
    <mu-dialog :open.sync="openSimple" max-width="1000" fullscreen transition="fade">
      <div class="dialogContainer">
        <img :src="src" style="width: 100%" id="dialogPhoto" @click="closeSimpleDialog">
      </div>
    </mu-dialog>
  </div>

</template>

<script>
    import back from '@/assets/images/back.png'
    import backs from '@/assets/images/backs.png'
    export default {
        name: "photowall",
        data(){
          return{
            masrc: back,
            photoList:'',
            photo:[],
            openSimple: false,
            src:''
          }
        },
        mounted(){
          this.$nextTick(function() {
            this.photoFunc();
          })
        },
        methods:{
          photoFunc(){
//          this.photoList=this.$route.params.dataObj;
//          this.src=this.photoList[0].src;
	 this.photoList=this.$route.params.dataObj;
	           console.log(this.$route.params.dataObj)
	         	this.photoList.forEach(element=>{
	         			console.log(element.src);
	         			this.photo.push(element.src);
           })
//          if(this.photoList.length>3){
//            if(this.photoList.length%3===0){
//              for (let i=0;i<this.photoList.length/3;i++){
//                this.photo.push({src:this.photoList.slice(3*i,3*i+3),position:['start','center','end']})
//              }
//            }else {
//              for (let i=0;i<parseInt(this.photoList.length/3);i++){
//                this.photo.push({src:this.photoList.slice(3*i,3*i+3),position:['start','center','end']})
//              }
//              this.photo.push({src:this.photoList.slice(parseInt(this.photoList.length/3)*3,this.photoList.length),position:['start','center','end']})
//            }
//          }
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
          openSimpleDialog (c) {
            this.openSimple = true;
            this.src=c;
          },
          closeSimpleDialog () {
            this.openSimple = false;
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    width: 100vw;
    position: fixed;
    top: 0;
    background: #fff;
    min-height: 100vh;
  }
  .mu-appbar{
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }
  .photoContainer{
    border-top: 0.6rem solid #f5f5f5;
  }
  .flex-wrapper {
    width: 100%;
    margin-top: 8px;
  }
  .flex-demo {
    width: 33%;
    background-color: #e0e0e0;
    text-align: center;
    line-height: 32px;
    margin-left: 8px;
  }
  .flex-demo img{
    width: 100%;
  }
  .flex-wrapper:first-child {
    margin-top: 0;
  }
  .flex-demo:first-child {
    margin-left: 0;
  }
  .back{
    position: absolute;
    left: 0.5rem;
  }
  .back img {
    height: 2.5rem;
  }
  .dialogContainer{
    width: 100vw;
    height: 100vh;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>
