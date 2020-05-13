<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="升级版本">
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
            <span>当前版本</span>
            <span>{{versionName}}</span>
          </p>
        </div>
        <div class="sub_item">
           <p>
            <span>升级版本</span>
            <el-select v-model="versionId" @change="getSumAccount()" placeholder="请选择">
              <el-option
                v-for="item in versions"
                :key="item.value"
                :label="item.VersionName"
                :value="item.ID">
              </el-option>
            </el-select>
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
        <el-button type="primary" @click="payOrder(0)">备用金支付</el-button>
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
      versions: [],
      versionId: '',
      successTip: '',
      payAccounts: 0,
      groupName: '',
      loading: false,
      versionName: 0,
      sucVersionName: '',
      exceddLinkDialog: false,
      bgUrl: this.tranlatePath('static/img/wechat.png'),
      specHeight: this.$store.getters.statusBarHeight,
      currVersionPrice: 0,
      isConfirmed: false
    }
  },
  mounted () {
    this.groupName = this.$route.query.groupName
    this.versionName = this.$route.query.versionName
    this.getAllVersions()
  },
  methods: {
    tranlatePath (url) {
      return formatPath(url)
    },
    getAllVersions () {
      var params = {}
      params['ShopID'] = this.$route.query.shopId
      this.$store.dispatch('ShopUpgradesVersionsListGet', params).then((response) => {
        this.versions = response.UpgradesVersions
        this.currVersionPrice = response.currVersionPrice
      }).catch(() => {

      })
    },
    getSumAccount () {
      this.versions.forEach((curItem) => {
        if (this.versionId === curItem.ID) {
          this.payAccounts = curItem.VersionMoneys - this.currVersionPrice
          this.sucVersionName = curItem.VersionName
        }
      })
    },
    payOrder (type) {
      if (type === 0) {
        if (this.versionId) {
          var params = {}
          params['ShopID'] = this.$route.query.shopId
          params['PayWay'] = type
          params['TargetVersionID'] = this.versionId
          params['IsConfirmed'] = this.isConfirmed
          this.loading = true
          this.$store.dispatch('AgentVersionUpgrades', params).then((response) => {
            this.loading = false
            if (!response.IsError) {
              if (this.isConfirmed) {
                this.versionName = this.sucVersionName
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
            } else {
              this.$message({
                type: 'error',
                message: response.PayTips,
                showClose: true
              })
            }
            this.isConfirmed = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            type: 'error',
            message: '请选择版本',
            showClose: true
          })
        }
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
      this.$store.dispatch('agentVersionUpgrades', params).then((response) => {
        var text = this.groupName + '升级版本付款链接'
        var img = ''
        var url = response.QRCodeUrl
        var title = '升级版本付款链接'
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
      }
    }
    .sub_item{
      margin-top: 10px;
      background: #fff;
      padding:10px 15px;
      p{
        display: flex;
        justify-content: space-between;
      }
    }
    .tip_item{
      color: #a8a8a8;
      padding:10px 15px;
      font-size: 14px;
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
</style>
