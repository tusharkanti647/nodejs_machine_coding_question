const mongoose=require('mongoose')

const Order=new mongoose.Schema({
  userId:{type:String, required:true, },
  totalAmount:{type:Number, default:0}, 
  status:{type:String, enum: ['delivered', 'pending', 'cancelled']}, // "delivered", "pending", "cancelled"
},{ timestamps: true })

const Orders = mongoose.model('Orders', Order);
module.exports=Orders