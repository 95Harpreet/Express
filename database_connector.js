const mysql_=require('mysql')

var connection=mysql_.createPool({
    host: "localhost",
    user: "root",
    password:"",
    database: "college",
    multipleStatements: true
})



module.exports=connection