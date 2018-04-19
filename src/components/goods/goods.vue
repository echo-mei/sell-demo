<template>
  <div class="goods">
  	<div class="menu-wrapper">
  		<ul class="menu-main">
  			<li v-for="item in goods" class="menu-item">
  				<span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
  				{{item.name}}</span>
			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper"></div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: {},
      classMap: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    // GET /someUrl
    this.$http.get('/api/goods').then(response => {
      // get body data
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
      }
    }, response => {
      // error callback
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../common/less/mixin.less";
.goods{
	display:flex;
	position:absolute;
	top:175px;
	bottom:46px;
	width:100%;
	overflow:hidden;
	.menu-wrapper{
		flex:0 0 80px;
		width:80px;
		background:#f3f5f7;
		.menu-main{
			.menu-item{
				display: table;
				margin:0 12px;
				height:54px;
				width:56px;	
				line-height:14px;
				border-bottom:1px solid rgba(7,17,27,.1);
				.icon{
	              display:inline-block;
	              vertical-align:middle;
	              width:16px;
	              height:16px;
	              background-size: 100%;

	              &.decrease{
		            .bg-image('decrease_3');
		          }
		          &.discount{
		            .bg-image('discount_3');
		          }
		          &.guarantee{
		            .bg-image('guarantee_3');
		          }
		          &.invoice{
		            .bg-image('invoice_3');
		          }
		          &.special{
		            .bg-image('special_3');
		          }
	            }
				.text{
					display:table-cell;
					vertical-align:middle;
					font-size:12px;
					font-weight:200;
					text-align: left;
					color:rgb(77,85,93)
				}
			}
		}
	}
	.foods-wrapper{
		flex:1;
	}
}
</style>
