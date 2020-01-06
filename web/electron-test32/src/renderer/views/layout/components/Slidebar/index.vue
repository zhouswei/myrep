<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="scroll-header">
      <img class="header-img" :src="tranlatePath('static/img/logo.png')">
      <p style="{float: left; color: #fff; height: 24px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; font-size: 15px;}">{{$t('login.title')}}</p>
      <hr align=left width=100% color=#fff SIZE=3 noShade>
    </div>
    <el-menu model="vertical"
    :show-timeout="200"
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#37bfc8"
    text-color="#ffffff"
    active-text-color="#409efe">
      <SlidebarItem :routes="permission_routers"></SlidebarItem>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
import SlidebarItem from './SlidebarItem'
import { formatPath } from '@/utils'
export default {
  components: {
    SlidebarItem
  },
  data () {
    return {
      imgurl: '/static/img/logo.png'
    }
  },
  computed: {
    isCollapse () {
      return !this.slidebar.opened
    },
    ...mapGetters(['slidebar', 'permission_routers'])
  },
  methods: {
    tranlatePath (path) {
      return formatPath(path)
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .scroll-header {
    background: #37bfc8;
    padding-top: 1px;
    padding-bottom: 1px;
    height: 60px;
    .header-img {
      float: left;
      margin-top: 15px;
      margin-left: 10px;
      margin-right: 15px;
      width: 30px;
    }
  }
</style>
