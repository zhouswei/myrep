<template>
  <div class="app-wrapper" :class="classObj">
    <div style="height: 100%; color: #dfdfdf;" class="main-container">
      <el-container style="height: 100%; backgroud: #dfdfdf;">
        <el-header :style="{height: specHeight + 'px'}">
          <!-- <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div> -->
          <!-- <i class="el-icon-setting"></i> -->
          <!-- <svg-icon class-name='international-icon' icon-class="user" /> -->
          <!-- 信息化集成平台 -->
        </el-header>
          <div class="sums_head">
            <div class="sums_head_box">
              <div class="sums_box">
                <p>{{withwalMoney}}</p>
                <p>分润金额(元)</p>
              </div>
              <el-dropdown trigger="click" @command="handleCommand" class="agent_option">
                <span class="el-dropdown-link user-name">
                  {{name}}<i class="el-icon-caret-bottom el-icon--right" style="color:#fff;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">基本信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">更换手机</el-dropdown-item>
                  <el-dropdown-item command="d">下级分润</el-dropdown-item>
                  <el-dropdown-item divided style="color: red" command="e">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-button class="take_case" @click="clickHandle(7)">提现</el-button>
          </div>
        <el-main style="height: 80%; text-align: center;backgroud:red;" class="main_content">
          <el-row :gutter="20" style="margin-bottom: 20px; height: 30%; text-align: center" type="flex" class="row-bg">
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{ width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(1)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + minePromote + ')'}"></span>
                <p>我要推广</p>
              </el-card>
            </el-col>
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{ width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(2)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + divideMananger + ')'}"></span>
                <p>分润管理</p>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 20px; height: 30%; text-align: center" type="flex" class="row-bg">
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(3)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + reservesManager + ')'}"></span>
                <p>备用金管理</p>
              </el-card>
            </el-col>
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{ width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(4)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + chainManager + ')'}"></span>
                <p>连锁店</p>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 20px; height: 30%; text-align: center" type="flex" class="row-bg">
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{ width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(5)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + shopManager + ')'}"></span>
                <p>商户管理</p>
              </el-card>
            </el-col>
            <el-col style="height: 100%; text-align: center" :span="12">
              <el-card :body-style="{ width: '100%', center: true,color:'#262626', fontSize:'16px', margin: 'auto', padding: '0px' }" @click.native="clickHandle(6)" class="box-card">
                <span class="png-container" :style="{backgroundImage:'url(' + agentManager + ')'}"></span>
                <p>代理商管理</p>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
        <!-- <el-footer style="height: 10%; text-align: center">深圳市掌通宝有限公司</el-footer> -->
      </el-container>
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
          <p style="color: #37bfc8; padding-top: 0px;">{{returnDialogTitle()}}</p>
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
import { Navbar, Slidebar, TagsView, AppMain, UserInfo, ChangePhone, ChangePassword } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'layout',
  components: {
    Navbar,
    Slidebar,
    TagsView,
    AppMain,
    UserInfo,
    ChangePhone,
    ChangePassword
  },
  mixins: [ResizeMixin],
  mounted () {
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '40%'
    }
    this.getAgentInfo()
  },
  data () {
    return {
      dialogWidth: '40%',
      dialogTitle: '账户信息',
      specHeight: this.$store.getters.statusBarHeight,
      name: this.$store.getters.name,
      bgUrl: this.tranlatePath('static/img/index_bg.jpg'),
      minePromote: this.tranlatePath('static/img/minePromote.png'),
      divideMananger: this.tranlatePath('static/img/divideMananger.png'),
      reservesManager: this.tranlatePath('static/img/reservesManager.png'),
      chainManager: this.tranlatePath('static/img/chainManager.png'),
      shopManager: this.tranlatePath('static/img/shopManager.png'),
      agentManager: this.tranlatePath('static/img/agentManager.png'),
      withwalMoney: 0
    }
  },
  computed: {
    // withwalMoney () {
    //   return this.$store.getters.userdata.WithdrawableMoneys
    // },
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
    getAgentInfo () {
      var params3 = {}
      this.$store.dispatch('GetRateInfo', params3).then((response) => {
        if (!response.IsError) {
          this.withwalMoney = response.Info.WithdrawableMoneys
          this.name = response.Info.FullName
        }
      }).catch(() => {

      })
    },
    tranlatePath (url) {
      return formatPath(url)
    },
    clickHandle (type) {
      if (type === 1) {
        // 我要推广
        window.yushientrypoint = 1
        this.$router.push({ path: '/minePromote' })
      } else if (type === 2) {
        // 分润管理

        window.yushientrypoint = 2
        this.$router.push({ path: '/divideMananger' })
      } else if (type === 3) {
        // 备用金管理
        window.yushientrypoint = 3
        this.$router.push({ path: '/reservesManager' })
      } else if (type === 4) {
        // 连锁店

        window.yushientrypoint = 4
        this.$router.push({ path: '/chainManager' })
      } else if (type === 5) {
        // 商户管理

        window.yushientrypoint = 5
        this.$router.push({ path: '/shopManager' })
      } else if (type === 6) {
        // 商户管理

        window.yushientrypoint = 6
        this.$router.push({ path: '/agentManager' })
      } else if (type === 7) {
        // 商户管理
        window.yushientrypoint = 7
        this.$router.push({ path: '/withdrawalManager' })
      }
    },
    handleCommand (command) {
      this.updateUserInfo()
      if (command === 'a') {
        // 基本信息 弹框
        this.$store.dispatch('checkDialogIndex', {info: 0}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      } else if (command === 'b') {
        // 修改密码 弹框
        this.$store.dispatch('checkDialogIndex', {info: 1}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      } else if (command === 'c') {
        // 更换手机 弹框
        this.$store.dispatch('checkDialogIndex', {info: 2}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      } else if (command === 'd') {
        // 下级分润 页面
        this.$router.push({ path: '/lowerDivide' })
      } else if (command === 'e') {
        this.$store.dispatch('LogOut').then(() => {
          console.log('login--------------')
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    },
    returnDialogTitle () {
      if (this.$store.getters.dialogIndex === 0) {
        this.dialogTitle = '账户信息'
      } else if (this.$store.getters.dialogIndex === 1) {
        this.dialogTitle = '修改密码'
      } else {
        this.dialogTitle = '更换手机'
      }
      return this.dialogTitle
    },
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    updateUserInfo () {
      var params3 = {}
      this.$store.dispatch('GetRateInfo', params3).then((response) => {
      }).catch(() => {

      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  $color-primary: #393a3f;
  .el-header {
    background-color: $color-primary;
  }
  .app-wrapper {
      @include clearfix;
      position: relative;
      height: 100%;
      width: 100%;
      background: #f0f1f5;
  }
  .title-image {
    margin-top: 20%;
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
  .el-header{
    .svg-icon{
      width: 1.5em;
      height: 1.5em;
      vertical-align: middle;
    }
    .user-name{
      padding: 0 5px;
    }
    .settting-drop{
      margin-left: -10px;
      font-size: 16px;
    }
  }
  .sums_head{
    position: relative;
    .sums_head_box{
      text-align: center;
      padding: 20px 0px 20px 0px;
      background: -webkit-gradient(linear, right top, left top, from(#f75c63), to(#ffb554));
      background: linear-gradient(-90deg, #f75c63, #ffb554);
    }
    .sums_box{
      text-align: center;
      width: 126px;
      height: 126px;
      margin: 0 auto;
      font-size: 22px;
      color: #fff;
      position: relative;
      background: -webkit-gradient(linear, right top, left top, from(#fb947e), to(#fdae7a));
      background: linear-gradient(-90deg, #fb947e, #fdae7a);
      padding: 40px 0px;
      border-radius: 50%;
      box-shadow: 0px 0px 15px #f77c5c;
      & p:first-child{
        line-height: 1.6;
      }
      & p:last-child{
        font-size: 12px;
        color: #e6e6e6;
      }
    }
    .agent_option{
      color: #fff;
      font-size: 15px;
      margin: 16px 0px;
    }
    .take_case{
      position: absolute;
      bottom: -10%;
      left: 0;
      right: 0;
      margin:0 auto;
      width: 180px;
      height: 45px;
      background: -webkit-gradient(linear, right top, left top, from(#e33e32), to(#ffb554));
      background: linear-gradient(-90deg, #e33e32, #ffb554);
      border:none;
      border-radius: 100px;
      color: #fff;
      font-size: 16px;
      z-index: 10;
    }
  }
  .main_content{
    padding: 40px 40px 0 40px;
    color: #262626;
    font-size: 16px;
    .svg-icon{
      width: 3em;
      height: 3em;
      vertical-align: middle;
      text-align: center;
    }
    .svg-container{
      padding-top: 10px;
    }
    .png-container{
      width: 2em;
      height: 2em;
      vertical-align: middle;
      text-align: center;
      display: inline-block;
      background-position: center;
      background-size: cover;
    }
  }
  .box-card{
    color: #fff;
    background: #fff;
    height: 100%;
    text-align: center;
    padding: 0;
    display: flex;
    align-items: center;
    border-radius: 5px;
    p{
      margin-top: 14px;
      font-size: 15px;
    }
  }
</style>
<style scoped>
  .dialog-container >>> .el-dialog__header {
    padding: 5px 0 0 15px;
  }
</style>
