<template>
    <div class="content">
      <iframe scrolling="no" :src="url" width="100%" height="100%"></iframe>
    </div>

</template>

<script>
    export default {
        name: "Advertisement",

      data () {
        return {
          url: localStorage.getItem("post_id")
        }
      },
      mounted () {
        let that = this;
        mui.back = function(){
          that.$router.go(-1);
        };
      },
      methods: {
      }
    }
</script>

<style scoped>
  .content{
    height: 100vh;
    overflow: hidden;
  }
  iframe{

  }
</style>
