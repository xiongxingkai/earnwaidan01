const home = {
  namespaced: true,
  state: {
    homestatus: '',
    empId: '',
    entryId: '',
    eidt: false,
    entryStatus: false,
    hrcheck: false,
    Entry: ''
  },
  mutations: {
    TOGGLE_STATUS: (state, status) => {
      state.homestatus = status
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

export default home