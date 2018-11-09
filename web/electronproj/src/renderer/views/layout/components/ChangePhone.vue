<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">当前账号：</span>
        <span>{{account}}</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">原手机号：</span>
        <span>{{phone}}</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">新手机号：</span>
        <el-input v-model="newPhone" type="text" placeholder="请输入新的手机号码" autocomplete="off" class="el-input"/>
        <!-- <el-button @click="getVeriCode" :disabled="disable">{{btmString}}</el-button> -->
        <span v-show="sendAuthCode" class="auth_text_btn auth_text_blue" @click="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode"><span class="auth_text_blue">{{auth_time}}</span>秒之后可重新获取</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">验证码：</span>
        <el-input v-model="veriCode" type="text" autocomplete="off" placeholder="请输入有效的验证码" class="el-input"/>
      </p>
      <el-button class="el_save_btn" @click="click">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // btmString: '',
      // disable: false,
      // 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      sendAuthCode: true,
      // 倒计时 计数器
      auth_time: 0,
      account: this.$store.getters.name,
      phone: this.$store.getters.avatar,
      newPhone: '',
      veriCode: ''
    }
  },
  methods: {
    // getVeriCode () {
    //   var num = 60
    //   var timer = setInterval(function () {
    //     num--
    //     this.btmString = num + '秒后重新获取'
    //     // element.style.color = ' #ccc'
    //     this.disable = true
    //     if (num === 0) {
    //       this.disable = false
    //       // element.style.color = ' #ffa600'
    //       this.btmString = '获取验证码'
    //       clearInterval(timer)
    //     }
    //   }, 1000)
    // },
    getAuthCode: function () {
      if (this.newPhone === '') {
        this.$message.error('请输入新的手机号码')
        return
      }
      this.$store.dispatch('queryVeriCode', {mobile: this.newPhone, type: '2'}).then((response) => {
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
    click () {
      if (this.newPhone === '') {
        this.$message.error('请输入新的手机号码')
        return
      }
      if (this.veriCode === '') {
        this.$message.error('请输入验证码')
        return
      }
      this.$store.dispatch('queryChangePhone', {newMobile: this.newPhone, veriCode: this.veriCode}).then((response) => {
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
        this.newPhone = ''
        this.veriCode = ''
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
