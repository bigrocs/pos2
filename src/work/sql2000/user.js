import user from '~/sql2000/model/user'
import { bcrypt } from '~/utils/crypto'
import sequelize from '~/sqlite3/model/terminalUser'
import { bulkCreate } from '~/sqlite3/terminalUser'

export function sync(req, res) {
    user.All().then(async response => {
      if (response) {
        const users = []
        response.forEach(item => {
          users.push({
            code: item.code,
            name: item.name,
            password: bcrypt.hashSync(item.password)
          })
        })
        if (users.length > 0) {
          // 重新构建数据库文件
          await sequelize.sync({
            force: true
          })
          bulkCreate(users).then(() => {
            res.send(true)
          }).catch(error => {
            res.send(new Error('插入用户数据失败:' + error.message))
          })
        }
      }
    }).catch(error => {
      res.send(new Error('查询用户失败:' + error.message))
    })
}
