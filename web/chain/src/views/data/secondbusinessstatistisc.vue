// 营收明细
<template>
  <div class="secondbusiness-wrap">
    <div class="member-date">
      下单营业日期:
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
      门店:
      <el-select v-model="ShopId" placeholder="-请选择-">
        <el-option
          v-for="item in MemberShopList"
          :key="item.ID"
          :label="item.Title"
          :value="item.ID">
        </el-option>
      </el-select>
      结账状态:
      <el-select v-model="isOver" placeholder="-全部状态-">
        <el-option
          v-for="item in overStates"
          :key="item.state"
          :label="item.label"
          :value="item.state">
        </el-option>
      </el-select>
      <div v-show="isOver === 2">
        结账营业日期:
        <el-date-picker
          v-model="overStartDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        ~
        <el-date-picker
          v-model="overEndDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- <el-checkbox v-model="IsOver">未结账</el-checkbox> -->
      <el-button class="data-but" type="primary" @click="queryDataHandle(ShopId, queryStartDate, queryEndDate, isOver, overEndDate, overStartDate)" :loading="loadingview">统计</el-button>
      <el-button v-if="isPermission(76)" class="data-but" type="primary" @click="downloadDataHandle(ShopId, queryStartDate, queryEndDate, isOver, overEndDate, overStartDate)" :loading="loadingview1">导出</el-button>
    </div>
    <div>
      <el-table
        border
        :data="totallist"
        show-summary
        :summary-method="getSummaries"
        stripe>
        >
        <el-table-column
          fixed
          label="门店"
          prop="tableShop">
        </el-table-column>
        <el-table-column
          label="锁牌"
          prop="tableCardNo">
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="tableProjName">
        </el-table-column>
        <el-table-column
          label="数量"
          prop="tableProjNum">
        </el-table-column>
        <el-table-column
          label="项目类别"
          prop="tableProjectType">
        </el-table-column>
        <el-table-column
          label="应收金额(元)"
          prop="tableRealMoney">
        </el-table-column>
        <el-table-column
          label="折后金额(元)"
          prop="tablePayOffMoney">
        </el-table-column>
        <el-table-column
          label="结账"
          prop="tableIsOver">
        </el-table-column>
        <el-table-column
          label="下单时间"
          prop="tableOrderTime">
        </el-table-column>
        <el-table-column
          label="下单人"
          prop="tableOrderPerson">
        </el-table-column>
        <el-table-column
          label="结账时间"
          prop="tableOverTime">
        </el-table-column>
        <el-table-column
          label="账单号"
          prop="tableOrderNo">
        </el-table-column>
      </el-table>
    </div>
    <div style="color:red;font-size:15px;">
      <p>说明：<br/>
        1：套餐项目记录行中的金额不包括子项目的小费/续钟金额，子项目的小费/续钟会单独记录行；
      </p>
    </div>
    <el-pagination
      style="text-align: center"
      ref="bottomPagination1"
      layout="prev, pager, next"
      background
      @current-change="changePageHandle1"
      :current-page.sync="pageIndex"
      :page-size="pageSize"
      :total="pageTotal1">
    </el-pagination>
  </div>
</template>
<script>
import { parseTime, formatTimestamp, formatPath } from '@/utils'
export default {
  props: {
    ShopId: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  created () {
    this.queryStartDate = new Date()
    this.queryStartDate.setDate(this.queryStartDate.getDate() - 1)
    this.queryEndDate = new Date()
    this.queryEndDate.setDate(this.queryEndDate.getDate() - 1)
    this.updateData()
  },
  computed: {
    MemberShopList () {
      return this.$store.getters.memberbase.membershopOriginList
    }
  },
  data () {
    return {
      queryStartDate: '',
      queryEndDate: '',
      overStartDate: '',
      overEndDate: '',
      isOver: 2,
      loadingview1: false,
      loadingview: false,
      totallist: [],
      SumSalePrice: 0,
      SumRealPrice: 0,
      pageIndex: 1,
      pageTotal1: 0,
      pageSize: 20,
      overStates: [{
        state: 0,
        label: '全部状态'
      }, {
        state: 1,
        label: '未结账'
      }, {
        state: 2,
        label: '已结账'
      }]
    }
  },
  methods: {
    getSummaries (param) {
      const sums = []
      sums[0] = '合计'
      sums[5] = this.SumSalePrice
      sums[6] = this.SumRealPrice
      return sums
    },
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
    updateData () {
      this.isOver = 2
      this.queryStartDate = new Date()
      this.queryEndDate = new Date()
      this.queryDataHandle(this.ShopId, this.queryStartDate, this.queryEndDate, 2, this.overEndDate, this.overStartDate)
    },
    queryDataHandle (shopId, startTime, endTime, isOver, overStartDate, overEndDate) {
      this.loadingview = true
      this.$store.dispatch('queryBusinessStatisticDetail', {ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver, OverEndDate: overEndDate, OverBeginDate: overStartDate, iPage: this.pageIndex, iPageSize: 20}).then((response) => {
        this.loadingview = false
        this.totallist = []
        this.pageTotal1 = response.RowCount
        this.SumSalePrice = response.SumSalePrice
        this.SumRealPrice = response.SumRealPrice
        this.$refs.bottomPagination1.lastEmittedPage = this.pageIndex
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.tableShop = element.ShopName
          ItemObj.tableOrderNo = element.OrderCode
          ItemObj.tableCardNo = element.LCardCode
          ItemObj.tableProjName = element.ServiceTitle
          ItemObj.tableProjectType = element.ServiceTypeTitle
          ItemObj.tableRealMoney = element.SalePrice
          ItemObj.tablePayOffMoney = element.realPrice
          ItemObj.tableIsOver = element.IsOverDescription
          ItemObj.tableOrderTime = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.tableOrderPerson = element.AdminName
          ItemObj.tableProjNum = element.BuyNum
          ItemObj.tableOverTime = element.OverTime
          this.totallist.push(ItemObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    downloadDataHandle (shopId, startTime, endTime, isOver, overEndDate, overStartDate) {
      this.loadingview1 = true
      this.$store.dispatch('exportBusinessStatisticDetail', { ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver, OverStartDate: overStartDate, OverEndDate: overEndDate, iPage: this.pageIndex, iPageSize: this.pageSize }).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview1 = false
        }).catch(() => {
          this.loadingview1 = false
        })
      }).catch(() => {

      })
    },
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberShopList.length; i++) {
        if (this.MemberShopList[i].ID === value) {
          return this.MemberShopList[i].Title
        }
      }
      return 0
    },
    testbut () {
      console.log(JSON.stringify(this.ListInfo))
    },
    changePageHandle1 () {
      this.queryDataHandle(this.ShopId, this.queryStartDate, this.queryEndDate, this.isOver, this.overEndDate, this.overStartDate)
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .title-class {
    text-align: center;
  }
  .body-class {
    margin-top: 15px;
    text-align: center;
  }
  .secondbusiness-wrap {
    .category {
      background: #ff0;
    }
    .detail {
      padding: 5px;
      background: #0ff;
    }
  }
  .el-input-number--mini {
    width: 90px;
  }
  @media (max-width:500px) {
    .el-date-editor{
      width: 285px;
    }
  }
</style>
