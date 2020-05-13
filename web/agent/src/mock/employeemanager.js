const employeeManagerTable = {
  RetCode: 1,
  Msg: '',
  Data: {
    tableData: [{
      tech_no: 987,
      name: 'MOCK数据1',
      phone: 13828721322,
      shop: '线上测试店铺',
      age: 0,
      sex: '女',
      class: '管理一班',
      work_date: '2018/7/30 0:00:00',
      birth_place: '广东',
      statu: '正常'
    }, {
      tech_no: 987,
      name: 'MOCK数据2',
      phone: 13828721322,
      shop: '线上测试店铺',
      age: 0,
      sex: '女',
      class: '管理一班',
      work_date: '2018/7/30 0:00:00',
      birth_place: '广东',
      statu: '正常'
    }, {
      tech_no: 987,
      name: 'MOCK数据3',
      phone: 13828721322,
      shop: '线上测试店铺',
      age: 0,
      sex: '女',
      class: '管理一班',
      work_date: '2018/7/30 0:00:00',
      birth_place: '广东',
      statu: '正常'
    }]
  }
}

export default {
  getEmployeeManagerTableData: config => {
    const employeeManagerInfo = employeeManagerTable
    return employeeManagerInfo
  }
}
