<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="连锁店详情">
      <router-link to="/chainManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="shop_detail">
        <div class="item">
          <div class="item_head">
            <h1>连锁信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>连锁店机构代码</p>
              <p>{{chainInfo.GroupCode}}</p>
            </div>
            <div class="item_name">
              <p>公司名称</p>
              <p>{{chainInfo.Title}}</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item_head_two">
            <h1>联系信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>联系人姓名</p>
              <p>{{chainInfo.Manager}}</p>
            </div>
            <div class="item_name">
              <p>联系人手机</p>
              <p>{{chainInfo.Phone}}</p>
            </div>
            <div class="item_name">
              <p>联系座机</p>
              <p>{{chainInfo.Tel}}</p>
            </div>
            <div class="item_name">
              <p>联系地址</p>
              <p>{{chainInfo.Address}}</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item_head">
            <h1>店门信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>已开分店数</p>
              <p>{{chainInfo.ShopCurrent}}</p>
            </div>
            <div class="item_name">
              <p>可增加门店数</p>
              <p>{{chainInfo.ShopMax-chainInfo.ShopCurrent}}</p>
            </div>
            <div class="item_name">
              <p>所属代理商</p>
              <p>{{chainInfo.Email}}</p>
            </div>
            <div class="item_name">
              <p>使用状态</p>
              <p>{{chainInfo.Pic}}</p>
            </div>
            <div class="item_name">
              <p>注册时间</p>
              <p>{{formatDate(chainInfo.AddTime)}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chainInfo: {},
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.getChainInfo()
  },
  methods: {
    getChainInfo () {
      this.chainInfo = this.$route.query
    },
    formatDate (str) {
      if (str) {
        str = str.substring(0, 10)
      }
      return str
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .el-dropdown{
    color: #549dfe;
  }
  .shop_detail{
    margin: 0px;
    .item{
      margin-bottom: 14px;
      line-height: 1.5;
      .item_head{
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
      .item_head_two{
        background-color: #fff6eb;
        padding: 10px;
        h1{
          font-size: 16px;
          line-height: 1.2;
          color: #ffbc66;
          border-left: 1px solid #ffbc66;
          border-left-width: 3px;
          padding-left: 6px;
        }
      }
      .item_p{
        line-height: 2.6;
        background-color: #ffffff;
        .item_name{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f6f6f6;
          margin: 0px 10px;
          p{
            &:first-child{
              color: #505050;
            }
            &:last-child{
              color: #B8BABE;
            }
          }
        }
      }
    }
  }
</style>
