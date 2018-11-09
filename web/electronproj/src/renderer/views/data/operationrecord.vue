<template>
  <div>
    <div v-if="isPermission(45)" @keyup.enter="handleEnter()" >
      <div class="padding_class">
        日志类型:
        <el-select v-model="inspectObjectName" placeholder="请选择">
          <el-option
            v-for="item in powerClassList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
        日志名称:
        <el-select v-model="inspectObjectName2" placeholder="请选择">
          <el-option
            v-for="item in powerItemList"
            :key="item.ID"
            :label="item.Title"
            :value="item.ID">
          </el-option>
        </el-select>
        <!-- <span class="span-box">日志类型：</span>
        <div class="link-box">
          <el-input
            class="input-style"
            placeholder="请选择"
            v-model="inspectObjectName"
            suffix-icon="el-icon-caret-bottom"
            readonly="readonly"
            @click.native="isShowSelect = !isShowSelect">
          </el-input>
          <el-tree v-if="isShowSelect"
            empty-text="暂无数据"
            :expand-on-click-node="false"
            :data="powerClassList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            class="objectTree">
          </el-tree>
        </div> -->
        <!-- <span class="span-box">日志名称</span>
        <div class="link-box">
          <el-input
            class="input-style"
            placeholder="请选择"
            v-model="inspectObjectName"
            suffix-icon="el-icon-caret-bottom"
            readonly="readonly"
            @click.native="isShowSelect2 = !isShowSelect2">
          </el-input>
          <el-tree v-if="isShowSelect2"
            empty-text="暂无数据"
            :expand-on-click-node="false"
            :data="inspectionObjectOptions"
            :props="defaultProps"
            @node-click="handleNodeClick"
            class="objectTree">
          </el-tree>
        </div> -->
        操作用户
        <input @keyup.enter="handleEnter()" type="text" v-model="adminName" autocomplete="off" placeholder="请输入操作用户" class="el-input__inner">
      </div>
      <div class="padding_class">
        操作时间:
        <el-date-picker
          v-model="queryStartDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        ~
        <el-date-picker
          v-model="queryEndDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button class="search_btm_class" type="primary" @click="queryHandleData(queryStartDate, queryEndDate, adminName, inspectObjectName, inspectObjectName2, 1, 20)" :loading="loadingview = false">查询</el-button>
      </div>
    <div class="padding_class">
      <el-table
        class="el-table-class"
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
          fixed
          prop="log_type"
          label="日志类型"
          width="250">
        </el-table-column>
        <el-table-column
          prop="log_name"
          label="日志名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="operate_man"
          label="操作人"
          width="250">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="250">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isClick" @click="clickDetail(scope.row)" type="text" size="small">{{scope.row.content}}</el-button>
            <span v-else @click="clickDetail(scope.row)" type="text" size="small">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="250">
        </el-table-column>
      </el-table>
    </div>
      <div>
        <el-pagination
          style="text-align: center"
          ref="bottomPagination"
          layout="prev, pager, next"
          background
          @current-change="changePageHandle"
          :current-page.sync="pageIndex"
          :page-size="20"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <img class="title-image" :src="tranlatePath('static/img/noPermission.png')" width='100%'>
    </div>
    <el-dialog
      class="dialog-container"
      v-dialogDrag
      title="会员卡升级详情"
      ref="dialog_wrapper"
      :visible.sync="dialogVisible"
      width="80%"
      :modal-append-to-body='false'
      :close-on-click-modal="false">
        <div slot="title">
          <p style="color: #37bfc8">会员卡升级详情</p>
        </div>
        <div class="dialog-body">
          <secoperationrecord ref="secoperationrecordRef" :senddata="senddata"></secoperationrecord>
          <div
            class="line"
            v-dialogDragWidth="$refs.dialog_wrapper">
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime, formatTimestamp, formatPath } from '@/utils'
import secoperationrecord from '@/views/data/secoperationrecord'
export default {
  name: 'operationrecord',
  components: { secoperationrecord },
  mounted () {
    this.changePageHandle()
  },
  activated () {
    var _this = this
    document.onkeydown = function (eve) {
      if (eve.keyCode === 13) {
        _this.handleEnter()
      }
    }
  },
  computed: {
    powerClassList () {
      return this.$store.getters.powerClassList
    },
    powerItemList () {
      var itemReal = []
      itemReal.push({ID: 0, Title: '全部'})
      const itemlist = this.$store.getters.powerItemList
      for (var index = 0; index < itemlist.length; index++) {
        if (itemlist[index].classId === this.inspectObjectName) {
          itemlist[index].classObj.forEach(element => {
            itemReal.push(element)
          })
        }
      }
      return itemReal
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
    handleEnter () {
    },
    queryHandleData (beginTime, endTime, adminName, logType, logCode, pageIndex, pageSize) {
      this.loadingview = true
      const logTypeName = this.returnClassTitle(logType)
      const logName = this.returnItemTitle(logCode)
      var that = this
      this.$store.dispatch('queryOperationLogData', { BeginDate: beginTime, EndDate: endTime, AdminName: adminName, LogType: logType, LogCode: logCode, LogTypeName: logTypeName, LogName: logName, PageIndex: pageIndex, PageSize: pageSize }).then((response) => {
        that.loadingview = false
        that.pageTotal = response.PageTotal
        that.pageIndex = response.PageIndex
        that.$refs.bottomPagination.lastEmittedPage = that.pageIndex
        that.tableData = []
        response.listInfo.forEach(element => {
          var tmpObj = {}
          tmpObj.log_type = element.LogTypeName
          tmpObj.log_name = element.LogName
          tmpObj.operate_man = element.AdminName
          if (element.Content.indexOf('【') !== -1) {
            var arr = element.Content.split('【')
            tmpObj.content = arr[0]
            if (this.isPermission(85)) {
              tmpObj.isClick = true
              return
            }
            tmpObj.BatchNo = arr[1].replace(/[^0-9]/ig, '')
          } else {
            tmpObj.isClick = false
            tmpObj.content = element.Content
          }
          tmpObj.time = parseTime(formatTimestamp(element.AddTime), '{y}-{m}-{d} {h}:{i}:{s}')
          that.tableData.push(tmpObj)
        })
      }).catch(() => {
        this.loadingview = false
      })
    },
    changePageHandle () {
      this.queryHandleData(this.queryStartDate, this.queryEndDate, this.adminName, this.inspectObjectName, this.inspectObjectName2, this.pageIndex, 20)
    },
    returnClassTitle (val) {
      for (var index = 0; index < this.powerClassList.length; index++) {
        if (this.powerClassList[index].ID === val) {
          return this.powerClassList[index].Title
        }
      }
      return ''
    },
    returnItemTitle (val) {
      for (var index = 0; index < this.powerItemList.length; index++) {
        if (this.powerItemList[index].ID === val) {
          return this.powerItemList[index].Title
        }
      }
      return ''
    },
    clickDetail (data) {
      if (!data.isClick) {
        return
      }
      this.dialogVisible = true
      this.senddata = data
      this.$nextTick(() => {
        this.$refs.secoperationrecordRef.update()
      })
    }
  },
  data () {
    return {
      adminName: '',
      pageTotal: 10,
      pageIndex: 0,
      loadingview: false,
      defaultProps: {
        ID: 'children',
        Type: 0,
        Title: 'Title'
      },
      isShowSelect: false,
      isShowSelect2: false,
      inspectObjectName: '',
      inspectObjectName2: '',
      value: '',
      log_type: '',
      queryStartDate: new Date(),
      queryEndDate: new Date(),
      tableData: [],
      dialogVisible: false,
      senddata: {}
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input__inner{
  display: inline-block;
  width: 175px;
  height: 35px;
}
.padding_class{
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el_pagination_class{
  text-align: center;
  margin-top: 20px;
}
.span-box {
  float: left;
  display: block;
  height: 35px;
  line-height: 35px;
  margin-left: 18px;
}
.link-box {
  float: left;
  width: 300px;
  position: relative;
  .input-style {
    width: 100%;
  }
  .objectTree {
  border: 1px #000000 solid;
  position: absolute;
  overflow: auto;
  z-index: 100;
  width: 100%;
  right: 0;
 }
}
</style>
