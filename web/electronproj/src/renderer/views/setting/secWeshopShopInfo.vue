<template>
  <div v-loading="loading" class="center_wrap">
    <div class="bg">
      <p class="grid-content">微信公众配置</p>
      <p>
        公众号名称：
      <el-input :disabled="true" type="text" v-model="para.MpName" autoComplete="off" placeholder="" class="el-input"/>
      <span style="color: #e33c32">*</span>
      </p>
      <p>
        公 众 号 ID：
        <el-input :disabled="true" type="text" v-model="para.MpAppID" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
      <p>
        AppSecret：
        <el-input :disabled="true" type="text" v-model="para.MpAppSecret" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
    </div>
    <div class="bg">
      <p class="grid-content">微信收款帐号配置</p>
      <p>
        商户号：
        <el-input :disabled="true" type="text" v-model="para.MCHID" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
      <p>
        支付密钥：
        <el-input :disabled="true" type="text" v-model="para.PayKEY" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
    </div>
    <div class="bg">
      <p class="grid-content">该公众号下的门店</p>
      <span style="margin-right: 20px;" v-for="item in shops" :label="item.shopid" :key="item.shopid">{{item.shopname}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      default: 0
    }
  },
  data () {
    return {
      shops: [],
      checkAll: false,
      isIndeterminate: false,
      loading: true,
      para: {
        id: this.id,
        MpName: '',
        MpAppID: '',
        MpAppSecret: '',
        MCHID: '',
        PayKEY: '',
        ShopIDs: ''
      }
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.getShops()
      this.queryWeshopInfo()
      this.loading = true
    },
    clickConfirm () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryAddWxConfigInfo', this.para).then((response) => {
        }).catch(() => {
        })
      }
    },
    dataValidation () {
      if (this.para.MpName === '') {
        this.$message.error('请输入公众号名称')
        return false
      }
      if (this.para.MpAppID === '') {
        this.$message.error('请输入公众号ID')
        return false
      }
      if (this.para.MpAppSecret === '') {
        this.$message.error('请输入AppSecret')
        return false
      }
      if (this.para.MCHID === '') {
        this.$message.error('请输入商户号')
        return false
      }
      if (this.para.PayKEY === '') {
        this.$message.error('请输入支付密钥')
        return false
      }
      return true
    },
    getShops () {
      this.$store.dispatch('queryShops', {id: this.id}).then((response) => {
        this.shops = []
        response.forEach(element => {
          var ListItemObj = {}
          ListItemObj.shopid = element.shopid
          ListItemObj.shopname = element.shopname
          ListItemObj.address = element.address
          ListItemObj.authtype = element.authtype
          ListItemObj.groupaccountid = element.groupaccountid
          if (ListItemObj.groupaccountid === this.id) {
            this.shops.push(ListItemObj)
          }
        })
        this.handleCheckedCitiesChange()
      }).catch(() => {
      })
    },
    queryWeshopInfo () {
      this.$store.dispatch('queryWeshopInfo', {id: this.id, isshow: 0}).then((response) => {
        this.para.MpName = response.account.MpName
        this.para.MpAppID = response.account.MpAppID
        this.para.MpAppSecret = response.account.MpAppSecret
        this.para.MCHID = response.pay.MCHID
        this.para.PayKEY = response.pay.PayKEY
        this.loading = false
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.grid-content {
  // border-radius: 4px;
  // min-height: 36px;
  // background: #f2f2f2;
  text-align: center;
  // width: 500px;
  // font-size: 16px;
  // font-weight: bold;
}
.center_wrap{
  width: 300px;
  margin: 0 auto;
}
.el-input{
  display: inline-block;
  width: 175px;
  height: 35px;
}
// .bg{
//   text-align: center;
//   width: 500px;
//   background: #F7F7F7;
//   padding-bottom: 10px;
//   margin-bottom: 10px;
//   margin-left: 100px;
//   margin-bottom: 20px;
// }
</style>
