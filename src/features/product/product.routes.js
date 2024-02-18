// Manages routes/path to ProductCotroller

import {upload} from '../../middlewares/fileupload.middleware.js' ;//Path is different because the middleware file is outside the product folder
import ProductController from "./product.controller.js";
const productController=new ProductController();

// 1.Import express
import express from "express";

//2.Get Routes
const productRouter=express.Router();

//All the paths to the controller methods
productRouter.get('/filter',(req,res)=>{
  productController.filterProducts(req,res)
});  //The user has passed soome value but we dont need to write it we will use query para
 //localhost:3200/api/product/filter?minPrice=0&maxPrice=20&category=category1  //thats how you send the values in the Postman/browser
// This is how the url will look like
productRouter.post('/rate',
(req,res,next)=>{
  productController.rateProduct(req,res,next)
});
productRouter.get(
    '/',
    (req, res)=>{
      productController.getAllProducts(req, res)
   }
  );     
  productRouter.post(
    '/',
    upload.single('imageUrl'),
    (req, res)=>{
      productController.addProduct(req, res)
   }
  );//
  productRouter.get(
    '/averagePrice',
    (req,res,next)=>{
      productController.averagePrice(req,res)
    }
  );
  //THe averagePrice showuld come before the /:id below API
  productRouter.get(
    '/:id',
    (req, res)=>{
      productController.getOneProduct(req, res)
   }
  ); //We are passsing the route parameter
 

//upload.array() is used when u want to upload multiple files


export default productRouter;


//localhost:3200/api/product/filter?minPrice=0&maxPrice=20&category==category1  //thats how you send the values in the Postman/browser
