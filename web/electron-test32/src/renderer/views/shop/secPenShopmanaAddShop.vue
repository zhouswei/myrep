<template>
  <div>
    <div>
      <!-- <p class="infoPerLine1">
        <span class="infoShowName">门店照片：</span>
        <el-input v-model="pic" type="text" autoComplete="off"/>
        <el-button>选择照片</el-button>
      </p> -->
      <p class="infoPerLine1">
        <span class="infoShowName">门店照片：</span>
        <el-upload
          style="margin-left:200px"
          class="avatar-uploader"
          action="https://link.handnear.com/up/upload.aspx?t=chain_pic&r=/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="!hind" :src="imgSrc" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <span style="color: #37bfc8" v-if="!hind"><u>更换</u></span>
        </el-upload>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">门店名称：</span>
         <el-input v-model="shopTitle" autoComplete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">门店联系人：</span>
         <el-input v-model="shopContact" type="text" autoComplete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系人手机号：</span>
         <el-input v-model="ContactPhoneNo" type="text" autoComplete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系邮箱：</span>
         <el-input v-model="Email" type="text" autoComplete="off"/>
      </p>
      <p class="infoPerLine1" style="position: relative;">
        <span class="infoShowName">营业面积：</span>
         <el-input v-model="space" type="text" autoComplete="off"/>
         <em style="position:absolute;top:0;left:460px;font-size:16px;">㎡</em>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">营业时间：</span>
        <el-time-picker
          v-model="queryStartDate"
          type="date"
          placeholder="选择开始时间"
          arrow-control>
        </el-time-picker>
        ~
        <el-time-picker
          v-model="queryEndDate"
          type="date"
          placeholder="选择结束时间"
          arrow-control>
        </el-time-picker>
      </p>
      <div class="infoPerLine">
        <span class="infoShowName">
            联系地址：
        </span>
        <el-cascader
            :options="cityOptions"
            v-model="citys"
            @change="changeProvince"
            change-on-select
          >
        </el-cascader>
        <el-input v-model="Address" type="text" autoComplete="off"/>
        <span style="color: #e33c32">*</span>
      </div>
      <p class="infoPerLine1">
        <span class="infoShowName">门店类型：</span>
        <el-radio v-model="ChainType" label="1">直营</el-radio>
        <el-radio v-model="ChainType" label="0">加盟</el-radio>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">开通账户数：</span>
         <el-input v-model="AccountMax" type="text" autoComplete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">开通短信数：</span>
         <el-input v-model="SMSMax" type="text" autoComplete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">服务有效期：</span>
        <el-date-picker
          v-model="useableDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
         <span style="color: #e33c32">*</span>
      </p>
      <div style="width: 260px;margin: auto;white-space: nowrap;">
        <el-button class="el_save_btn" @click="clickSave">确定</el-button>
        <el-button class="el_cancel_btn" @click="clickCancel">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import cityOptions from '@/utils/city_data2017_element.js'
import {parseTime} from '@/utils'
export default {
  data () {
    return {
      cityOptions: cityOptions,
      hind: true,
      pic: '',
      imgSrc: '',
      shopTitle: '',
      shopContact: '',
      ContactPhoneNo: '',
      Email: '',
      space: '',
      businessTime: '',
      Province: 0,
      citys: [],
      City: 0,
      Area: 0,
      ChainType: '1',
      AccountMax: '',
      SMSMax: '',
      queryEndDate: '',
      queryStartDate: '',
      useableDate: '',
      fileList: [],
      dialogVisible: false,
      Address: ''
    }
  },
  methods: {
    update () {
      this.pic = ''
      this.imgSrc = ''
      this.shopTitle = ''
      this.shopContact = ''
      this.ContactPhoneNo = ''
      this.Email = ''
      this.space = ''
      this.businessTime = ''
      this.Province = 0
      this.citys = []
      this.City = 0
      this.Area = 0
      this.ChainType = '1'
      this.AccountMax = ''
      this.SMSMax = ''
      this.queryEndDate = ''
      this.queryStartDate = ''
      this.useableDate = ''
      this.fileList = []
      this.dialogVisible = false
      this.Address = ''
    },
    clickSave () {
      if (this.dataValidation()) {
        this.$store.dispatch('ShopmanagerAddShop', {
          ID: 0,
          GroupID: 0,
          Title: this.shopTitle,
          Pic: this.pic,
          Space: parseTime(this.space),
          ShopHours: parseTime(this.queryStartDate, '{h}:{i}:{s}') + '~' + parseTime(this.queryEndDate, '{h}:{i}:{s}'),
          ShopType: 0,
          ShopIndustry: 0,
          Phone: this.ContactPhoneNo,
          Province: this.Province,
          City: this.City,
          Area: this.Area,
          Address: this.Address,
          AddressAll: '',
          X: 0,
          Y: 0,
          AddTime: parseTime(Date.now(), '{y}-{m}-{d}'),
          AdminId: 0,
          IsClose: false,
          ShopCode: '',
          AccountMax: parseInt(this.AccountMax),
          AccountCurrent: this.AccountCurrent,
          SMSMax: parseInt(this.SMSMax),
          SMSCurrent: 0,
          VersionLevel: 0,
          ServiceStartDate: '',
          ServiceEndDate: this.useableDate,
          Manager: this.shopContact,
          Email: this.Email,
          ChainType: parseInt(this.ChainType),
          ShopState: 0,
          ModifyTime: parseTime(Date.now(), '{y}-{m}-{d}')
        }).then((response) => {
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
    changeProvince (value) {
      this.Province = this.citys[0] !== undefined ? parseInt(this.citys[0]) : -1
      this.City = this.citys[1] !== undefined ? parseInt(this.citys[0]) : -1
      this.Area = this.citys[2] !== undefined ? parseInt(this.citys[0]) : -1
    },
    handleAvatarSuccess (res, file) {
      var start = res.indexOf('Msg') + 6
      var end = res.indexOf('}') - 1
      var url = res.substring(start, end)
      this.pic = url
      this.imgSrc = URL.createObjectURL(file.raw)
      this.hind = false
    },
    dataValidation () {
      if (this.shopTitle.trim() === '') {
        this.$message.error('请输入门店名称')
        return false
      }
      if (this.shopContact.trim() === '') {
        this.$message.error('请输入门店联系人')
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.ContactPhoneNo))) {
        this.$message.error('请输入正确的手机号')
        return false
      }
      if (isNaN(this.space) || parseInt(this.space) < 0 || parseInt(this.space) > 10000000) {
        this.$message.error('请输入正确的营业面积')
        return false
      }
      if (this.citys.length === 0) {
        this.$message.error('请选择联系地址')
        return false
      } else if (this.citys.length === 1) {
        this.$message.error('请选择城市')
        return false
      } else if (this.citys.length === 2) {
        this.$message.error('请选择区域')
        return false
      }
      if (this.Address.trim() === '') {
        this.$message.error('请输入门店地址')
        return
      }
      if (this.AccountMax.trim() === '') {
        this.$message.error('请输入开通账户数')
        return false
      }
      if (!(/(^[1-9]\d*$)/.test(this.AccountMax))) {
        this.$message.error('请输入正确的账户数')
        return false
      }
      if (this.SMSMax.trim() === '') {
        this.$message.error('请输入开通短信数')
        return false
      }
      if (this.citys.length === 0) {
        this.$message.error('请选择联系地址')
        return false
      } else if (this.citys.length === 1) {
        this.$message.error('请选择城市')
        return false
      } else if (this.citys.length === 2) {
        this.$message.error('请选择区域')
        return false
      }
      if (this.useableDate === '' || this.useableDate === null) {
        this.$message.error('请选择服务有效期')
        return false
      }
      return true
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
.el-input__inner{
  display: inline-block;
  width: 300px;
  height: 35px;
}
.el-input{
  display: inline-block;
  width: 300px;
  height: 35px;
}
.el_save_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-bottom: 30px;
}
.el_cancel_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
}
.address_input{
  margin-left: 190px;
  margin-top: 10px;
  width: 398px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
