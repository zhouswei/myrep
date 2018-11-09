// 消费入单组件
<template>
  <div class="contain_css">
    <span class="left-ali-tex">会员卡号：{{memberCardNo}}</span>
    <br/>
    <span class="left-ali-tex">客户姓名：{{userName}}</span>
    <br/>
    <span class="left-ali-tex">卡类型：{{CardType}}</span>
    <br/>
    <span class="left-ali-tex">手机号：{{telephone}}</span>
    <br/>
    <span class="left-ali-tex">卡状态：{{CardStatus}}</span>
    <br/>
    <span class="left-ali-tex">性别：{{Sex}}</span>
    <br/>
    <span class="left-ali-tex">账面余额：{{AccountLeave}}</span>
    <br/>
    <span class="left-ali-tex">本金比率：{{PrincialRate}}</span>
    <br/>
    <span class="left-ali-tex">实际余额：{{RealLeave}}</span>
    <br/>
    <span class="left-ali-tex">赠送余额：{{ZenLeave}}</span>
    <br/>
    <span class="left-ali-tex">消费总额：{{CastTotal}}</span>
    <br/>
    <span class="left-ali-tex">充值总额：{{ChargeTotal}}</span>
    <br/>
    <span class="left-ali-tex">积分：{{discount}}</span>
    <br/>
    <span class="left-ali-tex">累计消费次数：{{CastCount}}</span>
    <br/>
    <span class="left-ali-tex">累计充值次数：{{ChargeCount}}</span>
    <br/>
    <span class="left-ali-tex">最后消费日期：{{lastCastDate}}</span>
    <br/>
    <span class="left-ali-tex">最后充值日期：{{lastChargeDate}}</span>
    <br/>
    <span class="left-ali-tex">开卡日期：{{OpenCardDate}}</span>
    <br/>
    <span class="left-ali-tex">开卡门店：{{OpenShop}}</span>
    <br/>
    <span class="left-ali-tex">卡有效期：{{ValiteTime}}</span>
  </div>
</template>
<script>
import { value2Status, returnSexTitle, returnOpencardTitle } from '@/utils/member'
import { parseTime, formatTimestamp } from '@/utils'
export default {
  props: {
    ID: {
      type: String,
      default: ''
    },
    ShopId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      test: '12113',
      memberCardNo: '',
      userName: '',
      CardType: '',
      telephone: '',
      CardStatus: 0,
      Sex: 0,
      AccountLeave: 0,
      PrincialRate: 0,
      RealLeave: 0,
      ZenLeave: 0,
      CastTotal: 0,
      ChargeTotal: 0,
      discount: 0,
      CastCount: 0,
      ChargeCount: 0,
      lastCastDate: 0,
      lastChargeDate: 0,
      OpenCardDate: 0,
      OpenShop: 0,
      ValiteTime: 0
    }
  },
  created () {
    // this.queryMemberDetailInfo()
  },
  methods: {
    update () {
      this.queryMemberDetailInfo()
    },
    queryMemberDetailInfo () {
      this.$store.dispatch('GetMemberDetailInfo', {id: this.ID, shopID: this.ShopId}).then(response => {
        this.memberCardNo = response.info.CardNo
        this.userName = response.info.UserName
        this.CardType = response.info.UCardTypeTitle
        this.telephone = response.info.Mobile
        this.CardStatus = value2Status(response.info.State)
        this.Sex = returnSexTitle(response.info.Sex)
        this.AccountLeave = response.GetTotalMoney
        this.PrincialRate = response.GetRateNum
        this.RealLeave = response.info.RealPrice
        this.ZenLeave = response.info.FreeRealPrice
        this.CastTotal = response.info.TotalMoney - response.info.CurMoney - response.info.ClearMoney
        this.ChargeTotal = response.info.TotalMoney
        this.discount = response.info.Score
        this.CastCount = response.PayCount
        this.ChargeCount = response.FillCount
        this.lastCastDate = response.PayEndTime
        this.lastChargeDate = response.FillEndTime === '' ? parseTime(formatTimestamp(response.info.AddDate), '{y}/{m}/{d}') : response.FillEndTime
        this.OpenCardDate = parseTime(formatTimestamp(response.info.AddDate), '{y}/{m}/{d}')
        this.OpenShop = returnOpencardTitle(response.info.ShopID)
        this.ValiteTime = parseTime(formatTimestamp(response.info.EndTime), '{y}/{m}/{d}')
      }).catch(() => {

      })
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .contain_css {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
  }
  .left-ali-tex {
    text-align: center;
    float: left;
  }
  .right-ali-tex {
    text-align: center;
    float: right;
  }
  .castorder-wrap {
    height: 500px;
    .category {
      background: #ff0;
    }
    .detail {
      padding: 5px;
      background: #0ff;
    }
  }
  .el-input-number--mini {
    width: 90px;
  }
</style>
