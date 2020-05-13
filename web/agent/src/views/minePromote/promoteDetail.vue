<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="我要推广">
      <router-link to="/minePromote" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="shareclick">分享</mt-button>
    </mt-header>
    <p v-html="helo">
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url1: 'http://m.handnear.com/?mobSoft',
      sheetVisible: false,
      helo: this.$store.getters.htmlContent,
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  methods: {
    shareclick () {
      let obj = this.$route.query
      var text = ''
      var img = obj.letterImages
      var url = obj.previewUrl
      var title = obj.letterTitle
      var platforms = ['0', '2', '3', '28', '4']
      window.plugins.SocialAgent.openShare(function (r) { window.alert('' + r) }, text, img, url, title, platforms)
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>

</style>
