import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true
})

router.map({
    '/': {
        name: 'index',
        component: (resolve) => {
            require(['../views/index/list.vue'], resolve)
        }
    },
    '/themes': {
        name: 'themes',
        component: (resolve) => {
            require(['../views/index/themes.vue'], resolve)
        }
    },
    '/themes/:id': {
        name: 'theme-list',
        component: (resolve) => {
            require(['../views/index/themeList.vue'], resolve)
        }
    },
    '/news/:id': {
        name: 'news',
        component: (resolve) => {
            require(['../views/index/news.vue'], resolve)
        }
    },
    '/about/': {
        name: 'about',
        component: (resolve) => {
            require(['../views/index/about.vue'], resolve)
        }
    }
})

export default router
