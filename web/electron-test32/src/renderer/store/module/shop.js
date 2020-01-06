import { getValideShopData, getPendingShopData,
  getValideShopDetailData, getTechListData, getEmployeeManagerTableData
  , getTechDetailData, getEmployeeManagerDetailData
  , getPendingShopDetailData, CheckShopMax, shopmanagerAddShop, delValideShop,
  delPenShop, ChangeValShop, EditSnapSpec, EditSnapSpecMod } from '@/api/shopmanager'
const shop = {
  state: {
    state1: ''
  },
  mutations: {

  },
  actions: {
    queryValideShopData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getValideShopData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          resolve('null')
          reject(error)
        })
      })
    },
    queryValideShopDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getValideShopDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryPendingShopData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getPendingShopData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          resolve('null')
          reject(error)
        })
      })
    },
    queryPendingShopDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getPendingShopDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryEmployeeManagerTableData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getEmployeeManagerTableData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryEmployeeManagerDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getEmployeeManagerDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryTechListData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getTechListData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryTechDetailData ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getTechDetailData(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    CheckShopMax ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        CheckShopMax(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    ShopmanagerAddShop ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        shopmanagerAddShop(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDelValideShop ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        delValideShop(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDelPenShop ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        delPenShop(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeValShop ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeValShop(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryEditSnapInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        EditSnapSpec(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryEditSnapSpecMod ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        EditSnapSpecMod(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default shop
