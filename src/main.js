import Vue from 'vue'
import TheContainer from './the-container'
import router from './router'
import eventBus from './plugins/event-bus'

Vue.config.productionTip = false

Vue.use(eventBus)

window.$ = window.jQuery = require('jquery')
require('bootstrap-sass')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<the-container/>',
  components: { TheContainer }
})
