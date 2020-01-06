<template>
  <div :class="className" :id="id" :style="{height:height,width:width}">
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartName: {
      type: String,
      default: 'chartName'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    OrginData: {
      type: Array,
      default () {
        return []
      }
    },
    chartLabel1: {
      type: String,
      default: 'chartLabel1'
    },
    chartLabel2: {
      type: String,
      default: 'chartLabel2'
    }
  },
  data () {
    return {
      contentTitle: '营业统计-按店统计',
      chart: null,
      dataTypeList: [],
      shopList: [],
      valueList1: [],
      valueList2: [],
      labelOption: {
        normal: {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      }
    }
  },
  created () {
    console.log('created-------------------')
  },
  activated () {
    console.log('activated-------------------')
  },
  mounted () {
    console.log('mounted-------------------')
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    updateChart () {
      this.dataTypeList = []
      if (this.OrginData.length > 0) {
        if (this.OrginData[0].data.length > 0) {
          this.OrginData[0].data.forEach(element => {
            this.dataTypeList.push(element.title)
          })
        }
      }
      this.shopList = []
      if (this.OrginData.length > 0) {
        this.OrginData.forEach(element => {
          this.shopList.push(element.shopName)
        })
      }
      this.valueList1 = []
      this.valueList2 = []
      if (this.OrginData.length > 0) {
        this.OrginData.forEach(element => {
          if (element.data.length > 0) {
            element.data.forEach(element1 => {
              if (element1.title === this.dataTypeList[0]) {
                this.valueList1.push(element1.value)
              } else if (element1.title === this.dataTypeList[1]) {
                this.valueList2.push(element1.value)
              }
            })
          }
        })
      }
      this.chart.setOption({
        color: ['#fa6c5f', '#8fc31f'],
        title: {
          text: this.chartName,
          subtext: '金额(元)',
          x: '0',
          top: '0',
          textStyle: {
            color: '#000',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: ['营业实收金额', '充值实收金额']
          data: this.dataTypeList
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          right: '20px',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            // data: ['魔术一号店', '魔术二号店', '魔术三号店']
            data: this.shopList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.chartLabel1,
            type: 'bar',
            barGap: 0,
            label: this.labelOption,
            // data: [622.0, 332, 301]
            data: this.valueList1
          },
          {
            name: this.chartLabel2,
            type: 'bar',
            label: this.labelOption,
            // data: [101010.0, 182, 191]
            data: this.valueList2
          }
        ]
      })
    },
    initChart () {
      if (this.isMobile()) {
        document.getElementById(this.id).style.width = (window.innerWidth) + 'px'
      } else {
        document.getElementById(this.id).style.width = (window.innerWidth - 300) + 'px'
      }

      this.chart = echarts.init(document.getElementById(this.id))
      if (this.OrginData.length > 0) {
        if (this.OrginData[0].data.length > 0) {
          this.OrginData[0].data.forEach(element => {
            this.dataTypeList.push(element.title)
          })
        }
      }
      if (this.OrginData.length > 0) {
        this.OrginData.forEach(element => {
          this.shopList.push(element.shopName)
        })
      }
      if (this.OrginData.length > 0) {
        this.OrginData.forEach(element => {
          if (element.data.length > 0) {
            element.data.forEach(element1 => {
              if (element1.title === this.dataTypeList[0]) {
                this.valueList1.push(element1.value)
              } else if (element1.title === this.dataTypeList[1]) {
                this.valueList2.push(element1.value)
              }
            })
          }
        })
      }
      this.chart.setOption({
        color: ['#fa6c5f', '#8fc31f'],
        title: {
          text: '营业统计-按店统计',
          subtext: '金额(元)',
          x: '0',
          top: '0',
          textStyle: {
            color: '#000',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: ['营业实收金额', '充值实收金额']
          data: this.dataTypeList
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            // data: ['魔术一号店', '魔术二号店', '魔术三号店']
            data: this.shopList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '营业实收金额',
            type: 'bar',
            barGap: 0,
            label: this.labelOption,
            // data: [622.0, 332, 301]
            data: this.valueList1
          },
          {
            name: '充值实收金额',
            type: 'bar',
            label: this.labelOption,
            // data: [101010.0, 182, 191]
            data: this.valueList2
          }
        ]
      })
    }
  }
}
</script>
