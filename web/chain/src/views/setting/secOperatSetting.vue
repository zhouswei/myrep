<template>
  <div>
    <div style="background-color: #37bfc8;padding: 10px;margin-top: 10px;">
      <span style="color: #fff;font-size:14px;margin-left: 50px;">操作权限</span>
      <span style="color: #fff;font-size:14px;margin-left: 50px;">设置权限</span>
    </div>
    <div>
      <el-checkbox class="padding-class"  v-model="totalData.check" @change="tier">{{totalData.lebel}}</el-checkbox>
      <div style="margin-left: 50px" v-for="item in totalData.data" :label="item.lebel" :key="item.id">
        <el-checkbox class="padding-class" v-model="item.check" @change="tier1(item)">{{item.lebel}}</el-checkbox>
        <div style="margin-left: 50px" v-for="item in item.data" :label="item.lebel" :key="item.id">
          <el-checkbox class="padding-class" v-model="item.check" @change="tier2(item)">{{item.lebel}}</el-checkbox>
          <div style="margin-left: 50px" v-for="item in item.data" :label="item.lebel" :key="item.id">
            <el-checkbox class="padding-class" v-model="item.check" @change="tier3(item)">{{item.lebel}}</el-checkbox>
            <el-checkbox @change="tier4(item)" class="el-checkbox" v-for="item1 in item.data" :label="item1.lebel" :key="item1.id" v-model="item1.check">{{item1.lebel}}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #37bfc8;padding: 10px;margin-top: 10px;">
      <span style="color: #fff;font-size:14px;">数据权限</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 总数据
      totalData: {
        lebel: '全选',
        id: '全选',
        check: false,
        data: [{
          lebel: '门店',
          id: '门店',
          check: false,
          // 门店总数据
          data: [{
            lebel: '门店管理',
            id: '门店管理',
            check: false,
            data: [{
              check: false,
              id: '有效门店',
              lebel: '有效门店',
              data: [{
                lebel: '1',
                id: '1',
                check: false
              }, {
                lebel: '2',
                id: '2',
                check: false
              }, {
                lebel: '3',
                id: '3',
                check: false
              }]
            }, {
              check: false,
              id: '待审门店',
              lebel: '待审门店',
              data: [{
                lebel: '1',
                id: '1',
                check: false
              }, {
                lebel: '2',
                id: '2',
                check: false
              }, {
                lebel: '3',
                id: '3',
                check: false
              }]
            }]
          }, {
            lebel: '员工管理',
            id: '员工管理',
            check: false,
            // 员工管理
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }, {
            lebel: '技师管理',
            id: '技师管理',
            check: false,
            // 技师管理
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }]
        }, {
          lebel: '会员',
          id: '会员',
          check: false,
          data: [{
            lebel: '会员管理',
            id: '会员管理',
            check: false,
            // 会员管理
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }, {
            lebel: '开卡充值记录',
            id: '开卡充值记录',
            check: false,
            // 充值记录
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }, {
            lebel: '消费记录',
            id: '消费记录',
            check: false,
            // 消费记录
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }, {
            lebel: '会员升级',
            id: '会员升级',
            check: false,
            // 会员升级
            data: [{
              lebel: '1',
              id: '1',
              check: false,
              data: []
            }, {
              lebel: '2',
              id: '2',
              check: false,
              data: []
            }, {
              lebel: '3',
              id: '3',
              check: false,
              data: []
            }]
          }]
        }, {
          lebel: '数据',
          id: '数据',
          check: false,
          data: [{
            lebel: '营业统计',
            id: '营业统计',
            check: false,
            // 营业统计
            data: [{
              lebel: '营收统计',
              id: '营收统计',
              check: false,
              data: [{
                lebel: '统计',
                id: '统计',
                check: false,
                data: []
              }, {
                lebel: '导出',
                id: '导出',
                check: false,
                data: []
              }, {
                lebel: '按店统计',
                id: '按店统计',
                check: false
              }]
            }, {
              lebel: '收款统计',
              id: '收款统计',
              check: false,
              data: [{
                lebel: '统计',
                id: '统计',
                check: false,
                data: []
              }, {
                lebel: '导出',
                id: '导出',
                check: false,
                data: []
              }]
            }, {
              lebel: '营业日报表',
              id: '营业日报表',
              check: false,
              data: [{
                lebel: '1',
                id: '1',
                check: false,
                data: []
              }, {
                lebel: '2',
                id: '2',
                check: false
              }, {
                lebel: '3',
                id: '3',
                check: false,
                data: []
              }]
            }]
          }]
        }]
      }
    }
  },
  methods: {
    tier (value) {
      if (value) {
        this.totalData.data.forEach(element => {
          element.check = true
          element.data.forEach(element => {
            element.check = true
            element.data.forEach(element => {
              element.check = true
              element.data.forEach(element => {
                element.check = true
              })
            })
          })
        })
      } else {
        this.totalData.data.forEach(element => {
          element.check = false
          element.data.forEach(element => {
            element.check = false
            element.data.forEach(element => {
              element.check = false
              element.data.forEach(element => {
                element.check = false
              })
            })
          })
        })
      }
    },
    tier1 (item) {
      if (item.check) {
        item.data.forEach(element => {
          element.check = true
          element.data.forEach(element => {
            element.check = true
            element.data.forEach(element => {
              element.check = true
            })
          })
        })
      } else {
        item.data.forEach(element => {
          element.check = false
          element.data.forEach(element => {
            element.check = false
            element.data.forEach(element => {
              element.check = false
            })
          })
        })
      }
    },
    tier2 (item) {
      if (item.check) {
        item.data.forEach(element => {
          element.check = true
          element.data.forEach(element => {
            element.check = true
          })
        })
      } else {
        item.data.forEach(element => {
          element.check = false
          element.data.forEach(element => {
            element.check = false
          })
        })
      }
    },
    tier3 (item) {
      if (item.check) {
        item.data.forEach(element => {
          element.check = true
        })
      } else {
        item.data.forEach(element => {
          element.check = false
        })
      }
    },
    tier4 (item) {
    },
    checkState () {
      var ret = 0
      this.totalData.data.forEach(element => {
        if (!element.check) {
          ret++
        }
        var ret1 = 0
        element.data.forEach(element => {
          if (!element.check) {
            ret1++
          }
          var ret2 = 0
          element.data.forEach(element => {
            if (!element.check) {
              ret2++
            }
            var ret3 = 0
            element.data.forEach(element => {
              if (!element.check) {
                ret3++
              }
            })
            if (ret3 > 0) {
              element.check = false
            } else {
              element.check = true
            }
          })
          if (ret2 > 0) {
            element.check = false
          } else {
            element.check = true
          }
        })
        if (ret1 > 0) {
          element.check = false
        } else {
          element.check = true
        }
      })
      if (ret > 0) {
        this.totalData.check = false
      } else {
        this.totalData.check = true
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-checkbox-group{
  display: inline;
  margin-left: 10px;
}
.padding-class{
  margin-bottom: 20px;
}
.text-style{
  color: #fff;
  font-size:14px;
  text-align: center
}
</style>
