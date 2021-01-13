import Mock from 'mockjs'

// const data = Mock.mock({
//   //造了30条数据
//   'items|10': [{
//     'id|+1': 1,
//     title: '@cword(2,5)',
//     num: '@integer(1,100)',
//     price: '@integer(300, 5000)',
//     display_time: '@datetime'
//   }]
// })
const data = {
  items: [{
    "id": 1,
    "title": "华为",
    "num": 21,
    "price": 2499,
  },{
    "id": 2,
    "title": "小米",
    "num": 26,
    "price": 9499,
  },{
    "id": 3,
    "title": "苹果",
    "num": 21,
    "price": 699,
  },{
    "id": 4,
    "title": "vivo",
    "num": 21,
    "price": 2499,
  },{
    "id": 5,
    "title": "爱酷",
    "num": 21,
    "price": 2499,
  },{
    "id": 6,
    "title": "opper",
    "num": 21,
    "price": 2499,
  },{
    "id": 7,
    "title": "魅族",
    "num": 21,
    "price": 2499,
  },{
    "id": 8,
    "title": "锤子",
    "num": 21,
    "price": 2499,
  },{
    "id": 9,
    "title": "香蕉",
    "num": 21,
    "price": 2499,
  },]
}
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
  },
  {
    url: '/vue-admin-template/table/delete',
    type: 'get',
    response: config => {
      const id = config.query.id
      const items = data.items
      var index = items.findIndex(item => {
        if (item.id == id) {
          return true;
        }
      })
      items.splice(index, 1);
      return {
        code: 20000,
        data: {
          message: "删除商品成功"
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/new',
    type: 'post',
    response: config => {
      var product = config.body;
      console.log(product, "99999999999999999999999999")
      data.items.push(product);
      return {
        code: 20000,
        data: {
          message: "添加商品成功"
        }
      }
    }
  }
]
