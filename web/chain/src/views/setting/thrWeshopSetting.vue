<template>
  <div>
    <p>地区:{{fullAddress}}</p>
    <label>地址:<el-input placeholder="请输入您的地址" v-model="address"></el-input></label>
    <!-- <label>地区：<input v-model="location"></label> -->
    <baidu-map>
      <bm-view style="width: 100%; height:300px; flex: 1; margin-top: 20px;"></bm-view>
      <bm-local-search @infohtmlset="searchcomplete" :keyword="address" :auto-viewport="true"></bm-local-search>
    </baidu-map>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String,
      default () {
        return ''
      }
    },
    fullAddress: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    update () {
      if (this.address === '') {
        this.address = this.fullAddress
      }
    },
    searchcomplete (poi) {
      this.$emit('result', poi.address)
    }
  }
}
</script>
<style>
.map{
  width: 100%;
  height: 100%;
}
</style>
