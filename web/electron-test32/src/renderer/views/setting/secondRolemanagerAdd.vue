<template>
  <div>
    <div style="width: 400px;margin: auto;white-space: nowrap;">
      <p class="infoPerLine1">
        <span class="infoShowName">角色名称：</span>
         <el-input v-model="para.Title" type="text" autocomplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">所属部门：</span>
        <el-select v-model="para.DepartmentID" class="statu_select" placeholder="请选择">
          <el-option
            v-for="item in departments"
            :key="item.department"
            :label="item.label"
            :value="item.department">
          </el-option>
        </el-select>
        <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">描述：</span>
         <el-input v-model="para.Remark" type="textarea" autosize></el-input>
      </p>
    </div>
    <div style="width: 260px;margin: auto;white-space: nowrap;">
      <el-button class="el_save_btn" @click="clickSave">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      departments: [],
      para: {
        DepartmentID: '',
        DepartmentName: '',
        Title: '',
        Remark: ''
      }
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.getDepartments()
    },
    clickCancel () {
      this.$emit('close')
    },
    clickSave () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryAddRoleInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.para = {}
          this.$emit('close')
        }).catch(() => {
        })
      }
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
    dataValidation () {
      if (this.para.Title === '') {
        this.$message.error('请输入角色名称')
        return false
      }
      if (this.para.DepartmentID === '') {
        this.$message.error('请选择部门')
        return false
      }
      return true
    }
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
    width: 100px;
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
.el-textarea__inner{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.el-textarea{
  display: inline-block;
  width: 175px;
  height: 35px;
}
</style>
