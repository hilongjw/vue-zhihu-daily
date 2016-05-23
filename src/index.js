import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueProgressbar from 'vue-progressbar'
import { sync } from 'vuex-router-sync'

import App from './views/app'
import store from './vuex/index/store'
import router from './router/index'
import CovLocalDB from './util'

Vue.use(VueProgressbar)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

const IMG_MAP = new CovLocalDB('vue-zhihu-img')

Vue.prototype.$preImg = (uri) => {
    if (IMG_MAP[uri]) {
    }
}

Vue.prototype.$covImg = (self, uri, callback) => {
    if (IMG_MAP.get(uri)) {
        return callback(IMG_MAP.get(uri))
    }

    let data = window.btoa(uri.split('').reverse().join(''))
    self.$http.get(window.location.origin + '/imagebox?type=rev-64&data=' + data)
        .then(response => {
            if (response.data.code === 200) {
                IMG_MAP.set(uri, response.data.data.url)
                callback(response.data.data.url)
            } else {
                console.log(response.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

Vue.prototype.$Api = (url) => {
    return window.location.origin + '/readapi?uri=' + url
}

Vue.config.debug = process.env.NODE_ENV === 'dev'

sync(store, router)

router.start(App, 'cov-app')
