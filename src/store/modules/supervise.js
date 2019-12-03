import { getObj } from '@/api/project/supervise/prj-info/project'

const supervise = {
  namespaced: true,
  state: {
    projectId: -1,
    currentProjectItem: undefined,
    formEdit: true,
    formStatus: '',
    projectTree: [],
    currentNode: { id: -1, type: '' },
    subitemTab: {
      headerName: '',
      componentId: '',
      activeName: ''
    }
  },
  mutations: {
    SET_PROJECT_ID: (state, projectId) => {
      state.projectId = projectId
    },
    SET_CURRENT_PROJECT_ITEM: (state, currentProjectItem) => {
      state.currentProjectItem = currentProjectItem
    },
    SET_FORM_EDIT: (state, formEdit) => {
      state.formEdit = formEdit
    },
    SET_FORM_STATUS: (state, formStatus) => {
      state.formStatus = formStatus
    },
    SET_PROJECT_TREE: (state, data) => {
      state.peojectTree = data
    },
    SET_CURRENT_NODE: (state, node) => {
      state.currentNode = node
    },
    SET_SUBITEM_TAB: (state, subitemTab) => {
      state.subitemTab = subitemTab
    }
  },
  actions: {
    SetProjectId({ commit }, projectId) {
      commit('SET_PROJECT_ID', projectId)
    },
    SetCurrentProjectItem({ commit }, currentProjectItem) {
      commit('SET_CURRENT_PROJECT_ITEM', currentProjectItem)
    },
    SetFormEdit({ commit }, formEdit) {
      commit('SET_FORM_EDIT', formEdit)
    },
    SetFormStatus({ commit }, formStatus) {
      commit('SET_FORM_STATUS', formStatus)
    },
    GetprojectTree({ commit }, state) {
      getObj(state.projectId).then(Response => {
        if (Response.status === 200 && Response.data !== null) {
          const data = [{ id: response.data.id, label: response.data.name, type: 'project'}]
          commit('SET_FORM_STATUS', data)
        } else {
          commit('SET_PROJECT_TREE', [])
        }
      })
    },
    SetCurrentNode({ commit }, node) {
      commit('SET_CURRENT_NODE', node)
    },
    SetSubitemTab({ commit }, subitemTab) {
      commit('SET_SUBITEM_TAB', subitemTab)
    }
  }
}

export default supervise