<template>
  <div class="content">
    <div class="search">
      <div>
        <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
          <img :src="masrc"/>
        </mu-button>
      </div>
      <div class="iconContainer">
        <mu-icon size="28" value="search" color="#999" class="searchIcon" @click="searchNews"></mu-icon>
      </div>
      <div class="inputContainer">
        <input v-model="searchContent" class="searchInput" @input="character" placeholder="搜索你想知道的"/>
      </div>
      <div v-if="showSearch"><mu-button flat @click="cancel">取消</mu-button></div>
      <div v-else><mu-button flat @click="searchNews">搜索</mu-button></div>
    </div>
    <div class="searchContainer" v-if="showSearch">
      <div v-if="hasData">
        <div class="list" v-for="(i,index) in list" @click="sendParams(i.id)">
          <img :src="i.image" class="image" style="width:35%;"/>
          <div class="list-item">
            <div class="title">{{i.title}}</div>
            <div class="footer">
              <div class="listlabel">{{i.source}}</div>
              <div class="prominent" v-show="i.is_paid">推荐</div>
              <div class="time">{{i.published_at}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="nothing">
        没有搜索到这个内容
      </div>
    </div>
    <div class="searchContainer searchDefault" v-else>
      <div>热门搜索</div>
      <div class="searchButton">
        <mu-button round class="roundBtn" v-for="(i,index) in searchButton" :key="index" @click="searchHot(i)">{{i}}</mu-button>
      </div>
    </div>

  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "journalismSearch",
        data(){
          return{
            masrc: back,
            searchContent:'',
            showSearch:false,
            list:[],
            item:{
              author:'',
              category:'',
              id:'',
              image:'',
              is_paid:'',
              published_at:'',
              source:'',
              tags:'',
              title:''
            },
            searchButton:JSON.parse(localStorage.getItem('hotkeys')),
            hasData:'',
          }
        },
        mounted(){
          let that = this;
          if(that.showSearch){
            mui.back = function(){
              that.searchContent='';
              that.showSearch=false;
              that.list=[];
            };
          }else {
            mui.back = function(){
              that.$router.go(-1);
            };
          }

          this.$nextTick(function() {

          })
        },
        methods:{
          getSearch(data){
            this.$http({
              method: "post",
              url: "/tasks/news/search",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data:{
                keyword:data
              }
            }).then(function(res) {
              this.showSearch=true;
              console.log(res.data)
              if (res.data.code===0){
                if (res.data.data.length===0){
                  this.hasData=false;
                } else {
                  this.hasData=true;
                  for (let i=0;i<res.data.data.length;i++){
                    this.item.author=res.data.data[i].author;
                    this.item.category=res.data.data[i].category;
                    this.item.id=res.data.data[i].id;
                    this.item.image=res.data.data[i].image;
                    this.item.is_paid=res.data.data[i].is_paid;
                    this.item.published_at=res.data.data[i].published_at;
                    this.item.source=res.data.data[i].source;
                    this.item.tags=res.data.data[i].tags;
                    this.item.title=res.data.data[i].title;
                    this.list.push(this.item);
                    this.item={
                      author:'',
                      category:'',
                      id:'',
                      image:'',
                      is_paid:'',
                      published_at:'',
                      source:'',
                      tags:'',
                      title:''
                    };
                  }
                }
              }else {
                this.hasData=false;
              }

            }.bind(this))
              .catch(function(err) {
                this.showSearch=true;
                this.hasData=false;
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this));

          },
          character(){
            if (this.searchContent.length===0) {
              this.showSearch=false;
              this.list=[];
            }
          },
          searchNews(){
            if (this.searchContent.length>0){
              if (this.searchContent.indexOf(" ")===-1) {
                this.list=[];
                this.getSearch(this.searchContent);
                this.showSearch=true;
              }else {
                this.showSearch=true;
                this.hasData=false;
              }
            }
          },
          searchHot(i){
            this.list=[];
            this.getSearch(i);
          },
          cancel(){
            this.searchContent='';
            this.showSearch=false;
            this.list=[];
          },
          sendParams(id){
            this.$router.push({path: '/products'})
            localStorage.setItem("post_id",id);
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
    background: #fff;
    height: 100vh;
    overflow-y: scroll;
    color: #323232;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .search{
    border-bottom: 1px solid #f5f5f5;
    padding-right: 1rem;
    height: 50px;
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 999;
  }
  .getBack{
    position: relative;
  }
  .iconContainer{
    margin-top: 11px;
  }
  .inputContainer{
    margin-top: 8px;
  }
  .searchIcon{
    background: #f5f5f5;
    padding: 3.5px 10px;
    border-radius:3px 0 0 3px;
  }
  .searchInput{
    width: 50vw;
    border-radius:0 3px 3px 0;
    box-shadow: none;
    border:1px solid #f5f5f5;
    outline: none;
    padding:0 1rem;
    background: #f5f5f5;
    height: 35px;
  }
  .searchContainer{
    margin-top: 50px;
  }
  .searchDefault{
    padding: 2rem 1rem;
  }
  .searchButton{
    display: flex;
    flex-wrap: wrap;
  }
  .roundBtn{
    background: #f5f5f5;
    box-shadow: none;
    margin: 1rem 1rem 0 0;
  }
  .list{
    height: 11rem;
    padding: 1rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    display: flex;
  }
  .list .image{
    width: 11rem;
    height: 100%;
    margin-right: 1rem;
  }
  @media screen and (min-width: 300px) and (max-width: 350px) {
    .list .image{
      width: 9rem;
    }
  }
  .list .list-item{
    position: relative;
  }
  .list-item .title{
    color: #323232;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .list-item .footer{
    width: 100%;
    color: #646464;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 0;
    font-size: small;
  }
  .list-item .listlabel{
    margin-right: 1rem;
  }
  .list-item .prominent{
    border: 1px solid #25CBEA;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #09a2d6;
    margin-right: 1rem;
  }
  .nothing{
    margin: 35vh auto 0;
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
    color: #888;
  }
</style>
