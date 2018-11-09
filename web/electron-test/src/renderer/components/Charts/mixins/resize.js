import { debounce } from '@/utils'
const { body } = document
const WIDTH = 1024
const RATIO = 3
export default {
  mounted () {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHanlder)
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      console.log('isMoblie' + rect.width + WIDTH)
      return rect.width - RATIO < WIDTH
    }
  }
}
