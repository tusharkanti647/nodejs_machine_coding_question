const {createClient}=require('redis')

let client= createClient(); //here youe send the url, password, or redis client id for connection

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

function connectRedis(){
    client.connect()
    console.log("Redis successfully connected");
}

 module.exports={client, connectRedis}