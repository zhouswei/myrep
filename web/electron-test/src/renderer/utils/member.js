import store from '@/store'
export function returnOpencardTitle (value) {
  for (let i = 0; i < store.getters.memberbase.membershopList.length; i++) {
    if (store.getters.memberbase.membershopList[i].ID === value) {
      return store.getters.memberbase.membershopList[i].Title
    }
  }
  return ''
}
export function value2Status (state) {
  if (state === 1) {
    return '正常'
  } else if (state === 2) {
    return '冻结'
  } else if (state === 3) {
    return '挂失'
  }
}
export function returnSexTitle (state) {
  if (state === 1) {
    return '男'
  } else if (state === 2) {
    return '女'
  }
}
export function getSaleCommTypes () {
  return [{
    label: '--请选择--',
    SaleCommType: 0
  }, {
    label: '卡储金额',
    SaleCommType: 1
  }, {
    label: '售卡金额',
    SaleCommType: 2
  }, {
    label: '按张提成',
    SaleCommType: 3
  }]
}
export function getFillCommTypes () {
  return [{
    label: '--请选择--',
    FillCommType: 0
  }, {
    label: '卡储金额',
    FillCommType: 1
  }, {
    label: '售卡金额',
    FillCommType: 2
  }]
}
