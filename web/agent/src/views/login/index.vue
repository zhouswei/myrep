<template>
  <div :style="{ height: bodyHeight + 'px' }" style="background-color:#f0f1f5;" class="login-container">
    <el-form class="login-form" :style="styleObj" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div style="text-align:center;" class="title-container">
        <img class="title-image" :src="tranlatePath('static/img/loginImg.png')" width="125">
      </div>
      <div class="title">{{$t('login.title')}}</div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" @click.native="handlefocus()" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input class="lml-phone-login" name="password" @click.native="handlefocus" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="new-password" placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-button class="login-btn" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      <p  @click="clickRegister" class="register">新用户注册</p>
      <p  @click="clickForgetPSW" class="forgetpsw">忘记密码</p>
    </el-form>
    <el-footer class="footer">深圳市掌通宝科技有限公司</el-footer>
    <el-dialog
      class="dialog-container"
      v-dialogDrag
      title="忘记密码"
      ref="dialog_wrapper"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :modal-append-to-body='false'
      :close-on-click-modal="false">
        <div slot="title">
          <p style="color: #37bfc8">忘记密码</p>
        </div>
        <div class="dialog-body">
          <findPassWord @close="closeDialog" ref="findPassWordRef"></findPassWord>
          <div
            class="line"
            v-dialogDragWidth="$refs.dialog_wrapper">
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import findPassWord from '@/views/login/findPassWord'
// import LangSelect from '@/components/LangSelect'
// import SocialSign from './socialsignin'
import { formatPath } from '@/utils'
export default {
  components: {findPassWord},
  mixins: [ResizeMixin],
  computed: {
    styleObj: function () {
      return { width: this.spewd }
    }
  },
  mounted () {
    if (this.isMobile()) {
      console.log('mobile')
      this.spewd = '90%'
      this.dialogWidth = '100%'
    } else {
      console.log('desktop')
      this.spewd = '520px'
      this.dialogWidth = '50%'
    }
    this.bodyHeight = document.documentElement.clientHeight
  },
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      bodyHeight: 100,
      dialogWidth: '80%',
      spewd: '520px',
      dialogVisible: false,
      // styleObj: {
      //   width: this.spewd
      // },
      loginForm: {
        username: '',
        pushToken: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handlefocus (eve) {
      // this.$nextTick(function () {
      //   document.documentElement.scrollTop = 1000000
      // })
      // setTimeout(() => {
      //   // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //   document.documentElement.scrollTop = 10000
      // }, 100)
    },
    tranlatePath (path) {
      return formatPath(path)
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan () {
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
      //     this.$router.push({ path: '/' })
      //   })
      // }
    },
    clickForgetPSW () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.findPassWordRef.update()
      })
    },
    clickRegister () {
      this.$router.push({ path: '/userRegister' })
    },
    closeDialog () {
      this.dialogVisible = false
    }
  },
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#f0f8ff;
$light_gray:#eee;
$fillbg: #e5e1db;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $fillbg inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #37bfc7;
    // overflow: hidden;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
  .el-footer {
    padding: 20px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#ffffff;
$dark_gray:#889aa4;
$light_gray:#eee;
$bgform: transparent;
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 82%;
}
.login-container {
  position: absolute;
  min-height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  .title {
    margin-top: 10px;
    margin-bottom: 40px;
    text-align: center;
    font-size: 26px;
    color: #363a3a;
    width: 100%;
  }
  background-repeat: no-repeat;
  background-size: 100%;
  .login-form {
    position: relative;
    padding: 35px 35px 15px 35px;
    margin: 10px auto 30px;
    border-radius: 5px;
    background: $bgform;
    .login-btn{
      color: #fff;
      width: 100%;
      margin-bottom: 30px;
      text-align: center;
      background: #37bfc8;
      padding: 15px 0;
    }
    .register{
      color: #549dfe;
      float: left;
      cursor: pointer;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .forgetpsw{
      color: #549dfe;
      float: right;
      cursor: pointer;
      margin-top: 0px;
      margin-bottom: 0px;
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
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 6px 25px 6px 15px;
    margin-left: 0px;
    color: $dark_gray;
    vertical-align: middle;
    background-color: #f0f0f0;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .svg-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: #37bfc8;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    margin-top: 10%;
    .title-image {
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
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
  .footer{
    height: 10%;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
}
</style>
