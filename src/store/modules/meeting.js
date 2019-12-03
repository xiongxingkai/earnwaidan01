const meeting = {
  namespaced: true,
  state:{
    orderData: {},
    pageFlag: '',
    activeIndex: 'first',
    roomName: '',
    permission: true
  },
  mutations: {
    GET_ORDERDATA: (state, obj) => {
      state.orderData = obj
    },
    CHANGE_PAGE: (state, flag) => {
      state.pageFlag = flag
    },
    ACTIVE_NAME: (state, str) => {
      state.pageFlag = str
    },
    ROOM_NAME: (state, str) => {
      state.roomName = str
    },
    VIEW_PERMISSION: (state, boolean) => {
      state.permission = boolean
    }
  },
  actions: {
    getOrderFormData({ commit }, obj) {
      commit('GET_ORDERDATA', obj)
    },
    changePage({ commit }, flag) {
      commit('CHANGE_PAGE', flag)
    },
    getActiveName({ commit }, str) {
      commit('ACTIVE_NAME', str)
    },
    getRoomName({ commit }, str) {
      commit('ROOM_NAME', str)
    },
    isView({ commit }, boolean) {
      commit('VIEW_PERMISSION', boolean)
    }
  }
}

export default meeting