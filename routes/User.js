
const router = require("express").Router();
const User = require("../models/users");
const maincontroller=require("../controllers/main")
const ObjectId=require('mongodb').ObjectId


//------------------------------------------authentication-----------------------------------------------------
// var express=require("express")
// var session=require("express-session")
// var app=express()
// const MongodbSession=require('connect-mongodb-session')(session);
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// const store=new MongodbSession({
//     uri:"mongodb+srv://Ravkkrrttyy:xDKSBRRDI8nkn13w@cluster1.2pfid.mongodb.net/reactproject=true&w=majority",
//     collection:"newsessions",

// })
// app.use(session({
//     key:"admin",
//     secret:"any random string",
//     resave: true, 
//     saveUninitialized: true,
//     cookie: { maxAge:24 * 60 * 60 * 1000 },

//     store:store
// }))
// router.get("/",function(req,res){
//     res.render("Login")
// })
// router.post("/",async(req,res)=>{
//   console.log(req.body.username)
//   try {
   
//     const user= await User.find({"username":req.body.username});
// if(user==null){
//     res.send('user is not registered')
// }
// else{

//   console.log(req.session)
//   res.render('welcome')

//  // req.session.username=user.username;
// } 
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

//------------------------------------------------------------------------------------------------------------







router.get('/addbook',maincontroller.addbook)

router.get('/users',maincontroller.users)
router.get('/createuser',maincontroller.createuser)


router.post("/postuser", async (req, res) => {
 
    console.log("post is running")
    const newUser = new User(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

router.get("/searchbyname", async (req, res) => {
  try {
    let myusers=[];
    const tusers= await User.find({"username":req.query.username});

     if(tusers.length<2){
      myusers.push(tusers)
     }
     else{
      myusers=tusers
     }
     console.log(myusers)

    res.render("Allusers",{users:tusers})
  } catch (err) {
    res.status(500).json(err);
  }

})

router.get("/searchbybook", async (req, res) => {
    try {
      let myusers=[];
      const tusers= await User.find({});
  
   
      
  
      res.render("Alluser",{users:tusers})
    } catch (err) {
      res.status(500).json(err);
    }
  
  })



router.get("/searchbyfine", async (req, res) => {
    try {
      let myusers=[];
      const tusers= await User.find({});
  
   
      
  
      res.render("Alluserfine",{users:tusers})
    } catch (err) {
      res.status(500).json(err);
    }
  
  })

  router.get("/createuserauth",(req,res)=>{
    res.render("Loginuser")
  })


  router.post("/createuserauth",(req,res)=>{
    if(req.body.username=="Ravish456y@" && req.body.password=="mama5674Wyt"){
      res.redirect("/createuser")
    }
    else{
      res.send("You are not admin and you cannot create user")
    }
  })


  router.get("/payfine/:id",async(req,res)=>{
console.log("fine is running")
    try {
      var user = await User.findById(req.params.id)
      console.log(user.username)

      res.render("payfinet",{usert:user})
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }

  })

  router.post("/payfine",async(req,res)=>{
    let myusers=[]

console.log("paid fine is runnign")
    const updateuser = await User.findOneAndUpdate({
      "_id":ObjectId(req.body.userid)
      }, {
        $inc:{
          "fine":-req.body.paidfine
      },
       },
       
     )

     myusers= await User.find({});
     // res.send("Book is assigned to"+req.body.Userid)
    var g="Your fine is updated "
     res.render('Allusers',{titl:g,users:myusers})
    //res.send("Your fine is updated")
    
  })
module.exports=router;
