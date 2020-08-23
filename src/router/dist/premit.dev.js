"use strict";

var _index = _interopRequireDefault(require("./index"));

var _app = require("../utils/app");

var _index2 = _interopRequireDefault(require("@/store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 白名单,免授权页面
var whiteRouter = ['/login']; // 路由守卫

_index["default"].beforeEach(function (to, from, next) {
  if ((0, _app.getToken)() && (0, _app.getToken)() !== 'undefined') {
    if (to.path === '/login') {
      (0, _app.removeToken)();
      (0, _app.removeUserName)();

      _index2["default"].commit('app/SET_TOKEN', '');

      _index2["default"].commit('app/SET_USERNAME', '');

      next();
    } else {
      // 获取角色
      // 动态分配路由权限
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      // to 进入的下一个页面 from 离开之前的页面
      next(); // 进入下个页面,带参跳转页面
    } else {
      alert('请登陆');
      next('/login');
    }
  }
});