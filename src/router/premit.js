import router from './index'
import { getToken, removeToken, removeUserName } from '../utils/app'
import store from '@/store/index'

// 白名单,免授权页面
const whiteRouter = ['/login']
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken() && getToken() !== 'undefined') {
    if (to.path === '/login') {
      removeToken()
      removeUserName()
      store.commit('app/SET_TOKEN', '')
      store.commit('app/SET_USERNAME', '')
      next()
    } else {
      // 获取角色
      // 动态分配路由权限
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      // to 进入的下一个页面 from 离开之前的页面
      next()
      // 进入下个页面,带参跳转页面
    } else {
      alert('请登陆')
      next('/login')
    }
  }
})
