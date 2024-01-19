import { Request, Response } from "express";
import UserRegisterModel from "../models/user/userRegisterSchema";
import bcrypt from "bcrypt";
import validator from "../helper/validation";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const {
        name,
        gender,
        age,
        email,
        mobileNumber,
        password,
        profilePhoto,
        address,
        role,
      } = req.body;

      //validations
      if (
        !name ||
        !email ||
        !password ||
        !gender ||
        !age ||
        !role ||
        !mobileNumber
      ) {
        return res.json({ error: "All fields are required" });
      }

      //checking if the user already exists
      const existingUser = await UserRegisterModel.findOne({ email });
      
      if (existingUser) {
        return res.json({
          Failed: "User already exists, try register with another email",
        });
      }
      //vaidation of email
      if (!validator.validateEmail(email)) {
        return res.json({
          error: "Email is invalid, try using the correct format",
        });
      }

      //validation of mobileNumber
      if (!validator.validateMobileNumber(mobileNumber)) {
        return res.json({
          error: "Mobile number is invalid, try using the correct format",
        });
      }

      //validation of Password
      if (!validator.validatePasswordStrength(password)) {
        return res.json({
          error: "Invalid password, try correct format of password",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("1")

      const newUser = new UserRegisterModel({
        name: name,
        gender: gender,
        age: age,
        email: email,
        profilePhoto: profilePhoto,
        mobileNumber: mobileNumber,
        password: hashedPassword,
        address: address,
        role: role,
      });
 
      await newUser.save();
      console.log(newUser)
      return res.json({
        Success: "Welcome! you have registered Successfully",
        Your_Data: newUser,
      });
    } catch (error: any) {
      return res.json({
        Failed: "Registration failed",
        message: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
   
    try {
      const { email, password } = req.body;

      // email and password validation checking
      if (
        !validator.validateEmail(email) ||
        !validator.validatePasswordStrength(password)
      ) {
        return res.json({ error: "Email or password is invalid" });
      }

      // check if user exists
      const existingUser = await UserRegisterModel.findOne({
        email,
      });
      if (!existingUser) {
        return res.json({
          login_failed: "User does not exist",
          message: "Register first",
        });
      }

      //  password matching
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return res.json({
          error: "login failed",
          message: "password does not match",
        });
      }
      const tokenSecretkey = process.env.TOKE_SECRET_KEY||"MYnameIsMongoDB";

      const token = JWT.sign({ _id: existingUser._id }, tokenSecretkey);

      res.cookie("Token", token, { httpOnly: true });

      return res.json({
        Successfull: `You have been logged In as ${existingUser.role}`,
        Login_Data: req.body,
        Token: token,
      });
    } catch (error:any) {
      return res.json({
        failed: "Login Failed",
        message: error.message,
      });
    }
  },
};

export default userController;
