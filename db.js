const mongoose=require('mongoose')
require('dotenv').config()

const MONGOURI=process.env.MONGOURI;
//const uri="mongodb+srv://Ravkkrrttyy:xDKSBRRDI8nkn13w@cluster1.2pfid.mongodb.net/reactproject=true&w=majority";
const uri=MONGOURI;

module.exports=mongoose.connect(uri,{useNewUrlParser:true , useUnifiedTopology:true}).then(result=>{
    console.log("successfully connected")
}).catch(error=>{
    console.log(error)
})