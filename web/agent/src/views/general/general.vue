<template>
  <div>
    <component class="tipSty" :is="currentView"></component>
    <el-row class="el_bg">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#37bfc8'}">
          <div slot="header" :style="{background: '#5b9fa3', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/home.png')" width=24 height=24>
            <span class="header-title">已有门店</span>
          </div>
          <div class="content-body">
            {{shopInfo.GroupIndex.ShopSum + '家'}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#fab152'}">
          <div slot="header" :style="{background: '#bc9868', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/IndexIcon-staff.png')" width=24 height=24>
            <span class="header-title">总员工</span>
          </div>
          <div class="content-body">
            {{shopInfo.GroupIndex.UserSum + '人'}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#e68086'}">
          <div slot="header" :style="{background: '#b27f82', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/vipcrown.png')" width=24 height=24>
            <span class="header-title">总会员</span>
          </div>
          <div class="content-body">
            {{shopInfo.GroupIndex.UCardSum + '人'}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#a3cd60'}">
          <div slot="header" :style="{background: '#91a66f', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/top_up.png')" width=24 height=24>
            <span class="header-title">昨日充值总金额</span>
          </div>
          <div class="content-body">
            {{'￥' + shopInfo.UCardRealPrice}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#37bfc8'}">
          <div slot="header" :style="{background: '#5b9fa3', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/money.png')" width=24 height=24>
            <span class="header-title">昨日收入总金额</span>
          </div>
          <div class="content-body">
            {{'￥' + shopInfo.GroupIndex.RealPrice}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="6" :xl="6">
        <el-card class="box-card" :body-style="{background: '#fab152'}">
          <div slot="header" :style="{background: '#bc9868', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/order.png')" width=24 height=24>
            <span class="header-title">昨日总订单</span>
          </div>
          <div class="content-body">
           {{shopInfo.GroupIndex.OrderSum + '单'}}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="common-area">
      <div class="common-area-title">常用功能</div>
      <div class="common-area-body">
      </div>
      <el-row class="link-area" :gutter="10">
        <el-col v-if="isPermission(6)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(1)">
              <img :src="tranlatePath('static/img/shopMan.png')">
              <div>
                门店管理
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(31)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(2)">
              <img :src="tranlatePath('static/img/search_crew.png')">
              <div>
                查询人员
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(33)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(3)">
              <img :src="tranlatePath('static/img/search_vip.png')">
              <div>
                查询会员
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(26)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(4)">
              <img :src="tranlatePath('static/img/add_user.png')">
              <div>
                添加用户
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(12)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(5)">
              <img :src="tranlatePath('static/img/sale.png')">
              <div>
                销售报表
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(14)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(6)">
              <img :src="tranlatePath('static/img/count.png')">
              <div>
                会员统计
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(13)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(7)">
              <img :src="tranlatePath('static/img/closing.png')">
              <div>
                结算统计
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col v-if="isPermission(36)" :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
          <el-card shadow="always" class="box-card2">
            <div slot="header">
            </div>
            <div class="content-body" @click="handleClick(8)">
              <img :src="tranlatePath('static/img/product.png')">
              <div>
                项目统计
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="tip-arean">
      <el-row :gutter="20">
        <el-col :xs="8" :sm="12" :md="4" :lg="12" :xl="12">
          <el-card class="box-card3" :body-style="{background: '#fab152'}">
          <div slot="header" :style="{background: '#fab15280', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/productIcon.png')" width=24 height=24>
            <span class="header-title">产品动态</span>
          </div>
          <div class="content-body">
            近期没有活动！
          </div>
        </el-card>
        </el-col>
        <el-col :xs="8" :sm="12" :md="4" :lg="12" :xl="12">
          <el-card class="box-card3" :body-style="{background: '#fab152'}">
          <div slot="header" :style="{background: '#fab15280', padding: '12px'}" class="clearfix">
            <img :src="tranlatePath('static/img/tag.png')" width=24 height=24>
            <span class="header-title">近期活动</span>
          </div>
          <div class="content-body">
            近期没有活动！
          </div>
        </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { formatPath } from '@/utils'
export default {
  data () {
    return {
      statuscolor: '#ff00ff',
      headercolor: '#ff00ff80'
    }
  },
  computed: {
    shopInfo () {
      return this.$store.getters.shopinfo
    },
    currentView () {
      return {template: '<div>' + this.$store.getters.TipContent + '</div>'}
    }
  },
  methods: {
    isPermission (val) {
      var iRet = -1
      for (var i = 0; i < this.$store.getters.parentList.length; i++) {
        if (this.$store.getters.parentList[i] === val) {
          iRet = val
          break
        }
      }
      if (iRet !== -1) {
        return true
      } else {
        return false
      }
    },
    tranlatePath (path) {
      return formatPath(path)
    },
    handleClick (val) {
      if (val === 1) {
        this.$router.push({ path: 'shop/shopmanager' })
      } else if (val === 2) {
        this.$router.push({ path: 'shop/employeemanager' })
      } else if (val === 3) {
        this.$router.push({ path: 'member/membermanager' })
      } else if (val === 4) {
        this.$router.push({ path: 'setting/usermanager' })
      } else if (val === 5) {
        this.$router.push({ path: 'data/businessstatistics' })
      } else if (val === 6) {
        this.$router.push({ path: 'data/memberstatistics' })
      } else if (val === 7) {
        this.$router.push({ path: 'data/invoicingstatistics' })
      } else if (val === 8) {
        this.$router.push({ path: 'data/projstatistics' })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el_bg{
  background: #f2f5f5;
  padding-bottom: 10px;
  }
.tipSty {
  color: red;
  margin-left: 15px;
}
.box-card {
  margin-left: 40px;
  margin-top: 40px;
  .header-title {
    color: #fff;
  }
  .content-body {
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
}
.box-card2 {
  cursor: pointer;
  .content-body {
    text-align: center;
    color: #333333;
    font-weight: bold;
  }
}
.link-area {
  background: #f2f5f5;
  padding-bottom: 20px;
}
.common-area {
  margin: 20px 0;
  padding: 20px 0;
  background: #f2f5f5;
  .common-area-title {
    padding: 10px 0;
    font-size: 24px;
    background: #f2f5f5;
  }
}
</style>
<style scoped>
  .box-card >>> .el-card__header {
    padding: 0px;
    border-bottom: 0px;
    background: #00000080
  }
  .box-card2 >>> .el-card__header {
    padding: 0px;
  }
  .box-card3 >>> .el-card__header {
    padding: 0px;
  }
 .box-card >>> .el-card__body {
    padding: 20px 0!important;
    text-align: center;
  }

</style>
