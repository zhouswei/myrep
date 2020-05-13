<template>
  <div>
    <div :style="{height: specHeight + 'px'}" style="width: 100%;"></div>
    <mt-header style="padding: 0px;" title="商户详情">
      <router-link to="/shopManager" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <el-dropdown trigger="click" v-if="shopInfo.HasPaySectionButton||shopInfo.HasBuyAccountButton||shopInfo.HasContinuationButton||shopInfo.HasUpgradesButton" @command="handleCommand" class="settting-drop" slot="right">
        <span class="el-dropdown-link user-name">操作</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" v-if="shopInfo.HasPaySectionButton">付尾款</el-dropdown-item>
          <el-dropdown-item command="b" v-if="shopInfo.HasBuyAccountButton">购买账户</el-dropdown-item>
          <el-dropdown-item command="c" v-if="shopInfo.HasContinuationButton">续年费</el-dropdown-item>
          <el-dropdown-item command="d" v-if="shopInfo.HasUpgradesButton">升级版本</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </mt-header>
    <div class="shop_detail">
        <div class="item">
          <div class="item_head">
            <h1>商户信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>商户编码</p>
              <p>{{shopInfo.ShopCode}}</p>
            </div>
            <div class="item_name">
              <p>商户名称</p>
              <p>{{shopInfo.Title}}</p>
            </div>
            <div class="item_name">
              <p>主营业务</p>
              <p>{{shopInfo.MainBusinessName}}</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item_head_two">
            <h1>联系信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>商户联系人</p>
              <p>{{shopInfo.Manager}}</p>
            </div>
            <div class="item_name">
              <p>联系人手机</p>
              <p>{{shopInfo.Phone}}</p>
            </div>
            <div class="item_name">
              <p>联系邮箱</p>
              <p>{{shopInfo.Email}}</p>
            </div>
            <div class="item_name">
              <p>营业面积</p>
              <p>{{shopInfo.Space}}</p>
            </div>
            <div class="item_name">
              <p>营业时间</p>
              <p>{{shopInfo.ShopHours}}</p>
            </div>
            <div class="item_name link_address">
              <p>联系地址</p>
              <p>{{shopInfo.fullAddress}}</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item_head">
            <h1>签约信息</h1>
          </div>
          <div class="item_p">
            <div class="item_name">
              <p>经营模式</p>
              <p>{{shopInfo.ChainTypeName}}</p>
            </div>
            <div class="item_name">
              <p>版本</p>
              <p>{{shopInfo.VersionName}}</p>
            </div>
            <div class="item_name">
              <p>合同总金额</p>
              <p>￥{{shopInfo.AgreementPrice}}</p>
            </div>
            <div class="item_name">
              <p>首付款</p>
              <p>￥{{shopInfo.AgreementPrice-shopInfo.Section}}</p>
            </div>
            <div class="item_name">
              <p>剩余尾款</p>
              <p>￥{{shopInfo.Section}}</p>
            </div>
            <div class="item_name">
              <p>尾款到期日</p>
              <p>{{handleStr(shopInfo.SectionEndDate)}}</p>
            </div>
            <div class="item_name">
              <p>服务有效期</p>
              <p>{{handleStr(shopInfo.ServiceEndDate)}}</p>
            </div>
            <div class="item_name">
              <p>服务续费金额</p>
              <p>{{shopInfo.ContinuationMoneys}}</p>
            </div>
            <div class="item_name">
              <p>总账号数</p>
              <p>{{shopInfo.AccountMax}}个</p>
            </div>
            <div class="item_name">
              <p>剩余可用账号数</p>
              <p>{{shopInfo.AccountMax-shopInfo.AccountCurrent}}个</p>
            </div>
            <div class="item_name">
              <p>剩余短信数</p>
              <p>{{shopInfo.SMSMax-shopInfo.SMSCurrent}}</p>
            </div>
            <div class="item_name">
              <p>所属代理商</p>
              <p>{{shopInfo.AgentName}}</p>
            </div>
            <div class="item_name">
              <p>商户状态</p>
              <p>{{shopInfo.StatusName}}</p>
            </div>
            <div class="item_name">
              <p>备注：</p>
              <p>{{shopInfo.Remark}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
// import { parseTime, formatTimestamp } from '@/utils'
export default {
  data () {
    return {
      shopInfo: {
        'GroupName': '',
        'fullAddress': '',
        'VersionName': '',
        'ChainTypeName': '',
        'AgentName': '',
        'ID': 0,
        'GroupID': 0,
        'Title': '',
        'Pic': '',
        'Space': 0,
        'ShopHours': '',
        'ShopType': 0,
        'ShopIndustry': 0,
        'Phone': '',
        'Province': 0,
        'City': 0,
        'Area': 0,
        'Address': '',
        'X': 0,
        'Y': 0,
        'AddTime': '2019-03-22T16:10:16.9094505+08:00',
        'AdminId': 0,
        'IsClose': true,
        'ShopCode': '',
        'AccountMax': null,
        'AccountCurrent': null,
        'VersionLevel': null,
        'ServiceStartDate': null,
        'ServiceEndDate': null,
        'SMSMax': 0,
        'SMSCurrent': 0,
        'Manager': '',
        'Email': '',
        'ChainType': 0,
        'ModifyTime': '2019-03-22T16:10:16.9174509+08:00',
        'IsFirstSMSWarning': true,
        'IsSecondSMSWarning': true,
        'Section': null,
        'SectionEndDate': '',
        'Renewal_amount': null,
        'ServiceNo': 0,
        'AgentID': 0,
        'SellerID': 0,
        'EffetcIDs': '',
        'AgreementPrice': 0,
        'JuridicalPersonName': '',
        'JuridicalPersonIDNumber': '',
        'JuridicalPersonIDPic1': '',
        'JuridicalPersonIDPic2': '',
        'ContinuationMoneys': 0,
        'BusinessLicenseNumber': '',
        'BusinessLicensePic': '',
        'AccountPrice': 0,
        'MainBusinessName': '',
        'Remark': ''
      },
      specHeight: this.$store.getters.statusBarHeight
    }
  },
  mounted () {
    this.getShopInfo()
  },
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        // 基本信息 弹框
        let queryParams = {
          shopId: this.shopInfo.ID,
          groupName: this.shopInfo.Title,
          section: this.shopInfo.Section,
          sectionEndDate: this.shopInfo.SectionEndDate
        }
        this.$router.push({ path: '/finalPayment', query: queryParams })
      } else if (command === 'b') {
        let queryParams = {
          shopId: this.shopInfo.ID,
          groupName: this.shopInfo.Title,
          section: this.shopInfo.Section,
          sectionEndDate: this.shopInfo.SectionEndDate,
          accountMax: this.shopInfo.AccountMax,
          accountCurrent: (this.shopInfo.AccountMax - this.shopInfo.AccountCurrent),
          accountPrice: this.shopInfo.AccountPrice
        }
        this.$router.push({ path: '/buyAccount', query: queryParams })
      } else if (command === 'c') {
        let queryParams = {
          shopId: this.shopInfo.ID,
          groupName: this.shopInfo.Title,
          continuationMoneys: this.shopInfo.ContinuationMoneys,
          serviceEndDate: this.shopInfo.ServiceEndDate
        }
        this.$router.push({ path: '/RenewalYear', query: queryParams })
      } else if (command === 'd') {
        // 下级分润 页面
        let queryParams = {
          shopId: this.shopInfo.ID,
          groupName: this.shopInfo.Title,
          versionName: this.shopInfo.VersionName
        }
        this.$router.push({ path: '/updateVersion', query: queryParams })
      }
    },
    getShopInfo () {
      var params = {}
      params['ShopID'] = this.$route.query.shopId
      this.$store.dispatch('GetAgentShopInfo', params).then((response) => {
        this.shopInfo = response.ShopInfo
        // this.shopInfo.ServiceEndDate = parseTime(formatTimestamp(this.shopInfo.ServiceEndDate), '{y}-{m}-{d}')
      }).catch(() => {

      })
    },
    handleStr (str) {
      return str.substring(0, 10)
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
        background-color: #ffffff;
        .item_name{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f6f6f6;
          margin: 0px 10px;
          p{
            line-height: 2.6;
            &:first-child{
              color: #505050;
            }
            &:last-child{
              color: #B8BABE;
            }
          }
        }
        .link_address {
          p {
            line-height: 1.8;
            &:first-child {
              width: 140px;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
</style>
