import CartItemModel from "./cartItems.model.js";
import cartItemsRepository from "./cartItems.repository.js";

export default class CartItemsController{
  constructor(){
    this.cartItemsRepository=new cartItemsRepository();
  }
   async  add(req,res){
        //In this case the client does not need to pass the userId as it will retrieve this from the token
        //Client only passes the productId and the quantity
        //We will extract the userID from the token
        try{
          // const {productID,quantity}=req.query; //if i use this still then I will get null in compass because I am adding the value in the req.body
          const{productID,quantity}= req.body;
          const userID=req.userID; 
        
          await  this.cartItemsRepository.add(productID,userID,quantity);
          res.status(201).send("Cart is Updated");

        }catch(err){
          console.log(err);
          res.status(200).send("Something went wrong");
          
        }
       
        // console.log(userID);
        //accessing the userID using the token which the user is sending
        //retreiving the userID from the token is considered as a good practise
        //req.userID=payload.userID //go to the jwt.middleware.js
     

    }
    //This function returns all the cartItems for that particular userID
    async get(req,res){
      try{
        // console.log(req.user);
        const userID = req.userID;
        console.log(userID);
        const items= await this.cartItemsRepository.get(userID);
        console.log(items);
        return res.status(200).send(items);
      }catch(err){
        console.log(err);
       return res.status(200).send("Something went wrong");
        
      }
    }
   async delete(req,res){
        const userID=req.userID;
        //The value of the userID is coming from the token which we have attached to the req headers
        const cartItemID=req.params.id;
      const isDeleted= await this.cartItemsRepository.delete(userID,cartItemID);
      //cartItemID=>_id
      //userID=>given by its name
      if(!isDeleted){
       return res.status(404).send("Items not found");
      }
     return res.status(200).send("Cart Item is Removed");


    }

}