<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="用户注册">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">个人代理</mt-tab-item>
      <mt-tab-item id="2">企业代理</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="container-tab" v-model="selected">
      <mt-tab-container-item id="1">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item class="el-self-item_class" prop="mobile">
            <input v-model="ruleForm.mobile" placeholder="请输入您的手机号" auto-complete="off" class="spec-mobile-input"/>
            <span v-show="sendAuthCode" class="auth_text_btn auth_text_blue" @click="getAuthCode">获取验证码</span>
            <span v-show="!sendAuthCode" class="auth_text_btn"><span class="auth_text_blue">{{auth_time}}</span>秒之后可重新获取</span>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="veriCode">
            <input v-model="ruleForm.veriCode" placeholder="请输入验证码" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="newPassword">
            <input v-model="ruleForm.newPassword" type="password" placeholder="请输入密码（6-20位）" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="newPersion">
            <input v-model="ruleForm.newPersion" placeholder="联系人姓名" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class">
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item class="el-self-item_class" prop="mobile">
            <input v-model="ruleForm2.mobile" placeholder="请输入您的手机号码" auto-complete="off" class="spec-mobile-input"/>
            <span v-show="sendAuthCode" class="auth_text_btn auth_text_blue" @click="getAuthCode2">获取验证码</span>
            <span v-show="!sendAuthCode" class="auth_text_btn"><span class="auth_text_blue">{{auth_time}}</span>秒之后可重新获取</span>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="veriCode">
            <input v-model="ruleForm2.veriCode" placeholder="请输入您的验证码" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="newPassword">
            <input v-model="ruleForm2.newPassword" type="password" placeholder="请输入密码（6-20位）" class="spec-input"/>
          </el-form-item>
           <el-form-item class="el-self-item_class" prop="newPersion">
            <input v-model="ruleForm2.newCompany" placeholder="请输入公司名称" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class" prop="newPersion">
            <input v-model="ruleForm2.newPersion" placeholder="联系人姓名" class="spec-input"/>
          </el-form-item>
          <el-form-item class="el-self-item_class">
            <el-button type="primary" @click="submitForm2('ruleForm2')">注册</el-button>
            <!-- <el-button @click="resetForm2('ruleForm2')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  methods: {
    getAuthCode: function () {
      if (!(/^1\d{10}$/.test(this.ruleForm.mobile))) {
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
    getAuthCode2: function () {
      if (!(/^1\d{10}$/.test(this.ruleForm2.mobile))) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$store.dispatch('queryVeriCode', {mobile: this.ruleForm2.mobile, type: '1'}).then((response) => {
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
          var params = {}
          params['Mobile'] = this.ruleForm.mobile
          params['VerifyCode'] = this.ruleForm.veriCode
          params['Password'] = this.ruleForm.newPassword
          params['FullName'] = ''
          params['LinkMan'] = this.ruleForm.newPersion
          params['TopAgentID'] = -1
          params['TechID'] = 0
          params['ShopID'] = 0
          this.$store.dispatch('RegisterPersion', params).then((response) => {
            if (response.IsError === false) {
              this.$message({
                type: 'success',
                message: '注册成功',
                showClose: true
              })
              this.$router.back(-1)
              // this.$emit('close');
            } else {
              this.$message.error(response.Msg)
            }
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.sendAuthCode = true
      this.$refs[formName].resetFields()
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params['Mobile'] = this.ruleForm2.mobile
          params['VerifyCode'] = this.ruleForm2.veriCode
          params['Password'] = this.ruleForm2.newPassword
          params['FullName'] = this.ruleForm2.newCompany
          params['LinkMan'] = this.ruleForm2.newPersion
          params['TopAgentID'] = -1
          params['TechID'] = 0
          params['ShopID'] = 0
          this.$store.dispatch('RegisterCompany', params).then((response) => {
            if (response.IsError === false) {
              this.$message({
                type: 'success',
                message: '注册成功',
                showClose: true
              })
              this.$router.back(-1)
              // this.$emit('close')
            } else {
              this.$message.error(response.Msg)
            }
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    resetForm2 (formName) {
      this.sendAuthCode = true
      this.$refs[formName].resetFields()
    }
  },
  data () {
    var validateVeriCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'))
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
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码必须为6-20位数字或字母'))
      } else {
        callback()
      }
    }
    var validateNewPersion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('联系人不能为空'))
      } else {
        callback()
      }
    }
    var validateNewCompany = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('公司名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      selected: '1',
      specHeight: this.$store.getters.statusBarHeight,
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      ruleForm: {
        mobile: '',
        veriCode: '',
        newPassword: '',
        newPersion: ''
      },
      ruleForm2: {
        mobile: '',
        veriCode: '',
        newPassword: '',
        newPersion: '',
        newCompany: ''
      },
      rules: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        veriCode: [
          { validator: validateVeriCode, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassWord, trigger: 'blur' }
        ],
        newPersion: [
          { validator: validateNewPersion, trigger: 'blur' }
        ]
      },
      rules2: {
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        veriCode: [
          { validator: validateVeriCode, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassWord, trigger: 'blur' }
        ],
        newPersion: [
          { validator: validateNewPersion, trigger: 'blur' }
        ],
        newCompany: [
          { validator: validateNewCompany, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mint-tab-container-item {
    min-height: 580px;;
  }
  .container-tab {
    margin-top: 10px;
    padding-top: 15px;
    background: #fff;
  }
  .spec-input{
    border: 0;
    width: 100%;
    height: 34px;
    line-height: 34px;
    border-radius: 5px;
    padding: 0 10px;
    color: #5e5e5e;
  }
  .spec-mobile-input{
    border: 0;
    width: 140px;
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
    margin-right: 15px;
    padding-left: 15px;
    border-left: 1px solid #e0e0e0;
    float: right;
  }
  .demo-ruleForm{
    padding: 0 35px;
  }
  .el-form-item {
    border-bottom: 1px solid #e0e0e0;
  }
  .el-button--medium {
    width: 100%;
  }
</style>
