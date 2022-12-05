const connection=require('../database_connector')

class student
{
    add_record(req,res)
    {
        if(req.method=='POST')
        {
            var name,age,branch
            name=req.body.name
            age=req.body.age
            branch=req.body.brn
            connection.getConnection((err,myconnect)=>
            {
                if(err)
                {
                    res.send(err)
                    res.end()
                }
                else
                {
                    var q=`insert into student(name,age,branch) values('${name}','${age}','${branch}')`
                    myconnect.query(q,(err)=>
                    {
                        if(err)
                        {
                            res.send(err)
                            res.end()
                        }
                        else{
                            res.render('student_reg',{message:name+' Record Added'})
                            res.end()
                        }
                    })
                }
            })
        }
        else{
            res.render('student_reg',{message:0})
            res.end()
        }
    }


    display_record(req,res)
    {
        connection.getConnection((err,myconnect)=>
        {
            if(err)
            {
                res.send(err)
                res.end()
            }
            else
            {
                var q=`select * from student`
                myconnect.query(q,(err,result)=>
                {
                    if(err)
                    {
                        res.send(err)
                        res.end()
                    }
                    else
                    {
                        res.render('Display',{mydata:result})
                        res.end()
                    }
                })
            }
        })
    }

    Delete_student(req,res,id)
    {
        connection.getConnection((err,myconnect)=>
        {
            if(err)
            {
                res.send(err)
                res.end()
            }
            else
            {
                var q=`delete from student where id='${id}'`
                myconnect.query(q,(err)=>
                {
                    if(err)
                    {
                        res.send(err)
                        res.end()
                    }
                    else
                    {
                        this.display_record(req,res)
                    }
                })
            }
        })
    }
}

const obj=new student()

module.exports=obj