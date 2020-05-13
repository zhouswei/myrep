<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="提现记录">
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="backHandle">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="date_picker">
      <el-date-picker
        v-model="place"
        size="middle"
        type="month"
        style="width:100%"
        @change="dateSearch"
        >
      </el-date-picker>
      <p style="margin-top: 0px;">本月提现总额：{{applyMoneys}} 元</p>
    </div>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="ApplyTime"
              label="日期"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="ApplyMoneys"
              label="提现金额"
              align="center"
              width="">
            </el-table-column>
            <el-table-column
              prop="ApplyStatusName"
              align="center"
              label="状态">
            </el-table-column>
          </el-table>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
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
      place: new Date(),
      list: [],
      topStatus: '',
      wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
      tableData: [],
      applyMoneys: 0,
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  methods: {
    getDataList () {
      var params = {}
      params['PageID'] = 1
      params['PageSize'] = 20
      params['SearchYear'] = this.place.getFullYear()
      params['SearchMonth'] = this.place.getMonth() + 1
      this.$store.dispatch('agentApplyListGet', params).then((response) => {
        this.tableData = response.Applys
        this.tableData.forEach((element) => {
          element.ApplyTime = this.formatDate(element.ApplyTime)
        })
        this.applyMoneys = response.ApplyMoneys
      }).catch(() => {

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
    formatDate (str) {
      if (str) {
        str = str.substring(0, 10)
      }
      return str
    },
    loadTop () {
      setTimeout(() => {
        let firstValue = this.list[0]
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i)
        }
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    backHandle () {
      this.$router.go(-1)
    }
  },
  created () {
    // for (let i = 1; i <= 20; i++) {
    //   this.list.push(i)
    // }
    // this.getDataList()
  },
  mounted () {
    this.getDataList()
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .tip-content {
    padding: 15px 0;
    margin: 5px;
    background: linear-gradient(-90deg,#f24832,#f2be3c);
    border-radius: 5px;
    height: 65px;
    color: #fff;
    .child-tip {
      padding: 20px;
      margin-right: 66px;
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
    padding: 10px 15px;
    p{
      padding:5px 0;
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
      padding: 42px 10px 5px;
      position: relative;
      background-color: #fff;
      .item_data{
        position: absolute;
        left: 0;
        top: 5px;
        background-color: #e0e0e0;
        color: #fff;
        padding: 3px 10px 3px 5px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
      &:first-child {
        border-top: solid 1px #eee;
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
