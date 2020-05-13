<template>
  <div class="shop_wrap">
    <div class="shop_list" v-loading="loading">
      <div v-if="showShopList">
        <p v-for="shop in shopList" :key="shop.ID"><a @click="jumpLink(shop.ID)" href="javascript:;">{{ shop.Title }}</a></p>
      </div>
      <div v-else class="empty_data">当前账号没有可登录店铺，请确认！</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      shopList: [],
      showShopList: true,
      loading: true
    }
  },
  mounted () {
    this.getAllShopList()
  },
  methods: {
    getAllShopList () {
      this.$store.dispatch('queryAllShopList', {}).then((response) => {
        this.loading = false
        if (response.RetCode === 1) {
          if (response.Data.listInfo.length > 0) {
            this.shopList = response.Data.listInfo
            this.getShopToken()
          } else {
            this.showShopList = false
          }
        } else {
          this.showShopList = false
        }
      }).catch(() => {
      })
    },
    jumpLink (shopId) {
      this.$store.dispatch('queryShopToken', {shopId: shopId}).then((response) => {
        let shopToken = response.token
        let isPreEvn = window.location.hostname.indexOf('pre') !== -1
        let hostName = isPreEvn ? 'http://test.shop.handnear.com?shopId=' : 'http://shop.handnear.com?shopId='
        let linkUrl = hostName + shopId + '&tmpToken=' + shopToken
        window.location.href = linkUrl
      }).catch((res) => {
        location.reload()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .shop_wrap{
    background: #f2f2f2;
    padding-top: 20px;
    .empty_data{
      text-align: center;
      font-size: 18px;
      padding-top: 60px;
    }
    .shop_list{
      width: 380px;
      height: 400px;
      margin: 0 auto;
      p{
        border: 1px solid #e0e0e0;
        a{
          display: block;
          background: #fff;
          height: 34px;
          line-height: 34px;
          color: #549dfe;
          padding-left: 10px;
          border-radius: 4px;
          &:hover {
            background: #edf5ff;
          }
        }
      }
    }
  }
</style>
