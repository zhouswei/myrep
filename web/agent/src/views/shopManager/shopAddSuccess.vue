<template>
  <div class="mian_content">
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="添加商户">
      <router-link to="/shopManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="main_content">
      <div class="suc_content">
        <div class="suc_icon">
          <img  :src="tranlatePath('static/img/addShopSuccess.png')" alt="">
        </div>
        <p>恭喜您，商户添加成功</p>
        <p>{{payTips}}</p>
      </div>
      <el-button type="primary" @click="backShop" class="takeout-btn">返回</el-button>
    </div>
  </div>
</template>
<script>
import { formatPath } from '@/utils'
export default {
  mounted () {
    // alert(33)
    this.payTips = this.$route.query.payTips
  },
  data () {
    return {
      specHeight: this.$store.getters.statusBarHeight,
      payTips: ''
    }
  },
  methods: {
    tranlatePath (path) {
      return formatPath(path)
    },
    backShop () {
      // this.$router.push({path: '/shopManager', replace: true})
      this.$router.go(-3)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
   .suc_content{
    background: #fff;
    margin-bottom: 20px;
    padding: 40px 0;
    text-align: center;
    .suc_icon{
      margin-bottom: 15px;
    }
    p{
      color: #000;
      font-weight: bold;
      line-height: 1.7;
      &:last-child {
        font-weight: initial;
        color: #666;
      }
    }
  }
  .takeout-btn{
    display:block;
    margin:10px auto 0;
    width: 90%;
    font-size: 16px;
    background-color: #37bfc8;
    border-color: #37bfc8;
    padding: 14px 20px;
  }
</style>
