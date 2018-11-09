<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {message: '看电视呢'}
  }
}
</script>
<style>
  html,body,#app {height: 100%;}
  .vc-popup-press-menu {
    cursor: pointer;
  }
</style>
