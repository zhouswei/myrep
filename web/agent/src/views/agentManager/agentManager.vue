<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="代理商管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="shareclick">搜索</mt-button>
    </mt-header>
    <div class="tip-content">
      <span class="child-tip">直属下级：{{directlyUndes}}个</span>
      <br/>
      <span class="child-tip">全部下级：{{subsidiarys}}个</span>
      <!-- <mt-button class="button-save" size="small" type="primary">邀请记录</mt-button> -->
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
            <li v-for="item in list" class="page-loadmore-listitem" :key="item.id" @click="clickHandle(item)">
              <div style="height: 100%">
                <p>{{item.LinkMan}}</p>
                <p class="page-loadmore-list-mobile">{{item.Mobile}}</p>
              </div>
              <!-- <em class="el-icon-arrow-right"></em> -->
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
    <mt-button v-show="isCanAddSub"  @click="addClick" class="button-add el-icon-plus" size="large" type="primary"></mt-button>
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
      directlyUndes: 0,
      subsidiarys: 0,
      specHeight: this.$store.getters.statusBarHeight,
      isCanAddSub: false,
      pageId: 1,
      resLength: 0,
      allLoaded: false,
      bottomStatus: ''
    }
  },
  methods: {
    shareclick () {
      this.$router.push({ path: '/agentSearch' })
    },
    clickHandle (agentItem) {
      let queryParams = {
        fullName: agentItem.FullName,
        LinkMan: agentItem.LinkMan,
        mobile: agentItem.Mobile,
        nextVersionRebate: agentItem.VersionRebate,
        nextAccountRebate: agentItem.AccountRebate,
        nextContinuationRebate: agentItem.ContinuationRebate,
        agentId: agentItem.ID
      }
      this.$router.push({ path: '/agentDetail', query: queryParams })
    },
    addClick () {
      this.$router.push({ path: '/agentadd' })
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
    getDataList () {
      var params = {}
      params['PageID'] = 1
      params['PageSize'] = 20
      params['AgentLevals'] = 5
      let getQueryObj = this.$route.query
      if (JSON.stringify(getQueryObj) !== '{}') {
        params['AgentLevals'] = getQueryObj.agentClass === '' ? 5 : getQueryObj.agentClass
        params['fullName'] = getQueryObj.groupName
        params['linkMan'] = getQueryObj.linkMan
        params['Mobile'] = getQueryObj.mobile
      }
      this.$store.dispatch('GetAgentList', params).then((response) => {
        this.list = response.SubAgents
        this.directlyUndes = response.DirectlyUndes
        this.subsidiarys = response.Subsidiarys
        this.isCanAddSub = response.IsCanAddSub
        this.resLength = response.PageCount
        this.$refs.loadmore.onTopLoaded()
      }).catch(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      if (this.pageId < this.resLength) {
        var params = {}
        params['PageID'] = this.pageId + 1
        params['PageSize'] = 20
        params['AgentLevals'] = 5
        setTimeout(() => {
          this.$store.dispatch('GetAgentList', params).then((response) => {
            this.list = this.list.concat(response.SubAgents)
            if (response.SubAgents.length === 20) {
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
  mounted () {
    this.getDataList()
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .button-add {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 70px;
    height: 70px;
    padding: 0;
    font-size: 35px;
    border-radius: 120px;
    box-shadow: 0px 0px 15px #e4e4e4;
    background-color: #e2f8fa;
    color: #37bfc8;
    z-index: 1;
  }
  .tip-content {
    position: relative;
    padding: 15px;
    margin: 15px;
    background: #37bfc8;
    border-radius: 5px;
    height: 70px;
    color: #fff;
    .button-save{
      position: absolute;
      right: 30px;
      top: 18px;
      background: #fff;
      color: #549dfe;
    }
  }
  .page-loadmore {
    width: 100%;
    overflow-x: hidden;
    background: #fff;
    .page-loadmore-listitem {
      line-height: 1.5;
      position: relative;
      padding: 10px 0;
      border-bottom: solid 1px #eee;
      em{
        position: absolute;
        right: 10px;
        top: 50%;
        display: block;
        margin-top: -13px;;
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
    .page-loadmore-list{
      margin: 0 15px;
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
  .page-loadmore-list-mobile{
    font-size: 14px;
  }
</style>
