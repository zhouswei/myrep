<template>
  <div>
    <div v-if="isPermission(20)">
      <el-row class="first-row" :gutter="10">
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            会员卡号:
            <el-input class="member-input-content" v-model="memberCard" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            手机号:
            <el-input class="member-input-content" v-model="memberPhone" placeholder=""></el-input>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
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
        </el-col>
        <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
          <div class="member-input">
            消费门店:
            <el-select v-model="membershop" placeholder="-请选择-">
              <el-option
                v-for="item in MemberCastShopList"
                :key="item.ID"
                :label="item.Title"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :xs="8" :sm="24" :md="4" :lg="24" :xl="24">
          <div class="member-date">
            消费日期:
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
          </div>
          <el-button class="member-but" type="primary" @click="queryDataHandle(1)" :loading="downloadLoading1">查询</el-button>
          <el-button v-if="isPermission(88)" class="member-but" type="primary" @click="handleDownload()" :loading="downloadLoading">导出</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="tableSerialNum"
          fixed
          label="序号">
        </el-table-column>
        <el-table-column
          prop="tableMemberCard"
          label="会员卡号">
        </el-table-column>
        <el-table-column
          prop="tableMemberName"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          prop="tableCastTime"
          label="消费时间">
        </el-table-column>
        <el-table-column
          prop="tableSaleCardShop"
          label="发卡门店">
        </el-table-column>
        <el-table-column
          prop="tableCastShop"
          label="消费门店">
        </el-table-column>
        <el-table-column
          prop="tableSettleShop"
          label="结算门店">
        </el-table-column>
        <el-table-column
          prop="tablePhone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="tablePayMoney"
          label="卡支付金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealPay"
          label="实收支付(元)">
        </el-table-column>
        <el-table-column
          prop="tablePayZen"
          label="赠送支付(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealRate"
          label="实收比例">
        </el-table-column>
        <el-table-column
          prop="tableLastMoney"
          label="卡账面余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealMoney"
          label="实际余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableZenLast"
          label="赠送余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableBanker"
          label="收银员">
        </el-table-column>
        <el-table-column
          prop="tableOrderChannel"
          label="下单渠道">
        </el-table-column>
        <el-table-column
          prop="tableOrderNum"
          label="账单号"
          min-width="100px">
          <template slot-scope="scope">
            <el-button v-if="isPermission(21)" @click="handleClick(scope.row)" type="text" size="small">{{scope.row.tableOrderNum}}</el-button>
            <span v-else>{{scope.row.tableOrderNum}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        ref="bottomPagination"
        layout="prev, pager, next"
        background
        @current-change="changePageHandle"
        :current-page.sync="pageIndex"
        :page-size="20"
        :total="pageTotal">
      </el-pagination>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="账单记录"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p>账单记录</p>
          </div>
          <div class="dialog-body">
            <secondcastrecord :sendData="sendData" ref="secondcastrecordRef"></secondcastrecord>
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
import { parseTime, formatTimestamp, formatPath } from '@/utils'
import secondcastrecord from '@/views/member/secondcastrecord'// 消费入单组件
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
export default {
  name: 'castrecord',
  components: { secondcastrecord },
  mixins: [ResizeMixin],
  mounted () {
    this.queryDataHandle(this.pageIndex)
    this.isCanExport = !this.isMobile()
  },
  activated () {
    var _this = this
    document.onkeydown = function (eve) {
      if (eve.keyCode === 13) {
        _this.handleEnter()
      }
    }
  },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeList
    },
    MemberCastShopList () {
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
    handleEnter () {
      console.log('handleEnter111111--------------')
    },
    handleClick (data) {
      this.dialogVisible = true
      this.sendData.shopID = data.shopID
      this.sendData.OrderLCardID = data.OrderLCardID
      this.$nextTick(() => {
        this.$refs.secondcastrecordRef.getData()
      })
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
      // console.log(JSON.stringify(this.MemberCastShopList))
      this.$store.dispatch('GetMemberCastList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: this.queryStartDate, endTime: this.queryEndDate, PageIndex: currentIndex, PageSize: 20 }).then((response) => {
        that.pageTotal = response.PageTotal
        that.pageIndex = response.PageNo
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (that.pageIndex - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d}')
          obj.tableSaleCardShop = that.returnOpencardTitle(response.listInfo[k].RealShopID)
          obj.tableCastShop = that.returnOpencardTitle(response.listInfo[k].ShopID)
          obj.tableSettleShop = response.listInfo[k].OrderCode === '' || response.listInfo[k].OrderCode === null ? '' : response.listInfo[k].PayShopTitle
          obj.tablePhone = response.listInfo[k].Mobile
          obj.tablePayMoney = response.listInfo[k].PayPrice === 0 ? '--' : '￥' + response.listInfo[k].PayPrice
          obj.tableRealPay = response.listInfo[k].RealPayPrice !== 0 ? '￥' + response.listInfo[k].RealPayPrice : '--'
          obj.tablePayZen = response.listInfo[k].FreePayPrice !== 0 ? '￥' + response.listInfo[k].FreePayPrice : '--'
          obj.tableRealRate = response.listInfo[k].RealRate !== 0 ? (response.listInfo[k].RealRate + '%') : '--'
          obj.tableLastMoney = response.listInfo[k].CurMoney === 0 ? '--' : '￥' + response.listInfo[k].CurMoney
          obj.tableRealMoney = response.listInfo[k].RealPrice !== 0 ? '￥' + response.listInfo[k].RealPrice : '--'
          obj.tableZenLast = response.listInfo[k].RealPrice !== 0 ? '￥' + response.listInfo[k].RealPrice : '--'
          obj.tableBanker = response.listInfo[k].ShowName + ((response.listInfo[k].AdminCode === '' || response.listInfo[k].AdminCode === null) ? '' : response.listInfo[k].AdminCode)
          obj.tableOrderChannel = response.listInfo[k].channel === 1 ? '店铺' : '微店'
          obj.tableOrderNum = response.listInfo[k].OrderCode === '' || response.listInfo[k].OrderCode === null ? '查账单' : response.listInfo[k].OrderCode
          obj.shopID = response.listInfo[k].ShopID
          obj.OrderLCardID = response.listInfo[k].OrderLCardID
          tmpTable[k] = obj
        }
        that.tableData = tmpTable
        that.downloadLoading1 = false
      }).catch(() => {
        this.downloadLoading1 = false
      })
    },
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberCastShopList.length; i++) {
        if (this.MemberCastShopList[i].ID === value) {
          return this.MemberCastShopList[i].Title
        }
      }
      return ''
    },
    value2Status (state) {
      if (state === 1) {
        return '正常'
      } else if (state === 2) {
        return '冻结'
      } else if (state === 3) {
        return '挂失'
      }
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
    handleDownload () {
      this.downloadLoading = true
      let cardTitle = ''
      for (let i = 0; i < this.MemberCardTypeList.length; i++) {
        if (this.MemberCardTypeList[i].ID === this.memberCardType) {
          cardTitle = this.MemberCardTypeList[i].Title
          break
        }
      }
      const that = this
      this.$store.dispatch('GetMemberCastList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: this.queryStartDate, endTime: this.queryEndDate, PageIndex: 1, PageSize: 100000 }).then((response) => {
        // that.pageTotal = response.PageTotal
        // that.pageIndex = response.PageNo
        // that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (response.PageNo - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d}')
          obj.tableSaleCardShop = that.returnOpencardTitle(response.listInfo[k].RealShopID)
          obj.tableCastShop = that.returnOpencardTitle(response.listInfo[k].ShopID)
          obj.tableSettleShop = response.listInfo[k].OrderCode === '' || response.listInfo[k].OrderCode === null ? '' : response.listInfo[k].PayShopTitle
          obj.tablePhone = response.listInfo[k].Mobile
          obj.tablePayMoney = response.listInfo[k].PayPrice === 0 ? '--' : '￥' + response.listInfo[k].PayPrice
          obj.tableRealPay = response.listInfo[k].RealPayPrice !== 0 ? '￥' + response.listInfo[k].RealPayPrice : '--'
          obj.tablePayZen = response.listInfo[k].FreePayPrice !== 0 ? '￥' + response.listInfo[k].FreePayPrice : '--'
          obj.tableRealRate = response.listInfo[k].RealRate !== 0 ? (response.listInfo[k].RealRate + '%') : '--'
          obj.tableLastMoney = response.listInfo[k].CurMoney === 0 ? '--' : '￥' + response.listInfo[k].CurMoney
          obj.tableRealMoney = response.listInfo[k].RealPrice !== 0 ? '￥' + response.listInfo[k].RealPrice : '--'
          obj.tableZenLast = response.listInfo[k].RealPrice !== 0 ? '￥' + response.listInfo[k].RealPrice : '--'
          obj.tableBanker = response.listInfo[k].ShowName + response.listInfo[k].AdminCode === '' || response.listInfo[k].AdminCode === null ? '' : response.listInfo[k].AdminCode
          obj.tableOrderChannel = response.listInfo[k].channel === 1 ? '店铺' : '微店'
          obj.tableOrderNum = response.listInfo[k].OrderCode === '' || response.listInfo[k].OrderCode === null ? '查账单' : response.listInfo[k].OrderCode
          tmpTable[k] = obj
        }
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '会员卡号', '客户姓名', '消费时间', '发卡门店', '消费门店', '结算门店',
            '手机号', '卡支付金额(元)', '实收支付(元)', '赠送支付(元)', '实收比例', '卡账面余额(元)', '实际余额(元)',
            '赠送余额(元)', '收银员', '下单渠道', '账单号']
          const filterVal = ['tableSerialNum', 'tableMemberCard', 'tableMemberName', 'tableCastTime',
            'tableSaleCardShop', 'tableCastShop', 'tableSettleShop', 'tablePhone', 'tablePayMoney',
            'tableRealPay', 'tablePayZen', 'tableRealRate', 'tableLastMoney', 'tableRealMoney', 'tableZenLast',
            'tableBanker', 'tableOrderChannel', 'tableOrderNum']
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
    }
  },
  data () {
    return {
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      memberCard: '',
      memberPhone: '',
      memberCardType: '',
      membershop: '',
      pageTotal: 10,
      pageIndex: 0,
      tableData: [],
      downloadLoading1: false,
      downloadLoading: false,
      dialogVisible: false,
      dialogWidth: '80%',
      sendData: {
        shopID: 0,
        OrderLCardID: 0
      },
      isCanExport: true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  // .first-row {
  //   margin-top: 10px;
  // }
  // .second-row {
  //   margin-top: 10px;
  // }
  .member-input {
    margin-top: 20px;
  }
  .member-input-content {
    width: 200px;
  }
  .member-date {
    float: left;
    margin-top: 20px;
  }
  .member-but {
    margin-left: 10px;
    margin-top: 20px;
    float: left;
  }
</style>
