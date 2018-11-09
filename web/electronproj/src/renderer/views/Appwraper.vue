<template>
  <div class="app_container">
    <div class="part2"></div>
    <div class="part1"></div>
  </div>
</template>
<script>
export default {

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app_container {
      height: 100%;
      width: 100%;
      position: absolute;
      .part1 {
        height: 100%;
        width: 20%;
        background: #e0e;
        position: relative;
      }
      .part2 {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: #0e0;
        position: absolute;
      }
  }
</style>
