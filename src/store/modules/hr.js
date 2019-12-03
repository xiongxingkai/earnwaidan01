const hr = {
  namespaced: true,
  state: {
    personstatus: 'personInfo',
    empId: '',
    entryId: '',
    edit: false,
    entryStatus: false,
    entryStep: 1,
    hrcheck: false,
    Entry: '',
    showStatus: true, // 编辑保存按钮显示
    addButtonStatus: false, // 新增保存按钮状态控制
    checkStatus: false // 控制审核按钮
  },
  mutations: {
    BUTTON_STATUS: (state, bool) => {
      state.addButtonStatus = bool
    },
    SHOW_STATUS: (state, bool) => {
      state.showStatus = bool
    },
    TOGGLE_STATUS: (state, status) => {
      state.personstatus = status
    },
    SET_EmpId: (state, empId) => {
      state.empId = empId
    },
    SET_Edit: (state, bool) => {
      state.edit = bool
    },
    SET_EntryStep: (state, num) => {
      state.entryStep = num
    },
    SET_EntryStatus: (state, bool) => {
      state.entryStatus = bool
    },
    SET_EheckStatus: (state, bool) => {
      state.checkStatus = bool
    }, // 控制待入职管理审核
    SET_EntryId: (state, entryId) => {
      state.entryId = entryId
    },
    SET_HrCheck: (state, bool) => {
      state.hrcheck = bool
    },
    SET_EntryVal: (state, val) => {
      state.Entry = val
    }
  },
  actions: {
    getButtonStatus({ commit }, bool) {
      commit('BUTTON_STATUS', bool)
    },
    getShowStatus({ commit }, bool) {
      commit('SHOW_STATUS', bool)
    },
    toggleStatus({ commit }, status) {
      commit('TOGGLE_STATUS', status)
    },
    setEmpId({ commit }, empId) {
      commit('SET_EmpId', empId)
    },
    toggleEdit({ commit }, bool) {
      commit('SET_Edit', bool)
    },
    setEntryStep({ commit }, num) {
      commit('SET_EntryStep', num)
    },
    setEntryStatus({ commit }, bool) {
      commit('SET_EntryStatus', bool)
    },
    setEheckStatus({ commit }, bool) {
      commit('SET_EheckStatus', bool)
    },
    setEntryId({ commit }, entryId) {
      commit('SET_EntryId', entryId)
    },
    setHrCheck({ commit }, bool) {
      commit('SET_HrCheck', bool)
    },
    setEntryVal({ commit }, val) {
      commit('SET_EntryVal', val)
    }
  }
}

export default hr