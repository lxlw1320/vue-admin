"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.setToken = setToken;
exports.removeToken = removeToken;
exports.getUserName = getUserName;
exports.setUserName = setUserName;
exports.removeUserName = removeUserName;

var _cookie_js = _interopRequireDefault(require("cookie_js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = 'admin_token';
var userName = 'username';

function getToken() {
  return _cookie_js["default"].get(token);
}

function setToken(data) {
  return _cookie_js["default"].set(token, data);
}

function removeToken(data) {
  return _cookie_js["default"].remove(token);
}

function getUserName() {
  return _cookie_js["default"].get(userName);
}

function setUserName(data) {
  return _cookie_js["default"].set(userName, data);
}

function removeUserName(data) {
  return _cookie_js["default"].remove(userName);
}