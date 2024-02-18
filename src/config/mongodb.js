//Configuring the MongoDb databse here
//Using MongoDB Node.js Driver

import { MongoClient } from "mongodb";

// const url="mongodb://localhost:27017/ecomdb";
// const url = process.env.DB_URL;
//Connection to our database
//Now we have to tell which databse we are trying to connect

let client;
export const  connectToMongoDB=()=>{
    MongoClient.connect(process.env.DB_URL)   //This is going to return you the promise
                                 //This is an asynchronous operation

    .then(clientInstance=>{
        client=clientInstance
        client.db();
        console.log("MongoDb is connected");
        createCounter(client.db()); //here we are passing the database
        createIndexes(client.db())
    })
    .catch(err=>{
        console.log(err);
    })



}
export const getDB=()=>{
//THis function will only contain the databse which we want to work with
return client.db() ;
//u can skip adding the db name here in the db() as we have already addedd the name in the url part



}

const createCounter=async(db)=>{
    var value;
    const existingCounter=await db.collection("counters").findOne({_id:'cartItemId'})
    if(!existingCounter){
        await db.collection( "counters" ).insertOne({_id:'cartItemId',value:0})
    }
}

const createIndexes=async(db)=>{
    
    try{
       
        await db.collection("products").createIndex({price:1})
        await db.collection("products").createIndex({name:1,category:-1})
        await db.collection("products").createIndex({desc:"text"});


    }catch(err){
        console.log(err);
    }
    console.log("Indexes are Created");

}

//NOTE
//Database related operations are asynchronous operations

