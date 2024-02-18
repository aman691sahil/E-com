//This seperates your database part with the rest of your applications
//All the database related code is here

import  ApplicationError  from "../../error-handler/applicationErrror.js";
import { getDB } from "../../config/mongodb.js";
class UserRepository{
  constructor(){
    this.collection="users";
  }
      async signUp(newUser){

        //1.Get the database
        //This will give me access to the db
    try{
        const db=getDB();
        //2.Get the collection(users collection)
        const connection=db.collection(this.collection);
        //3.Insert the document
       await connection.insertOne(newUser);//This is returning a promise
       return newUser;

    }catch(err){

       throw new ApplicationError("Something Went Wrong with the database",500);
       console.log(err);
    }
    


    }
    async findByEmail(email) {
        try{
          // 1. Get the database
        const db = getDB();
        // 2. Get the collection
        const collection = db.collection(this.collection);
        
        // 3. Find the document.
        return await collection.findOne({email});
        } catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }

}
export default UserRepository;