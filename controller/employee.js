const { json } = require('body-parser')                              //employee ko student likha hai mene
const connection = require('../database_connector')

class Emp {
    display_record(req, res) {
        connection.getConnection((err, myconnect) => {
            if (err) {
                res.send(err)
                res.end()
            }
            else {
                var q = 'select * from student'
                myconnect.query(q, (err, result) => {
                    if (err) {
                        res.send(err)
                        res.end()
                    }
                    else {
                        res.send(result)
                        res.end()
                    }
                })
            }
        })
    }

    add_students(req, res) {
        var name = req.body.name
        var age = req.body.age
        var branch = req.body.branch
        var id = req.body.id

        connection.getConnection((err, myconnect) => {
            if (err) {
                res.send(err)
                res.end()
            }
            else {
                var q = `insert into student(name,age,branch,id)values('${name}','${age}','${branch}','${id}')`
                myconnect.query(q, (err) => {
                    if (err) {
                        res.send(err)
                        res.end()
                    }
                    else {
                        res.send({ Message: 'Record inserted Successfully' })
                        res.end()
                    }
                })
            }
        })
    }


    add_employee(req, res) {
        if (req.method == 'POST') {

            var name, age, photo
            name = req.body.nm
            age = req.body.ag
            photo = req.file.filename
            connection.getConnection((err, myconnect) => {
                if (err) {
                    res.send(err)
                    res.end()
                }
                else {
                    var q = `insert into employee(name,age,photo) values('${name}','${age}','${photo}')`
                    myconnect.query(q, (err) => {
                        if (err) {
                            res.send(err)
                            res.end()
                        }
                        else {
                            res.render('employee', { message: name + 'Record Save' })
                            res.end()
                        }
                    })
                }
            })
        }
        else {
            res.render('employee', { message: 0 })
            res.end()
        }


    }

    display_emp(req, res) {
        connection.getConnection((err, myconnect) => {
            if (err) {
                res.send(err)
                res.end()
            }
            else {
                var q = `select * from employee`
                myconnect.query(q, (err, result) => {
                    if (err) {
                        res.send(err)
                        res.end()
                    }

                    else {
                        res.render("display_emp", { mydata: result })
                        res.end()
                    }
                })
            }
        })
    }

    down_load(req, res) {
        var sno = req.params.sno
        connection.getConnection((err, myconnect) => {
            if (err) {
                res.send(err)
                res.end()
            }
            else {
                var q = `select * from employee where sno='${sno}'`
                myconnect.query(q, (err, result) => {
                    if (err) {
                        res.send(err)
                        res.end()
                    }

                    else {
                        var filename = result[0].photo
                        res.download('./public/upload/' + filename, (err) => {
                            if (err) {
                                res.send(err);
                                res.end();
                            }
                        })
                    }
                })
            }
        })

    }
}



var obj = new Emp()
module.exports = obj;