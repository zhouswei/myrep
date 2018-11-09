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
    redirect: 'general',
    meta: {
      title: 'General',
      icon: 'general'
    },
    children: [{
      name: 'general',
      path: 'general',
      component: _import('setting/push'),
      meta: {
        title: 'General',
        icon: 'general'
      }
    }],
    hidden: false },
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authRedirect', component: _import('login/authRedirect'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true }
]
export default new Router({
  mode: 'hash',
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/shop',
  //   id: 2,
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'shop',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'Shop',
  //     icon: 'shop'
  //   },
  //   children: [
  //     {path: 'shopmanager', id: 6, component: _import('shop/shopmanager'), name: 'shopmanager', meta: { title: 'ShopManager' }},
  //     {path: 'employeemanager', id: 31, component: _import('shop/employeemanager'), name: 'employeemanager', meta: { title: 'EmployeeManager' }},
  //     {path: 'techmanager', id: 32, component: _import('shop/techmanager'), name: 'techmanager', meta: { title: 'TechManager' }}
  //   ]
  // },
  // {
  //   path: '/member',
  //   id: 3,
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'member',
  //   meta: {
  //     title: 'Member',
  //     icon: 'member'
  //   },
  //   children: [
  //     {path: 'membermanager', id: 33, component: _import('member/membermanager'), name: 'membermanager', meta: { title: 'MemberManager' }},
  //     {path: 'chargerecord', id: 34, component: _import('member/chargerecord'), name: 'chargerecord', meta: { title: 'ChargeRecord' }},
  //     {path: 'castrecord', id: 35, component: _import('member/castrecord'), name: 'castrecord', meta: { title: 'CastRecord' }},
  //     {path: 'memberupdate', id: 39, component: _import('member/memberupdate'), name: 'memberupdate', meta: { title: 'MemberUpdate' }}
  //   ]
  // },
  // {
  //   path: '/data',
  //   id: 4,
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'data',
  //   meta: {
  //     title: 'Data',
  //     icon: 'data'
  //   },
  //   children: [
  //     {path: 'businessstatistics', id: 12, component: _import('data/businessstatistics'), name: 'businessstatistics', meta: { title: 'BusinessStatistics' }},
  //     {path: 'invoicingstatistics', id: 13, component: _import('data/invoicingstatistics'), name: 'invoicingstatistics', meta: { title: 'InvoicingStatistics' }},
  //     {path: 'memberstatistics', id: 14, component: _import('data/memberstatistics'), name: 'memberstatistics', meta: { title: 'MemberStatistics' }},
  //     {path: 'projstatistics', id: 36, component: _import('data/projstatistics'), name: 'projstatistics', meta: { title: 'ProjStatistics' }},
  //     {path: 'clockstatistics', id: 37, component: _import('data/clockstatistics'), name: 'clockstatistics', meta: { title: 'ClockStatistics' }},
  //     {path: 'operationrecord', id: 38, component: _import('data/operationrecord'), name: 'operationrecord', meta: { title: 'OperationRecord' }}
  //   ]
  // },
  // {
  //   path: '/setting',
  //   id: 5,
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'setting',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'Setting',
  //     icon: 'setting'
  //   },
  //   children: [
  //     {path: 'enterpriseinfo', id: 24, component: _import('setting/enterpriseinfo'), name: 'enterpriseinfo', meta: { title: 'EnterpriseInfo' }},
  //     {path: 'departmentmanager', id: 30, component: _import('setting/departmentmanager'), name: 'departmentmanager', meta: { title: 'DepartmentManager' }},
  //     {path: 'rolemanager', id: 27, component: _import('setting/rolemanager'), name: 'rolemanager', meta: { title: 'RoleManager' }},
  //     {path: 'usermanager', id: 26, component: _import('setting/usermanager'), name: 'usermanager', meta: { title: 'UserManager' }},
  //     {path: 'membercardmanager', id: 28, component: _import('setting/membercardmanager'), name: 'membercardmanager', meta: { title: 'MemberCardManager' }},
  //     {path: 'chargegiverule', id: 29, component: _import('setting/chargegiverule'), name: 'chargegiverule', meta: { title: 'ChargeGiveRule' }},
  //     {path: 'weshopmanager', id: 41, component: _import('setting/weshopmanager'), name: 'weshopmanager', meta: { title: 'WeShopManager' }}
  //     // {path: 'push', id: 41, component: _import('setting/push'), name: 'push', meta: { title: 'push' }}
  //   ]
  // }

]
