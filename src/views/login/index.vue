<template>
  <div class="login-container" @keydown.enter="handleLogin">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <!-- <h3 class="title">{{$t('login.title')}}</h3>
        <img src="../../assets/img/logo.png" class="img" > -->
        <h3 class="title">深圳高速工程顾问有限公司</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <div>
        <el-form-item prop="captcha" class="validate">
          <span class="svg-container">
            <svg-icon icon-class="ant" />
          </span>
          <el-input  name="captchaId" type="text" v-show="false" v-model="loginForm.captchaId" autoComplete="on" ></el-input>
          <el-input name="captcha" type="text" v-model="loginForm.captcha" autoComplete="on" ></el-input>
        </el-form-item>
        <img :src="loginForm.imageValue" @click="fetchGaptcha" class="validate-code" />
      </div>
      <el-button type="primary" class="btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      <router-link to="/findPassword">
        <span style="color: #a9ccf6;">忘记密码</span>
      </router-link>
    </el-form>
  </div>
</template>
<script>
import { getGaptcha } from '@/api/login'
import LangSelect from '@/components/LangSelect'
import { mapState } from 'vuex'
import { loginLog } from '@/api/personal/index'
import { log } from 'util';

export default {
  name: 'login',
  components: {
    LangSelect
  },
  computed: {
    ...mapState('hr', ['Entry'])
  },
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
      loginForm: {
        usrname: '',
        password: '',
        captchaId: '',
        captcha: '',
        imageValue: '',
        accountType: ''
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
    getUserIP(onNewIP) {
      const MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
      const pc = new MyPeerConnection({ iceServers: []})
      const noop = Function
      const localIPs = {}
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
      const iterateIP = ip => {
        if (!localIPs[ip]) {
          onNewIP(ip)
        }
        localIPs[ip] = true
      }
      pc.createDataChannel('')
      pc.createOffer().then(sdp => {
        sdp.sdp.split('\n').forEach(line => {
          if (line.indexOf('candidate') < 0) {
            return
          }
          line.match(ipRegex).forEach(iterateIP)
        })
        pc.setLoaclDescription(sdp, noop, noop)
      })
      pc.onicecandidate = ice => {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
          return
        }
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$store.dispatch('hr/setEntryVal', '')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            const param = {
              deleted: false,
              ipAddr: this.ip,
              type: 'pc',
              userId: ''
            }
            loginLog(param).then()
            this.$router.push({
              path: '/'
            })
            // this.showDialog = true
          }).catch(() => {
            this.loading = false
            this.fetchGaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({path: '/'})
      //   })
      // }
    },
    fetchGaptcha() {
      getGaptcha().then(response => {
        this.loginForm.captchaId = response.data.id
        this.loginForm.imageValue = 'data:image/jpg;base64,' + response.data.value
      })
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.fetchGaptcha()
    this.getUserIP(ip => {
      this.ip = ip
    })
  },
  destroyed() {
    window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>
<style lang="scss" >
$bg: #2d3a4b;
$light_gray: #eee;
/* reset element-ui css */

.login-container {
  background: url(../../assets/img/carousel4.jpg) no-repeat 0 0;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      height: 47px;
      color: #fff;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #173447 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(0,0,0,.1);
    border-radius: 24px;
    color: #454545;
  }
  .el-button {
    border-radius: 18px;
  }
}
</style>
<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  .login-form {
    position: absolute;
    border-radius: 12px;
    left: 50%;
    top: 50%;
    width: 460px;
    padding: 35px 35px 15px;
    transform: translate(-50%, -60%);
    background-color: rgba(15, 106, 159, .4);
    .validate {
      width: 50%;
      display: inline-block;
      .el-input {
        width: 60%;
      }
    }
    .validate-code {
      width: 40%;
      height: 60%;
      margin-left: 8%;
      vertical-align: middle;
      display: inline-block;
      border-radius: 10px;
    }
    .btn {
      width: 100%;
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 7px 5px 7px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      font-weight: 400;
      color: #a9ccf6;
      margin: 0 auto 20px;
      font-weight: bold;
      background: url(../../assets/img/logo.png) no-repeat 0 0;
      padding-left: 60px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
