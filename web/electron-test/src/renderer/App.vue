<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {message: 'open!'}
  },
  created () {
    if (window.require) {
      let ipc = window.require('electron').ipcRenderer
      ipc.send('checkForUpdate')
      ipc.on('message', (event, text) => {
        console.log(arguments)
        this.tips = text
        window.alert(text)
      })
      ipc.on('downloadProgress', (event, progressObj) => {
        console.log(progressObj)
        this.downloadPercent = progressObj.percent || 0
      })
      ipc.on('isUpdateNow', () => {
        ipc.send('isUpdateNow')
      })
    }
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
