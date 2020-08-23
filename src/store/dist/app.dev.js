"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = require("@/api/login");

var app = {
  state: {
    isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
    // isCollapse: Cookie.get('isCollapse') || false

  },
  // computed
  getters: {},
  mutations: {
    SET_COLLAPSE: function SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse; // cookie
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      // Cookie.set('isCollapse', state.isCollapse)
      // html5本地存储

      localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    }
  },
  actions: {
    login: function login(content, data) {
      return new Promise(function (resolve, reject) {
        (0, _login.Login)(data).then(function (res) {
          resolve(res); // root.$message.success(res.message)
          // root.$router.replace('/console')
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
  }
};
var _default = app;
exports["default"] = _default;