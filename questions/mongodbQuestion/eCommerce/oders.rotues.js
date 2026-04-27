const express=require('express');
const Orders = require('./oders.schima');

const routes=express.Router()

const dailyDemoOrders = [
  // October 1st
  { userId: "user_1", totalAmount: 250, status: "delivered", createdAt: new Date("2023-10-01T10:00:00Z") },
  { userId: "user_2", totalAmount: 150, status: "pending", createdAt: new Date("2023-10-01T11:30:00Z") },
  { userId: "user_3", totalAmount: 500, status: "delivered", createdAt: new Date("2023-10-01T14:00:00Z") },
  { userId: "user_4", totalAmount: 75, status: "cancelled", createdAt: new Date("2023-10-01T16:45:00Z") },
  { userId: "user_5", totalAmount: 320, status: "delivered", createdAt: new Date("2023-10-01T19:20:00Z") },
  { userId: "user_1", totalAmount: 400, status: "delivered", createdAt: new Date("2023-10-01T21:00:00Z") },
  { userId: "user_6", totalAmount: 110, status: "pending", createdAt: new Date("2023-10-01T22:10:00Z") },
  { userId: "user_2", totalAmount: 900, status: "delivered", createdAt: new Date("2023-10-01T23:50:00Z") },
  { userId: "user_7", totalAmount: 120, status: "delivered", createdAt: new Date("2023-10-01T08:00:00Z") },
  { userId: "user_8", totalAmount: 230, status: "pending", createdAt: new Date("2023-10-01T12:00:00Z") },

  // October 2nd
  { userId: "user_3", totalAmount: 600, status: "delivered", createdAt: new Date("2023-10-02T09:00:00Z") },
  { userId: "user_4", totalAmount: 50, status: "cancelled", createdAt: new Date("2023-10-02T10:30:00Z") },
  { userId: "user_9", totalAmount: 850, status: "delivered", createdAt: new Date("2023-10-02T13:45:00Z") },
  { userId: "user_5", totalAmount: 200, status: "pending", createdAt: new Date("2023-10-02T15:15:00Z") },
  { userId: "user_10", totalAmount: 330, status: "delivered", createdAt: new Date("2023-10-02T17:00:00Z") },
  { userId: "user_6", totalAmount: 45, status: "delivered", createdAt: new Date("2023-10-02T19:30:00Z") },
  { userId: "user_7", totalAmount: 710, status: "delivered", createdAt: new Date("2023-10-02T21:10:00Z") },
  { userId: "user_1", totalAmount: 140, status: "pending", createdAt: new Date("2023-10-02T22:50:00Z") },
  { userId: "user_8", totalAmount: 95, status: "delivered", createdAt: new Date("2023-10-02T08:20:00Z") },
  { userId: "user_2", totalAmount: 520, status: "delivered", createdAt: new Date("2023-10-02T11:00:00Z") },

  // October 3rd
  { userId: "user_3", totalAmount: 300, status: "delivered", createdAt: new Date("2023-10-03T10:00:00Z") },
  { userId: "user_9", totalAmount: 1100, status: "delivered", createdAt: new Date("2023-10-03T12:30:00Z") },
  { userId: "user_10", totalAmount: 45, status: "cancelled", createdAt: new Date("2023-10-03T14:45:00Z") },
  { userId: "user_4", totalAmount: 220, status: "delivered", createdAt: new Date("2023-10-03T16:15:00Z") },
  { userId: "user_5", totalAmount: 670, status: "delivered", createdAt: new Date("2023-10-03T18:00:00Z") },
  { userId: "user_6", totalAmount: 85, status: "pending", createdAt: new Date("2023-10-03T20:20:00Z") },
  { userId: "user_7", totalAmount: 150, status: "delivered", createdAt: new Date("2023-10-03T22:00:00Z") },
  { userId: "user_1", totalAmount: 900, status: "delivered", createdAt: new Date("2023-10-03T23:30:00Z") },
  { userId: "user_8", totalAmount: 400, status: "pending", createdAt: new Date("2023-10-03T09:10:00Z") },
  { userId: "user_2", totalAmount: 180, status: "delivered", createdAt: new Date("2023-10-03T11:45:00Z") },

  // October 4th
  { userId: "user_3", totalAmount: 700, status: "delivered", createdAt: new Date("2023-10-04T09:00:00Z") },
  { userId: "user_9", totalAmount: 50, status: "cancelled", createdAt: new Date("2023-10-04T11:20:00Z") },
  { userId: "user_10", totalAmount: 125, status: "delivered", createdAt: new Date("2023-10-04T13:40:00Z") },
  { userId: "user_4", totalAmount: 310, status: "pending", createdAt: new Date("2023-10-04T15:00:00Z") },
  { userId: "user_5", totalAmount: 420, status: "delivered", createdAt: new Date("2023-10-04T17:50:00Z") },
  { userId: "user_6", totalAmount: 240, status: "delivered", createdAt: new Date("2023-10-04T19:15:00Z") },
  { userId: "user_7", totalAmount: 615, status: "delivered", createdAt: new Date("2023-10-04T21:30:00Z") },
  { userId: "user_1", totalAmount: 75, status: "pending", createdAt: new Date("2023-10-04T22:45:00Z") },
  { userId: "user_8", totalAmount: 820, status: "delivered", createdAt: new Date("2023-10-04T08:30:00Z") },
  { userId: "user_2", totalAmount: 95, status: "delivered", createdAt: new Date("2023-10-04T10:10:00Z") },

  // October 5th
  { userId: "user_3", totalAmount: 550, status: "cancelled", createdAt: new Date("2023-10-05T09:30:00Z") },
  { userId: "user_9", totalAmount: 400, status: "delivered", createdAt: new Date("2023-10-05T11:45:00Z") },
  { userId: "user_10", totalAmount: 220, status: "delivered", createdAt: new Date("2023-10-05T13:10:00Z") },
  { userId: "user_4", totalAmount: 310, status: "delivered", createdAt: new Date("2023-10-05T15:30:00Z") },
  { userId: "user_5", totalAmount: 140, status: "pending", createdAt: new Date("2023-10-05T17:00:00Z") },
  { userId: "user_6", totalAmount: 500, status: "delivered", createdAt: new Date("2023-10-05T19:15:00Z") },
  { userId: "user_7", totalAmount: 90, status: "delivered", createdAt: new Date("2023-10-05T21:40:00Z") },
  { userId: "user_1", totalAmount: 320, status: "delivered", createdAt: new Date("2023-10-05T23:00:00Z") },
  { userId: "user_8", totalAmount: 110, status: "pending", createdAt: new Date("2023-10-05T08:15:00Z") },
  { userId: "user_2", totalAmount: 1000, status: "delivered", createdAt: new Date("2023-10-05T10:45:00Z") },

  // October 6th (25 orders to reach 75)
    { userId: "user_3", totalAmount: 500, status: "pending", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_9", totalAmount: 450, status: "cancelled", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_10", totalAmount: 120, status: "delivered", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_4", totalAmount: 370, status: "pending", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_5", totalAmount: 240, status: "pending", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_6", totalAmount: 50, status: "cancelled", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_7", totalAmount: 190, status: "pending", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_1", totalAmount: 30, status: "delivered", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_8", totalAmount: 180, status: "delivered", createdAt: new Date("2023-10-06T12:00:00Z") },
  { userId: "user_2", totalAmount: 700, status: "cancelled", createdAt: new Date("2023-10-06T12:00:00Z") },




  // October 7th 
    { userId: "user_3", totalAmount: 900, status: "pending", createdAt: new Date("2023-10-07T10:00:00Z") },
  { userId: "user_9", totalAmount: 110, status: "delivered", createdAt: new Date("2023-10-07T12:30:00Z") },
  { userId: "user_10", totalAmount: 405, status: "pending", createdAt: new Date("2023-10-07T14:45:00Z") },
  { userId: "user_4", totalAmount: 20, status: "cancelled", createdAt: new Date("2023-10-07T16:15:00Z") },
  { userId: "user_5", totalAmount: 560, status: "pending", createdAt: new Date("2023-10-07T18:00:00Z") },
  { userId: "user_6", totalAmount: 875, status: "delivered", createdAt: new Date("2023-10-07T20:20:00Z") },
  { userId: "user_7", totalAmount: 450, status: "cancelled", createdAt: new Date("2023-10-07T22:00:00Z") },
  { userId: "user_1", totalAmount: 90, status: "delivered", createdAt: new Date("2023-10-07T23:30:00Z") },
  { userId: "user_8", totalAmount: 430, status: "delivered", createdAt: new Date("2023-10-07T09:10:00Z") },
  { userId: "user_2", totalAmount: 10, status: "pending", createdAt: new Date("2023-10-07T11:45:00Z") },


];



//add fake Oders
routes.post('/generate-demo-orders', async (req, res) => {
    try {
      

        // Insert all 100 items at once
        const createdOrders = await Orders.insertMany(dailyDemoOrders) 

        res.status(201).json({
            message: "Successfully generated 100 demo orders",
            count: createdOrders.length
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error generating data", 
            error: error.message 
        });
    }
});

//get all oders
routes.get('/orders',async (req, res)=>{
    try{
    let data=await Orders.find({})

    res.status(200).json({orders:data})
}catch(e){
    console.log(e)
    res.status(500).json({
          message: "Error generating data", 
         error: error.message 
    })
}

})

/*
Find the total revenue generated per user, but only for orders with status "delivered", and sort users by highest revenue.
*/
routes.get('/question1', async (req, res)=>{
    let data=await Orders.aggregate([
        {$match:{status: "delivered"}},
        {$group:{
            _id: '$userId',
            totalRevenue: {$sum : '$totalAmount'},
            orderIds: {$push:'$_id'},
            totalOrders:{$sum: 1}
        }},
        {$sort:{
            totalRevenue:-1
        }}
    ])

    res.status(200).json({data})
})

/*
Same orders collection.

❓ Question:

Group orders by day (createdAt) and calculate:

total orders per day
total revenue per day

Return results sorted by date.
*/
routes.get('/question2', async(req, res)=>{
    const data=await Orders.aggregate([
        {$group:{
            _id: { $dateToString :{format:'%Y-%m-%d', date: "$createdAt"} },
            totalRevenue:{$sum : '$totalAmount'},
            OrderNumber:{$sum: 1}
        }},
        {$sort:{_id:-1}},
        
    ])

    res.status(200).json(data)
})

module.exports=routes
