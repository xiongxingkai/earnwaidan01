<template>
  <div id="logintest">
    <el-form :model="loginForm"
             ref="loginForm"
             :rules="ruleForm"
             label-width="120px">
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPassword">
        <el-input v-model="loginForm.checkPassword"></el-input>
      </el-form-item>
      <div class="btnArea text-center">
        <el-button type="primary"
                   @click="submitForm">注册</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '',
        password: '',
        checkPassword: ''
      },
      ruleForm: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            required: true,
            message: '请输入确认密码密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(() => {
            loading.close()
            this.$router.push('/')
          }, 2000);
        } else {
          this.$message({
            type: 'warning',
            message: '请先完善表格后再提交'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#logintest {
  .btnArea{
    padding: 15px;
  }
}
</style>