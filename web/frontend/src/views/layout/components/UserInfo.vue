// 用户信息组件
<template>
  <div>
    <p class="accountInfoClass">当前账户：
      <label>{{currentAccount}}</label>
    </p>
    <p class="accountInfoClass">账户名称：
      <label>{{accountName}}</label>
    </p>
    <p class="accountInfoClass">账户角色：
      <label>{{accountRole}}</label>
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentAccount: this.$store.getters.name,
      accountName: this.$store.getters.avatar,
      accountRole: this.$store.getters.roles
    }
  },
  created () {
    this.update()
  },
  methods: {
    // update () {
    //   this.$store.dispatch('GetUserInfo', {id: this.ID}).then((response) => {
    //     const data = response
    //     const objData = data.Data
    //     this.currentAccount = objData.name
    //     this.accountName = objData.mobile
    //     this.accountRole = objData.roleName
    //   }).catch(() => {
    //   })
    // }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.accountInfoClass{
  margin-left: 200px;
  margin-bottom: 50px;
  font-weight: bold;
}
</style>
