<template>
    <div class="content">

      <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0" id="nav1">
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
        <span class="navTitleText">系统消息</span>
      </mu-appbar>
      <div style="margin-top: 65px">

        <div class="text-center"><span class="DialogDate">{{created_at}}</span></div>

        <div class="text-center">
          <span class="serviceContent" v-html="content">

          </span>
        </div>
      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "newsdetails",
        data(){
          return{
            masrc: back,
            from_user:'',
            title:'',
            created_at:'',
            content:''
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          let routerParams=this.$route.params.dataObj;
          this.$http({
            method: "post",
            url: "/messages/detail",
            headers:{"device":"android","uid":localStorage.getItem("uid"),"Access-Control-Allow-Origin":"*"},
            data: {
              mid:routerParams
            }
          }).then(function(res){
            if(res.data.code==0){
              this.from_user = res.data.data.from_user;
              this.title = res.data.data.title;
              this.created_at = res.data.data.created_at;
              this.content = res.data.data.content+ '<style type="text/css">' +
								'img {max-width: 100%; }p{font-size: 1.6rem;line-height: 28px}' +
								'<\/style>';

            }else {
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this));
        },
        methods:{
          goBack() {
            this.$router.go(-1);
          },
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          }
        }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #666;
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    width: 100vw;
    position: fixed;
    top: 0;
    overflow: hidden;
  }

  .serviceContent{
    width: 90%;
    height: 80vh;
    overflow-y: scroll;
    background: #fff;
    display: inline-block;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
    text-align: left;
    word-wrap:break-word;
    font-size: 1.6rem;
  }
</style>
