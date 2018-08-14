<template>
  <div class="content">
    <mu-appbar class="myNavTitle" color="#fff" textColor="#333" z-depth="0">
      <mu-button icon slot="left" @click="goBack" @touchstart="evers" @touchend="lat" class="getBack">
        <img :src="masrc"/>
      </mu-button>
      <span class="navTitleText">我的战绩</span>
    </mu-appbar>
    <mu-container class="demo-container">
      <mu-row gutter>
        <mu-col span="6" class="counts">
          <div class="grid-cell">
            <h4>今日偷取</h4>
            <div class="count">{{mycount}} 颗</div>
          </div>
        </mu-col>
        <mu-col span="6" class="counts">
          <div class="grid-cell">
            <h4>被偷数量</h4>
            <div class="count">{{becount}} 颗</div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <div class="visitorContainer">
      <div class="visitorTitle">
        <span class="sign"></span>到访小偷
      </div>
      <mu-row v-if="hasVisitor">
        <mu-col span="2" v-for="(v,index) in visitor" :key="index"><div class="grid-cell visitor"><img :src="v.avatar"/></div></mu-col>
      </mu-row>
      <div class="text-center" v-else style="padding: 1rem;color: #555;font-size: 1.6rem">暂无访客</div>
    </div>
    <div class="contentMarginTop">
      <mu-container>
        <mu-tabs :value.sync="active2" color="#fff" indicator-color="#09a2d6" full-width >
          <mu-tab style="color:#555;font-size: 1.6rem">最新动态</mu-tab>
          <mu-tab style="color:#555;font-size: 1.6rem">小偷留言</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active2 === 0">
          <mu-paper :z-depth="0" v-if="hasNews" class="demo-list-wrap">
            <mu-list class="stealerList">
              <div v-for="(s,index) in stealer" class="list">
                <mu-list-item avatar>
                  <mu-list-item-content class="contentLeft">
                    <mu-list-item-title style="margin-bottom: 0.5rem">{{s.nickname}} <span style="font-size:1.5rem;color: rgba(0, 0, 0, .6)">偷取了你的珍珠</span></mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span style="font-size: small;">{{s.stolen_time}}</span>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
                  <mu-list-item-action class="contentRight">
                    <mu-button small color="#fff" textColor="#09a2d6" flat style="border: solid 1px #09a2d6">去复仇</mu-button>
                  </mu-list-item-action>
                </mu-list-item>
                <mu-divider></mu-divider>
              </div>
            </mu-list>
          </mu-paper>
          <div v-else class="text-center" style="padding: 5rem;font-size: 1.6rem;color:#777">暂无最新动态</div>
        </div>
        <div class="demo-text" v-if="active2 === 1">
          <mu-paper :z-depth="0" v-if="hasMessage" class="demo-list-wrap">
            <mu-list toggle-nested textline="three-line" class="mu-list">
              <div v-for="(m,index) in message" class="list">
                <mu-list-item style="padding: 1rem 0" button nested :open="open === 'send'+index" @toggle-nested="open = arguments[0] ? 'send+index' : ''">
                  <mu-list-item-action>
                    <mu-avatar>
                      <img :src="m.from_user_avatar">
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{m.from_user}}</mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span style="font-size: small;">{{m.created_at}}</span>
                    </mu-list-item-sub-title>
                    <mu-list-item-title style="margin-top: 0.5rem">
                      <span style="float: left" v-show="m.reply.length!=0">
                        <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down" color="#888"></mu-icon>
                      </span> {{m.content}}
                    </mu-list-item-title>

                  </mu-list-item-content>
                  <mu-list-item-action>
                    <mu-button small color="#fff" textColor="#09a2d6" flat @click="openLeaveMessage" style="border: solid 1px #09a2d6">回复</mu-button>
                    <mu-dialog width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openMessage">
                      <div style="height: 110px">
                        <mu-text-field type="text" label="回复小偷" v-model="leavemessage" placeholder="请输入回复内容"  full-width style="margin-bottom: 0;"></mu-text-field>
                        <mu-slide-top-transition v-show="messageMsgShow">
                          <div class="mu-transition-box mu-inverse" style="color: #EF5350;font-size: small" v-show="messageMsgShow">{{messageMsg}}</div>
                        </mu-slide-top-transition>
                      </div>

                      <mu-button slot="actions" flat color="primary" @click="leaveMessage(m.mid)">发送 </mu-button>
                      <mu-button slot="actions" flat color="#555" @click="closeLeaveMessage">取消</mu-button>

                    </mu-dialog>
                  </mu-list-item-action>

                  <mu-list-item-content button :ripple="false" slot="nested" class="msgList" v-show="m.hasMsg">
                    <div class="msgs" v-for="(r,item) in m.reply"><span style="color: #09a2d6">我</span>：{{r[1]}}</div>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider class="mu-divider"></mu-divider>
              </div>
            </mu-list>
          </mu-paper>
          <div v-else class="text-center" style="padding: 5rem;font-size: 1.6rem;color:#777">暂无留言</div>
        </div>

      </mu-container>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
    export default {
        name: "Record",
        data(){
          return{
            masrc: back,
            mycount:'',
            becount:'',
            hasVisitor:false,
            hasNews:false,
            hasMessage:false,
            active2: 0,
            open: '',
            visitor:[],
            stealer:[],
            message:[],
            openMessage:false,
            leavemessage:'',
            messageMsg:'',
            messageMsgShow:false
          }
        },
        mounted(){
          this.$nextTick(function () {
            this.gain();
            this.board();
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
                this.mycount=res.data.data.today_steal;
                this.becount=res.data.data.today_stolen;
              }
              //访客（最多六人）
              if(res.data.data.visitor_list.length!==0){
                this.hasVisitor=true;
                this.visitor=res.data.data.visitor_list;
              }
              //最新动态
              if(res.data.data.news.length!==0){
                this.hasNews=true;
                this.stealer=res.data.data.news
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
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
              if(res.data.data.length!==0){
                this.hasMessage=true;
                this.message=res.data.data;
                for (let i in this.message) {
                  if(this.message[i].reply.length!==0){
                    this.message[i].hasMsg=true;
                  }
                }
              }
            }.bind(this))
              .catch(function(err) {
                this.$layer.msg("系统异常，请稍后再试");
              }.bind(this))
          },
          openLeaveMessage(){
            this.openMessage = true;
          },
          closeLeaveMessage(){
            this.leavemessage='';
            this.openMessage = false;
          },
          leaveMessage(mid){
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
                this.openMessage = false;
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
    background: #f5f5f5;
    width: 88%;
    margin: 1rem 6%;
    padding: 0
  }
  .counts{
    background: #fff;
    box-shadow: 2px 2px 10px #E3EFF3;
    text-align: center;
    padding: 2.5rem 0;
    color: #333;
  }
  .count{
    color: #09a2d6;
  }
  .visitorContainer{
    background: #fff;
    padding: 0 5%;
  }
  .visitorTitle{
    font-size: 1.7rem;
    border-bottom: 1px solid #f5f5f5;
    padding: 1rem 0;
  }
  .sign{
    background: #09a2d6;
    width: 0.3rem;
    height:1.5rem;
    margin-right:0.5rem;
    display: inline-block;
    vertical-align: middle
  }
  .visitor{
    text-align: center;
    padding:1.2rem 5px;
  }
  .visitor img{
    width: 100%;
    border-radius: 50%;
  }
  .contentLeft{
    width: 60%;
    margin: 0.5rem 0;
  }
  .mu-flat-button.mu-button-small {
    font-size: 13px;
    height: 35px;
  }
  .mu-flat-button{
    min-width: 66px;
  }
  .stealerList{
    padding-bottom: 0;
  }
  .mu-divider{
    background: #eee;
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
</style>
