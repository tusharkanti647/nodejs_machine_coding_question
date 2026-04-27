const mongoose=require('mongoose')
const express=require('express')

const loginSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loginTime: { type: Date, default: Date.now }
});

const Logins = mongoose.model('Logins', loginSchema);

const loginData = [
  // --- JANUARY 2024 ---
  { userId: "user_1", loginTime: new Date("2024-01-05T08:30:00Z") },
  { userId: "user_1", loginTime: new Date("2024-01-07T12:00:00Z") }, // Duplicate login user_1
  { userId: "user_2", loginTime: new Date("2024-01-10T09:15:00Z") },
  { userId: "user_3", loginTime: new Date("2024-01-12T14:45:00Z") },
  { userId: "user_2", loginTime: new Date("2024-01-15T10:30:00Z") }, // Duplicate login user_2
  { userId: "user_4", loginTime: new Date("2024-01-18T11:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-01-20T16:20:00Z") },
  { userId: "user_1", loginTime: new Date("2024-01-22T08:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-01-25T13:10:00Z") },
  { userId: "user_3", loginTime: new Date("2024-01-28T09:40:00Z") },
  { userId: "user_7", loginTime: new Date("2024-01-29T15:55:00Z") },
  { userId: "user_4", loginTime: new Date("2024-01-30T17:05:00Z") },
  { userId: "user_8", loginTime: new Date("2024-01-31T22:30:00Z") },
  { userId: "user_9", loginTime: new Date("2024-01-31T23:50:00Z") },
  { userId: "user_10", loginTime: new Date("2024-01-02T10:00:00Z") },
  // ... adding more for January
  { userId: "user_1", loginTime: new Date("2024-01-03T11:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-01-04T12:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-01-06T13:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-01-08T14:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-01-09T15:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-01-11T16:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-01-13T17:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-01-14T18:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-01-16T19:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-01-17T20:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-01-19T21:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-01-21T22:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-01-23T23:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-01-24T08:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-01-26T09:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-01-27T10:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-01-01T11:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-01-02T12:00:00Z") },

  // --- FEBRUARY 2024 ---
  { userId: "user_1", loginTime: new Date("2024-02-01T10:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-02-02T11:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-02-03T12:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-02-04T13:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-02-05T14:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-02-06T15:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-02-07T16:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-02-08T17:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-02-09T18:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-02-10T19:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-02-11T20:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-02-12T21:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-02-13T22:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-02-14T23:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-02-15T08:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-02-16T09:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-02-17T10:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-02-18T11:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-02-19T12:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-02-20T13:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-02-21T14:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-02-22T15:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-02-23T16:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-02-24T17:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-02-25T18:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-02-26T19:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-02-27T20:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-02-28T21:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-02-29T22:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-02-29T23:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-02-10T10:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-02-11T11:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-02-12T12:00:00Z") },

  // --- MARCH 2024 ---
  { userId: "user_1", loginTime: new Date("2024-03-01T10:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-03-02T11:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-03-03T12:00:00Z") }, // user_1 very active
  { userId: "user_4", loginTime: new Date("2024-03-04T13:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-03-05T14:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-03-06T15:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-03-07T16:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-03-08T17:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-03-09T18:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-03-10T19:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-03-11T20:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-03-12T21:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-03-13T22:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-03-14T23:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-03-15T08:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-03-16T09:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-03-17T10:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-03-18T11:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-03-19T12:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-03-20T13:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-03-21T14:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-03-22T15:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-03-23T16:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-03-24T17:00:00Z") },
  { userId: "user_10", loginTime: new Date("2024-03-25T18:00:00Z") },
  { userId: "user_1", loginTime: new Date("2024-03-26T19:00:00Z") },
  { userId: "user_2", loginTime: new Date("2024-03-27T20:00:00Z") },
  { userId: "user_3", loginTime: new Date("2024-03-28T21:00:00Z") },
  { userId: "user_4", loginTime: new Date("2024-03-29T22:00:00Z") },
  { userId: "user_5", loginTime: new Date("2024-03-30T23:00:00Z") },
  { userId: "user_6", loginTime: new Date("2024-03-31T08:00:00Z") },
  { userId: "user_7", loginTime: new Date("2024-03-31T09:00:00Z") },
  { userId: "user_8", loginTime: new Date("2024-03-31T10:00:00Z") },
  { userId: "user_9", loginTime: new Date("2024-03-31T11:00:00Z") }
];

const routes=express.Router()

//add fake login data
routes.post('/logins', async(req, res)=>{
    try{
    let data=await Logins.insertMany(loginData)
    res.status(201).json({status:'sucessafully', message:'products are succesafullay added'})
}catch(e){
    console.log(e)
    res.status(500).json({error:'internal server errior'})
}
})

/*
📅 6. Monthly Active Users (MAU)

❓ Question:

Find the number of unique active users per month.
*/
routes.get('/question6', async(req, res)=>{
    try{
        const data=await Logins.aggregate([
            {$group:{
                _id: {$dateToString:{format : '%Y-%m', date:"$loginTime"}},
                users:{$addToSet:'$userId'}
            }},

            {$project:{
                _id:1,
                quant:{$size: '$users'}
            }}
        ])

        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({error:e.message})
    }
})

module.exports={routes, Logins}
