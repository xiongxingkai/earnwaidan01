import Layout from '@/views/layout/Layout'
// 私有云资源的路由如下
const privateMenageRouter = {
  // path: '/project/budget/',
  path: '/office/server/private-cloud',
  component: Layout,
  redirect: '/office/server/privateMenage/index',
  name: '私有云资源管理',
  children: [
    // {
    //   path: 'editor',
    //   // component: () => import('@/views/project/budget/annual-sum/index'),
    //   component: () => import('@/views/office/server/privateMenage/index'),
    //   name: 'carEditor',
    //   meta: { title: 'carEditor', icon: 'editor' }
    // },
    {
      path: 'add',
      // component: () => import('@/views/project/budget/annual-sum/edit'),
      component: () => import('@/views/office/server/privateMenage/edit'),
      name: '私有云资源新增',
      meta: { title: 'carCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      // component: () => import('@/views/project/budget/annual-sum/edit'),
      component: () => import('@/views/office/server/privateMenage/edit'),
      name: '私有云资源编辑',
      meta: { title: 'carEditor', noCache: false },
      hidden: true
    }
  ]
}

export default privateMenageRouter
