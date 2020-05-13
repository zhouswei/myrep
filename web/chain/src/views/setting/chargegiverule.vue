<template>
  <div>
    <div v-if="isPermission(66)">
      <div>
        <el-button  v-if="isPermission(67)" class="add_btn_class" @click="clickAddRule()">+新增充赠规则</el-button>
        <div style="border-left:1px solid #e0e0e0;height:34px;margin-left:20px;display:inline-block;vertical-align:middle;padding-left:20px;"></div>
        <div class="inline_block_100" style="margin-top:10px;">
          会员卡类型：
          <el-input type="text" v-model="UcardType" autocomplete="off" placeholder="请输入会员卡类型" class="member-input-content">
          </el-input>
          <el-button class="search_btn" @click="getChargeGiveRuleListInfo(1)" :loading="loadingview">查询</el-button>
        </div>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            class="name_link_class"
            prop="InfoTitle"
            label="会员卡类型"
            width="300">
          </el-table-column>
          <el-table-column
            prop="PayPrice"
            label="充值金额(元)"
            width="300">
          </el-table-column>
          <el-table-column
            prop="FreePrice"
            label="赠送金额(元)"
            width="300">
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button v-if="isPermission(68)" @click="clickModify(scope.row)" type="text" size="small">修改</el-button>
                <el-button v-if="isPermission(69)" @click="clickDel(scope.row.ID)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          ref="bottomPagination"
          class="el_pagination_class"
          background
          layout="prev, pager, next"
          @current-change="changePageHandle"
          :current-page.sync="PageIndex"
          :page-size="20"
          :total="PageTotal">
        </el-pagination>
      </div>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="添加充赠规则"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible1"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">添加充赠规则</p>
          </div>
          <div class="dialog-body">
            <secChargegiveruleAdd ref="secChargegiveruleAddRef" v-on:close="closeDialog1"></secChargegiveruleAdd>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改充赠规则"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible2"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">修改充赠规则</p>
          </div>
          <div class="dialog-body">
            <secChargegiveruleMod ref="secChargegiveruleModRef" :sendData="sendData" v-on:close="closeDialog2"></secChargegiveruleMod>
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
import secChargegiveruleMod from '@/views/setting/secChargegiveruleMod'
import secChargegiveruleAdd from '@/views/setting/secChargegiveruleAdd'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'chargegiverule',
  components: {secChargegiveruleMod, secChargegiveruleAdd},
  mixins: [ResizeMixin],
  data () {
    return {
      tableData: [],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogWidth: '80%',
      PageIndex: 1,
      PageTotal: 1,
      UcardType: '',
      sendData: {}
    }
  },
  mounted () {
    this.getChargeGiveRuleListInfo()
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '50%'
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
    getChargeGiveRuleListInfo (PageIndex) {
    // PageIndex: params.PageIndex,
    // PageSize: params.PageSize
      this.$store.dispatch('queryFillConfigListInfo', {PageIndex: PageIndex, PageSize: 20, Title: this.UcardType}).then((response) => {
        this.tableData = []
        this.PageIndex = response.PageIndex
        this.PageTotal = response.PageTotal
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.ID = element.ID
          ListItemObj.GroupID = element.GroupID
          ListItemObj.UCardType = element.UCardType
          ListItemObj.InfoTitle = element.InfoTitle
          ListItemObj.PayPrice = element.PayPrice
          ListItemObj.FreePrice = element.FreePrice
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
      })
    },
    clickModify (data) {
      this.sendData = data
      this.dialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.secChargegiveruleModRef.update()
      })
    },
    clickDel (id) {
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('queryDeleteFillConfigInfo', {id: id}).then((response) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getChargeGiveRuleListInfo()
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    clickAddRule () {
      this.dialogVisible1 = true
      this.$nextTick(() => {
        this.$refs.secChargegiveruleAddRef.update()
      })
    },
    changePageHandle () {
      this.getChargeGiveRuleListInfo(this.PageIndex)
    },
    closeDialog1 () {
      this.dialogVisible1 = false
      this.getChargeGiveRuleListInfo()
    },
    closeDialog2 () {
      this.dialogVisible2 = false
      this.getChargeGiveRuleListInfo()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add_btn_class{
  margin-top: 20px;
  // margin-bottom: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.add_btn_class:hover{
  margin-top: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.add_btn_class:focus{
  margin-top: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.search_btn{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  margin-left: 10px;
}
.el-input{
  display: inline-block;
  width: 175px;
  height: 35px;
  margin-right: 30px;
}
.el-table-clss{
  margin-left: 10px;
  margin-top: 20px;
}
.el_pagination_class{
  margin-top: 20px;
  text-align: center;
}
</style>
