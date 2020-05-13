<template>
  <div>
    会员卡号：
    <el-input class="input_class" v-model="memberCardNo"  type="text" autocomplete="off" placeholder="请输入会员卡号"/>
    <el-button class="search_btn" @click="clickSearch()" :loading="loading">查询</el-button>
    <el-table
      class="el-table-class"
      :data="tableData"
      border
      style="width: 100%; margin-top: 15px;"
      >
      <el-table-column
        fixed
        prop="card_no"
        label="会员卡号"
        >
      </el-table-column>
      <el-table-column
        prop="pre_card_type"
        label="升级前卡类型"
        >
      </el-table-column>
      <el-table-column
        prop="dis_card_shop"
        label="发卡门店"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        >
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px;"
      ref="bottomPagination"
      layout="prev, pager, next"
      background
      @current-change="changePageHandle"
      :current-page.sync="pageIndex"
      :page-size="20"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    senddata: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: [],
      memberCardNo: '',
      loading: false,
      pageIndex: 1,
      pageTotal: 10,
      pageSize: 20
    }
  },
  methods: {
    update () {
      this.memberCardNo = ''
      this.getTableData(1)
    },
    clickSearch () {
      this.getTableData(1)
    },
    getTableData () {
      this.loading = true
      this.$store.dispatch('queryUpgradedCardDetail', {
        CardNo: this.memberCardNo,
        ShopID: 0,
        BatchNo: this.senddata.BatchNo,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then((response) => {
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.loading = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var ItemObj = {}
          ItemObj.card_no = element.CardNo
          ItemObj.pre_card_type = element.UCardTypeTitle
          ItemObj.dis_card_shop = element.ShopTitle
          ItemObj.phone = element.Mobile
          this.tableData.push(ItemObj)
        })
      }).catch(() => {
      })
    },
    changePageHandle () {
      this.getTableData(this.pageIndex)
    }
  }
}
</script>

<style>
.input_class{
  width: 180px;
}
</style>
