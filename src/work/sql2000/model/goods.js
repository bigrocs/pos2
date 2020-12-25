const Sequelize = require('sequelize')
import connection from '~/sql2000/model/connection'
import { trim } from '~/utils'
const pool = connection.Pool()
import Store from '~/utils/electron-store'
import { parseTime } from '@/utils/index'

// 删除字符串两边空格
function handerItem(items) {
  Object.keys(items).forEach(key => {
    if (typeof items[key] === 'string') {
      items[key] = trim(items[key])
    }
  })
}
const goods = {
  // 获取商品列表
  List(updatedAt, endAt) {
    return new Promise((resolve, reject) => {
      const store = Store.store
      if (!store.healthy.isSql2000) {
        reject(Error('服务器断开！！(SQL2000服务器断开)'))
      }

      let depRange = `DepCode != ''`
      if (store.pos.depRange) {
        depRange = 'DepCode between ' + store.pos.depRange.replace('-', ' AND ') + ' '
      }
      // sql  列表查询语句(状态启用商品)
      const sql = `
          select 
            PluCode as pluCode ,
            BarCode barCode,
            XgDate as updatedAt,
            PluName as name,
            PluAbbrName,
            Unit as unit,
            Spec as spec,
            DepCode as depCode,
            SupCode,
            HJPrice,
            SPrice as price,
            WJPrice,
            HyPrice,
            PfPrice,
            PluStatus as status,
            IsWeight as type,
            ClsCode,
            BrandCode,
            JTaxRate,
            YhType,
            MgType,
            IsDecimal,
            Tag
          from tBmPlu 
          WHERE ` + depRange + ` AND XgDate >= '` + parseTime(updatedAt, '{y}-{m}-{d} {h}:{i}:{s}') + `' And XgDate < '` + parseTime(endAt, '{y}-{m}-{d} {h}:{i}:{s}') + `'
          ORDER BY XgDate Asc
      `

      pool.DB.query(sql,
        {
          type: Sequelize.QueryTypes.SELECT
        }
      ).then(response => {
        response.forEach(items => {
          handerItem(items)
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default goods
