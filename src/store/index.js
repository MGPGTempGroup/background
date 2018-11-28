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
import content from './modules/content'
import industryUpdates from './modules/industryUpdates'
import company from './modules/company'
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
    content,
    serviceMessage,
    company,
    industryUpdates
  },
  getters
})

export default store
