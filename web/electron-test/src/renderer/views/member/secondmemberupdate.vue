// 消费入单组件
<template>
  <div>
    <h1 class="title-class">已选择了{{ListInfo.length}}条数据，进行升级操作</h1>
    <div class="title-class">
      升级为卡类型：
      <el-select v-model="memberCardType" placeholder="-请选择-">
        <el-option
          v-for="item in MemberCardTypeList"
          :key="item.ID"
          :label="item.Title"
          :value="item.ID">
        </el-option>
      </el-select>
    </div>
    <div class="body-class">
      <el-button type="sucess" :loading="loadingView" @click="updateMemberList()">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ListInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
  },
  computed: {
    MemberCardTypeList () {
      return this.$store.getters.memberbase.memberTypeOrginList
    }
  },
  data () {
    return {
      memberCardType: '',
      loadingView: false
    }
  },
  methods: {
    returnCardTitle1 (val) {
      for (var index = 0; index < this.MemberCardTypeList.length; index++) {
        if (this.MemberCardTypeList[index].ID === val) {
          return this.MemberCardTypeList[index].Title
        }
      }
      return ''
    },
    testbut () {
      console.log(JSON.stringify(this.ListInfo))
    },
    updateMemberList () {
      if (this.memberCardType === '') {
        this.$message({
          message: '请选择升级类型',
          type: 'info',
          dangerouslyUseHTMLString: true
        })
        return
      }
      this.loadingView = true
      var groupList = []

      this.ListInfo.forEach(element => {
        var listitem = {}
        listitem.ShopID = element.ShopID
        listitem.CardNo = element.tableMemberCard
        groupList.push(listitem)
      })
      var cardName = this.returnCardTitle1(this.memberCardType)
      var message = '您确定把' + this.ListInfo.length + '条会员数据升级为 【' + cardName + '】 吗?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // ShopID: this.shopName, UCardType: this.memberCardType, UpgradeCount: 0, GroupCardType: this.updateCardType
        this.$store.dispatch('UpdateMemberCastList', {GroupID: 0, UCardSelectList: groupList, GroupCardType: this.memberCardType, BatchNo: 0}).then((response) => {
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
