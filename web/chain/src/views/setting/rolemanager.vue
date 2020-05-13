<template>
  <div>
    <div v-if="isPermission(54)">
      <el-button v-if="isPermission(56)" class="add_btn_class" @click="clickAdd">+新增角色</el-button>
      <div>
        <el-table
          class="el-table-clss"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="role_name"
            label="角色姓名"
            width="300">
          </el-table-column>
          <el-table-column
            class="name_link_class"
            prop="department"
            label="所属部门"
            width="300">
          </el-table-column>
          <el-table-column
            prop="descrip"
            label="描述"
            width="250">
          </el-table-column>
          <el-table-column
            prop="opare"
            label="操作"
            width="400">
              <template slot-scope="scope">
                <el-button v-if="isPermission(55)" @click="clickSet(scope.row)" type="text" size="small">权限配置</el-button>
                <el-button v-if="isPermission(57)" @click="clickMod(scope.row)" type="text" size="small">修改</el-button>
                <el-button v-if="isPermission(58)" @click="clickDel(scope.row.ID)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          class="paging_class"
          ref="bottomPagination"
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
        title="新增角色"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">新增角色</p>
          </div>
          <div class="dialog-body">
            <secondRolemanagerAdd @close="closeAddDialog"></secondRolemanagerAdd>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改角色"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible1"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">修改角色</p>
          </div>
          <div class="dialog-body">
            <secondRolemanagerMod @close="closeChangeDialog" :sendData="sendData" ref="secondRolemanagerModRef"></secondRolemanagerMod>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="当前角色： 系统管理员"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible2"
        :width="dialogWidth1"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <el-dialog
            :width="dialogWidth"
            title="门店列表"
            :close-on-click-modal="false"
            :visible.sync="innerVisible"
            :modal-append-to-body='false'
            append-to-body>
            <thrRolePowerSetting :shops="shops" @result="onResult" ref="thrRolePowerSettingRef"></thrRolePowerSetting>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </el-dialog>
          <div slot="title">
            <p style="color: #37bfc8">当前角色:{{roleName}}</p>
          </div>
          <div class="dialog-body">
            <secRolePowerSetting :id="id" :shops="shops" @clickOp="clickOp" @close="closeDialog" ref="secRolePowerSettingRef"></secRolePowerSetting>
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
import secondRolemanagerMod from '@/views/setting/secondRolemanagerMod'
import secondRolemanagerAdd from '@/views/setting/secondRolemanagerAdd'
import secRolePowerSetting from '@/views/setting/secRolePowerSetting'
import thrRolePowerSetting from '@/views/setting/thrRolePowerSetting'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'rolemanager',
  components: {secondRolemanagerMod, secRolePowerSetting, secondRolemanagerAdd, thrRolePowerSetting},
  mixins: [ResizeMixin],
  data () {
    return {
      sendData: {
        DepartmentID: '',
        DepartmentName: '',
        Title: '',
        Remark: ''
      },
      tableData: [],
      dialogVisible: false,
      dialogWidth: '50%',
      dialogWidth1: '80%',
      pageIndex: 1,
      pageTotal: 20,
      dialogVisible1: false,
      dialogVisible2: false,
      innerVisible: false,
      id: 0,
      shops: [],
      roleName: ''
    }
  },
  mounted () {
    this.queryHandleData(1)
    if (this.isMobile()) {
      this.dialogWidth = '100%'
      this.dialogWidth1 = '100%'
    } else {
      this.dialogWidth = '50%'
      this.dialogWidth1 = '80%'
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
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    queryHandleData (currentindex) {
      this.$store.dispatch('queryRoleListInfo', {PageIndex: currentindex, PageSize: 1000}).then((response) => {
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.tableData = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.ID = element.ID
          tmpObj.role_name = element.Title
          tmpObj.department = element.DepartmentName
          tmpObj.DepartmentID = element.DepartmentID
          tmpObj.descrip = element.Remark
          this.tableData.push(tmpObj)
        })
      }).catch(() => {

      })
    },
    clickSet (obj) {
      this.dialogVisible2 = true
      this.id = obj.ID
      this.roleName = obj.role_name
      this.$nextTick(() => {
        this.$refs.secRolePowerSettingRef.update()
      })
    },
    clickMod (data) {
      this.sendData = {
        ID: data.ID,
        DepartmentID: data.DepartmentID,
        DepartmentName: data.department,
        Title: data.role_name,
        Remark: data.descrip
      }
      this.dialogVisible1 = true
      this.$nextTick(() => {
        this.$refs.secondRolemanagerModRef.update()
      })
    },
    clickDel (id) {
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('querydeleteRoleInfo', {id: id}).then((response) => {
          if (response.RetCode === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.queryHandleData(this.pageIndex)
          } else {
            this.$message.error(response.Msg)
          }
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    clickAdd () {
      this.dialogVisible = true
    },
    closeAddDialog () {
      this.dialogVisible = false
      this.queryHandleData(this.pageIndex)
    },
    closeChangeDialog () {
      this.dialogVisible1 = false
      this.queryHandleData(this.pageIndex)
    },
    clickOp (data) {
      this.shops = data
      this.innerVisible = true
      this.$nextTick(() => {
        this.$refs.thrRolePowerSettingRef.getShops()
      })
    },
    closeDialog () {
      this.dialogVisible2 = false
    },
    onResult (data) {
      this.innerVisible = false
      this.shops = data
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add_btn_class{
  margin-top: 20px;
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
.el-table-clss{
  margin-top: 20px;
}
.paging_class{
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
}
</style>
