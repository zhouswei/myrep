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
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkShops" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in shops" :label="item.shopid" :key="item.shopid" :disabled="item.disable">{{item.shopname}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="width: 260px;margin: auto;white-space: nowrap;">
      <el-button class="el_save_btn" @click="clickConfirm">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      shops: [],
      checkShops: [],
      checkAll: false,
      isIndeterminate: false,
      loading: true,
      para: {
        id: 0,
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
    this.getShops()
  },
  methods: {
    update () {
      this.checkShops = []
      this.isIndeterminate = false
      this.checkAll = false
      this.para = {
        id: 0,
        MpName: '',
        MpAppID: '',
        MpAppSecret: '',
        MCHID: '',
        PayKEY: '',
        ShopIDs: ''
      }
      this.getShops()
    },
    handleCheckAllChange (val) {
      var totalShops = []
      this.shops.forEach(element => {
        if (!element.disable) {
          totalShops.push(element.shopid)
        }
      })
      this.checkShops = val ? totalShops : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      this.checkShops = value
      let checkedCount = value.length
      this.checkAll = checkedCount === this.shops.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.shops.length
    },
    clickConfirm () {
      if (this.dataValidation()) {
        var arr = []
        for (var i = 0; i < this.checkShops.length; i++) {
          if ((this.checkShops.length - 1) !== i) {
            arr.push(this.checkShops[i] + ',')
          } else {
            arr.push(this.checkShops[i])
          }
        }
        this.para.ShopIDs = arr.join('')
        this.$store.dispatch('queryAddWxConfigInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '添加成功'
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
      if (this.para.MpName.trim() === '') {
        this.$message.error('请输入公众号名称')
        return false
      }
      if (this.para.MpAppID.trim() === '') {
        this.$message.error('请输入公众号ID')
        return false
      }
      if (this.para.MpAppSecret.trim() === '') {
        this.$message.error('请输入AppSecret')
        return false
      }
      if (this.para.MCHID.trim() === '') {
        this.$message.error('请输入商户号')
        return false
      }
      if (this.para.PayKEY.trim() === '') {
        this.$message.error('请输入支付密钥')
        return false
      }
      return true
    },
    getShops () {
      this.loading = true
      this.$store.dispatch('queryShops', {id: 0}).then((response) => {
        this.shops = []
        response.forEach(element => {
          var ListItemObj = {}
          ListItemObj.shopid = element.shopid
          ListItemObj.shopname = element.shopname
          ListItemObj.address = element.address
          ListItemObj.authtype = element.authtype
          ListItemObj.groupaccountid = element.groupaccountid
          if (ListItemObj.groupaccountid === 0) {
            ListItemObj.disable = false
          } else {
            ListItemObj.disable = true
          }
          this.shops.push(ListItemObj)
        })
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
