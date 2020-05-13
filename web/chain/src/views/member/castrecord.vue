<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="储值消费" name="first">
        <div v-if="isPermission(20)">
          <el-row class="first-row">
            <div class="inline_block">
              会员卡号:
              <el-input class="member-input-content" v-model="memberCard" placeholder=""></el-input>
            </div>
            <div class="inline_block">
              手机号:
              <el-input class="member-input-content" v-model="memberPhone" placeholder=""></el-input>
            </div>
            <div class="inline_block">
              卡类型:
              <el-select v-model="mCardTypeShop" @change="queryCardTypeOptions($event,'储值')" placeholder="全部">
                <el-option
                  v-for="item in mCardTypeShopOptions"
                  :key="item.ShopID"
                  :label="item.Title"
                  :value="item.ShopID">
                </el-option>
              </el-select>
              <el-select v-model="mCardType" placeholder="全部">
                <el-option
                  v-for="item in mCardTypeOptions"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
              <!-- <el-select v-model="memberCardType" placeholder="-请选择-">
                <el-option
                  v-for="item in MemberCardTypeList"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select> -->
            </div>
            <div class="inline_block">
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
          </el-row>
          <el-row class="second-row">
              <div class="inline_block">
                消费日期:
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
              <el-button v-if="isPermission(88)" class="member-but" type="primary" @click="handleDownload()" :loading="downloadLoading">导出</el-button>
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
              fixed="right"
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
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <el-tab-pane label="计次消费" name="second">
        <div v-if="isPermission(20)">
          <el-row class="first-row">
            <div class="inline_block">
              手机号/卡号/卡内码:
              <el-input class="member-input-content" v-model="mobileUCardCode" placeholder="手机号/卡号/卡内码"></el-input>
            </div>
            <div class="inline_block">
              卡类型:
              <el-select v-model="uCardTypeShop" @change="queryCardTypeOptions($event,'计次')" placeholder="全部">
                <el-option
                  v-for="item in uCardTypeShopOptions"
                  :key="item.ShopID"
                  :label="item.Title"
                  :value="item.ShopID">
                </el-option>
              </el-select>
              <el-select v-model="uCardType" placeholder="全部">
                <el-option
                  v-for="item in uCardTypeOptions"
                  :key="item.ID"
                  :label="item.Title"
                  :value="item.ID">
                </el-option>
              </el-select>
            </div>
            <div class="inline_block">
              客人名称:
              <el-input class="member-input-content" v-model="cardUser" placeholder=""></el-input>
            </div>
            <div class="inline_block">
              项目名称:
              <el-input class="member-input-content" v-model="serviceTitle" placeholder=""></el-input>
            </div>
            <div class="inline_block">
                消费日期:
                <el-date-picker
                  v-model="queryConsumeStartDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <span class="data_line">~</span>
              <div class="inline_block">
                <el-date-picker
                  v-model="queryConsumeEndDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              消费门店:
              <el-select v-model="consumeShop" placeholder="全部">
                <el-option
                  v-for="item in consumeShopOptions"
                  :key="item.ShopID"
                  :label="item.Title"
                  :value="item.ShopID">
                </el-option>
              </el-select>
              <el-button class="member-but" type="primary" @click="queryDataCountHandle(1)" :loading="downloadLoading2">查询</el-button>
              <el-button v-if="isPermission(88)" class="member-but" type="primary" @click="handleCountDownload()" :loading="downloadLoading3">导出</el-button>
          </el-row>
          <el-table
            :data="countTableData"
            border>
            <el-table-column
              prop="tableMemberCard"
              label="会员卡号">
            </el-table-column>
            <el-table-column
              prop="tableMemberName"
              label="客户姓名">
            </el-table-column>
            <el-table-column
              prop="tableMemberNum"
              label="手机号码">
            </el-table-column>
            <el-table-column
              prop="tableCastTime"
              label="消费时间">
            </el-table-column>
            <el-table-column
              prop="tableItemTile"
              label="项目名称">
            </el-table-column>
            <el-table-column
              prop="tableDeduCount"
              label="扣除次数">
            </el-table-column>
            <el-table-column
              prop="tableOriPrice"
              label="原价（元）">
            </el-table-column>
            <el-table-column
              prop="tableSumPrice"
              label="折后总价（元）">
            </el-table-column>
            <el-table-column
              prop="tableDiscount"
              label="次卡优惠(元)">
            </el-table-column>
            <el-table-column
              prop="tableChannel"
              label="下单渠道(元)">
            </el-table-column>
            <el-table-column
              prop="tableconsume"
              label="消费门店">
            </el-table-column>
            <el-table-column
              prop="OrderLCardID"
              label="操作"
              min-width="100px">
              <template slot-scope="scope">
                <el-button v-if="isPermission(21)"  @click="handleClick(scope.row)" type="text" size="small">查看账单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="text-align: center"
            ref="bottomPagination"
            layout="prev, pager, next"
            background
            @current-change="changePageCountHandle"
            :current-page.sync="countPageIndex"
            :page-size="20"
            :total="countPageTotal">
          </el-pagination>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
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
    </el-tabs>
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
    this.queryAllOptions()
    this.queryDataCountHandle(1)
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
    queryAllOptions () {
      this.$store.dispatch('GetCountAllShopData', {}).then((response) => {
        this.mCardTypeShopOptions = response.UCardShops
        this.uCardTypeShopOptions = response.UCardShops
        this.consumeShopOptions = response.UCardShops
      })
    },
    queryCardTypeOptions (shopId, type) {
      this.$store.dispatch('GetAllMemberShopList', {shopid: shopId}).then((response) => {
        if (type === '计次') {
          this.uCardTypeOptions = response.CardTypes
          this.uCardType = 0
        } else {
          this.mCardTypeOptions = response.CardTypes
          this.mCardType = 0
        }
      })
    },
    queryDataCountHandle (currentIndex) {
      this.downloadLoading2 = true
      let resParam = {}
      const pageSize = 20
      resParam.PageIndex = currentIndex
      resParam.PageSize = pageSize
      resParam.MobileUCardCode = this.mobileUCardCode
      resParam.IsPageClick = 1
      resParam.UCardType = this.uCardType
      resParam.UCardShopId = this.uCardTypeShop
      resParam.UCardName = this.cardUser
      resParam.ServiceTitle = this.serviceTitle
      resParam.BeginTime = parseTime(this.queryConsumeStartDate === '0-0-0' ? null : this.queryConsumeStartDate, '{y}-{m}-{d}')
      resParam.EndTime = parseTime(this.queryConsumeEndDate === '0-0-0' ? null : this.queryConsumeEndDate, '{y}-{m}-{d}')
      resParam.ShopID = this.consumeShop
      this.$store.dispatch('GetCountConsumeData', resParam).then((response) => {
        this.countPageTotal = response.PageTotal
        this.$refs.bottomPagination.lastEmittedPage = currentIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.shopID = response.listInfo[k].ShopID
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableMemberNum = response.listInfo[k].Mobile
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          obj.tableItemTile = response.listInfo[k].ServiceTitle
          obj.tableDeduCount = response.listInfo[k].ChangeTimes
          obj.tableOriPrice = response.listInfo[k].SalePrice
          obj.tableSumPrice = response.listInfo[k].DisPrice
          obj.tableDiscount = response.listInfo[k].Timespreferential
          obj.tableChannel = response.listInfo[k].ChannelName
          obj.tableconsume = response.listInfo[k].ShopName
          obj.OrderLCardID = response.listInfo[k].OrderLCardID
          tmpTable[k] = obj
        }
        this.countTableData = tmpTable
        this.downloadLoading2 = false
      }).catch(() => {
        this.downloadLoading2 = false
      })
    },
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
    changePageCountHandle () {
      this.queryDataCountHandle(this.countPageIndex)
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
      this.$store.dispatch('GetMemberCastList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, UcardShopId: this.mCardTypeShop, CardType: this.mCardType, ShopNo: this.membershop, startTime: this.queryStartDate, endTime: this.queryEndDate, PageIndex: currentIndex, PageSize: 20 }).then((response) => {
        that.pageTotal = response.PageTotal
        that.pageIndex = response.PageNo
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (that.pageIndex - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
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
          obj.tableZenLast = response.listInfo[k].FreeRealPrice !== 0 ? '￥' + response.listInfo[k].FreeRealPrice : '--'
          obj.tableBanker = response.listInfo[k].ShowName + ((response.listInfo[k].AdminCode === '' || response.listInfo[k].AdminCode === null) ? '' : '(' + response.listInfo[k].AdminCode + ')')
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
      this.$store.dispatch('GetMemberCastList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, UcardShopId: this.mCardTypeShop, CardType: this.mCardType, ShopNo: this.membershop, startTime: this.queryStartDate, endTime: this.queryEndDate, PageIndex: 1, PageSize: 100000 }).then((response) => {
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableSerialNum = (response.PageNo - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
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
          obj.tableZenLast = response.listInfo[k].FreeRealPrice !== 0 ? '￥' + response.listInfo[k].FreeRealPrice : '--'
          obj.tableBanker = response.listInfo[k].ShowName + ((response.listInfo[k].AdminCode === '' || response.listInfo[k].AdminCode === null) ? '' : '(' + response.listInfo[k].AdminCode + ')')
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
    },
    handleCountDownload () {
      this.downloadLoading3 = true
      let resParam = {}
      resParam.PageIndex = 1
      resParam.PageSize = 10000
      resParam.MobileUCardCode = this.mobileUCardCode
      resParam.IsPageClick = 1
      resParam.UCardType = this.uCardType
      resParam.UCardShopId = this.uCardTypeShop
      resParam.UCardName = this.cardUser
      resParam.ServiceTitle = this.serviceTitle
      resParam.BeginTime = parseTime(this.queryConsumeStartDate === '0-0-0' ? null : this.queryConsumeStartDate, '{y}-{m}-{d}')
      resParam.EndTime = parseTime(this.queryConsumeEndDate === '0-0-0' ? null : this.queryConsumeEndDate, '{y}-{m}-{d}')
      resParam.ShopID = this.consumeShop
      this.$store.dispatch('GetCountConsumeData', resParam).then((response) => {
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableMemberNum = response.listInfo[k].Mobile
          obj.tableCastTime = parseTime(formatTimestamp(response.listInfo[k].AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          obj.tableItemTile = response.listInfo[k].ServiceTitle
          obj.tableDeduCount = response.listInfo[k].ChangeTimes
          obj.tableOriPrice = response.listInfo[k].SalePrice
          obj.tableSumPrice = response.listInfo[k].DisPrice
          obj.tableDiscount = response.listInfo[k].Timespreferential
          obj.tableChannel = response.listInfo[k].ChannelName
          obj.tableconsume = response.listInfo[k].ShopName
          tmpTable[k] = obj
        }
        // this.countTableData = tmpTable
        this.downloadLoading3 = false
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['会员卡号', '客户姓名', '手机号码', '消费时间', '项目名称', '扣除次数', '原价（元）',
            '折后总价（元）', '次卡优惠(元)', '下单渠道(元)', '消费门店']
          const filterVal = ['tableMemberCard', 'tableMemberName', 'tableMemberNum', 'tableCastTime',
            'tableItemTile', 'tableDeduCount', 'tableOriPrice', 'tableSumPrice', 'tableDiscount',
            'tableChannel', 'tableconsume']
          const list = tmpTable
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data: data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })
          this.downloadLoading3 = false
        }).catch(() => {
          this.downloadLoading3 = false
        })
      }).catch(() => {
        this.downloadLoading3 = false
      })
    },
    tabHandleClick () {
      console.log(111)
    }
  },
  data () {
    return {
      activeName: 'first',
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
      downloadLoading2: false,
      downloadLoading: false,
      downloadLoading3: false,
      dialogVisible: false,
      dialogWidth: '80%',
      sendData: {
        shopID: 0,
        OrderLCardID: 0
      },
      isCanExport: true,
      countPageTotal: 10,
      countPageIndex: 0,
      countTableData: [],
      mobileUCardCode: '',
      mCardType: 0,
      mCardTypeOptions: [{ID: 0, Title: '全部卡类型'}],
      mCardTypeShop: 0,
      mCardTypeShopOptions: [],
      uCardType: 0,
      uCardTypeOptions: [{ID: 0, Title: '全部卡类型'}],
      uCardTypeShop: 0,
      uCardTypeShopOptions: [],
      cardUser: '',
      serviceTitle: '',
      queryConsumeStartDate: new Date(),
      queryConsumeEndDate: new Date(),
      consumeShop: '',
      consumeShopOptions: ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .first-row {
    margin-top: 10px;
  }
  // .second-row {
  //   margin-top: 10px;
  // }
  .member-input {
    // margin-top: 20px;
  }
  .member-input-content {
    width: 200px;
  }
  .member-date {
    float: left;
    margin-top: 20px;
  }
  .member-but {
    // margin-left: 10px;
    margin-top: 10px;
    // float: left;
  }
</style>
