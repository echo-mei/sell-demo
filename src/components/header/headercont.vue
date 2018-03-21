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
        <div class=" discount" v-if="seller.supports">
          <div class="cont">
            <span class="icon"></span>
            <span class="des">{{seller.supports[0].description}}</span>
          </div>
          <div class="num">{{seller.supports.length}}个<i class="icon-arrow_lift"></i></div>
        </div>
      </div>
    </div>
    <div class="announcement-wrapper">
      <span class="brand"></span>
      <span class="cont">{{seller.bulletin}}</span>
    </div>
    <img class="header-bg" :src="seller.avatar">
  </div>
</template>

<script>
export default {
  // props: ['seller']
  props: {
    seller: {
      type: Object
    }
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
    .discount{
      .cont{
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
      width:310px;   
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
}
</style>
