import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import supervise from './modules/supervise'
import getters from './getters'
import hr from './modules/hr'
import home from './modules/home'
import cost from './modules/cost'
import plan from './modules/plan'
import meeting from './modules/meeting'
import resource from './modules/resource'
import projectBill from './modules/projectBill'
import salary from './modules/salary'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    supervise,
    hr,
    home,
    cost,
    plan,
    meeting,
    resource,
    projectBill,
    salary
  },
  getters
})

store.dispatch('setLanguage', 'zh')

export default store