<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="代理商详情">
      <router-link to="/agentManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="editAgent">编辑</mt-button>
    </mt-header>
    <div class="agent_container">
      <div class="agent_container_head">
        <h1>代理商信息</h1>
      </div>
      <div class="agent_container_p">
        <p>公司名称</p>
        <p>{{fullName}}</p>
      </div>
      <div class="agent_container_p">
        <p>联系人</p>
        <p>{{LinkMan}}</p>
      </div>
      <div class="agent_container_p">
        <p>手机号</p>
        <p>{{mobile}}</p>
      </div>
      <div class="agent_container_p rate_item">
        <p>分润比例</p>
        <p>购买版本{{handPrecent(nextVersionRebate)}}%，购买账号{{handPrecent(nextAccountRebate)}}%，续年费{{handPrecent(nextContinuationRebate)}}%</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullName: '',
      LinkMan: '',
      mobile: '',
      nextVersionRebate: '',
      nextAccountRebate: '',
      nextContinuationRebate: '',
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.fullName = this.$route.query.fullName
    this.LinkMan = this.$route.query.LinkMan
    this.mobile = this.$route.query.mobile
    this.nextVersionRebate = this.$route.query.nextVersionRebate
    this.nextAccountRebate = this.$route.query.nextAccountRebate
    this.nextContinuationRebate = this.$route.query.nextContinuationRebate
  },
  methods: {
    editAgent () {
      let resParams = this.$route.query
      this.$router.push({path: '/agentEdit', query: resParams})
    },
    handPrecent (value) {
      return Math.round(value * 100)
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .agent_container{
    background: #fff;
    line-height: 1.5;
    .agent_container_head{
      background-color: #ebfeff;
      padding: 10px;
      h1{
        font-size: 16px;
        color: #89dade;
        line-height: 1.2;
        border-left: 1px solid #89dade;
        border-left-width: 3px;
        padding-left: 6px;
      }
    }
    .agent_container_p{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #f6f6f6;
      p{
        &:first-child{
          min-width: 20%;;
          color: #505050;
        }
        &:last-child{
          color: #B8BABE;
        }
      }
    }
    .rate_item{
      display: flex;
      span{
        display: block;
        &:first-child{
          width: 90px;
        }
      }
    }
  }
</style>
