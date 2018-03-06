<template>
  <div id="app">
    <headercont v-bind:seller="seller"></headercont>
    <ul class="tab">
      <li class="tab-item"><router-link to="/goods">商品</router-link></li>
      <li class="tab-item"><router-link to="/ratings">评价</router-link></li>
      <li class="tab-item"><router-link to="/seller">商家</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script type="text/babel">
import headercont from './components/header/headercont'

const ERR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    // GET /someUrl
    this.$http.get('/api/seller').then(response => {
      // get body data
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
        // console.log(this.seller)
      }
    }, response => {
      // error callback
    })
  },
  components: {
    'headercont': headercont
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
