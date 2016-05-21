import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './views/admin'
import store from './vuex/admin/store'
import router from './router/admin'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.debug = true

sync(store, router)

router.start(App, 'app')
