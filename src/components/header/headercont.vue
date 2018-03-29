<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64"  height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="business-activity" v-if="seller.supports">
          <div class="cont">
            <span class="icon" :class="classObject[seller.supports[0].type]"></span>
            <span class="des">{{seller.supports[0].description}}</span>
          </div>
          <div class="num" @click="showDetail">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></div>
        </div>
      </div>
    </div>
    <div class="announcement-wrapper" @click="showDetail">
      <span class="brand"></span>
      <span class="cont">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <img class="header-bg" :src="seller.avatar">
    <div v-show="isShowDetail" class="detail">
      <div class="detail-wrapper">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
      </div>
      <div class="detail-close"><i class="icon-close" @click="hideDetail"></i></div>
    </div>
  </div>
</template>

<script type="text/babel">
import star from '../star/star'

export default {
  // props: ['seller']
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      isShowDetail: false
    }
  },
  methods: {
    showDetail () {
      this.isShowDetail = true
    },
    hideDetail () {
      this.isShowDetail = false
    }
  },
  computed: {
    classObject () {
      return ['decrease', 'discount', 'guarantee', 'invioce', 'special']
    }
  },
  components: {
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../common/less/mixin.less";
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.header{
  position:relative;
  color: #fff;
  overflow: hidden;

  .content-wrapper{
    position:relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    text-align: left;
    background-color:rgba(7,17,27,0.5);

    .avatar {
      display: inline-block;
    }
    .content{
      display: inline-block;
      vertical-align: top;
       margin-left: 16px;

      .title{
        margin-top: 2px;
       
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          .bg-image('brand');
          background-size: 100%;
          margin-right: 6px;
        }
        .name{   
          display: inline-block;
          vertical-align: top;     
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
        }
        
      }
    }
    .description{ 
      line-height: 12px;
      font-size: 12px;
      font-weight: 200px;
      margin-top: 8px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .business-activity{
      .cont{
        .icon{
          display:inline-block;
          vertical-align:top;
          width:14px;
          height:14px;
          background-size: 100%;
          margin-right: 2px;
        }
        .decrease{
          .bg-image('decrease_2');
        }
        .des{
          font-size:10px;
          color:#ffffff;
          font-weight:200;
          line-height:12px;
        }
      }
      .num{
        position:absolute;
        right:12px;
        bottom:12px;
        padding:7px 8px;
        color:#ffffff;
        font-size:10px;
        font-weight:200;
        line-height:12px;
        border-radius:12px;
        background-color:rgba(0,0,0,0.2);
        .icon-keyboard_arrow_right{
          margin-left: 2px;
        }
      }
    }
  }
  

  .announcement-wrapper{
    font-size:0;
    background-color: rgba(7, 17, 27, 0.65);
    text-align:left;
    .brand{
      display: inline-block;
      vertical-align:middle;
      width: 22px;
      height: 12px;
      .bg-image('bulletin');
      background-size: 100%;
      margin-right: 4px;
      margin-left:12px;
    }
    .cont{   
      display: inline-block;
      vertical-align: middle;  
      width:316px;   
      line-height: 18px;
      font-size: 10px;
      font-weight: 200;
      line-height:28px;
      color:#ffffff;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-keyboard_arrow_right{font-size: 12px;vertical-align: middle;}
  }

  .header-bg{
    position:absolute;
    top:-100px;
    left:0;
    width:100%;
    background-image: linear-gradient(
    rgba(7, 17, 27, 0.6), 
    rgba(7, 17, 27, 0.6)), 
    linear-gradient(
      #6a7076, 
      #6a7076);
    background-blend-mode: normal, normal;
    -webkit-filter: blur(8px); /* Chrome, Opera */
       -moz-filter: blur(8px);
        -ms-filter: blur(8px);    
            filter: blur(8px);
    z-index:-1;
  }

  .detail{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(7,17,27,0.8);

    .detail-wrapper{
      width:100%;
      min-height:100%;
      padding-bottom:64px;
      padding-top:64px;

      .title{
        font-size:16px;
        font-weight:700;
        color:#ffffff;
        line-height:16px;
        margin-bottom:16px;
      }
    }
    .detail-close{
      position:fixed;
      bottom:0;
      width:100%;
      text-align:center;
      font-size:32px;
      color:rgba(255,255,255,0.5);
      padding-bottom:32px;
    }
  }
}
</style>
