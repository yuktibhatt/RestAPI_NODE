const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "empdb"
})

client.connect()
.then(() => console.log("Connected Successfully"))
.then(() => client.query("select * from employee"))
.then(results => console.table(results.rows))
.catch( e => console.log)
.finally(() => client.end())

