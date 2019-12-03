const plan = {
  namespaced: true,
  state: {
    myplanStatus: 'myplanShow',
    viewData: [] // 视图数据
  },
  mutations: {
    TOGGLE_STATUS: (state, status) => {
      state.myplanStatus = status
    },
    SET_viewData: (state, arr) => {
      state.viewData = arr
    }
  },
  actions: {
    toggleStatus({ commit }, status) {
      commit('TOGGLE_STATUS', status)
    },
    setViewData({ commit }, arr) {
      commit('SET_viewData', arr)
    }
  }
}

export default plan