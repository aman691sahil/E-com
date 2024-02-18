import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import  ApplicationError  from "../../error-handler/applicationErrror.js";


class ProductRepository{

    constructor(){
        this.collection="products";
        // We can use the collection here so that we dont need to hardcode the values in every function
    }
   async add(newProduct){
    try{
        //1.Get the db
        const db=getDB();
        const collection=db.collection(this.collection);
       await collection.insertOne(newProduct);
        return newProduct;

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the database",500);

    }

    }

  async  getAll(){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
        const products=  await collection.find().toArray();
        console.log(products);
        return products;

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the databse",500);
    }

    }

   async get(id){
    try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return  await collection.findOne({_id:new ObjectId(id)});

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with the databse",500);
    }


    }
    // async filter(minPrice,maxPrice,category){
    //   try{
    //     const db=getDB();
    //     const collection=db.collection(this.collection);
    //     let filterExpression={};
    //     if(minPrice){
    //         filterExpression.price={$gte:parseFloat(minPrice)}    //this is the greater then or equal to
          
    //     }
    //     if(maxPrice){
    //         // filterExpression.price={$lte:parseFloat(maxPrice)}    //this is less then or equal to operator
    //         // filterExpression.price.$lte = parseFloat(maxPrice);
    //         filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
    //     }
    //     if(category){
    //         filterExpression.category=category;

    //     }
    //     return await  collection.find(filterExpression).toArray();


    //   }catch(err){
    //     console.log(err);
    //     throw new ApplicationError("Something went wrong with the databse",500);
    // }
 

    // }
    async filter(minPrice, categories){
      try{
          const db = getDB();
          const collection = db.collection(this.collection); 
          let filterExpression={};
          if(minPrice){
              filterExpression.price = {$gte: parseFloat(minPrice)}
          }
          // ['Cat1','Cat2']=>We need to convert this single quote to double quote
          categories = JSON.parse(categories.replace(/'/g,'"'));
          console.log(categories);
          //Converting the categories  from string to array format and adding it to the filter expression object
          if(categories){
              filterExpression={$or:[{category:{$in: categories}}, filterExpression]}
// In MongoDB, the $in operator is used to query documents where the value of a field matches any value in a specified array.
              // filterExpression.category=category
          }
          return collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();
          //Projection Operators
          //We want only certain data to be shown
          //project function shows only the object mentioned in the project array like name and price=>id will be present anyhow
          //1 means inclusion and 0 means the exclusion of this 
          //slice:1 means that give me first rating for all the products
          //it can take 1,2, or 3 any values
          //if u want to get the last 2 ratings then use -2 and similarly -3,-4 etc
          

      }catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);    
      }
  }
    // async rate(userID,productID,rating){
    //   try{
    //     const db=getDB();
    //     const collection=db.collection(this.collection);
    //     //1.Find the product
    //     const product=await collection.findOne({_id:new ObjectId(productID)})
    //     //2.We need to check if there is already a rating or not
    //     const userRating=product?.ratings?.find(r=>r.userID==userID)
    //     if(userRating){
    //      //3.Update the rating
    //      await collection.updateOne({
    //         _id:new ObjectId(productID),"ratings.userID": new ObjectId(userID),   //now we have found the product in the rating array which we have to update 

    //      },{
    //         //Now we have to update that particular rating which I have found using the above expression
    //         $pull:{
    //             // "ratings.$.rating":rating
    //             ratings:{userID:new ObjectId(userID)} 
    //             //the pull operator removes from an existing array all instances of a value or values that matches a certain condition
    //         }


    //      })
    
    //     }else{
    //         await collection.updateOne({
    //             _id:new ObjectId(productID)
    //         },{
    
    //             $push:{ratings:{userID:new ObjectId(userID),rating}}   //rating in this line refers to the new collection
    //                                              //in which we are pushing new object
    
    //         })

    //     }
           
    //   }catch(err){
    //     console.log(err);
    //     throw new ApplicationError("Cannot add rating",500);
    //   }
    // }
    async rate(userID,productID,rating){
        try{
          const db=getDB();
          const collection=db.collection(this.collection);
          //Removes the existing entry
          await collection.updateOne({
            _id:new ObjectId(productID)

          },{
            $pull:{ratings:{userID:new ObjectId(userID)}}
          })
          //2.Add new entry
          await collection.updateOne({
            _id:new ObjectId(productID)
        },{

            $push:{ratings:{userID:new ObjectId(userID),rating}}   //rating in this line refers to the new collection
                                             //in which we are pushing new object

        })
         }catch(err){
          console.log(err);
          throw new ApplicationError("Cannot add rating",500);
        }
      }
      async averageProductPricePerCategory(){
        try{
          const db=getDB();
         return await db.collection(this.collection)
                .aggregate([{
                    //Stage:1
                    //Get average price per category
                    $group:{
                        //this stage seperates a document into the groups
                        _id:"$category" ,
                        averagePrice:{$avg:"$price"}   //we are averaging the prices of our products(the products which are in this group)
                    }
                }
                ]).toArray()
      
      
        }catch(err){
          console.log(err);
          return res.status(200).send("Something went wrong");
        }
      
      }

}

export default ProductRepository;