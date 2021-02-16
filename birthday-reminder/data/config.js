const mysql = require("mysql");
// Set database connection credentials
const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "api",
};
const pool = mysql.createPool(config);
module.exports = pool;
