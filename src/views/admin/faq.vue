<template>
  <div>
    <div class="__cov-modal-title">FAQ</div>
    <div class="__cov-modal-text">
      <p @click="alertMe">233333333</p>
    </div>
    <div class="__cov-modal-actions">
      <cov-button class="__cov-modal-btn">LOGIN</cov-button>
    </div>
  </div>
</template>

<script>
import { covButton } from '../../components/index'
import { showAlert } from '../../vuex/admin/action'

export default {
  vuex: {
    actions: {
      showAlert
    }
  },
  data () {
    return {
      username: {
        value: '',
        placeholder: 'username'
      },
      password: {
        value: '',
        placeholder: 'password'
      }
    }
  },
  components: {
    covButton
  },
  methods: {
    alertMe () {
      this.showAlert('asdknaksfnkasfn')
    }
  }
}
</script>

<style>
  .__cov-modal {
    position: fixed;
    height: 300px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 16px;
    font-weight: 400;
    min-height: 200px;
    overflow: hidden;
    width: 330px;
    z-index: 1;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 100;
    font-family: 'Roboto','Helvetica', "Microsoft YaHei", 'Arial', sans-serif;
  }
  .__cov-modal-title {
    color: rgba(0,0,0,.54);
    font-size: 13px;
    line-height: 18px;
    overflow: hidden;
    padding: 16px;
    width: 90%;
  }
  .__cov-modal-text {
    color: rgba(0,0,0,.54);
    font-size: 13px;
    line-height: 18px;
    overflow: hidden;
    padding: 16px;
    width: 90%;
  }
  .__cov-modal-actions {
    position: absolute;
    bottom: 0;
    font-size: 16px;
    line-height: normal;
    width: 100%;
    background-color: transparent;
    padding: 8px;
    box-sizing: border-box;
  }
  .__cov-modal-btn {
    float: right;
  }
</style>
