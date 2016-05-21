<template>
  <header>
  <div class="__cov-admin-header">
    DAN MU ADMIN
  </div>
  <nav class="__cov-admin-nav">
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.setting)"
      :state="nav.setting"
      v-link="{ path: 'setting' }"
    >SETTING</nav-tab>
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.list)"
      :state="nav.list"
      v-link="{ path: 'list' }"
    >LIST</nav-tab>
    <nav-tab 
      class="__cov-admin-nav-tab"
      @click="navClick(nav.faq)"
      :state="nav.faq"
      v-link="{ path: 'faq' }"
    >FAQ</nav-tab>
  </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import { navTab } from '../../components/index'

export default {
  vuex: {
    getters: {
    }
  },
  data () {
    return {
      nav: {
        setting: {
          active: false
        },
        list: {
          active: false
        },
        faq: {
          active: false
        }
      }
    }
  },
  components: {
    navTab
  },
  events: {
    'del-item': function (item) {
      this.$dispatch('top-del-item', item)
    }
  },
  methods: {
    navClick (tab) {
      this.nav.setting.active = false
      this.nav.list.active = false
      this.nav.faq.active = false
      tab.active = true
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
  .__cov-admin-header {
    box-sizing: border-box;
    height: 5em;
    font-size: 2em;
    line-height: 5em;
    padding-left: 1em; 
    color: #fff; 
    text-align: left;
    background-color: rgb(103,58,183);
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
    background-color: rgb(81, 45, 168);
  }
</style>
