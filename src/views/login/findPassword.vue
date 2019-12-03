<template>
  <div class="wrap">
    <!-- <form :model="formData">

      <input v-model="formData.cellphone" placeholder="手机号码" name="cellphone">
      
      <input v-model="formData.captchaId" placeholder="短信验证码id" name="captchaId">

      <input v-model="formData.captcha" placeholder="短信验证码" name="captcha">

      <button type="button" @click="submitPhoneCaptcha()">发送</button>

      <input type="password" v-model="formData.password" placeholder="新密码" name="password">

      <input type="password" v-model="formData.checkPassword" placeholder="确认密码" name="checkPassword">

      <button type="button" @click="submitFindPassword()">提交</button>

    </form> -->
    <header>
      <span class="logo">企业信息化平台</span>
      <div class="register">
        <span>注册</span>|
        <span @click="load">登录</span>
      </div>
    </header>
    <h3 class="title">
      <span>个人找回密码</span>
      <el-button type="info" plain class="info"
        >有任何问题<br />请联系客服</el-button
      >
    </h3>
    <div class="main">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="ruleForm.cellphone"></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证码id"
          prop="captchaId"
          style="display: none;"
        >
          <el-input v-model="ruleForm.captchaId"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="captcha">
          <el-input v-model="ruleForm.captcha" class="valid"></el-input>
          <el-button type="primary" @click="submitPhoneCaptcha" class="send"
            >发送验证码</el-button
          >
        </el-form-item>
        <el-form-item label="新的密码" porp="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" porp="checkPassword">
          <el-input
            type="password"
            v-model="ruleForm.checkPassword"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFindPassword">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { phoneCaptcha, findPassword } from '@/api/login'

export default {
  name: 'findPassword',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        cellphone: '',
        captchaId: '',
        captcha: '',
        password: '',
        checkPassword: '',
        accountType: 'PERSONAL',
        phoneNumber: this.cellphone,
        captchaType: 'FIND_PASSWORD'
      },
      rules: {
        cellphone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入短信验证码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    load() {
      this.$router.push({
        name: 'login'
      })
    },
    submitPhoneCaptcha() {
      phoneCaptcha(this.ruleForm.cellphone, this.ruleForm.captchaType).then(
        response => {
          if (response.status === 200) {
            this.ruleForm.captchaId = response.data.id
            this.$notify({
              title: '成功',
              type: 'success',
              message: '发送成功',
              duration: 2000
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: response.message,
              duration: 2000
            })
          }
        }
      )
    },
    submitFindPassword() {
      if (this.ruleForm.password === this.ruleForm.checkPassword) {
        findPassword(
          this.ruleForm.cellphone,
          this.ruleForm.captchaId,
          this.ruleForm.captcha,
          this.ruleForm.password,
          this.ruleForm.accountType
        ).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '修改成功',
              duration: 2000
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: response.message,
              duration: 2000
            })
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '两次密码输入不相同！',
          duration: 2000
        })
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: url(../../assets/img/logo2.png) no-repeat 28px center;
    background-color: #000002;
    background-size: 32px;
    color: #fff;
    padding-left: 66px;
    padding-right: 200px;
    .logo {
      font-weight: 600;
      font-size: 20px;
    }
    .register {
      float: right;
      span {
        cursor: pointer;
        margin: 4px;
      }
    }
  }
  .title {
    background-color: #9da3a5;
    height: 100px;
    line-height: 100px;
    color: #fff;
    padding: 0 200px;
    font-size: 28px;
    margin: 60px 0 0;
    .info {
      float: right;
      margin-top: 28px;
    }
  }
  .main {
    background-color: #fff;
    padding: 80px 150px;
    width: 800px;
    margin: 0 auto;
    .valid {
      width: 65%;
      margin-right: 3%;
    }
    .send {
      width: 30%;
    }
  }
}
</style>
