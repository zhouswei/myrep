export function getValideShopState (state) {
  return state === 1 ? '有效' : '停用'
}
export function getPendingShopState (state) {
  return state === 1 ? '待审核' : (state === 2 ? '审核通过' : (state === 3 ? '审核不通过' : ''))
}
export function getShopType (state) {
  return state === 1 ? '直营' : (state === 2) ? '加盟' : ''
}
export function getImageUrlPara () {
  return 'http://up.handnear.com//'
}
