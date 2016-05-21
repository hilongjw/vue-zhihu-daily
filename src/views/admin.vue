<template>
  <dashboard v-if="!Login.show"></dashboard>
  <cov-alert :alert="Alert"></cov-alert>
  <login v-if="Login.show" :login="Login" :action="goLogin"></login>
</template>

<script>
import { Site, List, generateBullet } from '../util'
import { covAlert } from '../components/index'
import login from './admin/login.vue'
import dashboard from './admin/dashboard.vue'
import store from '../vuex/admin/store'
import { showAlert, addCheckList } from '../vuex/admin/action'

const loadRealtime = function (self) {
  List.orderByChild('tick').on('child_added', (newObj) => {
    self.addCheckList(generateBullet(newObj))
  })
}

export default {
  store: store,
  vuex: {
    getters: {
      Alert: state => state.Alert,
      checkList: state => state.checkList
    },
    actions: {
      showAlert,
      addCheckList
    }
  },
  data () {
    return {
      Login: {
        show: true,
        username: {
          value: 'hilongjw@qq.com',
          placeholder: 'username'
        },
        password: {
          value: '',
          placeholder: 'password'
        }
      }
    }
  },
  components: {
    dashboard,
    covAlert,
    login
  },
  methods: {
    goLogin () {
      Site.authWithPassword({
        email: this.Login.username.value,
        password: this.Login.password.value
      }, (err, data) => {
        if (err === null) {
          this.showAlert('auth success!')
          this.Login.show = false
          loadRealtime(this)
        } else {
          this.showAlert('auth failed,msg:', err)
        }
      })
    }
  }
}
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', 'Helvetica', sans-serif;
  }
  .__cov-admin-nav {
    height: 64px;
    margin: 0;
    width: 100%;
    padding: 0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    background-color: rgb(103,58,183);
  }
</style>
