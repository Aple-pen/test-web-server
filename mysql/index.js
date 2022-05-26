const mysql = require("mysql")
const sql = require("./sql.js")

const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_LIMIT,
    host: "182.217.18.194",
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

const query = async (alias, values) => {
    console.log(process.env.MYSQL_PORT)
    return new Promise((resolve, reject) => pool.query(sql[alias], values, (error, results) => {
        if (error) {
            console.log("====================")
            console.log(error)
            reject({
                error
            })
        } else resolve(results)
    }))
}

module.exports = {
    query
}
