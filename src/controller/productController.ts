import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserRegisterModel from "../models/user/userRegisterSchema";
import createProductModel from "../models/product/createProductSchema";
import PlaceOrderModel from "../models/product/placeOrderSchema";

const productController = {
  createProduct: async (req: Request, res: Response) => {
    const token = req.cookies.Token;
    if (!token) {
      return res.json({ error: "You need to login first" });
    }
    const decodedToken: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY || "MYnameIsMongoDB"
    );

    const userId = decodedToken._id;

    const user = await UserRegisterModel.findById(userId);

    if (user?.role !== "Owner") {
      return res.json({
        error: "Product creation failed",
        message: "Only owner can acquire this facility",
      });
    }
    try {
      const {
        productName,
        productQuantity,
        productDescription,
        productPrice,
        productImage,
      } = req.body;

      if (
        !productName ||
        !productQuantity ||
        !productDescription ||
        !productPrice ||
        !productImage
      ) {
        return res.json({ error: "All fields are required" });
      }
      const newProduct = new createProductModel({
        productName: productName,
        productQuantity: productQuantity,
        productDescription: productDescription,
        productPrice: productPrice,
        productImage: productImage,
      });

      await newProduct.save();

      return res.json({
        Success: "Product created successfully",
        New_Product_Added: newProduct,
      });
    } catch (error: any) {
      return res.json({
        failed: "Product is not created",
        message: error.message,
      });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const existingProducts = await createProductModel.find();
      return res.json({
        message: "List of all the products are below:",
        existingProducts: existingProducts,
      });
    } catch (error: any) {
      return res.json({
        error: "Issue while fetching products list",
        message: error.message,
      });
    }
  },

  placeOrder: async (req: Request, res: Response) => {
    const token = req.cookies.Token;
    if (!token) {
      return res.json({ error: "You need to login first" });
    }
    const decodedToken: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY || "MYnameIsMongoDB"
    );
    const userId = decodedToken._id;

    const user = await UserRegisterModel.findById(userId);
    if (user?.role !== "Customer") {
      return res.json({
        failed: "Order cannot be placed",
        message: "Only customer can place order for now",
      });
    }
    try {
      const {
        orderQuantity,
        customerName,
        customerMobileNumber,
        customerFullAddress,
      } = req.body;

      if (
        !orderQuantity ||
        !customerName ||
        !customerMobileNumber ||
        !customerFullAddress
      ) {
        return res.json({
          error: "Order cannot be placed",
          message: "All fields are required",
        });
      }

      const { productId } = req.params;
      if (!productId) {
        return res.json({ error: "product id nor found" });
      }
      const product = await createProductModel.findById(productId);
      if (!product) {
        return res.json({ error: "Product not found" });
      }
      if (product.productQuantity === 0) {
        return res.json({ error:"error while placing order",message: "Product is out of Stock" });
      }

      const newOrder = new PlaceOrderModel({
        productId: productId,
        orderQuantity: orderQuantity,
        customerName: customerName,
        customerMobileNumber: customerMobileNumber,
        customerFullAddress: customerFullAddress,
      });

      await newOrder.save();
      product.productQuantity = product.productQuantity - orderQuantity;
      await product.save();

      return res.json({ success: "Order placed Successfully" });
    } catch (error: any) {
      return res.json({
        failed: "Order couldn't be placed",
        message: error.message,
      });
    }
  },
};
export default productController;
