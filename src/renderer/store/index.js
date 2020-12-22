import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'

import app from './modules/app'
import auth from './modules/auth'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import pos from './modules/pos'
import terminal from './modules/terminal'
import healthy from './modules/healthy'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    settings,
    user,
    permission,
    pos,
    terminal,
    healthy
  },
  actions,
  getters
})

export default store
