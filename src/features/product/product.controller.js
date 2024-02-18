import { getDB } from '../../config/mongodb.js';
import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductController {
  constructor(){
    this.productRepository = new ProductRepository();
    //we are creating the instances of Product Repository 
  }

  async getAllProducts(req, res) {
    try{
      const products = await this.productRepository.getAll();
    res.status(200).send(products);
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
   }    
  }

  async addProduct(req, res) {
    try{
    const { name, price, sizes } = req.body;
    const newProduct = new ProductModel(name,null, parseFloat(price),
    null, null, sizes.split(',')
    );

    const createdProduct = await this.productRepository.add(newProduct);
    res.status(201).send(createdProduct);
  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

  async rateProduct(req, res, next) {
    console.log(req.query);
    try{
      const userID = req.userID;
      // const productID = req.query.productID;
      const productID = req.body.productID;
      // const rating = req.query.rating;
      const rating = req.body.rating;
   await   this.productRepository.rate(
        userID,
        productID, 
        rating
        );
        return res
          .status(200)
          .send('Rating has been added');
    } catch(err){
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }   

  async getOneProduct(req, res) {

    try{
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        return res.status(200).send(product);
      }
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

 async filterProducts(req, res) {
  try{
    const minPrice = req.query.minPrice;
    // const maxPrice = req.query.maxPrice;
    const categories = req.query.categories;
    const result = await this.productRepository.filter(
      minPrice,
      categories
    );
    res.status(200).send(result);

  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

//this function will return the average price of the product for each category
async averagePrice(req,res,next){
  try{
  const result=  await this.productRepository.averageProductPricePerCategory()
  res.status(200).send(result);

  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

}
