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
      </div>
      

    </div>
    <div class="announcement-wrapper">
    </div>
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
  color: #fff;
  background-image: linear-gradient(
    rgba(7, 17, 27, 0.6), 
    rgba(7, 17, 27, 0.6)), 
  linear-gradient(
    #6a7076, 
    #6a7076);
  background-blend-mode: normal, 
    normal;
    overflow: hidden;

  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    text-align: left;

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

  }
  

  .announcement-wrapper{
    background-color: rgba(7, 17, 27, 0.2);
    opacity: 0.2;
  }
}
</style>
