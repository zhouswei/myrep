<template>
  <div id="app">
    <keep-alive :include="cacheviews">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {message: '看电视呢书签产品'}
  },
  computed: {
    cacheviews () {
      return this.$store.getters.cacheviews
    }
  },
  watch: {
    $route () {
      this.addViewTags()
    }
  },
  methods: {
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    }
  },
  mounted () {
    var jsonObj = {methodname: 'getStatusBarHeight'}
    var that = this
    window.plugins.CustomBridgePlugin.js2android(jsonObj, function sucess (msg) {
      that.$store.dispatch('setStatusHeight', msg)
    }, null)
  }
}
</script>
<style>
  html,body,#app {height: 100%; margin: 0px;}
  .vc-popup-press-menu {
    cursor: pointer;
  }
  ul, ol, li, dl, dd {
    margin: 0;
    padding: 0;
  }
  ul, ol {
    list-style: none outside none;
  }
</style>
