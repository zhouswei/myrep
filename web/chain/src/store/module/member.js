import { queryMemberCardList, queryMemberChargeList,
  queryMemberCastList, queryMemberCastListDetail,
  updateMemberCastList, updateMemberCastType,
  queryMemberCastUpdateList, queryMemberUpdateList, queryMemberDetailInfo,
  queryAllMemberTypeIndex, quertyAllMemberTypeList, queryAllMemberShopList, queryMemberRecordList, queryCountAllShopData, queryCountConsumeData, queryChargeRecordSummary } from '@/api/membermanager'
import { parseTime, getFloatTime, formatTimestamp } from '@/utils'
import { returnOpencardTitle, value2Status } from '@/utils/member'
const member = {
  state: {
    memberInfoList: [],
    memberChargeList: [],
    membermanager: {
      pageTotal: 10,
      pageIndex: 0,
      queryStartDate: '',
      queryEndDate: '',
      memberCard: '',
      memberPhone: '',
      memberCardType: 0,
      membershop: 0,
      memberSpecCardType: [],
      memberSpecGroupType: []
    }
  },
  mutations: {
    MEMBERINFOLIST: (state, info) => {
      // state.memberInfoList = info
      state.membermanager.pageTotal = info.pageTotal
      state.membermanager.pageIndex = info.pageNo
      let tmpTable = []
      for (let k = 0; k < info.listInfo.length; k++) {
        let obj = {}
        obj.tableSerialNum = (info.pageNo - 1) * 20 + k + 1
        obj.tableMemberCard = info.listInfo[k].CardNo
        obj.tableMemberType = info.listInfo[k].UCardTypeTitle
        obj.tableOpenShop = returnOpencardTitle(info.listInfo[k].ShopID)
        obj.tableCardStatus = value2Status(info.listInfo[k].State)
        obj.tableTotalCharge = info.listInfo[k].TotalMoney
        obj.tableTotalCast = info.listInfo[k].TotalMoney - info.listInfo[k].CurMoney - info.listInfo[k].ClearMoney
        obj.tableTotalLast = info.listInfo[k].CurMoney
        obj.tableRealLast = info.listInfo[k].RealPrice
        obj.tableTotalZen = info.listInfo[k].FreeRealPrice
        obj.tableCashRate = info.listInfo[k].CurMoney > 0 ? (Math.round((info.listInfo[k].RealPrice / info.listInfo[k].CurMoney) * 100, 0)) + '%' : 0
        obj.tableTotalCount = info.listInfo[k].Score
        obj.tableMemberName = info.listInfo[k].UserName
        obj.tableMemberPhone = info.listInfo[k].Mobile
        obj.ShopId = info.listInfo[k].ShopID
        obj.ID = info.listInfo[k].ID
        obj.tableChargeDate = (formatTimestamp(info.listInfo[k].LastFillTime) <= getFloatTime('0001/1/1')) ? parseTime(formatTimestamp(info.listInfo[k].AddDate) / 1000, '{y}-{m}-{d}') : parseTime(formatTimestamp(info.listInfo[k].LastFillTime) / 1000, '{y}-{m}-{d}')
        obj.tableCastDate = info.listInfo[k].LastPayTime === null ? '' : parseTime(formatTimestamp(info.listInfo[k].LastPayTime), '{y}-{m}-{d}')
        obj.tableOpenCardDate = parseTime(formatTimestamp(info.listInfo[k].AddDate), '{y}-{m}-{d}')
        obj.tableValiteTime = parseTime(formatTimestamp(info.listInfo[k].EndTime), '{y}-{m}-{d}')
        tmpTable[k] = obj
      }
      state.memberInfoList = tmpTable
    },
    MEMBERCHARGELIST: (state, info) => {
      state.memberChargeList = info
    },
    MEMBERSPECCARDLIST: (state, info) => {
      state.membermanager.memberSpecCardType[info.id] = info.list
      state.membermanager.memberSpecGroupType[info.id] = info.list2
    }
  },
  actions: {
    GetMemberInfoList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberCardList(requestParams).then((response) => {
          const ResObj = response.Data
          // commit('MEMBERINFOLIST', ResObj)
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },

    GetMemberDetailInfo ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberDetailInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberChargeList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberChargeList(requestParams).then((response) => {
          const ResObj = response.Data
          // commit('MEMBERCHARGELIST', ResObj)
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberCastList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberCastList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberCastListDetail ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberCastListDetail(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    UpdateMemberCastList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        updateMemberCastList(requestParams).then((response) => {
          const ResObj = response
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    UpdateMemberCastType ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        updateMemberCastType(requestParams).then((response) => {
          const ResObj = response
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberCastUpdateList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberCastUpdateList(requestParams).then((response) => {
          const ResObj = response.Data
          var info = {}
          info.id = requestParams.ShopID
          info.list = ResObj.ShopCardType
          info.list2 = ResObj.GroupCardType
          // console.log('GetMemberCastUpdateList---')
          // console.log(info)
          commit('MEMBERSPECCARDLIST', info)
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberUpdateList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberUpdateList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetAllMemberTypeIndex ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryAllMemberTypeIndex(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetAllMemberTypeList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        quertyAllMemberTypeList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetAllMemberShopList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryAllMemberShopList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetMemberRecordList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryMemberRecordList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    ExMemberRecordList ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryChargeRecordSummary(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetCountAllShopData ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryCountAllShopData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    GetCountConsumeData ({ commit, state }, requestParams) {
      return new Promise((resolve, reject) => {
        queryCountConsumeData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default member
