<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">公益慈善</span>
    </mu-appbar>
    <div class="contentMarginTop">

    </div>
   <div class="input-group search">
    <div class="input-group-addon searchIcon"><mu-icon value="search" @click="searchFuc"></mu-icon></div>
      <input class="form-control searchInput" v-model="search" placeholder="查询公益项目"/>
    </div>
    <div style="text-align: center">
      <mu-button flat small v-for="(i,index) in key_words" :key="index" @click="goSearch(i)">#{{i}} </mu-button>
    </div>
    <mu-carousel hide-controls>
      <mu-carousel-item v-for="(p,index) in display_pictures" :key="index">
        <img :src="p.url">
      </mu-carousel-item>
    </mu-carousel>
    <!--大病医疗-->
    <div v-show="hasDISEASE">
      <div style="font-size: 1.7rem;padding: 1rem 1rem;color: #444"><div class="sign"></div>大病医疗</div>
      <div class="goodUl">
        <div v-for="(i,index) in DISEASE" class="goodList">
          <div @click="goDonation(i.id)">
            <img :src="i.image" style="width: 100%;">
            <h5>{{i.name}}</h5>
            <!--<div class="fontStyle">{{flex.pitches}}</div>-->
            <p class="fontStyle"><span style="color: #09a2d6">{{i.target}}份</span>爱心</p>
          </div>
        </div>
      </div>
    </div>
    <!--爱心助学-->
    <div v-show="hasEDUCATION">
      <div style="font-size: 1.7rem;padding: 1rem 1rem;color: #444"><div class="sign"></div>爱心助学</div>
      <div class="goodUl">
        <div v-for="(i,index) in EDUCATION" class="goodList">
          <div @click="goDonation(i.id)">
            <img :src="i.image" style="width: 100%;">
            <h5>{{i.name}}</h5>
            <!--<div class="fontStyle">{{flex.pitches}}</div>-->
            <p class="fontStyle"><span style="color: #09a2d6">{{i.target}}份</span>爱心</p>
          </div>
        </div>
      </div>
    </div>
    <!--环境保护-->
    <div v-show="hasENVIRONMENT">
      <div style="font-size: 1.7rem;padding: 1rem 1rem;color: #444"><div class="sign"></div>环境保护</div>
      <div class="goodUl">
        <div v-for="(i,index) in ENVIRONMENT" class="goodList">
          <div @click="goDonation(i.id)">
            <img :src="i.image" style="width: 100%;">
            <h5>{{i.name}}</h5>
            <!--<div class="fontStyle">{{flex.pitches}}</div>-->
            <p class="fontStyle"><span style="color: #09a2d6">{{i.target}}份</span>爱心</p>
          </div>
        </div>
      </div>
    </div>
    <!--爱心扶贫-->
    <div v-show="hasPOVERTY">
      <div style="font-size: 1.7rem;padding: 1rem 1rem;color: #444"><div class="sign"></div>爱心扶贫</div>
      <div class="goodUl">
        <div v-for="(i,index) in POVERTY" class="goodList">
          <div @click="goDonation(i.id)">
            <img :src="i.image.url" style="width: 100%;">
            <h5>{{i.name}}</h5>
            <!--<div class="fontStyle">{{flex.pitches}}</div>-->
            <p class="fontStyle"><span style="color: #09a2d6">{{i.target}}份</span>爱心</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import carouselImg1 from '@/assets/images/test/u=780515113,540275411&fm=27&gp=0.jpg'
  import carouselImg2 from '@/assets/images/test/u=4176789213,1736947849&fm=27&gp=0.jpg'
  import carouselImg3 from '@/assets/images/test/u=1498947469,1572939960&fm=27&gp=0.jpg'
  import carouselImg4 from '@/assets/images/test/u=1333292247,557777395&fm=27&gp=0.jpg'
  import carouselImg5 from '@/assets/images/test/u=2684343809,1084507092&fm=27&gp=0.jpg'

    export default {
        name: "publicgood",
        data(){
          return{
            masrc: back,
            labelPosition: 'top',
            search:'',
            key_words:[],
            hasDISEASE:false,
            hasEDUCATION:false,
            hasENVIRONMENT:false,
            hasPOVERTY:false,
            DISEASE:[],
            EDUCATION:[],
            ENVIRONMENT:[],
            POVERTY:[],
            carouselImg1,carouselImg2,carouselImg3,carouselImg4,
            display_pictures:[]
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function() {
            this.getData();
          })
        },
        methods: {
          getData(){
            localStorage.removeItem("charity_id");
            localStorage.removeItem("searchKey");
            this.$http({
              method: "post",
              url: "/tasks/charity",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              console.log(res.data)
              if(res.data.code === 0) {

              	this.display_pictures = res.data.display_pictures;
                let data = res.data.data.key_words;
                this.key_words = res.data.data.key_words;
                for (let i=0;i<data.length;i++){
                  if(data[i]==="DISEASE"){
                    data[i]="大病医疗"
                  }else if (data[i]==="EDUCATION") {
                    data[i]="爱心助学"
                  }else if (data[i]==="ENVIRONMENT") {
                    data[i]="环境保护"
                  }else if (data[i]==="POVERTY") {
                    data[i]="爱心扶贫"
                  }
                }
                if (res.data.data.DISEASE.length>0){
                  this.hasDISEASE=true;
                  this.DISEASE=res.data.data.DISEASE;
                }
                if (res.data.data.EDUCATION.length>0){
                  this.hasEDUCATION=true;
                  this.EDUCATION=res.data.data.EDUCATION;
                }
                if (res.data.data.ENVIRONMENT.length>0){
                  this.hasENVIRONMENT=true;
                  this.ENVIRONMENT=res.data.data.ENVIRONMENT;
                }
                if (res.data.data.POVERTY.length>0){
                  this.hasPOVERTY=true;
                  this.POVERTY=res.data.data.POVERTY;
                }
              }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));
          },
          searchFuc(){
            let regu = "^[ ]+$";
            let re = new RegExp(regu);
            if(this.search.length>0&&!re.test(this.search)){
              localStorage.setItem("searchKey",this.search);
              this.$router.push("/search");
            }else {
              this.$layer.msg("搜索内容不能为空");
            }
          },
          goSearch(i){
            localStorage.setItem("searchKey",i);
            this.$router.push("/search");
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
  .content{
    background: #f5f5f5;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 3rem;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
  .search{
    margin: 1rem 5%;
  }
  .searchInput{
    cursor: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    height: 4rem
  }
  .searchIcon{
    background: #fff;
    border: 0;
  }
  .mu-carousel-item img{
    width: 100%;
    height: 15rem;
  }
  .goodUl{
    display: flex;
  }
  .goodList{
    width: 30%;
  }
  .goodList:nth-child(1){
    margin:0 0 0 2.5%;
  }
  .goodList:nth-child(2),.goodList:nth-child(3){
    margin: 0 0 0 2.5%;
  }
  .mu-carousel{
    height: 15rem;
    margin-top: 1rem;
  }
  .mu-carousel-indicator-button{
    margin: 0;
  }
  .demo-container{
    background: #fff;
  }
  .demo-container{
    margin-bottom: 1rem;
  }

  .fontStyle{
    color: #666;font-size: smaller
  }
  .sign{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
    width: 0.3rem;
    height:1.5rem;
    margin-right:0.5rem;
    display: inline-block;
    vertical-align: middle
  }
</style>
