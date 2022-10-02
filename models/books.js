const mongoose=require('mongoose')


const BookSchema=new mongoose.Schema({
    Bookname:{type:String,required:true},
    Booktopic:{type:String,required:true},
    category:{type:String,required:true},
    Bookauthor:{type:String},
     Bookrating:{type:Number},
    NumberofPages:{type:Number},
    issueDate:{type:Date},
    returnDate:{type:Date},
    status:{type:String},
    userid:{type:String}

},{
    timestamps:true
})
module.exports=mongoose.model("NewBookStore",BookSchema)