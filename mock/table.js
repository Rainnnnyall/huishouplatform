import Mock from 'mockjs'

const data = Mock.mock({
  //造了30条数据
  'items|10': [{
    id: '@integer(1,100)',
    title: '@cword(2,5)',
    num: '@integer(1,100)',
    price: '@integer(300, 5000)',
    display_time: '@datetime'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },{
    url: '/vue-admin-template/table/tese2',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          items: [{name:'小明'},{age:12}]
        }
      }
    }
  }
]
