import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import house from './modules/house'
import propertyOwner from './modules/propertyOwner'
import serviceMessage from './modules/serviceMessage'
import service from './modules/service'
import company from './modules/company'
import project from './modules/project'
import industryUpdate from './modules/industryUpdate'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    house,
    propertyOwner,
    service,
    serviceMessage,
    company,
    project,
    industryUpdate
  },
  getters
})

export default store
