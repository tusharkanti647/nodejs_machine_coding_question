
const express=require('express')
const Usares = require('./users.schima');
const Orders = require('./oders.schima');


const routes=express.Router()

const userData = [
  { userId: "user_1", email: "tushar1@example.com", name: "Tushar Das" },
  { userId: "user_2", email: "amit2@example.com", name: "Amit Sharma" },
  { userId: "user_3", email: "sneha3@example.com", name: "Sneha Kapoor" },
  { userId: "user_4", email: "rahul4@example.com", name: "Rahul Verma" },
  { userId: "user_5", email: "priya5@example.com", name: "Priya Singh" },
  { userId: "user_6", email: "vikas6@example.com", name: "Vikas Gupta" },
  { userId: "user_7", email: "neha7@example.com", name: "Neha Reddy" },
  { userId: "user_8", email: "arjun8@example.com", name: "Arjun Malhotra" },
  { userId: "user_9", email: "pooja9@example.com", name: "Pooja Bose" },
  { userId: "user_10", email: "rohit10@example.com", name: "Rohit Mehra" }
];

//damy users data
routes.post('/users', async(req, res)=>{
    try{
        let data=await Usares.insertMany(userData)


        res.status(201).json({status:'sucefull', message:'user data store sucefullay'})

    }catch(e){
        console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

/*
Collections:

users
orders
❓ Question:

For each user, show:

name
number of orders
total spent

Include users even if they have zero orders.
*/

routes.get('/question3', async(req, res)=>{
    let data=await Orders.aggregate([
        {$match:{status: "delivered"}},
        {$group:{
            _id: '$userId',
            totalBuy: {$sum : '$totalAmount'},
            quantity:{$sum : 1}
        }},
         // join users collection
      {
        $lookup: {
          from: "usares", //join collection name
          localField: "_id", //local key filed
          foreignField: "userId", // join collection key name
          as: "user" // creted object filed name
        },
      },

          // convert array -> object
      {
        $unwind: "$user"
      },

      {$project:{
        _id:1,
        totalBuy: 1,
        quantity: 1,
        name:"$user.name"
      }}
   
    ])

    res.status(200).json(data)
})



module.exports=routes