<template>
  <div class="ratinglist">
    <div class="rating-classify">
      <button class="all" @click="showRatingsAll">全部<span>57</span></button>
      <button class="recommend" @click="showRatingsTJ">推荐<span>47</span></button>
      <button class="tucao" @click="showRatingsTC">吐槽<span>10</span></button>
    </div>
    <div class="rating-filter" :class="{'active': fiter === 3}">
      <span class="icon-check_circle" @click="lookOnlyText"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <ul class="rating-list">
      <li v-for="item in getRatings" class="rating-item">
        <div class="rating-title">
          <span class="time">{{item.rateTime | formatDate}}</span>
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
</template>
<script type="text/babel">
import {formatDate} from '../../common/date.js'
export default {
  props: {
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      rateType: ['icon-thumb_up', 'icon-thumb_down'],
      fiter: 0
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {
    getRatings () {
      var temRatings = []
      if (this.fiter === 1) {
        temRatings = this.ratings.filter(function (item) {
         return item.rateType === 0
        })
      } else if (this.fiter === 2) {
        temRatings = this.ratings.filter(function (item) {
         return item.rateType === 1
        })
      } else if (this.fiter === 3) {
        temRatings = this.ratings.filter(function (item) {
         return item.text !== ''
        })
      } else {
        temRatings = this.ratings
      }
      return temRatings
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="less">
.ratinglist{
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
    color:rgb(147,153,159);

    &.active{
      color:rgb(0,160,220);
    }
    span{
      vertical-align: middle;
      display: inline-block;
    }

    .icon-check_circle{
      font-size:24px;
      line-height:24px;
    }
    .text{
      font-size:12px;
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

</style>
