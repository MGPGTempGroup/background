import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import housing from './modules/housing'
import propertyOwner from './modules/propertyOwner'
import userComment from './modules/userComment'
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
    housing,
    propertyOwner,
    content,
    userComment,
    company,
    industryUpdates
  },
  getters
})

export default store
