const Sequelize = require('sequelize')
import Store from '@/renderer/utils/electron-store'
const store = Store.store
console.log(store);

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
  Pool: (config) => {
    if (config) {
      connection.DB = sequelize(config)
      return connection
    }
    connection.DB = sequelize({
      database: store.state.settings.sql2000_database,
      username: store.state.settings.sql2000_username,
      password: store.state.settings.sql2000_password,
      host: store.state.settings.sql2000_host,
      port: store.state.settings.sql2000_port
    })
    return connection
  }
}
export default connection
