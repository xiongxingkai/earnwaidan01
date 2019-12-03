// import { asyncRouterMap, constantRouterMap } from '@/router'
import { fetchAll } from '@/api/admin/menu/index'


/**
 * 通过authority判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.authority) {
    if (menus[route.authority] !== undefined) {
      return menus[route.authority]
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 异步路由
 * @param menus 个人菜单
 * @param menuDatas 全部菜单
 */
function filterAsyncRouter(asyncRouterMap, menus, menuDatas) {
  const accessedRouters = asyncRouterMap.filter(route => {
    let accessed = false
    if (route.authority !== undefined) {
      if (hasPermission(menus, route)) {
        if (menuDatas[route.authority] !== undefined) {
          route.name = menuDatas[route.authority].title
          route.icon = menuDatas[route.authority].icon
          if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, menus, menuDatas)
          }
          accessed = true
        }
      }
    } else {
      accessed = true
    }
    return accessed
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, obj) => {
      state.addRouters = obj.routers
      state.routers = obj.constantRouterMap.concat(obj.routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, {menus, asyncRouterMap, constantRouterMap}) {
      return new Promise(resolve => {
        fetchAll().then(data => {
          const menuDatas = {}
          for (let i = 0; i < data.length; i++) {
            menuDatas[data[i].code] = data[i]
          }
          const accessedRouters = filterAsyncRouter(asyncRouterMap, menus, menuDatas)
          commit('SET_ROUTERS', {routers: accessedRouters, constantRouterMap})
          resolve()
        })
      })
    }
  }
}

export default permission
