import Layout from '@/views/layout/Layout'
// 客户资源管理的路由如下
const SaleContractManageRouter = {
  path: '/project/dev-manage/sale-contract',
  component: Layout,
  redirect: '/project/market/saleContract/index',
  name: '合同管理',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/saleContract/index'),
      name: 'CusEditor',
      meta: { title: 'carEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/saleContract/edit'),
      name: '合同新增',
      meta: { title: 'CusCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/saleContract/edit'),
      name: '合同编辑',
      meta: { title: 'CusEditor', noCache: false },
      hidden: true
    }
  ]
}

export default SaleContractManageRouter
