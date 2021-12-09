import Vue from 'vue'
import VueRouter from 'vue-router'

// import { createRouter, createWebHistory } from 'vue-router'


Vue.use(VueRouter)
const Home = () => import('views//Home/Home')
const Category = () => import('views/Category/Category')
const Cart = () => import('views/Cart/Cart')
const Profile = () => import('views/Profile/Profile')
const Detail = () => import('views/detail/Detail')
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router