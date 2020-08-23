import Vue from 'vue'
import SvgIcon from './SvgIcon.vue'
// 自定义全局组件
Vue.component('svg-icon', SvgIcon)

// 读取目录的所有文件(目录，是否遍历子级,定义遍历文件规则)
const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => {
  console.log(requireContext.keys())
  console.log(requireContext.keys().map(requireContext))

  return requireContext.keys().map(requireContext)
}
requireAll(req)
