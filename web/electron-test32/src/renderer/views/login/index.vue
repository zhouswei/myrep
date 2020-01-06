<template>
  <div class="login-container">
    <el-form class="login-form" :style="styleObj" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <img class="title-image" :src="tranlatePath('static/img/loginImg.png')" width="45">
        <p class="title">{{$t('login.title')}}</p>
      </div>
      <el-form-item prop="shopserialnum">
        <span class="svg-container">
          <svg-icon icon-class="shop" />
        </span>
        <el-input name="shopserialnum" type="text" v-model="loginForm.shopserialnum" autoComplete="on" placeholder="请输入店铺码" />
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="new-password" placeholder="请输入登录密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-button type="primary" style="width:50%;margin-bottom:30px; float:left; margin-left:0px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      <!-- <p  @click="clickForgetPSW" style="color:#37bfc8; float:left; cursor: pointer; font-weight:bold; margin-left:20px">忘记密码</p> -->
    </el-form>
    <el-dialog
      class="dialog-container"
      v-dialogDrag
      title="找回密码"
      ref="dialog_wrapper"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :modal-append-to-body='false'
      :close-on-click-modal="false">
        <div slot="title">
          <p style="color: #37bfc8">找回密码</p>
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
  },
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === undefined || value === '') {
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
    const validateShopnum = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('店铺码不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogWidth: '80%',
      spewd: '520px',
      dialogVisible: false,
      // styleObj: {
      //   width: this.spewd
      // },
      loginForm: {
        username: '',
        shopserialnum: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        shopserialnum: [{ required: true, trigger: 'blur', validator: validateShopnum }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
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
            // console.log('11111111111111')
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
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
  width: 85%;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  // background: #ff00ff;
  background-image: url(/static/img/bg_yellow1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  .login-form {
    position: relative;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    background: $bgform;
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
    padding: 6px 5px 6px 15px;
    margin-left: 0px;
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
    height: 60px;
    .title-image {
      float: left;
      margin-left: 0px;
    }
    .title {
      margin-top: 0px;
      margin-bottom: 0px;
      text-align: center;
      float: left;
      font-size: 26px;
      color: #37bfc8;
      width: 81%;
      font-weight: bold;
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
}
</style>
