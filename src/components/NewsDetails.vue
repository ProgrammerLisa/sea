<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" @touchstart="evers"  @touchend="lat" class="back"><img :src="masrc"/></span>
          {{from_user}}
        </div>
      </div>
      <div class="media">

        <p class="text-center"><span class="DialogDate">{{created_at}}</span></p>

        <div class="media-body">
          <span class="serviceContent">
             {{content}}
          </span>
        </div>

      </div>
    </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "NewsDetails",
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
              this.content = res.data.data.content;

            }else {
              this.$layer.msg(res.data.msg);
            }
          }.bind(this))
            .catch(function(err){
              this.$layer.msg(err)
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

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    position: absolute;
    left: 1rem;
  }
  .back img {
    height: 2.5rem;
  }
  .media-body{
    text-align: center;
  }
  .serviceContent{
    background: #fff;
    display: inline-block;
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0.2rem 0.2rem 0.2rem #ddd;
    text-align: left;
  }
</style>
