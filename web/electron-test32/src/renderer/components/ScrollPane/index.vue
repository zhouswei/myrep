<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
    <i class="left_arrow el-icon-caret-left" @click.prevent="handleMove(1)"></i>
    <i class="right_arrow el-icon-caret-right" @click.prevent="handleMove(2)"></i>
  </div>
</template>

<script>
const padding = 15 // tag's padding

export default {
  name: 'scrollPane',
  data () {
    return {
      left: 0
    }
  },
  methods: {
    handleMove (e) {
      if (e === 1) {
        this.left = Math.min(0, this.left + 120)
      } else {
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperWidth = $wrapper.offsetWidth
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left - 120, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget ($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
  }
  .left_arrow{
    position: absolute;
    left: -8px;
    top: 1px;
    font-size: 32px;
    cursor: pointer;
  }
  .right_arrow{
    position: absolute;
    right: -8px;
    top: 1px;
    font-size: 32px;
    cursor: pointer;
  }
}
</style>
