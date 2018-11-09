import { asyncRouterMap, constantRouterMap } from '@/router'
import { getPowerClass } from '@/api/login'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  // console.log(route)
  if (route.meta) {
    return roles.some(role => {
      if (role === route.id) {
        return true
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        // console.log('route.children--------------')
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    funcLists: [],
    parentLists: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_FUNCLIST: (state, funclist) => {
      state.funcLists = funclist
    },
    SET_PARENTLIST: (state, funclist) => {
      state.parentLists = funclist
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise((resolve, reject) => {
        const { roles } = data
        let accessedRouters
        console.log(roles)
        getPowerClass(data).then((response) => {
          const objData = response.Data.powerclass
          var powerList = []
          var funcList = []
          objData.forEach(element => {
            powerList.push(element.ID)
            element.Items.forEach(element2 => {
              powerList.push(element2.ID)
              funcList.push(element2.FuncList)
            })
            element.SonClass.forEach(element3 => {
              powerList.push(element3.ID)
              element3.Items.forEach(element4 => {
                funcList.push(element4.FuncList)
              })
            })
          })
          if (powerList.length > 0) {
            // console.log(funcList)
            // console.log(powerList)
            accessedRouters = filterAsyncRouter(asyncRouterMap, powerList)
          } else {
            accessedRouters = asyncRouterMap
          }
          commit('SET_ROUTERS', accessedRouters)
          commit('SET_FUNCLIST', funcList)
          commit('SET_PARENTLIST', powerList)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
