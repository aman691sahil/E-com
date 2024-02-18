export default class OrderModel{
    constructor(userID,totalAmount,timeStamp){
        this.userId = userID;
        this.totalAmount = totalAmount;
        this.timeStamp=timeStamp;
    }
}