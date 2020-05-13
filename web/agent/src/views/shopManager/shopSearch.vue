<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="商户筛选">
      <router-link to="/shopManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button slot="right" @click="shareclick">搜索</mt-button> -->
    </mt-header>
    <div class="mian_container">
      <div class="shop_info_option">
        <p>
          <span>商户类型</span>
            <el-select v-model="searchRange" placeholder="全部商户">
              <el-option
                v-for="item in searchRanges"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
        </p>
        <p>
          <span>商户名称</span>
          <el-input style="width:50%;text-align:right;" v-model="shopName" placeholder="请输入商户名称"></el-input>
        </p>
        <p>
          <span>经营模式</span>
            <el-select v-model="chainType" placeholder="请选择">
              <el-option
                v-for="item in chainTypes"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
        </p>
        <p>
          <span>版本</span>
            <el-select v-model="version" placeholder="请选择">
              <el-option
                v-for="item in versions"
                :key="item.value"
                :label="item.VersionName"
                :value="item.ID">
              </el-option>
            </el-select>
        </p>
        <p>
          <span>商户状态</span>
            <el-select v-model="shopStatus" placeholder="请选择">
              <el-option
                v-for="item in shopStatuses"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
        </p>
      </div>
      <div class="shop_date_option">
        <p>尾款到期日</p>
        <!-- <div>
          <el-input @click.native='openPicker("payStart", payStartDate)' readonly="true" v-model='payStartDate' placeholder="请选择日期"></el-input>
          <span>—</span>
          <el-input @click.native='openPicker("payEnd", payEndDate)' readonly="true" v-model='payEndDate' placeholder="请选择日期"></el-input>
          <em @click="clearInp('pay')">清空</em>
        </div> -->
        <div>
          <el-date-picker
            v-model="payStartDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <span>—</span>
          <el-date-picker
            v-model="payEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <em @click="clearInp('pay')">清空</em>
        </div>
      </div>
      <div class="subShop_date_option">
        <p>服务到期日</p>
        <!-- <div>
          <el-input @click.native='openPicker("serviceStart", serviceStartDate)' readonly="true" v-model='serviceStartDate' placeholder="请选择日期"></el-input>
          <span>—</span>
          <el-input @click.native='openPicker("serviceEnd", serviceEndDate)' readonly="true" v-model='serviceEndDate' placeholder="请选择日期"></el-input>
          <em @click="clearInp('service')">清空</em>
        </div> -->
        <div>
          <el-date-picker
            v-model="serviceStartDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <span>—</span>
          <el-date-picker
            v-model="serviceEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <em @click="clearInp('pay')">清空</em>
        </div>
      </div>
      <p class="btn_box">
        <el-button type="info" @click="resetInfo">重置</el-button>
        <el-button type="primary" @click="filterHandle">筛选</el-button>
      </p>
      <mt-datetime-picker
        v-model="pickerVisible"
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        >
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  data () {
    return {
      value: '',
      searchRanges: [{value: 0, title: '全部商户'}, {value: 1, title: '我发展的'}, {value: 2, title: '下线发展的'}],
      searchRange: '',
      shopName: '',
      chainTypes: [{value: 0, title: '单店'}, {value: 1, title: '连锁店'}],
      chainType: '',
      versions: [],
      version: '',
      shopStatuses: [{value: 0, title: '待审核'}, {value: 1, title: '已启用'}, {value: 2, title: '已停用'}, {value: 4, title: '待付款'}, {value: 5, title: '已拒绝'}],
      shopStatus: '',
      pickerValue: '请选择',
      payStartDate: '',
      payEndDate: '',
      serviceStartDate: '',
      serviceEndDate: '',
      pickerVisible: parseTime(new Date(), '{y}-{m}-{d}'),
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.getAllVersions()
  },
  methods: {
    openPicker (type, val) {
      this.type = type
      this.$refs.picker.open()
      if (val) {
        this.pickerVisible = val
      }
    },
    handleConfirm (data) {
      let date = parseTime(data, '{y}-{m}-{d}')
      if (this.type === 'payStart') {
        this.payStartDate = date
      }
      if (this.type === 'payEnd') {
        this.payEndDate = date
      }
      if (this.type === 'serviceStart') {
        this.serviceStartDate = date
      }
      if (this.type === 'serviceEnd') {
        this.serviceEndDate = date
      }
    },
    getAllVersions () {
      var params = {}
      params['IsEnabledOnly'] = false
      this.$store.dispatch('GetVersionList', params).then((response) => {
        this.versions = response.Versions
      }).catch(() => {

      })
    },
    filterHandle () {
      console.log('日期', this.payStartDate)
      if (this.payStartDate && !this.payEndDate) {
        this.$message({
          type: 'error',
          message: '请选择尾款结束日期',
          showClose: true
        })
        return
      }
      if (this.serviceStartDate && !this.serviceEndDate) {
        this.$message({
          type: 'error',
          message: '请选择服务结束日期',
          showClose: true
        })
        return
      }
      let queryParams = {}
      queryParams.searchRange = this.searchRange ? this.searchRange : 0
      queryParams.shopName = this.shopName
      queryParams.chainType = this.chainType ? this.chainType : 0
      queryParams.version = this.version ? this.version : 0
      queryParams.shopStatus = this.shopStatus ? this.shopStatus : ''
      queryParams.payStartDate = this.payStartDate
      queryParams.payEndDate = this.payEndDate
      queryParams.serviceStartDate = this.serviceStartDate
      queryParams.serviceEndDate = this.serviceEndDate
      this.$router.push({ path: '/shopManager', query: queryParams })
    },
    clearInp (type) {
      if (type === 'pay') {
        this.payStartDate = ''
        this.payEndDate = ''
      } else {
        this.serviceStartDate = ''
        this.serviceEndDate = ''
      }
    },
    resetInfo () {
      this.searchRange = ''
      this.shopName = ''
      this.chainType = ''
      this.version = ''
      this.shopStatus = ''
      this.payStartDate = ''
      this.payEndDate = ''
      this.serviceStartDate = ''
      this.serviceEndDate = ''
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .mian_container{
    &>div{
      background-color: #fff;
      margin-bottom: 20px;
      padding: 10px;
    }
    .shop_info_option{
      p{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        span{
          line-height: 36px;
        }
      }
    }
    .shop_date_option,.subShop_date_option{
      &>div{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        span{
          line-height: 30px;
          margin: 0 10px;
          display: block;
        }
        em{
          font-style:initial;
          width: 108px;
          display: inline-block;
          font-size: 12px;
          color: #606266;
          height: 36px;
          line-height: 36px;
          text-align: center;
        }
      }
    }
    .btn_box{
      display: flex;
      justify-content: space-around;
    }
  }
</style>
<style>
  .shop_info_option input.el-input__inner{
    border: none;
    text-align: right;
  }
  .shop_date_option input.el-input__inner,.subShop_date_option input.el-input__inner{
    border: none;
    background-color: #ebeef5;
    border-radius: 20px;
    width: 94%;
  }
</style>
