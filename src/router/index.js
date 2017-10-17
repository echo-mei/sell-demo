import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router'

Vue.use(VueRouter)
Vue.use(VueResource)

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes
})

