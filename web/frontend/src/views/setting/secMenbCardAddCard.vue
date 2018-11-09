<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡名称：</span>
         <el-input v-model="para.Title" placeholder="请输入会员卡名称" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">消费折扣：</span>
         <el-input v-model="para.Discount" placeholder="请输入折扣" type="text" autoComplete="off" class="el-input"/>
         <em style="position:absolute;top:10px;left:340px;">%</em>
         <span style="color: #e33c32">*</span>
      </p>
      <div class="infoPerLine1 position">
        <span class="infoShowName">初始储值：</span>
         <el-input v-model="para.SavePrice" placeholder="请输入金额" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
         <em style="position:absolute;top:10px;left:340px;">元</em>
      </div>
      <p class="infoPerLine1 position">
        <span class="infoShowName">售卡金额：</span>
         <el-input v-model="para.SalePrice" placeholder="请输入售卡金额" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
         <em style="position:absolute;top:10px;left:340px;">元</em>
      </p>
      <p class="infoPerLine1 position">
        <span class="infoShowName">会员卡有效期：</span>
         <el-input v-model="para.ActiveMonth" placeholder="请输入有效期" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
         <em style="position:absolute;top:10px;left:340px;">月</em>
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
        <span class="infoShowName margin">适用门店：</span>
          <el-transfer :titles="['全选', '全选']" style="margin-left: 187px" @change="useShopChange" v-model="checkUseShop" :data="shopsUseData"></el-transfer>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">可用卡门店：</span>
        <span class="infoShowName margin">适用门店：</span>
          <el-transfer :titles="['全选', '全选']" style="margin-left: 187px" @change="sendShopChange" v-model="checkSendShop" :data="shopsSendData"></el-transfer>
      </p>
      <el-button class="el_save_btn" @click="clickSave">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      canAddUp: false,
      shopsUseData: [],
      checkUseShop: [],
      shopsSendData: [],
      checkSendShop: [],
      para: {
        ID: 0,
        GroupID: 0,
        Title: '',
        SavePrice: '',
        SalePrice: '',
        IsScore: false,
        IsAllowPay: false,
        ActiveMonth: '',
        AddDate: '',
        AdminID: 0,
        AdminCode: 0,
        // AdminName: '',
        Discount: '',
        IsClose: false,
        SaleComm: '',
        SaleCommType: 0,
        FillComm: '',
        FillCommType: 0,
        // OrderNo: '',
        UCardFillScore: '',
        UCardPayScore: '',
        // IDStr: '',
        sendShopIDs: '',
        useShopIDs: '',
        // UCardInfoGroupID: '',
        CanUseShops: '',
        CanSendShops: ''
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
        label: '充赠金额',
        FillCommType: 1
      }, {
        label: '充值金额',
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
      this.para = {
        ID: 0,
        GroupID: 0,
        Title: '',
        SavePrice: '',
        SalePrice: '',
        IsScore: false,
        IsAllowPay: false,
        ActiveMonth: '',
        AddDate: '',
        AdminID: 0,
        AdminCode: 0,
        // AdminName: '',
        Discount: '',
        IsClose: false,
        SaleComm: '',
        SaleCommType: 0,
        FillComm: '',
        FillCommType: 0,
        // OrderNo: '',
        UCardFillScore: '',
        UCardPayScore: '',
        // IDStr: '',
        sendShopIDs: '',
        useShopIDs: '',
        // UCardInfoGroupID: '',
        CanUseShops: '',
        CanSendShops: ''
      }
      this.getshops()
    },
    clickSave () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryAddUCardInfo', this.para).then((response) => {
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
    SaleCommTypeChange (val) {
      switch (val) {
        case 0:
          this.para.SaleComm = ''
          this.SaleCommUnit = '%'
          this.SaleCommDisable = true
          break
        case 1:
        case 2:
          this.para.SaleComm = 0
          this.SaleCommUnit = '%'
          this.SaleCommDisable = false
          break
        case 3:
          this.para.SaleComm = 0
          this.SaleCommUnit = '元/张'
          this.SaleCommDisable = false
          break
      }
    },
    FillCommTypeChange (val) {
      switch (val) {
        case 0:
          this.para.FillComm = ''
          this.FillCommDisable = true
          break
        case 1:
        case 2:
          this.para.FillComm = 0
          this.FillCommDisable = false
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
      this.$store.dispatch('queryBindShops', {shopid: 0}).then((response) => {
        this.shopsUseData = []
        response.shopsUseL.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsUseData.push(tmpObj)
        })
        this.shopsSendData = []
        response.shopsSendL.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsSendData.push(tmpObj)
        })
      }).catch(() => {
      })
    },
    useShopChange () {
      var arr = []
      for (var i = 0; i < this.checkUseShop.length; i++) {
        if ((this.checkUseShop.length - 1) !== i) {
          arr.push(this.checkUseShop[i] + ',')
        } else {
          arr.push(this.checkUseShop[i])
        }
      }
      this.para.sendShopIDs = arr.join('')
    },
    sendShopChange () {
      var arr = []
      for (var i = 0; i < this.checkSendShop.length; i++) {
        if ((this.checkSendShop.length - 1) !== i) {
          arr.push(this.checkUseShop[i] + ',')
        } else {
          arr.push(this.checkUseShop[i])
        }
      }
      this.para.useShopIDs = arr.join('')
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
.margin{
  margin-left: 180px;
}
.position{
  position:relative;
}
</style>
