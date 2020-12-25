import request from '@/utils/ipc-request'

export function healthy(data) {
  return request({
    url: '/sql2000/healthy',
    method: 'post',
    data: data
  })
}

export function syncGoods() {
  return request({
    url: '/sql2000/syncGoods',
    method: 'post',
  })
}

export function syncPay() {
  return request({
    url: '/sql2000/syncPay',
    method: 'post',
  })
}

export function syncUser() {
  return request({
    url: '/sql2000/syncUser',
    method: 'post',
  })
}

