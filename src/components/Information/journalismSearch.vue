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
      <div class="list" v-for="(i,index) in list">
        <img :src="doman" class="image"/>
        <div class="list-item">
          <div class="title">世界未解之谜的乌拉尔山事件， 难道真的是超自然事件？</div>
          <div class="footer">
            <div class="listlabel">分钟知晓天下事</div>
            <div class="prominent">推荐</div>
            <div class="time">20分钟前</div>
          </div>
        </div>
      </div>
    </div>
    <div class="searchContainer searchDefault" v-else>
      <div>热门搜索</div>
      <div class="searchButton">
        <mu-button round class="roundBtn" v-for="(i,index) in searchButton" :key="index" @click="searchDefault(i)">{{i}}</mu-button>
      </div>
    </div>

  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import doman from '@/assets/images/test/timg.jpg'
    export default {
        name: "journalismSearch",
        data(){
          return{
            masrc: back,
            doman:doman,
            searchContent:'',
            showSearch:false,
            list:[1,2,3,1,4,4],
            searchButton:['乌拉山','乌拉山Wu','wu乌拉山','乌拉山','乌拉']
          }
        },
        mounted(){
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function() {

          })
        },
        methods:{
          character(){
            if (this.searchContent.length===0) {
              this.showSearch=false;
            }

          },
          searchNews(){
            if (this.searchContent.length>0){
              let regu = "^[ ]+$";
              let re = new RegExp(regu);
              if (re.test(this.searchContent)) {
                console.log(1)
              }else {
                console.log(2)
              }
              this.showSearch=true;
            }
          },
          searchDefault(i){
            this.showSearch=true
          },
          cancel(){
            this.searchContent='';
            this.showSearch=false;
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
    padding: 1rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
  .list .image{
    width: 9rem;
    height: 100%;
    margin-right: 1rem;
  }
  @media screen and (min-width: 300px) and (max-width: 350px) {
    .list .image{
      width: 7rem;
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
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    font-size: small;
  }
  .list-item .listlabel{

  }
  .list-item .prominent{
    border: 1px solid #25CBEA;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #09a2d6;
  }
</style>
