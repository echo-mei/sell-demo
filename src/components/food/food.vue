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
          <cartcontrol :food="selectFood" v-if="selectFood.count>0"></cartcontrol>
          <button class="add-cart" v-else="!selectFood.count || selectFood.count===0" @click="addCart">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="food-cont padding18" v-show="selectFood.info!=''">
      <div class="cont-title">商品介绍</div>
      <p class="desc-detail">{{selectFood.info}}</p>
    </div>
    <div class="food-cont padding18">
      <div class="cont-title">商品评价</div>
      <div class="rating-classify">
        <button class="all">全部<span>57</span></button>
        <button class="recommend">推荐<span>47</span></button>
        <button class="tucao">吐槽<span>10</span></button>
      </div>
      <div class="rating-filter">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
      <ul class="rating-list">
        <li v-for="item in selectFood.ratings" class="rating-item">
          <div class="rating-title">
            <span class="time">{{item.rateTime}}</span>
            <span class="user">{{item.username}}</span>
            <div class="avatar"><img :src="item.avatar"></div>
          </div>
          <div class="rating-text">
            <span :class="rateType[item.rateType]"></span>
            <span class="text">{{item.text}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script type="text/babel">
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'

export default {
  props: {
    selectFood: {
      type: Object
    }
  },
  data () {
    return {
      showFood: false,
      rateType: ['icon-thumb_up', 'icon-thumb_down'],
      tem_ratings: this.selectFood.ratings
    }
  },
  computed: {
    getRatings () {
      return this.selectFood.ratings
    }
  },
  created () {
    this.$nextTick(() => {
      if (!this.foodDetailScroll) {
        this.foodDetailScroll = new BScroll(this.$refs.foodDetail, {click: true})
      } else {
        this.foodDetailScroll.refresh()
      }
    })
  },
  methods: {
    show () {
      this.showFood = true
    },
    hide () {
      this.showFood = false
    },
    addCart () {
      console.log(event, 'click')
      if (!event._constructed) {
        return
      }
      console.log(1, this.selectFood.count)
      if (!this.selectFood.count) {
        Vue.set(this.selectFood, 'count', 1)
      } else {
        this.selectFood.count++
      }
      console.log(2, this.selectFood.count)
    }
  },
  components: {
    'cartcontrol': cartcontrol
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

    .rating-classify{
      font-size:0;
      padding-top:12px;
      padding-bottom:18px;
      border-bottom:1px solid rgba(7,17,27,.1);
      button{
        padding:8px 12px;
        border:none;
        border-radius:2px;
        font-size:12px;
        line-height:16px;
        margin-right:8px;

        span{
          font-size:10px;
          margin-left:2px;
        }
      }
      .all{
        background:rgb(0,160,220);
        color:#fff;
      }
      .recommend{
        background:rgba(0,160,220,.2);
        color:rgb(77,85,93);
      }
      .tucao{
        background:rgba(77,85,93,.2);
        color:rgb(77,85,93);
      }
    }
    .rating-filter{
      padding:12px 0;
      span{
        vertical-align: middle;
        display: inline-block;
      }

      .icon-check_circle{
        font-size:24px;
        color:rgb(147,153,159);
        line-height:24px;
      }
      .text{
        font-size:12px;
        color:rgb(147,153,159);
        line-height:24px;
      }
    }
    .rating-list{
      margin-left: -18px;
      margin-right: -18px;
      border-top: 1px solid rgba(7,17,27,.1);
      padding: 0 18px;

      .rating-item{
        padding:16px 0;
        border-bottom: 1px solid rgba(7,17,27,.1);

        .rating-title{
          position:relative;
          font-size:10px;
          color:rgb(147,153,159);
          line-height:12px;
          margin-bottom:6px;

          .user{
            position:absolute;
            right:18px;
          }
          .avatar{
            position:absolute;
            right:0;
            top:0;
            width:12px;
            height:12px;
            border-radius:50%;
            overflow: hidden;

            img{
              width:100%;
              height:100%;
            }
          }
        }
        .rating-text{
          span{
            display:inline-block;
            font-size:12px;
            line-height:24px;
            vertical-align:middle;
          }
          .icon-thumb_up{
            color:rgb(0,160,220);
          }
          .icon-thumb_down{
            color:rgb(147,153,159);
          }
          .text{
            color:rgb(7,17,27);
            line-height:16px;
          }
        }        
      }
    }

  }
  .padding18{padding:18px;}
}

</style>
