<template>
  <div>
    <div v-if="isPermission(70)">
      <div>
        <el-button v-if="isPermission(71)" class="add_btn_class" @click="clickAdd()">+新增部门</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            class="name_link_class"
            prop="Title"
            label="部门名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="Remark"
            label="描述"
            width="300">
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作"
              width="400">
              <template slot-scope="scope">
                <el-button v-if="isPermission(72)" @click="clickModify(scope.row)" type="text" size="small">修改</el-button>
                <el-button v-if="isPermission(73)" @click="clickDel(scope.row.ID)" type="text" size="small">删除</el-button>
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
        title="新增部门"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible1"
        :width="dialogWidth"
        :close-on-click-modal="false"
        :sendData="sendData"
      >
          <div slot="title">
            <p style="color: #37bfc8">新增部门</p>
          </div>
          <div class="dialog-body">
            <secDepartmentAdd v-on:close="closeDialog1"></secDepartmentAdd>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改部门"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible2"
        :width="dialogWidth"
        :close-on-click-modal="false"
      >
          <div slot="title">
            <p style="color: #37bfc8">修改部门</p>
          </div>
          <div class="dialog-body">
            <secDepartmentMod v-on:close="closeDialog2" :sendData="sendData" ref="secDepartmentModRef"></secDepartmentMod>
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
import secDepartmentMod from '@/views/setting/secDepartmentMod'
import secDepartmentAdd from '@/views/setting/secDepartmentAdd'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'departmentmanager',
  components: {secDepartmentMod, secDepartmentAdd},
  mixins: [ResizeMixin],
  data () {
    return {
      tableData: [],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogWidth: '50%',
      PageIndex: 1,
      PageTotal: 1,
      sendData: {}
    }
  },
  mounted () {
    this.getDepartmentListInfo(1)
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
    clickModify (data) {
      this.sendData = data
      this.dialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.secDepartmentModRef.update()
      })
    },
    clickAdd () {
      this.dialogVisible1 = true
    },
    getDepartmentListInfo (PageIndex) {
      this.$store.dispatch('queryDepartmentListInfo', {PageIndex: PageIndex, PageSize: 20}).then((response) => {
        this.tableData = []
        this.PageIndex = response.PageIndex
        this.PageTotal = response.PageTotal
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        response.listInfo.forEach(element => {
          var ListItemObj = {}
          ListItemObj.ID = element.ID
          ListItemObj.GroupID = element.GroupID
          ListItemObj.ParentID = element.ParentID
          ListItemObj.State = element.State
          ListItemObj.AdminID = element.AdminID
          ListItemObj.AddTime = element.AddTime
          ListItemObj.ModifyTime = element.ModifyTime
          ListItemObj.IDStr = element.IDStr
          ListItemObj.Title = element.Title
          ListItemObj.Remark = element.Remark
          this.tableData.push(ListItemObj)
        })
      }).catch(() => {
      })
    },
    changePageHandle () {
      this.getDepartmentListInfo(this.PageIndex)
    },
    clickDel (id) {
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('querydeleteDepartmentInfo', {id: id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getDepartmentListInfo()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
      })
    },
    closeDialog1 () {
      this.dialogVisible1 = false
      this.getDepartmentListInfo()
    },
    closeDialog2 () {
      this.dialogVisible2 = false
      this.getDepartmentListInfo()
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.add_btn_class{
  margin-top: 20px;
  margin-bottom: 20px;
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
.el-input__inner{
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
