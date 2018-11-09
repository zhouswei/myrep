<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">工号：</span>
        {{pro1}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">手机号：</span>
        {{pro2}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">姓名：</span>
        {{pro3}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">性别：</span>
        {{pro4}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">所在门店：</span>
        {{pro5}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">班次：</span>
        {{pro6}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">技师分类：</span>
        {{pro7}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">技师等级：</span>
        {{pro8}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">可选服务类型：</span>
        {{pro9}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">籍贯：</span>
        {{pro10}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">现住地址：</span>
        {{pro11}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">生日：</span>
        {{pro12}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">身份证号：</span>
        {{pro13}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">入职日期：</span>
        {{pro14}}
      </p>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTimestamp } from '@/utils'
export default {
  props: {
    ID: {
      default: 0
    }
  },
  data () {
    return {
      pro1: '',
      pro2: '',
      pro3: '',
      pro4: '',
      pro5: '',
      pro6: '',
      pro7: '',
      pro8: '',
      pro9: '',
      pro10: '',
      pro11: '',
      pro12: '',
      pro13: '',
      pro14: ''
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.$store.dispatch('queryTechDetailData', {id: this.ID}).then((response) => {
        this.pro1 = response.listItem.UserCode
        this.pro2 = response.listItem.Account
        this.pro3 = response.listItem.ShowName
        this.pro4 = response.listItem.Sex === 1 ? '男' : '女'
        this.pro5 = response.listItem.ShopName
        this.pro6 = response.listItem.ScheduTitle
        this.pro7 = response.listItem.ServiceTypeTitle
        this.pro8 = response.listItem.LevelTitle
        this.pro9 = response.listItem.ServiceTypeList
        this.pro10 = response.listItem.Origin
        this.pro11 = response.listItem.Address
        this.pro12 = parseTime(formatTimestamp(response.listItem.Birthday), '{y}-{m}-{d}')
        this.pro13 = response.listItem.IDCard
        this.pro14 = parseTime(formatTimestamp(response.listItem.AddDate), '{y}-{m}-{d}')
      }).catch(() => {
      })
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
</style>
