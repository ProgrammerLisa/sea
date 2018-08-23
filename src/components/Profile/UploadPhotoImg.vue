
<template>
  <div class="content">
    <croppa v-model="myCroppa" :prevent-white-space="true" id="myCroppa">
      <img crossOrigin="anonymous" :src="imageSrc" slot="initial" id="img"/>
    </croppa>
    <div style="display: flex">
      <div class="Phbtn"><div class="mybtn" @click="submit">上传</div></div>
      <div class="Phbtn"><div class="mybtn" @click="goBack">取消</div></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Compile",
    data(){
      return{
        imageSrc:'',
        myCroppa:{},
        extensions:''
      }
    },
    mounted(){
      this.imageSrc=this.$route.params.dataObj;
      this.extensions=this.$route.params.extensions;
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      submit(){
        if (!this.myCroppa.hasImage()) {
          this.$layer.msg('请选择一张照片');
          return
        }else {

          this.myCroppa.generateBlob((blob) => {


              this.$http({
              	method: 'post',
                url: '/users/upload-picture',
                  headers: {
                    "device": "android",
                      "Access-Control-Allow-Origin": "*",
                      "uid":localStorage.getItem("uid")
                  },
                  data:{
                    imagedata:this.myCroppa.generateDataUrl().split(",")[1],
                    image_format:"jpg"
                  },
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
    box-shadow: 0.5rem 0.5rem 0.5rem #ddd;
  }
  .Phbtn{
    width: 50%;
    padding: 0 1rem;
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
