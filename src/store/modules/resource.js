const resource = {
  namespaced: true,
  state: {
    systemStatus: 'formDetail',
    transactionId: '', // 办理id
    checkId: '', // 待处理-查看id
    haveCheckId: '', // 已处理-查看id
    edit: false, // 控制编辑
    applicationId: '', // 变更申请id
    entryStatus: false, // 控制变更申请跳转展示的table
    entryStep: 1,
    tableStatus: false, // 控制少字段的table展示
    Entry: '', // 标识是申请状态
    // checkStatus: false, // 控制审核按钮
    approvalShow: false, // 控制审核意见显示或隐藏
    approvalTextShow: false, // 控制审核意见是否能编辑
    approvalOpinion: '', // 审核意见
    saveBtnShow: false, // 控制保存按钮显示隐藏
    nextStepShow: false, // 控制转交下一步按钮显示隐藏
    detailId: '', // 详情id
    orderId: '', // 流程id
    activityId: '', // 流程节点ID
    processId: '', // 流程处理id
    taskId: '' // 流程任务id
  },
  mutations: {
    // 详情id
    SET_DetailId: (state, detailId) => {
      state.detailId = detailId
    },
    // 流程id
    SET_OrderId: (state, orderId) => {
      state.orderId = orderId
    },
    // 流程节点id
    SET_ActivityId: (state, activityId) => {
      state.activityId = activityId
    },
    // 流程处理id
    SET_ProcessId: (state, processId) => {
      state.processId = processId
    },
    // 流程任务id
    SET_TaskId: (state, taskId) => {
      state.taskId = taskId
    },
    // 控制跳转
    TOGGLE_STATUS: (state, status) => {
      state.systemStatus = status
    },
    // 办理id
    SET_TransactionId: (state, transactionId) => {
      state.transactionId = transactionId
    },
    // 控制编辑状态
    SET_Edit: (state, bool) => {
      state.edit = bool
    },
    SET_EntryStep: (state, num) => {
      state.entryStep = num
    },
    // 控制变更申请跳转展示的table
    SET_EntryStatus: (state, bool) => {
      state.entryStatus = bool
    },
    // 控制审核意见是否能编辑
    SET_ApprovalTextShow: (state, bool) => {
      state.approvalTextShow = bool
    },
    // 控制审核意见显示隐藏
    SET_ApprovalShow: (state, bool) => {
      state.approvalShow = bool
    },
    // 设置审核意见
    SET_ApprovalOpinion: (state, str) => {
      state.approvalOpinion = str
    },
    SET_SaveBtnShow: (state, bool) => {
      state.saveBtnShow = bool
    },
    // 控制转交下一步按钮显示隐藏
    SET_NextStepShow: (state, bool) => {
      state.nextStepShow = bool
    },
    // 待处理-查看id
    SET_CheckId: (state, checkId) => {
      state.checkId = checkId
    },
    // 已处理-查看id
    SET_HaveCheckId: (state, haveCheckId) => {
      state.haveCheckId = haveCheckId
    },
    // 变更申请id
    SET_ApplicationId: (state, applicationId) => {
      state.applicationId = applicationId
    },
    // 控制少字段的table展示
    SET_TableStatus: (state, bool) => {
      state.tableStatus = bool
    },
    SET_EntryVal: (state, val) => {
      state.Entry = val
    }
  },
  actions: {
    // 详情id
    setDetailId({ commit }, detailId) {
      commit('SET_DetailId', detailId)
    },
    // 流程id
    setOrderId({ commit }, orderId) {
      commit('SET_OrderId', orderId)
    },
    // 流程节点id
    setActivityId({ commit }, activityId) {
      commit('SET_ActivityId', activityId)
    },
    // 流程处理id
    setProcessId({ commit }, processId) {
      commit('SET_ProcessId', processId)
    },
    // 流程任务id
    setTaskId({ commit }, taskId) {
      commit('SET_TaskId', taskId)
    },
    // 控制跳转
    toggleStatus({ commit }, status) {
      commit('TOGGLE_STATUS', status)
    },
    // 办理id
    setTransactionId({ commit }, transactionId) {
      commit('SET_TransactionId', transactionId)
    },
    // 控制编辑状态
    toggleEdit({ commit }, bool) {
      commit('SET_Edit', bool)
    },
    setEntryStep({ commit }, num) {
      commit('SET_EntryStep', num)
    },
    // 控制变更申请跳转展示的table
    setEntryStatus({ commit }, bool) {
      commit('SET_EntryStatus', bool)
    },
    // 控制审核意见是否能编辑
    setApprovalTextShow({ commit }, bool) {
      commit('SET_ApprovalTextShow', bool)
    },
    // 控制审核意见显示隐藏
    setApprovalShow({ commit }, bool) {
      commit('SET_ApprovalShow', bool)
    },
    // 审核意见
    setApprovalOpinion({ commit }, str) {
      commit('SET_ApprovalOpinion', str)
    },
    // 控制保存按钮显示隐藏
    setSaveBtnShow({ commit }, bool) {
      commit('SET_SaveBtnShow', bool)
    },
    // 控制转交下一步按钮显示隐藏
    setNextStepShow({ commit }, bool) {
      commit('SET_NextStepShow', bool)
    },
    // 待处理-查看id
    setCheckId({ commit }, checkId) {
      commit('SET_CheckId', checkId)
    },
    // 已处理-查看id
    setHaveCheckId({ commit }, haveCheckId) {
      commit('SET_HaveCheckId', haveCheckId)
    },
    // 变更申请id
    setApplicationId({ commit }, applicationId) {
      commit('SET_ApplicationId', applicationId)
    },
    // 控制少字段的table展示
    setTableStatus({ commit }, bool) {
      commit('SET_TableStatus', bool)
    },
    setEntryVal({ commit }, val) {
      commit('SET_EntryVal', val)
    }
  }
}

export default resource