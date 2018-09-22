<template>
    <div class="content">
      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
        <span class="navTitleText">搜索结果</span>
      </mu-appbar>
      <div class="contentMarginTop">
        <div v-if="hasData">
          <div v-for="(i,index) in datas" class="flex">
            <div class="flex_left"><img :src="i.image.url" @click="goDonation(i.id)"/></div>
            <div class="flex_Right">
              <div @click="goDonation(i.id)">{{i.name}}</div>
              <div @click="goDonation(i.id)">完成度：{{i.completed_percent}}</div>
              <div style="font-size: small" @click="goDonation(i.id)">{{i.updated_at}}</div>
            </div>
          </div>

        </div>
        <div class="text-center" style="margin-top: 40vh" v-else>没有搜索到"{{keys}}"一词</div>
      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "search",
        data(){
          return{
            masrc: back,
            hasData:false,
            datas:'',
            keys:localStorage.getItem("searchKey")
          }
        },
        mounted(){
          this.$nextTick(function() {
            this.getData();
          })
        },
        methods:{
          getData(){
            this.$http({
              method: "post",
              url: "/tasks/charity/search",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data:{
                "keyword":localStorage.getItem("searchKey")
              }
            }).then(function(res) {
              if(res.data.code === 0) {
                if (res.data.data.length===0){
                  this.hasData=false
                }else {
                  this.hasData=true,
                    this.datas=res.data.data;
                }
              }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          goDonation(id){
            localStorage.setItem("charity_id",id)
            this.$router.push("/donation");
          },
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
  .flex{
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
    height: 9rem;
    background: #fff;
  }
  .flex_left{
    width: 12rem;
    height:7rem;
    margin-right: 1rem;
  }
  .flex_left img{
    width: 100%;
    height: 100%;
  }
  .flex_Right{
    line-height: 2.5rem;
  }
</style>
