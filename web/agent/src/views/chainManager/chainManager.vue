<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="连锁店">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="tip-content">
      <span class="child-tip">我发展的：{{developCounts}}个</span>
      <br/>
      <span class="child-tip">下级发展的：{{subDevelopCounts}}个</span>
    </div>
    <div class="tip-count">
      <p>共{{AllCounts}}个：使用中{{usingCount}}个；已停用{{closedCount}}个</p>
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
            <li v-for="item in list"  @click="clickHandle(item)" class="page-loadmore-listitem clearfix" style="height: 100%" :key="item.id">
              <div class="l-item">
                <span class="item-name">{{item.Title}}</span>
                <span class="item-count">分店数</span>
              </div>
              <div class="r-item">
                <span class="item-ope" :style="{color:(item.State==0?'#e33e32':'')}">{{item.State==0?'已停用':'使用中'}}</span>
                <span class="item-count">{{item.ShopCurrent}}</span>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      place: '2019/02',
      list: [
        {
          ShopState: 0,
          ShopStateName: 0,
          Title: ''
        }
      ],
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
  methods: {
    getDataList () {
      var params = {}
      params['PageID'] = 1
      params['PageSize'] = 20
      this.$store
        .dispatch('GetChainList', params)
        .then(response => {
          this.list = response.Groups
          this.usingCount = response.Usings
          this.closedCount = response.Stops
          this.AllCounts = response.Totals
          this.developCounts = response.DirectlyUndes
          this.subDevelopCounts = response.Subsidiarys
          this.resLength = response.PageCount
          this.$refs.loadmore.onTopLoaded()
        })
        .catch(() => {
          this.$refs.loadmore.onTopLoaded()
        })
    },
    clickHandle (itemParams) {
      // let queryParams = item
      this.$router.push({ path: '/chainDetail', query: itemParams })
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
        setTimeout(() => {
          this.$store.dispatch('GetChainList', params).then((response) => {
            this.list = this.list.concat(response.Groups)
            if (response.Groups.length === 20) {
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
  },
  created () {
    // for (let i = 1; i <= 20; i++) {
    //   this.list.push(i)
    // }
    this.getDataList()
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top
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
    .child-tip {
    }
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
  .item-name {
    color: #262626;
    font-size: 16px;
    // text-decoration: underline;
  }
  .item-ope{
    color: #549dfe;
    font-size: 14px;
  }
  .page-loadmore {
    width: 100%;
    padding: 0 15px;
    overflow-x: hidden;
    background: #fff;
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
      line-height: 80px;
      padding-top: 10px;
      border-bottom: solid 1px #eee;
      text-align: center;
      &:first-child {
        border-top: solid 1px #eee;
      }
      &>div{
        float: left;
        width: 50%;
        height: 100%;
        .item-count{
          padding-top: 8px;
          font-size: 14px;
        }
      }
      span{
        display: block;
        line-height: 1.6;
      }
      .l-item{
        text-align: left;
      }
      .r-item{
        text-align: right;
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
