<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡类型：</span>
        <el-select v-model="para.UCardType" placeholder="-请选择-">
          <el-option
            v-for="item in MemberCardTypeList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
        <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">充值金额：</span>
         <el-input v-model="para.PayPrice" type="text" seautoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">赠送：</span>
         <el-input v-model="para.FreePrice" type="text" seautoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <el-button class="el_save_btn" @click="clickComfirm">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sendData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      para: {
        ID: this.sendData.ID,
        GroupID: this.sendData.GroupID,
        UCardType: this.sendData.UCardType,
        PayPrice: this.sendData.PayPrice,
        FreePrice: this.sendData.FreePrice,
        InfoTitle: this.sendData.InfoTitle
      }
    }
  },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeList
    }
  },
  methods: {
    update () {
      this.para = {
        ID: this.sendData.ID,
        GroupID: this.sendData.GroupID,
        UCardType: this.sendData.UCardType,
        PayPrice: this.sendData.PayPrice,
        FreePrice: this.sendData.FreePrice,
        InfoTitle: this.sendData.InfoTitle
      }
    },
    clickCancel () {
      this.$emit('close')
    },
    clickComfirm () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryChangeFillConfigInfo', this.para).then((response) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('close')
        }).catch(() => {
        })
      }
    },
    dataValidation () {
      if (this.para.UCardType === '') {
        this.$message.error('请选择会员卡类型')
        return false
      }
      if (isNaN(this.para.PayPrice) || !this.isPositiveInteger(this.para.PayPrice)) {
        this.$message.error('充值金额只能输入正整数')
        return false
      }
      if (isNaN(this.para.FreePrice) || !this.isPositiveInteger(this.para.FreePrice)) {
        this.$message.error('赠送金额只能输入正整数')
        return false
      }
      if (parseInt(this.para.FreePrice) > parseInt(this.para.PayPrice)) {
        this.$message.error('赠送金额不能超过充值金额')
        return false
      }
      return true
    },
    isPositiveInteger (s) {
      var re = /^[0-9]+$/
      return re.test(s)
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
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 150px;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
  margin-top: 50px;
}
.el-textarea__inner{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.el-textarea{
  display: inline-block;
  width: 175px;
  height: 35px;
}
</style>
