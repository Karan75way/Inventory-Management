import mongoose from "mongoose";

interface LoginUserSchema {
  email: string;
  password: string;
}

const loginUserSchema = new mongoose.Schema<LoginUserSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const UserLoginModel = mongoose.model("Login", loginUserSchema);

export default UserLoginModel;
