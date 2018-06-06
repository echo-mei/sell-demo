<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="removeCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/babel">

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('add-cart', this.food)
      this.$emit('add', event.target)
    },
    removeCart (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('remove-cart', this.food)
    }
  }
}
</script>

<style scoped lang="less">
.cartcontrol{
  font-size:0;
  color:rgb(0,160,220);

  .cart-decrease{
    display:inline-block;
    vertical-align: middle;
    margin:0 10px;
    
    .inner{
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;
      font-size: 24px;
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active, &.move-leave-active{
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-active{
      opacity: 0;
      transform: translate3d(26px, 0, 0);
      .inner{
        transform: rotate(180deg);
      }
    }
  }
  .cart-count{
    display:inline-block;
    font-size:10px;
    line-height:24px;
    color:rgb(147,153,159);
    vertical-align: middle;
  }
  .cart-add{
    display:inline-block;
    font-size:24px;
    line-height:24px;
    vertical-align: middle;
    margin:0 10px;
  }
      
}
</style>
