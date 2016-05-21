<template>
  <div>
    <div class="__cov-modal-title">安全设置</div>
    <div class="__cov-modal-text">
      <textfield :textfield="username"></textfield>
      <textfield :textfield="password"></textfield>
    </div>
    <div>
      <cov-button class="__cov-modal-btn">SAVE</cov-button>
    </div>
  </div>
</template>

<script>
import { covButton, textfield } from '../../components/index'

export default {
  data () {
    return {
      username: {
        value: '',
        placeholder: '屏蔽关键词，使用 | 分开多个关键词'
      },
      password: {
        value: '',
        placeholder: 'password'
      }
    }
  },
  components: {
    covButton,
    textfield
  }
}
</script>

<style>
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
