import { stat } from "fs";

const salary = {
  // 这是调薪管理的仓库模块
  namespaced: true,
  state:{
    salaryStatus: 'salaryInfo', // 调薪管理
    checUpID: '', // 调薪管理办理id
    addOrEditStatus: false, // 标识是新增还是编辑
    doneLookID: '', // 我已处理的查看id
    finishedLookID: '', // 我已完成的查看id
    orderID: '', // 流程id
    tabStatus: '', // 保存对应tab切换的名称
    tabIndex: '', // 保存切换tab的下标值
    secondaryIDs: {}, // 二次转交下一步的时候需要用到的id集合
    backBtnShow: false, // 退回按钮的显示隐藏
    // .....................以下是表单控制的状态
    disableBool: false, // 新增时候的状态 aa
    administrativeBool: false, // 行政两个输入框的状态cc
    filialeBool: false, // 公司分管意见的输入框状态dd
    gereralManagerBool: false, // 总经理意见的输入框状态
    // ......................工资核算管理页面的
    wagAccountingStatus: 'wagInfo', // 工资核算管理
    wagAccountingID: '', // 工资核算管理id
    // .......................工资报表审核管理页面
    reportStatus: 'reviewInfo',
    reportTodoid: '', // 我代办的查看id

    reportDoneID: '', // 我已处理的查看ID
    reportFinishedID: '', // 我已完成的查看ID
    reportOrderID: '', // 流程id
    reportSecondaryIDs: {}, // 二次转交下一步的时候需要用到的id集合
    reportBackBtnShow: false // 退回按钮的显示隐藏 
  },
  mutations: {
    // 控制调薪管理
    TOGGLE_STATUS: (state, status) => {
      state.salaryStatus = status
    },
    // 调薪管理办理id
    CHEC_UPID: (state, cheId) => {
      state.checUpID = checId
    },
    // 标识是新增还是编辑
    ADDOREDIT_STATUS: (state, bool) => {
      state.addOrEditStatus = bool
    },
    // 我已办理查看id
    DONE_LOOKID: (state, lookId) => {
      state.doneLOOkID = lookId
    },
    // 我已完成查看id
    FINISHED_LOOKID: (state, lookId) => {
      state.finishedLookID = lookId
    },
    // 流程id
    ORDER_ID: (state, order) => {
      state.orderID = order
    },
    // tab切换名称
    TAB_STATUS: (state, name) => {
      state.tabStatus = name
    },
    // tab切换下标
    TAB_INDEX: (state, str) => {
      state.tabIndex = str
    },
    // 二次转交需要用到的id集合
    SECONDARY_IDS: (state, obj) => {
      state.secondaryIDs = obj
    },
    // 退回按钮的显示或者隐藏
    BACKBTN_SHOW: (state, bool) => {
      state.backBtnShow = bool
    },
    // ..............
    DISABLE_BOOL: (state, bool) =>{
      state.disableBool = bool
    },
    ADMINISTRATIVE_BOOL: (state, bool) =>{
      state.administrativeBool = bool
    },
    FILIALE_BOOL: (state, bool) =>{
      state.filialeBool = bool
    },
    GENERALMANAGER_BOOL: (state, bool) =>{
      state.generalManagerBool = bool
    },
    // *************************工资核算
    WAGACCOUNTING_ID: (state, bool) =>{
      state.wagAccountingID = bool
    },
    // 控制工资核算管理
    WAG_STATUS: (state, status) =>{
      state.wagAccountingStatus = status
    },
    // ******************************工资报表审核
    TOGGLEReview_STATUS: (state, status) =>{
      state.reportStatus = status
    },
    // 待办查看id
    REPORT_TODOID: (state, lookId) =>{
      state.reportTodoid = lookId
    },
    // 已办查看id
    REPORT_DONEID: (state, lookId) =>{
      state.reportDoneID = lookId
    },
    // 完成查看id
    REPORT_FINISHEDID: (state, lookId) =>{
      state.reportFinishedID = lookId
    },
    // 流程id
    REPORT_ORDERID: (state, order) =>{
      state.reportOrderID = order
    },
    // 二次转交需要用到的id集合
    REPORT_SECONDARYIDS: (state, obj) =>{
      state.reportSecondaryIDs = obj
    },
    // 退回按钮的显示或者隐藏
    REPORT_BACKBTNSHOW: (state, bool) =>{
      state.reportBackBtnShow = bool
    }
  },
  actions: {
    // 控制调薪管理
    toggleStatus({ commit }, status) {
      commit('TOGGLE_STATUS', status)
    },
    // 调薪管理办理id
    checUpid({ commit }, checId) {
      commit('CHEC_UPID', checId)
    },
    // 标识是新增还是编辑
    addEditStatus({ commit }, bool) {
      commit('ADDOREDIT_STATUS', bool)
    },
    // 我已办理查看id
    doneLookID({ commit }, lookId) {
      commit('DONE_LOOKID', lookId)
    },
    // 我已完成查看id
    finishedLookid({ commit }, lookId) {
      commit('FINISHED_LOOKID', lookId)
    },
    // 流程id
    orderId({ commit }, order) {
      commit('ORDER_ID', order)
    },
    // tab切换名称
    tabs({ commit }, name) {
      commit('TAB_STATUS', name)
    },
    // tab切换下标
    tabsIndex({ commit }, str) {
      commit('TAB_INDEX', str)
    },
    // 二次转交需要用到的id集合
    actionsSecondary({ commit }, obj) {
      commit('SECONDARY_IDS', obj)
    },
    // 退回按钮的显示或者隐藏
    backBtn({ commit }, bool) {
      commit('BACKBTN_SHOW', bool)
    },
    // **********************************
    disable({ commit }, bool) {
      commit('DISABLE_BOOL', bool)
    },
    administrative({ commit }, bool) {
      commit('ADMINISTRATIVE_BOOL', bool)
    },
    filiale({ commit }, bool) {
      commit('FILIALE_BOOL', bool)
    },
    generalmanager({ commit }, bool) {
      commit('GENERALMANAGER_BOOL', bool)
    },
    // ********************************** 工资核算管理
    wageditId({ commit }, editId) {
      commit('WAGACCOUNTING_ID', editId)
    },
    // 控制工资核算管理
    wagStatus({ commit }, status) {
      commit('WAG_STATUS', status)
    },
    // ******************************** 工资报表审核管理
    toggleReviewStatus({ commit }, status) {
      commit('TOGGLEReview_STATUS', status)
    },
    // 我代办查看id
    reportTodoId({ commit }, id) {
      commit('REPORT_TODOID', id)
    },
    // 我已处理查看id
    reportDoneid({ commit }, lookId) {
      commit('REPORT_DONEID', lookId)
    },
    // 我已完成查看id
    reportFinishedid({ commit }, lookId) {
      commit('REPORT_FINISHEDID', lookId)
    },
    // 流程id
    reportOrderId({ commit }, order) {
      commit('REPORT_ORDERID', order)
    },
    // 二次转交需要用到的id集合
    reportSecondaryIds({ commit }, obj) {
      commit('REPORT_SECONDARYIDS', obj)
    },
    // 退回按钮时的显示或者隐藏
    reportBackBtn({ commit }, bool) {
      commit('REPORT_BACKBTNSHOW', bool)
    }
  }
}

export default salary
