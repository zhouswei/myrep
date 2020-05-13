<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="TapClick">
      <el-tab-pane label="总部结算" name="first">
        <div v-if="isPermission(28)">
          <div>
            <div class="inline_block">
              月份:
              <el-date-picker
                v-model="queryStartMonth"
                type="month"
                placeholder="选择月份">
              </el-date-picker>
            </div>
            <div class="inline_block">
              门店:
              <el-select v-model="membershop" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberChargeShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div class="inline_block">
              <el-button class="data-but" type="primary" @click="queryDataHandle1(queryStartMonth, membershop)" :loading="loadingview1 = false">统计</el-button>
              <el-button v-if="isPermission(29)" class="data-but" type="primary" @click="handleDownload1()" :loading="loadview2 = false">导出</el-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            show-summary
            border
            stripe
            :header-cell-style="headercellyangshi3">
            <el-table-column
              prop="tableInvocingShop"
              label="结算门店">
            </el-table-column>
            <el-table-column
              prop="tableChargeTotal"
              label="开卡/充值/充次总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableChargeReal"
              label="开卡/充值/充次实收总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableCastTotal"
              label="扣费总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableCastRealPay"
              label="实扣总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableInvocingReal"
              label="结算应收(元)">
              <el-table-column
                label="账面应收(元)"
                prop="tableOrderShouldPay">
              </el-table-column>
              <el-table-column
                label="实际应收(元)"
                prop="tableOrderRealPay">
              </el-table-column>
            </el-table-column>
          </el-table>
          <div style="color:red;font-size:15px;">
            <p>提示：<br/>
              1、【开卡/充值/充次总金额】指会员开卡/充值/充次时的总金额(包括赠送金额)；<br/>
              2、【开卡/充值/充次实收总金额】指会员开卡/充值/充次时的实收金额(不包括赠送金额)；<br/>
              3、【扣费总金额】指会员消费时的扣费金额，包括储值扣除的账面金额（包括扣除的赠送金额）、计次项目扣次对应折后金额；<br/>
              4、【实扣总金额】指会员消费时的实付金额，包括储值扣除的实际金额（不包括扣除的赠送金额）、计次项目扣次对应折后金额；<br/>
              5、 账面应收 = 扣费总金额 - 开卡/充值/充次总金额 ，实际应收 = 实扣总金额-开卡/充值/充次实收总金额 ，如果为负数，表示门店应上交款项给总部，如果为正数，表示总部应结算款项给门店；
            </p>
          </div>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <el-tab-pane label="储值报表" name="second">
        <div v-if="isPermission(31)">
          <div>
            <div class="inline_block">
              营业日期:
              <el-date-picker
                v-model="queryStartDate2"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <span class="data_line">~</span>
            <div class="inline_block">
              <el-date-picker
                v-model="queryEndDate2"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <div class="inline_block">
              门店:
              <el-select v-model="membershop2" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberChargeShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div class="inline_block">
              <el-button class="data-but" type="primary" @click="queryDataHandle2(membershop2, queryStartDate2, queryEndDate2)" :loading="loadingview3 = false">统计</el-button>
              <el-button v-if="isPermission(32)" class="data-but" type="primary" @click="handleDownload2(membershop2, queryStartDate2, queryEndDate2)" :loading="loadview4 = false">导出</el-button>
            </div>
          </div>
          <el-table
            :data="tableData2"
            show-summary
            sum-text="合计"
            border
            stripe
            :header-cell-style="headercellyangshi3"
            >
            <el-table-column
              prop="tableChargeShop2"
              label="门店">
              <template slot-scope="scope">
                <el-button @click="handleClick2(scope.row.ShopID, scope.row.tableChargeTotal2, scope.row.tableRealTotal2, scope.row.tableZenTotal2)" type="text" size="small">{{scope.row.tableChargeShop2}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="tableChargeTotal2"
              label="开卡/充值/充次总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableRealTotal2"
              label="开卡/充值/充次实收总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableZenTotal2"
              label="赠送总金额(元)">
            </el-table-column>
          </el-table>
          <div style="color:red;font-size:15px;">
            <p>提示：<br/>
              1、【开卡/充值/充次总金额】指会员开卡/充值/充次时的总金额(包括赠送金额)；<br/>
              2、【开卡/充值/充次实收总金额】指会员开卡/充值/充次时的实收金额(不包括赠送金额)；<br/>
              3、【赠送总金额】指会员开卡和充值时赠送的金额；<br/>
              4、开卡/充值/充次总金额 = 开卡/充值/充次实收总金额 + 赠送总金额；
            </p>
          </div>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="储值详情"
            ref="dialog_wrapper"
            :visible.sync="dialogVisible2"
            :modal-append-to-body='false'
            :width="dialogWidth"
            :close-on-click-modal="false">
              <div slot="title">
                <p>储值详情</p>
              </div>
              <div class="dialog-body">
                <secondinvoicingstatistics1 ref="secondinvoicingstatistics1Ref" :data2="data2"></secondinvoicingstatistics1>
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
      <el-tab-pane label="扣费报表" name="third">
        <div v-if="isPermission(33)">
          <div>
            <div class="inline_block">
              营业日期:
              <el-date-picker
                v-model="queryStartDate3"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <span class="data_line">~</span>
            <div class="inline_block">
              <el-date-picker
                v-model="queryEndDate3"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <div class="inline_block">
              门店:
              <el-select v-model="membershop3" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberChargeShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div class="inline_block">
              <el-button class="data-but" type="primary" @click="queryDataHandle3(membershop3, queryStartDate3, queryEndDate3)" :loading="loadingview5 = false">统计</el-button>
              <el-button v-if="isPermission(34)" class="data-but" type="primary" @click="handleDownload3(membershop3, queryStartDate3, queryEndDate3)" :loading="loadview6 = false">导出</el-button>
            </div>
          </div>
          <el-table
            :data="tableData3"
            show-summary
            sum-text="合计"
            border
            stripe
            :header-cell-style="headercellyangshi3"
            >
            <el-table-column
              prop="tableCastShop3"
              label="门店">
              <template slot-scope="scope">
                <el-button v-if="isPermission(75)" @click="handleClick3(scope.row.ShopID, scope.row.tableCastShop3, scope.row.tablePayTotal3, scope.row.tableRealPayTotal3)" type="text" size="small">{{scope.row.tableCastShop3}}</el-button>
                <span v-else>{{scope.row.tableCastShop3}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="tablePayTotal3"
              label="扣费总金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableRealPayTotal3"
              label="实扣总金额(元)">
            </el-table-column>
          </el-table>
          <div style="color:red;font-size:15px;">
            <p>提示：<br/>
              1、【扣费总金额】指会员消费时的扣费金额，包括储值扣除的账面金额（包括扣除的赠送金额）、计次项目扣次对应折后金额；<br/>
              2、【实扣总金额】指会员消费时的实付金额，包括储值扣除的实际金额（不包括扣除的赠送金额）、计次项目扣次对应折后金额；
            </p>
          </div>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="扣费详情"
            ref="dialog_wrapper"
            :visible.sync="dialogVisible3"
            :modal-append-to-body='false'
            :width="dialogWidth"
            :close-on-click-modal="false">
              <div slot="title">
                <p>扣费详情</p>
              </div>
              <div class="dialog-body">
                <secondinvoicingstatistics2 ref="secondinvoicingstatistics2Ref" :data3="data3"></secondinvoicingstatistics2>
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
      <el-tab-pane label="挂账统计" name="forth">
        <div v-if="isPermission(35)">
          <div>
            <div class="inline_block">
              营业日期:
              <el-date-picker
                v-model="queryStartDate4"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <span class="data_line">~</span>
            <div class="inline_block">
              <el-date-picker
                v-model="queryEndDate4"
                type="date"
                placeholder="-请选择-">
              </el-date-picker>
            </div>
            <div class="inline_block">
              门店:
              <el-select v-model="membershop4" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberChargeShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div class="inline_block">
              <el-button class="data-but" type="primary" @click="queryDataHandle4(membershop4, queryStartDate4, queryEndDate4)" :loading="loadingview7 = false">统计</el-button>
              <el-button v-if="isPermission(36)" class="data-but" type="primary" @click="handleDownload4(membershop4, queryStartDate4, queryEndDate4)" :loading="loadview8 = false">导出</el-button>
            </div>
          </div>
          <div class='chart-container'>
            <chart ref="datebar" :chartName="chartname" chartLabel1='挂账金额' chartLabel2='入账金额' height='400px' width='100%' :OrginData="chartData"></chart>
          </div>
          <el-table
            :data="tableData4"
            show-summary
            sum-text="合计"
            border
            stripe
            :header-cell-style="headercellyangshi3">
            <el-table-column
              prop="tableShop4"
              label="门店">
            </el-table-column>
            <el-table-column
              prop="tableGuangTotal4"
              label="挂账金额(元)">
            </el-table-column>
            <el-table-column
              prop="tablePayOff4"
              label="折后金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableEnterMoney4"
              label="入账金额(元)">
            </el-table-column>
            <el-table-column
              prop="tableLeaveMoney4"
              label="剩余应收(元)">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <el-tab-pane label="店间结算" name="fiveth">
        <div v-if="isPermission(90)">
          <div>
            <div class="inline_block">
              月份:
              <el-date-picker
                v-model="queryStartMonth5"
                type="month"
                placeholder="选择月份">
              </el-date-picker>
            </div>
            <div class="inline_block">
              门店:
              <el-select v-model="membershop5" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberChargeShopList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div style="display:inline-block">
              <el-button class="data-but" type="primary" @click="queryDataHandle5(membershop5, queryStartMonth5)" :loading="loadingview9 = false">统计</el-button>
              <el-button v-if="isPermission(92)" class="data-but" type="primary" @click="handlePrint()" :loading="loadingview11 = false">打印</el-button>
              <el-button v-if="isPermission(91)" class="data-but" type="primary" @click="handleDownload5(membershop5, queryStartMonth5)" :loading="loadview10 = false">导出</el-button>
            </div>
          </div>
          <div id="printzone" ref="printze">
            <el-table
              id="localinvoicing"
              :data="tableData5"
              border
              show-summary
              sum-text='汇总'
              :summary-method="getSummaries"
              :span-method="arraySpanMethod">
              <el-table-column
                prop="tableLocalShop5"
                label="本店">
              </el-table-column>
              <el-table-column
                prop="tableChargeTotalUsed5"
                label="总使用储值(元)">
              </el-table-column>
              <el-table-column
                prop="tableLocalCharge5"
                label="本店使用本店储值">
                <el-table-column
                  prop="tableOrderPay5"
                  label="账面扣费(元)">
                </el-table-column>
                <el-table-column
                  prop="tableRealPay5"
                  label="实扣本金(元)">
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="tableOtherShop5"
                label="他店">
              </el-table-column>
              <el-table-column
                prop="tableCastRealPay"
                label="本店使用他店储值">
                <el-table-column
                  prop="tableOrderPay52"
                  label="账面扣费(元)">
                  <template slot-scope="scope">
                    <el-button v-if="isPermission(93) && scope.row.tableOrderPay52 !== 0" @click="handleItemClick(scope, 1)" type="text" size="small">{{scope.row.tableOrderPay52}}</el-button>
                    <span v-else>{{scope.row.tableOrderPay52}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tableRealPay52"
                  label="实扣本金(元)">
                  <template slot-scope="scope">
                  <el-button @click="handleItemClick(scope, 1)" type="text" size="small" v-if="isPermission(93) && scope.row.tableRealPay52 !== 0">{{scope.row.tableRealPay52}}</el-button>
                  <span v-else>{{scope.row.tableRealPay52}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="tableOtherUseLocal5"
                label="他店使用本店储值">
                <el-table-column
                  prop="tableOrderPay53"
                  label="账面扣费(元)">
                  <template slot-scope="scope">
                  <el-button @click="handleItemClick(scope, 2)" type="text" size="small" v-if="isPermission(93) && scope.row.tableOrderPay53 !== 0">{{scope.row.tableOrderPay53}}</el-button>
                  <span v-else>{{scope.row.tableOrderPay53}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tableRealPay53"
                  label="实扣本金(元)">
                  <template slot-scope="scope">
                  <el-button @click="handleItemClick(scope, 2)" type="text" size="small" v-if="isPermission(93) && scope.row.tableRealPay53 !== 0">{{scope.row.tableRealPay53}}</el-button>
                  <span v-else>{{scope.row.tableRealPay53}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="tableOtherAndLocal5"
                label="本店与他店结算金额">
                <el-table-column
                  prop="tableOrderIncoving54"
                  label="账面结算(元)">
                </el-table-column>
                <el-table-column
                  prop="tableLocalIncoving54"
                  label="本金结算(元)">
                </el-table-column>
              </el-table-column>
              <el-table-column
                prop="tableLocalReal5"
                label="本店应收总额">
                <el-table-column
                  prop="tableOrderReal55"
                  label="账面应收(元)">
                </el-table-column>
                <el-table-column
                  prop="tableLocalReal55"
                  label="本金应收(元)">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="消费入单"
            height="500"
            ref="dialog_wrapper"
            :visible.sync="dialogVisible"
            :width="dialogWidth"
            :modal-append-to-body='false'
            :close-on-click-modal="false">
              <div slot="title">
                <p>储值结算账单明细</p>
              </div>
              <div class="dialog-body">
                <secondinvoicingstatistics3 ref="secondinvoicingstatistics3" :datetime="specParseTime(queryStartMonth5, '{y}-{m}')" :shopId="SpecShopId" :invoicingId="SpecInvoicingId"></secondinvoicingstatistics3>
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
    </el-tabs>
  </div>
</template>
<script>
import chart from '@/components/Charts/databar'
import {parseTime, formatPath} from '@/utils'
import secondinvoicingstatistics1 from '@/views/data/secondinvoicingstatistics1'
import secondinvoicingstatistics2 from '@/views/data/secondinvoicingstatistics2'
import secondinvoicingstatistics3 from '@/views/data/secondinvoicingstatistics3'
export default {
  name: 'invoicingstatistics',
  components: { secondinvoicingstatistics1, secondinvoicingstatistics2, secondinvoicingstatistics3, chart },
  data () {
    return {
      chartname: '挂账统计-按店统计',
      activeName: 'first',
      dialogVisible: false,
      loadingview1: false,
      loadingview2: false,
      loadingview3: false,
      loadingview4: false,
      loadingview5: false,
      loadingview6: false,
      loadingview7: false,
      loadingview8: false,
      loadingview9: false,
      loadingview10: false,
      loadingview11: false,
      queryStartMonth: new Date(),
      queryStartMonth5: new Date(),
      queryStartDate2: new Date(),
      queryEndDate2: new Date(),
      queryStartDate3: new Date(),
      queryEndDate3: new Date(),
      queryStartDate4: '',
      queryEndDate4: '',
      membershop: 0,
      membershop2: '',
      membershop3: '',
      membershop4: '',
      membershop5: 0,
      pageTotal: 10,
      pageIndex: 0,
      tableData: [],
      pageTotal2: 10,
      pageIndex2: 0,
      tableData2: [],
      pageTotal3: 10,
      pageIndex3: 0,
      tableData3: [],
      pageTotal4: 10,
      pageIndex4: 0,
      tableData4: [],
      pageTotal5: 10,
      pageIndex5: 0,
      tableData5: [],
      dialogVisible2: false,
      dialogVisible3: false,
      dialogWidth: '90%',
      data2: {},
      data3: {},
      chartData: [],
      SpecShopId: 0,
      SpecInvoicingId: 0,
      shopSize: 1
    }
  },
  mounted () {
    this.queryStartMonth = new Date()
    this.queryStartMonth.setMonth(this.queryStartMonth.getMonth() - 1)
    this.queryStartDate4 = new Date()
    this.queryStartDate4.setDate(this.queryStartDate4.getDate() - 1)
    this.queryEndDate4 = new Date()
    this.queryEndDate4.setDate(this.queryEndDate4.getDate() - 1)
  },
  computed: {
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
    }
    // ,
    // shopSize () {
    //   return this.$store.getters.memberbase.membershopOriginList.length - 1
    // }
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
    specParseTime (val, pattern) {
      return parseTime(val, pattern)
    },
    handleItemClick (val1, val2) {
      this.dialogVisible = true
      this.SpecShopId = this.tableData5[val1.$index].RealShopID
      this.SpecInvoicingId = val2
      this.$nextTick(() => {
        this.$refs.secondinvoicingstatistics3.updateWaiData()
      })
    },
    TapClick () {
      if (this.activeName === 'forth') {
        this.GetChartData()
      } else if (this.activeName === 'fiveth') {
        this.queryDataHandle5(this.membershop5, this.queryStartMonth5)
      }
    },
    GetChartData () {
      this.queryDataHandle4(this.membershop4, this.queryStartDate4, this.queryEndDate4)
    },
    GetValideShoplist () {
      this.$store.dispatch('queryInvalideShopList', {}).then((response) => {
        this.shopSize = response.ShopList.length - 1
      }).catch(() => {

      })
    },
    handleClick2 (ShopID, totalPrice, realPrice, freePrice) {
      this.dialogVisible2 = true
      // BeginDate: params.BeginDate,
      // EndDate: params.EndDate,
      // ShopID: params.ShopID,
      // ShopTitle: params.ShopTitle,
      // QueryShopID: params.QueryShopID
      var ShopTitle = ''
      this.MemberChargeShopList.forEach(element => {
        if (element.ID === ShopID) {
          ShopTitle = element.Title
        }
      })
      this.data2 = {
        BeginDate: this.queryStartDate2,
        EndDate: this.queryEndDate2,
        ShopID: ShopID,
        ShopTitle: ShopTitle,
        QueryShopID: ShopID,
        TotalPrice: totalPrice,
        RealPrice: realPrice,
        FreePrice: freePrice
      }
      this.$nextTick(() => {
        this.$refs.secondinvoicingstatistics1Ref.updateData()
      })
    },
    handleClick3 (ShopID, ShopTitle, totalPrice, realPrice) {
      this.dialogVisible3 = true
      this.data3 = {
        BeginDate: this.queryStartDate3,
        EndDate: this.queryEndDate3,
        ShopID: ShopID,
        ShopTitle: ShopTitle,
        QueryShopID: ShopID,
        TotalPrice: totalPrice,
        RealPrice: realPrice
      }
      this.$nextTick(() => {
        this.$refs.secondinvoicingstatistics2Ref.updateData()
      })
    },
    queryDataHandle1 (month, shopId) {
      this.loadingview1 = false
      this.$store.dispatch('queryTotalInvocingData', {ShopID: shopId, BeginDate: month}).then((response) => {
        this.loadingview1 = true
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableInvocingShop = element.ShopTitle
          ListItemObj.tableChargeTotal = element.TotalFillPrice
          ListItemObj.tableChargeReal = element.FillPrice
          ListItemObj.tableCastTotal = element.PayPrice
          ListItemObj.tableCastRealPay = element.RealPayPrice
          ListItemObj.tableOrderShouldPay = element.SalePrice
          ListItemObj.tableOrderRealPay = element.RealPrice
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview1 = false
      })
    },
    handleDownload1 () {
      this.loadingview2 = false
      this.$store.dispatch('ExportStoreInvocingData', {ShopID: this.membershop, Date: this.queryStartMonth}).then((response) => {
        this.loadingview2 = true
        import('@/vendor/Export2Excel').then(excel => {
          // const tHeader = ['结算门店', '充值总金额(元)', '充值实收总金额(元)', '消费总金额(元)', '消费实扣总金额(元)',
          //   '账面应收(元)', '实际应收(元)']
          // const filterVal = ['tableInvocingShop', 'tableChargeTotal', 'tableChargeReal', 'tableCastTotal',
          //   'tableCastRealPay', 'tableOrderShouldPay', 'tableOrderRealPay']
          // const list = this.tableData
          // const data = this.formatJson(filterVal, list)
          excel.exprot_spec_to_excel(response.ArrayObj)
        }).catch(() => {
          this.loadingview2 = false
        })
      }).catch(() => {
        this.loadingview2 = false
      })
    },
    // 储值报表
    queryDataHandle2 (shipId, StartDate, EndDate) {
      this.loadingview3 = true
      this.$store.dispatch('queryStoreTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview3 = false
        this.tableData2 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableChargeShop2 = element.ShopTitle
          ListItemObj.tableRealTotal2 = element.RealPrice
          ListItemObj.tableZenTotal2 = element.FreePrice
          ListItemObj.tableChargeTotal2 = element.TotalPrice
          ListItemObj.ShopID = element.ShopID
          this.tableData2.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview3 = false
      })
    },
    handleDownload2 (shipId, StartDate, EndDate) {
      this.loadingview4 = false
      this.$store.dispatch('queryStoreTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview3 = false
        this.tableData2 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableChargeShop2 = element.ShopTitle
          ListItemObj.tableRealTotal2 = element.RealPrice
          ListItemObj.tableZenTotal2 = element.FreePrice
          ListItemObj.tableChargeTotal2 = element.TotalPrice
          this.tableData2.push(ListItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['储值门店', '开卡/充值/充次总金额（元）', '开卡/充值/充次实收总金额（元）', '赠送总金额（元）']
          const filterVal = ['tableChargeShop2', 'tableChargeTotal2', 'tableRealTotal2', 'tableZenTotal2']
          const list = this.tableData2
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
        this.loadingview3 = false
      })
    },
    // 扣费报表
    queryDataHandle3 (shipId, StartDate, EndDate) {
      this.loadingview5 = true
      this.$store.dispatch('queryPayMoneyTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview5 = false
        this.tableData3 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableCastShop3 = element.ShopTitle
          ListItemObj.tablePayTotal3 = element.PayPrice
          ListItemObj.tableRealPayTotal3 = element.RealPayPrice
          ListItemObj.ShopID = element.ShopID
          this.tableData3.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview5 = false
      })
    },
    handleDownload3 (shipId, StartDate, EndDate) {
      this.loadingview6 = true
      this.$store.dispatch('queryPayMoneyTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview5 = false
        this.tableData4 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableCastShop3 = element.ShopTitle
          ListItemObj.tablePayTotal3 = element.PayPrice
          ListItemObj.tableRealPayTotal3 = element.RealPayPrice
          this.tableData4.push(ListItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['门店', '扣费总金额(元)', '实扣总金额(元)']
          const filterVal = ['tableCastShop3', 'tablePayTotal3', 'tableRealPayTotal3']
          const list = this.tableData3
          const data = this.formatJson(filterVal, list)
          // console.log(data)
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
        this.loadingview6 = false
      })
    },
    // 挂账统计
    queryDataHandle4 (shipId, StartDate, EndDate) {
      this.loadingview7 = true
      this.$store.dispatch('queryGuaZhangTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview7 = false
        this.tableData4 = []
        this.chartData = []
        var tmpList = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.shopName = element.ShopTitle
          tmpObj.data = []
          tmpObj.data.push({title: '挂账金额', value: element.CreditPrice})
          tmpObj.data.push({title: '入账金额', value: element.PayPrice})
          tmpList.push(tmpObj)
          var ListItemObj = {}
          ListItemObj.tableShop4 = element.ShopTitle
          ListItemObj.tableGuangTotal4 = element.CreditPrice
          ListItemObj.tablePayOff4 = element.DiscountPrice
          ListItemObj.tableEnterMoney4 = element.PayPrice
          ListItemObj.tableLeaveMoney4 = element.SurPayPrice
          this.tableData4.push(ListItemObj)
        })
        this.chartData = tmpList
        this.$nextTick(() => {
          this.$refs.datebar.updateChart()
        })
      }).catch(() => {
        this.loadingview7 = false
      })
    },
    handleDownload4 (shipId, StartDate, EndDate) {
      this.loadingview8 = false
      this.$store.dispatch('queryGuaZhangTableData', {ShopID: shipId, BeginDate: StartDate, EndDate: EndDate}).then((response) => {
        this.loadingview7 = false
        this.tableData4 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableShop4 = element.ShopTitle
          ListItemObj.tableGuangTotal4 = element.CreditPrice
          ListItemObj.tablePayOff4 = element.DiscountPrice
          ListItemObj.tableEnterMoney4 = element.PayPrice
          ListItemObj.tableLeaveMoney4 = element.SurPayPrice
          this.tableData4.push(ListItemObj)
        })
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['门店', '挂账金额(元)', '折后金额(元)', '入账金额(元)', '剩余应收(元)']
          const filterVal = ['tableShop4', 'tableGuangTotal4', 'tablePayOff4', 'tableEnterMoney4', 'tableLeaveMoney4']
          const list = this.tableData4
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
        this.loadingview7 = false
      })
    },
    getSummaries (param) {
      // console.log(JSON.stringify(param))
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总'
          return
        }
        if (index === 4) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr, i) => {
            const value = Number(curr)
            if (index === 1 || index === 2 || index === 3 || index === 11 || index === 12) {
              if (!isNaN(value) && i % this.shopSize === 0) {
                return prev + curr
              } else {
                return prev
              }
            } else {
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }
          }, 0)
          sums[index] = sums[index].toFixed(2)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 店间结算
    queryDataHandle5 (ShopID, AddTime) {
      this.loadingview9 = true
      this.$store.dispatch('queryLoaclInvocingData', {ShopID: ShopID, AddTime: AddTime, SearchTypeID: 0, SearchTypeIDSubmit: 0}).then((response) => {
        this.loadingview9 = false
        this.tableData5 = []
        response.listInfo.forEach(element => {
          this.shopSize = element.AllShopsSettlement.length
          element.AllShopsSettlement.forEach(element1 => {
            var ListItemObj = {}
            // ListItemObj.tableCastRealPay = element.SurPayPrice
            ListItemObj.RealShopID = element1.RealShopID
            ListItemObj.tableOtherShop5 = element1.OtherShopTitle
            ListItemObj.tableOrderPay52 = element1.LocalUOtherTotalCost
            ListItemObj.tableRealPay52 = element1.LocalUOtherRealCost
            // ListItemObj.tableOtherUseLocal5 = element.SurPayPrice
            ListItemObj.tableOrderPay53 = element1.OtherULocalTotalCost
            ListItemObj.tableRealPay53 = element1.OtherULocalRealCost
            // ListItemObj.tableOtherAndLocal5 = element.SurPayPrice
            ListItemObj.tableOrderIncoving54 = element1.LocalSettleOtherTotalCost
            ListItemObj.tableLocalIncoving54 = element1.LocalSettleOtherRealCost
            ListItemObj.tableLocalShop5 = element.RealShopTitle
            ListItemObj.tableChargeTotalUsed5 = element.LocalShopCost
            // ListItemObj.tableLocalCharge5 = element.LocalULocalTotalCost
            ListItemObj.tableOrderPay5 = element.LocalULocalTotalCost
            ListItemObj.tableRealPay5 = element.LocalULocalRealCost
            // ListItemObj.tableLocalReal5 = element.SurPayPrice
            ListItemObj.tableOrderReal55 = element.GetLocalTotalCost
            ListItemObj.tableLocalReal55 = element.GetLocalRealCost
            console.log(ListItemObj)
            this.tableData5.push(ListItemObj)
          })
        })
      }).catch(() => {
        this.loadingview9 = false
      })
    },
    handleDownload5 (ShopID, AddTime) {
      this.loadingview10 = false
      this.$store.dispatch('ExportLoaclInvocingData', {ShopID: ShopID, AddTime: AddTime, SearchTypeID: 0, SearchTypeIDSubmit: 0}).then((response) => {
        this.loadingview9 = false

        // this.tableData5 = []
        // response.listInfo.forEach(element => {
        //   element.AllShopsSettlement.forEach(element1 => {
        //     var ListItemObj = {}
        //     // ListItemObj.tableCastRealPay = element.SurPayPrice
        //     ListItemObj.tableOtherShop5 = element1.OtherShopTitle
        //     ListItemObj.tableOrderPay52 = element1.LocalUOtherTotalCost
        //     ListItemObj.tableRealPay52 = element1.LocalUOtherRealCost
        //     // ListItemObj.tableOtherUseLocal5 = element.SurPayPrice
        //     ListItemObj.tableOrderPay53 = element1.OtherULocalTotalCost
        //     ListItemObj.tableRealPay53 = element1.OtherULocalRealCost
        //     // ListItemObj.tableOtherAndLocal5 = element.SurPayPrice
        //     ListItemObj.tableOrderIncoving54 = element1.LocalSettleOtherTotalCost
        //     ListItemObj.tableLocalIncoving54 = element1.LocalSettleOtherRealCost
        //     ListItemObj.tableLocalShop5 = element.RealShopTitle
        //     ListItemObj.tableChargeTotalUsed5 = element.LocalShopCost
        //     // ListItemObj.tableLocalCharge5 = element.LocalULocalTotalCost
        //     ListItemObj.tableOrderPay5 = element.LocalULocalTotalCost
        //     ListItemObj.tableRealPay5 = element.LocalULocalRealCost
        //     // ListItemObj.tableLocalReal5 = element.SurPayPrice
        //     ListItemObj.tableOrderReal55 = element.GetLocalTotalCost
        //     ListItemObj.tableLocalReal55 = element.GetLocalRealCost
        //     this.tableData5.push(ListItemObj)
        //   })
        // })
        import('@/vendor/Export2Excel').then(excel => {
          // const tHeader = ['门店', '总使用储值(元)', '账面扣费(元)', '实扣本金(元)', '他店', '账面扣费(元)']
          // const filterVal = ['tableLocalShop5', 'tableChargeTotalUsed5', 'tableOrderPay5', 'tableRealPay5',
          //  'tableOtherShop5', 'tableOrderPay52', ]
          // const list = this.tableData5
          // const data = this.formatJson(filterVal, list)
          // excel.export_json_to_excel({
          //   header: tHeader,
          //   data: data,
          //   filename: this.filename,
          //   autoWidth: this.autoWidth
          // })
          excel.exprot_spec_to_excel(response.objArray)
          this.loadingview9 = false
        }).catch(() => {
          this.loadingview9 = false
        })
      }).catch(() => {
        this.loadingview9 = false
      })
    },
    handlePrint () {
      this.loadingview11 = true
      this.$printcc(this.$refs.printze)
      // var windows = print(document.getElementById('printzone').innerHTML)
      // windows.close()
      // printJS({
      //   printable: 'printzone',
      //   type: 'html',
      //   maxWidth: 1200,
      //   targetStyles: ['*']
      // })
      // printJS('printzone', 'html')
      // let subOutputRankPrint = document.getElementById('printzone')
      // let newContent = subOutputRankPrint.innerHTML
      // let oldContent = document.body.innerHTML
      // document.body.innerHTML = newContent
      // window.print()
      // document.body.innerHTML = oldContent
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if ((columnIndex >= 0 && columnIndex <= 3) || columnIndex === 11 || columnIndex === 12) {
        if (rowIndex % this.shopSize === 0) {
          return {
            rowspan: this.shopSize,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    headercellyangshi3 ({row, column, rowIndex, columnIndex}) {
      if ((columnIndex === 5 && rowIndex === 0) || ((columnIndex === 0 || columnIndex === 1) && rowIndex === 1)) {
        return 'background: #FFF6EB; text-align: center'
      }
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
