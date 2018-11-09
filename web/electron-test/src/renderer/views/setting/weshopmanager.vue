<template>
  <div>
    <div v-if="isPermission(79)">
      <div>
        <el-button v-if="isPermission(81)" class="add_btn" @click="addWeShop()"> + 添加公众号</el-button>
      </div>
      <div v-for="item in weshopList" :key="item.id" :label="item.mpname">
        <div style="background-color: #37bfc8;padding: 10px;margin-top: 20px;">
          <span v-if="isPermission(80)" class="head_title_class" @click="clickShop(item.id)">{{item.mpname}}</span>
          <span v-else>{{item.mpname}}</span>
          <el-button style="margin-left: 30px;color: #262626; padding: 10px" class="ml10" size="medium"
            v-clipboard:copy="clipBoardContent(item.id)"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制微店页面地址</el-button>
          <span v-if="isPermission(82)" style="margin-left:30px;color: #fff;font-size:14px;cursor: pointer;" @click="clickModify(item.id)">修改</span>
          <span v-if="isPermission(84)" style="color: #fff;font-size:14px;cursor: pointer;" @click="clickDel(item.id)">删除</span>
        </div>
        <el-table
          :data="item.wxshops"
          border
          style="width: 100%">
          <el-table-column
            prop="shopname"
            label="门店名称"
            width="250">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="400">
          </el-table-column>
          <el-table-column
            prop="pro3"
            label="操作">
              <template slot-scope="scope">
                <el-button v-if="isPermission(83)" style="color: #37bfc8;" @click="handleClick(scope.row.shopid)" type="text" size="small">配置</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <p>
        停用门店在连锁微店不显示
      </p>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="查看微信公众号"
        ref="dialog_wrapper"
        :visible.sync="shopInfoDialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">查看微信公众号</p>
          </div>
          <div class="dialog-body">
            <secWeshopShopInfo ref="secWeshopShopInfoRef" :id="id"></secWeshopShopInfo>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="修改微信公众号"
        ref="dialog_wrapper"
        :visible.sync="changeShopDialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <div slot="title">
            <p style="color: #37bfc8">修改微信公众号</p>
          </div>
          <div class="dialog-body">
            <secWeshopChangeShop v-on:close="closeChangeWeshopDialog" ref="secWeshopChangeShopRef" :id="id"></secWeshopChangeShop>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="添加微信公众号"
        ref="dialog_wrapper"
        :visible.sync="addShopdialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false"
        >
          <div slot="title">
            <p style="color: #37bfc8">添加微信公众号</p>
          </div>
          <div class="dialog-body">
            <secWeshopAddShop v-on:close="closeAddWeshopDialog" ref="secWeshopAddShopRef"></secWeshopAddShop>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </div>
      </el-dialog>
      <el-dialog
        class="dialog-container"
        v-dialogDrag
        title="门店微店配置"
        ref="dialog_wrapper"
        :visible.sync="weshopSettingdialogVisible"
        :width="dialogWidth"
        :modal-append-to-body='false'
        :close-on-click-modal="false">
          <el-dialog
            :width="dialogWidth"
            :fullscreen="true"
            :modal-append-to-body='false'
            title="选择地址"
            :close-on-click-modal="false"
            :visible.sync="innerVisible"
            append-to-body>
            <thrWeshopSetting :fullAddress="fullAddress" @result="result" :address="address" ref="thrWeshopSettingRef"></thrWeshopSetting>
            <div
              class="line"
              v-dialogDragWidth="$refs.dialog_wrapper">
            </div>
          </el-dialog>
          <div slot="title">
            <p style="color: #37bfc8">门店微店配置</p>
          </div>
          <div class="dialog-body">
            <secWeshopSetting :address="address" v-on:close="closeSettingDialog" @clickOp="clickOp" ref="secWeshopSettingRef" :id="id"></secWeshopSetting>
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
import secWeshopAddShop from '@/views/setting/secWeshopAddShop'
import secWeshopChangeShop from '@/views/setting/secWeshopChangeShop'
import secWeshopSetting from '@/views/setting/secWeshopSetting'
import secWeshopShopInfo from '@/views/setting/secWeshopShopInfo'
import thrWeshopSetting from '@/views/setting/thrWeshopSetting'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
import { formatPath } from '@/utils'
export default {
  name: 'weshopmanager',
  components: {secWeshopAddShop, secWeshopChangeShop, secWeshopSetting, secWeshopShopInfo, thrWeshopSetting},
  mixins: [ResizeMixin],
  mounted () {
    this.getWxConfigListInfo()
    if (this.isMobile()) {
      this.dialogWidth = '100%'
    } else {
      this.dialogWidth = '50%'
    }
  },
  data () {
    return {
      shopInfoDialogVisible: false,
      changeShopDialogVisible: false,
      weshopSettingdialogVisible: false,
      addShopdialogVisible: false,
      dialogWidth: '50%',
      weshopList: [],
      id: 0,
      address: '',
      innerVisible: false,
      fullAddress: ''
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
    clickShop (id) {
      this.shopInfoDialogVisible = true
      this.id = id
      this.$nextTick(() => {
        this.$refs.secWeshopShopInfoRef.update()
      })
    },
    addWeShop () {
      this.addShopdialogVisible = true
      this.$nextTick(() => {
        this.$refs.secWeshopAddShopRef.update()
      })
    },
    getWxConfigListInfo () {
      this.loading = true
      this.$store.dispatch('queryWeShopList').then((response) => {
        this.weshopList = response
        this.id = response.id
      }).catch(() => {
      })
    },
    clickModify (id) {
      this.changeShopDialogVisible = true
      this.id = id
      this.$nextTick(() => {
        this.$refs.secWeshopChangeShopRef.update()
      })
    },
    clickDel (id) {
      this.$confirm('如果删除会将该下面门店的公众号和收款账号信息清空，确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('queryDeleteWxConfigInfo', {id: id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getWxConfigListInfo()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
      })
    },
    handleClick (id) {
      this.weshopSettingdialogVisible = true
      this.id = id
      this.$nextTick(() => {
        this.$refs.secWeshopSettingRef.getSettingInfo()
      })
    },
    closeAddWeshopDialog () {
      this.addShopdialogVisible = false
      this.getWxConfigListInfo()
    },
    closeChangeWeshopDialog () {
      this.changeShopDialogVisible = false
      this.getWxConfigListInfo()
    },
    closeSettingDialog () {
      this.weshopSettingdialogVisible = false
      this.getWxConfigListInfo()
    },
    // 复制成功
    onCopy (e) {
      this.$message('复制成功')
    },
    // 复制失败
    onError (e) {
      this.$message.error('复制失败')
    },
    clipBoardContent (id) {
      return 'http://wx.handnear.com/chain/index.aspx?groupaccountid=' + id + '&groupcode=' + this.$store.getters.code
    },
    // 点击了配置选择地址
    clickOp (data, fullAddress) {
      this.innerVisible = true
      this.address = data
      this.fullAddress = fullAddress
    },
    result (address) {
      this.innerVisible = false
      this.address = address
      this.$nextTick(() => {
        this.$refs.secWeshopSettingRef.setData()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.add_btn {
  margin-top: 20px;
  color: #fff;
  background-color: #feb454;
  border-color: #feb454;
}
.head_title_class {
  color: #fff;
  font-size:20px;
  cursor: pointer;
}
.el_save_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 100px;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
  margin-top: 50px;
}
</style>
