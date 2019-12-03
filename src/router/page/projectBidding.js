import Layout from '@/views/layout/Layout'
// 项目投标资料信息的路由如下
const projectBiddingRouter = {
  path: '/project/dev-manage/project-bidding',
  component: Layout,
  redirect: '/project/market/projectBidding/index',
  name: '项目投标资料信息',
  children: [
    // {
    //   path: 'editor',
    //   component: () => import('@/views/project/market/projectBidding/index'),
    //   name: 'bidEditor',
    //   meta: { title: 'bidEditor', icon: 'editor' }
    // },
    {
      path: 'add',
      component: () => import('@/views/project/market/projectBidding/edit'),
      name: '项目投标信息新增',
      meta: { title: 'bidCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/projectBidding/edit'),
      name: '项目投标信息编辑',
      meta: { title: 'bidEditor', noCache: false },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/projectBidding/detail'),
      name: '项目投标信息查看',
      meta: { title: 'bidDetail', noCache: false },
      hidden: true
    }
  ]
}

export default projectBiddingRouter
