var mysql = require('mysql');


dbConnection = mysql.createConnection({
      user: "root",
      password: "gMat45pre87",
      database: "chat"
});

module.exports = dbConnection;




