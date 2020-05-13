<template>
  <div style="margin: 0 auto;width:98%;">
    <div v-if="isPermission(18)">
      <el-row class="first-row">
        <div class="inline_block">
         <span>业务类型：</span>
          <el-select v-model="businessType" placeholder="请选择">
            <el-option
              v-for="b_type in bussinessTypeOptions"
              :key="b_type.ID"
              :label="b_type.Title"
              :value="b_type.ID">
            </el-option>
          </el-select>
        </div>
        <div class="inline_block">
          操作日期:
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
        <el-button v-show="!moreInfoFlag" @click="showMoreCondition(0)" type="primary">更多条件</el-button>
        <el-button v-show="moreInfoFlag" @click="showMoreCondition(1)">收起</el-button>
      </el-row>
      <el-row class="second-row" v-show="moreInfoFlag">
        <div class="block">
          <span>卡类型/充赠规则：</span>
          <!-- 店铺 -->
          <div class="selection_component">
            <div class="selection_show" @click="toggleDrop(1)">
              <span>{{allUcardShopOptions[shopSelIndex].Title}}</span>
              <div class="arrow"></div>
            </div>
            <div class="selection_list" v-if="shopDrop">
              <div v-for="(item, index) in allUcardShopOptions" :key="index" @click="chooseSelection(item,index,1)">{{ item.Title }}</div>
            </div>
          </div>
          <!-- 卡类型 -->
          <div class="selection_component">
            <div class="selection_show" @click="toggleDrop(2)">
              <span>{{allUcardTypeOptions[typeSelIndex].Title}}</span>
              <div class="arrow"></div>
            </div>
            <div class="selection_list" v-if="typeDrop">
              <div v-for="(item, index) in allUcardTypeOptions" :key="index" @click="chooseSelection(item,index,2)">{{ item.Title }}</div>
            </div>
          </div>
          <!-- 充赠规则 -->
          <div class="selection_component">
            <div class="selection_show" @click="toggleDrop(3)">
              <span>{{allUcardRuleOptions[ruleSelIndex].Title}}</span>
              <div class="arrow"></div>
            </div>
            <div class="selection_list" v-if="ruleDrop">
              <div v-for="(item, index) in allUcardRuleOptions" :key="index" @click="chooseSelection(item,index,3)">{{ item.Title }}</div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row class="third-row" v-show="moreInfoFlag">
        <div class="inline_block">
         <span>手机号/卡号/卡内码：</span>
          <el-input class="member-input-content" v-model="phoneCode" placeholder="手机号/卡号/卡内码"></el-input>
        </div>
        <div class="inline_block">
         <span>客户姓名：</span>
          <el-input class="member-input-content" v-model="uCardUser"></el-input>
        </div>
        <div class="inline_block">
         <span>充值门店：</span>
          <el-select v-model="chargeShop" placeholder="请选择">
            <el-option
              v-for="item in chargeShopOptions"
              :key="item.ShopID"
              :label="item.Title"
              :value="item.ShopID">
            </el-option>
          </el-select>
        </div>
        <div class="inline_block">
         <span>推荐人：</span>
          <el-input class="member-input-content" v-model="referrer" placeholder="工号"></el-input>
        </div>
        <div class="inline_block">
         <span>操作人：</span>
          <el-input class="member-input-content" v-model="operator" placeholder="工号"></el-input>
        </div>
        <div class="inline_block">
         <span>操作渠道：</span>
          <el-select v-model="chargeChannel" placeholder="请选择">
            <el-option
              v-for="item in chargeChannelOptions"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
        </div>
      </el-row>
      <el-row class="fourth-row">
        <el-button class="member-but" type="primary" :loading="downloadLoading1" @click="queryDataHandle(1)">查询</el-button>
        <el-button v-if="isPermission(95)" class="member-but" type="primary" @click="downloadDataHandle()" :loading="exPLoading">导出</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        stripe>
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
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="tableCardType"
          label="卡类型">
        </el-table-column>
        <el-table-column
          prop="tableBussinessType"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="tableConfig"
          label="充赠规则">
        </el-table-column>
        <el-table-column
          prop="tableChargeMoney"
          label="充值金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableZenTotal"
          label="赠送金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableTotalMoney"
          label="充值总额(元)">
        </el-table-column>
        <el-table-column
          prop="tableItem"
          label="充次项目(次)">
        </el-table-column>
        <el-table-column
          prop="tablePayType"
          label="付款方式">
        </el-table-column>
        <el-table-column
          prop="tableSum"
          label="付款金额(元)">
        </el-table-column>
        <el-table-column
          prop="tableSaler"
          label="推荐人">
        </el-table-column>
        <el-table-column
          prop="tableOperatoioner"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="tableOperateTime"
          label="操作时间">
        </el-table-column>
        <el-table-column
          prop="tableOpenShop"
          label="开卡门店">
        </el-table-column>
        <el-table-column
          prop="tableChargeShop"
          label="充值门店">
        </el-table-column>
        <el-table-column
          prop="tableSurfaceMoney"
          label="卡账面余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealityMoney"
          label="实际余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRemainZenTotal"
          label="赠送余额(元)">
        </el-table-column>
        <el-table-column
          prop="tableRealityScale"
          label="实收比例">
        </el-table-column>
        <el-table-column
          prop="tableRemainCount"
          label="卡剩余次数">
        </el-table-column>
        <el-table-column
          prop="tableChannel"
          label="操作渠道">
        </el-table-column>
      </el-table>
      <div style="color: red; font-size:15px">
        温馨提示：本表包括会员开卡，撤销开卡、会员充值/充次、撤销充值/充次的记录；
      </div>
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
  </div>
</template>
<script>
// import { parseTime, formatTimestamp, formatPath } from '@/utils'
import { parseTime, formatPath } from '@/utils'
import { Message } from 'element-ui'
export default {
  name: 'cardchargerecord',
  computed: {
    MemberCardTypeList () {
      // (JSON.stringify(this.$store.getters.memberbase.memberTypeList))
      return this.$store.getters.memberbase.memberTypeList
    },
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  mounted () {
    this.queryAllOptions()
  },
  methods: {
    queryAllOptions () {
      this.downloadLoading1 = true
      this.$store.dispatch('GetAllMemberTypeIndex', {}).then((response) => {
        this.bussinessTypeOptions = response.BusinessTypes
        this.pageTotal = response.RowCount
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        let tmpTable = []
        this.SumFillItems = response.SumFillItems
        this.SumFillPrice = response.SumFillPrice
        this.SumFillTotalPrice = response.SumFillTotalPrice
        this.SumFreePrice = response.SumFreePrice
        this.SumPayPrice = response.SumPayPrice
        for (let k = 0; k < response.ListInfos.length; k++) {
          let obj = {}
          obj.tableMemberCard = response.ListInfos[k].CardNo
          obj.tableMemberName = response.ListInfos[k].UserName
          obj.tableMemberNum = response.ListInfos[k].Mobile
          obj.tableCardType = response.ListInfos[k].UCardType
          obj.tableBussinessType = response.ListInfos[k].BusinessType
          obj.tableConfig = response.ListInfos[k].FillConfigTitle
          obj.tableChargeMoney = response.ListInfos[k].FillPrice
          obj.tableZenTotal = response.ListInfos[k].FreePrice
          obj.tableTotalMoney = response.ListInfos[k].FillTotalPrice
          obj.tableItem = response.ListInfos[k].FillTimesItems
          obj.tablePayType = response.ListInfos[k].PayType
          obj.tableSum = response.ListInfos[k].PayPrice
          obj.tableSaler = response.ListInfos[k].SaleCode
          obj.tableOperatoioner = response.ListInfos[k].AdminCode
          obj.tableOperateTime = response.ListInfos[k].AddTime
          obj.tableOpenShop = response.ListInfos[k].OpenShopTitle
          obj.tableChargeShop = response.ListInfos[k].FillShopTitle
          obj.tableSurfaceMoney = response.ListInfos[k].CurMoney
          obj.tableRealityMoney = response.ListInfos[k].RealPrice
          obj.tableRemainZenTotal = response.ListInfos[k].FreeRealPrice
          obj.tableRealityScale = response.ListInfos[k].Rate
          obj.tableRemainCount = response.ListInfos[k].RemainTimes
          obj.tableChannel = response.ListInfos[k].Channel
          tmpTable[k] = obj
        }
        this.tableData = tmpTable
        this.downloadLoading1 = false
      })
    },
    queryMoreCondition () {
      this.$store.dispatch('GetAllMemberTypeList', {}).then((response) => {
        this.chargeChannelOptions = response.Channels
        this.chargeShopOptions = response.FillShops
        this.allUcardShopOptions = response.UCardShops
      })
    },
    queryChargeAndChannel (shopId) {
      this.$store.dispatch('GetAllMemberShopList', {shopid: shopId}).then((response) => {
        this.typeSelIndex = 0
        this.ruleSelIndex = 0
        this.allUcardRule = 0
        this.allUcardType = 0
        this.allUcardTypeOptions = response.CardTypes
        this.allUcardRuleOptions = response.FillConfigs
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
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    queryDataHandle (currentIndex) {
      this.downloadLoading1 = true
      var resParam = {}
      resParam.Page = currentIndex
      resParam.PageSize = 20
      resParam.BusinessType = this.businessType
      resParam.BeginDate = parseTime(this.queryStartDate === '0-0-0' ? '' : this.queryStartDate, '{y}-{m}-{d}')
      resParam.EndDate = parseTime(this.queryEndDate === '0-0-0' ? null : this.queryEndDate, '{y}-{m}-{d}')
      resParam.UCardShopID = this.allUcardShop
      resParam.UCardTypeID = this.allUcardType
      resParam.UCardFillConfigID = this.allUcardRule
      resParam.CardNoOrMobileOrMappingCode = this.phoneCode
      resParam.UCardUserName = this.uCardUser
      resParam.FillShopID = this.chargeShop
      resParam.SaleCode = this.referrer
      resParam.AdminCode = this.operator
      resParam.ChannelID = this.chargeChannel
      this.$store.dispatch('GetMemberRecordList', resParam).then((response) => {
        this.pageTotal = response.RowCount
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        let tmpTable = []
        this.SumFillItems = response.SumFillItems
        this.SumFillPrice = response.SumFillPrice
        this.SumFillTotalPrice = response.SumFillTotalPrice
        this.SumFreePrice = response.SumFreePrice
        this.SumPayPrice = response.SumPayPrice
        for (let k = 0; k < response.ListInfos.length; k++) {
          let obj = {}
          obj.tableMemberCard = response.ListInfos[k].CardNo
          obj.tableMemberName = response.ListInfos[k].UserName
          obj.tableMemberNum = response.ListInfos[k].Mobile
          obj.tableCardType = response.ListInfos[k].UCardType
          obj.tableBussinessType = response.ListInfos[k].BusinessType
          obj.tableConfig = response.ListInfos[k].FillConfigTitle
          obj.tableChargeMoney = response.ListInfos[k].FillPrice
          obj.tableZenTotal = response.ListInfos[k].FreePrice
          obj.tableTotalMoney = response.ListInfos[k].FillTotalPrice
          obj.tableItem = response.ListInfos[k].FillTimesItems
          obj.tablePayType = response.ListInfos[k].PayType
          obj.tableSum = response.ListInfos[k].PayPrice
          obj.tableSaler = response.ListInfos[k].SaleCode
          obj.tableOperatoioner = response.ListInfos[k].AdminCode
          obj.tableOperateTime = response.ListInfos[k].AddTime
          obj.tableOpenShop = response.ListInfos[k].OpenShopTitle
          obj.tableChargeShop = response.ListInfos[k].FillShopTitle
          obj.tableSurfaceMoney = response.ListInfos[k].CurMoney
          obj.tableRealityMoney = response.ListInfos[k].RealPrice
          obj.tableRemainZenTotal = response.ListInfos[k].FreeRealPrice
          obj.tableRealityScale = response.ListInfos[k].Rate
          obj.tableRemainCount = response.ListInfos[k].RemainTimes
          obj.tableChannel = response.ListInfos[k].Channel
          tmpTable[k] = obj
        }
        this.tableData = tmpTable
        this.downloadLoading1 = false
      }).catch(() => {
        this.downloadLoading1 = false
      })
    },
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberChargeShopList.length; i++) {
        if (this.MemberChargeShopList[i].ID === value) {
          return this.MemberChargeShopList[i].Title
        }
      }
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
    showMoreCondition (type) {
      this.moreInfoFlag = !this.moreInfoFlag
      if (type === 0) {
        this.queryMoreCondition()
      }
    },
    toggleDrop (dropIndex) {
      switch (dropIndex) {
        case 1:
          this.shopDrop = !this.shopDrop
          break
        case 2:
          if (this.allUcardShop === 0) {
            Message({
              message: '请先选择前面的店铺',
              type: 'error',
              duration: 5 * 1000,
              dangerouslyUseHTMLString: true
            })
            this.typeDrop = false
          } else {
            this.typeDrop = !this.typeDrop
          }
          break
        case 3:
          if (this.allUcardShop === 0) {
            Message({
              message: '请先选择前面的店铺',
              type: 'error',
              duration: 5 * 1000,
              dangerouslyUseHTMLString: true
            })
            this.ruleDrop = false
          } else {
            this.ruleDrop = !this.ruleDrop
          }
          break
        default:
          break
      }
    },
    chooseSelection (item, index, selIndex) {
      switch (selIndex) {
        case 1:
          this.allUcardShop = item.ShopID
          this.shopSelIndex = index
          this.shopDrop = false
          this.queryChargeAndChannel(item.ShopID)
          if (this.allUcardShop === 0) {
            this.typeDrop = false
            this.ruleDrop = false
          } else {
            this.typeDrop = true
            this.ruleDrop = true
          }
          break
        case 2:
          this.allUcardType = item.ID
          this.typeSelIndex = index
          this.typeDrop = false
          break
        case 3:
          this.allUcardRule = item.ID
          this.ruleSelIndex = index
          this.ruleDrop = false
          break
        default:
          break
      }
    },
    getSummaries (param) {
      const sums = []
      sums[0] = '合计'
      sums[6] = this.SumFillPrice
      sums[7] = this.SumFreePrice
      sums[8] = this.SumFillTotalPrice
      sums[9] = this.SumFillItems
      sums[11] = this.SumPayPrice
      return sums
    },
    downloadDataHandle () {
      this.exPLoading = true
      var resParam = {}
      resParam.Page = 1
      resParam.PageSize = 20
      resParam.BusinessType = this.businessType
      resParam.BeginDate = parseTime(this.queryStartDate === '0-0-0' ? '' : this.queryStartDate, '{y}-{m}-{d}')
      resParam.EndDate = parseTime(this.queryEndDate === '0-0-0' ? null : this.queryEndDate, '{y}-{m}-{d}')
      resParam.UCardShopID = this.allUcardShop
      resParam.UCardTypeID = this.allUcardType
      resParam.UCardFillConfigID = this.allUcardRule
      resParam.CardNoOrMobileOrMappingCode = this.phoneCode
      resParam.UCardUserName = this.uCardUser
      resParam.FillShopID = this.chargeShop
      resParam.SaleCode = this.referrer
      resParam.AdminCode = this.operator
      resParam.ChannelID = this.chargeChannel
      this.$store.dispatch('ExMemberRecordList', resParam).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.exPLoading = false
        }).catch(() => {
          this.exPLoading = false
        })
      }).catch(() => {
        this.exPLoading = false
      })
    }
  },
  data () {
    return {
      downloadLoading1: false,
      exPLoading: false,
      pageTotal: 10,
      pageIndex: 0,
      tableData: [],
      businessType: 0,
      bussinessTypeOptions: [], // 业务类型选项
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      allUcardShop: 0,
      allUcardShopOptions: [{ShopID: 0, Title: '全部店铺'}], // 卡门店选项
      allUcardType: 0,
      allUcardTypeOptions: [{ID: 0, Title: '全部卡类型'}], // 卡类型选项
      allUcardRule: 0,
      allUcardRuleOptions: [{ID: 0, Title: '全部充赠规则'}], // 充赠规则选项
      memberCard: '',
      membershop: '',
      phoneCode: '',
      uCardUser: '',
      referrer: '',
      operator: '',
      chargeShop: 0,
      chargeShopOptions: [], // 充值门店选项
      chargeChannel: 0,
      chargeChannelOptions: [], // 操作渠道选项
      moreInfoFlag: false,
      shopDrop: false,
      shopSelIndex: 0,
      typeDrop: false,
      typeSelIndex: 0,
      ruleDrop: false,
      ruleSelIndex: 0,
      SumFillItems: 0,
      SumFillPrice: 0,
      SumFillTotalPrice: 0,
      SumFreePrice: 0,
      SumPayPrice: 0,
      exPLoadingq: false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .first-row {
    margin-top: 10px;
  }
  .second-row{
    margin: 3px 0 6px;
  }
  .member-input-content {
    width: 200px;
  }
  .member-date {
    float: left;
    margin-top: 20px;
  }
  .selection_component {
    position: relative;
    display: inline-block;
    .selection_show {
      border: 1px solid #e3e3e3;
      padding: 0 20px 0 10px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      border-radius: 3px;
      background: #fff;
      width: 220px;
      .arrow {
        display: inline-block;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #e3e3e3;
        width: 0;
        height: 0;
        margin-top: -1px;
        margin-left: 6px;
        margin-right: -14px;
        vertical-align: middle;
      }
    }
    .selection_list {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 35px;
      width: 100%;
      background: #fff;
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      z-index: 5;
      &>div{
        padding: 5px 15px 5px 10px;
        border-left: 1px solid #e3e3e3;
        border-right: 1px solid #e3e3e3;
        cursor: pointer;
        background: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &>div:hover{
        background: #e3e3e3;
      }
    }
  }
</style>
