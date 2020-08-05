/*
 * 过滤特殊字符
 */
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  )
  var rs = ''
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '')
  }
  return rs
}

/*
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return !reg.test(value) ? false : true
}

/*
 * 验证密码
 */
export function validatePass(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return !reg.test(value) ? false : true
}

/*
 * 验证验证码
 */
export function validateVCode(value) {
  let reg = /^[a-z0-9]{6}$/
  return !reg.test(value) ? false : true
}
