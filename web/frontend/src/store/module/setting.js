import { getEnterpriseInfo, postSaveEnterpriseInfo, getUserListInfo,
  getRoleListInfo, getUCardListInfo, getWeShopList, AddWxConfigInfo, deleteWxConfigInfo,
  getShops, ChangeWxConfigInfo, getWeshopInfo, getSettingInfo, getDepartmentListInfo,
  ChangeDepartmentInfo, AddDepartmentInfo, deleteDepartmentInfo, getFillConfigListInfo,
  AddFillConfigInfo, ChangeFillConfigInfo, deleteFillConfigInfo, getUCardInfo, AddUCardInfo,
  deleteUCardInfo, ChangeUCardInfo, BindShops, deleteRoleInfo, getDepartmentList, AddRoleInfo,
  changeRoleInfo, AddUserInfo, GetRoles, GetUserInfo, deleteUserInfo, ChangeUserInfo, SettingWxConfigInfo,
  GetRolePowers, GetUserPowers, getShopsList, setUserPowers, setRolePowers } from '@/api/settingmanager'
const setting = {
  state: {
    state1: ''
  },
  mutations: {

  },
  actions: {
    queryEnterpriseInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getEnterpriseInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querySaveEnterpriseInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        postSaveEnterpriseInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryUserListInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getUserListInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          resolve('null')
          reject(error)
        })
      })
    },
    queryRoleListInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getRoleListInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryWeShopList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getWeShopList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddWxConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddWxConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDeleteWxConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteWxConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryShops ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getShops(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeWxConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeWxConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryWeshopInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getWeshopInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querySettingInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getSettingInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryUCardListInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getUCardListInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryUCardInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getUCardInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDepartmentListInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getDepartmentListInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeDepartmentInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeDepartmentInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddDepartmentInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddDepartmentInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querydeleteDepartmentInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteDepartmentInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryFillConfigListInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getFillConfigListInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddFillConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddFillConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeFillConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeFillConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDeleteFillConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteFillConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddUCardInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddUCardInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDeleteUCardInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteUCardInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeUCardInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeUCardInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryBindShops ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        BindShops(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querydeleteRoleInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteRoleInfo(requestParams).then((response) => {
          const ResObj = response
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryDepartmentList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getDepartmentList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddRoleInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddRoleInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querychangeRoleInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        changeRoleInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryAddUserInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        AddUserInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryChangeUserInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        ChangeUserInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryRoles ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetRoles(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryUserInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetUserInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querydeleteUserInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        deleteUserInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    querySettingWxConfigInfo ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        SettingWxConfigInfo(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryRolePowers ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetRolePowers(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryUserPowers ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        GetUserPowers(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    queryShopsList ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        getShopsList(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    setUserPowers ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        setUserPowers(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    setRolePowers ({commit, state}, requestParams) {
      return new Promise((resolve, reject) => {
        setRolePowers(requestParams).then((response) => {
          const ResObj = response.Data
          resolve(ResObj)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default setting
