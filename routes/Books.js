//var express=require("express")
//var app=express()
const ObjectId=require('mongodb').ObjectId

const router = require("express").Router();
const Book = require("../models/books");
const User = require("../models/users");


var session=require("express-session")







const maincontroller=require("../controllers/main");
const { application } = require('express');
router.get('/Books',maincontroller.books)
router.get('/submitbooks',maincontroller.submitbooks)
router.get('/assignbook',maincontroller.assignbooks)
router.get('/',maincontroller.home)

router.post("/postbook", async (req, res) => {
 
    console.log(req.body)
    const newBook = new Book(req.body);
    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(500).json(err);
    }
  
});



router.get("/searchbybookname",async (req, res) => {
  console.log("searching by bookname")
    try {
      let mybooks=[]
       mybooks = await Book.find({"Bookname":req.query.bookname});
      console.log(mybooks)
      res.render("Allbooks",{mybooks:mybooks})
    } catch (err) {
      res.status(500).json(err);
    }
  })






router.get("/assignnewbook/:id",async (req, res) => {
console.log("assignbook")
  try {
    const book = await Book.findById(req.params.id);
    res.render("assignnewbook",{book:book})
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get("/returnnewbook/:id",async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    //res.status(200).json(book);
    var dd = String(book.issueDate.getDate()).padStart(2, '0');
    var mm = String(book.issueDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = book.issueDate.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;

    const user = await User.findById(book.userid);




    res.render("submitbook",{book:book,issuedate:today,user:user})
  } catch (err) {
    res.status(500).json(err);
  }
})



router.post("/assignbook",async (req, res) => {
      //var id = mongoose.Types.ObjectId();
      let mybooks=[];
      console.log(ObjectId(req.body.Userid))
    try {
      const updatedUser = await User.updateOne({

        "_id":ObjectId(req.body.Userid)
      },{
          $push:{
            "Books":{
              "_id":req.body.Bookid,
              "Bookname":req.body.Bookname,
              "Booktopic":req.body.Booktopic,
              "category":req.body.category,
              "Bookauthor":req.body.Bookauthor,
              "NumberofPages":req.body.NumberofPages,
              "Bookrating":req.body.Bookrating,
              "IssueDate":req.body.IssueDate,
             

            }
          }


      }
      
      );
      try {
        const updatebook = await Book.findOneAndUpdate({
         "_id":ObjectId(req.body.Bookid)
         }, {
            $set: {
              "status":"Assigned",
              "userid":req.body.Userid,
              "issueDate":req.body.IssueDate,
            },
          },
          
        )


       
        mybooks= await Book.find({});
       // res.send("Book is assigned to"+req.body.Userid)
      var g="Book is assigned to "+req.body.Userid
       res.render('Allbooks',{titl:g,mybooks:mybooks})
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }

            
    } catch (err) {
      res.status(500).json(err);
    }

  
}); 



router.post("/returnnewbook",async (req, res) => {
  let mybooks=[]
  const d2 = new Date(req.body.issueDate);
  var newid = ObjectId(req.body.myuserid);
 var dd1=req.body.returnDate

//  var dd = String(dd1.getDate()).padStart(2, '0');
//     var mm = String(dd1.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = dd1.getFullYear();
    
//    var today = dd + '-' + mm + '-' + yyyy;
 var dd2=req.body.issueDate

//console.log(dd2)
///console.log(dd1)
 const date1 = new Date(dd1);
 const date2 = new Date(dd2);
 const diffTime = Math.abs(date2 - date1);
 const fine = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

 

  
  console.log("the cleardata")

   const result = await User.updateOne({
      "_id":req.body.Userid   
   }, {
    $pull: {
      "Books": { _id:req.body.Bookid }
    }
}, { new: true });


const updateuser = await User.findOneAndUpdate({
  "_id":ObjectId(req.body.Userid)
  }, {
    $inc:{
      "fine":fine
  },
   },
   
 )


try {
  const updatebook = await Book.findOneAndUpdate({
   "_id":ObjectId(req.body.Bookid)
   }, {
      $set: {
        "status":"Not Assigned",
        "userid":"",
        "issueDate":"",
        "returnDate":"",
      },
    },
    
  )

  mybooks= await Book.find({});
  // res.send("Book is assigned to"+req.body.Userid)
 var g="Book is returned By "+req.body.Userid
  res.render('Allbooks',{titl:g,mybooks:mybooks})
 // res.send("Book is returned By"+req.body.Userid)
} catch (err) {
  console.log(err)
  res.status(500).json(err);
}

})

router.get("/searchbystatus", async (req, res) => {
    try {
      let books=[];

      books= await Book.find({"status":req.query.status}); 
      res.render("Allbooks",{mybooks:books})
    } catch (err) {
      res.status(500).json(err);
    }
  
  })


router.get("/addbookauth",(req,res)=>{
  res.render("Login")
})

router.post("/addbookauth",(req,res)=>{
  if(req.body.username=="Ravish456y@" && req.body.password=="mama5674Wyt"){
    res.redirect("/addbook")
  }
  else{
    res.send("You are not admin and you cannot post book")
  }
})

module.exports=router;


