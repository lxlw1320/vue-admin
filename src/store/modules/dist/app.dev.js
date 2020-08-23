"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = require("@/api/login");

var _app = require("@/utils/app");

var state = {
  isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
  // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
  // isCollapse: Cookie.get('isCollapse') || false
  token: (0, _app.getToken)() || '',
  username: (0, _app.getUserName)() || ''
};
var getters = {
  username: function username(state) {
    return state.name;
  }
};
var mutations = {
  SET_COLLAPSE: function SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse; // cookie
    // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    // Cookie.set('isCollapse', state.isCollapse)
    // html5本地存储

    localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
  },
  SET_TOKEN: function SET_TOKEN(state, data) {
    state.token = data;
  },
  SET_USERNAME: function SET_USERNAME(state, data) {
    state.username = data;
  }
};
var actions = {
  login: function login(content, data) {
    return new Promise(function (resolve, reject) {
      (0, _login.Login)(data).then(function (res) {
        //token username
        content.commit('SET_TOKEN', res.data.token);
        content.commit('SET_USERNAME', res.data.username);
        (0, _app.setToken)(res.data.token);
        (0, _app.setUserName)(res.data.username);
        resolve(res); // root.$message.success(res.message)
        // root.$router.replace('/console')
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  exit: function exit(content) {
    // removeToken()
    // removeUserName()
    // content.commit('SET_TOKEN', '')
    // content.commit('SET_USERNAME', '')
    return new Promise(function (resolve, reject) {
      resolve('/login');
    });
  }
};
var _default = {
  namespaced: true,
  // 命名空间
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;