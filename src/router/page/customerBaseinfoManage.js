import Layout from '@/views/layout/Layout'
// 客户资源管理的路由如下
const CustomerBaseinfoManageRouter = {
  path: '/project/dev-manage/customer-baseinfo',
  component: Layout,
  redirect: '/project/market/customerBaseinfo/index',
  name: '客户信息管理',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/customerBaseinfo/index'),
      name: 'AliEditor',
      meta: { title: 'carEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/customerBaseinfo/edit'),
      name: '客户信息新增',
      meta: { title: 'AliCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/customerBaseinfo/edit'),
      name: '客户信息编辑',
      meta: { title: 'AliEditor', noCache: false },
      hidden: true
    }
  ]
}

export default CustomerBaseinfoManageRouter
