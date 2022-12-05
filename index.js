//body-parser used to get data from a form
//ejs=embedded javascript


const express=require('express')
const app=express()
const ourrouter=require('./route')
const port=1234


app.set('view engine','ejs')                              //to use ejs as view engine

app.use('/public',express.static(__dirname+'/public'))          //to use external css(my.css)




app.use('/',ourrouter)

app.get('/chd',ourrouter)
app.get('/addpage',ourrouter)
app.post('/add_now',ourrouter)
app.use('/find_multi',ourrouter)
app.use('/subtract',ourrouter)
app.use('/add_info',ourrouter)
app.use('/student_display',ourrouter)
app.use('/delete_stu/:myid',ourrouter)
app.use('/display_student',ourrouter)            //employee=student likhya me
app.use('/add_student',ourrouter)
app.use('/emp',ourrouter)
app.use('/emp_display',ourrouter)
app.use('/download_now/:sno',ourrouter)

app.listen(port,()=>
{
    console.log(`click here http://localhost:${port}`)
})