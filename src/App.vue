<template>
  <div id="app">
    <headercont v-bind:seller="seller"></headercont>
    <ul class="tab">
      <li class="tab-item"><router-link to="/goods">商品</router-link></li>
      <li class="tab-item"><router-link to="/ratings">评价</router-link></li>
      <li class="tab-item"><router-link to="/seller">商家</router-link></li>
    </ul>
    <keep-alive>
      <router-view :seller="seller" :goods="goods" v-on:add-cart="addCart($event)" v-on:remove-cart="removeCart($event)"></router-view>
    </keep-alive>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" v-on:clear-cart="clearCart($event)" v-on:add-cart="addCart($event)" v-on:remove-cart="removeCart($event)"></shopcart>
  </div>
</template>
<script type="text/babel">
import Vue from 'vue'
import headercont from './components/header/headercont'
import shopcart from './components/shopcart/shopcart'

const ERR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {},
      goods: []
    }
  },
  created () {
    // GET seller
    this.$http.get('/api/seller').then(response => {
      // get body data
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
      }
    }, response => {
      // error callback
    })

    this.$http.get('/api/goods').then(response => {
      // get body data
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
      }
    }, response => {
      // error callback
    })
  },
  components: {
    'headercont': headercont,
    'shopcart': shopcart
  },
  computed: {
    selectFoods () {
      let selectFoods = []
      if (this.goods.length > 0) {
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              selectFoods.push(food)
            }
          })
        })
      }
      return selectFoods
    }
  },
  methods: {
     addCart (obj) {
      if (!event._constructed) {
        return
      }
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food === obj) {
            if (!food.count) {
              Vue.set(food, 'count', 1)
            } else {
              food.count++
            }
            return
          }
        })
      })
    },
    removeCart (obj) {
      if (!event._constructed) {
        return
      }
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food === obj) {
            food.count --
            return
          }
        })
      })
    },
    clearCart () {
      if (!event._constructed) {
        return
      }
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            food.count = 0
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab{
  display: flex;
  width:100%;
  height:40px;
  line-height:40px;
  border-bottom:1px solid;
  border-bottom-color:rgba(7,17,27,0.1);

  li.tab-item{
    flex:1;
    text-align:center;

    a{display:block;}
    a.active{color:rgb(240,20,20);}
  }
}
</style>
