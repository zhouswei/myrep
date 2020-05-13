import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Foo from '@/views/Foo'
// import AppWrapter from '@/views/Appwraper'
// import demo from '@/views/demo'

import Layout from '../views/layout/layout'
// import HelloWorld from '@/components/HelloWorld'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '',
    meta: {
      title: 'General',
      icon: 'general'
    },
    hidden: false },
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/userRegister', component: _import('userRegister/userRegister'), hidden: true },
  { path: '/agentManager', component: _import('agentManager/agentManager'), hidden: true },
  { path: '/agentDetail', component: _import('agentManager/agentDetail'), hidden: true },
  { path: '/agentSearch', component: _import('agentManager/agentSearch'), hidden: true },
  { path: '/chainManager', component: _import('chainManager/chainManager'), hidden: true },
  { path: '/chainDetail', component: _import('chainManager/chainDetail'), hidden: true },
  { path: '/divideMananger', component: _import('divideMananger/divideMananger'), hidden: true },
  { path: '/lowerDivide', component: _import('lowerDivide/lowerDivde'), hidden: true },
  { path: '/promoteDetail', component: _import('minePromote/promoteDetail'), hidden: true },
  { path: '/reservesManager', component: _import('reservesManager/reservesManager'), hidden: true },
  { path: '/shopManager', component: _import('shopManager/shopManager'), hidden: true },
  { path: '/shopDetail', component: _import('shopManager/shopDetail'), hidden: true },
  { path: '/shopSearch', component: _import('shopManager/shopSearch'), hidden: true },
  { path: '/shopAddLevel1', name: 'shopAddLevel1', component: _import('shopManager/shopAddLevel1'), hidden: true },
  { path: '/shopAddLevel2', component: _import('shopManager/shopAddLevel2'), hidden: true },
  { path: '/shopAddSuccess', component: _import('shopManager/shopAddSuccess'), hidden: true },
  { path: '/finalPayment', component: _import('shopManager/finalPayment'), hidden: true },
  { path: '/RenewalYear', component: _import('shopManager/RenewalYear'), hidden: true },
  { path: '/buyAccount', component: _import('shopManager/buyAccount'), hidden: true },
  { path: '/updateVersion', component: _import('shopManager/updateVersion'), hidden: true },
  { path: '/withdrawalManager', component: _import('withdrawalManager/withdrawalManager'), hidden: true },
  { path: '/withdrawalRecord', component: _import('withdrawalManager/withdrawalRecord'), hidden: true },
  { path: '/withdrawalAccount', component: _import('withdrawalManager/withdrawalAccount'), hidden: true },
  { path: '/minePromote', component: _import('minePromote/minePromote'), hidden: true },
  { path: '/agentadd', component: _import('agentManager/agentadd'), hidden: true },
  { path: '/agentEdit', component: _import('agentManager/agentEdit'), hidden: true }
]
export default new Router({
  mode: 'hash',
  routes: constantRouterMap
})

export const asyncRouterMap = [
]
