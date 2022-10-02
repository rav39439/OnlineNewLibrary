const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    Qualification:{type:String,required:true},
    Useremail:{type:String},
    Phoneno:{type:Number},
    Books:{type:Array},
    //IssueDate:{type:Date},
   // ReturnDate:{type:Date}
   fine:{type:Number}

},{
    timestamps:true
})
module.exports=mongoose.model("NewProjectUsers",UserSchema)