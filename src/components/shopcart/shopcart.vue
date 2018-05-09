<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo"><i class="icon-shopping_cart"></i></div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
      <div class="content-right"></div>
    </div>
    <div class=""></div>
  </div>
</template>
<script type="text/babel">

export default {
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
          .icon-shopping_cart{
            line-height:44px;
            font-size:24px;
            color:#80858a;
          }
        }
      }
      .price{
        
      }
      .desc{
        
      }
    }
    .content-right{
      flex:0 0 105px;
      width:105px;
    }
  }
}
</style>
