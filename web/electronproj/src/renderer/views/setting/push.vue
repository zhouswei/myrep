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
const uuidv1 = require('uuid/v1')
var mqtt = require('mqtt')
export default {
  name: 'push',
  destroyed () {
    this.client.end()
  },
  mounted () {
    this.client = mqtt.connect('ws://192.168.88.32:5905', {
      clientId: getToken() + uuidv1()
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
      console.log(message.toString())
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
