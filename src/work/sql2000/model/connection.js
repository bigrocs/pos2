const Sequelize = require('sequelize')
import Store from '~/utils/electron-store'

function sequelize(config) {
  return new Sequelize(config.database, config.username, config.password, {
    dialect: 'mssql',
    host: config.host,
    port: config.port,
    dialectOptions: {
      options: {
        useUTC: false,
        tdsVersion: '7_1',
        enableArithAbort: false,
        // requestTimeout: 5000 // 超时时间 5s
      }
    },
    logging: false
  })
}

const connection = {
  DB: '',
  Pool(config) {
    if (config) {
      this.DB = sequelize(config)
      return this
    }
    const store = Store.store
    if (Object.prototype.hasOwnProperty.call(store, 'pos')) {
      this.DB = sequelize({
        database: store.pos.sql2000_database,
        username: store.pos.sql2000_username,
        password: store.pos.sql2000_password,
        host: store.pos.sql2000_host,
        port: store.pos.sql2000_port
      })
      return this
    }
  }
}
export default connection
