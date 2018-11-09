<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="营收统计" name="first">
        <div v-if="isPermission(22)">
          <div>
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
              <el-select v-model="memberShopId" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
              <el-button class="data-but" type="primary" @click="queryDataHandle(memberShopId, queryStartDate, queryEndDate)" :loading="loadingview=false">统计</el-button>
              <el-button v-if="isPermission(23)" class="data-but" type="primary" @click="downloadHandle" :loading="loadingview1=false">导出</el-button>
            </div>
          </div>
          <div class='chart-container'>
            <chart ref="datebar" height='400px' chartLabel1='营业实收金额' chartLabel2='充值实收金额' :chartName="chartname" width='100%' :OrginData="chartData"></chart>
          </div>
          <el-table show-summary border :data="totallist" :header-cell-style="headercellyangshi">
            <el-table-column
              fixed
              label="门店"
              prop="tableShop">
              <template slot-scope="scope">
                <el-button v-if="isPermission(74)" @click="handleItemClick(scope.row)" type="text" size="small">{{scope.row.tableShop}}</el-button>
                <span v-else>{{scope.row.tableShop}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="门店应收统计(元)"
              label-class-name="门店应收总计 =营业应收金额 + 充值应收金额"
              :formatter="formatfloat2StringKeep2"
              prop="tableShopStatstatis"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              label="门店实收统计(元)"
              label-class-name="门店实收总计 =营业实收金额 + 充值实收金额"
              :formatter="formatfloat2StringKeep2"
              prop="tableShopRealStatstatis"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              label="营业应收金额(元)"
              label-class-name="营业应收金额 = 账单应收总金额 + 收回挂账应收总金额"
              :formatter="formatfloat2StringKeep2"
              prop="tableBusinessMoney"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              label="折扣金额(元)"
              label-class-name="折扣金额 = 账单折扣金额 + 收回挂账折扣金额"
              :formatter="formatfloat2StringKeep2"
              prop="tablePayOffMoney"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              label="营业实收金额(元)"
              label-class-name="营业实收金额 = 营业应收金额 - 折扣金额"
              :formatter="formatfloat2StringKeep2"
              prop="tableBusinessRealMoney"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              label="账单数"
              prop="tableOrderCounter"
              :render-header="renderspec2">
            </el-table-column>
            <el-table-column
              label="消费人数"
              prop="tableCastCounter"
              :render-header="renderspec2">
            </el-table-column>
            <el-table-column
              label="人均消费(元)"
              :formatter="formatfloat2StringKeep2"
              prop="tableAvargeCast"
              :render-header="renderspec2">
            </el-table-column>
            <el-table-column
              label="充值应收金额(元)"
              :formatter="formatfloat2StringKeep2"
              label-class-name="充值应收金额 = 会员开卡应收金额 + 会员充值应收金额"
              prop="tableChargeShouldMoney"
              :render-header="renderspec1">
            </el-table-column>
            <el-table-column
              fit
              :formatter="formatfloat2StringKeep2"
              label="充值实收金额(元)"
              label-class-name="充值实收金额 = 会员开卡实收金额 + 会员充值实收金额"
              prop="tableChargeRealMoney"
              :render-header="renderspec1">
            </el-table-column>
          </el-table>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="消费入单"
            ref="dialog_wrapper"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            :width="dialogWidth"
            :close-on-click-modal="false">
              <div slot="title">
                <p>营收明细</p>
              </div>
              <div class="dialog-body">
                <secondbusinessstatistisc ref="secondbusinessstatistiscRef" :ShopId="SpecShopId"></secondbusinessstatistisc>
                <div
                  class="line"
                  v-dialogDragWidth="$refs.dialog_wrapper">
                </div>
              </div>
          </el-dialog>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收款统计" name="second">
        <div v-if="isPermission(24)">
          <div>
            <div class="member-date">
              营业日期:
              <el-date-picker
                v-model="queryStartDate2"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              ~
              <el-date-picker
                v-model="queryEndDate2"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              门店:
              <el-select v-model="memberShopId2" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
              <el-button class="data-but" type="primary" @click="queryDataHandler2(memberShopId2, queryStartDate2, queryEndDate2)" :loading="loadingview3">统计</el-button>
              <el-button v-if="isPermission(25)" class="data-but" type="primary" @click="handleDown2()" :loading="loadingview4">导出</el-button>
            </div>
          </div>
          <el-table show-summary border :data="totallist2">
            <el-table-column
              fixed
              label="结算方式"
              prop="tableInvoicingType">
            </el-table-column>
            <el-table-column
              label="原收款金额(元)"
              :formatter="formatfloat2StringKeep2"
              prop="tableTotalMoney">
            </el-table-column>
            <el-table-column
              label="转RMB金额(元)"
              :formatter="formatfloat2StringKeep2"
              prop="tableTranslateRMBMoney">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="营业日统计" name="third">
        <div>
          <div class="member-date">
            营业日期:
            <el-date-picker
              v-model="queryStartDate3"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            ~
            <el-date-picker
              v-model="queryEndDate3"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            门店:
            <el-select v-model="memberShopId3" placeholder="-请选择-">
              <el-option
                v-for="item in MemberShopList"
                :key="item.ID"
                :label="item.Title"
                :value="item.ID">
              </el-option>
            </el-select>
            <el-button class="data-but" type="primary" @click="queryDataHandler3(memberShopId3, queryStartDate3, queryEndDate3)" :loading="loadingview5 = false">统计</el-button>
            <el-button class="data-but" type="primary" @click="handleDown3" :loading="loadingview6 = false">导出</el-button>
          </div>
        </div>
        <el-table height="250" border :data="totallist" :header-cell-style="headercellyangshi3">
          <el-table-column
            fixed
            label="日期"
            prop="tableDate"
            :render-header="renderspec2">
          </el-table-column>
          <el-table-column
            label="消费人数"
            prop="tableCastPersion">
          </el-table-column>
          <el-table-column
            label="总计金额"
            :formatter="formatfloat2StringKeep2"
            prop="tableTotalMoney">
          </el-table-column>
          <el-table-column
            label="实收金额"
            :formatter="formatfloat2StringKeep2"
            prop="tableRealMoney">
          </el-table-column>
          <el-table-column
            label="优惠金额"
            :formatter="formatfloat2StringKeep2"
            prop="tablePayoffMoney">
          </el-table-column>
          <el-table-column
            label="项目收入金额(元)">
            <el-table-column
              label="会员卡支付"
              :formatter="formatfloat2StringKeep2"
              prop="tableMemberMoney">
            </el-table-column>
            <el-table-column
              label="微信"
              :formatter="formatfloat2StringKeep2"
              prop="tableWechatMoney">
            </el-table-column>
            <el-table-column
              label="现金（人民币）"
              :formatter="formatfloat2StringKeep2"
              prop="tableRMBMoney">
            </el-table-column>
            <el-table-column
              label="银联卡"
              :formatter="formatfloat2StringKeep2"
              prop="tableUnitBank">
            </el-table-column>
            <el-table-column
              label="折扣金额"
              :formatter="formatfloat2StringKeep2"
              prop="tablePayoff">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="收回挂账金额">
            <el-table-column
              label="无挂账收回"
              :formatter="formatfloat2StringKeep2"
              prop="tableNoGuaPayback">
            </el-table-column>
            <el-table-column
              label="折扣金额"
              :formatter="formatfloat2StringKeep2"
              prop="tableGuaPayoff">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="会员卡收入">
            <el-table-column
              label="无对应充值方式"
              :formatter="formatfloat2StringKeep2"
              prop="tableNoChargeType">
            </el-table-column>
            <el-table-column
              label="充值实收"
              :formatter="formatfloat2StringKeep2"
              prop="tableChargeReal">
            </el-table-column>
            <el-table-column
              label="充值赠送"
              :formatter="formatfloat2StringKeep2"
              prop="tableChargeZen">
            </el-table-column>
            <el-table-column
              label="充值合计"
              :formatter="formatfloat2StringKeep2"
              prop="tableChargeTotal">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import Chart from '@/components/Charts/databar'
import { parseTime, formatPath } from '@/utils'
import secondbusinessstatistisc from '@/views/data/secondbusinessstatistisc'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
export default {
  name: 'businessstatistics',
  mixins: [ResizeMixin],
  components: { Chart, secondbusinessstatistisc },
  mounted () {
    this.queryStartDate = new Date()
    this.queryStartDate.setDate(this.queryStartDate.getDate() - 1)
    this.queryEndDate = new Date()
    this.queryEndDate.setDate(this.queryEndDate.getDate() - 1)
    this.queryStartDate2 = new Date()
    this.queryStartDate2.setDate(this.queryStartDate2.getDate() - 1)
    this.queryEndDate2 = new Date()
    this.queryEndDate2.setDate(this.queryEndDate2.getDate() - 1)
    this.GetChartData()
    this.isCanExport = !this.isMobile()
  },
  activated () {
    // console.log('businessstatistics-activated-----------------')
    // this.GetChartData()
  },
  computed: {
    MemberShopList () {
      return this.$store.getters.memberbase.membershopOriginList
    }
  },
  data () {
    return {
      chartname: '营业统计-按店统计',
      testdaa: '111',
      dialogVisible: false,
      activeName: 'first',
      queryStartDate: '',
      queryEndDate: '',
      queryStartDate2: '',
      queryEndDate2: '',
      memberShopId: '',
      memberShopId2: '',
      dialogWidth: '80%',
      SpecShopId: 0,
      totallist: [],
      totallist2: [],
      chartData: [],
      loadingview: false,
      loadingview1: false,
      loadingview3: false,
      loadingview4: false,
      isCanExport: true
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
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberShopList.length; i++) {
        if (this.MemberShopList[i].Title === value) {
          return this.MemberShopList[i].ID
        }
      }
      return 0
    },
    handleItemClick (val) {
      this.SpecShopId = this.returnOpencardTitle(val.tableShop)
      var that = this
      this.$nextTick(() => {
        this.dialogVisible = true
        that.$refs.secondbusinessstatistiscRef.updateData()
      })
    },
    GetChartData () {
      this.queryDataHandle(0, '', '')
    },
    queryDataHandle (shopid, beginDate, endDate) {
      this.loadingview1 = true
      this.$store.dispatch('queryBusinessStatisticData', { ShopID: shopid, BeginDate: beginDate, EndDate: endDate }).then((response) => {
        this.loadingview1 = false
        this.chartData = []
        var tmpList = []
        this.totallist = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.shopName = element.ShopTitle
          tmpObj.data = []
          tmpObj.data.push({title: '营业实收金额', value: element.TotalRealPrice})
          tmpObj.data.push({title: '充值实收金额', value: element.CardRealPrice})
          tmpList.push(tmpObj)
          var ListItemObj = {}
          ListItemObj.tableShop = element.ShopTitle
          ListItemObj.tableShopStatstatis = element.TotalSalePrice
          ListItemObj.tableShopRealStatstatis = element.TotalRealPrice
          ListItemObj.tableBusinessMoney = element.SalePrice
          ListItemObj.tablePayOffMoney = element.AgioPrice
          ListItemObj.tableBusinessRealMoney = element.RealPrice
          ListItemObj.tableOrderCounter = element.OrderCount
          ListItemObj.tableCastCounter = element.OrderLCardCount
          ListItemObj.tableAvargeCast = element.AvgePrice
          ListItemObj.tableChargeShouldMoney = element.CardSalePrice
          ListItemObj.tableChargeRealMoney = element.CardRealPrice
          this.totallist.push(ListItemObj)
        })
        this.chartData = tmpList
        this.$nextTick(() => {
          this.$refs.datebar.updateChart()
        })
      }).catch(() => {
        this.loadingview1 = false
      })
    },
    queryDetailData (shopid, beginDate, endDate, IsOver) {
      this.$store.dispatch('queryBusinessStatisticDetail', { ShopID: shopid, BeginDate: beginDate, EndDate: endDate, IsOver: IsOver }).then((response) => {
        this.loadingview1 = false
      }).catch(() => {
        this.loadingview1 = false
      })
    },
    downloadHandle () {
      this.loadingview = true
      this.$store.dispatch('exportBusinessStatisticData', { ShopID: this.memberShopId, BeginDate: this.queryStartDate, EndDate: this.queryEndDate }).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview = false
        }).catch(() => {
          this.loadingview = false
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    queryDataHandler2 (shopid, beginDate, endDate) {
      this.loadingview3 = true
      this.$store.dispatch('queryGatherData', { ShopID: shopid, BeginDate: beginDate, EndDate: endDate }).then((response) => {
        this.loadingview3 = false
        this.totallist2 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableInvoicingType = element.PayTypeTitle
          ListItemObj.tableTotalMoney = element.PayPrice
          ListItemObj.tableTranslateRMBMoney = element.RmbPayPrice
          this.totallist2.push(ListItemObj)
        })
        // this.$nextTick(() => {
        //   this.$refs.datebar.updateChart()
        // })
      }).catch(() => {
        this.loadingview3 = false
      })
    },
    handleDown2 () {
      this.loadingview4 = true
      this.$store.dispatch('exportGatherData', { ShopID: this.memberShopId2, BeginDate: this.queryStartDate2, EndDate: this.queryEndDate2 }).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview4 = false
        }).catch(() => {
          this.loadingview4 = false
        })
      }).catch(() => {
        this.loadingview4 = false
      })
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
    },
    headercellyangshi ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 9 || columnIndex === 10) {
        return 'background: #FFF6EB'
      } else if (columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
        return 'background: #EBFEFF'
      } else if (columnIndex === 6 || columnIndex === 7 || columnIndex === 8) {
        return 'background: #FFECEB'
      }
    },
    headercellyangshi3 ({row, column, rowIndex, columnIndex}) {
      if ((columnIndex === 5 && rowIndex === 0) || ((columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) && rowIndex === 1)) {
        return 'background: #FFF6EB'
      } else if ((columnIndex === 6 && rowIndex === 0) || ((columnIndex === 5 || columnIndex === 6) && rowIndex === 1)) {
        return 'background: #EBFEFF'
      } else if ((columnIndex === 7 && rowIndex === 0) || ((columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 10) && rowIndex === 1)) {
        return 'background: #FFECEB'
      }
    },
    renderspec1 (h, {column, $index}) {
      column.minWidth = column.label.length * 16 + 40
      return (
        <div style={{width: '100%'}}>
          {column.label}
          <el-tooltip class="item" effect="dark" content={column.labelClassName} placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
      )
      // <div style={{width: '100%'}}>
      //     {column.label}
      //     <el-tooltip class="item" effect="dark" content={column.labelClassName} placement="top-start">
      //       <i class="el-icon-question"></i>
      //     </el-tooltip>
      //     <img src={formatPath('static/img/shopMan.png')}/>
      //   </div>
    },
    renderspec2 (h, {column, $index}) {
      column.minWidth = column.label.length * 16 + 40
      return (
        <div style={{width: '100%'}}>
          {column.label}
        </div>
      )
    },
    renderspec3 (h, {column, $index}) {
      return (
        <div>
          {column.label}
        </div>
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .renderheaderfirst {
    background: #f0f;
  }
  .chart-container{
    position: relative;
    padding: 20px;
    width: 100%;
  }
  .member-date{
  margin-top: 10px;
  margin-bottom: 20px;
  }
</style>
