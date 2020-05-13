import { loginByUsername, getUserInfo, getShopInfo, getUserData,
  getPowerClass, ChangePwd, GetVeriCode, ChangePhone, FindPwd,
  GetTipInfo, getVedioList, getVideoAccessToken, registerPersion,
  registerCompany, getMetrialList, getAgentList, getChainList,
  getCurrentShopList, getBankBaseInfo, getReservesInfo, getAgentFinanceInfo, getAgentShopInfo, setDivideRate, getRateInfo,
  AddShopAccount, getVersionList, agentPayShopSection, agentBuyAccount, agentPayContinuationMoneys,
  agentVersionUpgrades, shopUpgradesVersionsListGet, agentApply, agentFractionationsListGet, getPlatformParams, agentApplyListGet, agentReservesListGet,
  agentSubReateSet, agentAppVersionGet
} from '@/api/login'
import { getToken, setToken, removeToken, getCookies, setCookies, removeSpecCookies } from '@/utils/auth'
import { getShopMemberInfo } from '@/api/membermanager'
import { getValideShopData } from '@/api/shopmanager'
// import { hexmd5 } from '@/utils/md5.js'
const user = {
  state: {
    user: '',
    status: '',
    code: getCookies('USERID'),
    token: getToken(),
    name: getCookies('USERNAME'),
    userno: getCookies('USERNO'),
    avatar: '',
    introduction: '',
    roles: [],
    userdata: {},
    dialogIndex: 0,
    dialogShow: false,
    projName: [],
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
    vedioList: {},
    TipContent: '',
    peoplePositionList: {},
    carInfoList: {},
    doorGuardList: {},
    SessionKey: getCookies('SessionKey'),
    htmlContent: '',
    versionList: [],
    chainList: [],
    bankInfo: {}
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
    SET_USERNO: (state, userno) => {
      state.userno = userno
    },
    SET_AVATAR: (state, avatar) => {
      state.projName = avatar
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
    SET_VEDIOLIST: (state, vedios) => {
      vedios.projectList.forEach(element => {
        state.vedioList[vedios.projectId.toString()] = vedios.projectList
      })
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
    },
    SET_USER_SessionKey: (state, info) => {
      state.SessionKey = info
    },
    SET_HTML_CONTENT: (state, info) => {
      state.htmlContent = info
    },
    SET_VERSION_LIST: (state, info) => {
      state.versionList = info.Versions
    },
    SET_CHAIN_LIST: (state, info) => {
      state.chainList = info.Groups
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // var timestamp = Date.parse(new Date()).toString()
        // var singure = hexmd5(username + userInfo.password + timestamp).toUpperCase()
        var params = {}
        params['Method'] = 'API.Agents.AgentLogin'
        params['Mobile'] = userInfo.username
        params['PassWord'] = userInfo.password
        params['Push_Token'] = ''

        loginByUsername(params).then(response => {
          const data = response
          // console.log(JSON.stringify(data.Data))
          const objData = data
          if (data.IsError === false) {
            // console.log(objData.GroupCode)
            // commit('SET_TOKEN', objData.Token)
            // commit('SET_CODE', objData.UserID)
            commit('SET_NAME', objData.AgentInfo.FullName)
            commit('SET_USER_SessionKey', objData.SessionKey)
            setCookies('SessionKey', objData.SessionKey)
            // commit('SET_USERNO', objData.UserNO)
            // // commit('SET_GROUPCODE', objData.GroupCode)
            setToken(objData.Token)
            setCookies('USERID', 'objData.UserID')

            // setCookies('USERNAME', objData.UserName)
            // setCookies('USERNO', objData.UserNO)
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
        var objData = {}
        commit('SET_ROLES', 'admin')
        resolve(objData)
        // getProjectList(state.token, state.code).then(response => {
        //   const data = response
        //   const objData = data
        //   // console.log('222' + JSON.stringify(objData))
        //   // if (objData.roleName && objData.roleName.length > 0) {
        //   //   // 验证返回的roles是否是一个非空数组
        //   if (typeof objData.roleName !== 'undefined' || objData.roleName !== null || objData.roleName !== '') {
        //     commit('SET_ROLES', 'admin')
        //   }
        //   // } else {
        //   //   reject(new Error('getInfo: roles must be a non-null array !'))
        //   // }
        //   commit('SET_AVATAR', objData.ProjectList)
        //   resolve(objData)
        // }).catch(error => {
        //   reject(error)
        // })
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
    GetVedioListInfo ({commit, state}, info) {
      return new Promise((resolve, reject) => {
        getVedioList(state.token, state.code, info).then(response => {
          const data = response
          const objData = data
          var newObj = {projectId: info, projectList: objData.AreaList}
          commit('SET_VEDIOLIST', newObj)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetVideoAccessToken ({commit, state}) {
      return new Promise((resolve, reject) => {
        getVideoAccessToken(state.token, state.code).then(response => {
          const data = response
          const objData = data
          resolve(objData)
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
        removeToken()
        removeSpecCookies('SessionKey')
        removeSpecCookies('depositBank')
        removeSpecCookies('fullName')
        removeSpecCookies('bankAccount')
        resolve()
        // logout(state.token, state.code).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
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
    },
    RegisterPersion ({commit}, info) {
      return new Promise((resolve, reject) => {
        registerPersion(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RegisterCompany ({commit}, info) {
      return new Promise((resolve, reject) => {
        registerCompany(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentSubReateSet ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentSubReateSet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMetrialList ({commit}, info) {
      return new Promise((resolve, reject) => {
        getMetrialList(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetHtml ({commit}, info) {
      return new Promise((resolve, reject) => {
        commit('SET_HTML_CONTENT', info)
        // getHtml(info).then((response) => {
        //   const objData = response
        //   resolve(objData)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    GetAgentList ({commit}, info) {
      return new Promise((resolve, reject) => {
        getAgentList(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetChainList ({commit}, info) {
      return new Promise((resolve, reject) => {
        getChainList(info).then((response) => {
          const objData = response
          commit('SET_CHAIN_LIST', objData)
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addShopAccount ({commit}, info) {
      return new Promise((resolve, reject) => {
        AddShopAccount(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCurrentShopList ({commit}, info) {
      return new Promise((resolve, reject) => {
        getCurrentShopList(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetBankBaseInfo ({commit}, info) {
      return new Promise((resolve, reject) => {
        getBankBaseInfo(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetReservesInfo ({commit}, info) {
      return new Promise((resolve, reject) => {
        getReservesInfo(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAgentFinanceInfo ({commit}, info) {
      return new Promise((resolve, reject) => {
        getAgentFinanceInfo(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAgentShopInfo ({commit}, info) {
      return new Promise((resolve, reject) => {
        getAgentShopInfo(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetDivideRate ({commit}, info) {
      return new Promise((resolve, reject) => {
        setDivideRate(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRateInfo ({commit}, info) {
      return new Promise((resolve, reject) => {
        getRateInfo(info).then((response) => {
          const objData = response
          commit('SET_USERDATA', objData.Info)
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetVersionList ({commit}, info) {
      return new Promise((resolve, reject) => {
        getVersionList(info).then((response) => {
          const objData = response
          commit('SET_VERSION_LIST', objData)
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentPayShopSection ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentPayShopSection(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentBuyAccount ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentBuyAccount(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentPayContinuationMoneys ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentPayContinuationMoneys(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentVersionUpgrades ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentVersionUpgrades(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ShopUpgradesVersionsListGet ({commit}, info) {
      return new Promise((resolve, reject) => {
        shopUpgradesVersionsListGet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentApply ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentApply(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentFractionationsListGet ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentFractionationsListGet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetPlatformParams ({commit}, info) {
      return new Promise((resolve, reject) => {
        getPlatformParams(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    agentApplyListGet ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentApplyListGet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentReservesListGet ({commit}, info) {
      return new Promise((resolve, reject) => {
        agentReservesListGet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AgentAppVersionGet ({ commit }, info) {
      return new Promise((resolve, reject) => {
        agentAppVersionGet(info).then((response) => {
          const objData = response
          resolve(objData)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
