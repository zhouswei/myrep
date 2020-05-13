<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="代理筛选">
      <router-link to="/agentManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="mian_container">
      <div class="shop_info_option">
        <p>
          <span>代理商层级</span>
            <el-select v-model="agentClass" placeholder="请选择">
              <el-option
                v-for="item in agentClassList"
                :key="item.value"
                :label="item.title"
                :value="item.value">
              </el-option>
            </el-select>
        </p>
        <p>
          <span>公司名称</span>
          <el-input style="width:50%;text-align:right;" v-model="groupName" placeholder="请输入公司名称"></el-input>
        </p>
        <p>
        <p>
          <span>联系人</span>
          <el-input style="width:50%;text-align:right;" v-model="linkMan" placeholder="请选择"></el-input>
        </p>
        <p>
          <span>手机号</span>
          <el-input style="width:50%;text-align:right;" v-model="mobile" placeholder="请选择"></el-input>
        </p>
      </div>
      <p class="btn_box">
        <el-button type="info">重置</el-button>
        <el-button type="primary" @click="search">筛选</el-button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      agentClassList: [{value: 5, title: '全部下级'}, {value: 1, title: '直属下级'}],
      agentClass: '',
      groupName: '',
      linkMan: '',
      mobile: '',
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  methods: {
    search () {
      let queryParams = {
        agentClass: this.agentClass,
        groupName: this.groupName,
        linkMan: this.linkMan,
        mobile: this.mobile
      }
      this.$router.push({ path: '/agentManager', query: queryParams })
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .mian_container{
    &>div{
      background-color: #fff;
      margin-bottom: 20px;
      padding: 10px;
    }
    .shop_info_option{
      p{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        span{
          line-height: 36px;
        }
      }
    }
    .shop_date_option,.subShop_date_option{
      &>div{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        span{
          line-height: 30px;
          margin: 0 10px;
          display: block;
          width: 50px;
        }
      }
    }
    .btn_box{
      display: flex;
      justify-content: space-around;
    }
  }
</style>
<style>
  .shop_info_option input.el-input__inner{
    border: none;
    text-align: right;
  }
  .shop_date_option input.el-input__inner,.subShop_date_option input.el-input__inner{
    border: none;
    background-color: #ebeef5;
    border-radius: 20px;
    width: 96%;
  }
</style>
