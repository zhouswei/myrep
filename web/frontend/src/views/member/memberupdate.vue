<template>
  <div>
    <div v-if="isPermission(77)">
      <el-button v-if="isPermission(86)" class="update-but" @click="handleClick2()" type="warning">按卡类型升级</el-button>
      <div class="member-container clearfix">
        <div class="member-input">
          发卡门店:
          <el-select v-model="membershop" placeholder="-请选择-" @change="resetSelect">
            <el-option
              v-for="item in MemberCastShopList"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
        </div>
        <div class="member-input">
          单店卡类型:
          <el-select v-model="memberCardType" placeholder="-请选择-">
            <el-option
              v-for="item in specalCardTypeList[membershop]"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
        </div>
        <div class="member-input">
          会员卡号:
          <el-input class="member-input-content" v-model="memberCard" placeholder=""></el-input>
        </div>
        <div class="member-input">
          手机号:
          <el-input class="member-input-content" v-model="memberPhone" placeholder=""></el-input>
        </div>
        <div class="member-date">
          开卡日期:
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
      </div>
      <el-table
        :data="tableData"
        stripe
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tableMemberCard"
          label="会员卡号">
        </el-table-column>
        <el-table-column
          prop="tableCardType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="tableOpenCardShop"
          label="发卡门店">
        </el-table-column>
        <el-table-column
          prop="tableCardRate"
          label="卡折扣率">
        </el-table-column>
        <el-table-column
          prop="tableCardStatus"
          label="卡状态">
        </el-table-column>
        <el-table-column
          prop="tableTotalMoney"
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
          prop="tableZenLast"
          :formatter="formatfloat2StringKeep2"
          label="赠送余额(元)">
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
          prop="tableOpenCardDate"
          label="开卡日期">
        </el-table-column>
        <el-table-column
          prop="tableValiteTime"
          label="有效期">
        </el-table-column>
      </el-table>
      <el-button v-if="isPermission(87)" type="primary" plain @click="handleSelectRow()">按会员卡批量升级</el-button>
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
        title="消费入单"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p>按会员卡批量升级</p>
          </div>
          <div class="dialog-body">
            <secondmemberupdate :ListInfo="multipleSelection"></secondmemberupdate>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="消费入单"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible2"
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p>按卡类型升级</p>
          </div>
          <div class="dialog-body">
            <secondmemberupdatetype :ListInfo="multipleSelection"></secondmemberupdatetype>
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
import secondmemberupdate from '@/views/member/secondmemberupdate'// 消费入单组件
import secondmemberupdatetype from '@/views/member/secondmemberupdatetype'
import { value2Status } from '@/utils/member'
export default {
  name: 'memberupdate',
  components: { secondmemberupdate, secondmemberupdatetype },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeList
    },
    MemberCastShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  mounted () {
    this.queryStartDate = new Date()
    this.queryStartDate.setDate(this.queryStartDate.getDate() - 7)
    this.queryDataHandle(this.pageIndex)
    const _this = this
    for (var i = 0; i < this.MemberCastShopList.length; i++) {
      if (i === 0) {
        continue
      } else {
        const _i = i
        this.$store.dispatch('GetMemberCastUpdateList', {ShopID: this.MemberCastShopList[_i].ID, ReqType: 2}).then((response) => {
          _this.specalCardTypeList[_this.MemberCastShopList[_i].ID] = response.ShopCardType
        }).catch(() => {

        })
      }
    }
  },
  data () {
    return {
      queryStartDate: '',
      queryEndDate: new Date(),
      memberCard: '',
      memberPhone: '',
      memberCardType: '',
      membershop: 0,
      pageTotal: 10,
      pageIndex: 0,
      tableData: [],
      downloadLoading1: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogWidth: '80%',
      multipleSelection: [],
      specalCardTypeList: []
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
    test () {
      this.$message({
        message: 'kgsadkds<br/>dsjkfsd ',
        type: 'success',
        dangerouslyUseHTMLString: true
      })
    },
    resetSelect () {
      this.memberCardType = ''
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
    handleSelectRow () {
      if (this.multipleSelection.length > 0) {
        this.dialogVisible = true
      } else {
        this.$message({
          message: '请选中至少一张卡',
          type: 'error'
        })
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleClick (index) {
      this.dialogVisible = true
    },
    handleClick2 () {
      this.dialogVisible2 = true
    },
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    querySpecShopCardType (id) {

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
      this.$store.dispatch('GetMemberUpdateList', { cardName: cardTitle, memberCardNo: this.memberCard, phone: this.memberPhone, CardType: this.memberCardType, ShopNo: this.membershop, startTime: parseTime(this.queryStartDate === '0-0-0' ? '' : this.queryStartDate, '{y}-{m}-{d}'), endTime: parseTime(this.queryEndDate === '0-0-0' ? null : this.queryEndDate, '{y}-{m}-{d}'), PageIndex: currentIndex, PageSize: 20 }).then((response) => {
        that.pageTotal = response.PageTotal
        that.pageIndex = response.PageIndex
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        let tmpTable = []
        for (let k = 0; k < response.listInfo.length; k++) {
          let obj = {}
          obj.ShopID = response.listInfo[k].ShopID
          obj.tableSerialNum = (response.pageNo - 1) * 20 + k + 1
          obj.tableMemberCard = response.listInfo[k].CardNo
          obj.tableCardType = response.listInfo[k].UCardTypeTitle
          obj.tableOpenCardShop = response.listInfo[k].ShopTitle
          obj.tableCardRate = response.listInfo[k].Discount + '%'
          obj.tableCardStatus = value2Status(response.listInfo[k].State)
          obj.tableTotalMoney = response.listInfo[k].TotalMoney
          obj.tableTotalCast = response.listInfo[k].TotalMoney - response.listInfo[k].CurMoney - response.listInfo[k].ClearMoney
          obj.tableTotalLast = response.listInfo[k].CurMoney
          obj.tableRealLast = response.listInfo[k].RealPrice
          obj.tableZenLast = response.listInfo[k].FreeRealPrice
          obj.tableTotalCount = response.listInfo[k].Score
          obj.tableMemberName = response.listInfo[k].UserName
          obj.tableMemberPhone = response.listInfo[k].Mobile
          obj.tableOpenCardDate = parseTime(formatTimestamp(response.listInfo[k].AddDate), '{y}-{m}-{d}')
          obj.tableValiteTime = parseTime(formatTimestamp(response.listInfo[k].EndTime), '{y}-{m}-{d}')
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
  .update-but {
    margin-top: 10px;
    margin-left: 10px;
  }
  .member-container {
    margin-top: 10px;
  }
  .first-row {
    margin-top: 10px;
  }
  .second-row {
    margin-top: 10px;
  }
  .member-input-content {
    width: 200px;
  }
  .member-input-content1 {
    display: inline-block;
  }
  .member-date {
    float: left;
    margin-top: 10px;
  }
  .member-but {
    margin-left: 10px;
    margin-top: 10px;
    float: left;
  }
  .member-input {
    float: left;
    margin-left: 10px;
  }
</style>
