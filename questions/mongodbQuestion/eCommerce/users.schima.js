const mongoose=require('mongoose')

const Usar=new mongoose.Schema({
    email:{type:String, require:true, unique:true},
    userId:{type:String, require:true, unique:true},
    name:{type:String, require:true, },
})

const Usares=mongoose.model('Usares', Usar)

module.exports=Usares