let mysql = require('mysql');


let conn = mysql.createConnection({
  database:'test',
  host: '192.168.64.2',
  user: "Affou",
  password: "12345",
  connectionLimit : 10
  
});

module.exports=conn;
