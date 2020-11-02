<template>
  <div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

          <div class="title-container">
            <h3 class="title">Login Form</h3>
          </div>

          <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
            <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
              <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
            </el-form-item>
          </el-tooltip>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

          <div style="position:relative">
            <div class="tips">
              <span>Username : admin </span>
              <span> Password : any</span>
            </div>
          </div>
        </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/util/validate'
import axios from "axios";
export default {
  name: 'Login',
  data() {
    /**
     *
     * 用户名是否有效
     * @param rule
     * @param value
     * @param callback
     */
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    /**
     * 密码是否有效
     * @param rule
     * @param value
     * @param callback
     */
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const {key} = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          //临时方法
          var url='http://localhost:8083/user/login?name='+this.loginForm.username+'&pass='+this.loginForm.password;
          axios.post(url)
              .then(
                  response=>{
                    if(response.data.meta.success == true){
                      this.$message({
                        message: '登录成功',
                        type: 'success'
                      });
                      this.loading = false
                      this.$router.push('/test')


                    }else{
                      if(response.data.meta.message == '用户名不存在!'){
                        this.$message.error('用户名不存在');
                      }
                      else{
                        this.$message.error('密码错误');
                      }
                    }
                  }
              )


          //调用封装好的方法
          // this.$store.dispatch('http://localhost:8083/user/login', this.loginForm)
          //     .then(() => {
          //       this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //       this.loading = false
          //     })
          //     .catch(() => {
          //       this.loading = false
          //     })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }

}
</script>

<style>


.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
</style>