<template>
  <div>
    <div v-if="isPermission(18)">
      <el-row class="first-row" :gutter="10">
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            会员卡号:
            <el-input class="member-input-content" v-model="memberCard" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            手机号:
            <el-input class="member-input-content" v-model="memberPhone" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            卡类型:
            <el-select v-model="memberCardType" placeholder="-请选择-">
              <el-option
                v-for="item in MemberCardTypeList"
                :key="item.ID"
                :label="item.Title"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            充值门店:
            <el-select v-model="membershop" placeholder="-请选择-">
              <el-option
                v-for="item in MemberChargeShopList"
                :key="item.ID"
                :label="item.Title"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :xs="8" :sm="24" :md="4" :lg="24" :xl="24">
          <div class="member-date">
            充值日期:
            <el-date-picker
              v-model="queryStartDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            ~
            <el-date-picker
              v-model="queryEndDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <el-button class="member-but" type="primary" @click="queryDataHandle(1)" :loading="downloadLoading1">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        stripe>
        <el-table-column
          prop="tableSerialNum"
          fixed
          label="序号">
        </el-table-column>
        <el-table-column
          prop="tableMemberCard"
          label="会员卡号">
        </el-table-column>
        <el-table-column
          prop="tableMemberName"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="tableChargeTime"
          label="充值时间">
        </el-table-column>
        <el-table-column
          prop="tableChargeShop"
          label="充值门店">
        </el-table-column>
        <el-table-column
          prop="tablePhone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="tableChargeMoney"
          label="充值金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableZenTotal"
          label="赠送金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableTotalMoney"
          label="充值总额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealLast"
          label="卡账面余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableShopZen"
          label="本店赠送(元)">
        </el-table-column>
        <el-table-column
          prop="tablePayType"
          label="付款方式">
        </el-table-column>
        <el-table-column
          prop="tableSaler"
          label="销售员">
        </el-table-column>
        <el-table-column
          prop="tableOperatoioner"
          label="操作人">
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        ref="bottomPagination"
        layout="prev, pager, next"
        background
        @current-change="changePageHandle"
        :current-page.sync="pageIndex"
        :page-size="20"
        :total="pageTotal">
      </el-pagination>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTimestamp, formatPath } from '@/utils'
export default {
  name: 'chargerecord',
  computed: {
    MemberCardTypeList () {
      // (JSON.stringify(this.$store.getters.memberbase.memberTypeList))
      return this.$store.getters.memberbase.memberTypeList
    },
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  mounted () {
    this.queryDataHandle(this.pageIndex)
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
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    queryDataHandle (currentIndex) {
      let cardTitle = ''
      for (let i = 0; i < this.MemberCardTypeList.length; i++) {
        if (this.MemberCardTypeList[i].ID === this.memberCardType) {
          cardTitle = this.MemberCardTypeList[i].Title
          break
        }
      }
      const that = this
      that.downloadLoading1 = true
      this.$store.dispatch('GetMemberChargeList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: parseTime(this.queryStartDate === '0-0-0' ? '' : this.queryStartDate, '{y}-{m}-{d}'), endTime: parseTime(this.queryEndDate === '0-0-0' ? null : this.queryEndDate, '{y}-{m}-{d}'), PageIndex: currentIndex, PageSize: 20 }).then((response) => {
        that.pageTotal = response.PageTotal
        that.pageIndex = response.PageNo
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        // console.log(response.listInfo.length)
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (that.pageIndex - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableChargeTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d}')
          obj.tableChargeShop = that.returnOpencardTitle(response.listInfo[k].ShopID)
          obj.tablePhone = response.listInfo[k].Mobile
          obj.tableChargeMoney = response.listInfo[k].SalePrice === 0 ? '--' : '￥' + response.listInfo[k].SalePrice
          obj.tableZenTotal = response.listInfo[k].FreePrice === 0 ? '--' : '￥' + response.listInfo[k].FreePrice
          obj.tableTotalMoney = response.listInfo[k].SavePrice === 0 ? '--' : '￥' + response.listInfo[k].SavePrice
          obj.tableRealLast = response.listInfo[k].CurPrice === 0 ? '--' : '￥' + response.listInfo[k].CurPrice
          obj.tableShopZen = response.listInfo[k].LocalFreePrice !== 0 ? '￥' + response.listInfo[k].LocalFreePrice : '--'
          obj.tablePayType = response.listInfo[k].PayTypeTitle
          obj.tableSaler = response.listInfo[k].SaleCode
          obj.tableOperatoioner = response.listInfo[k].AdminCode
          tmpTable[k] = obj
        }
        that.tableData = tmpTable
        that.downloadLoading1 = false
      }).catch(() => {
        this.downloadLoading1 = false
      })
    },
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberChargeShopList.length; i++) {
        if (this.MemberChargeShopList[i].ID === value) {
          return this.MemberChargeShopList[i].Title
        }
      }
    },
    value2Status (state) {
      if (state === 1) {
        return '正常'
      } else if (state === 2) {
        return '冻结'
      } else if (state === 3) {
        return '挂失'
      }
    },
    formatfloat2StringKeep2 (row, cloumn, cellValue, index) {
      var f = Math.round(cellValue * 100) / 100
      var s = f.toString()
      var rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  data () {
    return {
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      memberCard: '',
      memberPhone: '',
      memberCardType: '',
      membershop: '',
      pageTotal: 10,
      pageIndex: 0,
      tableData: []
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  // .first-row {
  //   margin-top: 10px;
  // }
  // .second-row {
  //   margin-top: 10px;
  // }
  .member-input {
    margin-top: 20px;
  }
  .member-input-content {
    width: 200px;
  }
  .member-date {
    float: left;
    margin-top: 20px;
  }
  .member-but {
    margin-left: 10px;
    margin-top: 20px;
    float: left;
  }
</style>
