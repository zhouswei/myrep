<template>
  <div v-loading="loading">
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
        <span class="infoShowName">职位：</span>
        {{pro6}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">籍贯：</span>
        {{pro7}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">生日：</span>
        {{pro8}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">身份证号：</span>
        {{pro9}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">入职日期：</span>
        {{pro10}}
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
      loading: true
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('queryEmployeeManagerDetailData', {id: this.ID}).then((response) => {
        this.pro1 = response.listItem.UserCode
        this.pro2 = response.listItem.Account
        this.pro3 = response.listItem.ShowName
        this.pro4 = response.listItem.Sex === 1 ? '男' : '女'
        this.pro5 = response.listItem.ShopName
        this.pro6 = response.listItem.PositionTitle
        this.pro7 = response.listItem.Origin
        this.pro8 = parseTime(formatTimestamp(response.listItem.Birthday), '{y}-{m}-{d}')
        this.pro9 = response.listItem.CardID
        this.pro10 = parseTime(formatTimestamp(response.listItem.AddDate), '{y}-{m}-{d}')
        this.loading = false
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
