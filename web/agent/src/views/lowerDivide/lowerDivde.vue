<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="下级分润">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="sub-profit">
      <div class="profit-tip">
        <p>设置新添加的下级代理商的默认分润比例;</p>
        <p>上级的分润比例不能低于下级;</p>
      </div>
      <p class="infoPerLine1">
        <span class="infoShowName"><span style="color: #e33c32">*</span>购买版本分润</span>
        <el-input v-model="versionDivide" type="number" :placeholder="versionDivide" autocomplete="off" class="el-input"/>
        <span style="color: #e33c32">%</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName"><span style="color: #e33c32">*</span>续年费分润</span>
        <el-input v-model="yearDivide" type="number" :placeholder="yearDivide" autocomplete="off" class="el-input"/>
        <span style="color: #e33c32">%</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName"><span style="color: #e33c32">*</span>购买账号分润</span>
        <el-input v-model="accountDivide" type="number" :placeholder="accountDivide" autocomplete="off" class="el-input"/>
        <span style="color: #e33c32">%</span>
      </p>
      <el-button class="el_save_btn" @click="clickFotget">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      versionDivide: '',
      yearDivide: '',
      accountDivide: '',
      holderversionDivide: '',
      holderyearDivide: '',
      holderaccountDivide: '',
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.GetBaseInfo()
  },
  methods: {
    GetBaseInfo () {
      var params = {}
      this.$store.dispatch('GetRateInfo', params).then((response) => {
        this.versionDivide = Math.round(response.Info.NextVersionRebate * 100)
        this.yearDivide = Math.round(response.Info.NextContinuationRebate * 100)
        this.accountDivide = Math.round(response.Info.NextAccountRebate * 100)
      }).catch(() => {
      })
    },
    clickFotget () {
      if (this.versionDivide > 100 || this.accountDivide > 100 || this.yearDivide > 100) {
        this.$message.error('输入的数字要大于0并且小于100')
        return
      }
      if (this.versionDivide === 0 || this.accountDivide === 0 || this.yearDivide === 0) {
        this.$message.error('输入的数字要大于0并且小于100')
        return
      }
      var params = {}
      params['NextVersionRebate'] = (this.versionDivide / 100).toFixed(2)
      params['NextAccountRebate'] = (this.accountDivide / 100).toFixed(2)
      params['NextContinuationRebate '] = (this.yearDivide / 100).toFixed(2)
      this.$store.dispatch('SetDivideRate', params).then((response) => {
        this.$message({
          message: '设置成功',
          type: 'success',
          showClose: true
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.sub-profit{
  margin: 10px;
  .profit-tip{
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
.infoPerLine1 {
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
    font-size: 14px;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
}
.infoShowName {
    display: inline-block;
    width: 110px;
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
  margin: 10px auto 0;
  display: block;
}
.auth_text_blue{
  color: #37bfc8;
}
.auth_text_btn{
  cursor: pointer;
}
</style>
