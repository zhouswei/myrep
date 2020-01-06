import request from '@/utils/request'
// import qs from 'qs'
/**
 * @api {post} /Account/LoginSpec loginByUsername
 * @apiVersion 1.0.0
 * @apiName loginByUsername
 * @apiGroup login
 *
 * @apiParam {String} GroupCode 店铺编码.
 * @apiParam {String} LoginName 用户名.
 * @apiParam {String} LoginPwd 用户密码.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {String} Data.GroupCode  return data content.
 * @apiSuccess {String} Data.LoginName  return data content.
 * @apiSuccess {String} Data.LoginPwd  return data content.
 * @apiSuccess {String} [Data.RandomNumber]  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "RetCode": 0,
 *    "Data": {
 *      "GroupCode": "5552",
 *      "LoginName": "5552",
 *      "LoginPwd": "5552",
 *      "RandomNumber": "5552",
 *    },
 *    "Msg": ""
 *  }
 */
export function loginByUsername (username, password, shopnum) {
  const data = {
    code: shopnum,
    account: username,
    password: password
  }
  return request({
    url: '/NewLogin.aspx',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /login/logout logout
 * @apiVersion 1.0.0
 * @apiName logout
 * @apiGroup login
 *
 * @apiSuccess {Object} content return data.
 * @apiSuccess {Object} content.Data  return data content.
 * @apiSuccess {Number} content.ResCode  return data ResCode.
 * @apiSuccess {String} content.Msg  return data Msg.
 *
 */
export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
/**
 * @api {get} /Home/GetMyInfoSpec getUserInfo
 * @apiVersion 1.0.0
 * @apiName getUserInfo
 * @apiGroup login
 *
 * @apiParam {Number} token token.
 *
 * @apiSuccess {Object} content return data.
 * @apiSuccess {Object} content.Data  return data content.
 * @apiSuccess {Number} content.ResCode  return data ResCode.
 * @apiSuccess {String} content.Msg  return data Msg.
 *
 */
export function getUserInfo (token) {
  return request({
    url: '/Home/GetMyInfoSpec',
    method: 'get',
    params: { token }
  })
}
/**
 * @api {get} /Home/IndexSpec getShopInfo
 * @apiVersion 1.0.0
 * @apiName getShopInfo
 * @apiGroup login
 *
 * @apiParam {String} token token.
 *
 * @apiSuccess {Object} content return data.
 * @apiSuccess {Object} content.Data  return data content.
 * @apiSuccess {Number} content.ResCode  return data ResCode.
 * @apiSuccess {String} content.Msg  return data Msg.
 *
 */
export function getShopInfo (token) {
  return request({
    url: '/Home/IndexSpec',
    method: 'get',
    params: { token }
  })
}
/**
 * @api {get} /Home/GetUserData getUserData
 * @apiVersion 1.0.0
 * @apiName getUserData
 * @apiGroup login
 *
 * @apiParam {String} token token.
 *
 * @apiSuccess {Object} content return data.
 * @apiSuccess {Object} content.Data  return data content.
 * @apiSuccess {Number} content.ResCode  return data ResCode.
 * @apiSuccess {String} content.Msg  return data Msg.
 *
 */
export function getUserData (token) {
  return request({
    url: '/Home/GetUserData',
    method: 'get',
    params: { token }
  })
}
/**
 * @api {get} /Home/GetUserData getPowerClass
 * @apiVersion 1.0.0
 * @apiName getPowerClass
 * @apiGroup login
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.powerclass  return data powerclass.
 * @apiSuccess {Number} Data.powerclass.ID  return data powerclass.ID
 * @apiSuccess {String} Data.powerclass.Keywords  return data powerclass.Keywords
 * @apiSuccess {String} Data.powerclass.Name  return data powerclass.Name
 * @apiSuccess {Number} Data.powerclass.ParentID  return data powerclass.ParentID
 * @apiSuccess {String} Data.powerclass.Url  return data powerclass.Url
 * @apiSuccess {Object[]} Data.powerclass.SonClass  return data powerclass.SonClass
 * @apiSuccess {Object[]} Data.powerclass.Items  return data powerclass.Items
 * @apiSuccess {Number} Data.powerclass.Items.ID  return data powerclass.Items.ID
 * @apiSuccess {Number} Data.powerclass.Items.ItemID  return data powerclass.Items.ItemID
 * @apiSuccess {String} Data.powerclass.Items.Name  return data powerclass.Items.Name
 * @apiSuccess {String} Data.powerclass.Items.Url  return data powerclass.Items.Url
 * @apiSuccess {String} Data.powerclass.Items.Keywords  return data powerclass.Items.Keywords
 * @apiSuccess {Object[]} Data.powerclass.Items.FuncList  return data powerclass.Items.FuncList
 * @apiSuccess {Number} Data.powerclass.Items.FuncList.ID  return data powerclass.Items.FuncList.ID
 * @apiSuccess {String} Data.powerclass.Items.FuncList.Name  return data powerclass.Items.FuncList.Name
 * @apiSuccess {Number} Data.powerclass.Items.FuncList.IsSelected  return data powerclass.Items.FuncList.IsSelected
 * @apiSuccess {Number} Data.powerclass.Items.FuncList.IsRole  return data powerclass.Items.FuncList.IsRole
 * @apiSuccess {String} Data.powerclass.Items.FuncList.FuncCode  return data powerclass.Items.FuncList.FuncCode
 * @apiSuccess {Number} ResCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 */
export function getPowerClass (params) {
  return request({
    url: '/Home/GetmenusSpec',
    method: 'get',
    params: { }
  })
}
/**
 * @api {post} /Home/GetUserData ChangePwd
 * @apiVersion 1.0.0
 * @apiName ChangePwd
 * @apiGroup login
 *
 * @apiParam {String} oldPwd oldPwd.
 * @apiParam {String} newPwd newPwd.
 * @apiParam {String} confirmPwd confirmPwd.
 *

 * @apiSuccess {Number} ResCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 */
export function ChangePwd (params) {
  const data = {
    oldPwd: params.oldPwd,
    newPwd: params.newPwd,
    confirmPwd: params.confirmPwd
  }
  return request({
    url: '/Home/ChangePwd',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Home/GetUserData ChangePwd
 * @apiVersion 1.0.0
 * @apiName ChangePwd
 * @apiGroup login
 *
 * @apiParam {String} oldPwd oldPwd.
 * @apiParam {String} newPwd newPwd.
 * @apiParam {String} confirmPwd confirmPwd.
 *
 * @apiSuccess {Number} ResCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 */
export function GetVeriCode (params) {
  const data = {
    mobile: params.mobile,
    type: params.type
  }
  return request({
    url: '/Home/GetVeriCode',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Home/GetUserData ChangePhone
 * @apiVersion 1.0.0
 * @apiName ChangePhone
 * @apiGroup login
 *
 * @apiParam {String} oldPwd oldPwd.
 * @apiParam {String} newPwd newPwd.
 * @apiParam {String} confirmPwd confirmPwd.
 *
 * @apiSuccess {Number} ResCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 */
export function ChangePhone (params) {
  const data = {
    newMobile: params.newMobile,
    veriCode: params.veriCode
  }
  return request({
    url: '/Home/ChangeAccount',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Home/GetUserData FindPwd
 * @apiVersion 1.0.0
 * @apiName FindPwd
 * @apiGroup login
 *
 * @apiParam {String} oldPwd oldPwd.
 * @apiParam {String} newPwd newPwd.
 * @apiParam {String} confirmPwd confirmPwd.
 *
 * @apiSuccess {Number} ResCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 *
 */
export function FindPwd (params) {
  const data = {
    name: params.name,
    mobile: params.mobile,
    veriCode: params.veriCode,
    newPassword: params.newPassword
  }
  return request({
    url: '/Home/FindPwd',
    method: 'post',
    data: data
  })
}
export function GetTipInfo (params) {
  const data = {
  }
  return request({
    url: '/Home/Index_ThecluesSpec',
    method: 'get',
    params: data
  })
}
export function GetTechList (params) {
  const data = {
    TechNo: params.TechNo,
    ServiceType: params.ServiceType,
    ScheduID: params.ScheduID,
    LevelID: params.LevelID,
    TechState: params.TechState,
    code: params.code,
    isShow: params.isShow
  }
  return request({
    url: '/rankstatus1.aspx',
    method: 'get',
    params: data
  })
}
export function GetpoweList (params) {
  const data = {
    code: params.code,
    account: params.account
  }
  return request({
    url: '/getPowerList.aspx',
    method: 'get',
    params: data
  })
}
