<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="现状统计" name="first">
        <div v-if="isPermission(37)" class="member-date">
          门店:
          <el-select v-model="membershop" placeholder="-请选择-">
            <el-option
              v-for="item in MemberCastShopList"
              :key="item.ID"
              :label="item.Title"
              :value="item.ID">
            </el-option>
          </el-select>
          <div class="inline_block">
            <el-button class="data-but" @click="queryHandleData()" :loading="loadingview1=false" type="primary">统计</el-button>
            <el-button v-if="isPermission(38)" class="data-but" @click="downloadHandleData()" :loading="loadingview2=false" type="primary">导出</el-button>
          </div>
          <el-table
            :data="tableData"
            border
            show-summary
            stripe>
            <el-table-column
              prop="tableShop"
              fixed
              label="门店">
            </el-table-column>
            <el-table-column
              prop="tableMemberTotal"
              label="总会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberNormal"
              label="正常会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberForzen"
              label="冻结会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberBack"
              label="退卡会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberOutdate"
              label="过期会员数">
            </el-table-column>
            <el-table-column
              prop="tableLeaveTotal"
              label="总卡内余额(元)">
            </el-table-column>
            <el-table-column
              prop="tableCardCount"
              label="总卡内积分">
            </el-table-column>
            <el-table-column
              prop="tableMemberSilence"
              label="沉默会员数(半年内)">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
      <el-tab-pane label="变化统计" name="second">
        <div v-if="isPermission(39)" class="member-date">
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
            <el-select v-model="membershop2" placeholder="-请选择-">
              <el-option
                v-for="item in MemberCastShopList"
                :key="item.ID"
                :label="item.Title"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
          <div class="inline_block">
            <el-button class="data-but" @click="queryHandleData2()" :loading="loadingview3=false" type="primary">统计</el-button>
            <el-button v-if="isPermission(40)" class="data-but" @click="downloadHandleData2()" :loading="loadingview4=false" type="primary">导出</el-button>
          </div>
          <el-table
            :data="tableData2"
            border
            stripe
            show-summary
            sum-text='总计'>
            <el-table-column
              prop="tableShop2"
              fixed
              label="门店">
            </el-table-column>
            <el-table-column
              prop="tableMemberAdd2"
              label="新增会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberBack2"
              label="退卡会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberChange2"
              label="换卡会员数">
            </el-table-column>
            <el-table-column
              prop="tableMemberMiss2"
              label="挂失会员数">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { parseTime, formatPath } from '@/utils'
export default {
  name: 'memberstatistics',
  computed: {
    MemberCastShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  data () {
    return {
      activeName: 'first',
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      membershop: '',
      membershop2: '',
      pageTotal: 10,
      pageIndex: 0,
      tableData: [],
      pageTotal2: 10,
      pageIndex2: 0,
      tableData2: []
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
    queryHandleData () {
      this.loadingview1 = true
      this.$store.dispatch('queryCurrentStatusData', {ShopID: this.membershop}).then((response) => {
        this.loadingview1 = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableShop = element.ShopTitle
          ListItemObj.tableMemberTotal = element.TotalCardNoCount
          ListItemObj.tableMemberNormal = element.CardNoCount1
          ListItemObj.tableMemberForzen = element.CardNoCount2
          ListItemObj.tableMemberBack = element.CardNoCount3
          ListItemObj.tableMemberOutdate = element.CardNoCount4
          ListItemObj.tableLeaveTotal = element.CurMoney
          ListItemObj.tableCardCount = element.Score
          ListItemObj.tableMemberSilence = element.LastPayCardNoCount
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview1 = false
      })
    },
    handleClick () {

    },
    downloadHandleData () {
      this.loadingview2 = true
      this.$store.dispatch('exportCurrentStatusData', {ShopID: this.membershop}).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview2 = false
        }).catch(() => {
          this.loadingview2 = false
        })
      }).catch(() => {
        this.loadingview2 = false
      })
    },
    queryHandleData2 () {
      this.loadingview3 = true
      this.$store.dispatch('queryChangeStatusData', {ShopID: this.membershop2, BeginDate: this.queryStartDate, EndDate: this.queryEndDate}).then((response) => {
        this.loadingview3 = false
        this.tableData2 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.tableShop2 = element.ShopTitle
          ListItemObj.tableMemberAdd2 = element.AddNum
          ListItemObj.tableMemberBack2 = element.CancelNum
          ListItemObj.tableMemberChange2 = element.ChangeNum
          ListItemObj.tableMemberMiss2 = element.FrozenNum
          this.tableData2.push(ListItemObj)
        })
      }).catch(() => {
        this.loadingview3 = false
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
    downloadHandleData2 () {
      this.loadingview4 = true
      this.$store.dispatch('exportChangeStatusData', {ShopID: this.membershop2, BeginDate: this.queryStartDate, EndDate: this.queryEndDate}).then((response) => {
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
  margin-top: 10px;
  margin-bottom: 20px;
  }
</style>
