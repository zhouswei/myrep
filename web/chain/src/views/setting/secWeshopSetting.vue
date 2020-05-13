<template>
  <div style="parent">
    <p class="infoPerLine1">
      <span class="infoShowName">
        门店：
      </span>
      {{para.Title}}
    </p>
    <div class="infoPerLine">
      <span class="infoShowName">
          联系地址：
      </span>
      <el-cascader
          class="cascader"
          :options="cityOptions"
          v-model="citys"
          @change="changeProvince"
          change-on-select
        >
      </el-cascader>
      <!-- <span style="color: #e33c32">*</span> -->
      <el-input @focus="clickAdress" v-model="para.Address" type="text" autocomplete="off" class="address_input el-input"/>
      <span style="color: #e33c32">*</span>
    </div>
    <p class="infoPerLine1">
      <span class="infoShowName">连锁微店门头照片：</span>
      <span style="color: #e33c32">*</span>
      <el-upload
        :disabled="disabled"
        style="text-align: center;"
        class="avatar-uploader"
        action="https://link.handnear.com/up/upload.aspx?t=chain_pic&r=/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="!hind" :src="imgSrc" class="avatar" onerror="javascript:this.src='http://r.handnear.com/wechat/images/shopwxsrc.png'">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <span style="color: #37bfc8" v-if="!hind"><u>更换</u></span>
      </el-upload>
    </p>
    <div style="width: 260px;margin: auto;white-space: nowrap;">
      <el-button @click="clickConfirm" class="save_btn">确定</el-button>
      <el-button @click="clickCancle" class="el_cancel_btn">取消</el-button>
    </div>
  </div>
</template>
<script>
import cityOptions from '@/utils/city_data2017_element.js'
import { getImageUrlPara } from '@/utils/shop'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
export default {
  name: 'enterpriseinfo',
  mixins: [ResizeMixin],
  mounted () {
    if (this.isMobile()) {
      this.disabled = true
    } else {
      this.disabled = false
    }
  },
  created () {
    this.getSettingInfo()
  },
  props: {
    id: {
      default: 0
    },
    address: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      cityOptions: cityOptions,
      citys: [],
      imgSrc: '',
      hind: true,
      disabled: false,
      para: {
        Title: '',
        Address: '',
        ProvinceID: '',
        CityID: '',
        AreaID: '',
        ShopID: this.id,
        Pic: ''
      },
      fullAddress: ''
    }
  },
  methods: {
    getSettingInfo () {
      this.para.ShopID = this.id
      this.$store.dispatch('querySettingInfo', {id: this.id}).then((response) => {
        this.para.Title = response.shopinfo.Title
        this.para.Address = response.shopwx.Address
        this.para.ProvinceID = response.shopwx.ProvinceID
        this.para.CityID = response.shopwx.CityID
        this.para.AreaID = response.shopwx.AreaID
        this.imgSrc = getImageUrlPara() + response.shopwx.Pic
        this.para.Pic = response.shopwx.Pic
        this.citys = []
        this.citys.push(this.para.ProvinceID.toString())
        this.citys.push(this.para.CityID.toString())
        this.citys.push(this.para.AreaID.toString())
        if (response.shopwx.Pic === '') {
          this.hind = true
        } else {
          this.hind = false
        }
        this.getFullAddress()
      }).catch(() => {
      })
    },
    clickConfirm () {
      if (this.citys.length !== 3) {
        this.$message.error('请选择完整的地址')
        return
      }
      if (this.para.Address === '') {
        this.$message.error('请输入详细地址')
        return
      }
      if (this.para.Pic === '') {
        this.$message.error('请上传门头照')
        return
      }
      this.$store.dispatch('querySettingWxConfigInfo', this.para).then((response) => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$emit('close')
      }).catch(() => {
      })
    },
    clickCancle () {
      this.$emit('close')
    },
    changeProvince () {
      this.para.ProvinceID = this.citys[0] !== undefined ? this.citys[0] : ''
      this.para.CityID = this.citys[1] !== undefined ? this.citys[1] : ''
      this.para.AreaID = this.citys[2] !== undefined ? this.citys[2] : ''
      this.getFullAddress()
    },
    getFullAddress () {
      if (this.citys.length === 3) {
        var arr = []
        this.getCascaderObj(this.citys, this.cityOptions).forEach(element => {
          arr.push(element.label)
        })
        this.fullAddress = arr.join('')
      }
    },
    handleAvatarSuccess (res, file) {
      var start = res.indexOf('Msg') + 6
      var end = res.indexOf('}') - 1
      var url = res.substring(start, end)
      this.para.Pic = url
      this.imgSrc = URL.createObjectURL(file.raw)
      this.hind = false
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    clickAdress () {
      if (this.para.ProvinceID === 0 || this.para.CityID === 0 || this.para.AreaID === 0) {
        this.$message.error('请先选择省市区')
        return
      }
      this.$emit('clickOp', this.para.Address, this.fullAddress)
    },
    setData () {
      this.para.Address = this.address
    },
    getCascaderObj (val, opt) {
      return val.map(function (value, index, array) {
        for (var itm of opt) {
          if (itm.value === value) { opt = itm.children; return itm }
        }
        return null
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infoShowName {
    display: inline-block;
    // width: 187px;
    // line-height: 34px;
    // text-align: right;
    // color: #5e5e5e;
    // font-size: 14px;
    // font-family: 'Microsoft YaHei';
    // font-family: 'Microsoft YaHei UI';
    // font-family: '微软雅黑';
    text-align: center;
}
.infoPerLine1 {
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
    font-size: 14px;
}
.city_cascader_class{
  display: inline-block;
}
.save_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
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
.address_input{
  margin-top: 10px;
  width: 300px;
}
.cascader{
  width: 300px;
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
.parent{
  width: 400px;
  margin: 0 auto;
}
</style>
