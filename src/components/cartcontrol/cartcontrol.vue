<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="removeCart"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script type="text/babel">
import Vue from 'vue'

export default {
  // props: ['seller']
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      selectFoods: []
    }
  },
  created () {
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    removeCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
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
    font-size:24px;
    line-height:24px;
    vertical-align: middle;
    margin:10px;
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
    margin:10px;
  }
}
</style>
