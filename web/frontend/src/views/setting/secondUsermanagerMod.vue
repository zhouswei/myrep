<template>
  <div v-loading="loading">
    <div>
      <span style="color: #e33c32;margin-left: 18px;">此处添加的是连锁店后台的操作人员，各分店人员帐号需去分店添加</span>
      <p class="infoPerLine1">
        <span class="infoShowName">账号：</span>
         <el-input :disabled="true" v-model="para.Account" type="text" auto-complete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">密码：</span>
         <el-input :disabled="true" v-model="para.Password" type="password" auto-complete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">姓名：</span>
         <el-input v-model="para.ShowName" type="text" auto-complete="off"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">所属部门：</span>
        <el-select class="statu_select" @change="departmentChange" v-model="para.DepartmentID" placeholder="请选择">
          <el-option
            v-for="item in departments"
            :key="item.department"
            :label="item.label"
            :value="item.department"
            >
          </el-option>
        </el-select>
        <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">角色：</span>
        <el-select class="statu_select" v-model="para.RoleID" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="color: #e33c32">*</span>
      </p>
      <div style="width: 260px;margin: auto;white-space: nowrap;">
        <el-button class="el_save_btn" @click="clickSave">确定</el-button>
        <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sendData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: true,
      departments: [],
      roles: [],
      // ID: params.ID,
      // Account: params.Account,
      // AddDate: params.AddDate,
      // AddTime: params.AddTime,
      // AdminID: params.AdminID,
      // Password: params.Password,
      // State: params.State,
      // LastLoginIP: params.LastLoginIP,
      // LastLoginTime: params.LastLoginTime,
      // UserCode: params.UserCode,
      // GroupID: params.GroupID,
      // Address: params.Address,
      // DepartmentID: params.DepartmentID,
      // RegWay: params.RegWay,
      // DepartmentTitle: params.DepartmentTitle,
      // RoleID: params.RoleID,
      // RoleTitle: params.RoleTitle,
      // Sex: params.Sex,
      // Origin: params.Origin,
      // Birthday: params.Birthday,
      // Pic: params.Pic
      para: {
        ID: 0,
        Account: '',
        Password: '',
        ShowName: '',
        DepartmentID: '',
        RoleID: '',
        State: 1
      }
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.loading = true
      this.getDepartments()
      this.para.Account = this.sendData.account_num
      this.para.ID = this.sendData.ID
      this.para.Password = '123456'
      this.para.ShowName = this.sendData.name
      this.para.DepartmentID = this.sendData.DepartmentID
      if (this.para.DepartmentID !== undefined && this.para.DepartmentID !== '') {
        this.getRoles()
      }
    },
    clickCancel () {
      this.$emit('close')
    },
    clickSave () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryChangeUserInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.para = {}
          this.$emit('close')
        }).catch(() => {
        })
      }
    },
    getRoles () {
      this.$store.dispatch('queryRoles', {departmentID: this.para.DepartmentID}).then((response) => {
        this.roles = []
        response.forEach(element => {
          var obj = {}
          obj.id = element.ID
          obj.label = element.Title
          this.roles.push(obj)
        })
        this.roles.forEach(element => {
          if (element.label === this.sendData.role) {
            this.para.RoleID = element.id
          }
        })
        this.loading = false
      }).catch(() => {
      })
    },
    getDepartments () {
      this.$store.dispatch('queryDepartmentList', {id: 0}).then((response) => {
        this.departments = []
        response.departArray.forEach(element => {
          var obj = {}
          obj.department = element.ID
          obj.label = element.Title
          this.departments.push(obj)
        })
      }).catch(() => {
      })
    },
    departmentChange (val) {
      this.para.RoleID = ''
      this.getRoles()
    },
    dataValidation () {
      if (this.para.Account === '') {
        this.$message.error('请输入账号')
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.para.Account))) {
        this.$message.error('请输入正确的手机号')
        return false
      }
      if (this.para.Password === '') {
        this.$message.error('请输入密码')
        return false
      }
      if (this.para.ShowName === '') {
        this.$message.error('请输入姓名')
        return false
      }
      if (this.para.DepartmentID === '') {
        this.$message.error('请选择部门')
        return false
      }
      if (this.para.RoleID === '') {
        this.$message.error('请选择角色')
        return false
      }
      return true
    }
    // ,
    // getUserInfo () {
    //   this.$store.dispatch('queryUserInfo', {account: this.account}).then((response) => {
    //     this.para.Account = response.Account
    //     this.para.Password = ''
    //     this.para.ShowName = response.ShowName
    //     this.para.DepartmentID = response.DepartmentID
    //     this.para.RoleID = response.RoleID
    //     this.para.State = 1
    //     this.getRoles()
    //   }).catch(() => {
    //   })
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infoPerLine1 {
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
    font-size: 14px;
}
.infoShowName {
    display: inline-block;
    width: 187px;
    line-height: 30px;
    text-align: right;
    color: #5e5e5e;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
}
.el-input{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.el_save_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
  margin-top: 50px;
}
</style>
