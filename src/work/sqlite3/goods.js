import sequelize from '~/sqlite3/model/goods'
const Goods = sequelize.models.good

export function findOne(options) {
  return Goods.findOne(options)
}

export function destroy(options) {
  return Goods.destroy(options)
}


// 通过条形码获取商品
export function barcodeByGoods(barcode) {
  return Goods.findOne({ where: { barCode: barcode } })
}

export function plucodeByGoods(pluCode) {
  return Goods.findOne({ where: { pluCode: pluCode } })
}

// 根据ID获取支付信息
export function bulkCreate(pays) {
  return Goods.bulkCreate(pays)
}
