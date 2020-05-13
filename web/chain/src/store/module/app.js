// import Cookies from 'js-cookie'
import { getCookies, setCookies } from '@/utils/auth'
const app = {
  state: {
    slidebar: {
      opened: !+getCookies('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: getCookies('language') || 'en'
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
    }
  }
}
export default app
