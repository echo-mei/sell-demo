<template>
  <div class="goods">
  	<div class="menu-wrapper">
  		<ul class="menu-main">
  			<li v-for="item in goods" class="menu-item">
  				<span class="text">
  					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
  				{{item.name}}</span>
			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper">
  		<ul class="foods-main">
  			<li v-for="item in goods" class="food-item">
  				<h3 class="food-title">{{item.name}}</h3>
  				<div v-for="food in item.foods" class="food-cont">
  					<div class="avatar">
        				<img width="64"  height="64" :src="food.image">
      				</div>
      				<div class="content">
        				<div class="name">
        					{{food.name}}
        				</div>
        				<div v-show="food.description!=''" class="description">
        					{{food.description}}
        				</div>
        				<div class="sales-performance">
        					<span class="salenum">月售{{food.sellCount}}份</span>
        					<span class="rating">好评率{{food.rating}}%</span>
        				</div>
        				<div class="prince">
        					<span class="nowprince">￥{{food.price}}</span>
        					<span class="oldprince" v-show="food.oldPrice!=''">￥{{food.oldPrice}}</span>
        				</div>
        			</div>
  				</div>
  			</li>
  		</ul>
  	</div>
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

		.foods-main{
			.food-item{
				.food-title{
					width:100%;
					height:26px;
					padding-left:14px;
					background-color:#f3f5f7;
					border-left:2px solid #d9dde1;
					font-size:12px;
					line-height:24px;
					font-weight:700px;
					color:rgb(147,153,159);
					text-align:left;
				}

				.food-cont{
					margin:0 18px;
					padding:18px 0;
					font-size:0;
					border-bottom:1px solid rgba(7,17,27,.1);
					text-align:left;

					&::last-child{border:none;}

					.avatar{
						display:inline-block;
						vertical-align:top;
					}
					.content{
						display:inline-block;
						margin-left:10px;
						text-align:left;
						vertical-align:top;

						.name{
							font-size:14px;
							line-height:14px;
							margin-top:2px;
							color:#333;
						}
						.description{
							font-size:10px;
							line-height:10px;
							margin-top:8px;
							color:rgb(147,153,159);
						}
						.sales-performance{
							font-size:10px;
							line-height:10px;
							color:rgb(147,153,159);
							margin:8px 0;

							.salenum{margin-right:12px;}
						}
						.prince{
							.nowprince{
								font-size:14px;
								line-height:24px;
								font-weight:700;
								color:rgb(240,20,20);
								margin-right:8px;
							}
							.oldprince{
								font-size:10px;
								line-height:24px;
								color:rgb(147,153,159);
								font-weight:700;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
}
</style>
