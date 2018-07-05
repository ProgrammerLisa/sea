<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"><span>ㄑ</span></span>
        客服中心
       </div>
    </div>

    <!--对话框-->
    <div class="media" v-for="s in Service">

      <p class="text-center"><span class="DialogDate" v-if="s.isDate">{{s.DialogDate}}</span></p>
      <div class="media-left" v-if="s.isOfficial">
          <img class="media-object" :src="s.img"  alt="...">
      </div>
      <div class="media-body">
        <span class="serviceContent" v-bind:style="s.DialogStyle">
           {{s.Dialog}}
        </span>
      </div>
      <div class="media-right" v-if="s.isMyself">
        <img class="media-object" :src="s.img"  alt="...">
      </div>
    </div>

    <!--输入框-->
    <div class="input-group">
      <span class="input-group-addon" id="basic-addon1"><img src="../assets/images/input.png"/></span>
      <input type="text" class="form-control" placeholder="请输入你的问题" aria-describedby="basic-addon1">
      <span class="input-group-addon dispatchAddon">
        <button class="btn dispatchBtn">发送</button>
      </span>
    </div>

  </div>
</template>

<script>
    import ServiceHeadImg from '@/assets/images/friend.png'
    export default {
        name: "Service",
        data(){
          return{
            Service:[
              {img:ServiceHeadImg,DialogStyle:'',DialogDate:'5月20日 10:32',isDate:true,Dialog:'Hi~ 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊有什么问题都可以问我哟~',isOfficial:true,isMyself:false},
              {img:ServiceHeadImg,DialogStyle:'',DialogDate:'5月20日 10:32',isDate:true,Dialog:'好的好的 ',isOfficial:false,isMyself:true},
              {img:ServiceHeadImg,DialogStyle:'',DialogDate:'5月20日 10:32',isDate:false,Dialog:'一定要哦',isOfficial:true,isMyself:false},
              {img:ServiceHeadImg,DialogStyle:'',DialogDate:'5月20日 10:32',isDate:false,Dialog:'。。。 ',isOfficial:false,isMyself:true},
              {img:ServiceHeadImg,DialogStyle:'',DialogDate:'5月20日 10:32',isDate:true,Dialog:'emmm....嗯 ',isOfficial:false,isMyself:true}

            ]
          }
        },
        mounted(){
          const that = this;
          for (var i=0;i<that.Service.length;i++){
            if( that.Service[i].isMyself){
              that.Service[i].DialogStyle = 'float:right;background:#09a2d6;color:#fff'
            }

          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);
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
  .media{
    padding: 1rem 1rem 0 1rem;
    margin: 0;
  }
  .DialogDate{
    background: #ddd;
    color: #fff;
    padding: 0.2rem 0.5rem;
  }
  .media-object{
    background: #fff;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  .media-body{
    vertical-align: middle;
  }
  .serviceContent{
    background: #fff;
    padding: 0.8rem 1.5rem;
    border-radius: 0;
    display: inline-block;
    max-width: 70%;
  }
  .input-group{
    padding: 1rem;
    background: #e1e1e1;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .input-group-addon{
    background: #fff;
    border: none;
    height: 3.5rem;
    padding: 0;
  }
  .input-group-addon img{
    width:3.5rem;
  }
  .form-control{
    height: 3.5rem;
    border: none;
  }
  .dispatchAddon{
    background: #e1e1e1;
  }
  .dispatchBtn{
    background: #09a2d6;
    color: #fff;
    height: 3.5rem;
    border: none;
    border-radius: 0;
    margin-left: 1rem;
  }
</style>
