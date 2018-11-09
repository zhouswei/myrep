const shopManagerTable = {
  RetCode: 1,
  Msg: '',
  Data: {
    tableData: [{
      regisCode: 555202,
      shopName: '豪华门店',
      contacts: '张天华',
      phone: '18101313597',
      shop_type: '0直营',
      message_num: 29,
      account_num: 500,
      regis_date: '2017/11/7 11:34:17',
      useful_date: '2017-12-9',
      statu: '有效'
    }, {
      regisCode: 555202,
      shopName: '寒酸门店',
      contacts: '张天华',
      phone: '18101313597',
      shop_type: '0直营',
      message_num: 29,
      account_num: 500,
      regis_date: '2017/11/7 11:34:17',
      useful_date: '2017-12-9',
      statu: '有效'
    }, {
      regisCode: 555202,
      shopName: '中二门店',
      contacts: '张天华',
      phone: '18101313597',
      shop_type: '0直营',
      message_num: 29,
      account_num: 500,
      regis_date: '2017/11/7 11:34:17',
      useful_date: '2017-12-9',
      statu: '有效'
    }, {
      regisCode: 555202,
      shopName: '门店二号',
      contacts: '张天华',
      phone: '18101313597',
      shop_type: '0直营',
      message_num: 29,
      account_num: 500,
      regis_date: '2017/11/7 11:34:17',
      useful_date: '2017-12-9',
      statu: '有效'
    }]
  }
}

export default {
  getShopManagerTableData: config => {
    const shopManagerInfo = shopManagerTable
    return shopManagerInfo
  }
}
