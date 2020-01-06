<template>
  <div>
    门店:
    <el-select v-model="shopId" placeholder="-请选择-">
      <el-option
        v-for="item in MemberShopList"
        :key="item.ID"
        :label="item.Title"
        :value="item.ID">
      </el-option>
    </el-select>
    结算类型:
    <el-select v-model="invoicingId" placeholder="-请选择-">
      <el-option
        v-for="item in invoicingType"
        :key="item.ID"
        :label="item.Title"
        :value="item.ID">
      </el-option>
    </el-select>
    <el-button class="data-but" type="primary" @click="updateWaiData()" :loading="loadingview7 = false">查询</el-button>
    <el-button v-if="isPermission(94)" class="data-but" type="primary" @click="downloadData()" :loading="loadingview8 = false">导出</el-button>
    <div>
      时间:{{datetime}}
      <br/>
      {{showInfo}}
    </div>
    <div>
    <el-table border :data="tableData">
      <el-table-column
        fixed
        label="账单号"
        prop="pro1">
      </el-table-column>
      <el-table-column
        label="会员卡号"
        prop="pro2">
      </el-table-column>
      <el-table-column
        label="发卡门店"
        prop="pro3">
      </el-table-column>
      <el-table-column
        label="消费门店"
        prop="pro4">
      </el-table-column>
      <el-table-column
        label="结算门店"
        prop="pro5">
      </el-table-column>
      <el-table-column
        label="账面扣费(元)"
        prop="pro6">
      </el-table-column>
      <el-table-column
        label="实扣本金(元)"
        prop="pro7">
      </el-table-column>
      <el-table-column
        label="扣除赠送(元)"
        prop="pro8">
      </el-table-column>
      <el-table-column
        label="付款时间"
        prop="pro9">
      </el-table-column>
      <el-table-column
        label="备注信息"
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
import { parseTime, formatTimestamp, formatPath } from '@/utils'
export default {
  props: {
    shopId: {
      type: Number,
      default: 0
    },
    invoicingId: {
      type: Number,
      default: 0
    },
    datetime: {
      type: String,
      default: ''
    }
  },
  created () {
    // this.updateData(this.pageIndex)
  },
  computed: {
    MemberShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  data () {
    return {
      tableData: [],
      invoicingType: [
        {
          ID: 1,
          Title: '他店结算给本店'
        },
        {
          ID: 2,
          Title: '本店结算给他店'
        }
      ],
      title: '',
      time: '',
      totalPrice: '',
      realPrice: '',
      fresPrice: '',
      filename: '扣费明细',
      showInfo: '',
      pageIndex: 1,
      pageTotal: 20,
      loadingview7: false,
      loadingview8: false
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
    //  { ShopID: shopId, BeginDate: startTime, EndDate: endTime, IsOver: isOver }
    updateWaiData () {
      this.updateData(this.pageIndex)
    },
    downloadData () {
      this.loadingview8 = true
      this.$store.dispatch('queryInvoicingStoreDetailInfo', {
        ShopID: this.shopId,
        AddTime: this.datetime,
        SearchTypeID: this.invoicingId,
        PageSize: 100000,
        PageIndex: 1
      }).then((response) => {
        var exporttableData = []
        // this.showInfo = response.ShowInfo
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.pro1 = element.OrderCode
          ItemObj.pro2 = element.CardNo
          ItemObj.pro3 = element.RealShopTitle
          ItemObj.pro4 = element.PayShopTitle
          ItemObj.pro5 = element.IsOver ? element.FillShopTitle : (element.ReqSource === 10 ? element.FillShopTitle : '')
          ItemObj.pro6 = element.TotalCost
          ItemObj.pro7 = element.RealCost
          ItemObj.pro8 = element.FreeMoney
          ItemObj.pro9 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro10 = element.Note
          exporttableData.push(ItemObj)
        })
        const tHeader = ['账单号', '会员卡号', '发卡门店', '消费门店', '结算门店', '账面扣费(元)', '实扣本金(元)', '扣除赠送(元)', '付款时间', '备注信息']
        import('@/vendor/Export2Excel').then(excel => {
          const filterVal = ['pro1', 'pro2', 'pro3', 'pro4', 'pro5', 'pro6', 'pro7', 'pro8', 'pro9', 'pro10']
          const list = this.exporttableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data: data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })
          this.loadingview8 = false
        }).catch(() => {
          this.loadingview8 = false
        })
      }).catch(() => {
        this.loadingview8 = false
      })
    },
    updateData (pageIndex) {
      this.loadingview7 = true
      this.$store.dispatch('queryInvoicingStoreDetailInfo', {
        ShopID: this.shopId,
        AddTime: this.datetime,
        SearchTypeID: this.invoicingId,
        PageSize: 20,
        PageIndex: pageIndex
      }).then((response) => {
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.tableData = []
        this.showInfo = response.ShowInfo
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.pro1 = element.OrderCode
          ItemObj.pro2 = element.CardNo
          ItemObj.pro3 = element.RealShopTitle
          ItemObj.pro4 = element.PayShopTitle
          ItemObj.pro5 = element.IsOver ? element.FillShopTitle : (element.ReqSource === 10 ? element.FillShopTitle : '')
          ItemObj.pro6 = element.TotalCost
          ItemObj.pro7 = element.RealCost
          ItemObj.pro8 = element.FreeMoney
          ItemObj.pro9 = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ItemObj.pro10 = element.Note
          this.tableData.push(ItemObj)
        })
        this.loadingview7 = false
      }).catch(() => {
        this.loadingview7 = false
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
