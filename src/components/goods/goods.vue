<template>
  <div class="goods">
  	<div class="menu-wrapper" ref="menuWrapper">
  		<ul class="menu-main">
  			<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIdex === index}" @click="selectMenu(index)">
  				<span class="text">
  					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
  				{{item.name}}</span>
			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper" ref="foodsWrapper">
  		<ul class="foods-main">
  			<li v-for="item in goods" class="food-item food-item-hook">
  				<h3 class="food-title">{{item.name}}</h3>
  				<ul>
  					<li v-for="food in item.foods" class="food-cont">
	  					<div class="avatar">
	        				<img :src="food.image">
	      				</div>
	      				<div class="content">
	        				<div class="name">{{food.name}}</div>
	        				<div v-show="food.description!=''" class="description">{{food.description}}</div>
	        				<div class="sales-performance">
	        					<span class="salenum">月售{{food.sellCount}}份</span>
	        					<span class="rating">好评率{{food.rating}}%</span>
	        				</div>
	        				<div class="price">
	        					<span class="nowprice">￥{{food.price}}</span>
	        					<span class="oldprice" v-show="food.oldPrice!=''">￥{{food.oldPrice}}</span>
	        				    <span class="add"><i class="icon-add_circle"></i></span>
	        				</div>
	        				<div class="cartcontrol-wrapper">
	        					<cartcontrol :food="food"></cartcontrol>
	        				</div>
	        			</div>
	  				</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'

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
      classMap: [],
      listHeight: [],
      srcollY: 0
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
        this._initScroll()
        this._calculateHeight()
      }
    }, response => {
      // error callback
    })
  },
  computed: {
    currentIdex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.srcollY > height1 && this.srcollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let selectFoods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            selectFoods.push(food)
          }
        })
      })
      return selectFoods
    }
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.$nextTick(() => {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true})

        this.foodScroll.on('srcoll', (pos) => {
          this.srcollY = Math.abs(Math.round(pos.y))
          console.log(this.srcollY)
        })
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i]
        this.listHeight.push(height)
      }
    }
  },
  components: {
    'shopcart': shopcart,
    'cartcontrol': cartcontrol
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
				height:54px;
				width:56px;	
				padding:0 12px;
				line-height:14px;
				
				&.current{
					position:relative;
					z-index:10;
					background:#ffffff;
					margin-top:-1px;
					font-weight:700;
					.text{
						border:none;
					}
				}
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
					color:rgb(77,85,93);
					border-bottom:1px solid rgba(7,17,27,.1);
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
					display:flex;
					margin:0 18px;
					padding:18px 0;
					font-size:0;
					border-bottom:1px solid rgba(7,17,27,.1);
					text-align:left;

					&::last-of-type{border:none;}

					.avatar{
						flex:0 0 57px;
						width:57px;
						height:57px;

						img{
							width:100%;
							height:100%;
						}
					}
					.content{
						position:relative;
						flex:1;
						margin-left:10px;
						text-align:left;
					
						.name{
							font-size:14px;
							line-height:14px;
							margin-top:2px;
							color:rgb(7,17,27);
						}
						.description{
							font-size:10px;
							line-height:14px;
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
						.price{
							.nowprice{
								font-size:14px;
								line-height:24px;
								font-weight:700;
								color:rgb(240,20,20);
								margin-right:8px;
							}
							.oldprice{
								font-size:10px;
								line-height:24px;
								color:rgb(147,153,159);
								font-weight:700;
								text-decoration: line-through;
							}
							.add{
								display:inline-block;
							}
						}
						.cartcontrol-wrapper{
							position:absolute;
							right:-10px;
							bottom:-10px;
						}
					}
				}
			}
		}
	}
}
</style>
