<template>
  <div v-loading="loading">
    <div>
      <span class="infoShowName">
        门店照片：
      </span>
      <el-upload
        style="margin-left:200px"
        class="avatar-uploader"
        action="https://link.handnear.com/up/upload.aspx?t=chain_pic&r=/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="!hind" :src="imgSrc" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <span style="color: #37bfc8" v-if="!hind"><u>更换</u></span>
      </el-upload>
    </div>
    <p class="infoPerLine1">
      <span class="infoShowName">
        门店注册码：
      </span>
      {{pro1}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">门店名称：</span>
      {{pro2}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">门店联系人：</span>
      {{pro3}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">联系人手机：</span>
      {{pro4}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">联系邮箱：</span>
      {{pro5}}
    </p>
    <p class="infoPerLine1" style="position: relative">
      <span class="infoShowName">营业面积：</span>
      <el-input v-model="pro6" style="width:350px;padding-right:30px" type="text" autoComplete="off"/>
      <em style="position:absolute;top:5px;left:480px;font-size:16px;">㎡</em>
      <span style="width:auto" class="checkTip"></span>
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">营业时间：</span>
      <el-time-picker
        v-model="opening_time"
        arrow-control
        placeholder="任意时间点">
      </el-time-picker>
      ~
      <el-time-picker
        arrow-control
        v-model="close_time"
        placeholder="任意时间点">
      </el-time-picker>
    </p>
    <p class="infoPerLine" style="position:relative;">
      <span class="infoShowName">门店地址：</span>
      <el-cascader
          :options="cityOptions"
          v-model="citys"
          @change="changeProvince"
          change-on-select
        >
      </el-cascader>
      <el-input style="margin-left:190px;margin-top:10px;" type="text" v-model="address" autoComplete="off" placeholder="地址" />
      <span style="color: #e33c32;" class="red_dot">*</span>
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">门店类型:</span>
      {{pro7}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">开通账户数:</span>
      {{pro8}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">开通短信数:</span>
      {{pro9}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">服务有效期:</span>
      {{pro10}}
    </p>
    <p class="infoPerLine1">
      <span class="infoShowName">商户状态:</span>
      {{pro11}}
    </p>
    <el-button class="save_btn" @click="clickSave">保存</el-button>
  </div>
</template>
<script>
import { parseTime, formatTimestamp } from '@/utils'
import { getValideShopState, getShopType, getImageUrlPara } from '@/utils/shop'
import cityOptions from '@/utils/city_data2017_element.js'
export default {
  props: {
    ID: {
      default: 0
    }
  },
  data () {
    return {
      hind: true,
      opening_time: '',
      close_time: '',
      citys: [],
      selectedOptions: [],
      cityOptions: cityOptions,
      GroupID: '',
      pro1: '',
      pro2: '',
      pro3: '',
      pro4: '',
      pro5: '',
      pro6: '',
      pro7: '',
      pro8: '',
      pro9: '',
      pro10: '',
      pro11: '',
      address: '',
      pic: '',
      imgSrc: '',
      dialogVisible: false,
      loading: true,
      Province: '',
      City: '',
      Area: '',
      para: {}
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('queryValideShopDetailData', {id: this.ID}).then((response) => {
        this.para = response.info
        this.GroupID = response.info.GroupID
        this.pro1 = response.info.ShopCode
        this.pro2 = response.info.Title
        this.pro3 = response.info.Manager
        this.pro4 = response.info.Phone
        this.pro5 = response.info.Email
        this.pro6 = response.info.Space === 0 ? '' : response.info.Space
        this.pro7 = getShopType(response.info.ChainType)
        this.pro8 = response.info.AccountMax
        this.pro9 = response.info.SMSMax
        this.pro10 = parseTime(formatTimestamp(response.info.ServiceEndDate), '{y}-{m}-{d}')
        this.pro11 = getValideShopState(response.info.ShopState)
        this.address = response.info.Address
        this.citys = []
        this.citys.push(response.info.Province.toString())
        this.citys.push(response.info.City.toString())
        this.citys.push(response.info.Area.toString())
        this.Province = response.info.Province
        this.City = response.info.City
        this.Area = response.info.Area
        if (response.info.ShopHours.indexOf('~') !== -1) {
          var strArr = response.info.ShopHours.split('~')
          if (strArr[0] !== '') {
            this.opening_time = new Date(2016, 9, 10, strArr[0].split(':')[0], strArr[0].split(':')[1])
          } else {
            this.opening_time = ''
          }
          if (strArr[1] !== '') {
            this.close_time = new Date(2016, 9, 10, strArr[1].split(':')[0], strArr[1].split(':')[1])
          } else {
            this.close_time = ''
          }
        } else {
          this.opening_time = ''
          this.close_time = ''
        }
        this.imgSrc = getImageUrlPara() + response.info.Pic
        this.pic = response.info.Pic
        if (response.info.Pic === '') {
          this.hind = true
        } else {
          this.hind = false
        }
        this.loading = false
      }).catch(() => {
      })
    },
    changeProvince (value) {
      this.Province = this.citys[0] !== undefined ? this.citys[0] : ''
      this.City = this.citys[1] !== undefined ? this.citys[1] : ''
      this.Area = this.citys[2] !== undefined ? this.citys[2] : ''
    },
    clickSave () {
      if (isNaN(this.pro6) || parseInt(this.pro6) < 0 || parseInt(this.pro6) > 10000000) {
        this.$message.error('请输入正确的营业面积')
        return
      }
      if (this.citys.length === 0) {
        this.$message.error('请选择联系地址')
        return
      } else if (this.citys.length === 1) {
        this.$message.error('请选择城市')
        return
      } else if (this.citys.length === 2) {
        this.$message.error('请选择区域')
        return
      }
      if (this.address.trim() === '') {
        this.$message.error('请输入正确的合法地址')
        return
      }
      this.para.Province = this.Province
      this.para.City = this.City
      this.para.Area = this.Area
      this.para.Address = this.address
      this.para.Space = parseInt(this.pro6)
      var startStr = ''
      if (this.opening_time !== null) {
        startStr = parseTime(this.opening_time, '{h}:{i}:{s}')
      }
      var endStr = ''
      if (this.close_time !== null) {
        endStr = parseTime(this.close_time, '{h}:{i}:{s}')
      }
      this.para.ShopHours = startStr + '~' + endStr
      this.para.AddressAll = ''
      this.para.Pic = this.pic
      this.para.AddTime = parseTime(formatTimestamp(this.para.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
      this.para.ModifyTime = parseTime(formatTimestamp(this.para.ModifyTime), '{y}-{m}-{d} {h}:{i}:{s}')
      this.para.ServiceEndDate = parseTime(formatTimestamp(this.para.ServiceEndDate), '{y}-{m}-{d} {h}:{i}:{s}')
      this.para.ServiceStartDate = parseTime(formatTimestamp(this.para.ServiceStartDate), '{y}-{m}-{d} {h}:{i}:{s}')
      this.$store.dispatch('queryChangeValShop', this.para).then((response) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.$emit('close')
      }).catch(() => {
      })
    },
    handleAvatarSuccess (res, file) {
      var start = res.indexOf('Msg') + 6
      var end = res.indexOf('}') - 1
      var url = res.substring(start, end)
      this.pic = url
      this.imgSrc = URL.createObjectURL(file.raw)
      this.hind = false
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
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
.save_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  margin-left: 160px;
  text-align: center;
}
.save_btn:hover{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
.save_btn:focus{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
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
<style scoped>
  .infoPerLine >>> .el-input__inner {
    width: 320px;
    position: relative;
  }
  .red_dot{
    position: absolute;
    left: 521px;
    top: 55px;
  }
</style>
