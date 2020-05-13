<template>
  <div>
    <div v-if="isPermission(43)">
      <div class="member-date inline_block">
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
        <el-select v-model="id" placeholder="-请选择-">
          <el-option
            v-for="item in MemberChargeShopList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
      </div>
      <div class="inline_block">
        <el-button class="data-but" type="primary" @click="queryHandleData()" :loading="loadingview=false">统计</el-button>
        <el-button v-if="isPermission(44)" class="data-but" type="primary" @click="handleDownLoad()" :loading="loadingview2=false">导出</el-button>
      </div>
      <p style="color: red">
        （注：以上钟数统计单位为“个”）
      </p>
      <div class="table-parent">
        <el-table
          class="el-table-class"
          :data="tableData"
          border
          show-summary
          style="width: 100%"
          >
          <el-table-column
            fixed
            prop="shop_name"
            label="门店"
            width="160">
          </el-table-column>
          <el-table-column
            prop="total_clock_num"
            label="总钟数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="turn_clock_num"
            label="轮钟数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="select_clock_num"
            label="选牌数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="point_clock_num"
            label="点钟数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="call_clock_num"
            label="Call钟数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="buy_clock_num"
            label="买钟数"
            width="160">
          </el-table-column>
          <el-table-column
            prop="add_clock_num"
            label="加钟数"
            width="160">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
  </div>
</template>
<script>
import { parseTime, formatPath } from '@/utils'
export default {
  name: 'clockstatistics',
  mounted () {
    this.queryStartDate = new Date()
    this.queryStartDate.setDate(this.queryStartDate.getDate() - 1)
    this.queryHandleData()
  },
  computed: {
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  data () {
    return {
      loadingview: false,
      loadingview2: false,
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      queryStartDate: '',
      queryEndDate: new Date(),
      id: '',
      label: '',
      tableData: []
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
      this.loadingview = true
      this.$store.dispatch('queryClockStatisticData', {ShopID: this.id === '' ? 0 : this.id, BeginDate: this.queryStartDate, EndDate: this.queryEndDate}).then((response) => {
        this.loadingview = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.shop_name = this.returnOpencardTitle(element.ShopID)
          tmpObj.total_clock_num = element.TotalNum
          tmpObj.turn_clock_num = element.OrderNum
          tmpObj.select_clock_num = element.SelectNum
          tmpObj.point_clock_num = element.AppointNum
          tmpObj.call_clock_num = element.CallNum
          tmpObj.buy_clock_num = element.BuyNum
          tmpObj.add_clock_num = element.AddNum
          this.tableData.push(tmpObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    returnOpencardTitle (value) {
      for (let i = 0; i < this.MemberChargeShopList.length; i++) {
        if (this.MemberChargeShopList[i].ID === value) {
          return this.MemberChargeShopList[i].Title
        }
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
    },
    handleDownLoad () {
      this.loadingview2 = true
      this.$store.dispatch('ExportClockStatisticData', {ShopID: this.id === '' ? 0 : this.id, BeginDate: this.queryStartDate, EndDate: this.queryEndDate}).then((response) => {
        import('@/vendor/Export2Excel').then(excel => {
          excel.exprot_spec_to_excel(response.ArrayObj)
          this.loadingview2 = false
        }).catch(() => {
          this.loadingview2 = false
        })
      }).catch(() => {
        this.loadingview2 = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.member-date{
  margin-top: 10px;
  // margin-bottom: 20px;
}
.el_pagination_class{
  text-align: center;
  margin-top: 20px;
}
.table-parent{
  position: relative;
  overflow: auto;
 }
</style>
