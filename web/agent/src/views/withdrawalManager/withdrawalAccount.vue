<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="收款账号">
      <router-link to="/withdrawalManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="account_content">
      <!-- <router-link to="/withdrawalManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <div class="account_item">
        <span>开户行</span>
        <el-select v-model="depositBank" placeholder="请输入开户银行" style="width:70%;" >
          <el-option
            v-for="item in depositBankList"
            :key="item.Value"
            :label="item.Name"
            :value="item.Name">
          </el-option>
        </el-select>
      </div>
      <div class="account_item"><span>开户名</span><el-input v-model="deposiName" style="width:70%;" placeholder="请输入开户名"></el-input></div>
      <div class="account_item"><span>银行账号</span><el-input v-model="bankAccount" style="width:70%;" placeholder="请输入银行账号"></el-input></div>
    </div>
      <el-button class="takeout-btn" @click="confirm" type="primary">确定</el-button>
  </div>
</template>
<script>
import { setCookies } from '@/utils/auth'
export default {
  data () {
    return {
      depositBankList: [],
      depositBank: '',
      deposiName: '',
      bankAccount: '',
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.getBankList()
    let getQueryObj = this.$route.query
    if (JSON.stringify(getQueryObj) !== '{}') {
      let query = this.$route.query
      this.bankAccount = query.bankAccount
      this.depositBank = query.bankName
      this.deposiName = query.fullName
    }
  },
  methods: {
    getBankList () {
      var params = {}
      params['EnumName'] = 'Banks'
      this.$store.dispatch('GetPlatformParams', params).then((response) => {
        if (!response.IsError) {
          this.depositBankList = response.Items
        }
      }).catch(() => {

      })
    },
    confirm () {
      if (!this.depositBank || !this.deposiName || !this.bankAccount) {
        this.$message({
          type: 'error',
          message: '请输入填写完整信息',
          showClose: true
        })
        return
      }
      let queryParams = {
        depositBank: this.depositBank,
        fullName: this.deposiName,
        bankAccount: this.bankAccount,
        ApplyMin: this.$route.query.ApplyMin,
        ApplyMax: this.$route.query.ApplyMax
      }
      setCookies('depositBank', this.depositBank)
      setCookies('fullName', this.deposiName)
      setCookies('bankAccount', this.bankAccount)
      this.$router.push({ path: '/withdrawalManager', query: queryParams })
    },
    backHandle () {
      this.$router.go(-1)
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  body{
    // background: red;
  }
  .account_content{
    background: #fff;
    .account_item{
      border-bottom: 1px solid #e0e0e0;
      padding:10px 0;
      display: flex;
      justify-content: space-between;
      span{
        padding-left: 10px;
        line-height: 32px;
      }
    }
  }
  .takeout-btn{
    display:block;
    margin:20px auto 0;
    width: 90%;
    background-color: #37bfc8;
    border: 0;
    padding: 12px 0px;
    font-size: 16px;
  }
</style>
<style>
  .mian_content input.el-input__inner{
    border: none;
    text-align: right;
  }
</style>
