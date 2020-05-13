// import Cookies from 'js-cookie'
import { getCookies, setCookies } from '@/utils/auth'
const app = {
  state: {
    slidebar: {
      opened: !+getCookies('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: getCookies('language') || 'en',
    statusBarHeight: 0,
    cacheviews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      // console.log('TOGGLE_SIDEBAR' + state.slidebar.opened)
      if (state.slidebar.opened) {
        setCookies('sidebarStatus', 1)
      } else {
        setCookies('sidebarStatus', 0)
      }
      state.slidebar.opened = !state.slidebar.opened
      state.slidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      setCookies('sidebarStatus', 1)
      state.slidebar.opened = false
      state.slidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setCookies('language', language)
    },
    SET_STATUSHEIGHT: (state, height) => {
      state.statusBarHeight = height
    },
    SET_CACHEVIEWS: (state, height) => {
      this.caFalg = 0
      state.cacheviews.forEach(element => {
        if (element === height.name) {
          this.caFalg = 1
        }
      })
      if (this.caFalg === 0) {
        state.cacheviews.push(height.name)
      }
    },
    DEL_VISITE_VIEWS: (state, view) => {
      state.cacheviews = []
      // for (const [i, v] of state.visitedViews.entries()) {
      //   if (v.path === view.path) {
      //     state.visitedViews.splice(i, 1)
      //     break
      //   }
      // }
      // for (const i of state.cachedViews) {
      //   if (i === view.name) {
      //     const index = state.cachedViews.indexOf(i)
      //     state.cachedViews.splice(index, 1)
      //     break
      //   }
      // }
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setStatusHeight ({ commit }, height) {
      commit('SET_STATUSHEIGHT', height)
    },
    addVisitedViews ({ commit }, name) {
      commit('SET_CACHEVIEWS', name)
    },
    delVisitedViews ({ commit, state }) {
      // return new Promise((resolve) => {
      commit('DEL_VISITE_VIEWS')
      //   resolve([...state.visitedViews])
      // })
    }
  }
}
export default app
