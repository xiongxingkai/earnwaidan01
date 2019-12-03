import Layout from '@/views/layout/Layout'
// 阿里云资源的路由如下
const AliMenageRouter = {
  path: '/office/server/alibaba-cloud',
  component: Layout,
  redirect: '/office/server/AliMenage/index',
  name: '阿里云资源管理',
  children: [
    
    // {
    //   path: 'editor',
    //   component: () => import('@/views/office/server/AliMenage/index'),
    //   name: 'AliEditor',
    //   meta: { title: 'carEditor', icon: 'editor' }
    // },

    {
      path: 'add',
      component: () => import('@/views/office/server/AliMenage/edit'),
      name: '阿里云资源新增',
      meta: { title: 'AliCreate', noCache: true },
      hidden: true
    },
    {
      path: 'edit/:id([A-Za-z0-9_]+)',
      component: () => import('@/views/office/server/AliMenage/edit'),
      name: '阿里云资源编辑',
      meta: { title: 'AliEditor', noCache: false },
      hidden: true
    }
  ]
}

export default AliMenageRouter
