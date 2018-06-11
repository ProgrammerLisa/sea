<template>
	<div class="content">
		
		<div class="imgContainer">
			<img :src="headImg" id="img"/>
			<div>
				<div class="btn btn-default">上传</div>
				<div class="btn btn-default">取消</div>
			</div>
		
		</div>
		<canvas id="template" class="drag" :style="templateStyle"  @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end">
			
		</canvas>
	</div>
</template>

<script>
	 export default {
        name: "UploadHeadImg",
        data(){
        	 return{
              headImg:'',
              templateStyle:'',
              flags: false,
		      position: {
		        x: 0,
		        y: 0
		      },
		      nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
		      isTransverse:false
          }
        },
        mounted(){
        	let that = this;
		    $(".modal-backdrop").hide();
            let routerParams=this.$route.params.dataObj;
            let reader = new FileReader();
		    reader.readAsDataURL(routerParams);
		    reader.onload = function(e){
		        that.headImg=e.target.result;
		    };
        },
        updated(){
        	 if($('#img').width()>$('#img').height()){
		    	this.templateStyle = 'width:'+$('#img').height()+'px;height:'+$('#img').height()+'px;top:'+$('#img').offset().top+'px;left:'+($('#img').width()-$('#img').height())/2+'px'
		    $('#img').css({'width':'100%'});
		    this.isTransverse=true;
        	 }else{
		    	this.templateStyle = 'width:'+$('#img').width()+'px;height:'+$('#img').width()+'px;top:'+($('#img').height()-$('#img').width())/2+'px;left:'+$('#img').offset().left+'px'
//		    	 this.isTransverse=false;
		    }
        	
        },
        methods:{
    	 	// 实现移动端拖拽
		  down(){
		 
		    this.flags = true;
		    var touch ;
		    if(event.touches){
		        touch = event.touches[0];
		    }else {
		        touch = event;
		    }
		    this.position.x = touch.clientX;
		    this.position.y = touch.clientY;
		    this.dx = $('#template').offset().left;
		    this.dy = $('#template').offset().top;
		  },
		  move(){
		  	let that = this;
		    if(that.flags){
		      var touch ;
		      if(event.touches){
		          touch = event.touches[0];
		      }else {
		          touch = event;
		      }
		      that.nx = touch.clientX - that.position.x;
		      that.ny = touch.clientY - that.position.y;
		      that.xPum = that.dx+that.nx;
		      that.yPum = that.dy+that.ny;
		      if(that.isTransverse===true){
		      	 if(that.dx>0&&that.nx<0){
			      	that.xPum = that.dx+that.nx;
			      	$('#template').css({'left':that.xPum+'px'})
			      }else if(that.dx+$('#template').width()<$(window).innerWidth()&&that.nx>0){
			      	that.xPum =that.dx+that.nx;
			      	$('#template').css({'left':that.xPum+'px'})
			      }
		      }else{
		      	 if(that.dy>0&&that.ny<0){
			      	that.yPum = that.dy+that.ny;
			      	if($('#img').offset().top<=that.yPum){
			      		$('#template').css({'top':that.yPum+'px'})
			      	}
			      }else if(that.dy+$('#template').height()<$(window).innerHeight()&&that.ny>0){
			      	that.yPum =that.dy+that.ny;
			      	if($('#img').offset().top+$('#img').height()>=that.yPum+$('#template').height())
			      		$('#template').css({'top':that.yPum+'px'})
			      }
		      }
		     
		      
//		      阻止页面的滑动默认事件
		      document.addEventListener("touchmove",function(){
		          event.preventDefault();
		      },false);
		    }
		  },
		//鼠标释放时候的函数
		  end(){
		    this.flags = false;
		  }
        },
        
    }
</script>
	
<style>
	.imgContainer{
		width: 100vw;
		height: 100vh;
		margin: auto;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	#img{
		margin: auto;
		max-height: 100%;
	}
	.btn-default{
		padding:1rem 2rem;
		margin: 1.5rem 1rem;
	}
	#template{
		position: absolute;
		background: rgba(0,0,0,0.5);
		z-index: 999;
	}
</style>