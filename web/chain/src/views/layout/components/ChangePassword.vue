<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">修改密码</span>
          <div>
            <p class="infoPerLine1">
              <span class="infoShowName">账户：</span>
              <span>{{account}}</span>
            </p>
            <p class="infoPerLine1">
              <span class="infoShowName">当前密码：</span>
              <el-input v-model="para.oldPwd" type="password" placeholder="请输入您的密码" autocomplete="off" class="el-input"/>
              <span style="color: #e33c32">*</span>
            </p>
            <p class="infoPerLine1">
              <span class="infoShowName">新密码：</span>
              <el-input v-model="para.newPwd" type="password" placeholder="请输入您的新密码" autocomplete="off" class="el-input"/>
              <span style="color: #e33c32">*</span>
            </p>
            <p class="infoPerLine1">
              <span class="infoShowName">确认密码：</span>
              <el-input v-model="para.confirmPwd" type="password" placeholder="请确认您的新密码" autocomplete="off" class="el-input"/>
              <span style="color: #e33c32">*</span>
            </p>
            <el-button class="el_save_btn" @click="click">确定</el-button>
          </div>
      </el-tab-pane>
      <el-tab-pane label="忘记密码">
        <div>
          <p class="infoPerLine1">
            <span class="infoShowName">账户：</span>
            <span>{{account}}</span>
          </p>
          <p class="infoPerLine1">
            <span class="infoShowName">手机号：</span>
            <el-input v-model="forgetPara.mobile" type="text" placeholder="请输入您的手机号码" autocomplete="off" class="el-input"/>
            <span style="color: #e33c32">*</span>
            <span v-show="sendAuthCode" class="auth_text_btn auth_text_blue" @click="getAuthCode">获取验证码</span>
            <span v-show="!sendAuthCode"><span class="auth_text_blue">{{auth_time}}</span>秒之后可重新获取</span>
          </p>
          <p class="infoPerLine1">
            <span class="infoShowName">验证码：</span>
            <el-input v-model="forgetPara.veriCode" type="text" placeholder="请输入您的验证码" autocomplete="off" class="el-input"/>
            <span style="color: #e33c32">*</span>
          </p>
          <p class="infoPerLine1">
            <span class="infoShowName">新密码：</span>
            <el-input v-model="forgetPara.newPassword" type="password" placeholder="请设置您的新密码" autocomplete="off" class="el-input"/>
            <span style="color: #e33c32">*</span>
          </p>
          <el-button class="el_save_btn" @click="clickFotget">确定</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      account: this.$store.getters.name,
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      para: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      forgetPara: {
        name: '',
        mobile: '',
        veriCode: '',
        newPassword: ''
      }
    }
  },
  methods: {
    click () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryChangePwd', this.para).then((response) => {
          if (response.RetCode === 1) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: response.Msg
            })
          }
          this.para = {}
        }).catch(() => {
        })
      }
    },
    dataValidation () {
      if (this.para.oldPwd === '') {
        this.$message.error('请输入当前密码')
        return false
      }
      if (this.para.newPwd === '') {
        this.$message.error('请输入新密码')
        return false
      }
      if (this.para.confirmPwd === '') {
        this.$message.error('请输入确认密码')
        return false
      }
      if (this.para.newPwd !== this.para.confirmPwd) {
        this.$message.error('两次输入密码不一致')
        return false
      }
      return true
    },
    forgetDataValidation () {
      if (this.forgetPara.mobile === '') {
        this.$message.error('手机号码不能为空')
        return false
      }
      if (this.forgetPara.veriCode === '') {
        this.$message.error('验证码不能为空')
        return false
      }
      if (this.forgetPara.newPassword === '') {
        this.$message.error('新密码不能为空')
        return false
      }
      return true
    },
    clickFotget () {
      if (this.forgetDataValidation()) {
        this.$store.dispatch('queryFindPwd', this.forgetPara).then((response) => {
          if (response.RetCode === 1) {
            this.$message({
              type: 'success',
              message: '找回成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: response.Msg
            })
          }
          this.newPhone = ''
          this.veriCode = ''
        }).catch(() => {
        })
      }
    },
    getAuthCode: function () {
      if (!(/^1[34578]\d{9}$/.test(this.forgetPara.mobile))) {
        this.$message.error('请输入正确的手机号')
        return
      }
      this.$store.dispatch('queryVeriCode', {mobile: this.forgetPara.mobile, type: '1'}).then((response) => {
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infoPerLine1 {
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
    font-size: 14px;
    font-weight: bold;
}
.infoShowName {
    display: inline-block;
    width: 187px;
    line-height: 30px;
    text-align: right;
    color: #5e5e5e;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
}
.el-input{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.el_save_btn{
  width: 100px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 180px;
  margin-bottom: 30px;
  margin-right: 20px;
}
.auth_text_blue{
  color: #37bfc8;
}
.auth_text_btn{
  cursor: pointer;
}
</style>
