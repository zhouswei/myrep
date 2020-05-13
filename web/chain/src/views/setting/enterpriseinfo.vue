<template>
  <div>
    <div v-if="isPermission(47)">
      <p class="infoPerLine1">
        <span class="infoShowName">
          连锁机构代码：
        </span>
        {{para.code}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">公司名称：</span>
        {{para.Title}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系人姓名：</span>
        {{para.Manager}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系人手机号：</span>
        {{para.Phone}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">
            联系人座机号：
        </span>
        <el-input v-model="para.Tel" style="width: 175px;" type="text" auto-complete="off" placeholder="请输入联系人座机号"/>
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
        <span style="color: #e33c32" class="red_dot">*</span>
      </div>
      <el-input v-model="para.Address" type="text" auto-complete="off" class="address_input el-input"/>
      <p class="infoPerLine1">
        <span class="infoShowName">可增加门店：</span>
        {{para.ShopMax}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">使用状态：</span>
        {{para.StateTitle}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">注册时间：</span>
        {{para.AddTime}}
      </p>
      <el-button v-if="isPermission(48)" @click="saveEnterpriseInof" class="save_btn">保存</el-button>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
  </div>
</template>
<script>
import cityOptions from '@/utils/city_data2017_element.js'
import { getValideShopState } from '@/utils/shop'
import { parseTime, formatTimestamp, formatPath } from '@/utils'
export default {
  name: 'enterpriseinfo',
  activated () {
    this.getEnterpriseInfo()
  },
  data () {
    return {
      cityOptions: cityOptions,
      citys: [],
      para: {
        ID: 0,
        GroupCode: '',
        Title: '',
        Manager: '',
        Phone: '',
        Tel: '',
        Province: '',
        City: '',
        Area: '',
        Address: '',
        ShopMax: '',
        State: '',
        StateTitle: '',
        AddTime: ''
      }
    }
  },
  methods: {
    tranlatePath (path) {
      return formatPath(path)
    },
    isPermission (val) {
      var iRet = -1
      for (var i = 0; i < this.$store.getters.funcList.length && iRet === -1; i++) {
        for (var j = 0; j < this.$store.getters.funcList[i].length; j++) {
          if (this.$store.getters.funcList[i][j].ID === val && this.$store.getters.funcList[i][j].IsSelected !== 0) {
            iRet = val
            break
          }
        }
      }
      if (iRet !== -1) {
        return true
      } else {
        return false
      }
    },
    getEnterpriseInfo () {
      this.$store.dispatch('queryEnterpriseInfo', {}).then((response) => {
        this.para.ID = response.info.ID
        this.para.code = response.info.GroupCode
        this.para.GroupCode = response.info.GroupCode
        this.para.Title = response.info.Title
        this.para.Tel = response.info.Tel
        this.para.Manager = response.info.Manager
        this.para.Phone = response.info.Phone
        this.para.ShopMax = response.info.ShopMax
        this.para.Address = response.info.Address
        this.para.Province = response.info.Province
        this.para.City = response.info.City
        this.para.Area = response.info.Area
        this.citys = []
        this.citys.push(this.para.Province.toString())
        this.citys.push(this.para.City.toString())
        this.citys.push(this.para.Area.toString())
        this.para.State = response.info.State
        this.para.StateTitle = getValideShopState(response.info.State)
        this.para.AddTime = parseTime(formatTimestamp(response.info.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
      }).catch(() => {
      })
    },
    saveEnterpriseInof () {
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
      if (this.para.Address === '') {
        this.$message.error('请输入详细地址')
        return
      }
      this.$store.dispatch('querySaveEnterpriseInfo', this.para).then((response) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.getEnterpriseInfo()
      }).catch(() => {

      })
    },
    changeProvince () {
      this.para.Province = this.citys[0] !== undefined ? this.citys[0] : ''
      this.para.City = this.citys[1] !== undefined ? this.citys[1] : ''
      this.para.Area = this.citys[2] !== undefined ? this.citys[2] : ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infoShowName {
    display: inline-block;
    width: 187px;
    line-height: 34px;
    text-align: right;
    color: #5e5e5e;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
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
.address_input{
  margin-left: 190px;
  margin-top: 10px;
  width: 398px;
}
  @media (max-width:500px) {
    .infoShowName{
      width: initial;
      padding-left: 20px;
    }
    .el-input{
      display: block;
      padding-left: 20px;
      width: initial!important;
    }
    .el-cascader{
      display: block;
      padding-left: 20px;
    }
    .red_dot{
      display: none;
    }
    .address_input{
      margin-left: 0;
    }
  }
</style>
<style scoped>
  .infoPerLine >>> .el-input__inner {
    width: 398px;
  }
  @media (max-width:500px) {
    .infoPerLine >>> .el-input__inner {
      width: 100%;
      display: block;
    }
    .infoPerLine >>> .el-cascader__label{
      padding-left: 32px;
    }
  }
</style>
