import express from 'express'
import productController from '../controller/productController';

const productRouter=express.Router()

productRouter.post('/createProduct', productController.createProduct);
productRouter.post('/product/:productId/placeOrder',productController.placeOrder)

productRouter.get('/productlist',productController.getAllProducts);

export default productRouter;