class logic
{
    find_subtraction_of_two_numbers(req,res)
    {
        if(req.method=='POST')
        {
                var a=req.body.ist
                var b=req.body.iind
                var c=parseInt(a)-parseInt(b)
                res.render('subtract',{message:"subtraction is "+c})
              res.end()  


        }
        else
        {
              res.render('subtract',{message:0})
              res.end()  
        }
    }
}

const obj=new logic()
module.exports=obj