const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userID: state => state.user.id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  deptName: state => state.user.deptName,
  deptNumber: state => state.user.deptNumber,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  permissionMenus: state => state.user.permissionMenus,
  permissionTopMenus: state => state.user.permissionTopMenus,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  navBarHeigh: state => state.user.navBarHeigh,
  tagsViewHeigh: state => state.user.tagsViewHeigh
}
export default getters
