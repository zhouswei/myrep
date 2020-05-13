import request from '@/utils/request'
/**
 * @api {get} /User/MyInfoSpec getEnterpriseInfo
 * @apiVersion 1.0.0
 * @apiName getEnterpriseInfo
 * @apiGroup Setting
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getEnterpriseInfo () {
  const data = {
  }
  return request({
    url: '/User/MyInfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /User/MyInfoSaveSpec postSaveEnterpriseInfo
 * @apiVersion 1.0.0
 * @apiName postSaveEnterpriseInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID 总店Id.
 * @apiParam {String} Title 店铺名称.
 * @apiParam {String} AddTime 店铺创建时间.
 * @apiParam {String} GroupCode 店铺编号.
 * @apiParam {String} Manager 管理员.
 * @apiParam {String} GroupCode 店铺编号.
 * @apiParam {String} Phone 手机.
 * @apiParam {String} Tel 座机.
 * @apiParam {String} Email Email.
 * @apiParam {String} Province 省份.
 * @apiParam {String} City 城市.
 * @apiParam {String} Area 区域.
 * @apiParam {String} Address 详细地址.
 * @apiParam {Number} X 经度.
 * @apiParam {Number} Y 纬度.
 * @apiParam {Number} ShopMax 店铺最大数量.
 * @apiParam {Number} ShopCurrent 店铺已有数量.
 * @apiParam {Number} SMSMax 短信最大条数.
 * @apiParam {Number} State 店铺状态.
 * @apiParam {Number} AdminId AdminId.
 * @apiParam {String} ServiceStartDate 服务开始时间.
 * @apiParam {String} ServiceEndDate 服务结束时间.
 * @apiParam {String} Pic 图片.
 * @apiParam {Number} Space 空间数.
 * @apiParam {Number} ShopIndustry ShopIndustry.
 * @apiParam {Number} VersionLevel VersionLevel.
 * @apiParam {String} ModifyTime 修改时间.
 * @apiParam {Boolean} IsDelete 是否修改.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function postSaveEnterpriseInfo (params) {
  const data = {
    ID: params.ID,
    Title: params.Title,
    AddTime: params.AddTime,
    GroupCode: params.GroupCode,
    Manager: params.Manager,
    Phone: params.Phone,
    Tel: params.Tel,
    Email: params.Email,
    Province: params.Province,
    City: params.City,
    Area: params.Area,
    Address: params.Address,
    X: params.X,
    Y: params.Y,
    ShopMax: params.ShopMax,
    ShopCurrent: params.ShopCurrent,
    SMSMax: params.SMSMax,
    State: params.State,
    AdminId: params.AdminId,
    ServiceStartDate: params.ServiceStartDate,
    ServiceEndDate: params.ServiceEndDate,
    Pic: params.Pic,
    Space: params.Space,
    ShopIndustry: params.ShopIndustry,
    VersionLevel: params.VersionLevel,
    ModifyTime: params.ModifyTime,
    IsDelete: params.IsDelete
  }
  return request({
    url: '/User/MyInfoSaveSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /User/IndexSpec getUserListInfo
 * @apiVersion 1.0.0
 * @apiName getUserListInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} Name 名称.
 * @apiParam {String} State 店铺状态.
 * @apiParam {Number} PageIndex 分页序号.
 * @apiParam {Number} PageSize 分页长度.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ID  return data listInfo ID.
 * @apiSuccess {String} Data.listInfo.Account  return data listInfo Account.
 * @apiSuccess {String} Data.listInfo.ShowName  return data listInfo ShowName.
 * @apiSuccess {String} Data.listInfo.AddDate  return data listInfo AddDate.
 * @apiSuccess {String} Data.listInfo.AddTime  return data listInfo AddTime.
 * @apiSuccess {Number} Data.listInfo.AdminID  return data listInfo AdminID.
 * @apiSuccess {String} Data.listInfo.Password  return data listInfo Password.
 * @apiSuccess {Number} Data.listInfo.State  return data listInfo State.
 * @apiSuccess {String} Data.listInfo.LastLoginIP  return data listInfo LastLoginIP.
 * @apiSuccess {String} Data.listInfo.LastLoginTime  return data listInfo LastLoginTime.
 * @apiSuccess {String} Data.listInfo.UserCode  return data listInfo UserCode.
 * @apiSuccess {Number} Data.listInfo.GroupID  return data listInfo GroupID.
 * @apiSuccess {String} Data.listInfo.Address  return data listInfo Address.
 * @apiSuccess {Number} Data.listInfo.DepartmentID  return data listInfo DepartmentID.
 * @apiSuccess {Number} Data.listInfo.RegWay  return data listInfo RegWay.
 * @apiSuccess {String} Data.listInfo.DepartmentTitle  return data listInfo DepartmentTitle.
 * @apiSuccess {Number} Data.listInfo.RoleID  return data listInfo RoleID.
 * @apiSuccess {String} Data.listInfo.RoleTitle  return data listInfo RoleTitle.
 * @apiSuccess {Number} Data.listInfo.Sex  return data listInfo Sex.
 * @apiSuccess {String} Data.listInfo.Origin  return data listInfo Origin.
 * @apiSuccess {String} Data.listInfo.Birthday  return data listInfo Birthday.
 * @apiSuccess {String} Data.listInfo.Pic  return data listInfo Pic.
 * @apiSuccess {Number} Data.PageIndex  return data PageIndex.
 * @apiSuccess {Number} Data.PageSize  return data PageSize.
 * @apiSuccess {Number} Data.PageTotal  return data PageTotal.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getUserListInfo (params) {
  const data = {
    Name: params.Name,
    State: params.State,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/User/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /User/CreateSpec AddUserInfo
 * @apiVersion 1.0.0
 * @apiName AddUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID 名称.
 * @apiParam {String} Account  Account.
 * @apiParam {String} ShowName  ShowName.
 * @apiParam {String} AddDate  AddDate.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} Password  Password.
 * @apiParam {Number} State  State.
 * @apiParam {String} LastLoginIP  LastLoginIP.
 * @apiParam {String} LastLoginTime  LastLoginTime.
 * @apiParam {String} UserCode  UserCode.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {String} Address  Address.
 * @apiParam {Number} DepartmentID  DepartmentID.
 * @apiParam {Number} RegWay  RegWay.
 * @apiParam {String} DepartmentTitle  DepartmentTitle.
 * @apiParam {Number} RoleID  RoleID.
 * @apiParam {String} RoleTitle  RoleTitle.
 * @apiParam {Number} Sex  Sex.
 * @apiParam {String} Origin  Origin.
 * @apiParam {String} Birthday  Birthday.
 * @apiParam {String} Pic  Pic.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddUserInfo (params) {
  const data = {
    ID: params.ID,
    Account: params.Account,
    AddDate: params.AddDate,
    AddTime: params.AddTime,
    AdminID: params.AdminID,
    Password: params.Password,
    State: params.State,
    LastLoginIP: params.LastLoginIP,
    LastLoginTime: params.LastLoginTime,
    UserCode: params.UserCode,
    GroupID: params.GroupID,
    Address: params.Address,
    DepartmentID: params.DepartmentID,
    RegWay: params.RegWay,
    DepartmentTitle: params.DepartmentTitle,
    RoleID: params.RoleID,
    RoleTitle: params.RoleTitle,
    Sex: params.Sex,
    Origin: params.Origin,
    Birthday: params.Birthday,
    Pic: params.Pic,
    ShowName: params.ShowName
  }
  return request({
    url: '/User/CreateSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /User/CreateSpec AddUserInfo
 * @apiVersion 1.0.0
 * @apiName AddUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} departmentID 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetRoles (params) {
  const data = {
    departmentID: params.departmentID
  }
  return request({
    url: '/User/GetRolesSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /User/CreateSpec AddUserInfo
 * @apiVersion 1.0.0
 * @apiName AddUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} departmentID 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetRolePowers (params) {
  const data = {
    ID: params.ID
  }
  return request({
    url: '/Role/PowerSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /User/CreateSpec AddUserInfo
 * @apiVersion 1.0.0
 * @apiName AddUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} departmentID 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetUserPowers (params) {
  const data = {
    ID: params.ID
  }
  return request({
    url: '/User/PowerSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /User/EditSpec ChangeUserInfo
 * @apiVersion 1.0.0
 * @apiName ChangeUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID 名称.
 * @apiParam {String} Account  Account.
 * @apiParam {String} ShowName  ShowName.
 * @apiParam {String} AddDate  AddDate.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} Password  Password.
 * @apiParam {Number} State  State.
 * @apiParam {String} LastLoginIP  LastLoginIP.
 * @apiParam {String} LastLoginTime  LastLoginTime.
 * @apiParam {String} UserCode  UserCode.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {String} Address  Address.
 * @apiParam {Number} DepartmentID  DepartmentID.
 * @apiParam {Number} RegWay  RegWay.
 * @apiParam {String} DepartmentTitle  DepartmentTitle.
 * @apiParam {Number} RoleID  RoleID.
 * @apiParam {String} RoleTitle  RoleTitle.
 * @apiParam {Number} Sex  Sex.
 * @apiParam {String} Origin  Origin.
 * @apiParam {String} Birthday  Birthday.
 * @apiParam {String} Pic  Pic.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function ChangeUserInfo (params) {
  const data = {
    ID: params.ID,
    Account: params.Account,
    AddDate: params.AddDate,
    AddTime: params.AddTime,
    AdminID: params.AdminID,
    Password: params.Password,
    ShowName: params.ShowName,
    State: params.State,
    LastLoginIP: params.LastLoginIP,
    LastLoginTime: params.LastLoginTime,
    UserCode: params.UserCode,
    GroupID: params.GroupID,
    Address: params.Address,
    DepartmentID: params.DepartmentID,
    RegWay: params.RegWay,
    DepartmentTitle: params.DepartmentTitle,
    RoleID: params.RoleID,
    RoleTitle: params.RoleTitle,
    Sex: params.Sex,
    Origin: params.Origin,
    Birthday: params.Birthday,
    Pic: params.Pic
  }
  return request({
    url: '/User/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /User/DeleteSpec deleteUserInfo
 * @apiVersion 1.0.0
 * @apiName deleteUserInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteUserInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/User/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /User/DeleteSpec deleteUserInfo
 * @apiVersion 1.0.0
 * @apiName deleteUserInfo
 * @apiGroup Setting
 *
 * @apiParam {String} account account.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function GetUserInfo (params) {
  const data = {
    account: params.account
  }
  return request({
    url: '/user/info',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Role/IndexSpec getRoleListInfo
 * @apiVersion 1.0.0
 * @apiName getRoleListInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} PageIndex PageIndex.
 * @apiParam {Number} PageSize PageSize.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ID  return data listInfo ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  return data listInfo GroupID.
 * @apiSuccess {Number} Data.listInfo.DepartmentID  return data listInfo DepartmentID.
 * @apiSuccess {String} Data.listInfo.DepartmentName  return data listInfo DepartmentName.
 * @apiSuccess {String} Data.listInfo.Title  return data listInfo Title.
 * @apiSuccess {String} Data.listInfo.Remark  return data listInfo Remark.
 * @apiSuccess {String} Data.listInfo.AddTime  return data listInfo AddTime.
 * @apiSuccess {Number} Data.listInfo.AdminID  return data listInfo AdminID.
 * @apiSuccess {Number} Data.listInfo.State  return data listInfo State.
 * @apiSuccess {Number} Data.listInfo.ModifyAdminID  return data listInfo ModifyAdminID.
 * @apiSuccess {String} Data.listInfo.ModifyTime  return data listInfo ModifyTime.
 * @apiSuccess {String} Data.listInfo.IDStr  return data listInfo IDStr.
 * @apiSuccess {Number} Data.PageIndex  return data PageIndex.
 * @apiSuccess {Number} Data.PageSize  return data PageSize.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getRoleListInfo (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/Role/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /User/EditSpec changeRoleInfo
 * @apiVersion 1.0.0
 * @apiName changeRoleInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID   ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {Number} DepartmentID   DepartmentID.
 * @apiParam {String} DepartmentName   DepartmentName.
 * @apiParam {String} Title  Title.
 * @apiParam {String} Remark  Remark.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {Number} State  State.
 * @apiParam {Number} ModifyAdminID  ModifyAdminID.
 * @apiParam {String} ModifyTime  ModifyTime.
 * @apiParam {String} IDStr  IDStr.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function changeRoleInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    DepartmentID: params.DepartmentID,
    DepartmentName: params.DepartmentName,
    Title: params.Title,
    Remark: params.Remark,
    AddTime: params.AddTime,
    AdminID: params.AdminID,
    State: params.State,
    ModifyAdminID: params.ModifyAdminID,
    ModifyTime: params.ModifyTime,
    IDStr: params.IDStr
  }
  return request({
    url: '/Role/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Role/DeleteSpec deleteRoleInfo
 * @apiVersion 1.0.0
 * @apiName deleteRoleInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteRoleInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Role/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /User/CreateSpec AddRoleInfo
 * @apiVersion 1.0.0
 * @apiName AddRoleInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID   ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {Number} DepartmentID   DepartmentID.
 * @apiParam {String} DepartmentName   DepartmentName.
 * @apiParam {String} Title  Title.
 * @apiParam {String} Remark  Remark.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {Number} State  State.
 * @apiParam {Number} ModifyAdminID  ModifyAdminID.
 * @apiParam {String} ModifyTime  ModifyTime.
 * @apiParam {String} IDStr  IDStr.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddRoleInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    DepartmentID: params.DepartmentID,
    DepartmentName: params.DepartmentName,
    Title: params.Title,
    Remark: params.Remark,
    AddTime: params.AddTime,
    AdminID: params.AdminID,
    State: params.State,
    ModifyAdminID: params.ModifyAdminID,
    ModifyTime: params.ModifyTime,
    IDStr: params.IDStr
  }
  return request({
    url: '/Role/CreateSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /User/CreateSpec AddRoleInfo
 * @apiVersion 1.0.0
 * @apiName AddRoleInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID   ID.
 * @apiParam {Number} PageIndex  PageIndex.
 * @apiParam {Number} PageSize  PageSize.
 * @apiParam {Number} ShopCode   ShopCode.
 * @apiParam {String} ShopName   ShopName.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getShopsList (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    ShopCode: params.ShopCode,
    ShopName: params.ShopName
  }
  return request({
    url: '/Role/ShopsPageSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /UCardInfo/IndexSpec getUCardListInfo
 * @apiVersion 1.0.0
 * @apiName getUCardListInfo
 * @apiGroup Setting
 *
 * @apiParam {string} Title Title.
 * @apiParam {String} CardNo CardNo.
 * @apiParam {String} Mobile Mobile.
 * @apiParam {Number} UcardType UcardType.
 * @apiParam {Number} ShopID ShopID.
 * @apiParam {Number} IsPageClick IsPageClick.
 * @apiParam {String} BeginTime BeginTime.
 * @apiParam {String} EndTime EndTime.
 * @apiParam {Number} PageIndex 分页序号.
 * @apiParam {Number} PageSize 分页长度.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ID  return data listInfo ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  return data listInfo GroupID.
 * @apiSuccess {String} Data.listInfo.Title  return data listInfo Title.
 * @apiSuccess {Number} Data.listInfo.SavePrice  return data listInfo SavePrice.
 * @apiSuccess {Number} Data.listInfo.SalePrice  return data listInfo SalePrice.
 * @apiSuccess {Boolean} Data.listInfo.IsScore  return data listInfo IsScore.
 * @apiSuccess {Boolean} Data.listInfo.IsAllowPay  return data listInfo IsAllowPay.
 * @apiSuccess {Number} Data.listInfo.ActiveMonth  return data listInfo ActiveMonth.
 * @apiSuccess {String} Data.listInfo.AddDate  return data listInfo AddDate.
 * @apiSuccess {Number} Data.listInfo.AdminID  return data listInfo AdminID.
 * @apiSuccess {String} Data.listInfo.AdminCode  return data listInfo AdminCode.
 * @apiSuccess {String} Data.listInfo.AdminName  return data listInfo AdminName.
 * @apiSuccess {Number} Data.listInfo.Discount  return data listInfo Discount.
 * @apiSuccess {Boolean} Data.listInfo.IsClose  return data listInfo IsClose.
 * @apiSuccess {Number} Data.listInfo.SaleComm  return data listInfo SaleComm.
 * @apiSuccess {Number} Data.listInfo.SaleCommType  return data listInfo SaleCommType.
 * @apiSuccess {Number} Data.listInfo.FillComm  return data listInfo FillComm.
 * @apiSuccess {Number} Data.listInfo.FillCommType  return data listInfo FillCommType.
 * @apiSuccess {Number} Data.listInfo.OrderNo  return data listInfo OrderNo.
 * @apiSuccess {Number} Data.listInfo.UCardFillScore  return data listInfo UCardFillScore.
 * @apiSuccess {Number} Data.listInfo.UCardPayScore  return data listInfo UCardPayScore.
 * @apiSuccess {String} Data.listInfo.IDStr  return data listInfo IDStr.
 * @apiSuccess {String} Data.listInfo.sendShopIDs  return data listInfo sendShopIDs.
 * @apiSuccess {String} Data.listInfo.useShopIDs  return data listInfo useShopIDs.
 * @apiSuccess {Number} Data.listInfo.UCardInfoGroupID  return data listInfo UCardInfoGroupID.
 * @apiSuccess {String} Data.listInfo.CanUseShops  return data listInfo CanUseShops.
 * @apiSuccess {String} Data.listInfo.CanSendShops  return data listInfo CanSendShops.
 * @apiSuccess {Number} Data.PageIndex  return data PageIndex.
 * @apiSuccess {Number} Data.PageSize  return data PageSize.
 * @apiSuccess {Number} Data.PageTotal  return data PageTotal.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getUCardListInfo (params) {
  const data = {
    Title: params.Title,
    CardNo: params.CardNo,
    Mobile: params.Mobile,
    UcardType: params.UcardType,
    ShopID: params.ShopID,
    IsPageClick: params.IsPageClick,
    BeginTime: params.BeginTime,
    EndTime: params.EndTime,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/UCardInfo/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /UCardInfo/IndexSpec getUCardListInfo
 * @apiVersion 1.0.0
 * @apiName getUCardListInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id id.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object} Data.info  return data info.
 * @apiSuccess {Number} Data.info.ID  return data info ID.
 * @apiSuccess {String} Data.info.Title  return data info Title.
 * @apiSuccess {Number} Data.info.SavePrice  return data info SavePrice.
 * @apiSuccess {Number} Data.info.SalePrice  return data info SalePrice.
 * @apiSuccess {Boolean} Data.info.IsScore  return data info IsScore.
 * @apiSuccess {Boolean} Data.info.IsAllowPay  return data info IsAllowPay.
 * @apiSuccess {Number} Data.info.ActiveMonth  return data info ActiveMonth.
 * @apiSuccess {String} Data.info.AddDate  return data info AddDate.
 * @apiSuccess {Number} Data.info.AdminID  return data info AdminID.
 * @apiSuccess {Number} Data.info.AdminCode  return data info AdminCode.
 * @apiSuccess {String} Data.info.AdminName  return data info AdminName.
 * @apiSuccess {Number} Data.info.Discount  return data info Discount.
 * @apiSuccess {Boolean} Data.info.IsClose  return data info IsClose.
 * @apiSuccess {Number} Data.info.SaleComm  return data info SaleComm.
 * @apiSuccess {Number} Data.info.SaleCommType  return data info SaleCommType.
 * @apiSuccess {Number} Data.info.FillComm  return data info FillComm.
 * @apiSuccess {Number} Data.info.FillCommType  return data info FillCommType.
 * @apiSuccess {Number} Data.info.OrderNo  return data info OrderNo.
 * @apiSuccess {Number} Data.info.UCardFillScore  return data info UCardFillScore.
 * @apiSuccess {Number} Data.info.UCardPayScore  return data info UCardPayScore.
 * @apiSuccess {String} Data.info.sendShopIDs  return data info sendShopIDs.
 * @apiSuccess {String} Data.info.useShopIDs  return data info useShopIDs.
 * @apiSuccess {Number} Data.info.UCardInfoGroupID  return data info UCardInfoGroupID.
 * @apiSuccess {Boolean} Data.info.CanUseShops  return data info CanUseShops.
 * @apiSuccess {Boolean} Data.info.CanSendShops  return data info CanSendShops.
 * @apiSuccess {String} Data.info.IDStr  return data info IDStr.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getUCardInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/UCardInfo/CardCheckSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /User/CreateSpec AddUCardInfo
 * @apiVersion 1.0.0
 * @apiName AddUCardInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID   ID.
 * @apiParam {Number} GroupID   GroupID.
 * @apiParam {String} Title  Title.
 * @apiParam {Number} SavePrice  SavePrice.
 * @apiParam {Number} SalePrice  SalePrice.
 * @apiParam {Boolean} IsScore  IsScore.
 * @apiParam {Boolean} IsAllowPay  IsAllowPay.
 * @apiParam {Number} ActiveMonth  ActiveMonth.
 * @apiParam {String} AddDate  AddDate.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} AdminCode  AdminCode.
 * @apiParam {String} AdminName  AdminName.
 * @apiParam {Number} Discount  Discount.
 * @apiParam {Boolean} IsClose  IsClose.
 * @apiParam {Number} SaleComm  SaleComm.
 * @apiParam {Number} SaleCommType  SaleCommType.
 * @apiParam {Number} FillComm  FillComm.
 * @apiParam {Number} FillCommType  FillCommType.
 * @apiParam {Number} OrderNo  OrderNo.
 * @apiParam {Number} UCardFillScore  UCardFillScore.
 * @apiParam {Number} UCardPayScore  UCardPayScore.
 * @apiParam {String} IDStr  IDStr.
 * @apiParam {String} sendShopIDs  sendShopIDs.
 * @apiParam {String} useShopIDs  useShopIDs.
 * @apiParam {Number} UCardInfoGroupID  UCardInfoGroupID.
 * @apiParam {String} CanUseShops  CanUseShops.
 * @apiParam {String} CanSendShops  CanSendShops.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddUCardInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    SavePrice: params.SavePrice,
    SalePrice: params.SalePrice,
    IsScore: params.IsScore,
    IsAllowPay: params.IsAllowPay,
    ActiveMonth: params.ActiveMonth,
    AddDate: params.AddDate,
    AdminID: params.AdminID,
    AdminCode: params.AdminCode,
    AdminName: params.AdminName,
    Discount: params.Discount,
    IsClose: params.IsClose,
    SaleComm: params.SaleComm,
    SaleCommType: params.SaleCommType,
    FillComm: params.FillComm,
    FillCommType: params.FillCommType,
    OrderNo: params.OrderNo,
    UCardFillScore: params.UCardFillScore,
    UCardPayScore: params.UCardPayScore,
    IDStr: params.IDStr,
    sendShopIDs: params.sendShopIDs,
    useShopIDs: params.useShopIDs,
    UCardInfoGroupID: params.UCardInfoGroupID,
    CanUseShops: params.CanUseShops,
    CanSendShops: params.CanSendShops
  }
  return request({
    url: '/UCardInfo/CreateSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /User/CreateSpec ChangeUCardInfo
 * @apiVersion 1.0.0
 * @apiName ChangeUCardInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID   ID.
 * @apiParam {Number} GroupID   GroupID.
 * @apiParam {String} Title  Title.
 * @apiParam {Number} SavePrice  SavePrice.
 * @apiParam {Number} SalePrice  SalePrice.
 * @apiParam {Boolean} IsScore  IsScore.
 * @apiParam {Boolean} IsAllowPay  IsAllowPay.
 * @apiParam {Number} ActiveMonth  ActiveMonth.
 * @apiParam {String} AddDate  AddDate.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} AdminCode  AdminCode.
 * @apiParam {String} AdminName  AdminName.
 * @apiParam {Number} Discount  Discount.
 * @apiParam {Boolean} IsClose  IsClose.
 * @apiParam {Number} SaleComm  SaleComm.
 * @apiParam {Number} SaleCommType  SaleCommType.
 * @apiParam {Number} FillComm  FillComm.
 * @apiParam {Number} FillCommType  FillCommType.
 * @apiParam {Number} OrderNo  OrderNo.
 * @apiParam {Number} UCardFillScore  UCardFillScore.
 * @apiParam {Number} UCardPayScore  UCardPayScore.
 * @apiParam {String} IDStr  IDStr.
 * @apiParam {String} sendShopIDs  sendShopIDs.
 * @apiParam {String} useShopIDs  useShopIDs.
 * @apiParam {Number} UCardInfoGroupID  UCardInfoGroupID.
 * @apiParam {String} CanUseShops  CanUseShops.
 * @apiParam {String} CanSendShops  CanSendShops.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function ChangeUCardInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    SavePrice: params.SavePrice,
    SalePrice: params.SalePrice,
    IsScore: params.IsScore,
    IsAllowPay: params.IsAllowPay,
    ActiveMonth: params.ActiveMonth,
    AddDate: params.AddDate,
    AdminID: params.AdminID,
    AdminCode: params.AdminCode,
    AdminName: params.AdminName,
    Discount: params.Discount,
    IsClose: params.IsClose,
    SaleComm: params.SaleComm,
    SaleCommType: params.SaleCommType,
    FillComm: params.FillComm,
    FillCommType: params.FillCommType,
    OrderNo: params.OrderNo,
    UCardFillScore: params.UCardFillScore,
    UCardPayScore: params.UCardPayScore,
    IDStr: params.IDStr,
    sendShopIDs: params.sendShopIDs,
    useShopIDs: params.useShopIDs,
    UCardInfoGroupID: params.UCardInfoGroupID,
    CanUseShops: params.CanUseShops,
    CanSendShops: params.CanSendShops
  }
  return request({
    url: '/UCardInfo/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /UCardInfo/DeleteSpec deleteUCardInfo
 * @apiVersion 1.0.0
 * @apiName deleteUCardInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteUCardInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/UCardInfo/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /UCardFillConfig/IndexSpec getFillConfigListInfo
 * @apiVersion 1.0.0
 * @apiName getFillConfigListInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} PageIndex 分页序号.
 * @apiParam {Number} PageSize 分页长度.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ID  return data listInfo ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  return data listInfo GroupID.
 * @apiSuccess {Number} Data.listInfo.UCardType  return data listInfo UCardType.
 * @apiSuccess {Number} Data.listInfo.PayPrice  return data listInfo PayPrice.
 * @apiSuccess {Number} Data.listInfo.FreePrice  return data listInfo FreePrice.
 * @apiSuccess {Number} Data.listInfo.InfoTitle  return data listInfo InfoTitle.
 * @apiSuccess {Number} Data.PageIndex  return data PageIndex.
 * @apiSuccess {Number} Data.PageSize  return data PageSize.
 * @apiSuccess {Number} Data.PageTotal  return data PageTotal.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getFillConfigListInfo (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/UCardFillConfig/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /UCardFillConfig/EditSpec ChangeFillConfigInfo
 * @apiVersion 1.0.0
 * @apiName ChangeFillConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID  ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {Number} UCardType  UCardType.
 * @apiParam {Number} PayPrice  PayPrice.
 * @apiParam {Number} FreePrice  FreePrice.
 * @apiParam {Number} InfoTitle  InfoTitle.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function ChangeFillConfigInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    UCardType: params.UCardType,
    PayPrice: params.PayPrice,
    FreePrice: params.FreePrice,
    InfoTitle: params.InfoTitle
  }
  return request({
    url: '/UCardFillConfig/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /UCardFillConfig/CreateSpec AddFillConfigInfo
 * @apiVersion 1.0.0
 * @apiName AddFillConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID  ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {Number} UCardType  UCardType.
 * @apiParam {Number} PayPrice  PayPrice.
 * @apiParam {Number} FreePrice  FreePrice.
 * @apiParam {Number} InfoTitle  InfoTitle.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddFillConfigInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    UCardType: params.UCardType,
    PayPrice: params.PayPrice,
    FreePrice: params.FreePrice,
    InfoTitle: params.InfoTitle
  }
  return request({
    url: '/UCardFillConfig/CreateSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /UCardFillConfig/DeleteSpec deleteFillConfigInfo
 * @apiVersion 1.0.0
 * @apiName deleteFillConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteFillConfigInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/UCardFillConfig/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Department/IndexSpec getDepartmentListInfo
 * @apiVersion 1.0.0
 * @apiName getDepartmentListInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} PageIndex 分页序号.
 * @apiParam {Number} PageSize 分页长度.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object[]} Data.listInfo  return data listInfo.
 * @apiSuccess {Number} Data.listInfo.ID  return data listInfo ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  return data listInfo GroupID.
 * @apiSuccess {String} Data.listInfo.Title  return data listInfo Title.
 * @apiSuccess {Number} Data.listInfo.ParentID  return data listInfo ParentID.
 * @apiSuccess {String} Data.listInfo.Remark  return data listInfo Remark.
 * @apiSuccess {Number} Data.listInfo.State  return data listInfo State.
 * @apiSuccess {Number} Data.listInfo.AdminID  return data listInfo AdminID.
 * @apiSuccess {String} Data.listInfo.AddTime  return data listInfo AddTime.
 * @apiSuccess {String} Data.listInfo.ModifyTime  return data listInfo ModifyTime.
 * @apiSuccess {String} Data.listInfo.IDStr  return data listInfo IDStr.
 * @apiSuccess {Number} Data.PageIndex  return data PageIndex.
 * @apiSuccess {Number} Data.PageSize  return data PageSize.
 * @apiSuccess {Number} Data.PageTotal  return data PageTotal.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getDepartmentListInfo (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/Department/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Department/EditSpec ChangeDepartmentInfo
 * @apiVersion 1.0.0
 * @apiName ChangeDepartmentInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID  ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {String} Title  Title.
 * @apiParam {Number} ParentID  ParentID.
 * @apiParam {String} Remark  Remark.
 * @apiParam {Number} State  State.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {String} ModifyTime  ModifyTime.
 * @apiParam {String} IDStr  IDStr.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function ChangeDepartmentInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    ParentID: params.ParentID,
    Remark: params.Remark,
    State: params.State,
    AdminID: params.AdminID,
    AddTime: params.AddTime,
    ModifyTime: params.ModifyTime,
    IDStr: params.IDStr
  }
  return request({
    url: '/Department/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Department/CreateSpec AddDepartmentInfo
 * @apiVersion 1.0.0
 * @apiName AddDepartmentInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID  ID.
 * @apiParam {Number} GroupID  GroupID.
 * @apiParam {String} Title  Title.
 * @apiParam {Number} ParentID  ParentID.
 * @apiParam {String} Remark  Remark.
 * @apiParam {Number} State  State.
 * @apiParam {Number} AdminID  AdminID.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {String} ModifyTime  ModifyTime.
 * @apiParam {String} IDStr  IDStr.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddDepartmentInfo (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    ParentID: params.ParentID,
    Remark: params.Remark,
    State: params.State,
    AdminID: params.AdminID,
    AddTime: params.AddTime,
    ModifyTime: params.ModifyTime,
    IDStr: params.IDStr
  }
  return request({
    url: '/Department/CreateSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Department/DeleteSpec deleteDepartmentInfo
 * @apiVersion 1.0.0
 * @apiName deleteDepartmentInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteDepartmentInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Department/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /WxConfig/IndexSpec GetMpsSpec
 * @apiVersion 1.0.0
 * @apiName getWxConfigListInfo
 * @apiGroup Setting
 *
 * @apiSuccess {Object[]} Data  return data content.
 * @apiSuccess {Number} Data.id  return data id.
 * @apiSuccess {String} Data.mpname  return data mpname.
 * @apiSuccess {Object[]} Data.wxshops  return data wxshops.
 * @apiSuccess {Number} Data.wxshops.shopid  return data wxshops shopid.
 * @apiSuccess {String} Data.wxshops.shopname  return data wxshops shopname.
 * @apiSuccess {String} Data.wxshops.address  return data wxshops address.
 * @apiSuccess {Boolean} Data.wxshops.authtype  return data wxshops authtype.
 * @apiSuccess {Number} Data.wxshops.groupaccountid  return data wxshops groupaccountid.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getWeShopList (params) {
  const data = {
  }
  return request({
    url: '/WxConfig/GetMpsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /WxConfig/IndexSpec getWxConfigListInfo
 * @apiVersion 1.0.0
 * @apiName getWxConfigListInfo
 * @apiGroup Setting
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} Data.id  return data id.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getWxConfigListInfo (params) {
  const data = {
  }
  return request({
    url: '/WxConfig/IndexSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /WxConfig/ToEditSpec ChangeWxConfigInfo
 * @apiVersion 1.0.0
 * @apiName ChangeWxConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id  id.
 * @apiParam {String} MpName  MpName.
 * @apiParam {String} MpAppID  MpAppID.
 * @apiParam {String} MpAppSecret  MpAppSecret.
 * @apiParam {String} MCHID  MCHID.
 * @apiParam {String} PayKEY  PayKEY.
 * @apiParam {String} ShopIDs  ShopIDs.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function ChangeWxConfigInfo (params) {
  const data = {
    id: params.id,
    MpName: params.MpName,
    MpAppID: params.MpAppID,
    MpAppSecret: params.MpAppSecret,
    MCHID: params.MCHID,
    PayKEY: params.PayKEY,
    ShopIDs: params.ShopIDs
  }
  return request({
    url: '/WxConfig/ToEditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /WxConfig/ToSettingSpec SettingWxConfigInfo
 * @apiVersion 1.0.0
 * @apiName SettingWxConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} ID  ID.
 * @apiParam {Number} ShopID  ShopID.
 * @apiParam {Boolean} IsClose  IsClose.
 * @apiParam {String} Title  Title.
 * @apiParam {String} Pic  Pic.
 * @apiParam {String} Address  Address.
 * @apiParam {String} mobile  mobile.
 * @apiParam {String} context  context.
 * @apiParam {String} AddTime  AddTime.
 * @apiParam {String} wx_no  wx_no.
 * @apiParam {String} Lng  Lng.
 * @apiParam {String} Lat  Lat.
 * @apiParam {String} City  City.
 * @apiParam {Number} ProvinceID  ProvinceID.
 * @apiParam {Number} CityID  CityID.
 * @apiParam {Number} AreaID  AreaID.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function SettingWxConfigInfo (params) {
  const data = {
    ID: params.ID,
    ShopID: params.ShopID,
    IsClose: params.IsClose,
    Title: params.Title,
    Pic: params.Pic,
    Address: params.Address,
    mobile: params.mobile,
    context: params.context,
    AddTime: params.AddTime,
    wx_no: params.wx_no,
    Lng: params.Lng,
    Lat: params.Lat,
    City: params.City,
    ProvinceID: params.ProvinceID,
    CityID: params.CityID,
    AreaID: params.AreaID
  }
  return request({
    url: '/WxConfig/ToSettingSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /WxConfig/ToAddSpec AddWxConfigInfo
 * @apiVersion 1.0.0
 * @apiName AddWxConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id  id.
 * @apiParam {String} MpName  MpName.
 * @apiParam {String} MpAppID  MpAppID.
 * @apiParam {String} MpAppSecret  MpAppSecret.
 * @apiParam {String} MCHID  MCHID.
 * @apiParam {String} PayKEY  PayKEY.
 * @apiParam {String} ShopIDs  ShopIDs.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function AddWxConfigInfo (params) {
  const data = {
    id: params.id,
    MpName: params.MpName,
    MpAppID: params.MpAppID,
    MpAppSecret: params.MpAppSecret,
    MCHID: params.MCHID,
    PayKEY: params.PayKEY,
    ShopIDs: params.ShopIDs
  }
  return request({
    url: '/WxConfig/ToAddSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /WxConfig/ToDelSpec deleteWxConfigInfo
 * @apiVersion 1.0.0
 * @apiName deleteWxConfigInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id 名称.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function deleteWxConfigInfo (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/WxConfig/ToDelSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /WxConfig/ToDelSpec getShops
 * @apiVersion 1.0.0
 * @apiName getShops
 * @apiGroup Setting
 *
 * @apiSuccess {Object[]} Data  return data content.
 * @apiSuccess {Number} Data.shopid  return data shopid.
 * @apiSuccess {String} Data.shopname  return data shopname.
 * @apiSuccess {String} Data.address  return data address.
 * @apiSuccess {Boolean} Data.authtype  return data authtype.
 * @apiSuccess {Number} Data.groupaccountid  return data groupaccountid.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getShops (params) {
  const data = {
    id: params.id,
    isshow: params.isshow
  }
  return request({
    url: '/WxConfig/GetShops',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /WxConfig/ToDelSpec getWeshopInfo
 * @apiVersion 1.0.0
 * @apiName getWeshopInfo
 * @apiGroup Setting
 *
 * @apiParam {Number} id id.
 *
 * @apiSuccess {Object} Data  return data content.
 * @apiSuccess {Object} Data.account  return data content.
 * @apiSuccess {Number} Data.account.ID  return data content.
 * @apiSuccess {Number} Data.account.GroupID  return data content.
 * @apiSuccess {String} Data.account.MpName  return data content.
 * @apiSuccess {String} Data.account.MpAppID  return data content.
 * @apiSuccess {String} Data.account.MpAppSecret  return data content.
 * @apiSuccess {String} Data.account.MpAccessToken  return data content.
 * @apiSuccess {Number} Data.account.MpAccessTokenExpiresIn  return data content.
 * @apiSuccess {String} Data.account.MpAccessTokenUpdateTime  return data content.
 * @apiSuccess {Object} Data.pay  return data content.
 * @apiSuccess {Number} Data.pay.ID  return data content.
 * @apiSuccess {Number} Data.pay.AccountID  return data content.
 * @apiSuccess {Number} Data.pay.GroupID  return data content.
 * @apiSuccess {String} Data.pay.APPID  return data content.
 * @apiSuccess {String} Data.pay.MCHID  return data content.
 * @apiSuccess {String} Data.pay.PayKEY  return data content.
 * @apiSuccess {String} Data.pay.AddTime  return data content.
 * @apiSuccess {String} Data.pay.IP  return data content.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getWeshopInfo (params) {
  const data = {
    id: params.id,
    isshow: params.isshow
  }
  return request({
    url: '/WxConfig/AddInfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /WxConfig/ToDelSpec AddInfoSpec
 * @apiVersion 1.0.0
 * @apiName getShops
 * @apiGroup Setting
 *
 * @apiParam {Number} id id.
 *
 * @apiSuccess {Object[]} Data  return data Data.
 * @apiSuccess {Object[]} Data.shopinfo return data shopinfo.
 * @apiSuccess {Object[]} Data.shopwx return data shopwx.
 * @apiSuccess {String} Data.shopinfo.Title  return data Title.
 * @apiSuccess {String} Data.shopwx.Pic  return data Pic.
 * @apiSuccess {Number} Data.shopwx.Province  return data Province.
 * @apiSuccess {Number} Data.shopwx.City  return data City.
 * @apiSuccess {Number} Data.shopwx.Area  return data Area.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getSettingInfo (params) {
  const data = {
    shopid: params.id
  }
  return request({
    url: '/WxConfig/SettingSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /UCardInfo/BindShopsSpec BindShops
 * @apiVersion 1.0.0
 * @apiName BindShops
 * @apiGroup Setting
 *
 * @apiParam {Number} id id.
 *
 * @apiSuccess {Object} Data  return data Data.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function BindShops (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/UCardInfo/BindShopsSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /UCardInfo/BindShopsSpec BindShops
 * @apiVersion 1.0.0
 * @apiName BindShops
 * @apiGroup Setting
 *
 * @apiParam {Number} id id.
 *
 * @apiSuccess {Object} Data  return data Data.
 * @apiSuccess {Object[]} Data.shopsUseL return data shopsUseL.
 * @apiSuccess {Object} Data.shopsUseL.ID return data ID.
 * @apiSuccess {Number} Data.shopsUseL.GroupID  return data GroupID.
 * @apiSuccess {String} Data.shopsUseL.Title  return data Title.
 * @apiSuccess {String} Data.shopsUseL.Pic  return data Pic.
 * @apiSuccess {Number} Data.shopsUseL.ShopType  return data ShopType.
 * @apiSuccess {Number} Data.shopsUseL.ShopIndustry  return data ShopIndustry.
 * @apiSuccess {Number} Data.shopsUseL.Space  return data Space.
 * @apiSuccess {String} Data.shopsUseL.Phone  return data Phone.
 * @apiSuccess {String} Data.shopsUseL.Email  return data Email.
 * @apiSuccess {Number} Data.shopsUseL.Province  return data Province.
 * @apiSuccess {Number} Data.shopsUseL.City  return data City.
 * @apiSuccess {Number} Data.shopsUseL.Area  return data Area.
 * @apiSuccess {String} Data.shopsUseL.Address  return data Address.
 * @apiSuccess {String} Data.shopsUseL.AddressAll  return data AddressAll.
 * @apiSuccess {Number} Data.shopsUseL.X  return data X.
 * @apiSuccess {Number} Data.shopsUseL.Y  return data Y.
 * @apiSuccess {String} Data.shopsUseL.AddTime  return data AddTime.
 * @apiSuccess {Number} Data.shopsUseL.AdminId  return data AdminId.
 * @apiSuccess {Boolean} Data.shopsUseL.IsClose  return data IsClose.
 * @apiSuccess {Number} Data.shopsUseL.ShopCode  return data ShopCode.
 * @apiSuccess {String} Data.shopsUseL.ShopHours  return data ShopHours.
 * @apiSuccess {Number} Data.shopsUseL.AccountMax  return data AccountMax.
 * @apiSuccess {Number} Data.shopsUseL.AccountCurrent  return data AccountCurrent.
 * @apiSuccess {Number} Data.shopsUseL.SMSMax  return data SMSMax.
 * @apiSuccess {Number} Data.shopsUseL.SMSCurrent  return data SMSCurrent.
 * @apiSuccess {Number} Data.shopsUseL.VersionLevel  return data VersionLevel.
 * @apiSuccess {String} Data.shopsUseL.ServiceStartDate  return data ServiceStartDate.
 * @apiSuccess {String} Data.shopsUseL.ServiceEndDate  return data ServiceEndDate.
 * @apiSuccess {String} Data.shopsUseL.Manager  return data Manager.
 * @apiSuccess {Number} Data.shopsUseL.ChainType  return data ChainType.
 * @apiSuccess {String} Data.shopsUseL.ModifyTime  return data ModifyTime.
 * @apiSuccess {Number} Data.shopsUseL.ShopState  return data ShopState.
 * @apiSuccess {Object[]} Data.shopsUseL.shopsSendL  return data shopsSendL.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ID  return data ID.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.GroupID  return data GroupID.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Title  return data Title.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Pic  return data Pic.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ShopType  return data ShopType.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ShopIndustry  return data ShopIndustry.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.Space  return data Space.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Phone  return data Phone.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Email  return data Email.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.Province  return data Province.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.City  return data City.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.Area  return data Area.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Address  return data Address.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.AddressAll  return data AddressAll.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.X  return data X.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.Y  return data Y.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.AddTime  return data AddTime.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.AdminId  return data AdminId.
 * @apiSuccess {Boolean} Data.shopsUseL.shopsSendL.IsClose  return data IsClose.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ShopCode    return data ShopCode.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.ShopHours    return data ShopHours.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.AccountMax    return data AccountMax.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.AccountCurrent    return data AccountCurrent.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.SMSMax    return data SMSMax.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.SMSCurrent    return data SMSCurrent.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.VersionLevel    return data VersionLevel.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.ServiceStartDate    return data ServiceStartDate.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.ServiceEndDate    return data ServiceEndDate.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.Manager    return data Manager.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ChainType    return data ChainType.
 * @apiSuccess {String} Data.shopsUseL.shopsSendL.ModifyTime    return data ModifyTime.
 * @apiSuccess {Number} Data.shopsUseL.shopsSendL.ShopState    return data ShopState.
 * @apiSuccess {Number} RetCode  return data ResCode.
 * @apiSuccess {String} Msg  return data Msg.
 */
export function getDepartmentList (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Role/BindDepartmentSpec',
    method: 'get',
    params: data
  })
}
export function setUserPowers (params) {
  const data = {
    UserID: params.UserID,
    chkPowerID: params.chkPowerID,
    ShopID: params.ShopID
  }
  return request({
    url: '/User/SetPowerSpec',
    method: 'post',
    data: data
  })
}
export function setRolePowers (params) {
  const data = {
    RoleID: params.RoleID,
    chkPowerID: params.chkPowerID,
    ShopID: params.ShopID
  }
  return request({
    url: '/Role/SetPowerSpec',
    method: 'post',
    data: data
  })
}
