<template>
  <div>
    <div class="block">
      <span class="demonstration">音量</span>
      <el-slider @change="changeHandle" v-model="volume" :min="0" :max="100"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">语速</span>
      <el-slider @change="changeHandle" v-model="rate" :min="-10" :max="10"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">音调</span>
      <el-slider @change="changeHandle" v-model="pitch" :min="-10" :max="10"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">播放次数</span>
      <el-slider v-model="count" @change="changeHandle" :min="1" :max="5"></el-slider>
    </div>
    <el-button @click="play" type="primary">试听</el-button>
  </div>
</template>
<script>
import { playVoice, playSet } from '@/utils/voiceinit'
import { getCookies, setCookies } from '@/utils/auth'
export default {
  name: 'voiceseting',
  destroyed () {
  },
  mounted () {
    this.volume = Number(getCookies('volume') ? getCookies('volume') : 80)
    this.pitch = Number(getCookies('pitch') ? getCookies('pitch') : 0)
    this.rate = Number(getCookies('rate') ? getCookies('rate') : 0)
    this.count = Number(getCookies('count') ? getCookies('count') : 1)
  },
  data () {
    return {
      volume: 50,
      pitch: 0,
      rate: 0,
      count: 1
    }
  },
  methods: {
    changeHandle () {
      playSet(this.volume, this.rate, this.pitch)
      setCookies('volume', this.volume)
      setCookies('rate', this.rate)
      setCookies('pitch', this.pitch)
      setCookies('count', this.count)
    },
    play () {
      playVoice('通筋活络项目512号技师前去789号房间服务')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
