<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="备用金管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button slot="right" @click="testclick">测试</mt-button> -->
    </mt-header>
    <div class="tip-content">
      <span class="child-tip">备用金余额：</span>
      <span class="child-tip-money">{{reservesSeqMoneys}}元</span>
    </div>
    <div class="date_picker">
      <el-date-picker
        v-model="place"
        size="middle"
        type="month"
        style="width:100%"
        @change="dateSearch"
        >
      </el-date-picker>
      <p style="margin-top: 0px;">本月交款：{{payMoneys}} 元; 使用：{{consumeMoneys}}元</p>
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
            <li v-for="item in list" class="page-loadmore-listitem clearfix" :key="item.id">
              <span class="item_data">{{item.TradeDate}}</span>
              <div style="height: 100%" class="clearfix" v-for="sub_item in item.Items" :key="sub_item.Value">
                <div class="left_item" :style="{width:(!sub_item.Value?'100%':'')}">
                  <span>{{sub_item.Name}}</span>
                </div>
                <div class="right_item">
                  <span>{{sub_item.Value}}</span>
                </div>
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
import { parseTime } from '@/utils'
export default {
  data () {
    return {
      list: [],
      place: new Date(),
      topStatus: '',
      wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      reservesSeqMoneys: 0,
      consumeMoneys: 0,
      payMoneys: 0,
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
      params['YearAndMonth'] = parseTime(this.place, '{y}-{m}')
      this.$store.dispatch('AgentReservesListGet', params).then((response) => {
        this.list = response.ReservesItems
        this.reservesSeqMoneys = response.ReservesSeqMoneys
        this.consumeMoneys = response.ConsumeMoneys
        this.payMoneys = response.PayMoneys
        this.resLength = response.PageCount
        this.$refs.loadmore.onTopLoaded()
      }).catch(() => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    dateSearch () {
      this.getDataList()
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
        params['YearAndMonth'] = parseTime(this.place, '{y}-{m}')
        setTimeout(() => {
          this.$store.dispatch('AgentReservesListGet', params).then((response) => {
            this.list = this.list.concat(response.ReservesItems)
            if (response.ReservesItems.length === 20) {
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
  .tip-content {
    padding: 12px 0;
    margin: 15px;
    background: linear-gradient(-90deg,#f24832,#f2be3c);
    border-radius: 5px;
    color: #fff;
    .child-tip {
      display: block;
      padding: 0 15px;
      line-height: 1.4;
      font-size: 15px;
    }
    .child-tip-money{
      display: block;
      padding: 0 15px;
      line-height: 1.4;
      font-size: 20px;
    }
    .button-save{
      background: #fff;
      color: #549dfe;
      padding: 0 20px;
    }
  }
  .date_picker{
    background: #fff;
    margin-bottom: 10px;
    padding: 15px 15px;
    p{
      padding-top: 9px;
      font-size: 14px;
      color: #666;
    }
  }
  .el-input--medium .el-input__inner{
    height: 20px;
    line-height: 20px;
  }
  .page-loadmore {
    width: 100%;
    // padding: 5px;
    overflow-x: hidden;
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
      border-bottom: solid 1px #eee;
      text-align: center;
      margin-bottom: 10px;
      padding: 45px 15px 5px;
      position: relative;
      background-color: #fff;
      .item_data{
        position: absolute;
        left: 0;
        top: 10px;
        background-color: #e0e0e0;
        color: #fff;
        padding: 3px 10px 3px 5px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
      &:first-child {
        border-top: solid 1px #eee;
      }
      .left_item{
        float: left; width: 50%;;
      }
      .right_item{
        float: left; width: 50%;
        span{
          text-align: right;
        }
      }
      span{
        display: block;
        line-height: 1.5;
        text-align: left;
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
