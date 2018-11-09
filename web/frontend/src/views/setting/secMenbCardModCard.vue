<template>
  <div>
    <div v-loading="loading">
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡名称：</span>
         <el-input v-model="para.Title" placeholder="请输入会员卡名称" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">消费折扣：</span>
         <el-input type="text" placeholder="请输入折扣" v-model="para.Discount" autoComplete="off" class="el-input"/>
         <em style="position:absolute;top:10px;left:340px;">%</em>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">初始储值：</span>
         <el-input v-model="para.SavePrice" placeholder="请输入金额" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
         <em style="position:absolute;top:10px;left:340px;">元</em>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">售卡金额：</span>
         <el-input v-model="para.SalePrice" placeholder="请输入售卡金额" type="text" autoComplete="off" class="el-input"/>
         <em style="position:absolute;top:10px;left:340px;">元</em>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">会员卡有效期：</span>
         <el-input v-model="para.ActiveMonth" placeholder="请输入有效期" type="text" autoComplete="off" class="el-input"/>
         <em style="position:absolute;top:10px;left:340px;">月</em>
         <span style="color: #e33c32">*</span>
      </p>
      <p style="position:relative;display:inline-block" class="infoPerLine1">
        <span class="infoShowName">开卡提成类型：</span>
        <el-select @change="SaleCommTypeChange" class="statu_select" v-model="para.SaleCommType" placeholder="请选择">
          <el-option
            v-for="item in SaleCommTypes"
            :key="item.SaleCommType"
            :label="item.label"
            :value="item.SaleCommType"
            >
          </el-option>
        </el-select>
        <span class="infoShowName">提成数：</span>
        <el-input :disabled="SaleCommDisable" v-model="para.SaleComm" type="text" placeholder="请输入提成数" autoComplete="off" class="el-input"/>
        <em style="position:absolute;top:10px;left:740px;">{{SaleCommUnit}}</em>
      </p>
      <p style="position:relative;display:inline-block" class="infoPerLine1">
        <span class="infoShowName" placeholder="请输入提成数">充值提成类型：</span>
        <el-select @change="FillCommTypeChange" class="statu_select" v-model="para.FillCommType" placeholder="请选择">
          <el-option
            v-for="item in FillCommTypes"
            :key="item.FillCommType"
            :label="item.label"
            :value="item.FillCommType"
            >
          </el-option>
        </el-select>
        <span class="infoShowName">提成数：</span>
        <el-input :disabled="FillCommDisable" v-model="para.FillComm" placeholder="请输入提成数" type="text" autoComplete="off" class="el-input"/>
        <em style="position:absolute;top:10px;left:740px;">%</em>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">状态：</span>
        <el-radio-group v-model="para.IsClose">
          <el-radio :label="false">启用</el-radio>
          <el-radio :label="true">禁用</el-radio>
        </el-radio-group>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName"></span>
        <el-checkbox v-model="para.IsAllowPay">可充值 </el-checkbox>
        <el-checkbox v-model="para.IsScore">可积分</el-checkbox>
      </p>
      <div v-show="para.IsScore">
        <p class="infoPerLine1">
          <span class="infoShowName">积分规则：</span>
          充值
          <el-input v-model="para.UCardFillScore" type="text" autoComplete="off" class="el-input"/>
          元即可获得1积分
        </p>
        <p class="infoPerLine1">
          <span class="infoShowName"></span>
          消费
          <el-input v-model="para.UCardPayScore" type="text" autoComplete="off" class="el-input"/>
          元即可获得1积分
        </p>
      </div>
      <p class="infoPerLine1">
        <span class="infoShowName">可发卡门店：</span>
          <el-transfer :titles="['全选', '全选']" style="margin-left: 187px" v-model="checkSendShop" :data="shopsSendData"></el-transfer>
      </p>
      <p class="infoPerLine1">
        <span class="infoSh owName">可用卡门店：</span>
          <el-transfer :titles="['全选', '全选']" style="margin-left: 187px" v-model="checkUseShop" :data="shopsUseData"></el-transfer>
      </p>
      <el-button class="el_save_btn" @click="clickSave">确定</el-button>
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
      loading: true,
      canAddUp: false,
      shopsUseData: [],
      checkUseShop: [],
      shopsSendData: [],
      checkSendShop: [],
      para: {
        ID: '',
        GroupID: '',
        Title: '',
        SavePrice: '',
        SalePrice: '',
        IsScore: '',
        IsAllowPay: '',
        ActiveMonth: '',
        AddDate: '',
        AdminID: '',
        AdminCode: '',
        AdminName: '',
        Discount: '',
        IsClose: false,
        SaleComm: '',
        SaleCommType: 0,
        FillComm: '',
        FillCommType: 0,
        OrderNo: '',
        UCardFillScore: '',
        UCardPayScore: '',
        IDStr: '',
        UCardInfoGroupID: '',
        useShopIDs: '',
        sendShopIDs: ''
      },
      SaleCommTypes: [{
        label: '--请选择--',
        SaleCommType: 0
      }, {
        label: '卡储金额',
        SaleCommType: 1
      }, {
        label: '售卡金额',
        SaleCommType: 2
      }, {
        label: '按张提成',
        SaleCommType: 3
      }],
      FillCommTypes: [{
        label: '--请选择--',
        FillCommType: 0
      }, {
        label: '卡储金额',
        FillCommType: 1
      }, {
        label: '售卡金额',
        FillCommType: 2
      }],
      SaleCommUnit: '%',
      SaleCommDisable: true,
      FillCommDisable: true
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.getInfo()
      this.getshops()
    },
    getInfo () {
      this.loading = true
      this.$store.dispatch('queryUCardInfo', {id: this.id}).then((response) => {
        this.para = response.info
        this.checkSelectState()
        this.loading = false
      }).catch(() => {
      })
    },
    clickSave () {
      if (this.dataValidation()) {
        this.setSendShops()
        this.setUseShops()
        this.loading = true
        this.$store.dispatch('queryChangeUCardInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$emit('close')
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    clickCancel () {
      this.$emit('close')
    },
    SaleCommTypeChange (val) {
      this.checkSelectState()
      switch (val) {
        case 0:
          this.para.SaleComm = ''
          this.SaleCommUnit = '%'
          break
        case 1:
        case 2:
          this.para.SaleComm = 0
          this.SaleCommUnit = '%'
          break
        case 3:
          this.para.SaleComm = 0
          this.SaleCommUnit = '元/张'
          break
      }
    },
    FillCommTypeChange (val) {
      this.checkSelectState()
      switch (val) {
        case 0:
          this.para.FillComm = ''
          break
        case 1:
        case 2:
          this.para.FillComm = 0
          break
      }
    },
    dataValidation () {
      if (this.para.Title.trim() === '') {
        this.$message.error('请输入会员卡名称')
        return false
      }
      if (this.para.Discount === '') {
        this.$message.error('请输入消费折扣')
        return false
      }
      if (!this.isPositiveInteger(this.para.Discount) || this.para.Discount > 100 || this.para.Discount <= 0) {
        this.$message.error('消费折扣只能输入1-100之间的正整数')
        return false
      }
      if (this.para.SavePrice === '') {
        this.$message.error('请输入初始储值')
        return false
      }
      if (isNaN(this.para.SavePrice) || this.para.SavePrice < 0) {
        this.$message.error('初始储值只能输入正数，最多保留两位小数')
        return false
      }
      if (this.para.SalePrice === '') {
        this.$message.error('请输入售卡金额')
        return false
      }
      if (isNaN(this.para.SalePrice) || this.para.SalePrice < 0) {
        this.$message.error('售卡金额只能输入正数，最多保留两位小数')
        return false
      }
      if (this.para.SalePrice > this.para.SavePrice) {
        this.$message.error('售卡金额不得大于初始储值')
        return false
      }
      if (this.para.ActiveMonth === '') {
        this.$message.error('请输入会员卡有效期')
        return false
      }
      if (!this.isPositiveInteger(this.para.ActiveMonth)) {
        this.$message.error('会员卡有效期只能输入正整数')
        return false
      }
      if (this.para.IsScore && this.para.UCardPayScore === '' && this.para.UCardFillScore === '') {
        this.$message.error('充值和消费金额不能同时为空')
        return false
      }
      if (this.para.IsScore && (!this.isPositiveInteger(this.para.UCardPayScore) && this.para.UCardPayScore !== '')) {
        this.$message.error('积分规则必须为大于0的整数')
        return false
      }
      if (this.para.IsScore && (!this.isPositiveInteger(this.para.UCardFillScore) && this.para.UCardFillScore !== '')) {
        this.$message.error('积分规则必须为大于0的整数')
        return false
      }
      if (this.para.FillCommType !== 0) {
        if (this.para.FillComm <= 0 || this.para.FillComm > 100 || !this.isPositiveInteger(this.para.FillComm)) {
          this.$message.error('提成数请输入1-100的正整数')
          return false
        }
      }
      if (this.para.SaleCommType !== 0) {
        if (this.para.SaleComm > 100 || !this.isPositiveInteger(this.para.SaleComm)) {
          this.$message.error('提成数请输入1-100的正整数')
          return false
        }
      }
      return true
    },
    isPositiveInteger (s) {
      var re = /^[0-9]+$/
      return re.test(s)
    },
    getshops () {
      this.loading = true
      this.$store.dispatch('queryBindShops', {id: this.id}).then((response) => {
        this.shopsUseData = []
        response.shopsUseL.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsUseData.push(tmpObj)
        })
        this.checkUseShop = []
        response.shopsUse.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsUseData.push(tmpObj)
          this.checkUseShop.push(tmpObj.key)
        })
        this.shopsSendData = []
        response.shopsSendL.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsSendData.push(tmpObj)
        })
        this.checkSendShop = []
        response.shopsSend.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsSendData.push(tmpObj)
          this.checkSendShop.push(tmpObj.key)
        })
        this.loading = false
      }).catch(() => {
      })
    },
    checkSelectState () {
      if (this.para.SaleCommType === 0) {
        this.SaleCommDisable = true
        this.para.SaleComm = ''
      } else {
        this.SaleCommDisable = false
      }
      if (this.para.FillCommType === 0) {
        this.FillCommDisable = true
        this.para.FillComm = ''
      } else {
        this.FillCommDisable = false
      }
    },
    setSendShops () {
      var strArr = []
      this.checkSendShop.forEach(element => {
        strArr.push(element + ',')
      })
      this.para.sendShopIDs = strArr.join('')
    },
    setUseShops () {
      var strArr = []
      this.checkUseShop.forEach(element => {
        strArr.push(element + ',')
      })
      this.para.useShopIDs = strArr.join('')
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
}
.position{
  position:relative;
}
</style>
