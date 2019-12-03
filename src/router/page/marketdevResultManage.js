import Layout from '@/views/layout/Layout'
// 客户资源管理的路由如下
const MarketdevResultManageRouter = {
  path: '/project/dev-manage/market-devresult',
  component: Layout,
  redirect: '/project/market/marketdevResult/index',
  name: '开发结果管理',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/marketdevResult/index'),
      name: 'CusEditor',
      meta: { title: 'carEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/marketdevResult/edit'),
      name: '开发结果新增',
      meta: { title: 'CusCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/marketdevResult/edit'),
      name: '开发结果编辑',
      meta: { title: 'CusEditor', noCache: false },
      hidden: true
    }
  ]
}

export default MarketdevResultManageRouter
