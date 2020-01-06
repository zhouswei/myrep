<template>
  <div class="bc_bg" id="bcContainer">
    <audio id="audio" v-show="false">
      <source :src="tranlatePath('static/img/dingdong.wav')" type="audio/wav">
    </audio>
    <div class="tech_list" id="techList">
      <div class="head_title">
        实时技师：
        <el-button style="float: right;margin-top:-6px;" type="primary" @click="getTechList()">刷新</el-button>
        <div class="tech_switch" style="float: right;margin-right: 15px;">
          <label class="switch_btn">
            <input v-model="checkType" type="checkbox" @change="multiClick">
            <div class="slider"></div>
            <em>隐</em>
            <em>显</em>
          </label>
        </div>
      </div>
      <div class="item_wrap">
        <div v-for="(item,index) in techLists" class="item_type_wrap clearfix" :key="index" v-if="item.Data.length>0">
          <div class="tech_l_n"><span>{{item.ServiceTypeTitle}}</span></div>
          <div class="tech_r_n ">
            <div class="tech_item ssjs_tech_rBox_n" v-for="(techlist,tindex) in item.Data" :key="tindex"
              :style="{backgroundColor: techlist.Color,borderColor:techlist.Color}">
              <p class="tech_rPa_n" style="position:relative;">
                <span class="tech_icon" :style="{backgroundImage:'url('+techImg+')'}"></span>
                <span class="tech_code" style="font-size:24px;">{{techlist.TechCode}}</span>
                <span class="r_info_n" v-if="techlist.OrderSum">{{techlist.OrderSum}}轮</span>
              </p>
              <div class="tech_info_n ssjs_tech_info_n clearfix">
                <div class="l_info_n">
                  <p class="l_tech_info">
                    <span>{{techlist.RoomCode|roomFilter}}</span>
                  </p>
                  <p class="icon_stauts" style="display: initial;">
                    <span class="clamp" v-if="techlist.LevelTitle">{{techlist.LevelTitle}}</span>
                    <span v-if="isOnDutyFormat(techlist)">{{isOnDutyFormat(techlist)}}</span>
                    <span class="clamp"
                      v-if="filterStatus(techlist.ClassType)">{{filterStatus(techlist.ClassType)}}</span>
                    <span class="pre_book" :style="{backgroundImage:'url('+preTechImg+')'}" v-if="techlist.IsPreBook == 1"></span>
                    <span v-if="techlist.IsFirst === 1">优</span>
                  </p>
                  <p class="icon_book">
                    <span v-if="techlist.IsPreBook === 1">预约</span>
                  </p>
                </div>
              </div>
              <div class="ope_wrap" style="background: #fff;height: 27px;line-height: 27px;border-radius: 0 0 5px 5px;">
                <span class="techTime" v-if="techlist.DownClock">余<em style="padding-left: 3px;font-style: initial;">{{techlist.DownClock}}分</em></span>
                <span v-else>
                  <span class="techTime" v-if="techlist.IsService === 4">落牌</span>
                  <span class="techTime" v-else-if="techlist.State === 1">空闲</span>
                  <span class="techTime" v-else-if="techlist.State === 2">锁定</span>
                  <span class="techTime" v-else-if="techlist.State === 3">上钟</span>
                  <span class="techTime" v-else-if="techlist.State === 4">圈牌</span>
                  <span class="techTime" v-else-if="techlist.State === 5">留牌</span>
                  <span class="techTime" v-else-if="techlist.State === 6">未签到</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="barResize"></div>
    <div class="broadcast_list" id="broadcastList">
      <div class="head_title">语音播报：</div>
      <div class="broadcast_item_list">
        <el-row :gutter="10" justify="center" type="flex" v-for="item in reverceMessage" :key="item.id">
          <el-col :span="4" class="broadcast_item"><div>{{item.time}}</div></el-col>
          <el-col :span="19" class="broadcast_item"><div>{{item.content}}</div></el-col>
        </el-row>
      </div>
    </div>
    <div class="tables" v-show="false">
      <el-row :gutter="10">
        <el-col :span="15" class="">
         <div>
           <p>待上钟：</p>
            <el-table
            :data="tableData"
            border
            height="250"
            style="width: 100%"
            :header-cell-style="headercell"
            >
            <el-table-column
              prop="date"
              label="开单日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="技师"
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              height="180"
              width="160"
              label="项目">
            </el-table-column>
            <el-table-column
              prop="name"
              label="房间"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              width="80"
              label="钟类">
            </el-table-column>
            <el-table-column
              prop="name"
              width="80"
              label="已等待">
            </el-table-column>
          </el-table>
         </div>
        </el-col>
        <el-col :span="8" class="">
          <p>技师预约：</p>
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :header-cell-style="headercell"
              >
              <el-table-column
                prop="date"
                label="开始时间"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="技师"
                >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { formatPath, parseTime } from '@/utils'
import { getToken, getCookies } from '@/utils/auth'
import { playVoice } from '@/utils/voiceinit'
const uuidv1 = require('uuid/v1')
var mqtt = require('mqtt')
export default {
  name: 'broadcast',
  destroyed () {
    this.client.end()
    clearInterval(this.timer)
  },

  mounted () {
    this.checkType = this.type == 0 ? true : false
    var h = window.screen.height;
    var bcContainer = document.getElementById("bcContainer");
    bcContainer.style.height = h * 0.90 + "px";
    this.dragControllerDiv();
    var that = this
    let innerHeight = document.documentElement.clientHeight - 320
    let techDom = document.querySelector('.item_wrap')
    techDom.style.height = innerHeight + 'px'
    window.onresize = function temp () {
      let innerHeight = document.documentElement.clientHeight - 320
      let techDom = document.querySelector('.item_wrap')
      techDom.style.height = innerHeight + 'px'
    }
    that.audio = document.getElementById('audio')
    that.audio.addEventListener('ended', function () {
      console.log('ended-------------')
      that.callbackPlay()
    }, false)
    clearInterval(this.timer)
    this.getTechList()
    this.setTimer()
    console.log('mounted11---------------------')

    this.client = mqtt.connect('tcp://47.107.103.66:8008', {
      clientId: getToken() + uuidv1(),
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      keepalive: 60,
      reconnectPeriod: 10 * 1000
    })

    this.client.on('connect', function () {
      console.log('connect---------------------')
      that.$store.dispatch('queryTechPoweInfo', {code: getCookies('code'), account: getCookies('account')}).then((response) => {
        if (response !== '' && response !== undefined) {
          // 链接成功，以clientid作为主题，订阅
          let jsondata = JSON.parse(response)
          let arrayData = jsondata.powerlist
          let specData = jsondata.typelist
          if (arrayData.length <= 0) {
            return
          }
          if (specData === undefined || specData === '' || specData.length <= 0) {
            that.newTypeList = '0'
          } else {
            that.newTypeList = ''
            for (var index = 0; index < specData.length; index++) {
              if (index === specData.length - 1) {
                that.newTypeList += specData[index]
              } else {
                that.newTypeList += specData[index] + ','
              }
            }
          }
          console.log(response)
          that.client.subscribe(arrayData, function (err) {
            if (!err) {
              console.log(err)
            }
          })
          that.client.subscribe('receivedClientLists', function (err) {
            if (!err) {
            }
          })
          that.client.subscribe('presence', function (err) {
            if (!err) {
              // that.client.publish('presence', 'Hello mqtt')
            }
          })
        }
      }).catch(() => {
      })
    })
    // var clientTopic = 'ExampleAndroidClient' + getToken()

    this.client.on('message', function (topic, message) {
      // message is Buffer
      console.log('message-------------------')

      var iconv = require('iconv-lite')
      var userbuffer = iconv.decode(message, 'gbk')
      var newObj = {}
      newObj.content = '    ' + userbuffer.replace('为', '')
      newObj.time = that.getCurrentDate()
      that.newMessage.unshift(newObj)
      // var newbuffer = iconv.encode(userbuffer, 'gbk')
      that.reverceMessage = that.newMessage
      console.log(userbuffer)
      that.getTechList()
      return new Promise((resolve, reject) => {
        let AudiuMessage = ''
        if (userbuffer.lastIndexOf('号') > -1) {
          let tmpstr = that.ChangeMessage(userbuffer.substring(0, userbuffer.lastIndexOf('号'))) + userbuffer.substring(userbuffer.lastIndexOf('号') + 1)
          AudiuMessage = that.ReadWordFormat(tmpstr)
        } else {
          AudiuMessage = that.ReadWordFormat(userbuffer)
        }
        let count = 1
        if (getCookies('count')) {
          count = Number(getCookies('count'))
        }
        for (var index = 0; index < count; index++) {
          that.AudioMessageCount += AudiuMessage + ', '
        }
        console.log(that.AudioMessageCount)
        that.audio.play()
      })
    })
    this.client.on('error', function (err) {
      console.log('error----------------' + err)
    })
    this.client.on('offline', function () {
      console.log('offline---------------')
    })
    this.client.on('close', function () {
      console.log('close---------------')
    })
    this.client.on('reconnect', function () {
      console.log('reconnect---------------')
    })
  },
  data () {
    return {
      AudioMessageCount: '',
      audio: null,
      client: null,
      timer: null,
      input: '',
      clientid: '',
      newMessage: [],
      reverceMessage: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江'
      }],
      techLists: [],
      newTypeList: '0',
      type: 1,
      checkType: true,
      techImg: 'static/img/tech_icon.png',
      ptrTechImg: 'static/img/pre_tech_icon.png'
    }
  },
  filters: {
    roomFilter (value) {
      if (value) {
        let roomStr = value + '房'
        return roomStr
      }
    }
  },
  methods: {
    dragControllerDiv: function () {
      var barResize = document.getElementById("barResize")
      var broadcastList = document.getElementById("broadcastList")
      var techList = document.getElementById("techList")
      var bcContainer = document.getElementById("bcContainer")
      barResize.onmousedown = function (e) {
        var startY = e.clientY
        barResize.top = barResize.offsetTop
        document.onmousemove = function (e) {
          var endY = e.clientY
          var moveLen = barResize.top + (endY - startY)
          var maxT = bcContainer.clientHeight - barResize.offsetHeight
          if (moveLen < 30) moveLen = 30
          if (moveLen > maxT - 30) moveLen = maxT - 30
          barResize.style.top = moveLen
          techList.style.height = moveLen + 'px'
          broadcastList.style.height = (bcContainer.clientHeight - moveLen - 5) + 'px'
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          barResize.releaseCapture && barResize.releaseCapture()
        }
        barResize.setCapture && barResize.setCapture()
        return false
      }
    },
    getCurrentDate () {
      return parseTime(new Date(), '{y}-{m}-{d} {h}:{i}')
    },
    callbackPlay () {
      var audioid = this.AudioMessageCount
      this.AudioMessageCount = ''
      console.log('audioid----------------')
      playVoice(audioid)
    },
    tranlatePath (path) {
      return formatPath(path)
    },
    setTimer: function () {
      var that = this
      this.timer = setInterval(() => {
        that.getTechList()
      }, 60 * 1000)
    },
    getTechList () {
      let type = this.type
      console.log('type :', type);
      this.$store.dispatch('queryTechStatusInfo', {TechNo: '', isShow: type, ServiceType: this.newTypeList, ScheduID: 0, LevelID: 0, TechState: '', code: getCookies('code'), account: getCookies('account')}).then((response) => {
        this.techLists = JSON.parse(response)
      }).catch(() => {
      })
    },
    isOnDutyFormat (datas) {
      if (datas.IsOverTime && datas.IsOnDuty === 0) {
        return '加班'
      }
      if (!datas.IsOverTime && datas.IsOnDuty === 1) {
        return '值班'
      }
    },
    filterStatus (state) {
      let statusIcon = ''
      switch (state) {
        case 1:
          statusIcon = '早'
          break
        case 2:
          statusIcon = '中'
          break
        case 3:
          statusIcon = '晚'
          break
        case 4:
          statusIcon = '通'
          break
        // no default
      }
      return statusIcon
    },
    ReadWordFormat (msg) {
      return msg.replace('单', '丹').replace(/【/g, '').replace(/】/g, '')
    },
    ChangeMessage (msg) {
      // ROOM2房间,7817号技师服务的项目73项目提前26分钟下钟
      return msg.replace(/<span>1<span>/g, '一').replace(/1/g, '妖').replace(/2/g, '二').replace(/3/g, '三').replace(/4/g, '四').replace(/5/g, '五').replace(/6/g, '六').replace(/7/g, '七').replace(/8/g, '八').replace(/9/g, '九').replace(/0/g, '零')
    },
    headercell ({row, column, rowIndex, columnIndex}) {
      return 'background:#37bfc8;color:#fff;text-align:center'
    },
    multiClick () {
      this.type = this.checkType ? 0 : 1
      this.getTechList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  body{background: #edf0f0;height: 1rem;width: 100%;}
  p{margin: 0;}
  .bc_bg{background: #edf0f0;height: 100%;width: 100%;}
  .el-col{border-radius: 4px;}
  .bg-purple-dark{background: #99a9bf;}
  .bg-purple{background: #d3dce6;}
  .bg-purple-light{background: #e5e9f2;}
  .grid-content{border-radius: 4px;min-height: 36px;}
  .head_title{padding: 5px 20px;}
  .broadcast_item_list{overflow-y: auto;overflow-x: hidden;}
  .broadcast_item{margin: 2px 0;height: 36px;line-height: 36px;background: #fff;}
  .tables{margin-left: 20px;margin-top: 10px;}
  #barResize{position: relative;height: 30px;width: 100%;background: #f5fafa;cursor: s-resize;}
  .tech_list{overflow: auto;}
  .tech_detail_lists{position: absolute;left: -55px;top: 20px;background: #f5f5f5;padding: 10px;width: 300px;z-index: 99;font-size: 16px;}
  .list_title{background: #e6e6e6;}
  .list_content{margin: 10px 0;}
  .list_content ul li{float: left;margin-right: 14px;font-size: 14px;}
  .list_content .book_item span{padding-right: 20px;}
  .ssjs_tech_rBox_n{white-space: nowrap;color: #262626;float: left;height: 112px;width: 120px;text-overflow: ellipsis;border-radius: 7px;margin: 1px;font-size: 18px;text-align: left;background-position: 6px 6px;background-repeat: no-repeat;position: relative;border: 2px solid #000;cursor: pointer;}
  .ssjs_tech_info_n{position: relative;}
  .tech_rPa_n{background: #fff;border-radius: 5px 5px 0 0;height: 24px;line-height: 24px;font-size: 18px;padding-left: 2px;font-weight: 600;}
  .item_type_wrap{border-bottom: 1px solid #c8c8c8;border-right: 1px solid #c8c8c8;background-color: #e1e1e1;}
  .tech_l_n{float: left;width: 3%;color: #262626;padding-top: 15px;text-align: center;color: #262626;font-weight: 500;font-size: 16px;}
  .tech_l_n span{width: 14px;display: inline-block;}
  .tech_r_n{width: 96%;text-align: center;float: left;background-color: #fff;padding: 2px 1px;}
  .icon_stauts span{display: inline-block;background-size: cover;background-repeat: no-repeat;margin: 2px 2px 2px 0;}
  .l_info_n{height: 57px;line-height: 1.2;width: 54px;font-size: 16px;float: left;padding: 4px 5px;}
  .l_info_n .l_tech_info{position: relative;font-size: 12px;height: 19px;}
  .l_tech_info .span{font-size: 14px;}
  .l_info_n p{font-size: 14px;}
  .r_info_n{float: right;margin-right: 5px;font-size: 12px;white-space: initial;letter-spacing: -1px;font-weight: 500;}
  .r_info_n .shift_status{text-align: center;}
  .caozuoItem{background: rgba(0, 0, 0, 0.85);border-radius: 6px;width: 114px;position: absolute;margin-top: 5px;left: 45px;background-size: contain;padding-top: 6px;top: 114px;z-index: 99;padding-bottom: 5px;}
  .caozuoItem li{width: 94px;padding-left: 20px;height: 35px;line-height: 35px;font-size: 14px;text-align: left;color: white;cursor: pointer;}
  .caozuoItem li:hover{color: #000;background: #fff;margin: 0 5px;padding-left: 16px;width: 88px;}
  .caozuoItem::before{content: '';position: absolute;display: block;width: 0;height: 0;overflow: hidden;border: 8px dashed transparent;border-bottom: 8px solid #2b2a2a;top: -16px;left: 47px;}
  .flipy{-moz-transform: scaleY(-1);-webkit-transform: scaleY(-1);-o-transform: scaleY(-1);transform: scaleY(-1);/*IE*/filter: FlipV;}
  .searchdiv select{width: 110px;height: 32px;border: 1px solid #d8d8d8;margin-left: 10px;font-size: 16px;}
  .sel_type{width: 110px;}
  .sel_type{width: 110px;font-size: 16px;}
  .search_inp{height: 28px;width: 95px;border-top-right-radius: initial;border-bottom-right-radius: initial;padding-left: 5px;line-height: 27px;}
  .search_inp:focus{outline: none}
  .searchdiv .search_btn{margin-left: -6px;background-color: #ebfeff;color: #37bfc8;height: 30px;width: 50px;border-left: none;border-top-left-radius: initial;border-bottom-left-radius: initial;cursor: pointer;font-size: 16px;border-left: 1px solid #e0e0e0;}
  .right_shift{position: absolute;right: 100px;top: -8px;height: 30px;overflow: hidden;width: 0;z-index: 99;padding-left: 0px;float: right;background: #e6e6e6;border-radius: 5px;margin-top: 3px;}
  .right_shift .surebtn{display: inline-block;width: 80px;height: 30px;background: #ffb554;cursor: pointer;padding-right: 0;margin-right: 0;font-size: 14px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;}
  .right_shift input{margin: 0 10px;}
  .tech_nav{margin-top: 7px;}
  .tech_nav span{display: inline-block;padding: 5px 3px;color: #fff;background: red;line-height: 5px;border-radius: 20px;text-align: center;margin-left: 2px;}
  .help_list{position: fixed;right: 50px;top: 40px;width: 160px;height: 222px;background: #fff;box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.33);padding: 10px;border: 1px solid #e6e6e6;border-radius: 4px;display: none;z-index: 100;}
  .help_list p{margin-bottom: 5px;}
  .help_list p img{width: 120px;height: 120px;}
  .help_list::before{content: '';display: block;width: 12px;height: 12px;position: absolute;border-right: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;transform: rotate(225deg);top: -7px;right: 12px;margin-left: -15px;background: #fff;z-index: 99;}
  .keyboard_btn{width: 100%;height: 30px;line-height: 30px;text-align: center;background: #ffb554;border-radius: 4px;cursor: pointer;}
  .keyborad_list{width: 340px;background: #fff;margin-right: 20px;float: left;font-size: 14px;position: fixed;right: 10px;top: 40px;z-index: 99;}
  .sc_title{background: #e0e0e0;padding: 5px;font-size: 16px;color: #000;height: 30px;}
  .sc_title a{color: #2350d9;float: right;margin-right: 10px;}
  .sc_sub_title{background: #ededed;background: #ededed;border-left: 1px solid #e0e0e0;border-right: 1px solid #e0e0e0;height: 30px;line-height: 30px;}
  .sc_sub_title span{width: 43%;display: inline-block;height: 30px;line-height: 30px;padding-left: 10px;}
  .sc_sub_title .sc_txt{border-left: 1px solid #e0e0e0;padding-left: 3px;}
  .item_list{border: 1px solid #e0e0e0;height: 500px;overflow: auto;}
  .item_list li{border-bottom: 1px solid #e0e0e0;height: 30px;line-height: 30px;overflow: hidden;}
  .item_list li::after{content: "";display: block;height: 0;visibility: hidden;clear: both;}
  .item_list li div{float: left;}
  .item_list li .sc_text{border-right: 1px solid #e0e0e0;width: 140px;padding-left: 10px;}
  .item_list li .sc_code{color: #2350d9;padding-left: 10px;cursor: pointer;height: 30px;padding-right: 1px;width: 155px;}
  .sc_title .close_key_list{float: right;width: 22px;height: 22px;line-height: 22px;; font-size: 24px;color: #37bfc8;}
  .tachMain .height_line{background-color: #e0e0e0;}
  .keyborad_room{padding: 20px;}
  .keyborad_room .search_room{color: #262626;font-size: 18px;margin-bottom: 10px;}
  .keyborad_room .search_room input{padding: 5px;font-weight: 600;}
  .keyborad_room .search_tip{padding-left: 20px;color: #e33e32;}
  .r_shift{position: absolute;bottom: 6px;right: 14px;}
  .list_content .power-tb th, list_content .power-tb td{font-size: 12px;line-height: 24px;}
  .list_content .power-tb td{height: 20px;line-height: 28px !important;}
  .light_col{color: #9a9a9a;}
  .left_reset{left: -180px;}
  .multi_wrap{position: absolute;right: 94px;top: 12px;}
  .multi_btn{padding: 4px 15px;width: 63px;margin-top: -4px;font-size: 14px;background: #ffb554;border-radius: 24px;}
  .multi_lsit{display: none;color: #fff;position: absolute;right: -42px;top: 30px;background: rgba(0, 0, 0, 0.85);padding: 5px 0;border-radius: 5px;z-index: 998;}
  .multi_lsit li{height: 30px;line-height: 30px;color: #fff;text-align: left;width: 122px;padding: 0 15px;cursor: pointer;}
  .multi_lsit li:hover{color: #ffb554;}
  .multi_lsit::before{content: '';position: absolute;display: block;width: 0;height: 0;overflow: hidden;border: 8px dashed transparent;border-bottom: 8px solid #2b2a2a;top: -16px;left: 60px;}
  .toggle_card{padding: 4px 15px;margin-top: -4px;font-size: 14px;background: #ffb554;border-radius: 24px;margin-right: 10px;}
  .triangle_right{position: absolute;bottom: 8px;left: 6px;z-index: 9;width: 0;height: 0;border-left: 8px solid black;border-top: 6px solid transparent;border-bottom: 6px solid transparent;cursor: pointer;}
  .techTime{font-size: 14px;position: absolute;bottom: 0px;left: 6px;width: 66px;padding-left: 2px;}
  .tech_icon{display: inline-block;width: 15px;height: 18px;background: center center no-repeat;}
  .scroll{display: flex;justify-content: flex-start;align-items: center;margin-bottom: 12px;}
  .left_shift{display: flex;width: 100%;}
  .wrapper{position: relative;display: flex;width: 100%;margin: 0 10px;height: 32px;line-height: 40px;border: 1px solid #d8d8d8;border-radius: 3px;}
  .wrapper .gallery{display: flex;margin-left: 20px;width: 100%;overflow: hidden;transition: margin-left 1s;-moz-transition: margin-left 1s;-webkit-transition: margin-left 1s;-o-transition: margin-left 1s;}
  .gallery-img{width: 40px;height: 40px;z-index: 100;}
  .gallery img{display: inline-block;}
  .wrapper .gallery ul{list-style: none;padding-left: 0;margin-bottom: 0;margin-top: 0;overflow: hidden;}
  .wrapper .gallery ul.nav-tabs>li{float: left;display: block;min-width: 62px;height: 22px;background-color: #fff;cursor: pointer;line-height: 22px;border: 1px solid;text-align: left;padding: 0 5px;margin-right: 5px;cursor: pointer;margin-top: 4px;}
  .wrapper .roll-nav.roll-nav-left{left: 0;}
  .wrapper .roll-nav.roll-nav-right{right: 0;}
  .wrapper .roll-nav{position: absolute;width: 40px;height: 32px;text-align: center;color: #999;background-color: #d9d9d9;z-index: 2;top: 0;}
  .nav-tabs>li>a{color: #76838f;position: relative;display: block;line-height: 20px;cursor: pointer;}
  .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{background-color: #fff;-webkit-transition-property: background-color, border-bottom;-webkit-transition-duration: .2s;-webkit-transition-timing-function: ease;-moz-transition-property: background-color, border-bottom;-moz-transition-duration: .2s;-moz-transition-timing-function: ease;-o-transition-property: background-color, border-bottom;-o-transition-duration: .2s;-o-transition-timing-function: ease;}
  .clearfix:after{content: '.';display: block;height: 0;clear: both;visibility: hidden}
  .switch_btn{position: relative;display: inline-block;width: 70px;height: 20px;margin-left: 10px;color: #000;}
  .switch_btn input{display: none;}
  .slider{box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.22);position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #c2c6cc;-webkit-transition: .4s;transition: .4s;border-radius: 3px;color: #666;}
  .slider:before{position: absolute;content: "";height: 24px;width: 35px;left: 0;top: -2px;background-color: #fff;border-radius: 3px;-webkit-transition: .4s;transition: .4s;z-index: 9;}
  .switch_btn em{position: absolute;z-index: 99;top: 1px;left: 10px;cursor: pointer;font-size: 12px;font-style: initial;}
  .switch_btn em:last-child{left: initial;right: 10px;}
  input:checked+.slider:before{transform: translateX(34px);-webkit-transform: translateX(34px);-ms-transform: translateX(34px);background-color: #549dfe;}
  input:checked~em{color: #fff;}
  .el-button--medium {
    padding: 7px 17px;
  }
  .clamp {
      max-width: 36px;
  }
</style>
