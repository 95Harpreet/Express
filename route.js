const express=require('express')
const router=express.Router()
const bodyparser=require('body-parser')
const url_encoded=bodyparser.urlencoded({extended:false})
const multer=require('multer')

const crypto=require('crypto')
const path = require('path')
const e = require('express')



const object_of=require('./controller/Test')

const student_object=require('./controller/student')



const employee_obj=require('./controller/employee')






var storage=multer.diskStorage({
    destination:"./public/upload",
    filename:(req,file,st)=>{
        crypto.pseudoRandomBytes(16,(err,raw)=>
        {
            if(err)
            {
                return st(err);
            }
            else
            {
                st(null,raw.toString("hex") + path.extname(file.originalname));
            }
        });
    },
});

var upload=multer({storage: storage});


router.get('/',(req,res)=>                                    //to open page
{
    res.render('home')
    res.end()
})

router.get('/chd',(req,res)=>
{
    res.render('about')
    res.end()
})

router.get('/addpage',(req,res)=>
{
    res.render('addition',{result:0})
    res.end()
})

router.post('/add_now',url_encoded,(req,res)=>
{
    var a=req.body.ist
    var b=req.body.iind
    var c=parseInt(a)+parseInt(b)
    res.render('addition',{result:"sum is "+c})
    res.end()

})
router.use('/find_multi',url_encoded,(req,res)=>                               //use=combination of get and post
{
    if(req.method=='GET')
    {
        res.render('multiplication',{result:0})
        res.end()
    }
    else
    {
        var a,b,c
        a=req.body.ist
        b=req.body.iind
        c=parseInt(a)*(b)
        res.render('multiplication',{result:"result is "+c})
        res.end()
    }
})


router.use('/subtract',url_encoded,(req,res)=>
{
   
    object_of.find_subtraction_of_two_numbers(req,res)
})

router.use('/add_info',url_encoded,(req,res)=>
{
    student_object.add_record(req,res)
})
router.use('/student_display',(req,res)=>
{
    student_object.display_record(req,res)
})
router.use('/delete_stu/:myid',(req,res)=>
{
    var id=req.params.myid
    student_object.Delete_student(req,res,id)
})


router.use('/display_student',(req,res)=>
{
    employee_obj.display_record(req,res)
})

router.use('/add_student',url_encoded,(req,res)=>
{
    employee_obj.add_students(req,res)
})

router.use('/emp',upload.single("ph"),url_encoded,(req,res)=>
{
    employee_obj.add_employee(req,res)
})


router.use('/emp_display',(req,res)=>
{
    employee_obj.display_emp(req,res)
})


router.use('/download_now/:sno',(req,res)=>
{
    employee_obj.down_load(req,res)
})

module.exports=router



