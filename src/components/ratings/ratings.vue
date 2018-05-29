<template>
<div class="ratings-wrap" ref="ratingsWrap">
  <div class="ratings">
    <div class="ratings-cont mark">
	    <div class="mark-left">
	     	<h1 class="score">{{seller.score}}</h1>
	     	<h1 class="score-text">综合评分</h1>
	     	<p class="score-rate">高于周边商家{{seller.rankRate}}%</p>
	    </div>
	    <div class="mark-right">
	     	<div class="score">
	     		<span class="text">服务态度</span>
		     	<div class="star-wrap">
		          <star :size="36" :score="seller.serviceScore"></star>
		      </div>
	      </div>
        <div class="score">
        	<span class="text">食品评分</span>
	     	  <div class="star-wrap">
	          <star :size="36" :score="seller.foodScore"></star>
	        </div>
        </div>
	      <div class="score">
	        	<span class="text">送达时间</span>
		     	  <div class="star-wrap delivery-time">{{seller.deliveryTime}}</div>
		    </div>
	  	</div>
    </div>
    <div class="ratings-cont">
      <ratingslist :ratings="ratings"></ratingslist>
    </div>
  </div>
</div>
</template>
<script type="text/babel">
import BScroll from 'better-scroll'
import ratingslist from '../ratingslist/ratingslist'
import star from '../star/star'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: []
    }
  },
  created () {
    // GET /someUrl
    this.$http.get('/api/ratings').then(response => {
      // console.log(1)
      // get body data
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data

        this._initScroll()
      }
    }, response => {
      // error callback
    })
  },
  computed: {
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (!this.ratingsScroll) {
          this.ratingsScroll = new BScroll(this.$refs.ratingsWrap, {click: true})
        } else {
          this.ratingsScroll.refresh()
        }
      })
    }
  },
  components: {
    'ratingslist': ratingslist,
    'star': star
  }
}
</script>

<style scoped lang="less">
.ratings-wrap{
  position: absolute;
  top: 175px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  background:#f3f5f7;
  text-align:left;

  .ratings-cont{
    background:#fff;
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
    margin-bottom:16px;
    padding:18px;
  }
  .mark{
  	display:flex;
  	border-top:none;

  	.mark-left{
  	  flex:0 0 120px;
  	  width:120px;
  	  border-right:1px solid rgba(7,17,27,.1);
  	  text-align:center;

  	  .score{
  	  	font-size:24px;
  	  	color:rgb(255,153,0);
  	  	line-height:28px;
  	  	margin-bottom:6px;
  	  }
  	  .score-text{
  	  	font-size:12px;
  	  	line-height:12px;
  	  	color:rgb(7,17,27);
  	  	margin-bottom:8px;
  	  }
  	  .score-rate{
  	  	font-size:10px;
  	  	line-height:10px;
  	  	color:rgb(147,153,159);
  	  }
  	}
  	.mark-right{
      flex:1;
      padding-left:24px;

      .score{
      	font-size:0;
      	margin-bottom:8px;
      	&:last-of-type{margin-bottom:0;}

      	.text{
      		display:inline-block;
      		font-size:12px;
      		line-height:18px;
      		color:rgb(7,17,27);
      		vertical-align: middle;
      	}

      	.star-wrap{
      		display:inline-block;
      		vertical-align: middle;
      		margin-left:12px;
      	}
      	.star-wrap /deep/.itemClass{
  			margin-right:4px;
  		}
      	.delivery-time{
      		font-size:12px;
      		line-height:18px;
      		color:rgb(147,153,159);
      	}

      }
  	}
  }
}

</style>
