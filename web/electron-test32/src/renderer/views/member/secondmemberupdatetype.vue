// 消费入单组件
<template>
  <div>
    <div class="title-class">
      门店名称：
      <el-select v-model="shopName" placeholder="-请选择-">
        <el-option
          v-for="item in MemberShopList"
          :key="item.ID"
          :label="item.Title"
          :value="item.ID">
        </el-option>
      </el-select>
    </div>
    <div class="title-class">
      门店卡类型：
      <el-select v-model="memberCardType" placeholder="-请选择-">
        <el-option
          v-for="item in MemberSpecList[shopName]"
          :key="item.ID"
          :label="item.Title"
          :value="item.ID">
        </el-option>
      </el-select>
    </div>
    <div class="title-class">
      升级为卡类型：
      <el-select v-model="updateCardType" placeholder="-请选择-">
        <el-option
          v-for="item in MemberSpecGroupList[shopName]"
          :key="item.ID"
          :label="item.Title"
          :value="item.ID">
        </el-option>
      </el-select>
    </div>
    <div class="body-class">
      <el-button type="sucess" :loading="loadingView" @click="updateMemberListbyType()">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    IDInfo: {
      default: 0
    }
  },
  created () {
  },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeOrginList
    },
    MemberShopList () {
      return this.$store.getters.memberbase.membershopOriginList
    },
    MemberSpecList () {
      return this.$store.getters.membermanager.memberSpecCardType
    },
    MemberSpecGroupList () {
      return this.$store.getters.membermanager.memberSpecGroupType
    }
  },
  data () {
    return {
      memberCardType: '',
      shopName: '',
      updateCardType: '',
      loadingView: false
    }
  },
  methods: {
    returnShopTitle (val) {
      for (var index = 0; index < this.MemberShopList.length; index++) {
        if (this.MemberShopList[index].ID === val) {
          return this.MemberShopList[index].Title
        }
      }
      return ''
    },
    returnCardTitle1 (val) {
      for (var index = 0; index < this.MemberSpecList[this.shopName].length; index++) {
        if (this.MemberSpecList[this.shopName][index].ID === val) {
          return this.MemberSpecList[this.shopName][index].Title
        }
      }
      return ''
    },
    returnCardTitle2 (val) {
      for (var index = 0; index < this.MemberSpecGroupList[this.shopName].length; index++) {
        if (this.MemberSpecGroupList[this.shopName][index].ID === val) {
          return this.MemberSpecGroupList[this.shopName][index].Title
        }
      }
      return ''
    },
    testbut () {
      console.log(JSON.stringify(this.ListInfo))
    },
    updateMemberListbyType () {
      if (this.shopName === '' || this.memberCardType === '' || this.updateCardType === '') {
        this.$message({
          message: '请设置选项',
          type: 'info',
          dangerouslyUseHTMLString: true
        })
        return
      }
      this.loadingView = true
      var shopstr = this.returnShopTitle(this.shopName)
      var cardName = this.returnCardTitle1(this.memberCardType)
      var updateName = this.returnCardTitle2(this.updateCardType)
      var message = '把【' + shopstr + '】的【' + cardName + '】升级 为【' + updateName + '】，您确定升级操作吗？'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // ShopID: this.shopName, UCardType: this.memberCardType, UpgradeCount: 0, GroupCardType: this.updateCardType
        this.$store.dispatch('UpdateMemberCastType', { ShopID: this.shopName, UCardType: this.memberCardType, UpgradeCount: 0, GroupCardType: this.updateCardType }).then((response) => {
          this.loadingView = false
          this.$message({
            message: response.Msg,
            type: 'success',
            dangerouslyUseHTMLString: true
          })
        }).catch(() => {
          this.loadingView = false
        })
      }).catch(() => {
        this.loadingView = false
      })
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .title-class {
    text-align: center;
    margin-top: 10px;
  }
  .body-class {
    margin-top: 15px;
    text-align: center;
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
