<template>
  <div>
    <div v-if="isPermission(59)">
      <div>
        <el-button v-if="isPermission(60)" class="add_btn_class" @click="clickAddCard">+新增会员卡</el-button>
        <div style="border-left:1px solid #e0e0e0;height:34px;margin-left:30px;display:inline-block;vertical-align:middle;padding-left:30px;"></div>
        会员卡类型
        <el-input type="text" v-model="UcardType" autocomplete="off" placeholder="请输入会员卡类型" class="member-input-content">
        </el-input>
        <el-button class="search_btn" @click="queryHandleData(1)" :loading="loadingview">查询</el-button>
      </div>
      <div>
        <el-table
          class="el-table-clss"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            class="name_link_class"
            prop="membercard_type"
            label="会员卡类型"
            width="150">
            <template slot-scope="scope">
              <span v-if="isPermission(63)" class="name_link_class" @click="clickMembCardType(scope.row.ID)">{{scope.row.membercard_type}}</span>
              <span v-else>{{scope.row.membercard_type}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="discount"
            label="折扣"
            width="120">
          </el-table-column>
          <el-table-column
            prop="initial_saving"
            label="初始储值(元)"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sell_amount"
            label="售卡金额(元)"
            width="174">
          </el-table-column>
          <el-table-column
            prop="useful_date"
            label="有效期(月)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="is_charge"
            label="是否可充值"
            width="100">
          </el-table-column>
          <el-table-column
            prop="is_append"
            label="是否可积分"
            width="110">
          </el-table-column>
          <el-table-column
              prop="recharge_points"
              label="充值积分"
              width="185">
          </el-table-column>
          <el-table-column
              prop="consumption_points"
              label="消费积分"
              width="83">
          </el-table-column>
          <el-table-column
              prop="issuing_store"
              label="可发卡门店"
              width="200">
          </el-table-column>
          <el-table-column
              prop="use_card_store"
              label="可用卡门店"
              width="200">
          </el-table-column>
          <el-table-column
              prop="statu"
              label="状态"
              width="83">
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button v-if="isPermission(61)" @click="clickModify(scope.row.ID)" type="text" size="small">修改</el-button>
                <el-button v-if="isPermission(62)" @click="clickDel(scope.row.ID)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          class="el_pagination_class"
          background
          layout="prev, pager, next"
          ref="bottomPagination"
          @current-change="changePageHandle"
          :current-page.sync="pageIndex"
          :page-size="20"
          :total="pageTotal">
        </el-pagination>
      </div>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="查看会员卡"
        ref="dialog_wrapper"
        :modal-append-to-body='false'
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">查看会员卡</p>
          </div>
          <div class="dialog-body">
            <secMenbCardInfo @close="closeMenInfoDialog" :id="id" ref="secMenbCardInfoRef"></secMenbCardInfo>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改会员卡"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible1"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8" :id="id">修改会员卡</p>
          </div>
          <div class="dialog-body">
            <secMenbCardModCard :id="id" @close="closeChangeMenDialog" ref="secMenbCardModCardRef"></secMenbCardModCard>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="添加会员卡"
        ref="dialog_wrapper"
        :visible.sync="dialogVisible2"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">添加会员卡</p>
          </div>
          <div class="dialog-body">
            <secMenbCardAddCard @close="closeAddMenDialog" ref="secMenbCardAddCardRef"></secMenbCardAddCard>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
  </div>
</template>
<script>
import secMenbCardInfo from '@/views/setting/secMenbCardInfo'
import secMenbCardModCard from '@/views/setting/secMenbCardModCard'
import secMenbCardAddCard from '@/views/setting/secMenbCardAddCard'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'membercardmanager',
  components: {secMenbCardInfo, secMenbCardModCard, secMenbCardAddCard},
  mixins: [ResizeMixin],
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogWidth: '80%',
      pageTotal: 10,
      pageIndex: 1,
      loadingview: false,
      UcardType: '',
      id: ''
    }
  },
  mounted () {
    this.queryHandleData(1)
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '80%'
    }
  },
  methods: {
    tranlatePath (path) {
      return formatPath(path)
    },
    isPermission (val) {
      var iRet = -1
      for (var i = 0; i < this.$store.getters.funcList.length && iRet === -1; i++) {
        for (var j = 0; j < this.$store.getters.funcList[i].length; j++) {
          if (this.$store.getters.funcList[i][j].ID === val && this.$store.getters.funcList[i][j].IsSelected !== 0) {
            iRet = val
            break
          }
        }
      }
      if (iRet !== -1) {
        return true
      } else {
        return false
      }
    },
    changePageHandle () {
      this.queryDataHandle(this.pageIndex)
    },
    queryHandleData (currentindex) {
      this.loadingview = true
      this.$store.dispatch('queryUCardListInfo', {Title: this.UcardType, CardNo: '', Mobile: '', UcardType: this.UcardType, ShopID: 0, IsPageClick: 1, BeginTime: '', EndTime: '', PageIndex: currentindex, PageSize: 20}).then((response) => {
        this.loadingview = false
        this.pageTotal = response.PageTotal
        this.pageIndex = response.PageIndex
        this.$refs.bottomPagination.lastEmittedPage = this.pageIndex
        this.tableData = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.ID = element.ID
          tmpObj.membercard_type = element.Title
          tmpObj.discount = element.Discount + '%'
          tmpObj.initial_saving = element.SavePrice
          tmpObj.sell_amount = element.SalePrice
          tmpObj.useful_date = element.ActiveMonth
          tmpObj.is_charge = this.returnChargeStatus(element.IsAllowPay)
          tmpObj.is_append = this.returnCountStatus(element.IsScore)
          if (element.IsScore) {
            tmpObj.recharge_points = element.UCardFillScore === 0 ? '' : element.UCardFillScore + '元/分'
            tmpObj.consumption_points = element.UCardPayScore === 0 ? '' : element.UCardPayScore + '元/分'
          } else {
            tmpObj.recharge_points = ''
            tmpObj.consumption_points = ''
          }
          tmpObj.issuing_store = element.CanSendShops.substring(0, element.CanSendShops.length - 1)
          tmpObj.use_card_store = element.CanUseShops.substring(0, element.CanUseShops.length - 1)
          tmpObj.statu = this.returnMemberStatus(element.IsClose)
          this.tableData.push(tmpObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    returnMemberStatus (val) {
      return val === false ? '可用' : '禁用'
    },
    returnChargeStatus (val) {
      return val === false ? '否' : '是'
    },
    returnCountStatus (val) {
      return val === false ? '否' : '是'
    },
    clickMembCardType (id) {
      this.dialogVisible = true
      this.id = id
      this.$nextTick(() => {
        this.$refs.secMenbCardInfoRef.update()
      })
    },
    clickModify (id) {
      this.dialogVisible1 = true
      this.id = id
      this.$nextTick(() => {
        this.$refs.secMenbCardModCardRef.update()
      })
    },
    clickAddCard () {
      this.dialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.secMenbCardAddCardRef.update()
      })
    },
    clickDel (id) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('queryDeleteUCardInfo', {id: id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.queryHandleData(this.pageIndex)
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    closeAddMenDialog () {
      this.dialogVisible2 = false
      this.queryHandleData(this.pageIndex)
    },
    closeChangeMenDialog () {
      this.dialogVisible1 = false
      this.queryHandleData(this.pageIndex)
    },
    closeMenInfoDialog () {
      this.dialogVisible = false
      this.queryHandleData(this.pageIndex)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add_btn_class{
  margin-top: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.member-input-content {
  width: 200px;
}
.add_btn_class:hover{
  margin-top: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.add_btn_class:focus{
  margin-top: 20px;
  background: orange;
  color: white;
  border-color: orange;
}
.search_btn{
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  margin-left: 10px;
}
.el-input{
  display: inline-block;
  width: 175px;
  height: 35px;
  margin-right: 30px;
}
.el-table-clss{
  margin-left: 10px;
  margin-top: 20px;
}
.el_pagination_class{
  margin-top: 20px;
  text-align: center;
}
.name_link_class{
  color: #37bfc8;
  cursor: pointer;
}
</style>
