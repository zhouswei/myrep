<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="购买账号">
      <router-link :to="{path:'/shopDetail',query:{shopId:this.$route.query.shopId}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="mian_content">
        <div class="head_name">
          <span>商户名称：</span>{{groupName}}
        </div>
        <div class="item">
          <p>
            <span>总账户数</span>
            <span>{{accountMax}}个</span>
          </p>
          <p>
            <span>剩余可用账号数</span>
            <span>{{accountCurrent}}个</span>
          </p>
          <p>
            <span>单价</span>
            <span>{{accountPrice}}元/个</span>
          </p>
        </div>
        <div class="sub_item">
          <p>
            <span>购买账号</span>
            <el-input style="width:50%;text-align:right;" type="number" v-model="accounts" placeholder="请输入购买数"></el-input>
          </p>
          <p>
            <span>金额</span>
            <span style="color:#f00;">{{payAccounts}}元</span>
          </p>
        </div>
        <div class="tip_item">
          <p>1.如果备用金不够支付，系统会自动使用分润余额支付；</p>
          <p>2.付款链接支付不能超过2万，超过请用【备用金支付】或联系掌通宝线下打款（0755-82789072）</p>
          <div class="btn_box">
            <el-button type="success" :loading="loading" @click="payOrder(0)">备用金支付</el-button>
            <el-button type="primary" @click="payOrder(1)">分享付款链接</el-button>
          </div>
        </div>
    </div>
    <el-dialog
      class="excedd_fee"
      title="分享付款链接"
      :visible.sync="exceddLinkDialog"
      width="80%"
      center>
      <p class="link_tip">付款链接支付不能超过2万，超过请用【备用金支付】或联系掌通宝线下打款（0755-82789072）</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backDetailPage">以后再付</el-button>
        <el-button type="primary" :loading="loading"  @click="payOrder(0)">备用金支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formatPath } from '@/utils'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      exceddLinkDialog: false,
      accounts: 1, // 购买数
      groupName: '',
      accountPrice: 0,
      accountMax: 0,
      loading: false,
      accountCurrent: 0, // 单价
      bgUrl: this.tranlatePath('static/img/wechat.png'),
      specHeight: this.$store.getters.statusBarHeight,
      isConfirmed: false
    }
  },
  mounted () {
    this.groupName = this.$route.query.groupName
    this.section = this.$route.query.section
    this.accountCurrent = this.$route.query.accountCurrent
    this.accountMax = this.$route.query.accountMax
    this.accountPrice = this.$route.query.accountPrice
  },
  computed: {
    payAccounts () {
      return this.accounts * this.accountPrice
    }
  },
  methods: {
    tranlatePath (url) {
      return formatPath(url)
    },
    payOrder (type) {
      if (type === 0) {
        var params = {}
        params['ShopID'] = this.$route.query.shopId
        params['PayWay'] = type
        params['Accounts'] = this.accounts
        params['PayType'] = 0
        params['IsConfirmed'] = this.isConfirmed
        this.loading = true
        this.$store.dispatch('AgentBuyAccount', params).then((response) => {
          this.loading = false
          if (this.isConfirmed) {
            this.$message({
              type: 'success',
              message: response.PayTips,
              showClose: true
            })
          } else {
            MessageBox({
              title: '提示',
              message: response.PayTips,
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                this.isConfirmed = response.IsConfirmed
                this.payOrder(0)
              }
            })
          }
          this.isConfirmed = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        if (this.payAccounts > 20000) {
          this.exceddLinkDialog = true
        } else {
          this.onlinPay()
        }
      }
    },
    onlinPay () {
      // 此处是微信支付二维码
      var params = {}
      params['ShopID'] = this.$route.query.shopId
      params['PayWay'] = 1
      params['Accounts'] = this.accounts
      params['PayType'] = 1
      this.$store.dispatch('AgentBuyAccount', params).then((response) => {
        var text = this.groupName + '购买账号付款链接'
        var img = ''
        var url = response.QRCodeUrl
        var title = '购买账号付款链接'
        var platforms = ['2', '28']
        window.plugins.SocialAgent.openShare(function (r) { window.alert('' + r) }, text, img, url, title, platforms)
      }).catch(() => {

      })
    },
    backDetailPage () {
      this.$router.push({ path: '/shopDetail', query: { shopId: this.$route.query.shopId } })
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .mian_content{
    margin-top: 15px;
    .head_name{
      background: #e0e8ff;
      padding: 10px 15px;
    }
    .item{
      background: #fff;
      padding:10px 15px;
      p{
        display: flex;
        justify-content: space-between;
        line-height: 2;
        font-size: 15px;
      }
    }
    .sub_item{
      margin-top: 10px;
      background: #fff;
      padding: 0 15px;
      p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        &:first-child{
          border-bottom: 1px solid #e0e0e0;
        }
      }
    }
    .tip_item{
      color: #a8a8a8;
      padding: 10px 15px;
      font-size: 14px;
      p{
        line-height: 22px;
      }
      .btn_box{
        margin-top: 20px;
        display: flex;
        justify-content:center;
      }
    }
  }
  .sucess_text{
    font-size: 18px;
    text-align: center;
  }
  .share_box{
    display: flex;
    justify-content: center;
    align-items:center;
    background: #f0f1f5;
    min-height: 100px;
    span{
      display: inline-block;
      width: 50px;
      height: 50px;
      // background: url(/static/img/wechat.png) no-repeat;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .link_tip{
    width: 90%;
    margin: 0 auto;
  }
  .el-input__inner {
    padding: 0;
  }
  .el-message-box{
    width: initial;
  }
</style>
<style>
  .mian_content input.el-input__inner{
    border: none;
    text-align: right;
  }
  .excedd_fee .el-dialog__body,.excedd_fee .el-dialog__footer{
    background: #f0f1f5;
  }
  .excedd_fee .el-dialog__body,.excedd_fee .el-dialog__footer{
    background: #f0f1f5;
  }
</style>
