const  express=require('express')
const connectDb = require('./db/connection')
const oderRoutes=require('./questions/mongodbQuestion/eCommerce/oders.rotues')
const userRoutes=require('./questions/mongodbQuestion/eCommerce/users.routes')
const {routes :productRoutes}=require('./questions/mongodbQuestion/eCommerce/product.routes')
const {routes :loginsRoutes}=require('./questions/mongodbQuestion/eCommerce/userLogIn.routes')

const app=express()

app.use(express.json())

connectDb()

//mongodb agrigation question
//get more question https://chatgpt.com/c/69ef3fb7-fffc-83e8-9cfd-279e627fc790
app.use('/ordersAPI', oderRoutes )
app.use('/usersAPI', userRoutes)
app.use('/productsAPI', productRoutes)
app.use('/loginsAPI', loginsRoutes)

app.get('/ping',(req, res)=>{
    console.log('server is live')
    res.status(200).json({status:'server is alive now'})
})

app.listen(8080, ()=>{
    console.log('app is listen on 8080 port')
})