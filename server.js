var express=require("express")


//const mongoose=require('mongoose')
var app=express()
const path=require('path')
const http=require('http')
var router = express.Router();
const db=require("./db")
const server=http.createServer(app);

//const fs=require('fs')
var userRouter=require('./routes/User')
var Bookrouter=require('./routes/Books')
var login=require('./routes/Login')
//app.use("/public",express.static(__dirname +"/public"))
//app.use(router);

//-----------------------------------------------------------------------------------------------------------





app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs')

//app.use(login)

//app.use(auth)
app.use(userRouter);
app.use(Bookrouter);


// function auth(req,res,next){
//     if(req.query.username=="ravish"){
//         res.render('welcome')

//         next()
//     }
//     else{
//         res.send("no admin")
//     }
// }
// router.get('/users',(req,res,next)=>{
//     console.log("users");
// res.render('Allusers',{title:"Allusers"})
// })

//app.use(router);
//app.use('/users',userRouter)


app.use(function(error,req,res,next){
res.locals.message=error.message;
res.locals.error=req.app.get('env')=='development'?error:{}
res.status(error.status || 500)
res.render('error')
})
///------------------------------using simple technique to handle requests-----------------------------
//const server=http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type':'text/html'})


// if(request.url=='/post'){
//     response.write("this is post")
// if(request.method=='POST'){
//     response.end("This is post")
// }
// }

// else if(request.url=='/get'){
//     response.write("this is get")

// if(request.method=='GET'){
//     response.end("This is get")
// }
// }


// else if(request.url=='/put'){
//     response.write("this is put")

// if (request.method=='PUT'){
//     response.end('This is put')
// }
// }

// else if(request.url=='/delete'){
//     response.write("this is delete")

// if(request.method=='DELETE'){
//     response.end('this is delete')
// }
// }


// else{

//     response.end('NONE FOUND')
// }
// response.end();


// if(request.url=='/'){
//     render(response,'Homepage.html')
// }


// }).listen(3000,()=>{
//     console.log("server is running at 3000")
// })

const PORT=process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log("port is running")
})

//---------------------------------------using simple techinque for render-----------------------------
// const render=(response,file)=>{

// fs.readFile('./public/'+file,(error,data)=>{
//     if(error){
//         response.writeHead(200,{'Content-Type':'text/html'})
//         response.end("file not found")
//     }else{
//         response.writeHead(200,{'Content-Type':'text/html'})
//         return response.end(data);
//     }
// })
// }
//module.exports=app

