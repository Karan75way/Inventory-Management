import mongoose from 'mongoose';

interface PlaceOrder {
    orderQuantity:number,
    customerName:string,
    customerMobileNumber:number,
    customerFullAddress:string,
}

const placeOrderSchema=new mongoose.Schema<PlaceOrder>({
    orderQuantity :{
        type:Number,
        required:true,
    },
    customerName:{
        type:String,
        required:true,
    },
    customerMobileNumber:{
        type:Number,
        required:true,
    },
    customerFullAddress:{
        type:String,
        required:true,
    },
});

const PlaceOrderModel= mongoose.model('Order_Placed',placeOrderSchema);

export default PlaceOrderModel;