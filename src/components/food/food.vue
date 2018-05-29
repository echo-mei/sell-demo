<template>
<div class="food-wrap" ref="foodDetail" v-show="showFood">
  <div class="food">
    <div class="food-cont">
      <div class="title-avatar">
        <img :src="selectFood.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="title-content">
        <div class="name">{{selectFood.name}}</div>
        <div class="sales-performance">
          <span class="salenum">月售{{selectFood.sellCount}}份</span>
          <span class="rating">好评率{{selectFood.rating}}%</span>
        </div>
        <div class="price">
          <span class="nowprice">￥{{selectFood.price}}</span>
          <span class="oldprice" v-show="selectFood.oldPrice!=''">￥{{selectFood.oldPrice}}</span>
        </div>
        <div class="add-cart-wrap">
          <cartcontrol :food="selectFood" v-if="selectFood.count>0" v-on:add-cart="addCart($event)" v-on:remove-cart="removeCart($event)"></cartcontrol>
          <div class="add-cart" type="button" v-else="!selectFood.count || selectFood.count===0" @click.stop.prevent="addCart($event)">加入购物车</div>
        </div>
      </div>
    </div>
    <div class="food-cont padding18" v-show="selectFood.info!=''">
      <div class="cont-title">商品介绍</div>
      <p class="desc-detail">{{selectFood.info}}</p>
    </div>
    <div class="food-cont padding18">
      <div class="cont-title">商品评价</div>
      <ratingslist :ratings="selectFood.ratings"></ratingslist>
    </div>
  </div>
</div>
</template>
<script type="text/babel">
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingslist from '../ratingslist/ratingslist'

export default {
  props: {
    selectFood: {
      type: Object
    }
  },
  data () {
    return {
      showFood: false
    }
  },
  computed: {
    getRatings () {
      var ratings = []
      if (this.fiter === 1) {
        ratings = this.selectFood.ratings.filter(function (item) {
         return item.rateType === 0
        })
      } else if (this.fiter === 2) {
        ratings = this.selectFood.ratings.filter(function (item) {
         return item.rateType === 1
        })
      } else if (this.fiter === 3) {
        ratings = this.selectFood.ratings.filter(function (item) {
         return item.text !== ''
        })
      } else {
        ratings = this.selectFood.ratings
      }
      return ratings
    }
  },
  methods: {
    show () {
      this.showFood = true
      this._initScroll()
    },
    hide () {
      this.showFood = false
    },
    showRatingsAll () {
      this.fiter = 0
    },
    showRatingsTJ () {
      this.fiter = 1
    },
    showRatingsTC () {
      this.fiter = 2
    },
    lookOnlyText () {
      if (this.fiter === 3) {
        this.fiter = 0
      } else {
        this.fiter = 3
      }
    },
    addCart (obj) {
      console.log('addCart')
      if (!event._constructed) {
        return
      }
      this.$emit('add-cart', this.selectFood)
    },
    removeCart (event) {
      this.$emit('remove-cart', this.selectFood)
    },
    _initScroll () {
      this.$nextTick(() => {
        if (!this.foodDetailScroll) {
          this.foodDetailScroll = new BScroll(this.$refs.foodDetail, {click: true})
        } else {
          this.foodDetailScroll.refresh()
        }
      })
    }
  },
  components: {
    'cartcontrol': cartcontrol,
    'ratingslist': ratingslist
  }
}
</script>

<style scoped lang="less">
.food-wrap{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  background:#f3f5f7;
  text-align:left;

  .food-cont{
    background:#fff;
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
    margin-bottom:16px;
    .title-avatar{
      position:relative;
      width:100%;
      img{
        width:100%;
      }
      .back{
        position:absolute;
        top:0;
        left:0;
        padding:10px;
        font-size:14px;
        color:#fff;
      }
    }
    .title-content{
      position:relative;
      padding:18px;

      .name{
        font-size:14px;
        line-height:14px;
        font-weight:700;
        color:rgb(7,17,27);
        margin-bottom:8px;
      }
      .sales-performance{
        font-size:10px;
        line-height:10px;
        color:rgb(147,153,159);
        margin-bottom:18px;

        .salenum{
          margin-right:12px;
        }
      }
      .price{
        .nowprice{
          font-size:14px;
          font-weight:700;
          line-height:24px;
          color:rgb(240,20,20);
          margin-right:8px;
        }
        .oldprice{
          font-size:10px;
          font-weight:700;
          line-height:24px;
          color:rgb(147,153,159);
          text-decoration: line-through;
        }
      }
      .add-cart-wrap{
        position:absolute;
        bottom:18px;
        right:18px;
        .add-cart{
          width:74px;
          height:24px;
          border:none;
          background:rgb(0,160,220);
          border-radius:12px;
          font-size:10px;
          line-height:24px;
          text-align:center;
          color:#fff;
        }
      }
    }

    .cont-title{
      font-size: 14px;
      line-height: 14px;
      margin-top: 2px;
      color: #07111b;
      margin-bottom:6px;
    }
    .desc-detail{
      padding:0 8px;
      font-size:12px;
      font-weight:200;
      color:rgb(77,85,93);
      line-height:24px;
    }

  }
  .padding18{padding:18px;}
}

</style>
