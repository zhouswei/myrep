<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡类型：</span>
        <el-select class="statu_select" v-model="shopStatu" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.shopStatu"
            :label="item.label"
            :value="item.shopStatu">
          </el-option>
        </el-select>
        <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">充值金额：</span>
         <el-input type="text" autocomplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">赠送：</span>
         <el-input type="text" autocomplete="off" class="el-input"/>
         <span style="color: #e33c32">*</span>
      </p>
      <el-button class="el_save_btn" @click="clickSave">确定</el-button>
      <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked_open: false,
      checked_close: false
    }
  },
  methods: {
    clickCancel () {
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
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 150px;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 160px;
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
