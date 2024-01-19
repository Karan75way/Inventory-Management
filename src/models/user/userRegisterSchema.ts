import mongoose, { Document } from "mongoose";

interface RegisterUserSchema {
  name: string;
  gender: string;
  age: number;
  email: string;
  mobileNumber: number;
  profilePhoto?: string;
  password: string;
  address?: string;
  role: "Customer" | "Owner";
  timestamp?: boolean;
}

const registerUserSchema = new mongoose.Schema<RegisterUserSchema>({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
    
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  profilePhoto: String,
  password: {
    type: String,
    required: true,
  },
  address: String,
  role: {
    type: String,
    enum: ["Customer", "Owner"],
    required: true,
  },
  timestamp: Boolean,
});

const UserRegisterModel = mongoose.model("User", registerUserSchema);

export default UserRegisterModel;
