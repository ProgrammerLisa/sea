<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc" />
      </mu-button>
      <span class="navTitleText">{{length}}条回复</span>
    </mu-appbar>
    <div class="comment_container" @touchmove="msgHide">
      <div class="comment_main">
        <div class="headImg"> <img :src="content.from_user_avatar"/></div>
        <div class="comment_body">
          <div class="comment_title">{{content.from_user}}</div>
          <div class="comment_content">{{content.content}}</div>
          <div class="comment_date">
            {{content.created_at}}
            <div class="spot">·</div>
            <div class="commentBtn" @click="criticMessage(content.from_user_uid)">{{length}}回复</div>
          </div>
          <div class="flex">
            <div class="flex-b">
              <div v-for="i in head" class="zanImg">
                <img :src="i"/>
              </div>
              <div style="line-height: 2.5rem;font-size: small;margin-left: 0.5rem">36人赞过</div>
            </div>
            <div class="zan">
              <img src="../../assets/images/zan.png"/>
              <span>36</span>
            </div>
          </div>
        </div>
      </div>
      <div class="all_comment">
        <div class="all_title">全部评论</div>
        <div v-for="(i,index) in content.reply" class="comment_main flex">
          <div class="flex">
            <div class="headImg"> <img :src="i.from_user.avatar"/></div>
            <div>
              <div><span class="comment_title">{{i.from_user.nickname}}</span>&nbsp;回复&nbsp;<span class="comment_title">{{i.to_user.nickname}}</span></div>
              <div class="comment_content">{{i.content}}</div>
              <div class="comment_date">
                {{i.created_at}}
                <div class="spot">·</div>
                <div class="commentBtn" v-if="i.reply.length==0" @click="criticMessage(i.from_user.uid)">回复</div>
                <div class="commentBtn" v-else>{{i.reply.length}}回复</div>
              </div>
            </div>
          </div>

          <div class="zan">
            <img src="../../assets/images/zan.png"/>
            <span>36</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="criticxf" class="reply" id="nav1">
      <input v-show="criticxf" @click="criticMessage(false)" v-model='critic' class="reply-input" placeholder="回复" />
      <img src="../../assets/images/zan.png" />
    </div>
    <div v-show="criticpl" class="tardiv" style="">
      <div class="comment_input">
        <mu-text-field v-model='critic' solo placeholder="回复" multi-line :rows="6" :max-length="60"></mu-text-field>
      </div>
      <button :disabled="!critic" class="callBacks" @click="leaveMessage">回复</button>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import img from '@/assets/images/test/timg.jpg'
    export default {
        name: "comment",
      data(){
          return{
            masrc: back,
            content:'',
            length:'',
            head:[img,img,img],
            criticxf:true,
            criticpl:false,
            critic:'',
            uid:'',
          }
      },
      mounted(){
        let that = this;
        mui.back = function(){
          that.$router.go(-1);
        };

        this.$nextTick(function() {
          this.getList();
        })
      },
      methods:{
        getList(){
          $(".comment_container").css({height:$(window).height()-$("#nav1").height()+'px'})
          this.$http({
            method: "post",
            url: "/tasks/news-detail",
            headers: {
              "device": "android",
              "uid": localStorage.getItem("uid"),
              "Access-Control-Allow-Origin": "*"
            },
            data: {
              "post_id": localStorage.getItem("post_id"),
            }
          }).then(function(res) {
            if(res.data.code === 0) {
              for(var i in res.data.data.comments){
                if(localStorage.getItem("commentId")===res.data.data.comments[i].id){
                  this.content=res.data.data.comments[i];
                  this.length=this.content.reply.length;
                  this.uid=this.content.from_user_uid;
                  console.log(this.content)
                }
              }
            }
          }.bind(this))
            .catch(function(err) {
              this.$layer.msg("系统异常，请稍后再试");
            }.bind(this))
        },
        criticMessage(uid) {
          this.criticxf = false;
          this.criticpl = true;
          if (uid!==false){
            this.uid=uid;
          }
        },
        leaveMessage(){
          let res = new RegExp("^[ ]+$");
          if(this.critic === '' || res.test(this.critic) === true) {
            this.$layer.msg("回复内容不能为空");
          } else {
            this.criticxf = true;
            this.criticpl = false;
            this.$http({
              method: "post",
              url: "/tasks/news/reply",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                message_id: localStorage.getItem("commentId"),
                content: this.critic,
                to_user_uid: this.uid,
              }
            }).then(function(res) {
              this.critic = '';
              this.$layer.msg(res.data.msg);
              if(res.data.code === 0) {
                this.getList();
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          }
        },
        msgHide(){
          this.criticxf = true;
          this.criticpl = false;
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
    height: 100vh;
    overflow-y: hidden;
  }
  .comment_container{
    padding-top: 56px;
    font-size: 1.6rem;
    overflow-y: scroll;
  }
  .comment_container::-webkit-scrollbar{
    display: none;
  }
  .comment_main{
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
    background: white;
  }
  .headImg{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.5rem;
  }
  .headImg img{
    width:100%;
  }
  .comment_body{
    width: 80%;
  }
  .comment_title{
    color: #09a2d6;
  }
  .comment_content{
    margin: 0.5rem 0;
  }
  .comment_date{
    display: flex;
    font-size: small;
    color: #646464;
  }
  .spot{
    font-weight: bold;
    margin: 0 0.5rem;
    color: #888;
  }
  .commentBtn{
    display: inline-block;
    background: #F5F5F5;
    border-radius: 10px;
    padding:3px 10px;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
  .flex-b{
    display: flex;
  }
  .zanImg{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.5rem;
  }
  .zanImg img{
    width: 100%;
  }
  .zan{
    font-size: 1.5rem;
  }
  .zan img{
    width: 25px;
    vertical-align: top;
  }
  .all_title{
    padding: 1rem 1rem 0.5rem;
    background: white;
  }
  .reply {
    border-top: 1px solid #F5F5F5;
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    background: #fff;
  }
  .reply img{
    width: 2.5rem;
    margin-left: 0.5rem;
  }
  .reply-input {
    width: 80%;
    margin: 5px;
    height: 40px;
    background: #F5F5F5;
    padding:0 10px;
    border: none;
    outline: none;
  }
  .tardiv{
    width: 100%;background: #F5F5F5;position: fixed;bottom: 0;
    padding:1.2rem 1rem 0.8rem;
  }
  .comment_input{
    background: #fff;
    padding: 0 1rem;
    margin-bottom: 1rem;
  }
  .callBacks {
    float: right;
    width: 50px;
    border: none;
    color: #FFFFFF;
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
  }
  .callBacks:disabled {
    background: #D9D9D9;
  }
</style>
<style lang="less">
  .comment_input{
    .mu-input-help{
      bottom: -36px;
    }
  }

</style>
