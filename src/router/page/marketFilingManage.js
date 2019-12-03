import Layout from '@/views/layout/Layout'
// 客户资源管理的路由如下
const MarketFilingManageRouter = {
  path: '/project/dev-manage/market-filing',
  component: Layout,
  redirect: '/project/market/marketFiling/index',
  name: '市场备案管理',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/marketFiling/index'),
      name: 'CusEditor',
      meta: { title: 'carEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/marketFiling/edit'),
      name: '市场备案新增',
      meta: { title: 'CusCreate', noCache: true },
      hidden: true
    },
    // {
    //   path: 'edit/:id([A-Za-z0-9_]+)',
    //   component: () => import('@/views/project/market/marketFiling/edit'),
    //   name: '市场备案查看',
    //   meta: { title: 'CusEditor', noCache: false },
    //   hidden: true
    // }
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/marketFiling/edit'),
      name: '市场备案详情',
      meta: { title: 'CusDetail', noCache: false },
      hidden: true
    }
  ]
}

export default MarketFilingManageRouter
