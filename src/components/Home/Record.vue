<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的战绩</span>
    </mu-appbar>
    <div class="contentMarginTop">
      <div class="demo-container ">
        <div class="counts">
          <div class="grid-cell">
            <div class="count">
              <h4>{{today_steal_pearl}} 颗</h4>
                今日偷取
            </div>
            <div class="allCount"><span>累计偷取</span> <span class="allCountFont">{{total_steal_pearl}}颗</span></div>
          </div>
        </div>
        <div class="counts">
          <div class="grid-cell">
            <h4>{{today_stolen_pearl}} 颗</h4>
            今日被偷
            <div class="allCount"><span>累计被偷</span> <span class="allCountFont">{{total_stolen_pearl}}颗</span></div>
          </div>
        </div>
      </div>
    </div>


    <div class="visitorContainer">
      <div class="visitorTitle">
        <span class="sign"></span>到访小偷
      </div>
      <div v-if="hasVisitor" class="visitorRow">
        <div class="visitorContent" v-for="(v,index) in visitor" :key="index"><div class="grid-cell visitor"><img :src="v.avatar" @click="goFriendData(v.uid)"/></div></div>
      </div>
      <div class="text-center" v-else style="padding: 1rem;color: #555;font-size: 1.6rem">暂无访客</div>
    </div>


    <div class="contentBody">
  <mu-tabs :value.sync="active1" inverse color="#fff" text-color="rgba(0, 0, 0, .54)"  center id="muTabs" indicator-color="transparent">
    <mu-tab class="myTabs">最新动态</mu-tab>
    <mu-tab class="myTabs">小偷留言</mu-tab>
  </mu-tabs>
  <div class="demo-text" v-if="active1 === 0">
    <div style="margin-top: 1rem">
      <mu-container>
        <mu-tabs :value.sync="active2" color="#fff" indicator-color="#09a2d6" full-width >
          <mu-tab class="thiefTitle">谁偷了我</mu-tab>
          <mu-tab class="thiefTitle">我偷了谁</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active2 === 0">
          <div  v-if="hasNews"  style="padding-top: 1rem">
            <mu-container ref="container" class="demo-loadmore-content" style="padding: 0">
              <mu-load-more :refreshing="refreshingStolen" :loading="loadingStolen" @load="loadStolen">
                <div v-for="(s,index) in stolens" class="stealerList">
                  <div class="stealerLeft">
                    <div class="stealerTitle">
                      <span style="color: #09a2d6">"{{s.thief_name}}"</span><span class="stealerText">偷取了你的珍珠</span><span style="color: #09a2d6">{{s.stolen_total}}</span>
                    </div>
                    <div class="stealerDate">{{s.time}}</div>
                  </div>
                  <div class="stealerRight">
                    <div class="text-right">
                      <mu-button @click="goFriendFarm(s.thief_uid)" color="#fff" textColor="#09a2d6" flat class="vBtn">去复仇</mu-button>
                    </div>
                  </div>
                </div>
              </mu-load-more>
            </mu-container>
            <div class="noMore" v-show="noMoreStolen">没有更多信息了</div>
          </div>
          <div v-else class="text-center" style="padding-top: 4rem;font-size: 1.6rem;color:#777">暂无最新动态</div>
        </div>
        <div class="demo-text" v-if="active2 === 1">
          <div  v-if="hasSteal"  style="padding-top: 1rem">
            <mu-container ref="container" class="demo-loadmore-content" style="padding: 0">
              <mu-load-more :refreshing="refreshingSteal" :loading="loadingSteal" @load="loadSteal">
                <div v-for="(s,index) in steals" class="stealerList">
                  <div class="stealerLeft">
                    <div class="stealerTitle">
                      <span class="stealerText">你偷取了</span><span style="color: #09a2d6">"{{s.friend_name}}"</span><span class="stealerText">的珍珠</span><span style="color: #09a2d6">{{s.steal_total}}</span>
                    </div>
                    <div class="stealerDate">{{s.time}}</div>
                  </div>
                  <div class="stealerRight">
                    <div class="text-right">
                      <mu-button @click="goFriendFarm(s.friend_uid)" small color="#fff" textColor="#09a2d6" flat class="vBtn">去挑衅</mu-button>
                    </div>
                  </div>
                </div>
              </mu-load-more>
            </mu-container>
            <div class="noMore" v-show="noMoreSteal">没有更多信息了</div>
          </div>
          <div v-else class="text-center" style="padding-top: 4rem;font-size: 1.6rem;color:#777">暂无最新动态</div>
        </div>

      </mu-container>
    </div>
  </div>
  <div class="demo-text" v-if="active1 === 1">
    <div v-if="hasMessage" style="margin-top:1rem;padding:1rem 1rem 0;background: #fff">
      <mu-container ref="container" class="demo-loadmore-content" style="padding: 0">
        <mu-load-more :refreshing="refreshingMessage" :loading="loadingMessage" @load="loadMessage">
          <div class="media" v-for="(m,index) in message" >
            <div class="media-left">
              <img class="media-object" :src="m.from_user_avatar"/>
            </div>
            <div class="media-body">
              <h4 class="media-heading">{{m.from_user}}</h4>
              <div style="color: #666;font-size: small;width: 100%" class="stealerTitle">{{m.created_at}}</div>

            </div>
            <div class="media-right leaveMessage">
              <mu-button small color="#fff" textColor="#09a2d6" @click="openLeaveMessage(index)" flat class="vBtn">回复</mu-button>
              <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="m.openMessage">
                <div class="publicDialogTitle" style="height: 110px;padding-top: 1rem">
                  <mu-text-field type="text" label="回复小偷" v-model="leavemessage" placeholder="请输入回复内容"  full-width style="margin-bottom: 0;"></mu-text-field>
                  <mu-slide-top-transition v-show="messageMsgShow">
                    <div class="mu-transition-box mu-inverse" style="color: #EF5350;font-size: small" v-show="messageMsgShow">{{messageMsg}}</div>
                  </mu-slide-top-transition>
                </div>

                <mu-button slot="actions" flat color="primary" @click="leaveMessage(index,m.mid)">发送 </mu-button>
                <mu-button slot="actions" flat color="#555" @click="closeLeaveMessage(index)">取消</mu-button>

              </mu-dialog>
            </div>
            <div class="panel-group" id="accordion">
              <div class="panel panel-default">
                <div class="panel-heading" style="background: #fff">
                  <a data-toggle="collapse" data-parent="#accordion" :href="m.href"> <h4 class="panel-title"> {{m.content}} <span class="glyphicon glyphicon-chevron-down" style="color: #999" v-show="m.hasMsg"></span> </h4> </a>
                </div>
                <div :id="m.item" v-show="m.hasMsg" class="panel-collapse collapse in" style="background: #f5f5f5;min-width:100%">
                  <div class="panel-body" v-for="(r,item) in m.reply" style="border: none;padding:0.5rem 1rem;font-size: 1.5rem"><span style="color: #09a2d6">我</span>：{{r[1]}}</div>
                </div>
              </div>
            </div>
          </div>
        </mu-load-more>
      </mu-container>
      <div class="noMore" v-show="noMoreMessage">没有更多信息了</div>
    </div>

    <div v-else class="text-center" style="padding-top: 5rem;font-size: 1.6rem;color:#777">暂无留言</div>
  </div>


</div>

  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "record",
        data(){
          return{
            masrc: back,
            today_steal_pearl:0,
            today_stolen_pearl:0,
            total_steal_pearl:0,
            total_stolen_pearl:0,
            hasVisitor:false,
            hasNews:false,
            hasSteal:false,
            hasMessage:false,
            active1: 0,
            active2: 0,
            open: '',
            visitor:[],
            stolens:[],
            steals:[],
            message:[],
            refreshingSteal:false,
            loadingSteal:false,
            refreshingStolen:false,
            loadingStolen:false,
            refreshingMessage:false,
            loadingMessage:false,
            nextSteal:"/steal-record",
            nextStolen:"/stolen-record",
            nextMessage:"/messages/message-board",
            noMoreSteal:false,
            noMoreStolen:false,
            noMoreMessage:false,
            leavemessage:'',
            messageMsg:'',
            messageMsgShow:false
          }
        },
        mounted(){
          localStorage.removeItem("friend_uid");
          let that = this;
          mui.back = function(){
            that.$router.go(-1);
          };
          this.$nextTick(function () {
            this.gain();
            this.board();
            this.stolen();
            this.steal()
          })
        },
        methods:{
          gain(){
            this.$http({
              method: "post",
              url: "/users/gain",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              //偷取数量
              if(res.data.code===0){
                this.today_steal_pearl=res.data.data.today_steal_pearl;
                this.today_stolen_pearl=res.data.data.today_stolen_pearl;
                this.total_steal_pearl = res.data.data.total_steal_pearl;
                this.total_stolen_pearl = res.data.data.total_stolen_pearl;
              }
              //访客（最多六人）
              if(res.data.data.visitor_list.length!==0){
                this.hasVisitor=true;
                this.visitor=res.data.data.visitor_list;
              }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
          //留言板
          board(){
            this.$http({
              method: "post",
              url: "/messages/message-board",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              this.loadingMessage = false;
              if(res.data.code===0){
                if(res.data.data.length!==0){
                  this.message=[];
                  this.hasMessage=true;
                  let data=res.data.data;
                  for (let i in data) {
                    data[i].openMessage=false;
                    if(data[i].reply.length!==0){
                      data[i].hasMsg=true;
                      data[i].item = 'item'+i;
                      data[i].href='#item'+i;
                      this.message.push(data[i])
                    }else {
                      data[i].hasMsg=false;
                      this.message.push(data[i])
                    }
                  }
                }
                if(res.data.next!==""){
                  this.nextMessage = res.data.next
                }else {
                  this.nextMessage=""
                }
              }else {
                this.nextMessage=""
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
          //谁偷了我
          stolen(){
            this.$http({
              method: "post",
              url: this.nextStolen,
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {
              this.loadingStolen = false;
              if(res.data.code===0){
                if(res.data.data.length>0){
                  this.hasNews=true;
                  for (let i in res.data.data){
                    this.stolens.push(res.data.data[i])
                  }
                }else {
                  this.hasNews=false
                }
                if(res.data.next!==""){
                  this.nextStolen = res.data.next
                }else {
                  this.nextStolen=""
                }
              }else {
                this.nextStolen=""
              }

            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
          //我偷了谁
          steal(){
            this.$http({
              method: "post",
              url:this.nextSteal,
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              }
            }).then(function(res) {

              this.loadingSteal = false;
              if(res.data.code===0){
                if(res.data.data.length>0){
                  this.hasSteal=true;
                  for (let i in res.data.data){
                    this.steals.push(res.data.data[i])
                  }
                }else {
                  this.hasSteal=false;
                }
                if(res.data.next!==""){
                  this.nextSteal = res.data.next
                }else {
                  this.nextSteal=""
                }
              }else {
                this.nextSteal=""
              }

            }.bind(this))
              .catch(function(err) {
                this.loadingSteal = false;
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },

          loadSteal(){
            if(this.nextSteal===""){
                this.loadingSteal = false;
                this.noMoreSteal=true;
            }else {
              this.loadingSteal = true;
              this.steal()
            }
          },
          loadStolen(){
            if(this.nextStolen===""){
              this.loadingStolen = false;
              this.noMoreStolen=true;
            }else {
              this.loadingStolen = true;
              this.Stolen()
            }
          },
          loadMessage(){
            if(this.nextMessage===""){
              this.loadingMessage = false;
              this.noMoreMessage=true;
            }else {
              this.loadingMessage = true;
              this.board()
            }
          },
          goFriendData(f){
            localStorage.setItem("friend_uid",f);
            this.$router.push({
              path: '/frienddata',
              name: 'frienddata',
              params: {
                name: 'name'
              }
            })
          },
          //回复留言
          leaveMessage(index,mid){
            let res = new RegExp("^[ ]+$");
            if(this.leavemessage===''||res.test(this.leavemessage)===true){
              this.messageMsg="回复内容不能为空";
              this.messageMsgShow=true;
            }else {
              this.messageMsg="";
              this.messageMsgShow=false;
              this.$http({
                method: "post",
                url: "/messages/reply",
                headers: {
                  "device": "android",
                  "uid": localStorage.getItem("uid"),
                  "Access-Control-Allow-Origin": "*"
                },
                data:{
                  mid:mid,
                  content:this.leavemessage
                }
              }).then(function(res) {
                this.message[index].openMessage = false;
                this.leavemessage='';
                this.$layer.msg(res.data.msg);
                this.board();
                if(res.data.code===0){
                 console.log(res.data)
                }
              }.bind(this))
                .catch(function(err) {
                  this.$layer.msg("系统异常，请稍后再试");
                }.bind(this))
            }
          },
          //跳转到好友养殖场
          goFriendFarm(id){
            this.$http({
              method: "post",
              url: "/users/plant",
              headers: {
                "device": "android",
                "uid": localStorage.getItem("uid"),
                "Access-Control-Allow-Origin": "*"
              },
              data: {
                friend_uid:id
              }
            }).then(function(res) {
              localStorage.setItem("friend_uid",id);
              if(res.data.code === 0) {

                this.$router.push({
                  path:'/friendfarm',
                  name:'friendfarm',
                  params: {
                    name: 'name'
                  }
                })
              } else {
                this.$layer.msg(res.data.msg);
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))

          },
          openLeaveMessage(index){
            this.message[index].openMessage = true;
          },
          closeLeaveMessage(index){
            this.leavemessage='';
            this.messageMsgShow=false;
            this.message[index].openMessage = false;
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
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
  .demo-container{
    background: url("../../assets/images/zhanjibeijing.png") 100% 100% no-repeat;
    width: 100%;
    margin: 0;
    display: flex;
    border-top: 1px solid transparent;
  }
  .counts{
    text-align: center;
    padding: 1.5rem 0 4rem;
    color: #fff;
    width: 50%;
  }
  .count{
    border-right: 1px solid #fff;
  }
  .contentMarginTop{
    margin-top: 56px;
  }
  .visitorContainer{
    background: #fff;
    padding: 0;
    margin:-2rem 1rem 1rem;
    box-shadow: 2px 2px 10px #E3EFF3;
    border-radius: 8px;
    border: solid 1px #E3EFF3;
  }
  .visitorTitle{
    font-size: 1.7rem;
    border-bottom: 1px solid #f5f5f5;
    padding: 1rem 1rem;
    color: #555;
  }
  .myTabs{
    border: 1px solid #BFE8F4;
    color: #09a2d6;
  }
  .myTabs:nth-child(1){
    border-radius: 5px 0 0 5px;
    border-right: none;
  }
  .myTabs:nth-child(2){
    border-radius: 0 5px 5px 0;
    border-left: none;
  }
  #muTabs .mu-tab-active{
    background: linear-gradient(to right, #38E7F8 , #0BA5D7);
  }
  .thiefTitle{
    color:#555;font-size: 1.6rem;padding: 6px 0
  }
  .sign{
    background: #09a2d6;
    width: 0.3rem;
    height:1.5rem;
    margin-right:0.5rem;
    display: inline-block;
    vertical-align: middle
  }
  .visitorRow{
    display: flex;
    padding: 0 0.5rem;
  }
  .visitorContent{
    width: 16.6%;
  }
  .visitor{
    text-align: center;
    padding:1.2rem 0.5rem;
  }
  .visitor img{
    width: 100%;
    border-radius: 50%;
  }
  .contentBody{
    margin:1rem 1rem;
    box-shadow: 2px 2px 10px #E3EFF3;
    border-radius: 8px;
    border: solid 1px #E3EFF3;
  }
  .stealerList{
    height: 6rem;
    padding: 1rem 0.5rem;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .stealerLeft{
    width: 70%;
    font-size: 1.6rem;
    color: #333;
  }
  .stealerRight{
    width: 40%;
  }
  .stealerTitle{
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;word-wrap: break-word;
  }
  .stealerText{
    color: #555;
    font-size: 1.5rem;
  }
  .stealerDate{
    font-size: small;
    color: #666;
  }
  #accordion{
    margin-left: 4rem;
  }
  .media{
    border-bottom: 1px solid #eee;
  }
  .media-heading{
    font-size: 1.6rem;
    color: #3c3c3c;
  }
  .media-left{
    border-radius: 50%;
    width: 6rem;
  }
  .media-object{
    width: 3.1rem;
    border-radius: 50%;
  }
  a{
    color: #333;
  }
  .panel{
    box-shadow: none;
    border: none;
    background: #FAFAFA;
  }
  .panel-heading{
    padding-left: 0;
  }
  .panel-title{
    font-size: 1.5rem;
  }
  .vBtn{
    border: solid 1px #23C8E8;margin-top:0.7rem;
    width: 2rem;height: 2.5rem
  }

  .leaveMessage{
    padding-left: 0;
  }
  .msgList{
    background: #F5F5F5;
    margin-left: 66px;
    padding:0.5rem 1rem;
  }
  .msgs{
    font-size: 1.5rem;
  }
  .list:last-child .mu-divider{
    display: none;
  }
  .messageMsg{
    color: #ff2424;
    font-size: small;
  }
  .noMore{
    width: 100%;
    line-height: 4rem;
    color: #666;
    text-align: center;
    background: #fff;
    margin-top: -4rem;
  }
  .allCount{
    font-size: small;
    margin-top: 1rem;
  }

</style>
