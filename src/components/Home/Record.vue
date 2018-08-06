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
            <div class="count">{{mycount}}颗</div>
          </div>
        </mu-col>
        <mu-col span="6" class="counts">
          <div class="grid-cell">
            <h4>被偷数量</h4>
            <div class="count">{{becount}}颗</div>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <div class="visitorContainer">
      <div class="visitorTitle">
        <span class="sign"></span>到访小偷
      </div>
      <mu-row>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
        <mu-col span="2"><div class="grid-cell visitor"><img :src="img"/></div></mu-col>
      </mu-row>
    </div>
    <div class="contentMarginTop">
      <mu-container>
        <mu-tabs :value.sync="active2" color="#fff" indicator-color="#09a2d6" full-width >
          <mu-tab style="color:#555">最新动态</mu-tab>
          <mu-tab style="color:#555">小偷留言</mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active2 === 0">
          <mu-paper :z-depth="0" class="demo-list-wrap">
            <mu-list textline="three-line" class="stealerList">
              <div v-for="(s,index) in stealer">
                <mu-list-item avatar>
                  <mu-list-item-content class="contentLeft">
                    <mu-list-item-title style="margin-bottom: 0.5rem">{{s.name}} <span style="color: rgba(0, 0, 0, .6)">偷取了你的珍珠</span></mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span style="font-size: small;">{{s.date}}</span>
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
        </div>
        <div class="demo-text" v-if="active2 === 1">
          <mu-paper :z-depth="0" class="demo-list-wrap">
            <mu-list toggle-nested textline="three-line">
              <div v-for="(m,index) in message">
                <mu-list-item style="padding: 1rem 0" button nested :open="open === 'send'+index" @toggle-nested="open = arguments[0] ? 'send+index' : ''">
                  <mu-list-item-action>
                    <mu-avatar>
                      <img :src="img">
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>Sent mail </mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span style="font-size: small;">{{m.date}}</span>
                    </mu-list-item-sub-title>
                    <mu-list-item-title style="margin-top: 0.5rem"><span style="float: left" v-show="m.msg.length!=0"> <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down" color="#888"></mu-icon></span> {{m.msgTitle}}</mu-list-item-title>

                  </mu-list-item-content>
                  <mu-list-item-action>
                    <mu-button small color="#fff" textColor="#09a2d6" flat style="border: solid 1px #09a2d6">回复</mu-button>
                  </mu-list-item-action>

                  <mu-list-item-content button :ripple="false" slot="nested" v-for="(msg,item) in m.msg" :key="item" class="msgList">
                    <div class="msgs"><span style="color: #09a2d6">{{msg.title}}</span>：{{msg.content}}</div>
                  </mu-list-item-content>
                </mu-list-item>
                <mu-divider></mu-divider>
              </div>
            </mu-list>
          </mu-paper>
        </div>

      </mu-container>
    </div>
  </div>
</template>

<script>
  import back from '@/assets/images/back.png'
  import backs from '@/assets/images/backs.png'
  import img from '@/assets/images/test/timg.jpg'
    export default {
        name: "Record",
        data(){
          return{
            masrc: back,
            mycount:1.11,
            becount:1.11,
            img:img,
            active2: 0,
            open: '',
            stealer:[
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''},
              {name:'鱼弟',date:'2018-07-22 18:33:46',revenge:'',id:''}
            ],
            message:[
              {name:'鱼弟',date:'2018-07-22 18:33:46',msgTitle:'哈哈哈，我来看一下你',msg:[]},
              {name:'鱼弟',date:'2018-07-22 18:33:46',msgTitle:'哈哈哈，我来看一下你',msg:[{title:'鱼弟',content:'哈哈哈，我来看一下你,哈哈哈，我来看一下你'},{title:'鱼弟',content:'哈哈哈，我来看一下你'},{title:'鱼弟',content:'哈哈哈，我来看一下你'}]},
              {name:'鱼弟',date:'2018-07-22 18:33:46',msgTitle:'哈哈哈，我来看一下你',msg:[{title:'鱼弟',content:'哈哈哈，我来看一下你'},{title:'鱼弟',content:'哈哈哈，我来看一下你'}]},
            ]
          }
        },
        methods:{
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
  }
  .contentRight  {
    width: 40%;
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
</style>
