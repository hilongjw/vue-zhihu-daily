<template>
  <div>
    <div class="__cov-check-title">
    弹幕管理
    <textfield :textfield="search"></textfield>
    </div>
    <div>
      <div 
        class="__cov-item __cov-check-item"
        v-for="item in showList"
        track-by="_key"
      >
        <img class="__cov-admin-check-avatar" v-if="item.avatar" :src="item.avatar">
        <span class="__cov-item-username">
          {{item.nickname}}
        </span>
        {{item.word}}
        <cov-button class="__cov-del-btn" @click="delItem(item)">Delete</cov-button>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from '../../util'
import { covButton, textfield } from '../../components/index'
import { removeCheckList, showAlert } from '../../vuex/admin/action'

export default {
  vuex: {
    getters: {
      checkList: state => state.checkList
    },
    actions: {
      removeCheckList,
      showAlert
    }
  },
  data () {
    return {
      search: {
        placeholder: 'Search',
        value: ''
      }
    }
  },
  computed: {
    showList () {
      if (this.search.value === '') {
        return this.checkList
      } else {
        let haveIt = new RegExp(this.search.value, 'g')
        return this.checkList.filter((item) => {
          if (haveIt.test(item.word) || haveIt.test(item.nickname)) {
            return true
          }
          return false
        })
      }
    }
  },
  components: {
    covButton,
    textfield
  },
  methods: {
    delItem (item) {
      let ref = List.child(item.key)
      ref.remove((data) => {
        if (!data) {
          this.removeCheckList(item)
          this.showAlert('del done')
        } else {
          this.showAlert('failed to del', item.username, item.word)
        }
      })
    }
  }
}
</script>

<style>
.__cov-del-btn {
  position: absolute;
  right: 0px;
}
.__cov-check-item {
  position: relative;
  margin: 20px 60px 0 60px;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  max-width: 500px;
  width: 380px;
}
.__cov-check-title {
  color: rgba(0,0,0,.54);
  font-size: 13px;
  line-height: 18px;
  overflow: hidden;
  padding: 16px;
  width: 90%;
}
.__cov-check-list{ 
  overflow-y: scroll;
  height: 100%;
}
.__cov-admin-check-avatar {
  height: 3.5em;
}
</style>
