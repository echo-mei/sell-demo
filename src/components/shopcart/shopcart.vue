<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
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
    <div class=""></div>
  </div>
</template>
<script type="text/babel">

export default {
  // props: ['seller']
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
    }
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
}
</style>
