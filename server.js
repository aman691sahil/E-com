//1.Import express
//This file is now lightweight
//load all the environment variables into the application
import "./env.js"
import express from "express";
import swagger from "swagger-ui-express";
import cors from 'cors';



// Ideally third party imports should be at the top

import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
// import winstonLoggerMiddleware from "./src/middlewares/winstonLogger.middleware.js";

// Importing the json file 
import apiDocs from './swagger.json' assert {type:'json'}; 
import  ApplicationError  from "./src/error-handler/applicationErrror.js";
import orderRouter from "./src/features/order/order.routes.js";
// We have to tell the js that this is a json file,this is why we have to use the assert 


//2.Create Server
const server=express();



// //CORS policy configuration
var corsOptions={
    origin:'http://127.0.0.1:5500',
    
}

server.use(cors(corsOptions));
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:5500')    //in this case I am giving access to all the clients
//     res.header(' Access-Control-Allow-Headers','*');
//     res.header(' Access-Control-Allow-Methods','*');  //This specify what all methods(get,post etc) this client can access
//     //return ok for preflight request
//     if(req.method=='OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })



server.use(bodyParser.json());  //This will parse the body into the json format 
// server.use(bodyParser.json()); is this and server.use(express.json()); both are same


//for all the request related to product,redirect to product.routes.js

server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));//swagger.server creates the UI
//send this request on the browser
server.use(loggerMiddleware);

server.use('/api/docs',jwtAuth,orderRouter);

server.use('/api/products',jwtAuth,productRouter);//I have applied the authorization middleware and the jwt as well
server.use('/api/cartItems',jwtAuth,cartRouter);
server.use('/api/users',userRouter);  
// all the route starting from api/product will go to ProductRouter

//on browser we will write localhost:3200/api/product

// 3.Default request handler
server.get('/',(req,res)=>{
    res.send("Welcome to the E-com APIs")
})


//Here we will be handling the errors at the application level
//We have a built in middleware to handle this
//Will be called whent there are any errors
//this is a server error
//NOTE:THIS SHOULD BE THE LAST MIDDLEWARE IN THE FILE
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }


    //server errors
    res.status(500).send("Something went wrong please try later")

})

// If none of the paths/routes mentioned above matches then we have send a response
//This should be done at the end when all the paths have been mentioned
//This midleware will be executed only when all the above paths/routes mentioned will not get hit
// Keep this at the end
//4.Middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found.Please check our documentation for more information go to  localhost:320/api-docs");
})



//5. Specify the port number
server.listen(3200,()=>{
    console.log("Server is listening to the port 3200");
    //We need to connect to the databse as soon as the server starts
    connectToMongoDB();

});






