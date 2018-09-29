<template>
    <div class="content">
      <div class="text-center navTop" id="nav">
        <span class="navTitle">新闻资讯</span>
        <mu-icon size="30" value="search" class="navIcon" @click="goSearch"></mu-icon>
      </div>

      <div id="scroll">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div v-for="(i,index) in press" @click="sendParams(i.id)">
            <div class="list" v-show="i.mod=='LESSPIC'">
              <img :src="i.image" class="image"/>
              <div class="list-item">
                <div class="title">{{i.title}}</div>
                <div class="footer">
                  <div class="prominent" v-show="i.label=='HOT'">推荐</div>
                  <div class="listlabel">{{i.source}} &nbsp;<mu-icon value="visibility" size="20" color="grey600" style="vertical-align: middle"></mu-icon> {{i.hits}}</div>
                  <div class="advertisement" v-show="i.label=='PAY'">广告</div>
                  <div class="time">{{i.published_at}}</div>
                </div>
              </div>
            </div>
            <div class="multipic" v-show="i.mod=='MULTIPIC'">
              <div class="multipicTitle">{{i.title}}</div>
              <div class="multipicImages">
                <img :src="c" v-for="c in i.image"/>
              </div>
              <div class="multipicFooter">
                <div class="Grid-cell u-1of6 flex">
                  <div class="prominent" v-show="i.label=='HOT'">推荐</div>
                  <div class="advertisement" v-show="i.label=='PAY'">广告</div>
                  <div class="listlabel">{{i.source}}</div>
                  <div><mu-icon value="visibility" size="20" color="grey600" style="vertical-align: middle"></mu-icon> {{i.hits}}</div>
                </div>
                <div>
                  <div>{{i.published_at}}</div>
                </div>

              </div>
            </div>
          </div>
        </mu-load-more>
        <div class="noMore" v-show="noMore">没有更多信息了</div>
      </div>

    </div>

</template>

<script>
    export default {
        name: "journalism",
        data(){
          return{
            refreshing:false,
            loading:false,
            next:'/tasks/news',
            noMore:false,
            press:[],
            item:{
              author:'',
              category:'',
              id:'',
              image:'',
              label:'',
              published_at:'',
              source:'',
              tags:'',
              title:'',
              mod:'',
              hits:''
            }
          }
        },
      mounted(){
        let clickNum = 0;
        mui.back = function(){
          clickNum++;
          if(clickNum > 1) {
            plus.runtime.quit();
          } else {
            mui.toast("再按一次退出应用");
          }
          setTimeout(function() {
            clickNum = 0
          }, 2000);
          return false;

        };
        this.$nextTick(function() {
          $("#scroll").css({height:$(window).height()-$("#nav").height()-50+'px'});
          localStorage.removeItem("post_id")
			    this.message();
        })

      },
      methods:{
      	message(){
            this.$http({
              method: "post",
              url: this.next,
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              this.loading=false;
              if(res.data.code === 0) {
                localStorage.setItem("hotkeys",JSON.stringify(res.data.hotkeys));
                this.next=res.data.data.next;
                if(res.data.data.items.length>0){
                  for (let i=0;i<res.data.data.items.length;i++){
                    this.item.author=res.data.data.items[i].author;
                    this.item.category=res.data.data.items[i].category;
                    this.item.id=res.data.data.items[i].id;
                    this.item.image=res.data.data.items[i].image;
                    this.item.label=res.data.data.items[i].label;
                    this.item.published_at=res.data.data.items[i].published_at;
                    this.item.source=res.data.data.items[i].source;
                    this.item.tags=res.data.data.items[i].tags;
                    this.item.title=res.data.data.items[i].title;
                    this.item.mod=res.data.data.items[i].mod;
                    this.item.hits=res.data.data.items[i].hits;
                    this.press.push(this.item);
                    this.item={
                      author:'',
                      category:'',
                      id:'',
                      image:'',
                      label:'',
                      published_at:'',
                      source:'',
                      tags:'',
                      title:'',
                      mod:'',
                      hits:''
                    };
                  }
                }
              }else if (res.data.code===401) {
                this.$layer.msg(res.data.msg);
                this.$router.replace("/login")
              }

            }.bind(this))
              .catch(function(err) {
                this.loading=false;
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
        sendParams(id){
        	this.$router.push({path: '/products'})
        	localStorage.setItem("post_id",id);
        },
        goSearch(){
          this.$router.push('/journalismsearch')
        },
        refresh(){
          this.refreshing=true;
          this.press=[];
          this.next="/tasks/news";
          this.noMore=false;
          this.message();
          setTimeout(() => {
            this.refreshing = false;
          }, 1000)
        },
        load(){
          this.loading=true;
      	  if (this.next===""){
            this.noMore=false;
            setTimeout(()=>{
              this.noMore=true;
              this.loading=false;
            },1500);
          }else {
      	    this.message();

          }
        }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #444;
    padding-bottom: 60px;
    background: #f5f5f5;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    font-size: 1.5rem;
  }
  #scroll{
    overflow-y: scroll;
  }
  #scroll::-webkit-scrollbar{
    display: none;
  }
  .flex{
    display: flex;
  }
  .navTop{
    height:50px;line-height: 50px;background: #fff;font-weight: bold;padding: 0 1rem;
  }
  .navTitle{
    font-size: 1.7rem;letter-spacing: 2px;margin-left: 30px;
  }
  .navIcon{
    float: right;margin-top: 10px;
  }
  .list{
    min-height: 33vw;
    padding: 1rem;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    display: flex;
  }

  /*@media screen and (min-width: 300px) and (max-width: 350px) {*/
  /*.image{*/
  /*width:37%;*/
  /*}*/
  /*}*/
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
   .listlabel{
    margin-right: 1rem;
  }
  .prominent{
    border: 1px solid #25CBEA;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #09a2d6;
    margin-right: 1rem;
  }
  .advertisement{
    border: 1px solid #999;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #444;
    margin-right: 1rem;
  }
  .multipic{
     padding: 1rem;
     border-top: 1px solid #f5f5f5;
     background: #fff;
   }
  .multipicTitle{
    color: #323232;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    padding-bottom: 1rem;
  }
  .multipicImages{
    display: flex;
    justify-content: space-between;
  }
  .multipicImages img{
    width: 30%;
    max-height: 26vw;
  }
  .multipicFooter{
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .image{
    width:35vw;
    height: 100%;
    margin-right: 1rem;
  }
  .Grid-cell {
    flex: 1;
  }
  .u-full {
    flex: 0 0 100%;
  }

  .u-1of2 {
    flex: 0 0 50%;
  }

  .u-1of3 {
    flex: 0 0 33.3333%;
  }

  .u-1of4 {
    flex: 0 0 25%;
  }
  .u-1of6{
    flex: 0 0 66.66666%;
  }
  .noMore{
    width: 100%;
    line-height: 4rem;
    color: #666;
    text-align: center;
    background: #f5f5f5;
    margin-top: -4rem;
  }
</style>
