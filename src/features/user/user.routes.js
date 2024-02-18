// Here we have two routes one for SignUp and the other for the SignIn
// Both will be a POST request
// Manages routes/path to ProductCotroller


import UserController from "./user.controller.js";

// 1.Import express
import express from "express";

//2.Get Routes
const userRouter=express.Router();
const userController=new UserController();



userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});
   
userRouter.post('/signUp',(req,res)=>{
    userController.signUp(req,res)
}); //



//upload.array() is used when u want to upload multiple files


export default userRouter;


//localhost:3200/api/product/filter?minPrice=0&maxPrice=20&category==category1  //thats how you send the values in the Postman/browser
