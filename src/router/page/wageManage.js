import Layout from '@/views/layout/Layout'
// 工资条管理的路由如下
const MarketdevResultManageRouter = {
  path: '/hr/info/wage',
  component: Layout,
  redirect: '/hr/info/wage/index',
  name: '工资条管理',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/hr/info/wage/edit'),
      name: 'wageEditor',
      meta: { title: 'wageEditor', icon: 'editor' }
    },
    {
      path: 'import_ex',
      component: () => import('@/views/hr/info/wage/import'),
      name: '工资条导入',
      meta: { title: 'wageImport', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/hr/info/wage/edit'),
      name: '工资条编辑',
      meta: { title: 'wageEditor', noCache: false },
      hidden: true
    },
    {
      path: 'detail/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/hr/info/wage/detail'),
      name: '工资条详情',
      meta: { title: 'wageDetail', noCache: false },
      hidden: true
    }
  ]
}

export default MarketdevResultManageRouter
