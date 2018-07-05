<template>
    <div class="content">
      <div class="panel panel-default BlackTitle">
        <div class="panel-body">
          <span @click="goBack" class="back"><span>ㄑ</span></span>
          {{from_user}}
        </div>
      </div>
      <div class="media" v-for="s in msg">

        <p class="text-center"><span class="DialogDate">{{s.create_at}}</span></p>
        <div class="media-left">
          <img class="media-object" :src="s.img"  alt="...">
        </div>
        <div class="media-body">
        <span class="serviceContent">
           {{s.content}}
        </span>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "NewsDetails",
        data(){
          return{
            from_user:'',
            msg:[],
            mobile:{
              title:'',
              created_at:'',
              content:'',
            }
          }
        },
        mounted(){
          let routerParams=this.$route.params.dataObj;
          console.log(routerParams)
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
              console.log(res.data.data)
              for(let i in res.data.data){
                // this.mobile.title = res.data.data[i].title;
                // this.mobile.created_at = res.data.data[i].created_at;
                // this.mobile.content = res.data.data[i].content;
                // this.msg.push(this.mobile);
                // console.log(this.msg)
                // this.mobile = {
                //   title:'',
                //   created_at:'',
                //   content:'',
                // }
              }
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
  .back span {
    height: 2.5rem;
    font-size: 2.5rem;
    color: #DBDBDB;
  }

  .back span:active {
    color: #555;
  }
</style>
