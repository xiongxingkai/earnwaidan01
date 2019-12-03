const projectBill = {
  namespaced: true,
  state: {
    formStatus: '',
    billDetailId: ''
  },
  mutations: {
    TOG_FORMST: (state, str) => {
      state.formStatus = str
    },
    GET_BILLID: (state, str) => {
      state.billDetailId = str
    }
  },
  actions: {
    toggleFormStatus({ commit }, str) {
      commit('TOG_FORMST', str)
    },
    getDetailId({ commit }, str) {
      commit('GET_BILLID', str)
    }
  }
}

export default projectBill