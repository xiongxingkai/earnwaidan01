import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('@/views/menu')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/logintest')
    },
    {
      path: '/consumer-nalysis',
      name: 'consumerAnalysis',
      component: () => import('@/views/consumerAnalysis')
    },
    {
      path: '/picture-board',
      name: 'pictureboard',
      component: () => import('@/views/pictureBoard')
    },
    {
      path: '/drag-table',
      name: 'dragtable',
      component: () => import('@/views/dragTable')
    },
  ]
})
