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
    <div class="input-group-addon searchIcon"><mu-icon value="search" ></mu-icon></div>
      <input class="form-control searchInput" v-model="search" placeholder="查询公益项目"/>
    </div>
    <div style="text-align: center">
      <mu-button flat small>#白血病 </mu-button><mu-button flat small>#大病医疗</mu-button><mu-button flat small>#教育助学</mu-button><mu-button flat small>#教育助学</mu-button>
    </div>
    <mu-carousel hide-controls>
      <mu-carousel-item>
        <img :src="carouselImg1">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg2">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg3">
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="carouselImg4">
      </mu-carousel-item>
    </mu-carousel>
    <div v-for="(data,index) in datas" >
      <div style="font-size: 1.7rem;padding: 1rem 2.5%;color: #444"><div class="sign"></div>{{data.title}}</div>
      <div class="goodUl">
        <div v-for="(flex,item) in data.data" class="goodList">
          <div @click="goDonation(flex.path,flex.name,flex.id)">
            <img :src="flex.img" style="width: 100%">
            <h5>{{flex.title}}</h5>
            <div class="fontStyle">{{flex.pitches}}</div>
            <p class="fontStyle"><span style="color: #09a2d6">{{flex.count}}份</span>爱心</p>
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
            carouselImg1,carouselImg2,carouselImg3,carouselImg4,
            datas:[
              {
                title: '教育助学',
                data:[
                  {id:'sdhfjui',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'czxdsad',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'hgfhsdf',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'}
                ]

              },
              {
                title: '大病医疗',
                data:[
                  {id:'fdgasda',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'asfxzrf',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'vchbfdg',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'}
                ]

              },
              {
                title: '公益慈善',
                data:[
                  {id:'wqewssf',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'hgjkhyj',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'},
                  {id:'vshsdfs',img:carouselImg5,title:'募捐慈善，助学成 长',pitches:'为孩子送上一份爱',count:4555,path:'donation',name:'donation'}
                ]

              },
            ]
          }
        },
        methods: {
          evers() {
            this.masrc = backs;
          },
          lat() {
            this.masrc = back;
          },
          goBack() {
            this.$router.go(-1);
          },
          goDonation(path,name,id){
            this.$router.push({
              path: path,
              name:name,
              params: {
                name: 'name',
                dataObj: id

              }
            })
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
    background: #09a2d6;
    width: 0.3rem;
    height:1.5rem;
    margin-right:0.5rem;
    display: inline-block;
    vertical-align: middle
  }
</style>
