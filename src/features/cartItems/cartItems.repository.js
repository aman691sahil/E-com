import { application } from "express";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationErrror.js";
import { ObjectId } from "mongodb";

export default class cartItemsRepository{
    constructor(){
        this.collection="cartItems";
    }
    async add(productID,userID,quantity){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);

            //Here we are retrieving the id and making sure that this gets used only on the insert operation
            const id=await this.getNextCounter(db);

            //check whether there is already a cartItem for this userID
            //find the document 
            //or update

          await  collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},
            {
                $setOnInsert:{  //this will work only when it is an insert operation
                    _id:id
                },
                $inc:{
                quantity:quantity
            }},
            {upsert:true})

            //upsert is a combination of update and insert (update + insert = upsert)
            // If the value of this option is set to true and the document or documents found that match the specified query, then the update operation will update the matched document or documents. 
            //Or if the value of this option is set to true and no document or documents matches the specified document, 
            // then this option inserts a new document in the collection and this new document have the fields that indicate in the operation
        }catch(err){
        console.log(err);   
        throw new ApplicationError('Something went wrong with the server',500);
        
        }
     
    }
    async get(userID){
// console.log(userID);
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
           return await collection.find({userID:new ObjectId(userID)}).toArray();

        }catch(err){
            console.log(err);   
            throw new ApplicationError('Something went wrong with the server',500);
           
            
    }
}
async delete(userID,cartItemID){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
       const result= await collection.deleteOne({_id:new ObjectId(cartItemID),userID:new ObjectId(userID)})
       return result.deletedCount>0; //this will either return true or false
    }catch(err)
    {
        console.log(err);   
        throw new ApplicationError('Something went wrong with the server',500);
    }

}

async getNextCounter(db){

  const resultDocument=  await db.collection("counters").findOneAndUpdate(
        {
            _id:'cartItemId' },
            {$inc:{value:1}},
            {returnDocument:'after'}
    )
    //return the unUpdated document if returnDocument is set false
    //gives the updated document if returnDocument is set 'after'
    console.log(resultDocument);
    return resultDocument.value;
    //first value is mongodb
    //second value is the attribute
}

}

