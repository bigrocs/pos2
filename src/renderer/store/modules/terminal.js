

const state = {
  orderInfo: { // 订单汇总信息
    count: 0, // 总数
    returns: 0, // 退款
    total: 0, // 总金额
    publish: 0, // 未上报
    pays: [],
    payTotal: 0 // 实际扫码支付总金额
  },
}

const mutations = {
  SET_ORDER_INFO: (state, orderInfo) => { // 自定义输收款金额
    state.orderInfo = orderInfo
  },
}

const actions = {
  changeOrderInfo({ commit }) {
    return new Promise((resolve, reject) => {
      
      // OrderModel.then(m => {
      //   m.Info(store.state.user.username).then(info => {
      //     commit('SET_ORDER_INFO', info)
      //     resolve(info)
      //   }).catch(err => {
      //     reject(err)
      //   })
      // }).catch(err => {
      //   reject(err)
      // })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
