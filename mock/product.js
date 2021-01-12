import Mock from 'mockjs'

const data = Mock.mock({
  //造了30条数据
  'products|10': [{
    'id|+1': 1,
    name: '@sentence(10, 20)',
    'price|1000-2000': 1234,
    'comment|1-30': [
      {
        'id':'@id',
        'content': '@paragraph'
      }
    ]
  }]
})


export default [
  {
    url: '/vue-admin-template/product/list',
    type: 'get',
    response: config => {
      const products = data.products
      return {
        code: 20000,
        data: {
          total: products.length,
          items: products
        }
      }
    }
  }
]
