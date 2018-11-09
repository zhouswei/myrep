<template>
  <div>
    <div>
      <el-tabs v-model="activeName">
      <el-tab-pane label="有效门店" name="first">
        <div v-if="isPermission(2)">
          <div>
            <el-button v-if="isPermission(1)" class="add_btn" @click="addValShop()"> +新增门店</el-button>
            <div style="border-left:1px solid #e0e0e0;height:34px;margin-left:30px;display:inline-block;vertical-align:middle;padding-left:30px;">
            </div>
            注册码
            <el-input style="width: 150px;" type="text" v-model="regisCode" autoComplete="off" placeholder="请输入注册码"/>
            门店名称
            <el-input style="width: 150px;" type="text" v-model="shopName" autoComplete="off" placeholder="请输入门店名称"/>
            门店状态
            <el-select class="statu_select" v-model="shopState" placeholder="全部">
              <el-option
                v-for="item in options"
                :key="item.shopStatu"
                :label="item.label"
                :value="item.shopStatu">
              </el-option>
            </el-select>
            <el-button class="search_btn" @click="clickSearch()" :loading="loading">查询</el-button>
          </div>
            <el-table
              :data="tableData"
              border
              style="magin-top=50px ;matwidth: 100%">
            <el-table-column
              fixed
              prop="regisCode"
              label="注册码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="门店名称"
              width="200">
              <template slot-scope="scope">
                <span v-if="isPermission(4)" class="name_link_class" @click="clickShop(scope.row.ID)">{{scope.row.shopName}}</span>
                <span v-else>{{scope.row.shopName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="contacts"
              label="联系人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              width="150">
            </el-table-column>
            <el-table-column
              prop="shop_type"
              label="门店类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="account_num"
              label="账户数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="message_num"
              label="短信数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="useful_date"
              label="有效期"
              width="200">
            </el-table-column>
              <el-table-column
              prop="regis_date"
              label="注册时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="statu"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button v-if="isPermission(3)" @click="clickChangeShop(scope.row.ID)" type="text" size="small">修改</el-button>
                <el-button v-if="isPermission(5)" @click="stopUseValShop(scope.row.ID, scope.row.isClose, scope.row.stateOption)" type="text" size="small">{{scope.row.stateOption}}</el-button>
              </template>
            </el-table-column>
            </el-table>
          <el-pagination
            ref="bottomPagination"
            style="text-align: center"
            background
            layout="prev, pager, next"
            @current-change="changePageHandle"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            :total="pageTotal">
          </el-pagination>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="查看门店"
            ref="dialog_wrapper"
            :visible.sync="dialogVisible"
            :width="dialogWidth"
            :modal-append-to-body='false'
            :close-on-click-modal="false">
              <div slot="title">
                <p style="color: #37bfc8">查看门店</p>
              </div>
              <div class="dialog-body">
                <secValShopmanaShopInfo ref="secValShopmanaShopInfoRef" :ID="ID"></secValShopmanaShopInfo>
                <div
                  class="line"
                  v-dialogDragWidth="$refs.dialog_wrapper">
                </div>
              </div>
          </el-dialog>
          <el-dialog
            class="dialog-container"
            title="修改门店"
            ref="dialog_wrapper"
            :visible.sync="changeShopdialogVisible"
            :width="dialogWidth"
            :modal-append-to-body='false'
            :close-on-click-modal="false">
              <div slot="title">
                <p style="color: #37bfc8">修改门店</p>
              </div>
              <div class="dialog-body">
                <changeShop @close ="closeChangeShopDialog" ref="changeShopRef" :ID="ID"></changeShop>
                <div
                  class="line"
                  v-dialogDragWidth="$refs.dialog_wrapper">
                </div>
              </div>
          </el-dialog>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="新增门店"
            ref="dialog_wrapper"
            :modal-append-to-body='false'
            :visible.sync="AddValShopdialogVisible"
            :width="dialogWidth"
            >
              <div slot="title">
                <p style="color: #37bfc8">新增门店</p>
              </div>
              <div class="dialog-body">
                <secValShopmanaAddShop ref="secValShopmanaAddShopRef" v-on:close="closeSecValShopmanaAddShop"></secValShopmanaAddShop>
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
      </el-tab-pane>
      <el-tab-pane label="待审门店" name="second">
        <div v-if="isPermission(8)">
          <div>
            <el-button v-if="isPermission(7)" class="add_btn" @click="addValShop1()"> +新增门店</el-button>
            <div style="border-left:1px solid #e0e0e0;height:34px;margin-left:30px;display:inline-block;vertical-align:middle;padding-left:30px;">
            </div>
            门店名称
            <el-input style="width: 150px;" type="text" v-model="shopName1" autoComplete="off" placeholder="请输入门店名称"/>
            门店状态
            <el-select class="statu_select" v-model="shopState1" placeholder="全部">
              <el-option
                v-for="item in options1"
                :key="item.shopStatu"
                :label="item.label"
                :value="item.shopStatu">
              </el-option>
            </el-select>
            <el-button class="search_btn" @click="clickSearch1()" :loading="loading1">查询</el-button>
          </div>
            <el-table
              :data="tableData1"
              border
              style="magin-top=50px ;matwidth: 100%">
            <el-table-column
              prop="shopNameUnCheck"
              label="门店名称"
              width="200">
              <template slot-scope="scope">
                <span v-if="isPermission(9)" class="name_link_class" @click="clickShop1(scope.row.ID1)">{{scope.row.shopNameUnCheck}}</span>
                <span v-else>{{scope.row.shopNameUnCheck}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="contactsUnCheck"
              label="联系人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phoneUnCheck"
              label="手机"
              width="150">
            </el-table-column>
            <el-table-column
              prop="shpe_typeUnCheck"
              label="门店类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="accountNumUnCheck"
              label="短信数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="messageNumUnCheck"
              label="账户数"
              width="100">
            </el-table-column>
            <el-table-column
              prop="usefulDateUnCheck"
              label="有效期"
              width="200">
            </el-table-column>
              <el-table-column
              prop="regisDateUnCheck"
              label="注册时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="statuUnCheck"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isResubmit" @click="resubmit(scope.row.ID1)" type="text" size="small">重新提交</el-button>
                <el-button v-if="scope.row.isDel" @click="delPenShop(scope.row.ID1, scope.row.isClose)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
          <el-pagination
            style="text-align: center"
            ref="bottomPagination1"
            layout="prev, pager, next"
            background
            @current-change="changePageHandle1"
            :current-page.sync="pageIndex1"
            :page-size="20"
            :total="pageTotal1">
          </el-pagination>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="查看门店"
            ref="dialog_wrapper"
            :modal-append-to-body='false'
            :visible.sync="dialogVisible1"
            :width="dialogWidth"
            :close-on-click-modal="false">
              <div slot="title">
                <p style="color: #37bfc8">查看门店</p>
              </div>
              <div class="dialog-body">
                <secPenShopmanaShopInfo ref="secPenShopmanaShopInfoRef" :ID1="ID1"></secPenShopmanaShopInfo>
                <div
                  class="line"
                  v-dialogDragWidth="$refs.dialog_wrapper">
                </div>
              </div>
          </el-dialog>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="新增门店"
            ref="dialog_wrapper"
            :modal-append-to-body='false'
            :visible.sync="AddPenShopdialogVisible"
            :width="dialogWidth"
            >
              <div slot="title">
                <p style="color: #37bfc8">新增门店</p>
              </div>
              <div class="dialog-body">
                <secPenShopmanaAddShop ref="secPenShopmanaAddShopRef" v-on:close="closeSecPenShopmanaAddShop"></secPenShopmanaAddShop>
                <div
                  class="line"
                  v-dialogDragWidth="$refs.dialog_wrapper">
                </div>
              </div>
          </el-dialog>
          <el-dialog
            class="dialog-container"
            v-dialogDrag
            title="重新提交"
            ref="dialog_wrapper"
            :modal-append-to-body='false'
            :visible.sync="resubmitDialog"
            :width="dialogWidth"
            >
              <div slot="title">
                <p style="color: #37bfc8">重新提交</p>
              </div>
              <div class="dialog-body">
                <resubmit @close ="closeResubmitDialog" ref="resubmitRef" :ID="ID1"></resubmit>
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
      </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTimestamp, formatPath } from '@/utils'
import secValShopmanaShopInfo from '@/views/shop/secValShopmanaShopInfo'
import secValShopmanaAddShop from '@/views/shop/secValShopmanaAddShop'
import secPenShopmanaAddShop from '@/views/shop/secPenShopmanaAddShop'
import secPenShopmanaShopInfo from '@/views/shop/secPenShopmanaShopInfo'
import resubmit from '@/views/shop/resubmit'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import changeShop from '@/views/shop/changeShop'
export default {
  name: 'shopmanager',
  components: {secValShopmanaShopInfo, secValShopmanaAddShop, secPenShopmanaShopInfo, changeShop, secPenShopmanaAddShop, resubmit},
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
      activeName: 'first',
      options: [{
        shopStatu: '0',
        label: '全部'
      }, {
        shopStatu: '1',
        label: '有效'
      }, {
        shopStatu: '2',
        label: '停用'
      }],
      options1: [{
        shopStatu: '0',
        label: '全部'
      }, {
        shopStatu: '1',
        label: '待审核'
      }, {
        shopStatu: '2',
        label: '审核通过'
      }, {
        shopStatu: '3',
        label: '审核不通过'
      }],
      regisCode: '',
      shopName: '',
      shopName1: '',
      shopState: '',
      shopState1: '',
      tableData: [],
      tableData1: [],
      pageTotal: 1,
      pageTotal1: 1,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 20,
      dialogVisible: false,
      dialogVisible1: false,
      changeShopdialogVisible: false,
      dialogWidth: '80%',
      loading: false,
      loading1: false,
      AddValShopdialogVisible: false,
      AddPenShopdialogVisible: false,
      ID: 0,
      ID1: 0,
      resubmitDialog: false
    }
  },
  created () {
    this.clickSearch()
    this.clickSearch1()
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
    addValShop () {
      this.CheckShopMax(0)
      this.$nextTick(() => {
        this.$refs.secValShopmanaAddShopRef.update()
      })
    },
    addValShop1 () {
      this.CheckShopMax(1)
      this.$nextTick(() => {
        this.$refs.secPenShopmanaAddShopRef.update()
      })
    },
    stopUseValShop (id, isClose, option) {
      this.$confirm('确定要' + option + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('queryDelValideShop', {id: id, isClose: isClose}).then((response) => {
          this.$message({
            type: 'success',
            message: option + '成功!'
          })
          this.clickSearch()
        }).catch(() => {
          this.$message.error(option + '失败')
        })
      }).catch(() => {
      })
    },
    delPenShop (id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('queryDelPenShop', {id: id, isClose: 1}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.clickSearch1()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
      })
    },
    // 点击门店名称
    clickShop (id) {
      this.dialogVisible = true
      this.ID = id
      this.$nextTick(() => {
        this.$refs.secValShopmanaShopInfoRef.update()
      })
    },
    // 点击门店名称
    clickShop1 (id) {
      this.dialogVisible1 = true
      this.ID1 = id
      this.$nextTick(() => {
        this.$refs.secPenShopmanaShopInfoRef.updata()
      })
    },
    // 修改门店
    clickChangeShop (id) {
      this.changeShopdialogVisible = true
      this.ID = id
      this.$nextTick(() => {
        this.$refs.changeShopRef.update()
      })
    },
    // 查询
    clickSearch () {
      this.getTableData(1)
    },
    // 查询
    clickSearch1 () {
      this.getTableData1(1)
    },
    changePageHandle () {
      this.getTableData(this.pageIndex)
    },
    changePageHandle1 () {
      this.getTableData1(this.pageIndex1)
    },
    // 获取列表数据
    getTableData (page) {
      this.loading = true
      this.$store.dispatch('queryValideShopData', {regisCode: this.regisCode, shopName: this.shopName, shopState: this.shopState, pageIndex: this.pageIndex, pageSize: this.pageSize}).then((response) => {
        if (response === 'null') {
          this.tableData = []
          this.loading = false
          return
        }
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.loading = false
        this.tableData = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.regisCode = element.ShopCode
          ListItemObj.ID = element.ID
          ListItemObj.shopName = element.Title
          ListItemObj.contacts = element.Manager
          ListItemObj.phone = element.Phone
          ListItemObj.shop_type = element.ChainType === 1 ? '直营' : (element.ChainType === 2 ? '加盟' : '')
          ListItemObj.message_num = element.SMSMax
          ListItemObj.account_num = element.AccountMax
          ListItemObj.useful_date = parseTime(formatTimestamp(element.ServiceEndDate), '{y}-{m}-{d}')
          ListItemObj.regis_date = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ListItemObj.statu = element.IsClose ? '停用' : '有效'
          ListItemObj.stateOption = element.IsClose ? '启用' : '停用'
          ListItemObj.isClose = element.IsClose ? 0 : 1
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取列表数据
    getTableData1 (page) {
      this.loading1 = true
      this.$store.dispatch('queryPendingShopData', {shopName: this.shopName1, shopState: this.shopState1, pageIndex: this.pageIndex1, pageSize1: this.pageSize1}).then((response) => {
        if (response === 'null') {
          this.tableData1 = []
          this.loading1 = false
          return
        }
        this.loading1 = false
        this.pageTotal1 = response.PageTotal
        this.pageIndex1 = response.PageIndex
        this.$refs.bottomPagination1.lastEmittedPage = this.pageIndex1
        this.tableData1 = []
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.ID1 = element.ID
          ListItemObj.shopNameUnCheck = element.Title
          ListItemObj.contactsUnCheck = element.Manager
          ListItemObj.phoneUnCheck = element.Phone
          ListItemObj.shpe_typeUnCheck = element.ChainType === 1 ? '直营' : (element.ChainType === 2 ? '加盟' : '')
          ListItemObj.messageNumUnCheck = element.SMSMax
          ListItemObj.accountNumUnCheck = element.AccountMax
          ListItemObj.usefulDateUnCheck = parseTime(formatTimestamp(element.ServiceEndDate), '{y}-{m}-{d}')
          ListItemObj.regisDateUnCheck = parseTime(formatTimestamp(element.ModifyTime), '{y}-{m}-{d} {h}:{i}:{s}')
          ListItemObj.statuUnCheck = element.ShopState === 1 ? '待审核' : (element.ShopState === 2 ? '审核通过' : (element.ShopState === 3 ? '审核不通过' : ''))
          if (element.ShopState === 1) {
            if (this.isPermission(11)) {
              ListItemObj.isDel = true
            }
            ListItemObj.isResubmit = false
          } else if (element.ShopState === 2) {
            ListItemObj.isDel = false
            ListItemObj.isResubmit = false
          } else {
            if (this.isPermission(11)) {
              ListItemObj.isDel = true
            }
            if (this.isPermission(10)) {
              ListItemObj.isResubmit = true
            }
          }
          ListItemObj.isClose = 1
          this.tableData1.push(ListItemObj)
        })
      }).catch(() => {
        this.loading1 = false
      })
    },
    CheckShopMax (type) {
      this.$store.dispatch('CheckShopMax', '').then((response) => {
        if (type === 0) {
          this.AddValShopdialogVisible = true
        } else {
          this.AddPenShopdialogVisible = true
        }
        if (response.RetCode === 1) {
          if (type === 0) {
            this.AddValShopdialogVisible = true
          } else {
            this.AddPenShopdialogVisible = true
          }
        } else {
          this.$message(response.Msg)
        }
      }).catch(() => {
      })
    },
    closeSecValShopmanaAddShop () {
      this.AddValShopdialogVisible = false
      this.getTableData()
      this.getTableData1()
    },
    closeSecPenShopmanaAddShop () {
      this.AddPenShopdialogVisible = false
      this.getTableData()
      this.getTableData1()
    },
    closeChangeShopDialog () {
      this.changeShopdialogVisible = false
      this.getTableData()
    },
    closeResubmitDialog () {
      this.resubmitDialog = false
      this.getTableData1()
    },
    resubmit (id) {
      this.resubmitDialog = true
      this.ID1 = id
      this.$nextTick(() => {
        this.$refs.resubmitRef.update()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tcdPageCode {
  padding: 15px 20px;
  text-align: left;
  color: #ccc;
  text-align: center;
  margin-top: 158px;
}
span.disabled {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 25px;
  margin: 0 2px;
  color: #a8a8a8;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  vertical-align: middle;
}
.tcdPageCode span.current {
  display: inline-block;
  height: 31px;
  line-height: 31px;
  padding: 0 12px;
  margin: 0 2px;
  color: #fff;
  background-color: #37bfc8;
  border: 1px solid #37bfc8;
  border-radius: 2px;
  vertical-align: middle;
}
.tcdPageCode span.disabled {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  vertical-align: middle;
}
.add_btn {
  margin-bottom: 20px;
  color: #fff;
  background-color: #feb454;
  border-color: #feb454;
}
.add_btn:hover{
  background-color: #feb454;
  border-color: #feb454;
  color: #fff;
}
.add_btn:focus{
  background-color: #feb454;
  border-color: #feb454;
  color: #fff;
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
.name_link_class{
  color: #37bfc8;
  cursor: pointer;
}
</style>
