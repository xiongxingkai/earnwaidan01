import { loginByUsername, logout, getInfo, getAllMenus, getAllElements } from '@api/login'
import { statistic } from '@/api/office/dataCenter/index'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { findTreeNodePath } from '@/utils/tree'


const user = {
  state: {
    id: '',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    deptName: '',
    deptNumber: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined,
    permissionTopMenus: undefined,
    currentTopMenu: undefined,
    seeting: {
      articlePlatform: []
    },
    navBarHeight: undefined,
    tagsViewHeight: undefined
  },
  mutations: {
    SET_NAVABARHEIGHT: (state, navBarHeight) => {
      state.navBarHeight = navBarHeight
    },
    SET_TAGSVIEWHEIGHT: (state, tagsViewHeight) => {
      state.tagsViewHeight = tagsViewrHeight
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_DEPTNUM: (state, deptNumber) => {
      state.deptNumber = deptNumber
    },
    SET_DEPTNAME: (state, deptName) => {
      state.deptName = deptName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = ''
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus
    },
    SET_PERMISSION_TOPMENUS: (state, permissionTopMenus) => {
      state.permissionTopMenus = permissionTopMenus
    },
    SET_CURRENT_TOPMENUS: (state, currentTopMenu) => {
      state.currentTopMenu = currentTopMenu
      store.dispatch('setSideBar', true)
    }
  },
  actions: {
    // 用户名登录
    LoginByUserName({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.captchaId, userInfo.captcha, userInfo.accoutnType).then(response => {
          const data =response
          if (data.data === '') {
            Message({
              type: 'warning',
              message: data.message
            })
            return Promise.reject('error')
          } else {
            console.log(data)
            setToken(data.data)
            commit('SET_TOKEN', data.data)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          commit('SET_ROLES', 'admin')
          commit('SET_ID', data.id)
          commit('SET_NAME', data.name)
          commit('SET_DEPTID', data.deptId)
          commit('SET_DEPTNAME', data.deptName)
          commit('SET_DEPTNUM', data.deptNumber)
          commit('SET_AVATAR', 'http://git.oschina.net/uploads/42/547642_geek_qi.png?1499487420')
          commit('SET_INTRODUCTION', data.description)
          const menus = {}
          for (let i = 0; i < data.menus.length; i++) {
            menus[data.menus[i].code] = true
          }
          commit('SET_MENUS', menus)
          const elements = {}
          getAllElements().then(res => {
            if (res.status === 200) {
              for (const ele of res.data) {
                elements[ele.code] = false
              }
              for (let i = 0; i < data.elements.length; i++) {
                elements[data.elements[i].code] = true
              }
              commit('SET_ELEMENTS', elements)
            }
          })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        getAllMenus().then(response => {
          commit('SET_PERMISSION_TOPMENUS', response)
        })
      })
    },
    GetSubMenu({ commit }, menu) {
      commit('SET_CURRENT_TOPMENUS', menu)
      commit('SET_PERMISSION_MENUS', menu.children)
    },
    SetPermissionMenus({ commit }, menus) {
      commit('SET_PERMISSION_MENUS', menus)
    },
    GetSubMenuByPath({ commit, state }, path) {
      if (state.permissionTopMenus === undefined) {
        return
      }
      const menu = findTreeNodePath(path, { childre: state.permissionTopMenus })
      if (menu === undefined) {
        return
      }
      const codes = menu.codePath.split('!')
      if (codes.length > 0) {
        const parentCode = codes[0]
        if (state.currentTopMenu === undefined || state.currentTopMenu.cdoe !== parentCode) {
          commit('SET_CURRENT_TOPMENUS', state.permissionTopMenus.find(i => i.code === parentCode ))
          if (state.currentTopMenu !== undefined) {
            commit('SET_PERMISSION_MENUS', state.currentTopMenu.children)
          } else {
            store.dispatch('setSideBar', false)
          }
        } else {
          store.dispatch('setSideBar', true)
        }
      }
    },
    UseageStatistics({ state }, path) {
      if (state.token) {
        const query = {
          uri: path
        }
        statistic(query)
      }
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUS', undefined)
          commit('SET_ELEMENTS', undefined)
          commit('SET_PERMISSION_MENUS', undefined)
          commit('SET_PERMISSION_TOPMENUS', undefined)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_MENUS', undefined)
        commit('SET_ELEMENTS', undefined)
        commit('SET_PERMISSION_MENUS', undefined)
        commit('SET_PERMISSION_TOPMENUS', undefined)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
