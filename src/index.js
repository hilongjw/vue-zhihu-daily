import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueProgressbar from 'vue-progressbar'
import { sync } from 'vuex-router-sync'

import App from './views/app'
import store from './vuex/index/store'
import router from './router/index'

Vue.use(VueProgressbar)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

let localStorage = window.localStorage
let IMG_MAP = {
    data: {},
    init () {
        if (localStorage['vue-zhihu-img']) {
            this.data = JSON.parse(localStorage['vue-zhihu-img'])
        }
    },
    set (uri, data) {
        this.data[uri] = data
        localStorage['vue-zhihu-img'] = JSON.stringify(this.data)
    },
    get (uri) {
        if (this.data[uri]) {
            return this.data[uri]
        }
        return false
    }
}
IMG_MAP.init()

Vue.prototype.$preImg = (uri) => {
    if (IMG_MAP[uri]) {
    }
}

Vue.prototype.$covImg = (self, uri, callback) => {
    if (IMG_MAP.get(uri)) {
        return callback(IMG_MAP.get(uri))
    }

    let data = window.btoa(uri.split('').reverse().join(''))
    self.$http.get('imagebox?type=rev-64&data=' + data)
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
    return 'readapi?uri=' + url
}

Vue.config.debug = true

sync(store, router)

router.start(App, 'cov-app')
