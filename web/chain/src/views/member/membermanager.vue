<template>
  <div>
    <div v-if="isPermission(16)">
      <el-row class="first-row">
        <div class="inline_block">
          会员卡号:
          <el-input class="member-input-content" type="text" v-model="memberCard" placeholder=""></el-input>
        </div>
        <div class="inline_block">
          手机号:
          <el-input class="member-input-content" type="text" v-model="memberPhone" placeholder=""></el-input>
        </div>
        <div class="inline_block">
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
        <div class="inline_block">
          发卡门店:
          <el-select v-model="membershop" placeholder="-请选择-">
            <el-option
              v-for="item in UShopList"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
        </div>
      </el-row>
      <el-row class="second-row">
        <div class="inline_block">
          开卡日期:
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
          <el-button class="member-but" type="primary" @click="queryDataHandle(1)" :loading="downloadLoading1">查询</el-button>
          <el-button v-if="isPermission(89)" class="member-but" type="primary" @click="handleDownload()" :loading="downloadLoading">导出</el-button>
      </el-row>
      <br/>
      <el-table
        :data="tableData"
        stripe
        border>
        <el-table-column
          prop="tableSerialNum"
          fixed
          label="序号">
        </el-table-column>
        <el-table-column
          prop="tableMemberCard"
          label="会员卡号">
          <template slot-scope="scope">
            <el-button v-if="isPermission(17)" @click="handleClick(scope.row.ID, scope.row.ShopId)" type="text" size="small">{{scope.row.tableMemberCard}}</el-button>
            <span v-else>{{scope.row.tableMemberCard}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tableMemberType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="tableOpenShop"
          label="发卡门店">
        </el-table-column>
        <el-table-column
          prop="tableCardStatus"
          label="卡状态">
        </el-table-column>
        <el-table-column
          prop="tableTotalCharge"
          :formatter="formatfloat2StringKeep2"
          label="充值总额(元)">
        </el-table-column>
        <el-table-column
          prop="tableTotalCast"
          :formatter="formatfloat2StringKeep2"
          label="消费总额(元)">
        </el-table-column>
        <el-table-column
          prop="tableTotalLast"
          :formatter="formatfloat2StringKeep2"
          label="账面余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealLast"
          :formatter="formatfloat2StringKeep2"
          label="实际余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableTotalZen"
          :formatter="formatfloat2StringKeep2"
          label="赠送余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableCashRate"
          label="本金比率">
        </el-table-column>
        <el-table-column
          prop="tableTotalCount"
          label="总积分">
        </el-table-column>
        <el-table-column
          prop="tableMemberName"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="tableMemberPhone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="tableChargeDate"
          label="最后充值日期">
        </el-table-column>
        <el-table-column
          prop="tableCastDate"
          label="最后消费日期">
        </el-table-column>
        <el-table-column
          prop="tableOpenCardDate"
          label="开卡日期">
        </el-table-column>
        <el-table-column
          prop="tableValiteTime"
          label="有效期">
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        ref="bottomPagination"
        layout="prev, pager, next"
        background
        @current-change="changePageHandle"
        @next-click="logpre"
        :current-page.sync="pageIndex"
        :page-size="20"
        :total="pageTotal">
      </el-pagination>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="消费入单"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p>会员详情</p>
          </div>
          <div class="dialog-body">
            <secondmembermanager ref="secondmembermanagerRef" :ID="ID" :ShopId="shopId"></secondmembermanager>
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
  </div>
</template>
<script>
import { parseTime, getFloatTime, formatTimestamp, formatPath } from '@/utils'
import { returnOpencardTitle, value2Status } from '@/utils/member'
import secondmembermanager from '@/views/member/secondmembermanager'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
export default {
  name: 'membermanager',
  mixins: [ResizeMixin],
  components: { secondmembermanager },
  created () {
    this.queryDataHandle(this.pageIndex)
    this.isCanExport = !this.isMobile()
  },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeList
    },
    UShopList () {
      return this.$store.getters.memberbase.membershopList
    }
    // queryStartDate: {
    //   get: function () {
    //     return this.$store.getters.membermanager.queryStartDate
    //   },
    //   set: function (value) {
    //     this.$store.getters.membermanager.queryStartDate = value
    //   }
    // },
    // queryEndDate: {
    //   get: function () {
    //     return this.$store.getters.membermanager.queryEndDate
    //   },
    //   set: function (value) {
    //     this.$store.getters.membermanager.queryEndDate = value
    //   }

    // },
  },
  data () {
    return {
      downloadLoading1: false,
      downloadLoading: false,
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      dialogVisible: false,
      dialogWidth: '80%',
      ID: '',
      shopId: 0,
      tableData: [],
      pageTotal: 20,
      pageIndex: 1,
      memberCard: '',
      memberPhone: '',
      memberCardType: '',
      membershop: '',
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
    handleClick (val, shopid) {
      this.ID = val
      this.shopId = shopid
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.secondmembermanagerRef.update()
      })
    },
    logpre () {
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
      this.$store.dispatch('GetMemberInfoList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: this.queryStartDate, endTime: this.queryEndDate, PageIndex: currentIndex, PageSize: 20 }).then((response) => {
        that.pageTotal = response.pageTotal
        that.pageIndex = response.pageNo
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (that.pageIndex - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberType = response.listInfo[k].UCardTypeTitle
          obj.tableOpenShop = returnOpencardTitle(response.listInfo[k].ShopID)
          obj.tableCardStatus = value2Status(response.listInfo[k].State)
          obj.tableTotalCharge = response.listInfo[k].TotalMoney
          obj.tableTotalCast = response.listInfo[k].TotalMoney - response.listInfo[k].CurMoney - response.listInfo[k].ClearMoney
          obj.tableTotalLast = response.listInfo[k].CurMoney
          obj.tableRealLast = response.listInfo[k].RealPrice
          obj.tableTotalZen = response.listInfo[k].FreeRealPrice
          obj.tableCashRate = response.listInfo[k].CurMoney > 0 ? (Math.round((response.listInfo[k].RealPrice / response.listInfo[k].CurMoney) * 100, 0)) + '%' : 0
          obj.tableTotalCount = response.listInfo[k].Score
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableMemberPhone = response.listInfo[k].Mobile
          obj.ShopId = response.listInfo[k].ShopID
          obj.ID = response.listInfo[k].ID
          obj.tableChargeDate = (formatTimestamp(response.listInfo[k].LastFillTime) <= getFloatTime('0001/1/1')) ? parseTime(formatTimestamp(response.listInfo[k].AddDate) / 1000, '{y}-{m}-{d}') : parseTime(formatTimestamp(response.listInfo[k].LastFillTime) / 1000, '{y}-{m}-{d}')
          obj.tableCastDate = response.listInfo[k].LastPayTime === null ? '' : parseTime(formatTimestamp(response.listInfo[k].LastPayTime), '{y}-{m}-{d}')
          obj.tableOpenCardDate = parseTime(formatTimestamp(response.listInfo[k].AddDate), '{y}-{m}-{d}')
          obj.tableValiteTime = parseTime(formatTimestamp(response.listInfo[k].EndTime), '{y}-{m}-{d}')
          tmpTable[k] = obj
        }
        this.tableData = tmpTable
        that.downloadLoading1 = false
      }).catch(() => {
        this.downloadLoading1 = false
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
    handleDownload () {
      this.downloadLoading = true
      let cardTitle = ''
      for (let i = 0; i < this.MemberCardTypeList.length; i++) {
        if (this.MemberCardTypeList[i].ID === this.memberCardType) {
          cardTitle = this.MemberCardTypeList[i].Title
          break
        }
      }
      this.$store.dispatch('GetMemberInfoList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: parseTime(this.queryStartDate, '{y}-{m}-{d}'), endTime: parseTime(this.queryEndDate, '{y}-{m}-{d}'), PageIndex: 1, PageSize: 100000 }).then((response) => {
        // that.pageTotal = response.pageTotal
        // that.pageIndex = response.pageNo
        // that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (response.pageNo - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberType = ''// response.listInfo[k].UCardTypeTitle
          obj.tableOpenShop = returnOpencardTitle(response.listInfo[k].ShopID)
          obj.tableCardStatus = value2Status(response.listInfo[k].State)
          obj.tableTotalCharge = response.listInfo[k].TotalMoney
          obj.tableTotalCast = response.listInfo[k].TotalMoney - response.listInfo[k].CurMoney - response.listInfo[k].ClearMoney
          obj.tableTotalLast = response.listInfo[k].CurMoney
          obj.tableRealLast = response.listInfo[k].RealPrice
          obj.tableTotalZen = response.listInfo[k].FreeRealPrice
          obj.tableCashRate = response.listInfo[k].CurMoney > 0 ? (Math.round((response.listInfo[k].RealPrice / response.listInfo[k].CurMoney) * 100, 0)) + '%' : 0
          obj.tableTotalCount = response.listInfo[k].Score
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableMemberPhone = response.listInfo[k].Mobile
          obj.tableChargeDate = (formatTimestamp(response.listInfo[k].LastFillTime) <= getFloatTime('0001/1/1')) ? parseTime(formatTimestamp(response.listInfo[k].AddDate) / 1000, '{y}-{m}-{d}') : parseTime(formatTimestamp(response.listInfo[k].LastFillTime) / 1000, '{y}-{m}-{d}')
          obj.tableCastDate = response.listInfo[k].LastPayTime === null ? '' : parseTime(formatTimestamp(response.listInfo[k].LastPayTime), '{y}-{m}-{d}')
          obj.tableOpenCardDate = parseTime(formatTimestamp(response.listInfo[k].AddDate), '{y}-{m}-{d}')
          obj.tableValiteTime = parseTime(formatTimestamp(response.listInfo[k].EndTime), '{y}-{m}-{d}')
          tmpTable[k] = obj
        }
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '会员卡号', '类型', '发卡门店', '卡状态', '充值总额(元)',
            '消费总额(元)', '账面余额(元)', '实际余额(元)', '赠送余额(元)', '本金比率',
            '总积分', '客户姓名', '手机号', '最后充值日期', '最后消费日期', '开卡日期',
            '有效期']
          const filterVal = ['tableSerialNum', 'tableMemberCard', 'tableMemberType', 'tableOpenShop',
            'tableCardStatus', 'tableTotalCharge', 'tableTotalCast', 'tableTotalLast', 'tableRealLast',
            'tableTotalZen', 'tableCashRate', 'tableTotalCount', 'tableMemberName', 'tableMemberPhone',
            'tableChargeDate', 'tableCastDate', 'tableOpenCardDate', 'tableValiteTime']
          const list = tmpTable
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
  .first-row {
    margin-top: 20px;
  }
  // .second-row {
  //   margin-top: 10px;
  // }
  // .member-input {
  //   margin-top: 20px;
  // }
  .member-input-content {
    width: 200px;
  }
  .member-date {
    float: left;
    margin-top: 20px;
  }
  .member-but {
    margin-top: 10px;
    // float: left;
  }
</style>
