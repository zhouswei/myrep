// getters 相当于vue的computed 属性， 用来缓存state 只有发生变化是才会执行
const getters = {
  slidebar: state => state.app.slidebar,
  device: state => state.app.device,
  permission_routers: state => state.permission.routers,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  errorLogs: state => state.errorLog.logs,
  visitedViews: state => state.tagView.visitedViews,
  cachedViews: state => state.tagView.cachedViews,
  roles: state => state.user.roles,
  shopinfo: state => state.user.shopinfo,
  userdata: state => state.user.userdata,
  memberbase: state => state.user.memberbase,
  addRouters: state => state.permission.addRouters,
  memberInfo: state => state.member.memberInfoList,
  memberChargeInfo: state => state.member.memberChargeInfo,
  membermanager: state => state.member.membermanager,
  shopmanagerTabledata: state => state.user.shopmanagerTabledata,
  employeemanagerTableData: state => state.user.employeemanagerTabledata,
  powerClassList: state => state.data.powerClassList,
  powerItemList: state => state.data.powerItemList,
  dialogIndex: state => state.user.dialogIndex,
  dialogShow: state => state.user.dialogShow,
  code: state => state.user.code,
  funcList: state => state.permission.funcLists,
  parentList: state => state.permission.parentLists,
  TipContent: state => state.user.TipContent
}
export default getters
