import mongoose from 'mongoose';

interface CreateProductSchema {
    productName:string,
    productQuantity:number,
    productDescription:string,
    productPrice:number,
    productImage:string
}

const createProductSchema=new mongoose.Schema<CreateProductSchema>({
 productName:{
    type:String,
    required:true
 },
 productQuantity:{
    type:Number,
    required:true,
 },
 productDescription:{
    type:String,
    required:true,
 },
 productPrice:{
    type:Number,
    required:true
 },
 productImage:{
    type:String,
    required:true
 }
})

const createProductModel=mongoose.model('Product',createProductSchema);
export default createProductModel;