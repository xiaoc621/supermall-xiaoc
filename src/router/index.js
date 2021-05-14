import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/home/home')
const profile = () => import('../views/profile/profile')
const shopcart = () => import('../views/shopcart/shopCart')
const category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
      {
        path: "/",
        redirect: "/home"
      },
        {
          path: '/home',
          component:home
        },
        {
          path: '/profile',
          component: profile
        },
        {
          path: '/shopcart',
          component: shopcart
        },
        {
          path: '/category',
          component: category
        },
        {
          path: '/detail/:iid',
          component: Detail
        }
      ],

      mode: 'history'
  })