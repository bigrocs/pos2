const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json()) // for parsing application/json

/**
 * router
 */
var sql2000 = require('./router/sql2000');
app.use('/sql2000', sql2000);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))