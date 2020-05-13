import request from '@/utils/request'
import { dataGenerate } from '@/utils/index'
import qs from 'qs'

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

export function loginByUsername (params) {
  var tmpdata = {}
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getProjectList (token, userid) {
  const data = {
    Token: 1,
    UserID: 123
  }
  return request({
    url: '/user/info',
    method: 'post',
    data: data
  })
}
export function getHtml (info) {
  return request({
    url: info.url,
    method: 'get',
    data: info.param
  })
}
export function getVedioList (token, userid, projectId) {
  const data = {
    Token: token,
    UserID: userid,
    ProjectNO: projectId
  }
  return request({
    url: '/ysapi/app/videoinfo',
    method: 'post',
    data: data
  })
}
export function getVideoAccessToken (token, userid) {
  const data = {
    Token: token,
    UserID: userid
  }
  return request({
    url: '/ysapi/app/livetoken',
    method: 'post',
    data: data
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
export function logout (token, userid) {
  const data = {
    Token: token,
    UserID: userid
  }
  return request({
    url: '/login/logout',
    method: 'post',
    data: data
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
    url: '/user/info',
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
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentResetPassword'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
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
  var tmpdata = {}
  params['Method'] = 'API.platform.VerifySmsCodeSend'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
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
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentMobileUpdate'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
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
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentFotgetPassword'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function registerPersion (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentAdd'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function registerCompany (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentAdd'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentSubReateSet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentSubReateSet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getMetrialList (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentLettersListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
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
export function getAgentList (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentsListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getChainList (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentLinkShopListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function AddShopAccount (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentShopApply'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getCurrentShopList (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentShopsListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getBankBaseInfo (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentBankInfoGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getReservesInfo (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentSeqMoneysPayListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getAgentFinanceInfo (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentFinancesListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getAgentShopInfo (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.ShopInfoGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function setDivideRate (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentInfoUpdate'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getRateInfo (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentInfoGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getVersionList (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.SaasVersionsListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentPayShopSection (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentPayShopSection'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentBuyAccount (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentBuyAccount'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentPayContinuationMoneys (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentPayContinuationMoneys'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentVersionUpgrades (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentVersionUpgrades'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function shopUpgradesVersionsListGet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.ShopUpgradesVersionsListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentApply (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentApply'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentFractionationsListGet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.agentFractionationsListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function getPlatformParams (params) {
  var tmpdata = {}
  params['Method'] = 'API.platform.EnumListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentApplyListGet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentApplyListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentReservesListGet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentReservesListGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
export function agentAppVersionGet (params) {
  var tmpdata = {}
  params['Method'] = 'API.Agents.AgentAppVersionGet'
  for (var key in params) {
    tmpdata[key] = params[key]
  }
  var data1 = dataGenerate(tmpdata)
  var data3 = qs.stringify(data1)
  return request({
    url: '/rest.ashx',
    method: 'post',
    data: data3
  })
}
