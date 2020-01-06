<template>
  <div>
    <h1>push</h1>
    客户id
    <el-input v-model="clientid" placeholder="请输入内容"></el-input>
    发送
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button @click="handleClick" type="sucess">发送</el-button>
    <el-button @click="handleClick2" type="sucess">发送2</el-button>
    <el-button @click="handleClick3" type="sucess">发送3</el-button>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { playVoice } from '@/utils/voiceinit'
const uuidv1 = require('uuid/v1')
var mqtt = require('mqtt')
// var ffi = require('ffi')
// var DLL = ffi.Library('./dll/Dll1.dll', {
//   'TestDLL': ['void', ['string']],
//   'setProtery': ['void', ['int', 'int', 'int']]
// })
// var iconv = require('iconv-lite')
export default {
  name: 'push',
  destroyed () {
    this.client.end()
  },
  mounted () {
    this.client = mqtt.connect('tcp://192.168.88.32:8008', {
      clientId: getToken() + uuidv1(),
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      keepalive: 60,
      reconnectPeriod: 10 * 1000
    })
    var clientTopic = 'ExampleAndroidClient' + getToken()
    var that = this
    this.client.on('connect', function () {
      // 链接成功，以clientid作为主题，订阅
      that.client.subscribe(clientTopic, function (err) {
        if (!err) {
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
    })
    this.client.on('message', function (topic, message) {
      // message is Buffer
      console.log('message-------------------')
      that.$message({
        type: 'success',
        message: message.toString()
      })
      // console.log(message.toString())
      // var str1 = message.toString()
      // var userbuffer = iconv.encode(str1, 'gbk')
      // DLL.setProtery(80, 0, 5)
      // DLL.TestDLL(userbuffer)
      // playSet(80, 5, 0)
      playVoice(message)
    })
    this.client.on('error', function (err) {
      // that.$message({
      //   type: 'error',
      //   message: err
      // })
      // that.client.reconnect()
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
      client: null,
      input: '',
      clientid: ''
    }
  },
  methods: {
    handleClick () {
      this.client.publish('presence', this.input)
      // this.client.publish('getCurrentClientLists', '')
    },
    handleClick2 () {
      this.client.publish(this.clientid, this.input)
      // this.client.publish('getCurrentClientLists', '')
    },
    handleClick3 () {
      this.client.publish('getCurrentClientLists', '')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
