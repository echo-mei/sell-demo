<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="detailChange">
        <div class="logo-wrapper">
          <div class="logo" :class="{active:selectFoods.length>0}">
            <i class="icon-shopping_cart"></i>
            <span class="num" v-if="totalCount>0">{{totalCount}}</span>
          </div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{active:totalPrice>=minPrice}">
        {{payDesc}}
      </div>
    </div>
    <div class="cart-detail-wrap" v-show="detailShow" >
     <div class="cart-detail-main">
      <div class="title">购物车<button class="clear" @click="clearCart">清空</button></div>
      <div class="cart-detail" ref="cartDetail">
        <ul class="cart-detail-ul">
          <li v-for="food in selectFoods" class="cart-detail-item">
            <span class="text">{{food.name}}</span>
            <span class="price">￥{{food.price*food.count}}</span>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" v-on:add-cart="addCart(food)" v-on:remove-cart="removeCart(food)"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
     </div>
    </div>
    <div class="cart-mask" v-show="detailShow" @click="detailChange"></div>
  </div>
 
</template>
<script type="text/babel">
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'

export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 30,
          count: 2
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isShowDetail: false
    }
  },
  computed: {
    totalPrice () {
      let sum = 0
      this.selectFoods.forEach((food) => {
        sum += food.price * food.count
      })
      return sum
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    },
    detailShow () {
      if (!this.isShowDetail || this.totalCount <= 0) {
        return false
      }
      if (this.isShowDetail) {
        this.$nextTick(() => {
          if (!this.cartScroll) {
            this.cartScroll = new BScroll(this.$refs.cartDetail, {click: true})
          } else {
            this.cartScroll.refresh()
          }
        })
      }
      return true
    }
  },
  methods: {
    detailChange () {
      if (this.selectFoods.length > 0) {
          this.isShowDetail = !this.isShowDetail
      }
    },
    addCart (obj) {
      if (!event._constructed) {
        return
      }
      this.$emit('add-cart', obj)
    },
    removeCart (obj) {
      this.$emit('remove-cart', obj)
    },
    clearCart () {
      this.isShowDetail = false
      this.$emit('clear-cart')
    }
  },
  components: {
    'cartcontrol': cartcontrol
  }
}
</script>

<style scoped lang="less">
.shopcart{
  position:fixed;
  bottom:0;
  z-index:50;
  width:100%;
  height:48px;

  .content{
    width:100%;
    height:100%;
    display:flex;
    background:#141d27;

    .content-left{
      flex:1;
      text-align: left;
      font-size:0;
      .logo-wrapper{
        display:inline-block;
        position:relative;
        top:-10px;
        margin:0 12px;
        padding:6px;
        width:56px;
        height:56px;
        box-sizing:border-box;
        vertical-align:top;
        border-radius:50%;
        background:#141d27;
        text-align: center;
        z-index:5;
        .logo{
          width:100%;
          height:100%;
          border-radius:50%;
          background:#2b3c3c;
          &.active{
            background:rgb(0,160,220);

            .icon-shopping_cart{
              color:#fff;
            }
          }
          .icon-shopping_cart{
            line-height:44px;
            font-size:24px;
            color:rgba(255,255,255,.4);
          }
          .num{
            position:absolute;
            left:30px;
            top:0;
            display:inline-block;
            background:#ff0000;
            color:#fff;
            padding:0 6px;
            font-size:9px;
            line-height:16px;
            border-radius:50%;
          }
        }
      }
      .price{
        display:inline-block;
        padding:0 12px 0 0;
        margin: 12px 0 12px 0;
        font-size:16px;
        font-weight:700;
        line-height:24px;
        color:rgba(255,255,255,.4);
        border-right:1px solid rgba(255,255,255,.1);
      }
      .desc{
        display:inline-block;
        margin-left:12px;
        line-height:48px;
        color:rgba(255,255,255,.4);
        font-size:12px;
        font-weight:400;
      }
    }
    .content-right{
      flex:0 0 105px;
      width:105px;
      padding:0 8px;
      text-align:center;
      background:#2b3c3c;
      font-size:16px;
      font-weight:700;
      line-height:48px;
      color:rgba(255,255,255,.4);
      &.active{
        background:#1da065;
        color:#fff;
      }
    }
  }

  .cart-detail-main{
    position: absolute;
    left: 0;
    bottom: 48px;
    z-index: 3;
    width: 100%;
    background: #fff;
    text-align: left;

    .title{
      box-sizing:border-box;
      width:100%;
      height:40px;
      font-size:14px;
      color:rgb(7,17,27);
      font-weight:200;
      line-height:40px;
      padding:0 18px;
      background:#f3f5f7;
      border-bottom:1px solid rgba(7,17,27,.1);

      .clear{
        float:right;
        border:none;
        color:rgb(0,160,220);
        font-size:12px;
        line-height:40px;
        background:transparent;
      }
    }
    .cart-detail{
      max-height:217px;
      padding-bottom:20px;

      .cart-detail-ul{
        margin:0 18px;
        .cart-detail-item{
          position:relative;
          height:48px;
          line-height:48px;
          border-bottom:1px solid rgba(7,17,27,.1);

          .text{
            font-size:14px;
            font-weight:700;
            color:#07111b;
            line-height:48px;
          }
          .price{
            position:absolute;
            right:95px;
            margin-left:18px;
            font-size: 14px;
            font-weight: 700;
            color: #f01414;
          }
          .cartcontrol-wrapper{
            position:absolute;
            right:0;
            top:0;
          }
        }
      }
    }
  }
}
.cart-mask{
    position:fixed;
    top:0;
    left:0;
    bottom:48px;
    width:100%;
    background:rgba(7,17,27,0.8);
    backdrop-filter: blur(10px);
    z-index:2;
}
</style>
