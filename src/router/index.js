import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import { listServiceRouter } from '@/api/front/service'
import { getRouter } from '@/api/admin/baseManager/authority/index'
// 该方法会占用打包资源，别随便用
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

// Layout
import Layout from '../views/layout/Layout'
/**
 * hidden: true              if `hidden: true` will not show in the sidebar(default is false)
 * redirect: noredirect      if `redirect: noredirect` will no redirect in the breadcrumb
 * name: 'router-name'        the name is used by <keep-alive>   (must set!!!)
 * meta: {
 *  roles: ['admin', 'editor']   will control the page roles (you can set multiple roles)
 *  title: 'title'   the  name show in submenu and breadcrumb (recommend set)
 *  icon: 'svg-name'   the icon show in the sidebar,
 *  noCache: true      if false, the page will no be cached(default is false)
 * }
 * 
 */

/**
 * Router Modules
 *  
 * */

 export const constantRouterMap = [
   {
     path: '/login',
     component: _import('login/index'),
     hidden: true
   },
   {
     path: '/loginhr',
     component: _import('login/loginhr'),
     hidden: true
   },
   {
     path: '/authredirect',
     component: _import('login/authredirect'),
     hidden: true
   },
   {
     path: '/404',
     component: _import('errorPage/404'),
     hidden: true
   },
   {
     path: '/401',
     component: _import('errorPage/401'),
     hidden: true
   },
   {
     path: '/findPassword',
     component: _import('login/findPassword'),
     hidden: true
   },
   {
     path: '/',
     component: Layout,
     redirect: 'dashboard',
     children: [
       {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: '首页',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
       },
       {
        path: 'datacenter',
        component: _import('office/datacenter/index'),
        name: '数据中心',
        meta: { title: 'datacenter', icon: 'datacenter', noCache: false }
       },
       {
        path: 'personal',
        component: _import('personal/index'),
        name: '个人中心',
        meta: { title: 'personal', icon: 'personal', noCache: true }
       }
     ]
   }
 ]


 export default new Router({
  //  mode: 'history', // request service support
  //  base: 'eip',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
 })

export const asyncRouterMap = [
  {
    path: '/workflow/flow-task',
    component: Layout,
    name: '流程任务',
    authority: 'W0F0000000',
    children: [
      {
        path: 'wait',
        component: _import('workflow/flow-task/wait/index'),
        name: '待办任务',
        authority: 'W0F0W00000'
      },
      {
        path: 'finish',
        component: _import('workflow/flow-task/finish/index'),
        name: '已办任务',
        authority: 'W0F0F00000'
      }
    ]
  },
  {
    path: '/project/supervise',
    component: Layout,
    name: '监理管理',
    authority: 'P0S0000000',
    children: [
      {
        path: 'prj-info/list',
        component: _import('project/supervise/prj-info/list'),
        name: '项目管理',
        authority: 'P0S0P00000'
      },
      {
        path: 'prj-info-map',
        component: _import('project/supervise/panorama/projectPart'),
        name: '项目地图',
        authority: 'P0S0P00000'
      },
    ]
  }
]  


/**
 * 
 * 递归处理动态路由表
 * @param routerList
 */
// const context = require.context('@/views', true, /\.vue$/)
// const keys = context.keys()
// let str = keys.join(',')

const baseComp = ['Layout', 'TemplateEdit', 'TemplateDetail']

function setRouteChildrenList(routerList) {
  if (routerList.length > 0) {
    for (const item of routerList) {
      if (item.component) {
        item.component = _import(item.component)
      }
      if (item.children && item.children.length > 0) {
        setRouteChildrenList(item.children)
      }
    }
  }
}

function setRouterList(routerList) {
  if (routerList.length > 0) {
    for (const item of routerList) {
      if (item.component && item.component === 'Layout') {
        item.component = Layout
      } 
      if (item.children && item.children.length) {
        setRouteChildrenList(item.children)
      }
    }
  }
  return routerList
}
function setSalaryRouterImport(routerList) {
  if (routerList.length > 0) {
    for (const iterator of routerList) {
      if (iterator.component && !baseComp.includes(iterator.component)) {
        iterator.component = _import(iterator.component)
      }
      if (iterator.redirect && iterator.redirect === 'TemplateIndex') {
        iterator.redirect = salaryTemplateIndex
      }
      if (iterator.component && iterator.component === 'Layout') {
        iterator.component = Layout
      }
      if (iterator.component && iterator.component === 'TemplateEdit') {
        iterator.component = _import('hr/salary/edit')
      }
      if (iterator.component && iterator.component === 'TemplateDetail') {
        iterator.component = _import('hr/salary/detail')
      }
      if (iterator.children && iterator.children.length > 0) {
        setSalaryRouterImport(iterator.children)
      }
    }
  }
}


/**
 * 
 * 平台工作流 模板配置
 * @param {*} params
 * 
 */
function setWorkflowRouterImport(routerList) {
  if (routerList.length > 0) {
    for (const iterator of routerList) {
      if (iterator.component && !baseComp.includes(iterator.component)) {
        iterator.component = _import(iterator.component)
      }
      if (iterator.redirect && iterator.redirect === 'TemplateIndex') {
        iterator.redirect = workflowTemplateIndex
      }
      if (iterator.component && iterator.component === 'Layout') {
        iterator.component = Layout
      }
      if (iterator.component && iterator.component === 'TemplateEdit') {
        iterator.component = _import('publicpage/workflow/edit')
      }
      if (iterator.component && iterator.component === 'TemplateDetail') {
        iterator.component = _import('publicpage/workflow/detail')
      }
      if (iterator.children && iterator.children.length > 0) {
        setWorkflowRouterImport(iterator.children)
      }
    }
  }
}

/**
 * 递归过滤动态路由表，赋值通用组件
 * @param routerList
 * 
 */
function setRouterImport(routerList) {
  const templateIndex = '/publicpage/public-auto-api/index'
  const salaryTemplateIndex = '/hr/salary/index'
  const workflowTemplateIndex = '/publicpage/workflow/index'
  if (routerList.length > 0) {
    for (const iterator of routerList) {
      if (iterator.component && !baseComp.includes(iterator.component)) {
        iterator.component = _import(iterator.component)
      }
      // 临时处理，后续升级自动表单组件后去除
      const isSalary = iterator.path.startsWith('/hr/remuneration') 
      || iterator.path.startsWith('/hr/attendance')
      || iterator.path.startsWith('/hr/leave')
      if (iterator.redirect && iterator.redirect === 'TemplateIndex') {
        // 平台工作流 begin
        if (iterator.workflowType === 'complex') {
          iterator.redirect = workflowTemplateIndex // 平台工作流模板
        } else { // 平台工作流end
          if (isSalary) {
            iterator.redirect = salaryTemplateIndex
          } else {
            iterator.redirect = templateIndex
          }
        }
      }
      if (iterator.component && iterator.component === 'Layout') {
        iterator.component = Layout
      }
      if (iterator.component && iterator.component === 'TemplateEdit') {
        if (iterator.configType === 1) {
          iterator.component = _import('publicpage/public-two/edit')
        } else {
          iterator.component = _import('publicpage/public-auto-api/edit')
        }
      }
      if (iterator.component && iterator.component === 'TemplateDetail') {
        if (iterator.configType === 1) {
          iterator.component = _import('publicpage/public-two/detail')
        } else {
          iterator.component = _import('publicpage/public-auto-api/detail')
        }
      }
      if (iterator.children && iterator.children.length > 0) {
        // 平台工作流 begin
        if (iterator.workflowType === 'complex') {
          // 平台工作流模板
          setWorkflowRouterImport(iterator.children)
        } else {
          // 平台工作流end
          if (isSalary) {
            setSalaryRouterImport(iterator.children)
          } else {
            setRouterImport(iterator.children)
          }
        }
      }
    }
  }
}

// 从后台生成动态路由
export async function generateActiveRouter() {
  let router = []
  // 同步调用方法
  await getRouter().then(result => {
    if (result.status === 200) {
      const routerData = result.data
      if (routerData.length > 0) {
        setRouterList(routerData)
        routerMap = routerMap.concat(routerData)
      }
    }
  })
  await listServiceRouter().then(res => {
    routerMap = routerMap.concat(asyncRouterMap)
    if (res.status === 200) {
      const resultList = res.data.rows
      if (routerList.length > 0) {
        setRouterImport(routerList)
        routerMap = routerMap.concat(routerList)
      }
    }
  })
  return routerMap
}


// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'menu',
//       component: () => import('@/views/menu')
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/views/logintest')
//     },
//     {
//       path: '/consumer-nalysis',
//       name: 'consumerAnalysis',
//       component: () => import('@/views/consumerAnalysis')
//     },
//     {
//       path: '/picture-board',
//       name: 'pictureboard',
//       component: () => import('@/views/pictureBoard')
//     },
//     {
//       path: '/drag-table',
//       name: 'dragtable',
//       component: () => import('@/views/dragTable')
//     },
//     {
//       path: '/tree-table',
//       name: 'treetable',
//       component: () => import('@/views/treeTable')
//     },
//     {
//       path: '/heat-map',
//       name: 'heatmap',
//       component: () => import('@/views/heatMap')
//     },
//     {
//       path: '/heat-map-copy',
//       name: 'heatmapcopy',
//       component: () => import('@/views/heatMapCopy')
//     },
//   ]
// })
