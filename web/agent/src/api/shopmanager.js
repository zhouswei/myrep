import request from '@/utils/request'
/**
 * @api {post} /Employeenamager/GetTableData getEmployeeManagerTableData
 * @apiVersion 1.0.0
 * @apiName getEmployeeManagerTableData
 * @apiGroup Shop
 *
 * @apiParam {Number} ShopID 注册码
 * @apiParam {String} ShawName 店铺名称.
 * @apiParam {String} Account 店铺状态.
 * @apiParam {Number} IsLock 当前页数.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 * @apiSuccess {Object[]} Data.listInfo  列表信息.
 * @apiSuccess {String} Data.listInfo.ShopName  ShopName.
 * @apiSuccess {String} Data.listInfo.ScheduTitle  ScheduTitle.
 * @apiSuccess {String} Data.listInfo.PositionTitle  PositionTitle.
 * @apiSuccess {Number} Data.listInfo.ID  门店ID.
 * @apiSuccess {String} Data.listInfo.Account  Account.
 * @apiSuccess {String} Data.listInfo.ShowName  ShowName.
 * @apiSuccess {String} Data.listInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {String} Data.listInfo.AdminID  AdminID.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.Password  Password.
 * @apiSuccess {String} Data.listInfo.CardID  CardID.
 * @apiSuccess {Boolean} Data.listInfo.IsLock  IsLock.
 * @apiSuccess {String} Data.listInfo.LastLoginIP  LastLoginIP.
 * @apiSuccess {String} Data.listInfo.LastLoginTime  LastLoginTime.
 * @apiSuccess {String} Data.listInfo.UserCode  UserCode.
 * @apiSuccess {String} Data.listInfo.Origin  Origin.
 * @apiSuccess {String} Data.listInfo.Pic  Pic.
 * @apiSuccess {String} Data.listInfo.Address  Address.
 * @apiSuccess {String} Data.listInfo.IDCard  IDCard.
 * @apiSuccess {String} Data.listInfo.Birthday  Birthday.
 */
export function getEmployeeManagerTableData (params) {
  const data = {
    ShopID: params.ShopID,
    ShawName: params.ShawName,
    Account: params.Account,
    IsLock: params.IsLock,
    PageIndex: params.PageIndex,
    PageSize: params.PageSize
  }
  return request({
    url: '/Staff/ListSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Staff/InfoSpec getEmployeeManagerDetailData
 * @apiVersion 1.0.0
 * @apiName getEmployeeManagerDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.listItem  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getEmployeeManagerDetailData (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Staff/InfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Shop/IndexSpec getValideShopData
 * @apiVersion 1.0.0
 * @apiName getValideShopData
 * @apiGroup Shop
 *
 * @apiParam {String} Name 注册码
 * @apiParam {String} PhoneNo 店铺名称.
 * @apiParam {String} ShopName 店铺状态.
 * @apiParam {Number} Statu 当前页数.
 * @apiParam {Number} PageIndex 当前页数.
 * @apiParam {Number} PageSize 每页个数.
 * @apiParam {Number} isPageClick 是否点击.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  总店信息.
 * @apiSuccess {String} Data.listInfo.Title  店铺名称.
 * @apiSuccess {String} Data.listInfo.Pic  店铺图片，仅仅存储地址，不包含域名.
 * @apiSuccess {Number} Data.listInfo.ShopType  店铺类型.
 * @apiSuccess {Number} Data.listInfo.ShopIndustry  店铺行业（保留字段）.
 * @apiSuccess {Number} Data.listInfo.Space  店铺面积.
 * @apiSuccess {String} Data.listInfo.Phone  联系电话.
 * @apiSuccess {String} Data.listInfo.Email  Email.
 * @apiSuccess {Number} Data.listInfo.Province  省会.
 * @apiSuccess {Number} Data.listInfo.City  城市.
 * @apiSuccess {Number} Data.listInfo.Area  地区（保留字段）.
 * @apiSuccess {String} Data.listInfo.Address  详细地址信息(可用与地图定位).
 * @apiSuccess {String} Data.listInfo.AddressAll  详细地址, 把省市区地址合并成一个.
 * @apiSuccess {Number} Data.listInfo.X  X.
 * @apiSuccess {Number} Data.listInfo.Y  Y.
 * @apiSuccess {String} Data.listInfo.AddTime  添加时间.
 * @apiSuccess {Number} Data.listInfo.AdminId  添加店铺的管理员ID.
 * @apiSuccess {Boolean} Data.listInfo.IsClose  是否当前店铺关闭.
 * @apiSuccess {String} Data.listInfo.ShopCode  门店注册码（登陆时使用）.
 * @apiSuccess {String} Data.listInfo.ShopHours  店铺营业时间.
 * @apiSuccess {Number} Data.listInfo.AccountMax   最大账号数.
 * @apiSuccess {Number} Data.listInfo.AccountCurrent  当前账号数.
 * @apiSuccess {Number} Data.listInfo.SMSMax  最大短信.
 * @apiSuccess {Number} Data.listInfo.SMSCurrent  当前短信.
 * @apiSuccess {Number} Data.listInfo.VersionLevel  软件版本.
 * @apiSuccess {String} Data.listInfo.ServiceStartDate  服务开始时间.
 * @apiSuccess {String} Data.listInfo.ServiceEndDate  服务结束时间.
 * @apiSuccess {String} Data.listInfo.Manager  联系人.
 * @apiSuccess {Number} Data.listInfo.ChainType  连锁店类型.
 * @apiSuccess {String} Data.listInfo.ModifyTime  ModifyTime.
 * @apiSuccess {Number} Data.listInfo.ShopState  ShopState.
 * @apiSuccess {Number} Data.PageIndex  分页序号.
 * @apiSuccess {Number} Data.PageSize  分页长度.
 * @apiSuccess {Number} Data.PageTotal  数据总数.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getValideShopData (params) {
  const data = {
    ShopCode: params.regisCode,
    ShopName: params.shopName,
    ShopState: params.shopState,
    PageIndex: params.pageIndex,
    PageSize: params.pageSize
  }
  return request({
    url: '/Shop/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Shop/InfoSpec getValideShopDetailData
 * @apiVersion 1.0.0
 * @apiName getValideShopDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.info  info.
 * @apiSuccess {Number} Data.info.ID  ID.
 * @apiSuccess {Number} Data.info.GroupID  GroupID.
 * @apiSuccess {String} Data.info.Title  Title.
 * @apiSuccess {String} Data.info.Pic  Pic.
 * @apiSuccess {Number} Data.info.ShopType  ShopType.
 * @apiSuccess {Number} Data.info.ShopIndustry  ShopIndustry.
 * @apiSuccess {Number} Data.info.Space  Space.
 * @apiSuccess {String} Data.info.Phone  Phone.
 * @apiSuccess {String} Data.info.Email  Email.
 * @apiSuccess {String} Data.info.Province  Province.
 * @apiSuccess {String} Data.info.City  City.
 * @apiSuccess {String} Data.info.Area  Area.
 * @apiSuccess {String} Data.info.Address  Address.
 * @apiSuccess {String} Data.info.AddressAll  AddressAll.
 * @apiSuccess {Number} Data.info.X  X.
 * @apiSuccess {Number} Data.info.Y  Y.
 * @apiSuccess {String} Data.info.AddTime  AddTime.
 * @apiSuccess {String} Data.info.AdminId  AdminId.
 * @apiSuccess {Number} Data.info.IsClose  IsClose.
 * @apiSuccess {Number} Data.info.ShopCode  ShopCode.
 * @apiSuccess {String} Data.info.ShopHours  ShopHours.
 * @apiSuccess {String} Data.info.AccountMax  AccountMax.
 * @apiSuccess {String} Data.info.AccountCurrent  AccountCurrent.
 * @apiSuccess {String} Data.info.SMSMax  SMSMax.
 * @apiSuccess {String} Data.info.SMSCurrent  SMSCurrent.
 * @apiSuccess {String} Data.info.VersionLevel  VersionLevel.
 * @apiSuccess {String} Data.info.ServiceStartDate  ServiceStartDate.
 * @apiSuccess {String} Data.info.ServiceEndDate  ServiceEndDate.
 * @apiSuccess {String} Data.info.Manager  Manager.
 * @apiSuccess {String} Data.info.ChainType  ChainType.
 * @apiSuccess {String} Data.info.ModifyTime  ModifyTime.
 * @apiSuccess {Number} Data.info.ShopState  ShopState.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getValideShopDetailData (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Shop/InfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Shop/InfoSpec getValideShopDetailData
 * @apiVersion 1.0.0
 * @apiName getValideShopDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.info  info.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function delValideShop (params) {
  const data = {
    id: params.id,
    isClose: params.isClose
  }
  return request({
    url: '/Shop/DeleteSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Shop/InfoSpec EditSpec
 * @apiVersion 1.0.0
 * @apiName EditSpec
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.info  info.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function ChangeValShop (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    Pic: params.Pic,
    Space: params.Space,
    ShopHours: params.ShopHours,
    ShopType: params.ShopType,
    ShopIndustry: params.ShopIndustry,
    Phone: params.Phone,
    Province: params.Province,
    City: params.City,
    Area: params.Area,
    Address: params.Address,
    AddressAll: params.AddressAll,
    X: params.X,
    Y: params.Y,
    AddTime: params.AddTime,
    AdminId: params.AdminId,
    IsClose: params.IsClose,
    ShopCode: params.ShopCode,
    AccountMax: params.AccountMax,
    AccountCurrent: params.AccountCurrent,
    SMSMax: params.SMSMax,
    SMSCurrent: params.SMSCurrent,
    VersionLevel: params.VersionLevel,
    ServiceStartDate: params.ServiceStartDate,
    ServiceEndDate: params.ServiceEndDate,
    Manager: params.Manager,
    Email: params.Email,
    ChainType: params.ChainType,
    ShopState: params.ShopState,
    ModifyTime: params.ModifyTime
  }
  return request({
    url: '/Shop/EditSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /Shop/InfoSpec getValideShopDetailData
 * @apiVersion 1.0.0
 * @apiName getValideShopDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.info  info.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function delPenShop (params) {
  const data = {
    id: params.id,
    isClose: params.isClose
  }
  return request({
    url: '/ShopPending/Delete',
    method: 'post',
    data: data
  })
}
export function EditSnapSpec (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/ShopPending/EditSnapSpec',
    method: 'get',
    params: data
  })
}
export function EditSnapSpecMod (params) {
  const data = {
    Pic: params.Pic,
    ID: params.ID,
    PicFull: params.PicFull,
    file1: params.file1,
    Title: params.Title,
    Manager: params.Manager,
    Phone: params.Phone,
    Email: params.Email,
    Space: params.Space,
    ShopHours: params.ShopHours,
    BeginDate: params.BeginDate,
    EndDate: params.EndDate,
    Province: params.Province,
    City: params.City,
    Area: params.Area,
    Address: params.Address,
    ChainType: params.ChainType,
    AccountMax: params.AccountMax,
    SMSMax: params.SMSMax,
    ServiceEndDate: params.ServiceEndDate
  }
  return request({
    url: '/ShopPending/EditSnapSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {post} /ShopPending/IndexSpec getPendingShopData
 * @apiVersion 1.0.0
 * @apiName getPendingShopData
 * @apiGroup Shop
 *
 * @apiParam {String} shopName 店铺名称.
 * @apiParam {String} ShopState 店铺状态.
 * @apiParam {Number} PageIndex 当前页数.
 * @apiParam {Number} PageSize 每页个数.
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.ID  ID.
 * @apiSuccess {Number} Data.listInfo.GroupID  总店信息.
 * @apiSuccess {String} Data.listInfo.Title  店铺名称.
 * @apiSuccess {String} Data.listInfo.Pic  店铺图片，仅仅存储地址，不包含域名.
 * @apiSuccess {Number} Data.listInfo.ShopType  店铺类型.
 * @apiSuccess {Number} Data.listInfo.ShopIndustry  店铺行业（保留字段）.
 * @apiSuccess {Number} Data.listInfo.Space  店铺面积.
 * @apiSuccess {String} Data.listInfo.Phone  联系电话.
 * @apiSuccess {String} Data.listInfo.Email  Email.
 * @apiSuccess {Number} Data.listInfo.Province  省会.
 * @apiSuccess {Number} Data.listInfo.City  城市.
 * @apiSuccess {Number} Data.listInfo.Area  地区（保留字段）.
 * @apiSuccess {String} Data.listInfo.Address  详细地址信息(可用与地图定位).
 * @apiSuccess {String} Data.listInfo.AddressAll  详细地址, 把省市区地址合并成一个.
 * @apiSuccess {Number} Data.listInfo.X  X.
 * @apiSuccess {Number} Data.listInfo.Y  Y.
 * @apiSuccess {String} Data.listInfo.AddTime  添加时间.
 * @apiSuccess {Number} Data.listInfo.AdminId  添加店铺的管理员ID.
 * @apiSuccess {Boolean} Data.listInfo.IsClose  是否当前店铺关闭.
 * @apiSuccess {String} Data.listInfo.ShopCode  门店注册码（登陆时使用）.
 * @apiSuccess {String} Data.listInfo.ShopHours  店铺营业时间.
 * @apiSuccess {Number} Data.listInfo.AccountMax   最大账号数.
 * @apiSuccess {Number} Data.listInfo.AccountCurrent  当前账号数.
 * @apiSuccess {Number} Data.listInfo.SMSMax  最大短信.
 * @apiSuccess {Number} Data.listInfo.SMSCurrent  当前短信.
 * @apiSuccess {Number} Data.listInfo.VersionLevel  软件版本.
 * @apiSuccess {String} Data.listInfo.ServiceStartDate  服务开始时间.
 * @apiSuccess {String} Data.listInfo.ServiceEndDate  服务结束时间.
 * @apiSuccess {String} Data.listInfo.Manager  联系人.
 * @apiSuccess {Number} Data.listInfo.ChainType  连锁店类型.
 * @apiSuccess {String} Data.listInfo.ModifyTime  ModifyTime.
 * @apiSuccess {Number} Data.listInfo.ShopState  ShopState.
 * @apiSuccess {Number} Data.PageIndex  分页序号.
 * @apiSuccess {Number} Data.PageSize  分页长度.
 * @apiSuccess {Number} Data.PageTotal  数据总数.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getPendingShopData (params) {
  const data = {
    PageIndex: params.pageIndex,
    PageSize: params.pageSize,
    ShopName: params.shopName,
    ShopState: params.shopState
  }
  return request({
    url: '/ShopPending/IndexSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /ShopPending/InfoSpec getPendingShopDetailData
 * @apiVersion 1.0.0
 * @apiName getPendingShopDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.info  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getPendingShopDetailData (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/ShopPending/InfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {post} /Tech/ListSpec getTechListData
 * @apiVersion 1.0.0
 * @apiName getTechListData
 * @apiGroup Shop
 *
 * @apiParam {Number} ShopID ShopID.
 * @apiParam {String} ShawName 姓名.
 * @apiParam {String} Account 手机号.
 * @apiParam {Number} IsLock 是否锁定.
 * @apiParam {Number} PageIndex 当前页.
 * @apiParam {Number} PageSize 每页个数.

 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object[]} Data.listInfo  数据.
 * @apiSuccess {Number} Data.listInfo.TechID  TechID.
 * @apiSuccess {String} Data.listInfo.ShopName  ShopName.
 * @apiSuccess {String} Data.listInfo.ServiceTypeTitle  ServiceTypeTitle.
 * @apiSuccess {String} Data.listInfo.LevelTitle  LevelTitle.
 * @apiSuccess {String} Data.listInfo.ScheduTitle  ScheduTitle.
 * @apiSuccess {String} Data.listInfo.ServiceTypeList  ServiceTypeList.
 * @apiSuccess {Number} Data.listInfo.ID  门店ID.
 * @apiSuccess {String} Data.listInfo.Account  Account.
 * @apiSuccess {String} Data.listInfo.ShowName  ShowName.
 * @apiSuccess {String} Data.listInfo.AddDate  AddDate.
 * @apiSuccess {String} Data.listInfo.AddTime  AddTime.
 * @apiSuccess {String} Data.listInfo.AdminID  AdminID.
 * @apiSuccess {Number} Data.listInfo.ShopID  ShopID.
 * @apiSuccess {String} Data.listInfo.Password  Password.
 * @apiSuccess {String} Data.listInfo.CardID  CardID.
 * @apiSuccess {Boolean} Data.listInfo.IsLock  IsLock.
 * @apiSuccess {String} Data.listInfo.LastLoginIP  LastLoginIP.
 * @apiSuccess {String} Data.listInfo.LastLoginTime  LastLoginTime.
 * @apiSuccess {String} Data.listInfo.UserCode  UserCode.
 * @apiSuccess {String} Data.listInfo.Origin  Origin.
 * @apiSuccess {String} Data.listInfo.Pic  Pic.
 * @apiSuccess {String} Data.listInfo.Address  Address.
 * @apiSuccess {String} Data.listInfo.IDCard  IDCard.
 * @apiSuccess {String} Data.listInfo.Birthday  Birthday.
 * @apiSuccess {Number} Data.PageIndex  分页序号.
 * @apiSuccess {Number} Data.PageSize  分页长度.
 * @apiSuccess {Number} Data.PageTotal  数据总数.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getTechListData (params) {
  const data = {
    PageIndex: params.PageIndex,
    PageSize: params.PageSize,
    ShopID: params.ShopID,
    ShawName: params.ShawName,
    Account: params.Account,
    IsLock: params.IsLock
  }
  return request({
    url: '/Tech/ListSpec',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Tech/InfoSpec getTechDetailData
 * @apiVersion 1.0.0
 * @apiName getTechDetailData
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.listItem  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function getTechDetailData (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Tech/InfoSpec',
    method: 'get',
    params: data
  })
}
/**
 * @api {get} /Tech/InfoSpec CheckShopMax
 * @apiVersion 1.0.0
 * @apiName CheckShopMax
 * @apiGroup Shop
 *
 * @apiParam {Number} id id
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function CheckShopMax (params) {
  const data = {
    id: params.id
  }
  return request({
    url: '/Shop/CheckShopMax',
    method: 'post',
    data: data
  })
}
/**
 * @api {get} /Tech/InfoSpec shopmanagerAddShop
 * @apiVersion 1.0.0
 * @apiName CheckShopMax
 * @apiGroup Shop
 *
 * @apiParam {Number} ID ID
 * @apiParam {Number} GroupID GroupID
 * @apiParam {String} Title Title
 * @apiParam {String} Pic Pic
 * @apiParam {Number} ShopType ShopType
 * @apiParam {Number} ShopIndustry ShopIndustry
 * @apiParam {Number} Space Space
 * @apiParam {String} Phone Phone
 * @apiParam {Number} Email Email
 * @apiParam {Number} Province Province
 * @apiParam {Number} City City
 * @apiParam {Number} Area Area
 * @apiParam {String} Address Address
 * @apiParam {String} AddressAll AddressAll
 * @apiParam {Number} X X
 * @apiParam {Number} Y Y
 * @apiParam {String} AddTime AddTime
 * @apiParam {Number} AdminId AdminId
 * @apiParam {Boolean} IsClose IsClose
 * @apiParam {String} ShopCode ShopCode
 * @apiParam {String} ShopHours ShopHours
 * @apiParam {Number} AccountMax AccountMax
 * @apiParam {Number} AccountCurrent AccountCurrent
 * @apiParam {Number} SMSMax SMSMax
 * @apiParam {Number} SMSCurrent SMSCurrent
 * @apiParam {Number} VersionLevel VersionLevel
 * @apiParam {String} ServiceStartDate ServiceStartDate
 * @apiParam {String} ServiceEndDate ServiceEndDate
 * @apiParam {String} Manager Manager
 * @apiParam {Number} ChainType ChainType
 * @apiParam {String} ModifyTime ModifyTime
 * @apiParam {Number} ShopState ShopState
 *
 * @apiSuccess {Object} Data  数据.
 * @apiSuccess {Object} Data.listItem  数据.
 * @apiSuccess {Number} RetCode  状态码.
 * @apiSuccess {String} Msg  信息.
 */
export function shopmanagerAddShop (params) {
  const data = {
    ID: params.ID,
    GroupID: params.GroupID,
    Title: params.Title,
    Pic: params.Pic,
    Space: params.Space,
    ShopHours: params.ShopHours,
    ShopType: params.ShopType,
    ShopIndustry: params.ShopIndustry,
    Phone: params.Phone,
    Province: params.Province,
    City: params.City,
    Area: params.Area,
    Address: params.Address,
    AddressAll: params.AddressAll,
    X: params.X,
    Y: params.Y,
    AddTime: params.AddTime,
    AdminId: params.AdminId,
    IsClose: params.IsClose,
    ShopCode: params.ShopCode,
    AccountMax: params.AccountMax,
    AccountCurrent: params.AccountCurrent,
    SMSMax: params.SMSMax,
    SMSCurrent: params.SMSCurrent,
    VersionLevel: params.VersionLevel,
    ServiceStartDate: params.ServiceStartDate,
    ServiceEndDate: params.ServiceEndDate,
    Manager: params.Manager,
    Email: params.Email,
    ChainType: params.ChainType,
    ShopState: params.ShopState,
    ModifyTime: params.ModifyTime
  }
  return request({
    url: '/Shop/CreateSpec',
    method: 'post',
    data: data
  })
}
