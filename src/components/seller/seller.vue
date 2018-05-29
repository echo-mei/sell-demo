<template>
<div class="seller-wrap" ref="sellerWrap">
  <div class="seller">
    <div class="seller-cont seller-info">
	   <h1 class="title">{{seller.name}}</h1>
	   <div class="seller-favtor">	   
	   	  <i class="icon-favorite"></i>
	   	  <p class="text">点击收藏</p>
	   </div>
	   <div class="star-wrap">
          <star :size="36" :score="seller.score"></star>
          <span class="text">月售{{seller.sellCount}}单</span>
       </div>
       <div class="seller-detail">
       	<div class="seller-item"><h2 class="title">起送价</h2><h3 class="content">{{seller.minPrice}}<span class="tip">元</span></h3></div>
       	<div class="seller-item"><h2 class="title">商家配送</h2><h3 class="content">{{seller.deliveryPrice}}<span class="tip">元</span></h3></div>
       	<div class="seller-item"><h2 class="title">平均配送时间</h2><h3 class="content">{{seller.deliveryTime}}<span class="tip">分钟</span></h3></div>
       </div>
    </div>
    <div class="seller-cont seller-bulletin">
       <h1 class="title">公告与活动</h1>
       <p class="bulletin-detail">{{seller.bulletin}}</p>
       <ul v-if="seller.supports" class="discount-wrapper">
        <li v-for="item in seller.supports" class="support-item">
          <span :class="classMap[item.type]" class="icon"></span>
          <span class="des">{{item.description}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script type="text/babel">
import BScroll from 'better-scroll'
import star from '../star/star'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  created () {
    this._initScroll()
  },
  computed: {
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.sellerWrap, {click: true})
        } else {
          this.sellerScroll.refresh()
        }
      })
    }
  },
  components: {
    'star': star
  }
}
</script>

<style scoped lang="less">
@import "../../common/less/mixin.less";
.seller-wrap{
  position: absolute;
  top: 175px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  background:#f3f5f7;
  text-align:left;

  .seller-cont{
    background:#fff;
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
    margin-bottom:16px;
    padding:18px;

     .title{
    	font-size:14px;
    	line-height:14px;
    	color:rgb(7,17,27);
    	margin-bottom:8px;
    }
  }
  .seller-info{
    position:relative;

    .seller-favtor{
    	position:absolute;
    	right: 18px;
    	top: 18px;
    	text-align: center;
    	.icon-favorite{
    		margin-bottom:4px;
    		font-size:24px;
    		line-height:24px;
    		color:rgb(147,153,159);
    	}
    	.text{
    		font-size:10px;
    		line-height:10px;
    		color:rgb(77,85,93);
    	}
    }
    .star-wrap{
    	margin-bottom:18px;
    	.text{
    		display: inline-block;
    		vertical-align: middle;
    		font-size:10px;
    		line-height:18px;
    		color:rgb(77,85,93);
    	}
    }
    .star-wrap /deep/.itemClass{
		margin-right:6px;
	}
    .seller-detail{
    	display:flex;
    	border-top:1px solid rgba(7,17,27,.1);

    	.seller-item{
    		flex:1;
    		text-align:center;
    		margin-top:18px;

    		.title{
    			font-size:10px;
    			line-height:10px;
    			color:rgb(147,153,159);
    			margin-bottom:4px;
    		}
    		.content{
    			font-size:24px;
    			line-height:24px;
    			color:rgb(7,17,27);
    			font-weight:200;

    			.tip{
    				font-size:10px;
    			}
    		}
    	}
    }
  }

  .seller-bulletin{
  	.bulletin-detail{
  		padding:0 12px;
  		font-size:12px;
  		line-height:24px;
  		font-weight:200;
  		color:rgb(240,20,20);
  	}
  	.discount-wrapper{
      margin:24px 12px;
      font-size:0;
      .support-item{
        text-align:left;
        padding:16px;
        border-top:1px solid rgba(7,17,27,.1);
        .icon{
          display:inline-block;
          vertical-align:middle;
          width:16px;
          height:16px;
          background-size: 100%;
          margin-right: 6px;
          margin-left:12px;
        }
        .decrease{
          .bg-image('decrease_3');
        }
        .discount{
          .bg-image('discount_3');
        }
        .guarantee{
          .bg-image('guarantee_3');
        }
        .invoice{
          .bg-image('invoice_3');
        }
        .special{
          .bg-image('special_3');
        }
        .des{
          vertical-align:middle;
          font-size:12px;
          font-weight:200;
          color:rgb(7,17,27);
          line-height:12px;
        }
      }          
    }
  }

}

</style>
