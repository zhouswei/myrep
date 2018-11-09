<template>
  <div v-loading="loading" class="parent">
    <div class="bg">
      <p class="grid-content">微信公众配置</p>
      <p>
        公众号名称：
      <el-input type="text" v-model="para.MpName" autoComplete="off" placeholder="" class="el-input"/>
      <span style="color: #e33c32">*</span>
      </p>
      <p>
        公 众 号 ID：
        <el-input type="text" v-model="para.MpAppID" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
      <p>
        AppSecret：
        <el-input type="text" v-model="para.MpAppSecret" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
    </div>
    <div class="bg">
      <p class="grid-content">微信收款帐号配置</p>
      <p>
        商户号：
        <el-input type="text" v-model="para.MCHID" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
      <p>
        支付密钥：
        <el-input type="text" v-model="para.PayKEY" autoComplete="off" placeholder="" class="el-input"/>
        <span style="color: #e33c32">*</span>
      </p>
    </div>
    <div class="bg">
      <p class="grid-content">选择该公众号下的门店</p>
      <el-checkbox v-if="isShow" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox @change="handleCheckedCitiesChange" v-for="item in shops" v-model="item.check" :label="item.shopid" :key="item.shopid" :disabled="item.disable">{{item.shopname}}</el-checkbox>
    </div>
    <div style="width: 260px;margin: auto;white-space: nowrap;">
      <el-button class="el_save_btn" @click="clickConfirm">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
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
      isShow: true,
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
      this.loading = true
      this.getShops()
      this.queryWeshopInfo()
    },
    handleCheckAllChange (val) {
      if (this.checkAll) {
        this.shops.forEach(element => {
          if (!element.disable) {
            element.check = true
          }
        })
      } else {
        this.shops.forEach(element => {
          element.check = false
        })
      }
    },
    handleCheckedCitiesChange (value) {
      var ret = 0
      this.shops.forEach(element => {
        if (!element.check && !element.disable) {
          ret++
        }
      })
      if (ret > 0) {
        this.checkAll = false
      } else {
        this.checkAll = true
      }
    },
    clickConfirm () {
      if (this.dataValidation()) {
        var arr = []
        this.shops.forEach(element => {
          if (element.check) {
            arr.push(element.shopid + ',')
          }
        })
        this.para.ShopIDs = arr.join(',')
        this.$store.dispatch('queryChangeWxConfigInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$emit('close')
        }).catch(() => {
        })
      }
    },
    clickCancel () {
      this.$emit('close')
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
          if (this.id !== 0 && ListItemObj.groupaccountid === this.id) {
            ListItemObj.check = true
          } else {
            ListItemObj.check = false
          }
          if (ListItemObj.groupaccountid === 0 || ListItemObj.groupaccountid === this.id) {
            ListItemObj.disable = false
          } else {
            ListItemObj.disable = true
          }
          this.shops.push(ListItemObj)
        })
        this.handleCheckedCitiesChange()
      }).catch(() => {
      })
    },
    queryWeshopInfo () {
      this.$store.dispatch('queryWeshopInfo', {id: this.id, isshow: 0}).then((response) => {
        this.para.id = response.account.ID
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
// }
.el_save_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
  margin-top: 50px;
}
.parent{
  width: 300px;
  margin: 0 auto;
}
</style>
