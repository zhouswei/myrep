<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="添加代理商">
      <router-link to="/agentManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm form_wrap">
      <div class="shoperInfo">
        <el-form-item class="el-self-item_class" label="手机号：" prop="mobile" style="margin-bottom:0;" required>
          <input v-model="ruleForm.mobile" placeholder="请输入您的手机号码" maxlength="11" auto-complete="off" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="密码：" prop="newPassword" required>
          <input v-model="ruleForm.newPassword" type="password" placeholder="请设置您的密码" maxlength="20" class="spec-input"/>
        </el-form-item>
          <el-form-item class="el-self-item_class" label="公司名称：" prop="newCompany">
          <input v-model="ruleForm.newCompany" placeholder="请输入公司名称" maxlength="20" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="联系人：" prop="newPersion" required>
          <input v-model="ruleForm.newPersion" placeholder="联系人姓名" maxlength="20" class="spec-input"/>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="购买版本分润：" prop="versionProfit" required >
          <input v-model="ruleForm.versionProfit" class="spec-input-proportion"/>
          <span>%</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="续年费分润：" prop="yearProfit" required >
          <input v-model="ruleForm.yearProfit" class="spec-input-proportion"/>
          <span>%</span>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="购买账号分润：" prop="accountProfit" required >
          <input v-model="ruleForm.accountProfit" class="spec-input-proportion"/>
          <span>%</span>
        </el-form-item>
      </div>
      <el-form-item label-width="0px" class="el-self-item_class btn_box">
        <el-button type="primary" class="save-btn" :loading="loading" size="large" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  mounted () {
    this.GetBaseInfo()
  },
  methods: {
    GetBaseInfo () {
      var params = {}
      this.$store.dispatch('GetRateInfo', params).then((response) => {
        this.ruleForm.versionProfit = Math.round(response.Info.NextVersionRebate * 100)
        this.ruleForm.yearProfit = Math.round(response.Info.NextContinuationRebate * 100)
        this.ruleForm.accountProfit = Math.round(response.Info.NextAccountRebate * 100)
      }).catch(() => {
      })
    },
    submitForm (formName) {
      if (!(/^1\d{10}$/.test(this.ruleForm.mobile))) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params['Mobile'] = this.ruleForm.mobile
          params['Password'] = this.ruleForm.newPassword
          params['FullName'] = this.ruleForm.newCompany
          params['LinkMan'] = this.ruleForm.newPersion
          params['TopAgentID'] = 0
          params['TechID'] = 0
          params['ShopID'] = 0
          params['VersionRebate'] = this.ruleForm.versionProfit / 100
          params['AccountRebate'] = this.ruleForm.accountProfit / 100
          params['ContinuationRebate'] = this.ruleForm.yearProfit / 100
          this.loading = true
          this.$store.dispatch('RegisterPersion', params).then((response) => {
            this.loading = false
            if (response.IsError === false) {
              this.$message({
                type: 'success',
                message: response.Tips,
                showClose: true
              })
              this.$router.push({ path: '/agentManager' })
              // this.$emit('close')
            } else {
              this.$message.error(response.Msg)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  data () {
    var validateVeriCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    var validateNewPassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码必须为6-20位数字或字母'))
      } else {
        callback()
      }
    }
    var validateNewPersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error('联系人不能为空'))
      } else {
        callback()
      }
    }
    var validateVersionProfit = (rule, value, callback) => {
      if (!value || value === 0) {
        callback(new Error('请输入版本分润'))
      } else {
        callback()
      }
    }
    var validateYearProfit = (rule, value, callback) => {
      if (!value || value === 0) {
        callback(new Error('请输入续年费分润'))
      } else {
        callback()
      }
    }
    var validateAccountProfit = (rule, value, callback) => {
      if (!value || value === 0) {
        callback(new Error('请输入购买账号分润'))
      } else {
        callback()
      }
    }
    return {
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      loading: false,
      ruleForm: {
        mobile: '',
        veriCode: '',
        newPassword: '',
        newPersion: '',
        newCompany: '',
        versionProfit: '',
        yearProfit: '',
        accountProfit: ''
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
        ],
        versionProfit: [
          { validator: validateVersionProfit, trigger: 'blur' }
        ],
        yearProfit: [
          { validator: validateYearProfit, trigger: 'blur' }
        ],
        accountProfit: [
          { validator: validateAccountProfit, trigger: 'blur' }
        ]
      },
      specHeight: this.$store.getters.statusBarHeight
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.container-tab {
  margin-top: 5px;
}
.form_wrap {
  .shoperInfo {
    background: #fff;
    padding: 0 10px 15px;
    .el-self-item_class {
      border-bottom: 1px solid #e0e0e0;
      padding: 5px 0;
      text-align: right;
      .spec-input {
        border: none;
        width: 64%;
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
        color: #5e5e5e;
        text-align: right;
      }
      .spec-input-proportion{
        border: none;
        height: 34px;
        line-height: 34px;
        padding: 0px;
        color: #5e5e5e;
        text-align: right;
      }
    }
  }
  .tip_box{
    margin: 10px;
    font-size: 14px;
    color: #a8a8a8;
  }
}
.btn_box{
  margin-top: 20px;
  text-align: center;
}
.auth_text_blue {
  color: #37bfc8;
}
.auth_text_btn {
  cursor: pointer;
}
.save-btn {
  margin-top: 10px;
  width: 90%;
  background: #37bfc8;
  margin: 0 auto;
}
.el-form-item__error{
  left: initial;
  right: 0;
}
.el-form-item{
  margin-bottom: 0;
}
</style>
