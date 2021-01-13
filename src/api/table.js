import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function deleteProduct(params) {
  return request({
      url: '/vue-admin-template/table/delete/',
      method: 'get',
      params
  })
}


//注意：post请求参数需要通过data来传递
export function addProduct(params) {
  return request({
      url: '/vue-admin-template/table/list',
      method: 'post',
      data: params
  })
}