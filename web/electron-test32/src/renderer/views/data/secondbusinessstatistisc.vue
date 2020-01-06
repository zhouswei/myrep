// 消费入单组件
<template>
  <div class="secondbusiness-wrap">
    <div class="member-date">
      营业日期:
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
      <el-checkbox v-model="IsOver">未结账</el-checkbox>
      <el-button class="data-but" type="primary" @click="queryDataHandle(ShopId, queryStartDate, queryEndDate, IsOver ? -1: 1)" :loading="loadingview=false">统计</el-button>
      <el-button v-if="isPermission(76)" class="data-but" type="primary" @click="downloadDataHandle(ShopId, queryStartDate, queryEndDate, IsOver ? -1: 1)" :loading="loadingview1=false">导出</el-button>
    </div>
    <el-table
      height="90%"
      border
      :data="totallist">
      <el-table-column
        fixed
        label="门店"
        prop="tableShop">
      </el-table-column>
      <el-table-column
        label="账单号"
        prop="tableOrderNo">
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
    </el-table>
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
      IsOver: false,
      loadingview1: false,
      loadingview: false,
      totallist: []
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
    updateData () {
      this.queryDataHandle(this.ShopId, this.queryStartDate, this.queryEndDate, 1)
    },
    queryDataHandle (shopId, startTime, endTime, isOver) {
      this.loadingview = true
      this.$store.dispatch('queryBusinessStatisticDetail', { ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver }).then((response) => {
        this.totallist = []
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
          this.totallist.push(ItemObj)
        })
      }).catch(() => {

      })
    },
    downloadDataHandle (shopId, startTime, endTime, isOver) {
      this.loadingview = true
      this.$store.dispatch('exportBusinessStatisticDetail', { ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver }).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview = false
        }).catch(() => {
          this.loadingview = false
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
    height: 600px;
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
</style>
