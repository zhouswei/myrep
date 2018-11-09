import { param2Obj } from '@/utils'

const userMap = {
  5552: {
    RetCode: 1,
    Msg: '',
    Data: {
      roles: ['admin'],
      token: '5552',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  },
  editor: {
    RetCode: 1,
    Msg: '',
    Data: {
      roles: ['editor'],
      token: '5552',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
  }
}
const shopContent = {
  RetCode: 1,
  Msg: '',
  Data: {
    shopfloor: [{id: '0', name: '全部'},
      {id: '1', name: '一楼'},
      {id: '2', name: '二楼'},
      {id: '3', name: '三楼'},
      {id: '4', name: '四楼'}],
    roomstatus: [{status: '0', name: '全部'},
      {status: '1', name: '空闲'},
      {status: '2', name: '使用'},
      {status: '3', name: '待扫'},
      {status: '4', name: '维修'},
      {status: '5', name: '预约'}],
    bedcontain: [{id: '0', name: '全部'},
      {id: '1', name: '1人'},
      {id: '2', name: '2人'},
      {id: '3', name: '3人'},
      {id: '4', name: '4人'},
      {id: '100', name: '多人'}]
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  getShopInfo: config => {
    const shopInfo = shopContent
    return shopInfo
  },
  logout: () => {
    return { RetCode: 1, Msg: '', Data: {} }
  }
}
