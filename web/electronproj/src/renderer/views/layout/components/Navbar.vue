<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="slidebar.opened"></hamburger>
    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>
      <el-button @click="logout" class="right-but" type="sucess">退出登录</el-button>
      <el-dropdown class="avatar-container right-menu-item" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <p class="user-name-text">{{name}}</p>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" divided>
            {{$t('login.userdetail')}}
          </el-dropdown-item>
          <el-dropdown-item command="b" divided>
            {{$t('login.changePwd')}}
          </el-dropdown-item>
          <el-dropdown-item command="c" divided>
            {{$t('login.changePhone')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="right-shop-name">
        <img class="right-shop-img" :src="tranlatePath('static/img/shopMan.png')">
        <div class="right-shop-text">{{this.$store.getters.userdata.GroupName}}</div>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import LangSelect from '@/components/LangSelect'
import { formatPath } from '@/utils'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'slidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.$store.dispatch('checkDialogIndex', {info: 0}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      } else if (command === 'b') {
        this.$store.dispatch('checkDialogIndex', {info: 1}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      } else if (command === 'c') {
        this.$store.dispatch('checkDialogIndex', {info: 2}).then(() => {
          this.$store.dispatch('setDialogShow', {info: true}).then(() => {

          }).catch(() => {

          })
        }).catch(() => {

        })
      }
    },
    tranlatePath (path) {
      return formatPath(path)
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .user-name-text {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .right-shop-name {
    float: right;
    margin-right: 10px;
    margin-bottom: 0px;
    .right-shop-img {
      float: left;
      margin-right: 0px;
      margin-top: 15px;
    }
    .right-shop-text {
      padding: 0px;
      float: left;
      color: #000;
      margin-top: 12px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 0px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .right-but {
    float: right;
    margin-right: 6px;
    margin-left: 0px;
    margin-top: 10px;
  }
}
</style>
