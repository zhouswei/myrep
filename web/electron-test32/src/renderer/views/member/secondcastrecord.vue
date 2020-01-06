// 消费入单组件
<template>
  <div>
    <div>
      <el-table
        :data="tableData1"
        stripe
        border>
        <el-table-column
          prop="tableData1Pro1"
          fixed
          label="账单号">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro2"
          fixed
          label="营业日期">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro3"
          fixed
          label="账单总额(元)">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro4"
          fixed
          label="折扣金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro5"
          fixed
          label="付款金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro6"
          fixed
          label="结账">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro7"
          fixed
          label="工号">
        </el-table-column>
        <el-table-column
          prop="tableData1Pro8"
          fixed
          label="结账时间">
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px;">
      账单付款记录
      <el-table
        :data="tableData2"
        stripe
        border>
        <el-table-column
          prop="tableData2Pro1"
          fixed
          label="流水号">
        </el-table-column>
        <el-table-column
          prop="tableData2Pro2"
          fixed
          label="付款方式">
        </el-table-column>
        <el-table-column
          prop="tableData2Pro3"
          fixed
          label="付款金额">
        </el-table-column>
        <el-table-column
          prop="tableData2Pro4"
          fixed
          label="折合人币民">
        </el-table-column>
        <el-table-column
          prop="tableData2Pro5"
          fixed
          label="付款时间">
        </el-table-column>
        <el-table-column
          prop="tableData2Pro6"
          fixed
          label="操作者">
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px;">
      账单消费记录
      <el-table
        :data="tableData3"
        stripe
        border>
        <el-table-column
          prop="tableData3Pro1"
          fixed
          label="锁牌号">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro2"
          fixed
          label="位置">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro3"
          fixed
          label="项目">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro4"
          fixed
          label="编号">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro5"
          fixed
          label="数量">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro6"
          fixed
          label="项目价">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro7"
          fixed
          label="技师工号">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro8"
          fixed
          label="录入员">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro9"
          fixed
          label="录入时间">
        </el-table-column>
        <el-table-column
          prop="tableData3Pro10"
          fixed
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTimestamp } from '@/utils'
export default {
  props: {
    sendData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: []
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('GetMemberCastListDetail', this.sendData).then((response) => {
        this.tableData1 = []
        var obj = {}
        obj.tableData1Pro1 = response.OrderInfoList.OrderCode
        obj.tableData1Pro2 = parseTime(formatTimestamp(response.OrderInfoList.AddDate), '{y}-{m}-{d}')
        obj.tableData1Pro3 = response.OrderInfoList.SalePrice === 0 ? '' : '￥' + response.OrderInfoList.SalePrice
        obj.tableData1Pro4 = (response.OrderInfoList.SalePrice - response.OrderInfoList.PayPrice) === 0 ? '' : '￥' + (response.OrderInfoList.SalePrice - response.OrderInfoList.PayPrice)
        obj.tableData1Pro5 = response.OrderInfoList.PayPrice === 0 ? '' : '￥' + response.OrderInfoList.PayPrice
        obj.tableData1Pro6 = response.OrderInfoList.IsRePayIng ? '反结账中' : response.OrderInfoList.IsOver ? '已结账' : '未结账'
        obj.tableData1Pro7 = response.AdminNanmeInfo + '(' + response.OrderInfoList.OverAdminCode + ')'
        obj.tableData1Pro8 = response.OrderInfoList.IsOver ? parseTime(formatTimestamp(response.OrderInfoList.OverTime), '{y}-{m}-{d} {h}:{i}:{s}') : ''
        this.tableData1.push(obj)
        this.tableData2 = []
        response.listPayDetailInfo.forEach(element => {
          var obj = {}
          obj.tableData2Pro1 = element.PayNumber
          obj.tableData2Pro2 = element.PayTypeTitle
          obj.tableData2Pro3 = '￥' + element.PayPrice
          obj.tableData2Pro4 = '￥' + element.RealPrice
          obj.tableData2Pro5 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          obj.tableData2Pro6 = element.AdminCode + '(' + element.AdminName + ')'
          this.tableData2.push(obj)
        })
        this.tableData3 = []
        response.ServiceListInfo.forEach(element => {
          var obj = {}
          obj.tableData3Pro1 = element.LCardCode
          obj.tableData3Pro2 = (element.SeatCode !== null && element.SeatCode !== undefined && element.SeatCode !== '') ? element.RoomCode : element.SeatCode
          obj.tableData3Pro3 = element.ServiceTitle
          obj.tableData3Pro4 = element.ServiceCode
          obj.tableData3Pro5 = element.BuyNum
          obj.tableData3Pro6 = '￥' + element.SalePrice
          obj.tableData3Pro7 = element.TechCode
          obj.tableData3Pro8 = element.AdminCode
          obj.tableData3Pro9 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d}')
          obj.tableData3Pro10 = element.Remark
          this.tableData3.push(obj)
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .castorder-wrap {
    height: 500px;
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
