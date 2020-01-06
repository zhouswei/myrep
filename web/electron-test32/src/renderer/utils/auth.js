// 应为平台适应性的问题，只在browser 模式下保证使用js-cookie来存储数据，
// 在pc端或者手机端使用其他的存储方式

// import Cookies from 'js-cookie'
let mode = 'pc'// 'mobile' 'pc' 'browser'
const TokenKey = 'Admin-Token'

export function getToken () {
  if (mode === 'browser') {
    // return Cookies.get(TokenKey)
    return window.localStorage.getItem(TokenKey)
  } else if (mode === 'mobile') {
    return window.localStorage.getItem(TokenKey)
  } else {
    return window.localStorage.getItem(TokenKey)
  }
}

export function getCookies (key) {
  if (mode === 'browser') {
    // return Cookies.get(key)
    return window.localStorage.getItem(key)
  } else if (mode === 'mobile') {
    return window.localStorage.getItem(key)
  } else {
    return window.localStorage.getItem(key)
  }
}

export function setCookies (key, value) {
  if (mode === 'browser') {
    // console.log('setCookies:' + key + value)
    // return Cookies.set(key, value)
    return window.localStorage.setItem(key, value)
  } else if (mode === 'mobile') {
    return window.localStorage.setItem(key, value)
  } else {
    return window.localStorage.setItem(key, value)
  }
}

export function setToken (token) {
  if (mode === 'browser') {
    // console.log('setToken:' + TokenKey + token)
    // return Cookies.set(TokenKey, token)
    return window.localStorage.setItem(TokenKey, token)
  } else if (mode === 'mobile') {
    return window.localStorage.setItem(TokenKey, token)
  } else {
    return window.localStorage.setItem(TokenKey, token)
  }
}

export function removeToken () {
  if (mode === 'browser') {
    // console.log('removeToken:')
    // return Cookies.remove(TokenKey)
    return window.localStorage.removeItem(TokenKey)
  } else if (mode === 'mobile') {
    return window.localStorage.removeItem(TokenKey)
  } else {
    return window.localStorage.removeItem(TokenKey)
  }
}
