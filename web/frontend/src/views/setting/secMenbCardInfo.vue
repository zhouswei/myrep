<template>
  <div v-loading="loading">
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡名称：</span>
        {{pro1}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">消费折扣：</span>
        {{pro2}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">初始储值：</span>
        {{pro3}}
        <span class="infoShowName">售卡金额：</span>
        {{pro4}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">会员卡有效期：</span>
        {{pro5}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">开卡提成类型：</span>
        {{pro6}}
        <span class="infoShowName">提成数：</span>
        {{pro7}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">充值提成类型：</span>
        {{pro8}}
        <span class="infoShowName">提成数：</span>
        {{pro9}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">状态：</span>
        <span  :class="IsRed0 === 1 ? 'on' : '' " style="margin-left:30px;">{{pro10}}</span>
        <span  :class="IsRed1 === 1 ? 'on' : '' " style="margin-left:30px">{{pro11}}</span>
        <span  :class="IsRed2 === 1 ? 'on' : '' " style="margin-left:30px">{{pro12}}</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">积分规则：</span>
        <span style="margin-left: 30px">{{pro13}}</span>
        <span style="margin-left: 30px">{{pro14}}</span>
      </p>
      <div class="infoPerLine1" v-if="isShowSendShops">
        <span class="infoShowName">可发卡门店：</span>
        <span style="margin-left: 20px" v-for="item in shopsSendData" :label="item.label" :key="item.key">{{item.label}}</span>
      </div>
      <div class="infoPerLine1" v-if="isShowUseShops">
        <span class="infoShowName">可用卡门店：</span>
        <span style="margin-left: 20px" v-for="item in shopsUseData" :label="item.label" :key="item.key">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      default: 0
    }
  },
  created () {
    this.update()
  },
  data () {
    return {
      pro1: '',
      pro2: '',
      pro3: '',
      pro4: '',
      pro5: '',
      pro6: '',
      pro7: '',
      pro8: '',
      pro9: '',
      pro10: '',
      pro11: '',
      pro12: '',
      pro13: '',
      pro14: '',
      IsRed0: 0,
      IsRed1: 0,
      IsRed2: 0,
      loading: true,
      shopsUseData: [],
      shopsSendData: [],
      isShowSendShops: false,
      isShowUseShops: false
    }
  },
  methods: {
    update () {
      this.getInfo()
      this.getshops()
    },
    getInfo () {
      this.loading = true
      this.$store.dispatch('queryUCardInfo', {id: this.id}).then((response) => {
        this.pro1 = response.info.Title
        this.pro2 = response.info.Discount + '%'
        this.pro3 = response.info.SavePrice + '元'
        this.pro4 = response.info.SalePrice + '元'
        this.pro5 = response.info.ActiveMonth + '个月'
        this.pro6 = this.getSaleCommTypeName(response.info.SaleCommType)
        this.pro7 = response.info.SaleCommType > 0 ? (response.info.SaleCommType === 3 ? response.info.SaleComm + '元/张' : response.info.SaleComm + '%') : ''
        this.pro8 = this.getFillCommTypeName(response.info.FillCommType)
        this.pro9 = response.info.FillCommType > 0 ? response.info.FillComm + '%' : ''
        if (response.info.IsClose) {
          this.IsRed0 = 1
          this.pro10 = '禁用'
        } else {
          this.pro10 = '启用'
        }
        if (response.info.IsAllowPay) {
          this.pro11 = '可充值'
        } else {
          this.pro11 = '不可充值'
          this.IsRed1 = 1
        }
        if (response.info.IsScore) {
          this.pro12 = '可积分'
        } else {
          this.pro12 = '不可积分'
          this.IsRed2 = 1
        }
        if (response.info.IsAllowPay && response.info.IsScore) {
          this.pro13 = '充值( ' + response.info.UCardFillScore + ' )元即可获得1积分；'
        } else {
          this.pro13 = ''
        }
        if (response.info.IsScore) {
          this.pro14 = '消费( ' + response.info.UCardPayScore + ' )元即可获得1积分'
        } else {
          this.pro14 = ''
        }
        this.loading = false
      }).catch(() => {
      })
    },
    getSaleCommTypeName (val) {
      switch (val) {
        case 1 :
          return '卡储金额'
        case 2 :
          return '售卡金额'
        case 3 :
          return '按张提成'
      }
    },
    getFillCommTypeName (val) {
      switch (val) {
        case 1 :
          return '充赠总额'
        case 2 :
          return '充值金额'
      }
    },
    getshops () {
      this.loading = true
      this.$store.dispatch('queryBindShops', {id: this.id}).then((response) => {
        this.shopsUseData = []
        response.shopsUse.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsUseData.push(tmpObj)
        })
        if (this.shopsUseData.length > 0) {
          this.isShowUseShops = true
        } else {
          this.isShowUseShops = false
        }
        this.shopsSendData = []
        response.shopsSend.forEach(element => {
          var tmpObj = {}
          tmpObj.key = element.ID
          tmpObj.label = element.Title
          this.shopsSendData.push(tmpObj)
        })
        if (this.shopsSendData.length > 0) {
          this.isShowSendShops = true
        } else {
          this.isShowSendShops = false
        }
        this.loading = false
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infoPerLine1 {
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
    font-size: 14px;
}
.infoShowName {
    display: inline-block;
    width: 187px;
    line-height: 30px;
    text-align: right;
    color: #5e5e5e;
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    font-family: 'Microsoft YaHei UI';
    font-family: '微软雅黑';
}
.on{
color: red;
}
</style>
