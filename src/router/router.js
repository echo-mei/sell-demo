
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const route = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    scrollBehavior: () => ({y: 0}),
    routes: [{
        path: '/goods',
        component: goods
    }, {
        path: '/ratings',
        component: ratings
    }, {
        path: '/seller',
        component: seller
    }, {
        path: '*',
        redirect: '/goods'
    }]
})

export default route
