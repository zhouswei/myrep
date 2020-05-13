<template>
  <div>
    <div style="background-color: #37bfc8;padding: 10px;margin-top: 10px;">
      <span style="color: #fff;font-size:14px;">操作权限</span>
      <span style="color: #fff;font-size:14px;margin-left: 50px;">设置权限</span>
      <el-checkbox style="margin-left: 50px;color: #ffffff;" fill="#FFFFFF" :disabled="totalData.disable" v-model="totalData.check" @change="tier">{{totalData.lebel}}</el-checkbox>
    </div>
    <div>
      <div style="margin-left: 10px" v-for="item in totalData.data" :label="item.lebel" :key="item.id">
        <el-checkbox class="padding-class" :disabled="item.disable" v-model="item.check" @change="tier1(item)">{{item.lebel}}</el-checkbox>
        <div class="ml_100" v-for="item in item.data" :label="item.lebel" :key="item.id">
          <el-checkbox class="padding-class" :disabled="item.disable" v-model="item.check" @change="tier2(item)">{{item.lebel}}</el-checkbox>
          <div class="ml_50" v-for="item in item.data" :label="item.lebel" :key="item.id">
            <el-checkbox class="padding-class" :disabled="item.disable" v-model="item.check" @change="tier3(item)">{{item.lebel}}</el-checkbox>
            <el-checkbox @change="tier4(item)" :disabled="item1.disable" class="el-checkbox" v-for="item1 in item.data" :label="item1.lebel" :key="item1.id" v-model="item1.check">{{item1.lebel}}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #37bfc8;padding: 10px;margin-top: 10px;">
      <span style="color: #fff;font-size:14px;">数据权限</span>
    </div>
    <div style="margin-left: 100px;vertical-align:middle;">
      <div v-for="item in shops" :label="item.Title" :key="item.ID">
        <p><img v-if="item.isDel" style="margin-right: 10px;cursor: pointer;" @click="clickDel(item.ID)" src="http://r.handnear.com/chain/img/hongcha.png">{{item.Title}}</p>
      </div>
      <p style="cursor: pointer;" @click="addShop"><img style="margin-right: 10px;cursor: pointer;" src="http://r.handnear.com/chain/img/lvcha.png">添加门店</p>
    </div>
    <el-button class="el_save_btn" @click="clickConfirm">确定</el-button>
    <el-button class="el_cancel_btn" @click="clickCancel">取消</el-button>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    shops: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 总数据
      totalData: {},
      UserID: 0,
      chkPowerID: [],
      ShopID: []
    }
  },
  methods: {
    update () {
      this.getPowers()
    },
    setDate (powerclass) {
      this.totalData = {
        lebel: '全选',
        id: '全选',
        check: false,
        data: []
      }
      powerclass.forEach(element => {
        if (element.Name === '概况') {
          return
        }
        var obj = {}
        obj.lebel = element.Name
        obj.id = element.ID
        obj.check = false
        obj.data = []
        element.SonClass.forEach(element => {
          var obj1 = {}
          obj1.lebel = element.Name
          obj1.id = element.ID
          obj1.check = false
          obj1.data = []
          element.SonClass.forEach(element => {
            var obj2 = {}
            obj2.lebel = element.Name
            obj2.id = element.ID
            obj2.check = false
            obj2.data = []
            obj1.data.push(obj2)
          })
          element.Items.forEach(element => {
            var obj2 = {}
            obj2.lebel = element.Name
            obj2.id = element.ID
            obj2.check = false
            obj2.data = []
            element.FuncList.forEach(element => {
              var obj3 = {}
              obj3.lebel = element.Name
              obj3.id = element.ID
              if (element.IsSelected > 0) {
                obj3.check = true
              } else {
                obj3.check = false
              }
              if (element.IsRole > 0) {
                obj3.disable = true
              } else {
                obj3.disable = false
              }
              obj3.data = []
              obj2.data.push(obj3)
            })
            obj1.data.push(obj2)
          })
          obj.data.push(obj1)
        })
        element.Items.forEach(element => {
          var obj1 = {}
          obj1.lebel = element.Name
          obj1.id = element.ID
          obj1.check = false
          obj1.data = []
          element.FuncList.forEach(element => {
            var obj3 = {}
            obj3.lebel = element.Name
            obj3.id = element.ID
            if (element.IsSelected > 0) {
              obj3.check = true
            } else {
              obj3.check = false
            }
            if (element.IsRole > 0) {
              obj3.disable = true
            } else {
              obj3.disable = false
            }
            obj3.data = []
            obj1.data.push(obj3)
          })
          obj.data.push(obj1)
        })
        this.totalData.data.push(obj)
      })
      this.checkState()
    },
    getPowers () {
      this.$store.dispatch('queryUserPowers', {ID: this.id}).then((response) => {
        this.setDate(response.SpecThisClass)
        this.shops = []
        response.SpecRoleShops.forEach(element => {
          var obj = {}
          obj.Title = element.Title
          obj.ID = element.ID
          obj.isDel = false
          this.shops.push(obj)
        })
        response.SpecShopInfoListForUser.forEach(element => {
          var obj = {}
          obj.Title = element.Title
          obj.ID = element.ID
          obj.isDel = true
          this.shops.push(obj)
        })
      }).catch(() => {
      })
    },
    tier (value) {
      if (value) {
        this.totalData.data.forEach(element => {
          element.check = true
          element.data.forEach(element => {
            element.check = true
            element.data.forEach(element => {
              if (!element.disable) {
                element.check = true
                element.data.forEach(element => {
                  if (!element.disable) {
                    element.check = true
                  }
                })
              }
            })
          })
        })
      } else {
        this.totalData.data.forEach(element => {
          element.check = false
          element.data.forEach(element => {
            element.check = false
            element.data.forEach(element => {
              if (!element.disable) {
                element.check = false
                element.data.forEach(element => {
                  element.check = false
                })
              }
            })
          })
        })
      }
      this.checkState()
    },
    tier1 (item) {
      if (item.check) {
        item.data.forEach(element => {
          if (!element.disable) {
            element.check = true
            element.data.forEach(element => {
              if (!element.disable) {
                element.check = true
                element.data.forEach(element => {
                  if (!element.disable) {
                    element.check = true
                  }
                })
              }
            })
          }
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
      this.totalData.data.forEach(element => {
        var dis2 = 0
        var ret2 = 0
        element.data.forEach(element => {
          var dis1 = 0
          var ret1 = 0
          element.data.forEach(element => {
            var dis = 0
            var ret = 0
            element.data.forEach(element => {
              if (element.check) {
                ret++
              }
              if (element.disable) {
                dis++
              }
            })
            if (ret > 0) {
              element.check = true
            }
            if (dis > 0) {
              element.disable = true
            }
            if (element.check) {
              ret1++
            }
            if (element.disable) {
              dis1++
            }
          })
          if (ret1 > 0) {
            element.check = true
          }
          if (dis1 > 0) {
            element.disable = true
          }
          if (element.check) {
            ret2++
          }
          if (element.disable) {
            dis2++
          }
        })
        if (ret2 > 0) {
          element.check = true
        }
        if (dis2 > 0) {
          element.disable = true
        }
      })
    },
    addShop () {
      this.$emit('clickOp', this.shops)
    },
    clickConfirm () {
      var arr = []
      this.totalData.data.forEach(element => {
        element.data.forEach(element => {
          element.data.forEach(element => {
            if (element.data.length === 0) {
              if (element.check) {
                arr.push(element.id)
              }
            }
            element.data.forEach(element => {
              if (element.check) {
                arr.push(element.id)
              }
            })
          })
        })
      })
      var shopIDs = []
      this.shops.forEach(element => {
        shopIDs.push(element.ID)
      })
      this.$store.dispatch('setUserPowers', {UserID: this.id, chkPowerID: arr, ShopID: shopIDs}).then((response) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        location.reload()
        this.$emit('close')
      }).catch(() => {
      })
    },
    clickCancel () {
      this.$emit('close')
    },
    clickDel (ID) {
      var index = -1
      this.shops.forEach(element => {
        if (element.ID === ID) {
          index = this.shops.indexOf(element)
        }
      })
      this.shops.splice(index, 1)
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
  margin-bottom: 10px;
}
.text-style{
  color: #fff;
  font-size:14px;
  text-align: center
}
.el_save_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 150px;
  margin-bottom: 30px;
  margin-top: 50px;
}
.el_cancel_btn{
  width: 160px;
  color: #fff;
  background-color: #37bfc8;
  border-color: #37bfc8;
  text-align: center;
  margin-left: 10px;
  margin-top: 50px;
}
.ml_100{
  margin-left: 100px;
}
.ml_50{
  margin-left: 100px;
}
@media (max-width:500px) {
  .ml_100{
    margin-left: 30px;
  }
  .ml_50{
    margin-left: 25px;
  }
}
</style>
