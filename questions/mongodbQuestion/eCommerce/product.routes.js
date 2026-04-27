const mongoose=require('mongoose')
const express=require('express')

const Product=new mongoose.Schema({
  quantity:{type:Number, default:0},
  price:{type:Number, default:0},
  name:{type:String,}
})

const Products=mongoose.model('Products', Product)

const routes=express.Router()


const productData = [
  { name: "Wireless Mouse", price: 25, quantity: 50 },
  { name: "Mechanical Keyboard", price: 85, quantity: 30 },
  { name: "Gaming Monitor", price: 299, quantity: 15 },
  { name: "USB-C Cable", price: 12, quantity: 100 },
  { name: "Bluetooth Speaker", price: 45, quantity: 40 },
  { name: "Laptop Stand", price: 35, quantity: 25 },
  { name: "Webcam 1080p", price: 60, quantity: 20 },
  { name: "External Hard Drive", price: 110, quantity: 18 },
  { name: "Noise Cancelling Headphones", price: 199, quantity: 12 },
  { name: "Gaming Chair", price: 250, quantity: 8 },
  { name: "Power Bank", price: 40, quantity: 60 },
  { name: "Smartphone Case", price: 15, quantity: 150 },
  { name: "LED Desk Lamp", price: 30, quantity: 35 },
  { name: "Graphics Tablet", price: 150, quantity: 10 },
  { name: "Wifi Router", price: 80, quantity: 22 },
  { name: "Microphone Arm", price: 45, quantity: 14 },
  { name: "Electric Kettle", price: 35, quantity: 28 },
  { name: "Fitness Tracker", price: 55, quantity: 45 },
  { name: "HDMI Switch", price: 20, quantity: 55 },
  { name: "Desk Mat", price: 25, quantity: 70 }
];



//add fake product data
routes.post('/products', async(req, res)=>{
    try{
    let data=await Products.insertMany(productData)
    res.status(201).json({status:'sucessafully', message:'products are succesafullay added'})
}catch(e){
    console.log(e)
    res.status(500).json({error:'internal server errior'})
}
})

/*

❓ Question:

Find the top 5 products by total revenue (quantity * price).
*/
routes.get('/question4', async(req, res)=>{
    const data=await Products.aggregate([
        {$project:{
            name:1,
            _id:1,
            ravinue : {$multiply :['$quantity', '$price']}
        }},
        {$sort : {ravinue :-1}},
        {$limit:5}
    ])

    res.status(200).json(data)
})


module.exports={routes,Products}


