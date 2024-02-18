
//Some of the features of the cart
//productID,userID,quantity
export default class CartItemModel{

    constructor(productID,userID,quantity,id){
        this.productID = productID;
        this.userID = userID;
        this.quantity=quantity;
        this.id=id;

    }
    //function to add the items to the cart
    static add(productID,userID,quantity){
        const cartItem=new CartItemModel(productID,userID,quantity);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem)
        return cartItem;
    }

    //We need to return all the cart items for the logged in users
    //THis function needs UserID as a parameter and return all the cartItems as a parameter
    static get(userID){
        return cartItems.filter(
            i=>i.userID==userID && i.userID==userID
            // By doing this we are making sure that the user is deleting its own cartItems
            );
    }
//This function is to delete the cartItem in the cartItems array
    static delete(cartItemID,userID){

        const cartItemIndex=cartItems.findIndex(i=>i.id=cartItemID)
        if(cartItemIndex==-1)
        {
            return 'Item not found';
        }
        else{
           cartItems.splice(cartItemIndex,1);
        }
    }

    
   

}
var cartItems=[
    
        new CartItemModel(1,2,1,1),
        new CartItemModel(1,1,2,2)
    
]