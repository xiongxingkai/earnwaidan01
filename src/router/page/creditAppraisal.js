import Layout from '@/views/layout/Layout'
// 项目投标资料信息的路由如下
const companyQualificationRouter = {
  path: '/project/dev-manage/credit-appraisal',
  component: Layout,
  redirect: '/project/market/creditAppraisal/index',
  name: '信用评价项目管理表',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/creditAppraisal/index'),
      name: 'creditEditor',
      meta: { title: 'creditEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/creditAppraisal/edit'),
      name: '信用评价项目新增',
      meta: { title: 'creditCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/creditAppraisal/edit'),
      name: '信用评价项目编辑',
      meta: { title: 'creditEditor', noCache: false },
      hidden: true
    }
  ]
}

export default companyQualificationRouter
