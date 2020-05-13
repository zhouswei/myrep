import request from '@/utils/request'
/**
 * @api {get} /VIP/GetUCardTypeList getShopMemberInfo
 * @apiVersion 1.0.0
 * @apiName getShopMemberInfo
 * @apiGroup Member
 *
 * @apiParam {String} token token
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function getShopMemberInfo (token) {
  return request({
    url: '/VIP/GetUCardTypeList',
    method: 'get',
    params: { token }
  })
}
/**
 * @api {post} /VIP/ListSpec queryMemberCardList
 * @apiVersion 1.0.0
 * @apiName queryMemberCardList
 * @apiGroup Member
 *
 * @apiParam {String} Title 卡名称
 * @apiParam {String} CardNo 会员卡编号
 * @apiParam {String} Mobile 会员手机号
 * @apiParam {Number} UcardType 会员卡类型
 * @apiParam {Number} ShopID 店铺编号
 * @apiParam {String} BeginTime 开始查询时间
 * @apiParam {String} EndTime 结束查询时间
 * @apiParam {Number} PageIndex 分页序号
 * @apiParam {Number} PageSize 分页条数
 * @apiParam {Number} isPageClick isPageClick
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberCardList (params) {
  const data = {
    Title: params.cardName,
    CardNo: params.memberCardNo,
    Mobile: params.phone,
    UcardType: params.CardType,
    ShopID: params.ShopNo,
    BeginTime: params.startTime,
    EndTime: params.endTime,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    isPageClick: 1
  }
  return request({
    url: '/VIP/ListSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /VIP/InfoSpec queryMemberDetailInfo
 * @apiVersion 1.0.0
 * @apiName queryMemberDetailInfo
 * @apiGroup Member
 *
 * @apiParam {Number} id id
 * @apiParam {Number} shopID shopID
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberDetailInfo (params) {
  const data = {
    id: params.id,
    shopID: params.shopID
  }
  return request({
    url: '/VIP/InfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /VIP/RechargeRecordSpec queryMemberChargeList
 * @apiVersion 1.0.0
 * @apiName queryMemberChargeList
 * @apiGroup Member
 *
 * @apiParam {String} Title 卡名称
 * @apiParam {String} CardNo 会员卡编号
 * @apiParam {String} Mobile 会员手机号
 * @apiParam {Number} UcardType 会员卡类型
 * @apiParam {Number} ShopID 店铺编号
 * @apiParam {String} BeginTime 开始查询时间
 * @apiParam {String} EndTime 结束查询时间
 * @apiParam {Number} PageIndex 分页序号
 * @apiParam {Number} PageSize 分页条数
 * @apiParam {Number} isPageClick isPageClick
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberChargeList (params) {
  const data = {
    Title: params.cardName,
    CardNo: params.memberCardNo,
    Mobile: params.phone,
    UcardType: params.CardType,
    ShopID: params.ShopNo,
    BeginTime: params.startTime,
    EndTime: params.endTime,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    isPageClick: 1
  }
  return request({
    url: '/VIP/RechargeRecordSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /VIP/ExpenseRecordSpec queryMemberCastList
 * @apiVersion 1.0.0
 * @apiName queryMemberCastList
 * @apiGroup Member
 *
 * @apiParam {String} Title 卡名称
 * @apiParam {String} CardNo 会员卡编号
 * @apiParam {String} Mobile 会员手机号
 * @apiParam {Number} UcardType 会员卡类型
 * @apiParam {Number} ShopID 店铺编号
 * @apiParam {String} BeginTime 开始查询时间
 * @apiParam {String} EndTime 结束查询时间
 * @apiParam {Number} PageIndex 分页序号
 * @apiParam {Number} PageSize 分页条数
 * @apiParam {Number} isPageClick isPageClick
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberCastList (params) {
  const data = {
    Title: params.cardName,
    CardNo: params.memberCardNo,
    Mobile: params.phone,
    UcardShopId: params.UcardShopId,
    UcardType: params.CardType,
    ShopID: params.ShopNo,
    BeginTime: params.startTime,
    EndTime: params.endTime,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    isPageClick: 1
  }
  return request({
    url: '/VIP/ExpenseRecordSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /VIP/ExpenseInfoSpec queryMemberCastListDetail
 * @apiVersion 1.0.0
 * @apiName queryMemberCastListDetail
 * @apiGroup Member
 *
 * @apiParam {String} Title 卡名称
 * @apiParam {String} OrderLCardID 订单编号
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberCastListDetail (params) {
  const data = {
    shopID: params.shopID,
    OrderLCardID: params.OrderLCardID
  }
  return request({
    url: '/VIP/ExpenseInfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Upgrade/UpgradeCardByCheckSpec updateMemberCastList
 * @apiVersion 1.0.0
 * @apiName updateMemberCastList
 * @apiGroup Member
 *
 * @apiParam {Number} GroupID GroupID
 * @apiParam {Object[]} UCardSelectList UCardSelectList
 * @apiParam {Number} UCardSelectList.ShopID UCardSelectList.ShopID
 * @apiParam {String} UCardSelectList.CardNo UCardSelectList.CardNo
 * @apiParam {Number} GroupCardType GroupCardType
 * @apiParam {String} BatchNo BatchNo
 *
 * @apiSuccess {Object} Data  Lastname of the User.
 * @apiSuccess {Number} ResCode  Lastname of the User.
 * @apiSuccess {String} Msg  Lastname of the User.
 */
export function updateMemberCastList (params) {
  const data = {
    GroupID: params.GroupID,
    UCardSelectList: params.UCardSelectList,
    GroupCardType: params.GroupCardType,
    BatchNo: params.BatchNo
  }
  return request({
    url: '/Upgrade/UpgradeCardByCheckSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Upgrade/UpgradeCardByTypeSpec updateMemberCastType
 * @apiVersion 1.0.0
 * @apiName updateMemberCastType
 * @apiGroup Member
 *
 * @apiParam {Number} ShopID ShopID
 * @apiParam {Number} UCardType UCardType
 * @apiParam {Number} UpgradeCount UpgradeCount
 * @apiParam {Number} GroupCardType GroupCardType
 *
 * @apiSuccess {Object} Data  Lastname of the User.
 * @apiSuccess {Number} ResCode  Lastname of the User.
 * @apiSuccess {String} Msg  Lastname of the User.
 */
export function updateMemberCastType (params) {
  const data = {
    ShopID: params.ShopID,
    UCardType: params.UCardType,
    UpgradeCount: params.UpgradeCount,
    GroupCardType: params.GroupCardType
  }
  return request({
    url: '/Upgrade/UpgradeCardByTypeSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Upgrade/GetUCardTypeListSpec queryMemberCastUpdateList
 * @apiVersion 1.0.0
 * @apiName queryMemberCastUpdateList
 * @apiGroup Member
 *
 * @apiParam {Number} ShopID ShopID
 * @apiParam {Number} ReqType ReqType
 *
 * @apiSuccess {Object} Data  Lastname of the User.
 * @apiSuccess {Object[]} Data.lstData  Data.lstData
 * @apiSuccess {Number} Data.lstData.ID  Data.lstData.ID.
 * @apiSuccess {Number} Data.lstData.GroupID  Data.lstData.GroupID.
 * @apiSuccess {Number} Data.lstData.Title  Data.lstData.Title.
 * @apiSuccess {Number} Data.lstData.SavePrice  Data.lstData.SavePrice.
 * @apiSuccess {Boolean} Data.lstData.IsScore  Data.lstData.IsScore.
 * @apiSuccess {Boolean} Data.lstData.IsAllowPay  Data.lstData.IsAllowPay.
 * @apiSuccess {Number} Data.lstData.ActiveMonth  Data.lstData.ActiveMonth.
 * @apiSuccess {String} Data.lstData.AddDate  Data.lstData.AddDate.
 * @apiSuccess {Number} Data.lstData.AdminID  Data.lstData.AdminID.
 * @apiSuccess {String} Data.lstData.AdminCode  Data.lstData.AdminCode.
 * @apiSuccess {String} Data.lstData.AdminName  Data.lstData.AdminName.
 * @apiSuccess {Number} Data.lstData.Discount  Data.lstData.Discount.
 * @apiSuccess {Boolean} Data.lstData.IsClose  Data.lstData.IsClose.
 * @apiSuccess {Number} Data.lstData.SaleComm  Data.lstData.SaleComm.
 * @apiSuccess {Number} Data.lstData.SaleCommType  Data.lstData.SaleCommType.
 * @apiSuccess {Number} Data.lstData.FillComm  Data.lstData.FillComm.
 * @apiSuccess {Number} Data.lstData.FillCommType  Data.lstData.FillCommType.
 * @apiSuccess {Number} Data.lstData.OrderNo  Data.lstData.OrderNo.
 * @apiSuccess {Number} Data.lstData.UCardFillScore  Data.lstData.UCardFillScore.
 * @apiSuccess {Number} Data.lstData.UCardPayScore  Data.lstData.UCardPayScore.
 * @apiSuccess {String} Data.lstData.sendShopIDs  Data.lstData.sendShopIDs.
 * @apiSuccess {String} Data.lstData.useShopIDs  Data.lstData.useShopIDs.
 * @apiSuccess {Number} Data.lstData.UCardInfoGroupID  Data.lstData.UCardInfoGroupID.
 * @apiSuccess {String} Data.lstData.CanUseShops  Data.lstData.CanUseShops.
 * @apiSuccess {String} Data.lstData.CanSendShops  Data.lstData.CanSendShops.
 * @apiSuccess {String} Data.lstData.IDStr  Data.lstData.IDStr.
 * @apiSuccess {Number} ResCode  Lastname of the User.
 * @apiSuccess {String} Msg  Lastname of the User.
 */
export function queryMemberCastUpdateList (params) {
  const data = {
    ShopID: params.ShopID,
    ReqType: params.ReqType
  }
  return request({
    url: '/Upgrade/GetUCardTypeListSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /UCard/Upgrade/IndexSpec queryMemberUpdateList
 * @apiVersion 1.0.0
 * @apiName queryMemberUpdateList
 * @apiGroup Member
 *
 * @apiParam {String} Title 卡名称
 * @apiParam {String} CardNo 会员卡编号
 * @apiParam {String} Mobile 会员手机号
 * @apiParam {Number} UcardType 会员卡类型
 * @apiParam {Number} ShopID 店铺编号
 * @apiParam {String} BeginTime 开始查询时间
 * @apiParam {String} EndTime 结束查询时间
 * @apiParam {Number} PageIndex 分页序号
 * @apiParam {Number} PageSize 分页条数
 * @apiParam {Number} isPageClick isPageClick
 *
 * @apiSuccess {Object} content Firstname of the User.
 * @apiSuccess {Object} content.Data  Lastname of the User.
 * @apiSuccess {Number} content.ResCode  Lastname of the User.
 * @apiSuccess {String} content.Msg  Lastname of the User.
 */
export function queryMemberUpdateList (params) {
  const data = {
    Title: params.cardName,
    CardNo: params.memberCardNo,
    Mobile: params.phone,
    UcardType: params.CardType,
    ShopID: params.ShopNo,
    BeginTime: params.startTime,
    EndTime: params.endTime,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    isPageClick: 1
  }
  return request({
    url: '/UCard/Upgrade/IndexSpec',
    method: 'post',
    data: data
  })
}
export function queryAllMemberTypeIndex (params) {
  const data = {
  }
  return request({
    url: '/UCardOpenRecharge/RechargeRecord',
    method: 'get',
    data: data
  })
}
export function quertyAllMemberTypeList (params) {
  const data = {
  }
  return request({
    url: '/UCardOpenRecharge/getUCardShopsAndFillShopsAndChannels',
    method: 'get',
    data: data
  })
}
export function queryAllMemberShopList (params) {
  const data = {
    // shopid: params.shopid
  }
  return request({
    url: '/UCardOpenRecharge/getCardTypesAndFillConfigs?shopid=' + params.shopid,
    method: 'get',
    data: data
  })
}
export function queryMemberRecordList (params) {
  const data = {
    Page: params.Page,
    PageSize: params.PageSize,
    BusinessType: params.BusinessType,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    UCardShopID: params.UCardShopID,
    UCardTypeID: params.UCardTypeID,
    UCardFillConfigID: params.UCardFillConfigID,
    CardNoOrMobileOrMappingCode: params.CardNoOrMobileOrMappingCode,
    UCardUserName: params.UCardUserName,
    FillShopID: params.FillShopID,
    SaleCode: params.SaleCode,
    AdminCode: params.AdminCode,
    ChannelID: params.ChannelID
  }
  return request({
    url: '/UCardOpenRecharge/getUCardOpenRecharges',
    method: 'post',
    data: data
  })
}
export function queryCountAllShopData (params) {
  const data = {
  }
  return request({
    url: '/VIP/ExpenseRecordTimesIndexSpec',
    method: 'get',
    data: data
  })
}
export function queryCountConsumeData (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    MobileUCardCode: params.MobileUCardCode,
    IsPageClick: params.IsPageClick,
    UCardType: params.UCardType,
    UCardShopId: params.UCardShopId,
    UCardName: params.UCardName,
    ServiceTitle: params.ServiceTitle,
    BeginTime: params.BeginTime,
    EndTime: params.EndTime,
    ShopID: params.ShopID
  }
  return request({
    url: '/VIP/ExpenseRecordTimesSpec',
    method: 'post',
    data: data
  })
}
export function queryChargeRecordSummary (params) {
  const data = {
    Page: params.Page,
    PageSize: params.PageSize,
    BusinessType: params.BusinessType,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    UCardShopID: params.UCardShopID,
    UCardTypeID: params.UCardTypeID,
    UCardFillConfigID: params.UCardFillConfigID,
    CardNoOrMobileOrMappingCode: params.CardNoOrMobileOrMappingCode,
    UCardUserName: params.UCardUserName,
    FillShopID: params.FillShopID,
    SaleCode: params.SaleCode,
    AdminCode: params.AdminCode,
    ChannelID: params.ChannelID
  }
  return request({
    url: '/UCardOpenRecharge/ExportChargeRecordSummary',
    method: 'post',
    data: data
  })
}
