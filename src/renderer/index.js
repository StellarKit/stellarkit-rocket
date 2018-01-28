import Vue from 'vue'
import App from '../App.vue'
import $ from 'jquery'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

if ($('#app').length > 0) {
  new Vue(Vue.util.extend({
    el: '#app'
  }, App))
}
