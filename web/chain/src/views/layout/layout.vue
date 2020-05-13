<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&slidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <slidebar class="sidebar-container"></slidebar>
    <div class="main-container">
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
    </div>
    <el-dialog
      class="dialog-container"
      v-dialogDrag
      title="消费入单"
      ref="dialog_wrapper"
      :visible.sync="gobaldialogVisible"
      :width="dialogWidth"
      :modal-append-to-body='false'
      :close-on-click-modal="false">
        <div slot="title">
          <p style="color: #37bfc8;">{{returnDialogTitle()}}</p>
        </div>
        <div class="dialog-body">
          <component
            v-bind:is="currentTabComponent"
          ></component>
          <div
            class="line"
            v-dialogDragWidth="$refs.dialog_wrapper">
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { Navbar, Slidebar, TagsView, AppMain, UserInfo, ChangePhone, ChangePassword, SecShopList } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'layout',
  components: {
    Navbar,
    Slidebar,
    TagsView,
    AppMain,
    UserInfo,
    ChangePhone,
    ChangePassword,
    SecShopList
  },
  mixins: [ResizeMixin],
  mounted () {
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '40%'
    }
  },
  data () {
    return {
      dialogWidth: '40%',
      dialogTitle: '账户信息'
    }
  },
  computed: {
    gobaldialogVisible: {
      get: function () {
        return this.$store.getters.dialogShow
      },
      set: function (val) {
        // this.$store.getters.dialogShow = val
        this.$store.dispatch('setDialogShow', {info: val}).then(() => {

        }).catch(() => {

        })
      }
    },
    currentTabComponent () {
      if (this.$store.getters.dialogIndex === 0) {
        return 'UserInfo'
      } else if (this.$store.getters.dialogIndex === 1) {
        return 'ChangePassword'
      } else if (this.$store.getters.dialogIndex === 3) {
        return 'SecShopList'
      } else {
        return 'ChangePhone'
      }
    },
    classObj () {
      return {
        hideSidebar: !this.slidebar.opened,
        withoutAnimation: this.slidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    device () {
      return this.$store.getters.device
    },
    slidebar () {
      return this.$store.state.app.slidebar
    }
  },
  methods: {
    returnDialogTitle () {
      if (this.$store.getters.dialogIndex === 0) {
        this.dialogTitle = '账户信息'
      } else if (this.$store.getters.dialogIndex === 1) {
        this.dialogTitle = '修改密码'
      } else if (this.$store.getters.dialogIndex === 3) {
        this.dialogTitle = '切换店铺'
      } else {
        this.dialogTitle = '更换手机'
      }
      return this.dialogTitle
    },
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
      @include clearfix;
      position: relative;
      height: 100%;
      width: 100%;
  }
  .drawer-bg {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
  }
</style>
