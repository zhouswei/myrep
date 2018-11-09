<template>
  <div>
    <div v-if="isPermission(14)">
      <div class="head_content">
        门店:
        <el-select v-model="shopId" placeholder="-请选择-">
          <el-option
            v-for="item in MemberChargeShopList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
        姓名:
        <div class="filter-item el-input el-input--medium padding-class" style="width: 200px;">
          <el-input type="text" v-model="shawName" autocomplete="off" placeholder="请输入姓名"/>
        </div>
        手机号:
        <div class="filter-item el-input el-input--medium padding-class" style="width: 200px;">
          <el-input type="text" v-model="account" autocomplete="off" placeholder="请输入手机号"/>
        </div>
        状态:
        <el-select v-model="isLock" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.statu"
            :label="item.label"
            :value="item.statu">
          </el-option>
        </el-select>
        <el-button class="search_btn" @click="clickSearch()" :loading="loading">查询</el-button>
      </div>
      <div>
        <el-table
          class="el-table-clss"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="tech_no"
            label="工号"
            width="103">
          </el-table-column>
          <el-table-column
            class="name_link_class"
            prop="name"
            label="姓名"
            width="120">
            <template slot-scope="scope">
              <span v-if="isPermission(15)" class="name_link_class" @click="clickTech(scope.row.ID)">{{scope.row.name}}</span>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="150">
          </el-table-column>
          <el-table-column
            prop="shop"
            label="门店"
            width="174">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="83">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="83">
          </el-table-column>
          <el-table-column
            prop="classify"
            label="分类"
            width="110">
          </el-table-column>
          <el-table-column
            prop="level"
            label="等级"
            width="110">
          </el-table-column>
          <el-table-column
            prop="class"
            label="班次"
            width="110">
          </el-table-column>
          <el-table-column
              prop="work_date"
              label="入职日期"
              width="185">
          </el-table-column>
          <el-table-column
              prop="birth_place"
              label="籍贯"
              width="83">
          </el-table-column>
          <el-table-column
              prop="statu"
              label="状态"
              width="83">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          ref="bottomPagination"
          class="paging_class"
          background
          layout="prev, pager, next"
          @current-change="changePageHandle"
          :current-page.sync="pageIndex"
          :page-size="20"
          :total="pageTotal">
        </el-pagination>
      </div>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="查看技师详情"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p1 style="color: #37bfc8">查看技师详情</p1>
          </div>
          <div class="dialog-body">
            <secondTechmanager ref="secondTechmanagerRef" :ID="ID"></secondTechmanager>
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
import secondTechmanager from '@/views/shop/secondTechmanager'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
export default {
  name: 'techmanager',
  components: {secondTechmanager},
  mixins: [ResizeMixin],
  mounted () {
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '80%'
    }
  },
  data () {
    return {
      status: [{
        statu: '0',
        label: '全部'
      }, {
        statu: '1',
        label: '正常'
      }, {
        statu: '2',
        label: '禁用'
      }],
      loading: false,
      pageIndex: 1,
      pageTotal: 1,
      shopId: 0,
      shawName: '',
      account: '',
      isLock: '',
      dialogVisible: false,
      dialogWidth: '80%',
      ID: 0
    }
  },
  computed: {
    MemberChargeShopList () {
      return this.$store.getters.memberbase.membershopList
    }
  },
  created () {
    this.clickSearch()
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
    changePageHandle () {
      this.getTableData(this.pageIndex)
    },
    clickSearch () {
      this.getTableData(1)
    },
    clickTech (id) {
      this.dialogVisible = true
      this.ID = id
      this.$nextTick(() => {
        this.$refs.secondTechmanagerRef.update()
      })
    },
    getTableData (pageIndex) {
      this.loading = true
      this.$store.dispatch('queryTechListData', {ShopID: this.shopId, ShawName: this.shawName, Account: this.account, PageIndex: pageIndex, IsLock: this.isLock, PageSize: 20}).then((response) => {
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.loading = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.ID = element.ID
          ListItemObj.tech_no = element.UserCode
          ListItemObj.name = element.ShowName
          ListItemObj.phone = element.Account
          ListItemObj.shop = element.ShopName
          ListItemObj.age = element.Age
          ListItemObj.sex = element.Sex === 1 ? '男' : '女'
          ListItemObj.classify = element.ServiceTypeTitle
          ListItemObj.level = element.LevelTitle
          ListItemObj.class = element.ScheduTitle
          ListItemObj.work_date = parseTime(formatTimestamp(element.AddDate), '{y}-{m}-{d}')
          ListItemObj.birth_place = element.Origin
          ListItemObj.statu = element.IsLock ? '禁用' : '正常'
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.head_content{
  margin-top: 30px;
  margin-left: 10px;
}
element.style {
  width: 140px;
}
.el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.filter-container .filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}
.el-input--medium {
  font-size: 14px;
}
.el-table-clss{
  margin-left: 10px;
  margin-top: 20px;
}
.paging_class{
  margin-top: 20px;
  text-align: center;
}
.name_link_class{
  color: #37bfc8;
  cursor: pointer;
}
.search_btn{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  margin-left: 10px;
}
.search_btn:hover{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
.search_btn:focus{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
</style>
