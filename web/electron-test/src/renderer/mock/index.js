import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// import shopmanagerAPI from './shopmanager'
// import EmployeemanagerAPI from './employeemanager'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\.*\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\.*\/user\/info\.*/, 'get', loginAPI.getUserInfo)
// Mock.mock(/\.*\/shop\/info\.*/, 'get', loginAPI.getShopInfo)

// 文章相关
Mock.mock(/\.*\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\.*\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\.*\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\.*\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\.*\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\.*\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\.*\/transaction\/list/, 'get', transactionAPI.getList)
// 店铺管理列表数据
// Mock.mock(/\.*\/Shopmanager\/GetTableData/, 'get', shopmanagerAPI.getShopManagerTableData)

// // 员工管理管理列表数据
// Mock.mock(/\.*\/Employeenamager\/GetTableData/, 'get', EmployeemanagerAPI.getEmployeeManagerTableData)

export default Mock
