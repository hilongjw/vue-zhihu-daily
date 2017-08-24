import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    datePointer: {
        value: '',
        format: ''
    },
    days: [],
    themes: []
}

const mutations = {
    SET_ARTICLES (state, date, arr) {
        state.days.push({
            date: date,
            articles: arr
        })
    },
    SET_DATE_POINTER (state, value) {
        state.datePointer = value
    },
    SET_THEMES (state, arr) {
        state.themes = arr
    }
}

export default new Vuex.Store({
    state,
    mutations,
    strict: true
})
