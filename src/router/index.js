import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'vantUi',
      path: '/vant-ui',
      component: () => import(/* webpackChunkName: "vantUi" */ '@/pages/vant-ui'),
      meta: { title: 'vant-ui' }
    },
    {
      name: 'HelloWorld',
      path: '/',
      component: () => import(/* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld'),
      meta: { title: 'HelloWorld' }
    }
  ]
})

export default router
