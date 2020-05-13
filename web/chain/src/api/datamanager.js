import request from '@/utils/request'
/**
 * @api {post} /Statistics/RevenueSpec GetBusinessStatisticData
 * @apiVersion 1.0.0
 * @apiName GetBusinessStatisticData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID Shop unique ID.
 * @apiParam {String} BeginDate start time.
 * @apiParam {String} EndDate Users end time.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetBusinessStatisticData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/RevenueSpec',
    method: 'post',
    data: data
  })
}
export function ExportBusinessStatisticData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ExportStoredSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Statistics/RevenueDetailSpec GetBusinessStatissticDetail
 * @apiVersion 1.0.0
 * @apiName GetBusinessStatissticDetail
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID Shop unique ID.
 * @apiParam {String} BeginDate start time.
 * @apiParam {String} EndDate Users end time.
 * @apiParam {Number} IsOver IsOver.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetBusinessStatissticDetail (params) {
  const data = {
    ShopID: params.ShopID,
    AddBeginDate: params.BeginDate,
    AddEndDate: params.EndDate,
    IsOver: params.IsOver,
    iPage: params.iPage,
    iPageSize: params.iPageSize,
    OverBeginDate: params.OverBeginDate,
    OverEndDate: params.OverEndDate
  }
  return request({
    url: '/Statistics/RevenueDetailSpec',
    method: 'post',
    data: data
  })
}
export function ExportBusinessStatissticDetail (params) {
  const data = {
    iPage: params.iPage,
    iPageSize: params.iPageSize,
    ShopID: params.ShopID,
    AddBeginDate: params.BeginDate,
    AddEndDate: params.EndDate,
    IsOver: params.IsOver,
    OverBeinDate: params.OverStartDate,
    OverEndDate: params.overEndDate
  }
  return request({
    url: '/Statistics/ExportRevenueDetailSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/GatheringSpec getGatherData
 * @apiVersion 1.0.0
 * @apiName getGatherData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID Shop unique ID.
 * @apiParam {String} BeginDate start time.
 * @apiParam {String} EndDate Users end time.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getGatherData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/GatheringSpec',
    method: 'get',
    params: data
  })
}
export function ExportGatherData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ExportGatheringSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Statistics/DailySalesReportSpec getDailyReportData
 * @apiVersion 1.0.0
 * @apiName getDailyReportData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID Shop unique ID.
 * @apiParam {String} BeginDate start time.
 * @apiParam {String} EndDate Users end time.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getDailyReportData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/DailySalesReportSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Statistics/StoredSettlementSpec getTotalInvocingData
 * @apiVersion 1.0.0
 * @apiName getTotalInvocingData
 * @apiGroup Data
 *
 * @apiParam {String} Date 月份.
 * @apiParam {Number} ShopID 店铺id.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ShopID  return data listInfo ShopID.
 * @apiSuccess {String} Data.listInfo.ShopTitle  return data listInfo ShopTitle.
 * @apiSuccess {String} Data.listInfo.StatDate  return data listInfo StatDate.
 * @apiSuccess {Number} Data.listInfo.FillPrice  return data listInfo FillPrice.
 * @apiSuccess {Number} Data.listInfo.TotalFillPrice  return data listInfo TotalFillPrice.
 * @apiSuccess {Number} Data.listInfo.PayPrice  return data listInfo PayPrice.
 * @apiSuccess {Number} Data.listInfo.RealPayPrice  return data listInfo RealPayPrice.
 * @apiSuccess {Number} Data.listInfo.SalePrice  return data listInfo SalePrice.
 * @apiSuccess {Number} Data.listInfo.RealPrice  return data listInfo RealPrice.
 * @apiSuccess {Number} Data.listInfo.FreePrice  return data listInfo FreePrice.
 * @apiSuccess {Number} Data.listInfo.TotalPrice  return data listInfo TotalPrice.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getTotalInvocingData (params) {
  const data = {
    ShopID: params.ShopID,
    Date: params.BeginDate
  }
  return request({
    url: '/Statistics/StoredSettlementSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/StoredFormSpec getStoreTableData
 * @apiVersion 1.0.0
 * @apiName getStoreTableData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  列表.
 * @apiSuccess {Number} Data.listInfo.ShopID  商户ID.
 * @apiSuccess {String} Data.listInfo.ShopTitle  商户名称.
 * @apiSuccess {String} Data.listInfo.StatDate  营业日期.
 * @apiSuccess {Number} Data.listInfo.FillPrice  充值实际金额.
 * @apiSuccess {Number} Data.listInfo.TotalFillPrice  充值总额.
 * @apiSuccess {Number} Data.listInfo.PayPrice  消费总额.
 * @apiSuccess {Number} Data.listInfo.RealPayPrice  消费实际总额.
 * @apiSuccess {Number} Data.listInfo.SalePrice  结算应收总额.
 * @apiSuccess {Number} Data.listInfo.RealPrice  结算实收总额.
 * @apiSuccess {Number} Data.listInfo.FreePrice  赠送总总额.
 * @apiSuccess {Number} Data.listInfo.TotalPrice  储值总额.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  提示信息.
 */
export function getStoreTableData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/StoredFormSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/StoredDetailSpec getStoreTableDetailData
 * @apiVersion 1.0.0
 * @apiName getStoreTableDetailData
 * @apiGroup Data
 *
 * @apiParam {String} BeginDate BeginDate.
 * @apiParam {String} EndDate EndDate.
 * @apiParam {Number} ShopID ShopID.
 * @apiParam {String} ShopTitle ShopTitle.
 * @apiParam {Number} QueryShopID QueryShopID.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  列表.
 * @apiSuccess {Number} Data.listInfo.ID  充值记录的ID.
 * @apiSuccess {String} Data.listInfo.UCardID  会员开卡记录ID，对应UCard_List的ID.
 * @apiSuccess {String} Data.listInfo.ShopID  店铺ID.
 * @apiSuccess {Number} Data.listInfo.PayPrice  本次用户支付的对应币种的金额数值.
 * @apiSuccess {Number} Data.listInfo.SalePrice  充值花费的实际人民币价格.
 * @apiSuccess {Number} Data.listInfo.FreePrice  赠送金额.
 * @apiSuccess {Number} Data.listInfo.SavePrice  总金额.
 * @apiSuccess {Number} Data.listInfo.CurPrice  剩余金额.
 * @apiSuccess {Number} Data.listInfo.AddDate  添加日期.
 * @apiSuccess {Number} Data.listInfo.IsBill  发票是否已开.
 * @apiSuccess {Number} Data.listInfo.BillPrice  发票面值.
 * @apiSuccess {Number} Data.listInfo.PayTypeID  付款方式.
 * @apiSuccess {Number} Data.listInfo.AdminID  操作人ID.
 * @apiSuccess {Number} Data.listInfo.AdminCode  操作人编号.
 * @apiSuccess {Number} Data.listInfo.SaleID  推荐人ID.
 * @apiSuccess {Number} Data.listInfo.SaleCode  推荐人工号.
 * @apiSuccess {Number} Data.listInfo.FillCommPrice  充值提成金额.
 * @apiSuccess {Number} Data.listInfo.LocalFreePrice  本次本店赠送金额.
 * @apiSuccess {Number} Data.listInfo.LocalFreeRealPrice  本店赠送剩余金额.
 * @apiSuccess {Number} Data.listInfo.GroupID  连锁店ID.
 * @apiSuccess {Number} Data.listInfo.CardNo  卡号.
 * @apiSuccess {Number} Data.listInfo.UserName  用户名.
 * @apiSuccess {Number} Data.listInfo.ShopTitle  店铺名称.
 * @apiSuccess {Number} Data.listInfo.Mobile  手机号.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  提示信息.
 */
export function getStoreTableDetailData (params) {
  const data = {
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    ShopID: params.ShopID,
    ShopTitle: params.ShopTitle,
    QueryShopID: params.QueryShopID,
    PageIndex: params.PageIndex,
    pageSize: params.pageSize
  }
  return request({
    url: '/Statistics/StoredDetailSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/DeductionSettlementSpec getPayMoneyTableData
 * @apiVersion 1.0.0
 * @apiName getPayMoneyTableData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  列表.
 * @apiSuccess {Number} Data.listInfo.ShopID  商户ID.
 * @apiSuccess {String} Data.listInfo.ShopTitle  商户名称.
 * @apiSuccess {String} Data.listInfo.StatDate  营业日期.
 * @apiSuccess {Number} Data.listInfo.FillPrice  充值实际金额.
 * @apiSuccess {Number} Data.listInfo.TotalFillPrice  充值总额.
 * @apiSuccess {Number} Data.listInfo.PayPrice  消费总额.
 * @apiSuccess {Number} Data.listInfo.RealPayPrice  消费实际总额.
 * @apiSuccess {Number} Data.listInfo.SalePrice  结算应收总额.
 * @apiSuccess {Number} Data.listInfo.RealPrice  结算实收总额.
 * @apiSuccess {Number} Data.listInfo.FreePrice  赠送总总额.
 * @apiSuccess {Number} Data.listInfo.TotalPrice  储值总额.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  提示信息.
 */
export function getPayMoneyTableData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/DeductionSettlementSpec',
    method: 'get',
    params: data
  })
}
export function getPayMoneyTableDetailData (params) {
  const data = {
    PageIndex: params.PageIndex,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    ShopID: params.ShopID,
    ShopTitle: params.ShopTitle,
    QueryShopID: params.QueryShopID
  }
  return request({
    url: '/Statistics/DeductionDetailSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/DeductionSettlementSpec getPayMoneyDetailData
 * @apiVersion 1.0.0
 * @apiName getPayMoneyDetailData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 当前店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 * @apiParam {Number} PageIndex 分页序号.
 * @apiParam {String} ShopTitle 店铺名称.
 * @apiParam {Number} QueryShopID 查询店铺id.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  会员卡消费表ID.
 * @apiSuccess {Number} Data.listInfo.UCardID  会员开卡记录ID，对应UCard_List的ID.
 * @apiSuccess {Number} Data.listInfo.ShopID  店铺ID.
 * @apiSuccess {Number} Data.listInfo.PayPrice  消费金额.
 * @apiSuccess {Number} Data.listInfo.CurMoney  剩余金额.
 * @apiSuccess {Number} Data.listInfo.AdminID  操作人ID.
 * @apiSuccess {String} Data.listInfo.AdminCode  操作人编号.
 * @apiSuccess {String} Data.listInfo.AddTime  消费时间.
 * @apiSuccess {String} Data.listInfo.AddDate  营业日.
 * @apiSuccess {Number} Data.listInfo.OrderLCardID  锁牌派发ID.
 * @apiSuccess {Number} Data.listInfo.channel  操作渠道.
 * @apiSuccess {Boolean} Data.listInfo.IsFullRefund  是否撤销.
 * @apiSuccess {Number} Data.listInfo.RealPayPrice  支付实际金额.
 * @apiSuccess {Number} Data.listInfo.FreePayPrice  支付赠送金额.
 * @apiSuccess {Number} Data.listInfo.RealPrice  剩余实际金额.
 * @apiSuccess {Number} Data.listInfo.FreeRealPrice  剩余赠送金额.
 * @apiSuccess {Number} Data.listInfo.RealRate  剩余本金金额比例.
 * @apiSuccess {String} Data.listInfo.CardNo  卡号.
 * @apiSuccess {String} Data.listInfo.UserName  用户名.
 * @apiSuccess {String} Data.listInfo.Mobile  手机号.
 * @apiSuccess {Object} Data.listInfo.PayShopTitle  消费门店（可能显示多个）.
 * @apiSuccess {Object} Data.listInfo.ShopTitle  店铺名称.
 * @apiSuccess {Object} Data.listInfo.AdminInfo  用户名.
 * @apiSuccess {Object} Data.listInfo.RealShopID  发卡门店.
 * @apiSuccess {Object} Data.listInfo.ShowName  收银员名字.
 * @apiSuccess {Object} Data.listInfo.UserCode  收银员代码.
 * @apiSuccess {Object} Data.listInfo.OrderCode  订单号.
 * @apiSuccess {Object} Data.listInfo.AddDateShortDateString  短日期.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getPayMoneyDetailData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    PageIndex: params.PageIndex,
    ShopTitle: params.ShopTitle,
    QueryShopID: params.QueryShopID,
    PageSize: params.PageSize
  }
  return request({
    url: '/Statistics/DeductionDetailSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/CreditStatisticsSpec getGuaZhangTableData
 * @apiVersion 1.0.0
 * @apiName getGuaZhangTableData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 *
 * @apiSuccess {Object} Data.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.ShopTitle  店铺名称.
 * @apiSuccess {String} Data.listInfo.StatDate  StatDate.
 * @apiSuccess {Number} Data.listInfo.CreditPrice  CreditPrice.
 * @apiSuccess {Number} Data.listInfo.DiscountPrice  DiscountPrice.
 * @apiSuccess {Number} Data.listInfo.PayPrice  PayPrice.
 * @apiSuccess {Number} Data.listInfo.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.SurPayPrice  SurPayPrice.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getGuaZhangTableData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/CreditStatisticsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Statistics/ShopSummarySpec getLoaclInvocingData
 * @apiVersion 1.0.0
 * @apiName getLoaclInvocingData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 * @apiParam {String} AddTime 添加日期.
 * @apiParam {Number} SearchTypeID 类型id.
 * @apiParam {Number} SearchTypeIDSubmit 搜索id.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  列表.
 * @apiSuccess {Number} Data.listInfo.RealShopID  RealShopID.
 * @apiSuccess {Number} Data.listInfo.LocalShopCost  本店总使用储值.
 * @apiSuccess {String} Data.listInfo.LocalULocalTotalCost  本店使用本店储值 --账面扣费.
 * @apiSuccess {String} Data.listInfo.LocalULocalRealCost  本店使用本店储值 --实扣本金.
 * @apiSuccess {Number} Data.listInfo.GetLocalTotalCost  本店应收总额  --账面应收.
 * @apiSuccess {Number} Data.listInfo.GetLocalRealCost  本店应收总额  --本金应收.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement  内层列表.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.RealShopID  RealShopID.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.OtherShopID  OtherShopID.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.OtherShopTitle  他店名称.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.LocalUOtherTotalCost  本店使用他店储值--账面扣费.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.LocalUOtherRealCost  本店使用他店储值--实扣本金.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.OtherULocalTotalCost  他店使用本店储值--账面扣费.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.OtherULocalRealCost  他店使用本店储值--实扣本金.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.LocalSettleOtherTotalCost  本店与他店结算金额--账面扣费.
 * @apiSuccess {Object[]} Data.listInfo.AllShopsSettlement.LocalSettleOtherRealCost  本店与他店结算金额--实扣本金.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getLoaclInvocingData (params) {
  const data = {
    ShopID: params.ShopID,
    AddTime: params.AddTime,
    SearchTypeID: params.SearchTypeID,
    SearchTypeIDSubmit: params.SearchTypeIDSubmit
  }
  return request({
    url: '/Statistics/ShopSummarySpec',
    method: 'post',
    data: data
  })
}
export function getInvalideShopList (params) {
  const data = {
  }
  return request({
    url: '/Statistics/getValideShopList',
    method: 'get',
    params: data
  })
}
export function exportLoaclInvocingData (params) {
  const data = {
    ShopID: params.ShopID,
    AddTime: params.AddTime,
    SearchTypeID: 0,
    SearchTypeIDSubmit: 0
  }
  return request({
    url: '/Statistics/ExportShopSummarySpec',
    method: 'post',
    data: data
  })
}
export function exportStoreInvocingData (params) {
  const data = {
    ShopID: params.ShopID,
    Date: params.Date
  }
  return request({
    url: '/Statistics/ExportStoredSettlementSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/CurrentStatisticsSpec getCurrentStatusData
 * @apiVersion 1.0.0
 * @apiName getCurrentStatusData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.TotalFreeMoney  TotalFreeMoney.
 * @apiSuccess {Object} Data.listInfo.OpenInfo  OpenInfo.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SaleCommPrice  SaleCommPrice.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AdminCode  AdminCode.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.AdminID  AdminID.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AddTime  AddTime.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.BillPrice  BillPrice.
 * @apiSuccess {Boolean} Data.listInfo.OpenInfo.IsBill  IsBill.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.CommUserDetailID  CommUserDetailID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.PayTypeID  PayTypeID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SaleID  SaleID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.PayPrice  PayPrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SalePrice  SalePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.FreePrice  FreePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SavePrice  SavePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.ShopID  ShopID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.UCardID  UCardID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.ID  ID.
 * @apiSuccess {String} Data.listInfo.OpenInfo.SaleCode  SaleCode.
 * @apiSuccess {Boolean} Data.listInfo.OpenInfo.IsFullRefund  IsFullRefund.
 * @apiSuccess {String} Data.listInfo.Address  Address.
 * @apiSuccess {Number} Data.listInfo.ClearMoney  ClearMoney.
 * @apiSuccess {String} Data.listInfo.Remark  Remark.
 * @apiSuccess {Boolean} Data.listInfo.IsNeedPassword  IsNeedPassword.
 * @apiSuccess {String} Data.listInfo.EndTime  EndTime.
 * @apiSuccess {Number} Data.listInfo.Score  Score.
 * @apiSuccess {Number} Data.listInfo.State  State.
 * @apiSuccess {String} Data.listInfo.LastPayTime  LastPayTime.
 * @apiSuccess {Number} Data.listInfo.CurMoney  CurMoney.
 * @apiSuccess {Number} Data.listInfo.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.UCardInfoGroupID  UCardInfoGroupID.
 * @apiSuccess {Number} Data.listInfo.CardNoCount  CardNoCount.
 * @apiSuccess {String} Data.listInfo.LastPayTimeStr  LastPayTimeStr.
 * @apiSuccess {Object} Data.listInfo.Closed  Closed.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardOpenID  UCardOpenID.
 * @apiSuccess {String} Data.listInfo.Closed.AdminName  AdminName.
 * @apiSuccess {Number} Data.listInfo.Closed.BackPrice  BackPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.PayRate  PayRate.
 * @apiSuccess {Number} Data.listInfo.Closed.PayPrice  PayPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.PayTypeID  PayTypeID.
 * @apiSuccess {Number} Data.listInfo.Closed.LocalFreeRealPrice  LocalFreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.RealShopID  RealShopID.
 * @apiSuccess {Number} Data.listInfo.Closed.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.Closed.FreeRealPrice  FreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.Realprice  Realprice.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardID  UCardID.
 * @apiSuccess {String} Data.listInfo.Closed.AdminCode  AdminCode.
 * @apiSuccess {String} Data.listInfo.Closed.Remark  Remark.
 * @apiSuccess {Number} Data.listInfo.Closed.ClosedMoney  ClosedMoney.
 * @apiSuccess {Number} Data.listInfo.Closed.ClosedType  ClosedType.
 * @apiSuccess {String} Data.listInfo.Closed.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.Closed.AddTime  AddTime.
 * @apiSuccess {String} Data.listInfo.Closed.UserName  UserName.
 * @apiSuccess {String} Data.listInfo.Closed.Mobile  Mobile.
 * @apiSuccess {String} Data.listInfo.Closed.CardNo  CardNo.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardType  UCardType.
 * @apiSuccess {Number} Data.listInfo.Closed.ShopID  ShopID.
 * @apiSuccess {Number} Data.listInfo.Closed.ID  ID.
 * @apiSuccess {Number} Data.listInfo.Closed.AdminID  AdminID.
 * @apiSuccess {String} Data.listInfo.Closed.MappingCode  MappingCode. *
 * @apiSuccess {Number} Data.listInfo.FreeRealPrice  FreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.TotalMoney  TotalMoney.
 * @apiSuccess {Boolean} Data.listInfo.IsFingerPrint  IsFingerPrint.
 * @apiSuccess {String} Data.listInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.IDCard  IDCard.
 * @apiSuccess {String} Data.listInfo.Email  Email.
 * @apiSuccess {String} Data.listInfo.Birthday  Birthday.
 * @apiSuccess {Number} Data.listInfo.Sex  Sex.
 * @apiSuccess {String} Data.listInfo.Mobile  Mobile.
 * @apiSuccess {String} Data.listInfo.UserName  UserName.
 * @apiSuccess {String} Data.listInfo.Password  Password.
 * @apiSuccess {String} Data.listInfo.CardNo  CardNo.
 * @apiSuccess {Number} Data.listInfo.UCardType  UCardType.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.RealPrice  RealPrice.
 * @apiSuccess {String} Data.listInfo.MappingCode  MappingCode. *
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getCurrentStatusData (params) {
  const data = {
    ShopID: params.ShopID
  }
  return request({
    url: '/Statistics/CurrentStatisticsSpec',
    method: 'get',
    params: data
  })
}
export function ExportCurrentStatusData (params) {
  const data = {
    ShopID: params.ShopID
  }
  return request({
    url: '/Statistics/ExportCurrentStatisticsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/ChangeStatisticsSpec getChangeStatusData
 * @apiVersion 1.0.0
 * @apiName getChangeStatusData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 店铺id.
 * @apiParam {Number} BeginDate BeginDate.
 * @apiParam {Number} EndDate EndDate.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.TotalFreeMoney  TotalFreeMoney.
 * @apiSuccess {Object} Data.listInfo.OpenInfo  OpenInfo.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SaleCommPrice  SaleCommPrice.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AdminCode  AdminCode.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.AdminID  AdminID.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.OpenInfo.AddTime  AddTime.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.BillPrice  BillPrice.
 * @apiSuccess {Boolean} Data.listInfo.OpenInfo.IsBill  IsBill.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.CommUserDetailID  CommUserDetailID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.PayTypeID  PayTypeID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SaleID  SaleID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.PayPrice  PayPrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SalePrice  SalePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.FreePrice  FreePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.SavePrice  SavePrice.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.ShopID  ShopID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.UCardID  UCardID.
 * @apiSuccess {Number} Data.listInfo.OpenInfo.ID  ID.
 * @apiSuccess {String} Data.listInfo.OpenInfo.SaleCode  SaleCode.
 * @apiSuccess {Boolean} Data.listInfo.OpenInfo.IsFullRefund  IsFullRefund.
 * @apiSuccess {String} Data.listInfo.Address  Address.
 * @apiSuccess {Number} Data.listInfo.ClearMoney  ClearMoney.
 * @apiSuccess {String} Data.listInfo.Remark  Remark.
 * @apiSuccess {Boolean} Data.listInfo.IsNeedPassword  IsNeedPassword.
 * @apiSuccess {String} Data.listInfo.EndTime  EndTime.
 * @apiSuccess {Number} Data.listInfo.Score  Score.
 * @apiSuccess {Number} Data.listInfo.State  State.
 * @apiSuccess {String} Data.listInfo.LastPayTime  LastPayTime.
 * @apiSuccess {Number} Data.listInfo.CurMoney  CurMoney.
 * @apiSuccess {Number} Data.listInfo.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.UCardInfoGroupID  UCardInfoGroupID.
 * @apiSuccess {Number} Data.listInfo.CardNoCount  CardNoCount.
 * @apiSuccess {String} Data.listInfo.LastPayTimeStr  LastPayTimeStr.
 * @apiSuccess {Object} Data.listInfo.Closed  Closed.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardOpenID  UCardOpenID.
 * @apiSuccess {String} Data.listInfo.Closed.AdminName  AdminName.
 * @apiSuccess {Number} Data.listInfo.Closed.BackPrice  BackPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.PayRate  PayRate.
 * @apiSuccess {Number} Data.listInfo.Closed.PayPrice  PayPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.PayTypeID  PayTypeID.
 * @apiSuccess {Number} Data.listInfo.Closed.LocalFreeRealPrice  LocalFreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.RealShopID  RealShopID.
 * @apiSuccess {Number} Data.listInfo.Closed.GroupID  GroupID.
 * @apiSuccess {Number} Data.listInfo.Closed.FreeRealPrice  FreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.Closed.Realprice  Realprice.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardID  UCardID.
 * @apiSuccess {String} Data.listInfo.Closed.AdminCode  AdminCode.
 * @apiSuccess {String} Data.listInfo.Closed.Remark  Remark.
 * @apiSuccess {Number} Data.listInfo.Closed.ClosedMoney  ClosedMoney.
 * @apiSuccess {Number} Data.listInfo.Closed.ClosedType  ClosedType.
 * @apiSuccess {String} Data.listInfo.Closed.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.Closed.AddTime  AddTime.
 * @apiSuccess {String} Data.listInfo.Closed.UserName  UserName.
 * @apiSuccess {String} Data.listInfo.Closed.Mobile  Mobile.
 * @apiSuccess {String} Data.listInfo.Closed.CardNo  CardNo.
 * @apiSuccess {Number} Data.listInfo.Closed.UCardType  UCardType.
 * @apiSuccess {Number} Data.listInfo.Closed.ShopID  ShopID.
 * @apiSuccess {Number} Data.listInfo.Closed.ID  ID.
 * @apiSuccess {Number} Data.listInfo.Closed.AdminID  AdminID.
 * @apiSuccess {String} Data.listInfo.Closed.MappingCode  MappingCode. *
 * @apiSuccess {Number} Data.listInfo.FreeRealPrice  FreeRealPrice.
 * @apiSuccess {Number} Data.listInfo.TotalMoney  TotalMoney.
 * @apiSuccess {Boolean} Data.listInfo.IsFingerPrint  IsFingerPrint.
 * @apiSuccess {String} Data.listInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.IDCard  IDCard.
 * @apiSuccess {String} Data.listInfo.Email  Email.
 * @apiSuccess {String} Data.listInfo.Birthday  Birthday.
 * @apiSuccess {Number} Data.listInfo.Sex  Sex.
 * @apiSuccess {String} Data.listInfo.Mobile  Mobile.
 * @apiSuccess {String} Data.listInfo.UserName  UserName.
 * @apiSuccess {String} Data.listInfo.Password  Password.
 * @apiSuccess {String} Data.listInfo.CardNo  CardNo.
 * @apiSuccess {Number} Data.listInfo.UCardType  UCardType.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.RealPrice  RealPrice.
 * @apiSuccess {String} Data.listInfo.MappingCode  MappingCode. *
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getChangeStatusData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ChangeStatisticsSpec',
    method: 'get',
    params: data
  })
}
export function ExportChangeStatusData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ExportChangeStatisticsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Statistics/ProgramStatisticsSpec getProjStatisiticData
 * @apiVersion 1.0.0
 * @apiName getProjStatisiticData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 当前店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 * @apiParam {Number} PageIndex 分页序号.
 *
 * @apiSuccess {Object} Data.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.PageIndex  PageIndex.
 * @apiSuccess {Number} Data.PageSize  PageSize.
 * @apiSuccess {Number} Data.PageTotal  PageTotal.
 * @apiSuccess {String} Data.listInfo.ServiceTypeTitle  项目类型名称.
 * @apiSuccess {String} Data.listInfo.ServiceTitle  项目名.
 * @apiSuccess {String} Data.listInfo.ServiceCode  项目编号.
 * @apiSuccess {Number} Data.listInfo.Num  Num.
 * @apiSuccess {Number} Data.listInfo.SalePrice  SalePrice.
 * @apiSuccess {Number} Data.listInfo.RealPrice  RealPrice.
 * @apiSuccess {String} Data.listInfo.StatDate  StatDate.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.ShopTitle  商户名称.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getProjStatisiticData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    PageIndex: params.PageIndex
  }
  return request({
    url: '/Statistics/ProgramStatisticsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Statistics/ClockStatisticsSpec getClockStatisticData
 * @apiVersion 1.0.0
 * @apiName getClockStatisticData
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID 当前店铺id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 截止日期.
 *
 * @apiSuccess {Object} Data.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.ShopName  ShopName.
 * @apiSuccess {Number} Data.listInfo.TotalNum  TotalNum.
 * @apiSuccess {Number} Data.listInfo.SelectNum  SelectNum.
 * @apiSuccess {Number} Data.listInfo.OrderNum  OrderNum.
 * @apiSuccess {Number} Data.listInfo.AppointNum  AppointNum.
 * @apiSuccess {Number} Data.listInfo.CallNum  CallNum.
 * @apiSuccess {Number} Data.listInfo.AddNum  AddNum.
 * @apiSuccess {Number} Data.listInfo.BuyNum  BuyNum.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getClockStatisticData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ClockStatisticsSpec',
    method: 'post',
    data: data
  })
}
export function exportClockStatisticData (params) {
  const data = {
    ShopID: params.ShopID,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate
  }
  return request({
    url: '/Statistics/ExportClockStatisticsSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /SystemLog/IndexSpec getOperationLogData
 * @apiVersion 1.0.0
 * @apiName getOperationLogData
 * @apiGroup Data
 *
 * @apiParam {Number} [PowerClassID] 权限组id.
 * @apiParam {Number} [PowerItemID] 权限项目id.
 * @apiParam {String} BeginDate 开始日期.
 * @apiParam {String} EndDate 结束日期.
 * @apiParam {String} AdminName 管理员名称.
 * @apiParam {String} LogType 日志类型.
 * @apiParam {Number} LogCode 日志吗.
 * @apiParam {String} LogTypeName 日志类型名称.
 * @apiParam {String} LogName 日志名.
 * @apiParam {String} PageSize 分页尺寸.
 * @apiParam {String} PageIndex 分页序号.
 *
 * @apiSuccess {Object} Data.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  系统ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  总店ID.
 * @apiSuccess {Bool} Data.listInfo.ResultCode  操作是否成功.
 * @apiSuccess {Number} Data.listInfo.LogTypeCode  日志类别唯一标识.
 * @apiSuccess {String} Data.listInfo.Action  操作类型.
 * @apiSuccess {String} Data.listInfo.AdminName  日志标题.
 * @apiSuccess {String} Data.listInfo.Content  日志内容.
 * @apiSuccess {Number} Data.listInfo.AdminID  创建管理员ID.
 * @apiSuccess {Number} Data.listInfo.IP  IP地址.
 * @apiSuccess {String} Data.listInfo.AddTime  创建时间.
 * @apiSuccess {Number} Data.listInfo.PowerItemID  PowerItemID.
 * @apiSuccess {Number} Data.listInfo.PowerClassID  PowerClassID.
 * @apiSuccess {String} Data.listInfo.LogTypeName  LogTypeName.
 * @apiSuccess {String} Data.listInfo.LogName  LogName.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getOperationLogData (params) {
  const data = {
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    AdminName: params.AdminName,
    LogType: params.LogType,
    LogCode: params.LogCode,
    LogTypeName: params.LogTypeName,
    LogName: params.LogName,
    PageSize: params.PageSize,
    PageIndex: params.PageIndex
  }
  return request({
    url: '/SystemLog/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Statistics/ShopSmrDetailSpec getInvoicingStoreDetailInfo
 * @apiVersion 1.0.0
 * @apiName getInvoicingStoreDetailInfo
 * @apiGroup Data
 *
 * @apiParam {Number} ShopID ShopID.
 * @apiParam {String} AddTime AddTime.
 * @apiParam {Number} SearchTypeID SearchTypeID.
 * @apiParam {Number} SearchTypeIDSubmit SearchTypeIDSubmit.
 * @apiParam {Number} PageSize 分页尺寸.
 * @apiParam {Number} PageIndex 分页序号.
 *
 * @apiSuccess {Object} Data.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  系统ID.
 * @apiSuccess {Number} Data.listInfo.CardNo  CardNo.
 * @apiSuccess {Bool} Data.listInfo.RealShopID  RealShopID.
 * @apiSuccess {Number} Data.listInfo.PayShopID  PayShopID.
 * @apiSuccess {String} Data.listInfo.FillShopID  FillShopID.
 * @apiSuccess {String} Data.listInfo.RealShopTitle  RealShopTitle.
 * @apiSuccess {String} Data.listInfo.PayShopTitle  PayShopTitle.
 * @apiSuccess {Number} Data.listInfo.FillShopTitle  FillShopTitle.
 * @apiSuccess {Number} Data.listInfo.OrderCode  OrderCode.
 * @apiSuccess {String} Data.listInfo.TotalCost  TotalCost.
 * @apiSuccess {Number} Data.listInfo.RealCost  RealCost.
 * @apiSuccess {Number} Data.listInfo.FreeMoney  FreeMoney.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {String} Data.listInfo.IsOver  IsOver.
 * @apiSuccess {String} Data.listInfo.ReqSource  ReqSource.
 * @apiSuccess {String} Data.listInfo.Note  Note.
 * @apiSuccess {Number} Data.PageIndex  PageIndex.
 * @apiSuccess {Number} Data.PageIndex  PageIndex.
 * @apiSuccess {Number} Data.PageSize  PageSize.
 * @apiSuccess {Number} Data.PageTotal  PageTotal.
 * @apiSuccess {Number} RetCode  return data RetCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getInvoicingStoreDetailInfo (params) {
  const data = {
    ShopID: params.ShopID,
    AddTime: params.AddTime,
    SearchTypeID: params.SearchTypeID,
    SearchTypeIDSubmit: params.SearchTypeIDSubmit,
    PageSize: params.PageSize,
    PageIndex: params.PageIndex
  }
  return request({
    url: '/Statistics/ShopSmrDetailSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /User/MyInfoSpec getLogTypeList
 * @apiVersion 1.0.0
 * @apiName getLogTypeList
 * @apiGroup Data
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  listInfo.
 * @apiSuccess {String} Data.listInfo.Title  Title.
 * @apiSuccess {String} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.Type  Type.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getLogTypeList (params) {
  const data = {}
  return request({
    url: '/SystemLog/GetPowerClassSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /User/MyInfoSpec getLogItemData
 * @apiVersion 1.0.0
 * @apiName getLogItemData
 * @apiGroup Data
 *
 * @apiParam {Number} powerClassID 权限组id.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  listInfo.
 * @apiSuccess {String} Data.listInfo.Title  Title.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.OrderNo  OrderNo.
 * @apiSuccess {String} Data.listInfo.Keywords  Keywords.
 * @apiSuccess {Number} Data.listInfo.PowerClassID  PowerClassID.
 * @apiSuccess {String} Data.listInfo.Url  Url.
 * @apiSuccess {Number} Data.listInfo.State  State.
 * @apiSuccess {Number} Data.listInfo.AdminID  AdminID.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {Boolean} Data.listInfo.IsShow  IsShow.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getLogItemData (params) {
  const data = {
    powerClassID: params.powerClassID
  }
  return request({
    url: '/SystemLog/GetPowerItemSpec',
    method: 'get',
    params: data
  })
}
export function getUpgradedCardDetail (params) {
  const data = {
    CardNo: params.CardNo,
    ShopID: params.ShopID,
    BatchNo: params.BatchNo,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize
  }
  return request({
    url: 'UCard/Upgrade/UpgradedCardLogDetailSpec',
    method: 'post',
    data: data
  })
}
export function getAllShopList (params) {
  const data = {}
  return request({
    url: '/Shop/GroupShopList',
    method: 'get',
    params: data
  })
}
export function getShopToken (params) {
  const data = {
    shopId: params.shopId
  }
  return request({
    url: '/Shop/GetShopTmpToken',
    method: 'get',
    params: data
  })
}
