import sequelize from '~/sqlite3/model/terminalUser'
const User = sequelize.models.terminalUser
import { bcrypt } from '~/utils/crypto'

// 更新用户密码
export function Password(code, password) {
  return User.update({
      password: bcrypt.hashSync(password)
    }, {
      where: {
        code: code
      }
    })
}

// 根据ID获取支付信息
export function bulkCreate(pays) {
  return User.bulkCreate(pays)
}

// Auth 登陆验证
export function Auth ({ username, password }) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        code: username
      }
    }).then((project) => {
      if (project) {
        project.dataValues.loginTime = new Date() // 登录时间
        resolve({ user: project.dataValues, valid: bcrypt.compareSync(password, project.get('password')) })
      } else {
        reject(new Error('User does not exist'))
      }
    }).catch(error => {
      reject(error)
    })
  })
}