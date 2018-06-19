<template>
  <div class="content">
    <div class="panel panel-default BlackTitle">
      <div class="panel-body">
        <span @click="goBack" class="back"> <img src="../assets/images/back.png"/></span>
        收货地址
        <router-link to="/modificationaddress" tag="span" class="copyreader"> <img src="../assets/images/copyreader.png"/></router-link>
      </div>
    </div>
    <div v-if="noAddress" class="addressNone">
      <img :src="addressNone"/>
      <p>一个地址都没有哦</p>
      <div class="newAddress">
        <router-link to="/newaddress" tag="div" class="newAddressBtn"><span class="glyphicon glyphicon-plus"></span> <span class="large">新建地址</span></router-link>
      </div>
    </div>
    <table v-else class="table address" v-for="(a,index) in myAddress">
      <tr><td class="text-left">收货人</td><td class="text-right">{{a.consignee}}</td></tr>
      <tr><td class="text-left">联系电话</td><td class="text-right">{{a.phone}}</td></tr>
      <tr><td class="text-left">收货地址</td><td class="text-right">{{a.address}}</td></tr>
      <tr>

        <td class="col-xs-6">
          <div @click="choose(index)">
            <div class="round">
              <span class="defaultRound" v-if="a.is_default"></span>
            </div>
            <span class="default">默认地址</span>
          </div>
        </td>
        <td class="col-xs-6 text-right">
          <span class="del" @click="editor(index)">
            <img src="../assets/images/editor.png"/> 编辑
          </span>
          <span class="del" @click="del(index)">
            <img src="../assets/images/del.png"/> 删除
          </span>
        </td>
      </tr>
    </table>


  </div>
</template>

<script>
  import addressNone from '@/assets/images/addressNone.png'
    export default {
      name: "Address",
      data(){
        return{
          noAddress:'',
          addressNone:addressNone,
          myAddress:[],
          mobile:{
            name:'',
            phoneNumber:'',
            address:'',
            isdefault:''
          }
        }
      },
      created(){
        const that = this;
        this.$nextTick(() => {
          for (let i = 0; i < that.myAddress.length; i++) {
            if (that.myAddress[i].isdefault) {
              $(".default").eq(i).css({color: "#09A2D6"}).text("已设为默认地址")
            }
          }
        })
      },
      mounted(){
        this.$http({
          method: "get",
          url: "/api/users/delivery_address",
          headers:{"device":"android","uid":this.uid,"Access-Control-Allow-Origin":"*"},
          data: {}
        }).then(function(res){
          if(res.data.code==0){
            if(JSON.stringify(res.data.data) == "{}"){
              this.noAddress = true
            }else {
              this.noAddress =  false;
              // this.myAddress.push(
              //   {name:res.data.data.consignee,phoneNumber:res.data.data.phone,address:res.data.data.address,isdefault:res.data.data.isdefault},
              // )
              let myJson = res.data.data;
              for(var p in myJson){//遍历json对象的每个key/value对,p为key
                console.log(myJson[p]);
                this.myAddress.push(myJson[p])
              }
            }
          }else {
            this.$layer.msg(res.data.msg);
          }
        }.bind(this))
          .catch(function(err){
            console.log(err)
          }.bind(this))
      },
      methods:{
        choose(index){
          const that = this;
          for (var i=0;i<that.myAddress.length;i++){
            that.myAddress[i].isdefault = false;
            $(".default").css({color:"#555"}).text("默认地址")
          }
          that.myAddress[index].isdefault = true;
          $(".default").eq(index).css({color:"#09A2D6"}).text("已设为默认地址")
        },
        editor(index){

        },
        del(index){

        },
        goBack(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  .content{
    overflow-x: hidden;
    color: #666;
    padding-bottom: 6rem;
    background-color: #f5f5f5;
    width: 100vw;
  }

  .panel{
    border:none;
    border-radius: 0;
  }
  .panel-body {
    padding:0 10px;
  }
  .BlackTitle{
    text-align: center;
    letter-spacing: 0.05rem;
    color: #555;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    height: 4.1rem;
    line-height: 4.1rem;
  }
  .back{
    float: left;
  }
  .back img{
    height: 2.5rem;
  }
  .table{
    margin-bottom: 1rem;
  }
  .copyreader{
    float: right;
  }
  .copyreader img{
    height: 2.5rem;
   }
  .address{
    background: #fff;
  }
  .address tr{
    line-height: 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .address td{
    padding: 0 1.5rem;
  }
  .text-left{
    color: #555;
    font-size: 1.6rem;
  }
  .round{
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.1rem solid #aaa;
    margin-right: 0.5rem;
    vertical-align: middle;
    text-align: center;
    line-height: 0.8rem;
  }
  .defaultRound{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: #09A2D6;
  }
  .del:first-child{
    margin-right: 1rem;
  }
  .del img{
    width: 2rem;
  }
  .addressNone{
    text-align: center;
    padding-top: 18vh;
    color: #999;
  }
  .addressNone img{
    width: 40%;
    margin-bottom: 1rem;
  }
  .newAddress{
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    width: 100%;
    padding: 1rem;
  }
  .newAddressBtn{
    width: 90%;
    background: #09a2d6;
    color: #f5f5f5;
    padding: 0.5rem;
    border: none;
    margin: auto;
  }
  .large{
    font-size: larger;
  }
</style>
