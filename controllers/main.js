
const User = require("../models/users");
const Book = require("../models/books");

module.exports.books=
    async(req,res,next)=>{
      try {
        let mybooks=[];
          mybooks= await Book.find({});
        // res.status(200).json(mybooks.reverse());
         res.render('Allbooks',{mybooks:mybooks,title:"All Books"})
       } catch (err) {
         res.status(500).json(err);
       }       
        }

        


        module.exports.users=async (req, res) => {
            console.log("get is running")
               try {
                let users=[];
                  users = await User.find({});
                // res.status(200).json(users.reverse());
                 res.render('Allusers',{users:users})
               } catch (err) {
                 res.status(500).json(err);
               }
             
           }
        module.exports.assignbooks=(req,res,next)=>{
            // console.log("users");
         res.render('assignbook',{title:"assignbook"})
         }
        module.exports.createuser=(req,res,next)=>{
            // console.log("users");
         res.render('createuser',{title:"CreateUsers"})
         }
        module.exports.submitbooks=(req,res,next)=>{
            // console.log("users");
         res.render('submitbook',{title:"Submitbook"})
         }
        module.exports.home=(req,res,next)=>{
            // console.log("users");
         res.render('welcome',{title:"welcome"})
         }
        module.exports.addbook=(req,res,next)=>{
            // console.log("users");
              res.render('addbook',{title:"addbook"})

           
         }
