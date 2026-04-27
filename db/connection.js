const mongoose=require('mongoose')

function connectDb(){
mongoose.connect('mongodb://127.0.0.1:27017/eCommerce').then((val)=>{
    console.log('mongodb is connected now')
}).catch((err)=>{
    console.log(err)
})}

module.exports=connectDb