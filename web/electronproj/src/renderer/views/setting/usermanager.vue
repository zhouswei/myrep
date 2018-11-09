<template>
  <div>
    <div v-if="isPermission(49)">
      <div class="padding_calss">
        账号或姓名:
        <el-input type="text" v-model="userName" autocomplete="off" placeholder="请输入账号或姓名" class="member-input-content">
        </el-input>
        状态:
        <el-select class="padding-class" v-model="statu" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.statu"
            :label="item.label"
            :value="item.statu">
          </el-option>
        </el-select>
        <el-button class="seach_btn_class" @click="queryHandleData(1)" :loading="loadingview">查询</el-button>
      </div>
      <span>
        <el-button v-if="isPermission(51)" class="add_btn" @click="addUser()"> +新增用户</el-button>
      </span>
      <div>
        <el-table
          class="el-table-class"
          :data="tableData"
          border
          style="width: 100%"
          >
          <el-table-column
            fixed
            prop="account_num"
            label="账号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="section"
            label="所属部门"
            width="150">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="150">
          </el-table-column>
          <el-table-column
            prop="statu"
            label="状态"
            width="150">
          </el-table-column>
          <el-table-column
            prop="option"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button v-if="isPermission(50)" @click="clickPowerSetting(scope.row)" type="text" size="small">权限配置</el-button>
              <el-button v-if="isPermission(52)" @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button v-if="isPermission(53)" @click="stopUse(scope.row.ID, scope.row.stateOption)" type="text" size="small">{{scope.row.stateOption}}</el-button>
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
        title="新增用户"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible"
        :modal-append-to-body='false'
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">新增用户</p>
          </div>
          <div class="dialog-body">
            <secondUsermanagerAdd ref="secondUsermanagerAddRef" @close="closeAddDialog"></secondUsermanagerAdd>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改用户"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible1"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">修改用户</p>
          </div>
          <div class="dialog-body">
            <secondUsermanagerMod :sendData="sendData" @close="closeModDialog" ref="secondUsermanagerModRef"></secondUsermanagerMod>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="当前角色"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible2"
        :width="dialogWidth1"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <el-dialog
            :width="dialogWidth"
            :modal-append-to-body='false'
            title="门店列表"
            :close-on-click-modal="false"
            :visible.sync="innerVisible"
            append-to-body>
            <thrUerPowerSetting :shops="shops" @result="onResult" ref="thrRolePowerSettingRef"></thrUerPowerSetting>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </el-dialog>
          <div slot="title">
            <p style="color: #37bfc8">当前用户:{{roleName}}</p>
          </div>
          <div class="dialog-body">
            <secUserPowerSetting :id="id" :shops="shops" @clickOp="clickOp" @close="closeDialog" ref="secUserPowerSettingRef"></secUserPowerSetting>
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
import secUserPowerSetting from '@/views/setting/secUserPowerSetting'
import secondUsermanagerAdd from '@/views/setting/secondUsermanagerAdd'
import secondUsermanagerMod from '@/views/setting/secondUsermanagerMod'
import thrUerPowerSetting from '@/views/setting/thrUerPowerSetting'
import { getValideEmpolyeeState } from '@/utils/employee'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'usermanager',
  components: {secondUsermanagerAdd, secondUsermanagerMod, secUserPowerSetting, thrUerPowerSetting},
  mixins: [ResizeMixin],
  data () {
    return {
      status: [{
        label: '正常',
        statu: '1'
      }, {
        label: '禁用',
        statu: '2'
      }],
      statu: '',
      userName: '',
      pageIndex: 1,
      pageTotal: 20,
      loadingview: false,
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogWidth: '50%',
      dialogWidth1: '80%',
      sendData: {},
      stateOption: '禁用',
      roleName: '',
      shops: [],
      innerVisible: false,
      id: 0,
      currentAccount: ''
    }
  },
  mounted () {
    this.currentAccount = this.$store.getters.avatar
    this.queryHandleData()
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
      this.queryHandleData(this.pageIndex)
    },
    queryHandleData (currentindex) {
      this.loadingview = true
      this.$store.dispatch('queryUserListInfo', {Name: this.userName, State: this.statu, PageIndex: currentindex, PageSize: 20}).then((response) => {
        if (response === 'null') {
          this.tableData = []
          this.loadingview = false
          return
        }
        this.loadingview = false
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.tableData = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.ID = element.ID
          tmpObj.GroupID = element.GroupID
          tmpObj.account_num = element.Account
          tmpObj.name = element.ShowName
          tmpObj.section = element.DepartmentTitle
          tmpObj.DepartmentID = element.DepartmentID
          tmpObj.role = element.RoleTitle
          tmpObj.RoleID = element.RoleID
          tmpObj.statu = getValideEmpolyeeState(element.State)
          tmpObj.stateOption = element.State === 1 ? '禁用' : '启用'
          if (this.currentAccount === element.Account) {
            tmpObj.stateOption = ''
          }
          this.tableData.push(tmpObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    addUser () {
      this.dialogVisible = true
    },
    clickPowerSetting (obj) {
      this.roleName = obj.name
      this.id = obj.ID
      this.dialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.secUserPowerSettingRef.update()
      })
    },
    modify (data) {
      this.dialogVisible1 = true
      this.sendData = data
      this.$nextTick(() => {
        this.$refs.secondUsermanagerModRef.update()
      })
    },
    stopUse (id, tip) {
      this.$confirm('确定要' + tip + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('querydeleteUserInfo', {id: id}).then((response) => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.queryHandleData(this.pageIndex)
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
      })
    },
    closeAddDialog () {
      this.dialogVisible = false
      this.queryHandleData(this.pageIndex)
    },
    closeModDialog () {
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
.el-input__inner{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.member-input-content {
  width: 200px;
}
.padding_calss{
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.seach_btn_class{
  width: 100px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 30px;
}
.seach_btn_class:hover{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
.seach_btn_class:focus{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
}
.add_btn {
  color: #fff;
  background-color: #feb454;
  border-color: #feb454;
  margin-left: 20px;
  margin-bottom: 20px;
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
.el-table-class{
  margin-left: 20px;
}
.paging_class{
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
}
</style>
