import sequelize from '~/sqlite3/model/pay'
const Pay = sequelize.models.pay

// 获取支付信息
export function Get(listQuery) {
  return Pay.findAll({
      where: listQuery.where
  })
}

// 根据ID获取支付信息
export function GetById(id) {
  return Pay.findOne({
      where: {
        id: id
      }
    })
}

// 根据ID获取支付信息
export function bulkCreate(pays) {
  return Pay.bulkCreate(pays)
}