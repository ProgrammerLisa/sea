<template>
    <div class="content">
      <div class="text-center navTop" id="nav">
        <span class="navTitle">新闻资讯</span>
        <mu-icon size="30" value="search" class="navIcon" @click="goSearch"></mu-icon>
      </div>

      <div v-if="hasSignal" id="scroll">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div v-for="(i,index) in press" @click="sendParams(i.id)">
            <div v-show="i.mod=='LESSPIC'" class="ul">
              <div class="list">
                <div>
                  <img :src="i.image" class="image" style="width:35vw;"/>
                </div>
                <div class="list-item">
                  <div class="title">{{i.title}}</div>
                  <div class="footer">
                    <div>
                      <span class="time">{{i.published_at}}</span>
                      <span class="listlabel">{{i.source}}</span>
                    </div>

                    <div> {{i.hits}}人阅读</div>
                  </div>
                </div>

              </div>
              <div class="prominentContainer"><span class="prominent" v-show="i.label=='PAY'" style="">广告</span></div>
              <div class="prominentContainer"> <span class="prominent" v-show="i.label=='HOT'">推荐</span></div>
            </div>

            <div class="multipic" v-show="i.mod=='MULTIPIC'">
              <div class="multipicTitle">{{i.title}}</div>
              <div class="multipicImages">
                <img :src="c" v-for="c in i.image"/>
              </div>
              <div class="multipicFooter">
                <div class="Grid-cell u-1of6 flex">
                  <div class="prominent mR" v-show="i.label=='HOT'">推荐</div>
                  <div class="advertisement mR" v-show="i.label=='AD'">广告</div>
                  <div class="mR">{{i.published_at}}</div>
                  <div>{{i.source}}</div>
                </div>
                <div>
                  <div>{{i.hits}}人阅读</div>
                </div>

              </div>
            </div>

            <div class="multipic" v-show="i.mod=='BIGPIC'">
              <div class="multipicTitle">{{i.title}}</div>
              <div class="bigpic">
                <img :src="i.image"/>
              </div>
              <div class="multipicFooter">
                <div class="Grid-cell u-1of6 flex">
                  <div class="prominent mR" v-show="i.label=='HOT'">推荐</div>
                  <div class="advertisement mR" v-show="i.label=='AD'">广告</div>
                  <div class="mR">{{i.published_at}}</div>
                  <div>{{i.source}}</div>
                </div>
                <div>
                  <div>{{i.hits}}人阅读</div>
                </div>

              </div>
            </div>
          </div>
        </mu-load-more>
        <div class="noMore" v-show="noMore">没有更多信息了</div>
      </div>
      <div v-else>
        <nothing @again="again"></nothing>
      </div>
    </div>

</template>

<script>
  import Nothing from '@/components/Nothing'
    export default {
        name: "journalism",
        data(){
          return{
            hasSignal:true,
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
      components:{
        'nothing':Nothing
      },
      methods:{
        again(){
          this.message();
        },
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
              if(res.data.code === 401) {
                this.$layer.msg('请登录后再试！');
                this.$router.replace('/login');
              }
              if(res.data.code === 0) {
                this.hasSignal=true;
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
              }else {
                this.hasSignal=false;
              }

            }.bind(this))
              .catch(function(err) {
                this.loading=false;
                this.$layer.msg("系统异常，请稍后再试");
                this.hasSignal=false;
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
  .ul{
    background: #fff;
  }
  .list{
    height: 30vw;
    overflow: hidden;
    padding:1.1rem 1rem;
    border-top: 1px solid #f5f5f5;
    display: flex;
  }

  /*@media screen and (min-width: 300px) and (max-width: 350px) {*/
  /*.image{*/
  /*width:37%;*/
  /*}*/
  /*}*/
  .list .list-item{
    position: relative;
    width: 100%;
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
    color: #999999;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    font-size: small;
  }
   .listlabel{
  }
  .prominent{
    border: 1px solid #25CBEA;
    border-radius: 3px;
    padding: 0 0.3rem;
    color: #09a2d6;
    margin-right: 0.3rem;
    margin-left: 1rem;
    font-size: small;
    margin-bottom: 1rem;
    display: inline-block;
  }
  .advertisement{
    border: 1px solid #999;
    border-radius: 1rem;
    padding: 0 0.5rem;
    color: #666;
    margin-right: 1rem;
  }
  .multipic{
     padding: 1rem;
     border-top: 1px solid #f5f5f5;
     background: #fff;
    color: #999999;
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
    max-height: 25vw;
    border-radius: 5px;
  }
  .multipicFooter{
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: small;
  }
  .bigpic{
    width: 100%;
    max-height: 26vw;
    overflow: hidden;
    border-radius: 5px;
  }
  .bigpic img{
    width: 100%;
  }
  .image{
    height: 100%;
    border-radius: 5px;
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
  .mR{
    margin-right: 1rem;
  }
</style>
