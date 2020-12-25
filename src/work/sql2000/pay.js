import pay from '~/sql2000/model/pay'
import sequelize from '~/sqlite3/model/pay'
import { bulkCreate} from '~/sqlite3/pay'

export function sync(req, res) {
  pay.All().then(async response => {
      if (response) {
        const pays = []
        response.forEach(item => {
          var type = 'pay'
          switch (item.type) {
            case '0':
              type = 'cashPay'
              break
            case '1':
              type = 'cardPay'
              break
            case '4':
              type = 'remoteCardPay'
              break
            case '6':
              type = 'scanPay'
              break
          }
          pays.push({
            id: parseInt(item.code),
            name: item.name,
            type: type
          })
        })
        if (pays.length > 0) {
          // 重新构建数据库文件
          await sequelize.sync({
            force: true
          })
          bulkCreate(pays).then(() => {
            res.send(true)
          }).catch(error => {
            res.send(new Error('插入支付方式失败:' + error.message))
          })
        }
      }
    }).catch(error => {
      res.send(new Error('查询支付方式失败:' + error.message))
    })
}
