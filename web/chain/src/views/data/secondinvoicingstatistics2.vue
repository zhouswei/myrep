<template>
  <div>
    <div class="shopSumaryInfo">
      <div class="shopBase"><p>{{title}}</p><p>{{time}}</p></div>
      <div class="shopBaseSon" style="background-color:#fab152;"><p>扣费总金额(元)</p><p>{{totalPrice}}</p></div>
      <div class="shopBaseSon" style="background-color:#8fc31f;"><p>实扣总金额(元)</p><p>{{realPrice}}</p></div>
    </div>
    <div style="clear:both; padding:30px">
      <el-button class="data-but" type="primary" @click="clickExport()">导出</el-button>
    </div>
    <div>
    <el-table border :data="tableData">
      <el-table-column
        fixed
        label="会员卡号"
        prop="pro1">
      </el-table-column>
      <el-table-column
        label="会员姓名"
        prop="pro2">
      </el-table-column>
       <el-table-column
        label="类型"
        prop="pro9">
      </el-table-column>
      <el-table-column
        label="消费门店"
        prop="pro3">
      </el-table-column>
      <el-table-column
        label="扣款总金额(元)"
        prop="pro4">
      </el-table-column>
      <el-table-column
        label="实扣总金额(元)"
        prop="pro5">
      </el-table-column>
      <el-table-column
        label="营业日期"
        prop="pro6">
      </el-table-column>
      <el-table-column
        label="消费时间"
        prop="pro7">
      </el-table-column>
      <el-table-column
        label="操作员"
        prop="pro8">
      </el-table-column>
    </el-table>
    </div>
    <el-pagination
      ref="bottomPagination"
      class="el_pagination_class"
      background
      layout="prev, pager, next"
      @current-change="changePageHandle"
      :current-page.sync="pageIndex"
      :page-size="20"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>
<script>
import { parseTime, formatTimestamp } from '@/utils'
export default {
  props: {
    data3: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.updateData(this.pageIndex)
  },
  data () {
    return {
      tableData: [],
      title: '',
      time: '',
      totalPrice: '',
      realPrice: '',
      fresPrice: '',
      filename: '扣费明细',
      pageIndex: 1,
      pageTotal: 1
    }
  },
  methods: {
    //  { ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver }
    updateData (pageIndex) {
      this.title = this.data3.ShopTitle
      this.time = parseTime(this.data3.BeginDate, '{y}-{m}-{d}') + '~' + parseTime(this.data3.EndDate, '{y}-{m}-{d}')
      this.totalPrice = this.data3.TotalPrice
      this.realPrice = this.data3.RealPrice
      this.$store.dispatch('queryPayMoneyDetailData', {
        BeginDate: this.data3.BeginDate,
        EndDate: this.data3.EndDate,
        ShopID: this.data3.ShopID,
        ShopTitle: this.data3.ShopTitle,
        QueryShopID: this.data3.ShopID,
        PageIndex: pageIndex,
        PageSize: 20
      }).then((response) => {
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.tableData = []
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.pro1 = element.CardNo
          ItemObj.pro2 = element.UserName
          ItemObj.pro3 = element.ShopTitle
          ItemObj.pro4 = element.PayPrice
          ItemObj.pro5 = element.RealPayPrice
          ItemObj.pro6 = parseTime(formatTimestamp(element.AddDate), '{y}-{m}-{d}')
          ItemObj.pro7 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro8 = element.AdminInfo
          ItemObj.pro9 = element.PayType
          this.tableData.push(ItemObj)
        })
        console.log(this.tableData)
      }).catch(() => {

      })
    },
    clickExport () {
      this.$store.dispatch('queryPayMoneyDetailData', {
        BeginDate: this.data3.BeginDate,
        EndDate: this.data3.EndDate,
        ShopID: this.data3.ShopID,
        ShopTitle: this.data3.ShopTitle,
        QueryShopID: this.data3.ShopID,
        PageIndex: 1,
        PageSize: 200000
      }).then((response) => {
        this.tableData = []
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.pro1 = element.CardNo
          ItemObj.pro2 = element.UserName
          ItemObj.pro3 = element.ShopTitle
          ItemObj.pro4 = element.PayPrice
          ItemObj.pro5 = element.RealPayPrice
          ItemObj.pro6 = parseTime(formatTimestamp(element.AddDate), '{y}-{m}-{d}')
          ItemObj.pro7 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro8 = element.AdminInfo
          ItemObj.pro9 = element.PayType
          this.tableData.push(ItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['会员卡号', '会员姓名', '类型', '消费门店', '扣款总金额(元)', '实扣总金额(元)', '营业日期', '消费时间', '操作员']
          const filterVal = ['pro1', 'pro2', 'pro9', 'pro3', 'pro4', 'pro5', 'pro6', 'pro7', 'pro8']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data: data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })
          this.downloadLoading = false
        }).catch(() => {
          this.downloadLoading = false
        })
      }).catch(() => {
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    changePageHandle () {
      this.updateData(this.pageIndex)
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  #shopSumaryInfo {
    width: 1018px;
    height: 83px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
}
.shopBase {
    padding-left: 16px;
    float: left;
    width: 340px;
    background-color: #37bfc8;
    color: #fff;
    font-size: 18px;
    margin-right: 1px;
    padding-top: 6px;
    padding-bottom: 8px;
}
.shopBaseSon {
    float: left;
    width: 219px;
    background-color: #37bfc8;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-right: 1px;
    padding-top: 6px;
    padding-bottom: 8px;
}
.shopBaseSon {
    float: left;
    width: 219px;
    background-color: #37bfc8;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-right: 1px;
    padding-top: 6px;
    padding-bottom: 8px;
}
.shopBaseSon {
    float: left;
    width: 219px;
    background-color: #37bfc8;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-right: 1px;
    padding-top: 6px;
    padding-bottom: 8px;
}
.el_pagination_class{
  text-align: center;
  margin-top: 20px;
}
</style>
