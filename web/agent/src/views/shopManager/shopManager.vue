<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="商户管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="shareclick">搜索</mt-button>
    </mt-header>
    <div class="tip-content">
      <span class="child-tip">我发展的：{{developCounts}}个</span>
      <br/>
      <span class="child-tip">下级发展的：{{subDevelopCounts}}个</span>
    </div>
    <div class="tip-count">
      <p>共{{AllCounts}}个：待付款：{{payPendingCount}}个；待审核：{{auditPendingCount}}个；使用中：{{usingCount}}个；已停用：{{closedCount}}个</p>
    </div>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore
          :top-method="loadTop"
          @translate-change="translateChange"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore">
          <ul class="page-loadmore-list">
            <li v-for="item in list" @click="clickHandle(item.ID)" class="page-loadmore-listitem" style="height: 100%" :key="item.id">
              <div class="clearfix shop-item">
                <div class="l-item">
                    <span class="item-name">{{item.Title}}</span>
                    <span class="item-count">{{item.ShopTypeName}} - {{item.VersionName}}</span>
                </div>
                <div class="r-item">
                  <span class="item-ope" :style="{color:(item.ShopState==0?'#e33e32':'')}">{{item.ShopStateName}}</span>
                </div>
              </div>
              <div class="shop-detail">
                合同：<span>￥{{item.AgreementPrice}},</span>
                尾款：<span>￥{{item.Section}},</span>
                年费：<span>￥{{item.ContinuationMoneys}}</span>
              </div>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span
              v-show="bottomStatus !== 'loading'"
              :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >↑</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <mt-button @click="addClick" type="primary" class="button-add el-icon-plus"></mt-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      place: '2019/02',
      list: [],
      topStatus: '',
      wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      developCounts: 0,
      subDevelopCounts: 0,
      AllCounts: 0,
      payPendingCount: 0,
      auditPendingCount: 0,
      usingCount: 0,
      closedCount: 0,
      specHeight: this.$store.getters.statusBarHeight,
      isCanAddSub: false,
      pageId: 1,
      resLength: 0,
      allLoaded: false,
      bottomStatus: ''
    }
  },
  mounted () {
    this.getDataList()
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  },
  methods: {
    getDataList () {
      var params = {}
      params['PageID'] = 1
      params['PageSize'] = 20
      params['VersionID'] = 0
      params['searchRange'] = 0
      let getQueryObj = this.$route.query
      if (JSON.stringify(getQueryObj) !== '{}') {
        params['ShopTitle'] = getQueryObj.shopName
        params['ChainType'] = getQueryObj.chainType
        params['VersionID'] = getQueryObj.version
        params['ShopStatus'] = getQueryObj.shopStatus
        params['SectionEndDate'] = getQueryObj.payStartDate ? getQueryObj.payStartDate + ',' + getQueryObj.payEndDate : ''
        params['ServiceEndDate'] = getQueryObj.serviceStartDate ? getQueryObj.serviceStartDate + ',' + getQueryObj.serviceEndDate : ''
        params['searchRange'] = getQueryObj.searchRange
      }
      this.$store.dispatch('GetCurrentShopList', params).then((response) => {
        this.list = response.Shops
        this.developCounts = response.MyShops
        this.subDevelopCounts = response.SubShops
        this.AllCounts = response.Totals
        this.payPendingCount = response.WaitPay
        this.auditPendingCount = response.WaitAudit
        this.usingCount = response.Usings
        this.closedCount = response.Stopings
        this.resLength = response.PageCount
        this.$refs.loadmore.onTopLoaded()
      }).catch(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    addClick () {
      this.$router.push({ path: '/shopAddLevel1' })
    },
    shareclick () {
      this.$router.push({ path: '/shopSearch' })
    },
    clickHandle (Id) {
      this.$router.push({ path: '/shopDetail', query: { shopId: Id } })
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    translateChange (translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    },
    loadTop () {
      this.getDataList()
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      if (this.pageId < this.resLength) {
        var params = {}
        params['PageID'] = this.pageId + 1
        params['PageSize'] = 20
        params['VersionID'] = 0
        params['searchRange'] = 0
        let getQueryObj = this.$route.query
        if (JSON.stringify(getQueryObj) !== '{}') {
          params['ShopTitle'] = getQueryObj.shopName
          params['ChainType'] = getQueryObj.chainType
          params['VersionID'] = getQueryObj.version
          params['ShopStatus'] = getQueryObj.shopStatus
          params['SectionEndDate'] = getQueryObj.payStartDate ? getQueryObj.payStartDate + ',' + getQueryObj.payEndDate : ''
          params['ServiceEndDate'] = getQueryObj.serviceStartDate ? getQueryObj.serviceStartDate + ',' + getQueryObj.serviceEndDate : ''
          params['searchRange'] = getQueryObj.searchRange
        }
        setTimeout(() => {
          this.$store.dispatch('GetCurrentShopList', params).then((response) => {
            this.list = this.list.concat(response.Shops)
            if (response.Shops.length === 20) {
              this.pageId++
            }
          }).catch(() => {
          })
          this.$refs.loadmore.onBottomLoaded()
        }, 1000)
      } else {
        this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tip-content {
    padding: 10px 15px;
    margin: 15px;
    background: #37bfc8;
    border-radius: 5px;
    height: 70px;
    color: #fff;
    line-height: 1.6;
  }
  .tip-count {
    padding: 0px 15px;
    background: #e0e0e0;
    p {
      color: #515151;
      font-size: 14px;
      padding: 8px 0px;
    }
  }
  .button-add {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 70px;
    height: 70px;
    padding: 0;
    font-size: 35px;
    border-radius: 120px;
    -webkit-box-shadow: 0px 0px 15px #e4e4e4;
    box-shadow: 0px 0px 15px #e4e4e4;
    background-color: #e2f8fa;
    color: #37bfc8;
    z-index: 1;
  }
  .item-name {
    color: #262626;
    font-size: 18px;
    text-decoration: none;
    margin-bottom: 10px;
  }
  .item-ope{
    color: #549dfe;
    margin-bottom: 10px;
  }
  .page-loadmore {
    width: 100%;
    padding: 0 15px;
    overflow-x: hidden;
    background-color: #fff;
    .page-loadmore-desc {
      text-align: center;
      color: #666;
      padding-bottom: 5px;
      &:last-of-type {
        border-bottom: solid 1px #eee;
      }
    }
    .page-loadmore-listitem {
      min-height: 80px;
      border-bottom: solid 1px #eee;
      text-align: center;
      padding: 10px 0 15px;
      &:first-child {
        border-top: solid 1px #eee;
      }
      .shop-item{
        line-height: initial;
        font-size: 14px;
        &>div{
          float: left;
          width: 50%;
          height: 100%;
          .item-count{
            color: #666;
          }
        }
        span{
          display: block;
          line-height: 1.5;
        }
        .l-item{
          text-align: left;
        }
        .r-item{
          text-align: right;
        }
      }
      .shop-detail{
        font-size: 14px;
        text-align: left;
        color: #666;
        margin-top: 5px;
      }
    }
    .page-loadmore-wrapper {
      margin-top: -1px;
      overflow: scroll;
    }
    .mint-spinner {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .loading-background {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: .2s linear;
  }
  .mint-loadmore-top {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
    }
  }
</style>
