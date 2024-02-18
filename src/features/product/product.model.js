


import  ApplicationError  from '../../error-handler/applicationErrror.js';
import UserModel from '../user/user.model.js';
export default class ProductModel{
  constructor( name, desc, price, imageUrl, category, sizes,id){
   
    
      this.name = name;
      this.desc = desc;
      this.price = price;
      this.imageUrl = imageUrl;
      this.category = category;
      this.sizes = sizes;
      this._id = id;
    
  }
     //This function is to add the products
  static add(product){
    product.id = products.length + 1;
    products.push(product);
    return product;
  }
//  //This function is to find the single product
  static get(id){
    const product = products.find((i)=>i.id ==id);
    return product;

  }

  static getAll(){
      return products;
  }

  static filter(minPrice, maxPrice, category){
    const result = products.filter((product)=>{
      return(
      (!minPrice || 
        product.price >= minPrice) &&
      (!maxPrice || 
        product.price <= maxPrice) &&
      (!category || 
        product.category == category)
      );
    });
    return result;
  }
  static rateProduct(userID,productID,rating){
    //1.Validate the user and product(Whether this user even exists or not)
   const user= UserModel.getAll();
   const result=user.find(
    (u)=> u.id==userID
  )
    if(!result)
    {
      // return "User not found";
      //user defined error
      throw new ApplicationError('User not found',404);
    }

    //Validate for the product
    const product=products.find(
      p=>p.id==p.productID
    )
    if(!product)
    {
      // return "Product Not found";
      throw new ApplicationError('Product not found',400);
      //We are writing this so that in the loggerMiddlewares these error can be trapped in the catch part 
    }

    //2.Check if there are any ratings and if not then add the ratings array

    //This case will be applied when there are no ratings and this is the first rating
    if(!product.ratings)
    {
      product.ratings=[];
      //In this array we have to store 2 things,
      //1.The rating 2.and who is giving that rating
      product.ratings.push({
        userID:userID,
        rating:rating
      });
    }
    //This is the case when there is alread some rating and the user want to upgrade it or change it
    else{


      //3.Check if the user has already given the rating or not

      const existingRatingIndex=product.ratings.findIndex(r=>r.userID==userID);

      //In this case we have to update the rating at that index
      if(existingRatingIndex>=0){
        product.ratings[existingRatingIndex]={
          userID:userID,
          productID:productID
        }
       
      }
      else{
        //4.If not existing rating then add new rating
        product.ratings.push({
          userID:userID,
          rating:rating
        });

      }




    }


  }

} 

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Cateogory1'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Cateogory2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Cateogory3',
    ['M', 'XL','S']
  )];


