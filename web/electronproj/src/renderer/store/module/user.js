import { loginByUsername, logout, getUserInfo, getShopInfo, getUserData,
  getPowerClass, ChangePwd, GetVeriCode, ChangePhone, FindPwd, GetTipInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getShopMemberInfo } from '@/api/membermanager'
import { getValideShopData } from '@/api/shopmanager'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    userdata: {},
    dialogIndex: 0,
    dialogShow: false,
    shopinfo: {GroupIndex: {ShopSum: ''}},
    setting: {
      articlePlatform: []
    },
    memberbase: {
      memberTypeList: [{Title: ''}],
      memberTypeOrginList: [],
      membershopList: [],
      membershopOriginList: []
    },
    shopmanagerTabledata: {
      shopmanagerTableList: []
    },
    employeemanagerTabledata: {
      employeemanagerTableList: []
    },
    TipContent: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SHOPINFO: (state, shopinfo) => {
      state.shopinfo = shopinfo
    },
    SET_USERDATA: (state, userData) => {
      state.userdata = userData
    },
    SET_MEMBER_TYPE: (state, cards) => {
      state.memberbase.memberTypeList = cards.newObj
      state.memberbase.memberTypeOrginList = cards.orginObj
    },
    SET_SHOPLIST: (state, shops) => {
      state.memberbase.membershopList = shops.newObj
      state.memberbase.membershopOriginList = shops.orginObj
    },
    SET_SHOP_MANAGER_TABLE_DATA: (state, datas) => {
      state.shopmanagerTabledata.shopmanagerTableList = datas
    },
    SET_EMPLOYEE_MANAGER_TABLE_DATA: (state, datas) => {
      state.employeemanagerTabledata.employeemanagerTableList = datas
    },
    SET_DIALOG_INDEX: (state, index) => {
      state.dialogIndex = index
    },
    SET_DIALOG_SHOW: (state, show) => {
      state.dialogShow = show
    },
    SET_TIP_CONTENT: (state, info) => {
      state.TipContent = info
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.shopserialnum).then(response => {
          const data = response
          // console.log(JSON.stringify(data.Data))
          const objData = data.Data
          if (data.RetCode === 1) {
            // console.log(objData.GroupCode)
            commit('SET_TOKEN', objData.GroupCode + objData.LoginName)
            commit('SET_CODE', objData.GroupCode)
            // commit('SET_GROUPCODE', objData.GroupCode)
            setToken(objData.GroupCode + objData.LoginName)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response
          const objData = data.Data
          // console.log('222' + JSON.stringify(objData))
          // if (objData.roleName && objData.roleName.length > 0) {
          //   // 验证返回的roles是否是一个非空数组
          if (typeof objData.roleName !== 'undefined' || objData.roleName !== null || objData.roleName !== '') {
            commit('SET_ROLES', objData.roleName)
          }
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          commit('SET_NAME', objData.name)
          commit('SET_AVATAR', objData.mobile)
          commit('SET_INTRODUCTION', objData.roleName)
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetShopInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getShopInfo(state.token).then(response => {
          const data = response
          const objData = data.Data
          commit('SET_SHOPINFO', objData)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserData ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserData(state.token).then(response => {
          const data = response
          const objData = data.Data
          commit('SET_USERDATA', objData.userData)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取店会员基础信息
    GetShopMemberBaseInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getShopMemberInfo().then((response) => {
          const objData = response.Data
          let arrayObj = [{ID: 0, Title: '全部'}]
          objData.UCardType.forEach(element => {
            arrayObj.push(element)
          })
          let arrayObj2 = [{ID: 0, Title: '全部'}]
          objData.UShopList.forEach(element => {
            arrayObj2.push(element)
          })
          commit('SET_MEMBER_TYPE', {newObj: arrayObj, orginObj: objData.UCardType})
          commit('SET_SHOPLIST', {newObj: arrayObj2, orginObj: objData.UShopList})
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles ({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },
    // 获取门店管理列表数据
    getShopmanagerData ({ commit }, info) {
      return new Promise((resolve, reject) => {
        getValideShopData(info).then((response) => {
          const objData = response.Data.tableData
          // console.log('成功调用getShopmanagerData' + JSON.stringify(objData))
          // commit('SET_SHOP_MANAGER_TABLE_DATA', objData)
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查看弹框改变
    checkDialogIndex ({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('SET_DIALOG_INDEX', info.info)
        resolve(info)
      })
    },
    setDialogShow ({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('SET_DIALOG_SHOW', info.info)
      })
    },
    queryPowerClass ({ commit }, info) {
      return new Promise((resolve, reject) => {
        getPowerClass(info).then((response) => {
          const objData = response.Data.tableData
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryChangePwd ({ commit }, info) {
      return new Promise((resolve, reject) => {
        ChangePwd(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryVeriCode ({ commit }, info) {
      return new Promise((resolve, reject) => {
        GetVeriCode(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryChangePhone ({ commit }, info) {
      return new Promise((resolve, reject) => {
        ChangePhone(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryFindPwd ({ commit }, info) {
      return new Promise((resolve, reject) => {
        FindPwd(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTipInfo ({ commit }, info) {
      return new Promise((resolve, reject) => {
        GetTipInfo(info).then((response) => {
          const objData = response.Data.info
          commit('SET_TIP_CONTENT', objData)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
