import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import App from './App.vue'
import router from './router'
import './router/premit'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './icons'

Vue.use(VueCompositionApi)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
