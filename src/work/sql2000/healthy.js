import connection from '~/sql2000/model/connection'
import Store from '~/utils/electron-store'
/**
 * Sql2000 数据库状态
 * @returns {Promise}
 */
export function healthy(req, res) {
  const config = req.body
  if (config) {
    connection.Pool(config)
  }
  if (!connection.DB) {
    connection.Pool(config)
  }
  return connection.DB.authenticate().then(r=> {
    Store.set('healthy.isSql2000', true)
    res.send(true)
  }).catch((error) => {
    Store.set('healthy.isSql2000', false)
    res.send(error)
  })
}
