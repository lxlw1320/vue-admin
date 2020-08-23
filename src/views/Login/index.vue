<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="(item, index) in menuTab"
          :key="index"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <label>邮箱</label>
        <el-form-item prop="username" class="item-form">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <label>密码</label>
        <el-form-item prop="password" class="item-form">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <label v-if="menuTab[1].current">重复密码</label>
        <el-form-item prop="passwords" class="item-form" v-if="menuTab[1].current">
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <label>验证码</label>
        <el-form-item prop="code" class="item-form">
          <el-row :gutter="12">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ menuTab[1].current ? '注册' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { reactive, ref, onMounted } from '@vue/composition-api'
import { GetSms, Register, Login } from '@/api/login'

import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from '@/utils/validate.js'
export default {
  name: 'login',
  // setup(props, context) {
  /* 
    attrs、emit、listeners、parent、refs、root
    */
  setup(props, { refs, root }) {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      // let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!validateEmail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!validatePass(value)) {
        callback(new Error('密码为6-20的数字+字母'))
      } else {
        callback()
      }
    }
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== ruleForm.password) {
        callback(new Error('重复密码不一致'))
      } else {
        callback()
      }
    }
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      // let reg = /^[a-z0-9]{6}$/
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (!validateVCode(value)) {
        return callback(new Error('验证码规则有误'))
      } else {
        callback()
      }
    }

    // 对象reactive 变量ref
    const menuTab = reactive([
      { txt: '登录', current: false },
      { txt: '注册', current: true }
    ])

    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    })

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassword, trigger: 'blur' }],
      passwords: [{ validator: validatePasswords, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }]
    })

    const module = ref('register')

    // 登录按钮禁用状态
    const loginButtonStatus = ref(true)
    // // 验证码按钮禁用状态
    // const codeButtonStatus = ref(false)
    // const codeButtonText = ref('发送验证码')

    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码'
    })

    // 倒计时
    const timer = ref(null)
    // 函数
    const getSms = () => {
      if (!ruleForm.username) {
        root.$message.error('邮箱不能为空')
        return false
      }
      if (!validateEmail(ruleForm.username)) {
        root.$message.error('邮箱格式有误')
        return false
      }
      let requestData = {
        username: ruleForm.username,
        module: module.value
      }
      // 修改验证码按钮状态
      updateButtonStatus({
        status: true,
        text: '发送中'
      })
      GetSms(requestData)
        .then(res => {
          root.$message.success(res.message)
          loginButtonStatus.value = false
          countDown(3)
        })
        .catch(err => {
          console.log(err.message)
          updateButtonStatus({
            status: false,
            text: '发送验证码'
          })
          if (timer.value) {
            clearInterval(timer.value)
          }
        })
    }

    // 倒计时
    const countDown = time => {
      if (timer.value) {
        clearInterval(timer.value)
      }
      timer.value = setInterval(() => {
        if (!time) {
          clearInterval(timer.value)
          updateButtonStatus({
            status: false,
            text: '重新发送'
          })
          return
        }
        time--
        codeButtonStatus.text = `倒计时${time}秒`
      }, 1000)
    }
    // 清除倒计时
    const clearCountDown = () => {
      updateButtonStatus({
        status: false,
        text: '发送验证码'
      })
      if (timer.value) {
        clearInterval(timer.value)
      }
    }
    // 切换菜单
    const toggleMenu = data => {
      menuTab.forEach((element, index) => {
        if (element.txt === data.txt) {
          if (index === 0) {
            module.value = 'login'
          } else {
            module.value = 'register'
          }
        }
        element.current = false
      })
      data.current = true
      console.log(module)
      // 重置表单
      // codeButtonStatus.text = '发送验证码'
      // loginButtonStatus.value = true
      resetFormData()
      // console.log(this.menuTab)
    }
    // 清除表单数据
    const resetFormData = () => {
      refs['ruleForm'].resetFields()
      clearCountDown()
    }
    // 更新按钮状态
    const updateButtonStatus = params => {
      codeButtonStatus.status = params.status
      codeButtonStatus.text = params.text
    }
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          menuTab[0].current ? login() : register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    // 登录
    const login = () => {
      root.$store
        .dispatch('app/login', {
          ...ruleForm,
          password: sha1(ruleForm.password)
        })
        .then(res => {
          root.$message.success(res.message)
          root.$router.replace('/console')
        })
        .catch(err => {
          console.log(err)
        })
      // Login({ ...ruleForm, password: sha1(ruleForm.password) })
      //   .then(res => {
      //     root.$message.success(res.message)
      //     root.$router.replace('/console')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
    // 注册
    const register = () => {
      Register({ ...ruleForm, password: sha1(ruleForm.password) })
        .then(res => {
          root.$message.success(res.message)
          toggleMenu(menuTab[0])
          clearCountDown()
          // 清除表单验证
          return false
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {})

    return {
      menuTab,
      ruleForm,
      rules,
      loginButtonStatus,
      codeButtonStatus,
      getSms,
      toggleMenu,
      submitForm
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {}
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 23px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
