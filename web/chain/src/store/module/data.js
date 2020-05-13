import { GetBusinessStatisticData, GetBusinessStatissticDetail,
  getGatherData, getDailyReportData, getTotalInvocingData, getStoreTableData,
  getPayMoneyTableData, getGuaZhangTableData, getLoaclInvocingData,
  getStoreTableDetailData, getProjStatisiticData, getPayMoneyDetailData, getClockStatisticData, getLogTypeList,
  getOperationLogData, getLogItemData, getCurrentStatusData, getChangeStatusData, exportLoaclInvocingData,
  exportStoreInvocingData, getInvoicingStoreDetailInfo, getInvalideShopList,
  ExportBusinessStatissticDetail, ExportGatherData, ExportCurrentStatusData,
  ExportChangeStatusData, ExportBusinessStatisticData, getAllShopList, getShopToken, exportClockStatisticData, getUpgradedCardDetail } from '@/api/datamanager'

const data = {
  state: {
    state1: '',
    powerClassList: [],
    powerItemList: []
  },
  mutations: {
    SET_POWERLIST: (state, list) => {
      state.powerClassList = list
    },
    SET_POWERITEMLIST: (state, list) => {
      state.powerItemList.push(list)
    }
  },
  actions: {
    queryBusinessStatisticData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetBusinessStatisticData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    exportBusinessStatisticData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ExportBusinessStatisticData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryBusinessStatisticDetail ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetBusinessStatissticDetail(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    exportBusinessStatisticDetail ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ExportBusinessStatissticDetail(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryGatherData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getGatherData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    exportGatherData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ExportGatherData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryDailyReportData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getDailyReportData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryStoreTableData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getStoreTableData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryStoreTableDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getStoreTableDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryTotalInvocingData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getTotalInvocingData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryPayMoneyTableData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getPayMoneyTableData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryPayMoneyDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getPayMoneyDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryInvoicingStoreDetailInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getInvoicingStoreDetailInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryGuaZhangTableData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getGuaZhangTableData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryClockStatisticData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getClockStatisticData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    ExportClockStatisticData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        exportClockStatisticData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryLoaclInvocingData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getLoaclInvocingData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryInvalideShopList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getInvalideShopList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    ExportLoaclInvocingData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        exportLoaclInvocingData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    ExportStoreInvocingData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        exportStoreInvocingData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryProjStatisiticData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getProjStatisiticData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryLogTypeList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getLogTypeList(requestParams).then((response) => {
          const ResObj = response.Data
          ResObj.listInfo.forEach(element => {
            element.Title = element.Title.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '----')
          })
          commit('SET_POWERLIST', ResObj.listInfo)
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryLogItemData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getLogItemData(requestParams).then((response) => {
          const ResObj = response.Data
          const itemclassid = requestParams.powerClassID
          const arrayItemObj = {
            classId: itemclassid,
            classObj: ResObj.listInfo
          }
          commit('SET_POWERITEMLIST', arrayItemObj)
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryOperationLogData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getOperationLogData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryCurrentStatusData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getCurrentStatusData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    exportCurrentStatusData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ExportCurrentStatusData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryChangeStatusData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getChangeStatusData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    exportChangeStatusData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ExportChangeStatusData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryUpgradedCardDetail ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getUpgradedCardDetail(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch(() => {

        })
      })
    },
    queryAllShopList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getAllShopList(requestParams).then((response) => {
          const ResObj = response
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryShopToken ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getShopToken(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default data
