<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'App',
  data () {
    return {message: 'open!'}
  },
  created () {
    ipcRenderer.send('checkForUpdate')
    ipcRenderer.on('message', (event, text) => {
      console.log(arguments)
      this.message = text
    })
    // 注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
    ipcRenderer.on('downloadProgress', (event, progressObj) => {
      console.log(progressObj)
      this.downloadPercent = progressObj.percent || 0
    })
    ipcRenderer.on('isUpdateNow', () => {
      ipcRenderer.send('isUpdateNow')
    })
  },
  beforeDestroy () {
    // this.$electron.ipcRenderer.removeAll(['message', 'downloadProgress', 'isUpdateNow'])
  }
}
</script>
<style>
  html,body,#app {height: 100%;}
  .vc-popup-press-menu {
    cursor: pointer;
  }
</style>
