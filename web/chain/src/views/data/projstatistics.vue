<template>
  <div>
    <div v-if="isPermission(41)">
      <div class="inline_block">
        营业日期:
        <el-date-picker
          v-model="queryStartDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span class="data_line">~</span>
      <div class="inline_block">
        <el-date-picker
          v-model="queryEndDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="inline_block">
        门店:
        <el-select v-model="shopId" placeholder="-请选择-">
          <el-option
            v-for="item in MemberChargeShopList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
      </div>
      <div class="inline_block">
        <el-button class="data-but" type="primary" @click="queryDataHandle(1)" :loading="loadingview">统计</el-button>
        <el-button v-if="isPermission(42)" class="data-but" type="primary" @click="handleDownload()" :loading="downloadLoading">导出</el-button>
      </div>
      <div>
        <el-table
          class="el-table-class"
          :data="tableData"
          border
          style="width: 100%"
          >
          <el-table-column
            fixed
            prop="shop_name"
            label="门店"
            width="200">
          </el-table-column>
          <el-table-column
            prop="proj_no"
            label="项目编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="proj_classify"
            label="项目分类"
            width="150">
          </el-table-column>
          <el-table-column
            prop="proj_name"
            label="项目名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bill_num"
            label="订单数量"
            width="150">
          </el-table-column>
          <el-table-column
            prop="amount_receivable"
            label="应收金额(元)"
            width="250">
          </el-table-column>
          <el-table-column
            prop="receiver_money"
            label="实收金额(元)"
            width="250">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          class="el_pagination_class"
          background
          layout="prev, pager, next"
          @current-change="changePageHandle"
          :current-page.sync="pageIndex"
          :page-size="20"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
  </div>
</template>
<script>
import {parseTime, formatPath} from '@/utils'
export default {
  data () {
    return {
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      shopId: '',
      pageIndex: 1,
      pageTotal: 1,
      downloadLoading: false,
      loadingview: false,
      id: '',
      label: '',
      tableData: []
    }
  },
  mounted () {
    this.queryDataHandle(this.pageIndex)
  },
  computed: {
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
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
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    queryDataHandle (pageIndex) {
      this.loadingview = true
      this.$store.dispatch('queryProjStatisiticData', {ShopID: this.shopId, BeginDate: this.queryStartDate, EndDate: this.queryEndDate, PageIndex: pageIndex}).then((response) => {
        this.loadingview = false
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.shop_name = element.ShopTitle
          ListItemObj.proj_no = element.ServiceCode
          ListItemObj.proj_classify = element.ServiceTypeTitle
          ListItemObj.proj_name = element.ServiceTitle
          ListItemObj.bill_num = element.Num
          ListItemObj.amount_receivable = element.SalePrice
          ListItemObj.receiver_money = element.RealPrice
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    handleDownload () {
      this.downloadLoading = true
      this.$store.dispatch('queryProjStatisiticData', {ShopID: this.shopId, BeginDate: this.queryStartDate, EndDate: this.queryEndDate, PageIndex: 1}).then((response) => {
        this.downloadLoading = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.shop_name = element.ShopTitle
          ListItemObj.proj_no = element.ServiceCode
          ListItemObj.proj_classify = element.ServiceTypeTitle
          ListItemObj.proj_name = element.ServiceTitle
          ListItemObj.bill_num = element.Num
          ListItemObj.amount_receivable = element.SalePrice
          ListItemObj.receiver_money = element.RealPrice
          this.tableData.push(ListItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['门店', '项目编号', '项目分类', '项目名称', '订单数量', '应收金额(元)', '实收金额(元)']
          const filterVal = ['shop_name', 'proj_no', 'proj_classify', 'proj_name', 'bill_num', 'amount_receivable', 'receiver_money']
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
        this.downloadLoading = false
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.member-date{
  margin-top: 20px;
  margin-bottom: 20px;
}
.inline_block{
  margin-top: 10px;
}
.el_pagination_class{
  text-align: center;
  margin-top: 20px;
}
</style>
