// 用户信息组件
<template>
  <div class="info">
    <div class="account-info">
      <h3>账户信息</h3>
      <p class="accountInfoClass">公司名称：
        <label>{{companyName}}</label>
      </p>
      <p class="accountInfoClass">联系人：
        <label>{{contactor}}</label>
      </p>
      <p class="accountInfoClass">手机号：
        <label>{{telephone}}</label>
      </p>
    </div>
    <div class="my-profit">
      <h3>我的分润</h3>
      <p class="accountInfoClass">购买版本分润：
        <label>{{versionProfit}}%</label>
      </p>
      <p class="accountInfoClass">续年费分润：
        <label>{{yearProfit}}%</label>
      </p>
      <p class="accountInfoClass">购买账号分润：
        <label>{{accountProfit}}%</label>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    companyName () {
      return this.$store.getters.userdata.FullName
    },
    contactor () {
      return this.$store.getters.userdata.LinkMan
    },
    telephone () {
      return this.$store.getters.userdata.Mobile
    },
    yearProfit () {
      return Math.round(this.$store.getters.userdata.ContinuationRebate * 100)
    },
    accountProfit () {
      return Math.round(this.$store.getters.userdata.AccountRebate * 100)
    },
    versionProfit () {
      return Math.round(this.$store.getters.userdata.VersionRebate * 100)
    }
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      // var params3 = {}
      // this.$store.dispatch('GetRateInfo', params3).then((response) => {
      // }).catch(() => {

      // })
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.info{
  padding-bottom: 20px;
  width: 100%;
  margin-left: 10px;
  h3{
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 5px;
    font-size: 14px;
  }
  p{
    line-height: 2.5;
    margin-left: 10px;
    margin-bottom: 0px;
  }
  .account-info{
    margin-bottom: 10px;
  }
}
</style>
