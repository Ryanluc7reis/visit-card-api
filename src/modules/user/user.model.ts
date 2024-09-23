import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  user: string;
  email: string;
  password: string;
  number: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  user: { type: String, required: true, maxlength: 30, unique: true },
  email: { type: String, required: true, maxlength: 100, unique: true },
  number: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
