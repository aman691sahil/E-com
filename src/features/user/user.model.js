// I started and created  userModel,userController and userRoutes while learning about Security(authentication and authorization)

import { getDB } from "../../config/mongodb.js";
import  ApplicationError  from "../../error-handler/applicationErrror.js";

export  default class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type = type;
        this._id=id;

    }

  

    // static signIn(email,password)
    // {
    //     const user=users.find((u)=>u.email==email && u.password==password);
    //     return user;

    // }
    //No need of the above signIN and signUp function
    static getAll()
    {
        return users;
    }
   

}

var users = [
    {
      id: 1,
      name: 'Seller User',
      email: 'seller@ecom.com',
      password: 'Password1',
      type: 'seller',
    },
    {
      id: 2,
      name: 'Customer User',
      email: 'customer@ecom.com',
      password: 'Password1',
      type: 'customer',
    },
  ];
  