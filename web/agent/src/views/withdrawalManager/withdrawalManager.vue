<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="提现">
      <router-link :to="routeName" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="shareclick">提现记录</mt-button>
    </mt-header>
    <div class="tip-content">
      <div class="left-tip">
        <span class="child-tip">收款账户：{{bankName}}</span>
        <span class="child-tip">收款账号：{{bankAccount}}</span>
      </div>
      <div class="right-tip" @click="directAccountPage">
        <mt-button class="button-save" size="small" type="primary">收款账号</mt-button>
      </div>
    </div>
    <div class="account-content">
      <div class="sub_account">
        <p>
          <span>分润余额</span>
          <span style="float: right; margin-right: 10px">{{agentFractionationMoneys}}元</span>
        </p>
        <p>
          <span>提现金额</span>
          <el-input style="width:50%;text-align:right;" type="number" v-model="applyMoneys" placeholder="请输入提现金额"></el-input>
        </p>
        </div>
      <!-- <mt-field style="margin-left:-10px;" v-model="applyMoneys" label="提现金额" placeholder="请输入数字" type="number"></mt-field> -->
      <p class="tip-box">每次提现金额必须大于{{ApplyMin}}元</p>
      <el-button type="primary" :loading="loading" @click="applyCase" class="takeout-btn">确定提现</el-button>
    </div>
  </div>
</template>
<script>
import { getCookies } from '@/utils/auth'
export default {
  data () {
    return {
      bankName: '',
      bankAccount: '',
      ApplyMin: '',
      ApplyMax: '',
      agentFractionationMoneys: '',
      depositBank: '',
      applyMoneys: '',
      loading: false,
      specHeight: this.$store.getters.statusBarHeight,
      routeName: '/'
    }
  },
  mounted () {
    this.agentFractionationMoneys = this.$store.getters.userdata.WithdrawableMoneys
    this.getBaseInfo()
    if (this.$route.query.isdivice) {
      this.routeName = '/divideMananger'
    }
  },
  methods: {
    shareclick () {
      this.$router.push({ path: '/withdrawalRecord' })
    },
    directAccountPage () {
      let queryParams = {
        ApplyMin: this.ApplyMin,
        ApplyMax: this.ApplyMax,
        bankName: this.bankName,
        bankAccount: this.bankAccount,
        fullName: this.fullName
      }
      this.$router.push({ path: '/withdrawalAccount', query: queryParams })
    },
    getBaseInfo () {
      var params = {}
      this.$store.dispatch('GetBankBaseInfo', params).then((response) => {
        if (!response.IsError) {
          let getQueryObj = this.$route.query
          if (JSON.stringify(getQueryObj) !== '{}') {
            this.bankName = getQueryObj.depositBank
            this.bankAccount = getQueryObj.bankAccount
            this.fullName = getQueryObj.fullName
          } else {
            this.bankName = response.BankName ? response.BankName : getCookies('depositBank')
            this.bankAccount = response.BankAccount ? response.BankAccount : getCookies('bankAccount')
            this.fullName = response.RealName ? response.RealName : getCookies('fullName')
            this.agentFractionationMoneys = response.ApplyMax
          }
          this.ApplyMax = response.ApplyMax
          this.ApplyMin = response.ApplyMin
        }
      }).catch(() => {

      })
    },
    applyCase () {
      if (!this.bankAccount) {
        this.$message({
          type: 'error',
          message: '请输入收款账号',
          showClose: true
        })
        return
      }
      if (this.applyMoneys < this.ApplyMin) {
        this.$message({
          type: 'error',
          message: '提现金额必须大于等于' + this.ApplyMin + '元',
          showClose: true
        })
        return
      }
      if (this.applyMoneys > this.agentFractionationMoneys) {
        this.$message({
          type: 'error',
          message: '提现金额不能大于余额',
          showClose: true
        })
        return
      }
      var params = {}
      params['FullName'] = this.fullName
      params['BankName'] = this.bankName
      params['BankAccount'] = this.bankAccount
      params['ApplyMoneys'] = this.applyMoneys
      this.loading = true
      this.$store.dispatch('AgentApply', params).then((response) => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '提现成功',
          showClose: true
        })
        this.$router.push({ path: '/withdrawalRecord' })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tip-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px 15px 15px;
  margin: 15px;
  background: #37bfc8;
  border-radius: 5px;
  color: #fff;
  .button-save{
    display: block;
    background: #fff;
    color: #37bfc8;
  }
  .left-tip {
    padding-right: 10px;
  }
  .right-tip {
    padding-right: 10px;
  }
  .button-save {
    float: left;
  }
  span{
    display: block;
    line-height: 1.5;
    text-align: left;
  }
}
.sub_account{
  margin-top: 10px;
  background: #fff;
  padding:0px 20px;
  p{
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    &:first-child{
      border-bottom: 1px solid #f0f1f5;
    }
  }
}
  .takeout-btn{
    display:block;
    margin:10px auto 0;
    width: 90%;
    padding: 12px 20px;
    font-size: 16px;
    background-color: #37bfc8;
    border: 0;
  }
  .tip-box{
    color: #989a9e;
    font-size: 14px;
    padding: 10px;
  }
</style>
<style>
  .mian_content input.el-input__inner{
    border: none;
    text-align: right;
  }
</style>
