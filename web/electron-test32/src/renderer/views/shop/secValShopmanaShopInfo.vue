<template>
  <div>
    <div>
      <p class="infoPerLine1">
        <span class="infoShowName">
          门店注册码：
        </span>
        {{pro1}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">门店名称：</span>
        {{pro2}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系人手机号：</span>
        {{pro3}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">联系邮箱：</span>
        {{pro4}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">营业面积：</span>
        {{pro5}}
        <span v-if="isShow">㎡</span>
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">营业时间：</span>
        {{pro6}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">门店地址：</span>
        {{pro7}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">门店类型：</span>
        {{pro8}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">开通账户数：</span>
        {{pro9}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">开通短信数：</span>
        {{pro10}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">服务有效期：</span>
        {{pro11}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">商户状态：</span>
        {{pro13}}
      </p>
      <p class="infoPerLine1">
        <span class="infoShowName">注册时间：</span>
        {{pro14}}
      </p>
    </div>
    <div style="position: absolute; top: 100px; left: 610px;">
      <p>
        门店照片:
        <img v-bind:src="pic" onerror="this.src='http://r.handnear.com/chain/img/noPage.png?v=1.0.1'" style="width: 360px; height: 180px">
      </p>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTimestamp } from '@/utils'
import { getShopType, getImageUrlPara } from '@/utils/shop'
export default {
  props: {
    ID: {
      default: 0
    }
  },
  data () {
    return {
      pro1: '',
      pro2: '',
      pro3: '',
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
      pic: ''
    }
  },
  created () {
    this.update()
  },
  methods: {
    successLoadImg (event) {
      if (event.target.complete === true) {
        event.target.classList.remove('default-image')
        var imgParentNode = event.target.parentNode
        if (imgParentNode.classList.contains('show-img') === true) {
          imgParentNode.style.background = '#000'
        }
      }
    },
    update () {
      this.$store.dispatch('queryValideShopDetailData', {id: this.ID}).then((response) => {
        this.pro1 = response.info.ShopCode
        this.pro2 = response.info.Title
        this.pro3 = response.info.Phone
        this.pro4 = response.info.Email
        this.pro5 = response.info.Space === 0 ? '' : response.info.Space
        if (this.pro5 === '') {
          this.isShow = false
        } else {
          this.isShow = true
        }
        this.pro6 = response.info.ShopHours === '~' ? '' : response.info.ShopHours
        this.pro7 = response.info.AddressAll
        this.pro8 = getShopType(response.info.ChainType)
        this.pro9 = response.info.AccountMax
        this.pro10 = response.info.SMSMax
        this.pro11 = parseTime(formatTimestamp(response.info.ServiceEndDate), '{y}-{m}-{d} {h}:{i}:{s}')
        this.pro13 = response.info.IsClose ? '停用' : '有效'
        this.pro14 = parseTime(formatTimestamp(response.info.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
        this.pic = getImageUrlPara() + response.info.Pic
        // http://up.handnear.com//uploadpic/Shop/201612/20161215152878037832.png
        // /uploadpic/Shop/201612/20161215152878037832.png
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
</style>
