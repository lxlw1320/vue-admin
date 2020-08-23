import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie_js'
import { GetSms, Register, Login } from '@/api/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
    // isCollapse: Cookie.get('isCollapse') || false
  },
  // computed
  getters: {},
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      // cookie
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      // Cookie.set('isCollapse', state.isCollapse)
      // html5本地存储
      localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    login(content, data) {
      return new Promise((resolve, reject) => {
        Login(data)
          .then(res => {
            resolve(res)
            // root.$message.success(res.message)
            // root.$router.replace('/console')
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {}
})
