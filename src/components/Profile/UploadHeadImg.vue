
<template>
  <div class="content">
    <croppa v-model="myCroppa" :prevent-white-space="true" id="myCroppa">
      <img crossOrigin="anonymous" :src="imageSrc" slot="initial" id="img"/>
    </croppa>
    <div class="row">
      <div class=" col-xs-6"><div class="mybtn" @click="submit">上传</div></div>
      <div class=" col-xs-6"><div class="mybtn" @click="goBack">取消</div></div>
    </div>
<img src="" id="aaa">
  </div>

</template>

<script>
  export default {
    name: "Compile",
    data(){
      return{
        imageSrc:'',
        myCroppa:{},
        houzhuiming:''
      }
    },
    mounted(){
      let that = this;
      mui.back = function(){
        that.$router.go(-1);
      };
      this.imageSrc=this.$route.params.dataObj;
      this.houzhuiming=this.$route.params.houzhuiming;
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      submit(){
        if (!this.myCroppa.hasImage()) {
          this.$layer.msg('请选择一张图片');
          return
        }else {

          this.myCroppa.generateBlob((blob) => {


              this.$http({
                url: '/users/avatar-upload',
                  headers: {
                    "device": "android",
                      "Access-Control-Allow-Origin": "*",
                      "uid":localStorage.getItem("uid")
                  },
                  data:{
                    imagedata:this.myCroppa.generateDataUrl().split(",")[1],
                    imagetype:"jpg"
                  },
                  method: 'post',
                  processData: false,
                  contentType: false
              }).then(function(res){
                if(res.data.code==0){
                  this.$layer.msg(res.data.msg);
                  this.$router.go(-1);

                }else {
                  this.$layer.msg(res.data.msg);
                }
              }.bind(this))
                .catch(function(err){
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this))
          },this.imageSrc,0.8)
        }
      }
    }

  }

</script>

<style scoped>
  .content{
    text-align: center;
    padding: 5rem;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
  }
  #myCroppa{
    display: inline-block;
    box-shadow: 0.5rem 0.5rem 0.5rem #666;
  }
  .btnContent{
    padding: 3rem;
  }
  .mybtn{
    border: 1px solid #ccc;
    padding:1rem 2rem;
    border-radius: 5px;
    margin-top: 3rem;
    color: #666;
  }
  .mybtn:active{
    background: #f5f5f5;
  }
</style>
