import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  Alert: {
    message: '',
    show: false
  },
  checkList: []
}

const mutations = {
  ['SHOW_ALERT'] (state, msg) {
    state.Alert.message = msg
    state.Alert.show = true
  },
  ['HIDE_ALERT'] (state, msg) {
    state.Alert.message = ''
    state.Alert.show = false
  },
  ['ADD_CHECKLIST'] (state, item) {
    state.checkList.push(item)
  },
  ['REMOVE_CHECKLIST'] (state, item) {
    state.checkList.$remove(item)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: true
})
