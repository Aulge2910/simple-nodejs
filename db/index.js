// setup database
 const mysql = require('mysql')

 const db = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:"root",
    password:"",
    database: "mydb01"
 })

 db.connect(err => {
    if (err) {
        console.error("fail:", err);
    } else {
        console.log("success");
    }
});

 module.exports = db