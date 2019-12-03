import Layout from '@/views/layout/Layout'
// 公司资质信息的路由如下
const companyQualificationRouter = {
  path: '/project/dev-manage/company-qualification',
  component: Layout,
  redirect: '/project/market/companyQualification/index',
  name: '公司资质信息',
  children: [
    {
      path: 'editor',
      component: () => import('@/views/project/market/companyQualification/index'),
      name: 'qualEditor',
      meta: { title: 'qualEditor', icon: 'editor' }
    },
    {
      path: 'add',
      component: () => import('@/views/project/market/companyQualification/edit'),
      name: '公司资质信息新增',
      meta: { title: 'qualCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/companyQualification/edit'),
      name: '公司资质信息编辑',
      meta: { title: 'qualEditor', noCache: false },
      hidden: true
    },
    {
      path: 'detail/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/project/market/companyQualification/detail'),
      name: '公司资质信息详情',
      meta: { title: 'qualDetail', noCache: false },
      hidden: true
    }
  ]
}

export default companyQualificationRouter
