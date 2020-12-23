import connection from '@/work/sql2000/model/connection'

/**
 * Sql2000 数据库状态
 * @returns {Promise}
 */
export function healthy(config) {
  return new Promise((resolve, reject) => {
    if (config) {
      connection.Pool(config)
    }
    console.log(connection.DB.authenticate());
    
    connection.DB.authenticate().then(() => {
      resolve(true)
    }).catch((error) => {
      console.log(error);
      
      reject(error)
    })
  })
}
