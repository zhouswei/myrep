<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item class="el-self-item_class" label="连锁机构代码：" prop="name">
        <input v-model="ruleForm.name" placeholder="请输入您的机构代码" auto-complete="off" class="spec-input"/>
        <span style="color: #e33c32">*</span>
      </el-form-item>
      <el-form-item class="el-self-item_class" label="手机号：" prop="mobile">
        <input v-model="ruleForm.mobile" placeholder="请输入您的手机号码" auto-complete="off" class="spec-input"/>
        <span style="color: #e33c32">*</span>
        <span v-show="sendAuthCode" class="auth_text_btn auth_text_blue" @click="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode"><span class="auth_text_blue">{{auth_time}}</span>秒之后可重新获取</span>
      </el-form-item>
      <el-form-item class="el-self-item_class" label="验证码：" prop="veriCode">
        <input v-model="ruleForm.veriCode" placeholder="请输入您的验证码" class="spec-input"/>
        <span style="color: #e33c32">*</span>
      </el-form-item>
      <el-form-item class="el-self-item_class" label="新密码：" prop="newPassword">
        <input v-model="ruleForm.newPassword" placeholder="请设置您的新密码" class="spec-input"/>
        <span style="color: #e33c32">*</span>
      </el-form-item>
      <el-form-item class="el-self-item_class">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var validateVeriCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('机构代码不能为空'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    var validateNewPassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6 || value.length < 20) {
        callback(new Error('密码必须为6-20位数字或字母'))
      } else {
        callback()
      }
    }
    return {
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      ruleForm: {
        name: '',
        mobile: '',
        veriCode: '',
        newPassword: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        veriCode: [
          { validator: validateVeriCode, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassWord, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    update () {
      this.resetForm('ruleForm')
    },
    getAuthCode: function () {
      if (!(/^1[34578]\d{9}$/.test(this.ruleForm.mobile))) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$store.dispatch('queryVeriCode', {mobile: this.ruleForm.mobile, type: '1'}).then((response) => {
        this.sendAuthCode = false
        this.auth_time = 60
        var timer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(timer)
          }
        }, 1000)
      }).catch(() => {
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('queryFindPwd', this.ruleForm).then((response) => {
            if (response.RetCode === 1) {
              this.$message({
                type: 'success',
                message: '密码已经找回，请登录'
              })
              this.$emit('close')
            } else {
              this.$message.error(response.Msg)
            }
          }).catch(() => {
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.sendAuthCode = true
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// .demo-ruleForm{
//   background: #fff;
// }
// .el-self-item_class{
//   background: #fff;
// }
.login-container .el-form-item{
  background: #fff;
}
// .el-input{
//   width: 175px;
//   background: white;
// }
.spec-input{
  border: 1px solid #e0e0e0;
  width: 255px;
  height: 34px;
  line-height: 34px;
  border-radius: 5px;
  padding: 0 10px;
  color: #5e5e5e;
}
.auth_text_blue{
  color: #37bfc8;
}
.auth_text_btn{
  cursor: pointer;
}
</style>
<style scoped>
/* .spec-input >>> input {
  border: 1px;
  border-color: black;
} */
</style>
