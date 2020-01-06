<template>
  <div v-loading="loading">
    <div style="margin-left: 20px;">
      注册码
      <el-input style="width: 150px;margin-right: 50px;" type="text" v-model="para.ID" autoComplete="off" placeholder="请输入注册码"/>
      门店名称
      <el-input style="width: 150px;" type="text" v-model="para.ShopName" autoComplete="off" placeholder="请输入门店名称"/>
      <el-button class="el_search_btn" @click="clickSearch">搜索</el-button>
    </div>
    <div style="margin-left: 20;">
      <el-table
        ref="multipleTable"
        :data="shopList"
        tooltip-effect="dark"
        select-on-indeterminate="false"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="ShopCode"
          label="注册码"
        >
        </el-table-column>
        <el-table-column
          prop="Title"
          label="门店名称"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="paging_class"
        ref="bottomPagination"
        background
        layout="prev, pager, next"
        @current-change="changePageHandle"
        :current-page.sync="para.PageIndex"
        :page-size="para.PageSize"
        :total="pageTotal">
      </el-pagination>
    </div>
    <el-button class="el_save_btn" @click="clickSave">确定</el-button>
  </div>
</template>
<script>
export default {
  props: {
    shops: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.getShops()
  },
  data () {
    return {
      para: {
        PageIndex: 1,
        PageSize: 20,
        ID: '',
        ShopName: ''
      },
      pageTotal: 20,
      shopList: [],
      checkShops: [],
      loading: true
    }
  },
  methods: {
    changePageHandle () {
      this.getShops()
    },
    getShops () {
      this.loading = true
      this.$store.dispatch('queryShopsList', this.para).then((response) => {
        this.shopList = []
        this.pageTotal = response.PageTotal
        this.para.PageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.para.PageIndex
        response.listInfo.forEach(element => {
          var obj = {}
          obj.ID = element.ID
          obj.ShopCode = element.ShopCode
          obj.Title = element.Title
          this.shopList.push(obj)
        })
        this.loading = false
        this.check()
      }).catch(() => {
      })
    },
    check () {
      this.$nextTick(function () {
        this.shopList.forEach(element => {
          this.shops.forEach(element1 => {
            if (element.ID === element1.ID) {
              this.$refs.multipleTable.toggleRowSelection(element)
            }
          })
        })
      })
    },
    clickSearch () {
      this.getShops()
    },
    clickSave () {
      this.$emit('result', this.checkShops)
    },
    handleSelectionChange (selection) {
      this.checkShops = []
      this.checkShops = selection
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el_search_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  margin-left: 20px;
}
.el_save_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 150px;
  margin-bottom: 30px;
  margin-top: 50px;
}
.paging_class{
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
}
</style>
