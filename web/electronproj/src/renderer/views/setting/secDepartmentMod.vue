<template>
  <div>
    <div class="infoPerLine1" style="width: 300px;margin: auto;white-space: nowrap;">
      <p>
        <span class="infoShowName">部门名称：</span>
         <el-input v-model="para.Title" type="text" autoComplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">描述：</span>
         <el-input v-model="para.Remark" type="textarea" autosize></el-input>
      </p>
    </div>
    <div style="width: 260px;margin: auto;white-space: nowrap;">
      <el-button class="el_save_btn" @click="clickComfirm">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
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
      para: {
        ID: this.sendData.ID,
        // GroupID: this.sendData.GroupID,
        Title: this.sendData.Title,
        // ParentID: this.sendData.ParentID,
        Remark: this.sendData.Remark
        // State: this.sendData.State,
        // AdminID: this.sendData.AdminID,
        // AddTime: this.sendData.AddTime,
        // ModifyTime: this.sendData.ModifyTime,
        // IDStr: this.sendData.IDStr
      }
    }
  },
  methods: {
    update () {
      this.para = {
        ID: this.sendData.ID,
        Title: this.sendData.Title,
        Remark: this.sendData.Remark
      }
    },
    clickCancel () {
      this.$emit('close')
    },
    clickComfirm () {
      if (this.dataValidation()) {
        this.$store.dispatch('queryChangeDepartmentInfo', this.para).then((response) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$emit('close')
        }).catch(() => {
          this.$message.error('修改失败')
        })
      }
    },
    dataValidation () {
      if (this.para.Title === '') {
        this.$message.error('请输入部门名称')
        return false
      } else {
        return true
      }
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
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 120px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
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
