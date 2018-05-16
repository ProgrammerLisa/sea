<template>
  <div class="content">
    <div class="myNav">
      <div class="container">
        <div class="row">
          <div class="col-xs-6  nav-left">
            <router-link to="Home" tag="div" class="nav-item">
              <span class="glyphicon glyphicon-cd"></span>
              星球基地
            </router-link>
          </div>
          <div class="col-xs-6">
            <router-link to="Login" tag="div"  class="nav-item">
              <span class="glyphicon glyphicon-user"></span>
              我的基地
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>

</template>

<script>
  export default {
    name: "HelloWorld"
  }

</script>

<style scoped>
  .content{
    margin-bottom: 60px;
  }
  .myNav{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    z-index: 99;
  }
  .nav-item{
    display: flex;
    flex-direction:column;
    text-align: center  ;
  }
  .nav-item span{
    margin-bottom: 5px;
  }
  .nav-left{
    border-right: 1px solid #ddd;
  }
</style>

