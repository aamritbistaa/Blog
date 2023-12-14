import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, min: 4 },
  lastname: { type: String, required: true, min: 4 },
  username: { type: String, required: true, min: 4, unique: true },
  email: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
