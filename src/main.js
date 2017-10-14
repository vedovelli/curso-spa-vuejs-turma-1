import Vue from 'vue'
import TheContainer from './the-container'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<the-container/>',
  components: { TheContainer }
})
