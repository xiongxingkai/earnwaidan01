<template>
  <div class="loginhr-container" @keydown.enter="handleLogin">
    <el-form class="login-form" :model="loginhrForm" :rules="loginRules" ref="loginhrForm" label-position="left">
      <h1>人力资源管理系统</h1>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginhrForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input :type="passwordType" auto-complete="new-password" v-model="loginhrForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { mapState } from 'vuex'

export default {
  components: {
    LangSelect
  },
  computed: {
    ...mapState('hr', ['Entry'])
  },
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      ip: '',
      loginhrForm: {
        usrname: '',
        password: '',
        captchaId: '',
        captcha: '',
        imageValue: '',
        accountType: 'NEWER'
      },
      loginRules: {
        usrname: [
          {
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass
          }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginhrForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginhrForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/hr/info/entry'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('hr/setEntryVal', 'newer')
  }
}
</script>

<style lang="scss">
.login-container {
  background: url(../../assets/img/hrloginbg.png) no-repeat 0 0;
  background-size: cover;
  height: 100%;
  position: relative;
  .login-form {
    height: 360px;
    width: 400px;
    position: absolute;
    left: 73%;
    top: 43%;
    margin-left: -286px;
    margin-top: -120px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 2px 3px 2px #00f;
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 40px;
    }
    .el-form-item--medium .el-form-item__content,
    .el-form-item--medium .el-form-item__label {
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 16px;
    }
    .el-form-item {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 34px;
      .el-input {
        width: 90%;
        input {
          border: 0 none !important;
        }
      }
      .svg-container {
        opacity: .6;
        font-size: 20px;
      }
    }
    .btn {
      width: 73%;
      border-radius: 10px;
      font-size: 18px;
      margin-top: 20px;
      margin-left: 51px;
    }
    .el-from-item__error {
      font-size: 16px;
      padding-top: 8px;
      color: #f00;
    }
  }
}
</style>

