<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="添加商户">
      <router-link to="/shopManager" slot="left">
        <mt-button icon="back" @click.native="backHandle">返回</mt-button>
      </router-link>
    </mt-header>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      class="demo-ruleForm form_wrap"
    >
      <div class="shoperInfo">
        <el-form-item class="el-self-item_class" label="商户名称：" prop="shopName" required >
          <input v-model="ruleForm2.shopName" placeholder="请输入店铺名称" class="spec-input">
        </el-form-item>
        <el-form-item class="el-self-item_class" label="主营业务" prop="mainBusiness" required >
          <el-select v-model="ruleForm2.mainBusiness" placeholder="请选择">
            <el-option
              v-for="item in ruleForm2.mainBusinessOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-self-item_class" label="商户联系人：" prop="newPersion" required >
          <input v-model="ruleForm2.newPersion" placeholder="请输入商户联系人" class="spec-input">
        </el-form-item>
        <el-form-item class="el-self-item_class" label="手机号：" prop="mobile" required >
          <input
            v-model="ruleForm2.mobile"
            placeholder="将作为系统登陆账号"
            auto-complete="off"
            class="spec-input"
          >
        </el-form-item>
      </div>
      <p class="tip_box">登陆密码默认为手机后6位</p>
      <el-form-item label-width="0px" class="el-self-item_class">
        <mt-button
          type="primary"
          class="save-btn"
          size="large"
          @click.prevent="submitForm2('ruleForm2')"
        >下一步</mt-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'shopAddLevel1',
  methods: {
    getAuthCode: function () {
      if (
        !/^1\d{10}$/.test(
          this.ruleForm.mobile
        )
      ) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$store
        .dispatch('queryVeriCode', { mobile: this.ruleForm.mobile, type: '1' })
        .then(response => {
          this.sendAuthCode = false
          this.auth_time = 60
          var timer = setInterval(() => {
            this.auth_time--
            if (this.auth_time <= 0) {
              this.sendAuthCode = true
              clearInterval(timer)
            }
          }, 1000)
        })
        .catch(() => {})
    },
    submitForm2 (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let queryParams = {
            ShopTitle: this.ruleForm2.shopName,
            LinkMan: this.ruleForm2.newPersion,
            Mobile: this.ruleForm2.mobile,
            MainBusiness: this.ruleForm2.mainBusiness
          }
          this.$router.push({ path: '/shopAddLevel2', query: queryParams })
        }
      })
    },
    resetForm2 (formName) {
      this.sendAuthCode = true
      this.$refs[formName].resetFields()
    },
    backHandle () {
      this.$store.dispatch('delVisitedViews')
    }
  },
  data () {
    var validateMobile = (rule, value, callback) => {
      if (value === '' || value.length !== 11) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    var validateNewPersion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('联系人不能为空'))
      } else {
        if (!/^[\u4E00-\u9FA5]+$/g.test(value)) {
          callback(new Error('联系人请输入中文字符'))
        } else {
          callback()
        }
      }
    }
    var validateNewCompany = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('商户名称不能为空'))
      } else {
        callback()
      }
    }
    var validatemainBusiness = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择主营业务'))
      } else {
        callback()
      }
    }
    return {
      selected: '1',
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      reg: /^[\u4E00-\u9FA5]+$/g,
      ruleForm2: {
        mobile: '',
        shopName: '',
        newPersion: '',
        mainBusiness: '',
        mainBusinessOptions: ['足疗', '艾灸', '推拿', 'SPA', '汗蒸', '洗浴', '其它']
      },
      rules2: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        newPersion: [{ validator: validateNewPersion, trigger: 'blur' }],
        shopName: [{ validator: validateNewCompany, trigger: 'blur' }],
        mainBusiness: [{ validator: validatemainBusiness, trigger: 'blur' }]
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
    padding: 0 10px;
    .el-self-item_class {
      border-bottom: 1px solid #e0e0e0;
      text-align: right;
      .spec-input {
        border: none;
        width: 70%;
        height: 34px;
        line-height: 34px;
        padding: 0 10px;
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
</style>
<style>
  .mian_content input.el-input__inner{
    border: none;
    text-align: right;
  }
</style>
