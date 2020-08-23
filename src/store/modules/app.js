import { Login } from '@/api/login'
import {
  setToken,
  setUserName,
  getToken,
  getUserName,
  removeToken,
  removeUserName
} from '@/utils/app'

const state = {
  isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
  // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
  // isCollapse: Cookie.get('isCollapse') || false
  token: getToken() || '',
  username: getUserName() || ''
}
const getters = {
  username: state => state.name
}
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    // cookie
    // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    // Cookie.set('isCollapse', state.isCollapse)
    // html5本地存储
    localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_USERNAME(state, data) {
    state.username = data
  }
}
const actions = {
  login(content, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then(res => {
          //token username
          content.commit('SET_TOKEN', res.data.token)
          content.commit('SET_USERNAME', res.data.username)
          setToken(res.data.token)
          setUserName(res.data.username)
          resolve(res)
          // root.$message.success(res.message)
          // root.$router.replace('/console')
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  exit(content) {
    // removeToken()
    // removeUserName()
    // content.commit('SET_TOKEN', '')
    // content.commit('SET_USERNAME', '')
    return new Promise((resolve, reject) => {
      resolve('/login')
    })
  }
}

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions
}
