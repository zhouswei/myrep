// 消费入单组件
<template>
  <div>
    <div class="shopSumaryInfo">
      <div class="shopBase"><p>{{title}}</p><p>{{time}}</p></div>
      <div class="shopBaseSon" style="background-color:#fab152;"><p>储值总金额(元)</p><p>{{totalPrice}}</p></div>
      <div class="shopBaseSon" style="background-color:#8fc31f;"><p>实收总金额(元)</p><p>{{realPrice}}</p></div>
      <div class="shopBaseSon" style="background-color:#fa6c5f;"><p>赠送总金额(元)</p><p>{{fresPrice}}</p></div>
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
        label="充值门店"
        prop="pro3">
      </el-table-column>
      <el-table-column
        label="储值总金额（元）"
        prop="pro4">
      </el-table-column>
      <el-table-column
        label="实收总金额（元）"
        prop="pro5">
      </el-table-column>
      <el-table-column
        label="赠送总金额（元）"
        prop="pro6">
      </el-table-column>
      <el-table-column
        label="营业日期"
        prop="pro7">
      </el-table-column>
      <el-table-column
        label="操作时间"
        prop="pro8">
      </el-table-column>
      <el-table-column
        label="操作员"
        prop="pro9">
      </el-table-column>
      <el-table-column
        label="销售员"
        prop="pro10">
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
    data2: {
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
      filename: '储值明细',
      pageIndex: 1,
      pageTotal: 1
    }
  },
  methods: {
    updateData (pageIndex) {
      this.title = this.data2.ShopTitle
      this.time = parseTime(this.data2.BeginDate, '{y}-{m}-{d}') + '~' + parseTime(this.data2.EndDate, '{y}-{m}-{d}')
      this.totalPrice = this.data2.TotalPrice
      this.realPrice = this.data2.RealPrice
      this.fresPrice = this.data2.FreePrice
      this.$store.dispatch('queryStoreTableDetailData', {
        BeginDate: this.data2.BeginDate,
        EndDate: this.data2.EndDate,
        ShopID: this.data2.ShopID,
        ShopTitle: this.data2.ShopTitle,
        QueryShopID: this.data2.ShopID,
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
          ItemObj.pro4 = element.SavePrice
          ItemObj.pro5 = element.SalePrice
          ItemObj.pro6 = element.FreePrice
          ItemObj.pro7 = parseTime(formatTimestamp(element.AddDate), '{y}-{m}-{d}')
          ItemObj.pro8 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro9 = element.AdminInfo
          ItemObj.pro10 = element.SaleInfo
          this.tableData.push(ItemObj)
        })
      }).catch(() => {

      })
    },
    clickExport () {
      this.$store.dispatch('queryStoreTableDetailData', {
        BeginDate: this.data2.BeginDate,
        EndDate: this.data2.EndDate,
        ShopID: this.data2.ShopID,
        ShopTitle: this.data2.ShopTitle,
        QueryShopID: this.data2.ShopID,
        PageIndex: 1,
        pageSize: 10000
      }).then((response) => {
        var tableData1 = []
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.pro1 = element.CardNo
          ItemObj.pro2 = element.UserName
          ItemObj.pro3 = element.ShopTitle
          ItemObj.pro4 = element.SavePrice
          ItemObj.pro5 = element.SalePrice
          ItemObj.pro6 = element.FreePrice
          ItemObj.pro7 = parseTime(formatTimestamp(element.AddDate), '{y}-{m}-{d}')
          ItemObj.pro8 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro9 = element.AdminInfo
          ItemObj.pro10 = element.SaleInfo
          tableData1.push(ItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['会员卡号', '会员姓名', '充值门店', '储值总金额（元）', '实收总金额（元）', '赠送总金额（元）', '营业日期', '操作时间', '操作员', '销售员']
          const filterVal = ['pro1', 'pro2', 'pro3', 'pro4', 'pro5', 'pro6', 'pro7', 'pro8', 'pro9', 'pro10']
          const list = tableData1
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
